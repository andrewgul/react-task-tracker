import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  const title = 'task tracker'
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const url = 'http://localhost:5000/tasks'
    const res = await fetch(url)
    const data = await res.json()

    return data
  }

  // fetch task
  const fetchTask = async (id) => {
    const url = `http://localhost:5000/tasks/${id}`
    const res = await fetch(url)
    const data = await res.json()

    return data
  }

  // delete task
  /*
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id ))
  }
  */

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id ))
  }

  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)
    )
  }

  // add task
  /*
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }
  */

  // add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  return (
    <Router>
      <div className="container">
        <Header 
          title={title} 
          onAdd={() => { setShowAddTask(!showAddTask) }} 
          showAdd={showAddTask}
        />
        <Route path='/' exact render={() => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
            ) : (
              'no tasks found'
            )}
          </>
        )}/>
        <Route path='/about' component={About}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

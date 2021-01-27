import { FaTimes } from 'react-icons/fa'

export const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={task.reminder ? 'task-reminder' : 'task'} style={taskStyle} onDoubleClick={() => {onToggle(task.id)}}>
            <h3>{task.text} <FaTimes style={crossStyle} onClick={() => onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

const taskStyle = {
    marginBottom: '10px',
    marginRight: '20px',
    marginLeft: '20px',
    padding: '10px',
    borderRadius: '10px'
}

const crossStyle = {
    color: 'red'
}

export default Task

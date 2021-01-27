import { useState } from 'react'

export const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('please add task')
            return
        }

        onAdd({text, day, reminder})
        clearForm()
    }

    const clearForm = () => {
        setText('')
        setDay('')
        setReminder('')
    }

    return (
        <form className="add-task-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input type="text" placeholder="add task" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="">Day and Time</label>
                <input type="text" placeholder="add time" value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="">Reminder</label>
                <input type="checkbox" checled={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type="submit" value="save task"/>
        </form>
    )
}

export default AddTask

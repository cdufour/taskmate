function AddTask({handleSubmit, task, setTask, editid}) {
    return (
        <section className="addTask">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit">{ editid ? 'Update' : 'Add' }</button>
            </form>
        </section>
    )
}

export default AddTask;
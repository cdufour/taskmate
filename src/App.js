import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';

function App() {

  const [task, setTask] = useState('');
  const [editid, setEditId] = useState(0);
  const [tasklist, setTaskList] = useState(JSON.parse(localStorage.getItem('tasklist')) || []);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'medium');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (editid) {
      // mode update
      const date = new Date();
      const selectedTask = tasklist.find(task => task.id === editid);
      const updatedTasks = tasklist
        .map(todo => (todo.id === selectedTask.id) 
          ? (todo = { id: todo.id, name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` } )
          : { id: todo.id, name: todo.name, time: todo.time }
        )
      setTaskList(updatedTasks);
      setEditId(0); // repasse en mode insertion (Add)
      setTask('');
      return;
    }

    if (task) {
      const date = new Date();
      const newTask = { id: date.getTime(), name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` }
      setTaskList([...tasklist, newTask]);
      setTask(''); // efface le champ de saisie
    }


  }

  const handleEdit = (id) => {
    const selectedTask = tasklist.find(task => task.id === id);
    setTask(selectedTask.name);
    setEditId(id); // passe en mode édition
  }

  const handleDelete = (id) => {
    const updatedTasklist = tasklist.filter(task => task.id !== id);
    setTaskList(updatedTasklist); // state update
  }

  // déclenchement automatique
  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(tasklist));
  }, [tasklist])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme])

  return (
    <div className={'App ' + theme}>
      <Header theme={theme} setTheme={setTheme} />
      <AddTask handleSubmit={handleSubmit} task={task} setTask={setTask} editid={editid} />
      <ShowTask tasklist={tasklist} setTaskList={setTaskList} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
}

export default App;

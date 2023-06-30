import React, { useState } from 'react';
import Card from './Card';
import './List.css';

const List = () => {

  const [tasks, setTasks] = useState([]); //en este [] se acumularán los valores que acumule 'tasks'
  const [originalTasks, setOriginalTasks] = useState([]);  // En este [] se guarda una copia del estado anterior.
    const handleSubmit = (e) => {
      e.preventDefault();
      const task = e.target.task.value;
      
      // Agrega la nueva tarea al array tasks
      setTasks(prevTasks => [...prevTasks, task]);

      setOriginalTasks(prevTasks => [...prevTasks, task]);
    
      // Limpia el valor del input después de agregar la tarea
      e.target.task.value = '';
  }

  const deleteTask = (i) =>{setTasks(tasks.filter( (item, j)=> i!==j )) }

  const clearList = () => {  setTasks([]);  }

  const resetList = () => {  setTasks([...originalTasks]);  }

  const printTasks = () => {
    return tasks.map((task, index) => (<Card key={index} task={task} deleteTask = { () => deleteTask(index)} />
    ));
  }
// console.log(tasks);

    return (
          <article>
            <form onSubmit={handleSubmit}>
              
              <label htmlFor="name">Type your task</label><br />
              <input type="text" name="task" /><br />
          
              <button type="submit">ADD TASK</button>

            </form>
            <ul>
              {printTasks()}
            </ul>
            <button id='clear' onClick={clearList}>CLEAR LIST</button>
            <button id='reset' onClick={resetList}>RESET</button>
          </article>
    );
};

export default List;

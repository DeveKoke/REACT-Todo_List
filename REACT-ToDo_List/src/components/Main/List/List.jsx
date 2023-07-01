import React, { useState, useEffect} from 'react';
import Card from './Card';
import './List.css';

const List = () => {

  const [tasks, setTasks] = useState([]); //en este [] se acumularán los valores que acumule 'tasks'
  const [originalTasks, setOriginalTasks] = useState([]);  // En este [] se guarda una copia del estado anterior.
  const [showMessage, setShowMessage] = useState(false);  //Estado inicial de showmessage es false (no se muestra en pantalla)
  const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const task = e.target.task.value;

          if (task.length < 6) {  //si al hacer click task es menor de 6 setErroMessage cambia de estado
            setErrorMessage('La tarea debe tener al menos 6 caracteres');
            return;
          }
      
      setTasks(prevTasks => [...prevTasks, task]);  // Agrega la nueva tarea al array tasks
      setOriginalTasks(prevTasks => [...prevTasks, task]);
      setShowMessage(true); //si se hace click en ADD TASK, showMessage cambia valor.
      setErrorMessage('');
      
      e.target.task.value = '';  // Limpia el valor del input después de agregar la tarea
  }

  const deleteTask = (i) =>{setTasks(tasks.filter( (item, j)=> i!==j )) }

  const clearList = () => {  setTasks([]);  }

  const resetList = () => {  setTasks([...originalTasks]);  }

  const printTasks = () => {
    return tasks.map((task, index) => (<Card key={index} task={task} deleteTask = { () => deleteTask(index)} />
    ));
  }

  useEffect(() => {  
    if (errorMessage) {  //si errorMessage está true, se camba a false en 3 seg.
      const timeout = setTimeout(() => {
        setErrorMessage(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]); 

  
  useEffect(() => {  
    if (showMessage) {  //si showMessage está true, se camba a false en 3 seg.
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [showMessage]); //el array es un parámetro de useEffect que indica que este se ejecutará cuando showMessage cambie su estado.

    return (
          <article>
            <form onSubmit={handleSubmit}>
            {showMessage && <p className='taskmessage'>Tarea añadida</p>}
            {errorMessage && <p className="taskmessage">{errorMessage}</p>}

              <label htmlFor="name">Type your task</label><br />
              <input type="text" name="task" /><br />
          
              <button id='addbtn' type="submit">ADD TASK</button>

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

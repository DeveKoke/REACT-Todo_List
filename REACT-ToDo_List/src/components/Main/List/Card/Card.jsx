import React from 'react';
import './Card.css';

const Card = ({task, deleteTask}) => {




  return  <li>
            {task}
            <button className='liBut' onClick={deleteTask}>DELETE  TASK</button>
          </li>;
};

export default Card;

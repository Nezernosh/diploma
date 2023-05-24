import React from 'react';
import './themes.css';
import { structures } from '../../dummydata';
import { NavLink } from 'react-router-dom';

export const Structures = () => {
  return (
    <>
      <div className='grid'>
        {structures.map((val) => (
          <NavLink className='link' to={val.id} key={val.id}>
            <h1>{val.title}</h1>
          </NavLink>
        ))}
      </div>
      <p>структуры</p>
    </>
  )
}
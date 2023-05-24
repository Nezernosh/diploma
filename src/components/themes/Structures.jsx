import React from 'react';
import './themes.css';
import { structures } from '../../dummydata';
import { NavLink } from 'react-router-dom';
import './themes.css';
import { MdDataArray } from 'react-icons/md';

export const Structures = () => {
  return (
    <>
      <h1 className='category-title'><MdDataArray /> Структуры:</h1>
      <div className='div-flex'>
        {structures.map((val) => (
          <NavLink className='link' to={val.id} key={val.id}>
            <h1 className='lesson-title'>{val.title}</h1>
          </NavLink>
        ))}
      </div>
    </>
  )
}

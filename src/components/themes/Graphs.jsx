import React from 'react';
import './themes.css';
import { graphs } from '../../dummydata';
import { NavLink } from 'react-router-dom';
import './themes.css';
import { GrGraphQl } from 'react-icons/gr';

export const Graphs = () => {
  return (
    <>
      <h1 className='category-title'><GrGraphQl /> Алгоритмы на графах:</h1>
      <div className='div-flex'>
        {graphs.map((val) => (
          <NavLink className='link' to={val.id} key={val.id}>
            <h1 className='lesson-title'>{val.title}</h1>
          </NavLink>
        ))}
      </div>
    </>
  )
}

import React from 'react';
import './themes.css';
import { sorts } from '../../dummydata';
import { NavLink } from 'react-router-dom';
import './themes.css';
import { ImSortNumericAsc } from 'react-icons/im';

export const Sorts = () => {
  return (
    <>
      <h1 className='category-title'><ImSortNumericAsc /> Сортировки:</h1>
      <div className='div-flex'>
        {sorts.map((val) => (
          <NavLink className='link' to={val.id} key={val.id}>
            <h1 className='lesson-title'>{val.title}</h1>
          </NavLink>
        ))}
      </div>
    </>
  )
}

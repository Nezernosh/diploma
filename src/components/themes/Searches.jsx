import React from 'react';
import './themes.css';
import { searches } from '../../dummydata';
import { NavLink } from 'react-router-dom';
import './themes.css';
import { AiOutlineSearch } from 'react-icons/ai'

export const Searches = () => {
  return (
    <>
      <h1 className='category-title'><AiOutlineSearch /> Поиск подстроки:</h1>
      <div className='div-flex'>
        {searches.map((val) => (
          <NavLink className='link' to={val.id} key={val.id}>
            <h1 className='lesson-title'>{val.title}</h1>
          </NavLink>
        ))}
      </div>
    </>
  )
}

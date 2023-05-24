import React from 'react';
import { SiAlgorand } from 'react-icons/si';
import { BiBookContent } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { MdAccountBox } from 'react-icons/md';
import './header.css';

export const Header = () => {
  return (
    <>
      <header className='Header'>
        <div className='logo'>
          <NavLink className='Header-link' to={"/"}><SiAlgorand /> AlgAcademy</NavLink>
          <p className='logo-text'>Алгоритмы и структуры данных</p>
        </div>
        <div className='navigation'>
          <NavLink className='Header-link' to={"/categories"}><BiBookContent /> Содержание</NavLink>
          <NavLink className='Header-link' to={"/account"}><MdAccountBox /> Вход</NavLink>
        </div>
      </header>
    </>
  )
}
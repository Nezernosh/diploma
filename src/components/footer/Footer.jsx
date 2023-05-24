import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillInfoSquareFill } from 'react-icons/bs'
import { MdMessage } from 'react-icons/md';
import './footer.css';

export const Footer = () => {
  return (
    <>
      <footer className='Footer'>
        <NavLink className='Footer-link' to={"/about"}><BsFillInfoSquareFill /> О сайте</NavLink>
        <NavLink className='Footer-link' to={"/feedback"}><MdMessage /> Обратная связь</NavLink>
      </footer>
    </>
  )
}

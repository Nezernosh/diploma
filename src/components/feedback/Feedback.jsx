import React from 'react';
import './feedback.css';
import { AiFillMail } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';

export const Feedback = () => {
  return (
    <>
      <div className='div-feedback'>
        <h2>Контакты</h2>
        <h3><AiFillMail /> Почта</h3>
        <a href='mailto:nereznosh@gmail.com'>nereznosh@gmail.com</a>
        <h3><FaTelegramPlane /> Телеграмм</h3>
        <a href='https://t.me/uahosyri'>https://t.me/uahosyri</a>
      </div>
    </>
  )
}

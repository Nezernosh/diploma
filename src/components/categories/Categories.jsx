import React from 'react';
import './categories.css';
import { categories } from '../../dummydata';
import { NavLink } from 'react-router-dom';

export const Categories = () => {
    return (
        <>
            <section className='Categories-section'>
                <div className='grid'>
                    {categories.map((val) => (
                        <NavLink className='link' to={val.link} key={val.id}>
                            <div className='box'>
                                <div className='img'>
                                    <img src={val.cover} alt='category-cover' />
                                    <img src={val.hoverCover} alt='category-cover-on-hover' className='show' />
                                </div>
                                <h1>{val.categoryName}</h1>
                                <span>{val.categorySize}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </section>
        </>
    )
}

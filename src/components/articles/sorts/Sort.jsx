import React from 'react';
import { useParams } from 'react-router-dom';
import { Sort1, Sort2, Sort3, Sort4 } from './';
import '../articles.css';
import { PageNotFound } from '../../not_found/PageNotFound';

export function Sort() {
    const { lessonId } = useParams();

    switch (lessonId) {
        case '1':
            return <Sort1 />;
        case '2':
            return <Sort2 />;
        case '3':
            return <Sort3 />;
        case '4':
            return <Sort4 />;
        default:
            return <PageNotFound />;
    }
}

import React from 'react';
import { useParams } from 'react-router-dom';
import { Graph1, Graph2, Graph3, Graph4, Graph5 } from './';
import '../articles.css';
import { PageNotFound } from '../../not_found/PageNotFound';

export function Graph() {
    const { lessonId } = useParams();

    switch (lessonId) {
        case '1':
            return <Graph1 />;
        case '2':
            return <Graph2 />;
        case '3':
            return <Graph3 />;
        case '4':
            return <Graph4 />;
        case '5':
            return <Graph5 />;
        default:
            return <PageNotFound />;
    }
}
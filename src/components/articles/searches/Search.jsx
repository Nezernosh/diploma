import React from 'react';
import { useParams } from 'react-router-dom';
import { Search1, Search2 } from './';
import '../articles.css';
import { PageNotFound } from '../../not_found/PageNotFound';
import Quiz from '../../quiz/Quiz';
import { searchesQuestions } from '../quizQuestions';

export function Search() {
    const { lessonId } = useParams();

    switch (lessonId) {
        case '1':
            return <Search1 />;
        case '2':
            return <Search2 />;
        case 'quiz':
            return <Quiz questions={searchesQuestions} />
        default:
            return <PageNotFound />;
    }
}

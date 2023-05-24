import React from 'react';
import { useParams } from 'react-router-dom';
import { Search1, Search2 } from './';
import '../articles.css';
import { PageNotFound } from '../../not_found/PageNotFound';

export function Search() {
    const { lessonId } = useParams();

    switch (lessonId) {
        case '1':
            return <Search1 />;
        case '2':
            return <Search2 />;
        default:
            return <PageNotFound />;
    }
}

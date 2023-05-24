import React from 'react';
import { useParams } from 'react-router-dom';
import { Structure1, Structure2, Structure3, Structure4, Structure5, Structure6, Structure7, Structure8 } from './';
import '../articles.css';
import { PageNotFound } from '../../not_found/PageNotFound';

export function Structure() {
    const { lessonId } = useParams();

    switch (lessonId) {
        case '1':
            return <Structure1 />;
        case '2':
            return <Structure2 />;
        case '3':
            return <Structure3 />;
        case '4':
            return <Structure4 />;
        case '5':
            return <Structure5 />;
        case '6':
            return <Structure6 />;
        case '7':
            return <Structure7 />;
        case '8':
            return <Structure8 />;
        default:
            return <PageNotFound />;
    }
}

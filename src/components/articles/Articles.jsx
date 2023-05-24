import React from 'react';
import { useParams } from 'react-router-dom';

export function Articles() {
    let params = useParams();
    console.log(params.lessonId); // "hotspur"
    return (
        <>

            <p>урок {params.lessonId} </p>
        </>
    )
}
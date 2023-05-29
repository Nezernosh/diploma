import React, { useState, useEffect, useCallback } from 'react';
import './quiz.css';
import pawnSvg from './pawn.svg';
import quizSvg from './quiz.svg';


const colors = ['#FF6347', '#FFFACD', '#228B22', '#4169E1', '#9370DB', '#FA8072'];

function Quiz({ questions }) {
    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [time, setTime] = useState(60);

    const answerQuestion = useCallback((answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer === questions[currentQuestion].correctAnswer;
        setAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
    }, [answers, currentQuestion, questions]);

    useEffect(() => {
        let timer = null;
        if (currentQuestion < questions.length) {
            timer = setInterval(() => {
                if (time > 0) {
                    setTime(time - 1);
                } else {
                    answerQuestion(null);
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [time, answerQuestion, currentQuestion, questions.length]);

    useEffect(() => {
        setTime(60);
    }, [currentQuestion]);

    const totalCorrect = answers.filter(Boolean).length;

    return (
        <div className="quiz">
            <h2>Квиз</h2>
            {!isStarted ? (
                <div className="start-screen">
                    <img src={quizSvg} alt="quiz" />
                    <button onClick={() => setIsStarted(true)}>начать</button>
                </div>
            ) : (
                <div className="play-screen">
                    <h3>Игровое поле:</h3>
                    <div className="field">
                        <div
                            className="pawn"
                            style={{ transform: `translateX(${currentQuestion * 100}%)`, width: `calc(100% / ${questions.length + 1})` }}
                        >
                            <img src={pawnSvg} alt="pawn" />
                        </div>
                        {questions.map((_, i) => (
                            <div key={i} className="circle" style={{ backgroundColor: colors[i % colors.length] }}>
                                {answers[i] === true && <p>✔</p>}
                                {answers[i] === false && <p>✖</p>}
                            </div>
                        ))}
                        <div key={questions.length + 1} className="finish"></div>
                    </div>
                    {currentQuestion >= questions.length ? (
                        <div className="results">
                            <h2>Ваш результат:</h2>
                            <p>{totalCorrect} из {questions.length} правильных ответов</p>
                            {(totalCorrect / questions.length) > 0.7 ? (
                                <p>Вы успешно прошли тест!</p>
                            ) : (
                                <p>Изучите материалы ещё раз и попробуйте снова.</p>
                            )}
                        </div>
                    ) : (
                        <div className="question">
                            <h2>{questions[currentQuestion].question}</h2>
                            <h3>Время на ответ: {time} сек.</h3>
                            {questions[currentQuestion].answers.map((answer, i) => (
                                <button key={i} className="answer" onClick={() => answerQuestion(answer)}>
                                    {answer}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Quiz;

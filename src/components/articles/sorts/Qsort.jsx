import React, { useState } from 'react';
import './qsort.css';

const Qsort = () => {
    const [array, setArray] = useState([]);
    const [input, setInput] = useState('');
    const [sorted, setSorted] = useState(false);
    const [sorting, setSorting] = useState(false);
    const [pivotValue, setPivotValue] = useState(null);
    const [lowerValues, setLowerValues] = useState([]);
    const [higherValues, setHigherValues] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAddClick = () => {
        let value = parseInt(input);
        if (!isNaN(value)) {
            let newArray = [...array];
            if (newArray.length >= 10) {
                newArray.shift();
            }
            newArray.push(value);
            setArray(newArray);
        }
    };

    const partition = (low, high) => {
        return new Promise(resolve => {
            setTimeout(async () => {
                let pivot = array[high];
                setPivotValue(pivot);
                let i = (low - 1);

                let lower = [];
                let higher = [];

                for (let j = low; j <= high - 1; j++) {
                    if (array[j] <= pivot) {
                        i++;
                        lower.push(array[j]);
                        [array[i], array[j]] = [array[j], array[i]];
                    } else {
                        higher.push(array[j]);
                    }
                }
                [array[i + 1], array[high]] = [array[high], array[i + 1]];

                setLowerValues(lower);
                setHigherValues(higher);

                resolve(i + 1);
            }, 3000);
        });
    }

    const quickSort = (low, high) => {
        return new Promise(resolve => {
            if (low <= high) {
                partition(low, high).then(async pi => {
                    await quickSort(low, pi - 1);
                    await quickSort(pi + 1, high);
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    const handleSort = async () => {
        setSorting(true);
        await quickSort(0, array.length - 1);
        setSorting(false);
        setSorted(true);
    };

    const handleReset = () => {
        setArray([]);
        setSorted(false);
        setPivotValue(null);
        setLowerValues([]);
        setHigherValues([]);
    };

    const getColor = (value) => {
        if (!sorting) return 'black';
        if (value === pivotValue) return '#1eb2a6';
        if (lowerValues.includes(value)) return '#FF6347';
        if (higherValues.includes(value)) return '#4169E1';
        return 'black';
    };

    return (
        <div className='qsort'>
            <input className='qsort-input' type="number" onChange={handleInputChange} disabled={sorted} placeholder='введите число'/>
            <button className='qsort-buttons' onClick={handleAddClick} disabled={sorted}>
                добавить элемент
            </button>
            <button className='qsort-buttons' onClick={handleSort} disabled={sorted}>
                начать сортировку
            </button>
            {sorted && <button className='qsort-buttons' onClick={handleReset}>сбросить</button>}
            <div className='array-elements'>
                [
                {array.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            color: getColor(item)
                        }}
                    >
                        {item},
                    </div>
                ))}
                ]
            </div>
            {sorted && <div className='qsort-result'>Массив отсортирован</div>}
        </div>
    );
};

export default Qsort

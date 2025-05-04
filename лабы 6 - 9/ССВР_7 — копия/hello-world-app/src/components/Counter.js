import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/actions/counterActions';

const Counter = () => {
    const count = useSelector(state => state.counter.count);
    //Получаем значение счетчика из состояния Redux
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Counter component mounted');

        return () => {
            console.log('Counter component unmounted');
        };
    }, []);

    return (
        <div>
            <h1>Счетчик: {count}</h1>
            <button onClick={() => dispatch(increment())}>Увеличить</button>
            <button onClick={() => dispatch(decrement())}>Уменьшить</button>
        </div>
    );
};

export default Counter;

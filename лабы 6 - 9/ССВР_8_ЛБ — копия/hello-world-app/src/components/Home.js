import React, { useEffect } from 'react';
import Feedback from './Feedback';
const Home = () => {
    useEffect(() => {
        console.log('Установленный домашний компонент');
        return () => {
            console.log('Размонтированный домашний компонент');
        };
    }, []);

    return (
        <div>
            <h1>Оставьте свое мнение</h1>
            <Feedback />
        </div>
    );
};

export default Home;
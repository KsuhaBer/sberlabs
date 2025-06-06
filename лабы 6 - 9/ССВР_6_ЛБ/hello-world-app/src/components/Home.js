import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        console.log('Установленный домашний компонент');
        return () => {
            console.log('Размонтированный домашний компонент');
        };
    }, []);

    return (
        <div>
            <h1>Отзывы</h1>
        </div>
    );
};

export default Home;
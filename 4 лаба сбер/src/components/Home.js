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
            <h1>Николай Петрович Воронин</h1>
            <p>Египетская сила.....</p>
        </div>
    );
};

export default Home;
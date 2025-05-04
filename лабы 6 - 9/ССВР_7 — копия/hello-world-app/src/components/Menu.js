import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Menu = ({ labs, onLabSelect, open, onClose }) => {
    const navigate = useNavigate(); // Получаем функцию навигации

    const handleLabSelect = (index) => {
        onLabSelect(index); // Выбор лабораторной работы
        navigate('/Main'); // Переключение на страницу Main
        onClose(); // Закрываем меню
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List
                style={{
                    width: '200px',
                    minHeight: '100vh',
                    borderRight: '1px solid #ccc',
                    boxSizing: 'border-box'
                }}
            >
                {labs.map((lab, index) => (
                    <ListItem button key={index} onClick={() => handleLabSelect(index)}>
                        <ListItemText primary={lab.title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Menu;
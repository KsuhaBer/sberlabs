const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let feedbacks = [];

// Регистрация пользователя
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Проверка на существование пользователя
    const existingUser  = users.find(u => u.username === username || u.email === email);
    if (existingUser ) {
        return res.status(400).send('Пользователь с таким именем или электронной почтой уже существует');
    }

    // Проверка на валидность электронной почты
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Некорректный адрес электронной почты');
    }

    users.push({ username, password, email });
    res.status(201).send('Пользователь зарегистрирован');
});

// Авторизация пользователя
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.status(200).json({ 
            message: 'Успешный вход',
            user: {
                username: user.username,
                email: user.email, // Возвращаем email
            }
        });
    } else {
        res.status(401).json({ message: 'Неверные учетные данные' });
    }
});

// Получение отзывов
app.get('/feedback', (req, res) => {
    res.send(feedbacks);
});

// Добавление отзыва
app.post('/feedback', (req, res) => {
    const { feedback } = req.body;
    feedbacks.push(feedback);
    res.status(201).send({ message: 'Отзыв добавлен' });
});

// Удаление отзыва
app.delete('/feedback/:index', (req, res) => {
    const index = req.params.index;
    feedbacks.splice(index, 1);
    res.send({ message: 'Отзыв удален' });
});

// Обновление профиля
app.put('/updateProfile', (req, res) => {
    const { username, password } = req.body;
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex !== -1) {
        users[userIndex].password = password; // Обновляем пароль
        res.status(200).send('Профиль обновлен успешно');
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

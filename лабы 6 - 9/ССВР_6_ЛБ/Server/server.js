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
    const { username, password } = req.body;
    users.push({ username, password });
    res.status(201).send({ message: 'Пользователь зарегистрирован' });
});

// Авторизация пользователя
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).send({ message: 'Успешный вход' });
    } else {
        res.status(401).send({ message: 'Неверные учетные данные' });
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

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());


// Эндпоинт для регистрации
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.status(201).send('User  registered');
});

// Эндпоинт для авторизации
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Эндпоинт для обновления профиля
app.put('/updateProfile', (req, res) => {
    const { username, password } = req.body;
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex !== -1)

        if (userIndex !== -1) {
            users[userIndex].password = password; // Обновляем пароль
            res.status(200).send('Profile updated successfully');
        } else {
            res.status(404).send('User  not found');
        }
    });
    
    // Запуск сервера
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    
    app.post('/register', (req, res) => {
        console.log('Регистрация:', req.body); // Логируем данные регистрации
        const { username, password } = req.body;
        const existingUser   = users.find(u => u.username === username);
        
        if (existingUser ) {
            return res.status(400).send('Пользователь уже существует');
        }
    
        users.push({ username, password });
        res.status(201).send('Пользователь зарегистрирован');
    });
    
    app.post('/login', (req, res) => {
        console.log('Вход:', req.body); // Логируем данные входа
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            res.status(200).send('Вход выполнен успешно');
        } else {
            res.status(401).send('Неверные учетные данные');
        }
    });
    
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;




app.use(cors());
app.use(bodyParser.json());
let feedbacks = [];


app.get('/feedback', (req, res) => {
    console.log('Получен запрос /feedback');
    const delay = req.query.delay ? parseInt(req.query.delay) : 1000;
    
    setTimeout(() => {
      console.log('Отправляю ответ');
      res.json(feedbacks);
    }, delay);
  });

// Инициализация пользователей с полем isBlocked
let users = [
    { username: 'user1', password: 'password1', role: 'user', isBlocked: false },
    { username: 'admin1', password: 'adminpass1', role: 'admin', isBlocked: false },
    { username: 'user1', password: 'password1', role: 'user', isBlocked: false },
    { username: 'admin1', password: 'adminpass1', role: 'admin', isBlocked: false },
    { username: 'user2', password: 'password2', role: 'user', isBlocked: false },
    { username: 'user3', password: 'password3', role: 'user', isBlocked: false },
    { username: 'user4', password: 'password4', role: 'user', isBlocked: true },
    { username: 'user5', password: 'password5', role: 'user', isBlocked: false },
    { username: 'user6', password: 'password6', role: 'user', isBlocked: true },
    { username: 'user7', password: 'password7', role: 'user', isBlocked: false },
    { username: 'user8', password: 'password8', role: 'user', isBlocked: false },
    { username: 'user9', password: 'password9', role: 'user', isBlocked: true },
    { username: 'user10', password: 'password10', role: 'user', isBlocked: false },
    { username: 'user11', password: 'password11', role: 'user', isBlocked: false },
    { username: 'user12', password: 'password12', role: 'user', isBlocked: true },
    { username: 'user13', password: 'password13', role: 'user', isBlocked: false },
    { username: 'user14', password: 'password14', role: 'user', isBlocked: false },
    { username: 'user15', password: 'password15', role: 'user', isBlocked: true },
    { username: 'user16', password: 'password16', role: 'user', isBlocked: false },
    { username: 'user17', password: 'password17', role: 'user', isBlocked: false },
    { username: 'user18', password: 'password18', role: 'user', isBlocked: true },
    { username: 'user19', password: 'password19', role: 'user', isBlocked: false },
    { username: 'user20', password: 'password20', role: 'user', isBlocked: false },
    { username: 'admin2', password: 'adminpass2', role: 'admin', isBlocked: false },
    { username: 'admin3', password: 'adminpass3', role: 'admin', isBlocked: true },
    { username: 'user21', password: 'password21', role: 'user', isBlocked: false },
    { username: 'user22', password: 'password22', role: 'user', isBlocked: false },
    { username: 'user23', password: 'password23', role: 'user', isBlocked: true },
    { username: 'user24', password: 'password24', role: 'user', isBlocked: false },
    { username: 'user25', password: 'password25', role: 'user', isBlocked: false },
    { username: 'user26', password: 'password26', role: 'user', isBlocked: true },
    { username: 'user27', password: 'password27', role: 'user', isBlocked: false },
    { username: 'user28', password: 'password28', role: 'user', isBlocked: false },
    { username: 'user29', password: 'password29', role: 'user', isBlocked: true },
    { username: 'user30', password: 'password30', role: 'user', isBlocked: false },
    { username: 'user31', password: 'password31', role: 'user', isBlocked: false },
    { username: 'user32', password: 'password32', role: 'user', isBlocked: true },
    { username: 'user33', password: 'password33', role: 'user', isBlocked: false },
    { username: 'user34', password: 'password34', role: 'user', isBlocked: false },
    { username: 'user35', password: 'password35', role: 'user', isBlocked: true },
    { username: 'user36', password: 'password36', role: 'user', isBlocked: false },
    { username: 'user37', password: 'password37', role: 'user', isBlocked: false },
    { username: 'user38', password: 'password38', role: 'user', isBlocked: true },
        { username: 'user38', password: 'password38', role: 'user', isBlocked: true },
    { username: 'user39', password: 'password39', role: 'user', isBlocked: false },
    { username: 'user40', password: 'password40', role: 'user', isBlocked: false },
    { username: 'user41', password: 'password41', role: 'user', isBlocked: true },
    { username: 'user42', password: 'password42', role: 'user', isBlocked: false },
    { username: 'user43', password: 'password43', role: 'user', isBlocked: false },
    { username: 'user44', password: 'password44', role: 'user', isBlocked: true },
    { username: 'user45', password: 'password45', role: 'user', isBlocked: false },
    { username: 'user46', password: 'password46', role: 'user', isBlocked: false },
    { username: 'user47', password: 'password47', role: 'user', isBlocked: true },
    { username: 'user48', password: 'password48', role: 'user', isBlocked: false },
    { username: 'user49', password: 'password49', role: 'user', isBlocked: false },
    { username: 'user50', password: 'password50', role: 'user', isBlocked: true },
    { username: 'admin4', password: 'adminpass4', role: 'admin', isBlocked: false },
    { username: 'admin5', password: 'adminpass5', role: 'admin', isBlocked: true },

];

// Регистрация пользователя
app.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const existingUser  = users.find(u => u.username === username);
    
    if (existingUser ) {
        return res.status(400).send('Пользователь уже существует');
    }
    
    if (!role || (role !== 'user' && role !== 'admin')) {
        return res.status(400).send('Роль должна быть "user" или "admin"');
    }

    users.push({ username, password, role, isBlocked: false });
    res.status(201).send({ message: 'Пользователь зарегистрирован', role });
});

// Получение списка пользователей (без паролей)
app.get('/users', (req, res) => {
    const usersWithoutPasswords = users.map((user, index) => ({
        id: index + 1,
        username: user.username,
        role: user.role,
        isBlocked: user.isBlocked // Теперь передаем реальное состояние блокировки
    }));
    res.json(usersWithoutPasswords);
});

// Блокировка пользователя
app.put('/users/block/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find(u => u.username === username);
    
    if (user) {
        user.isBlocked = true;
        console.log(`User   ${username} blocked.`); // Log action
        res.status(200).send({ message: 'Пользователь заблокирован' });
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

// Разблокировка пользователя
app.put('/users/unblock/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find(u => u.username === username);
    
    if (user) {
        user.isBlocked = false;
        console.log(`User   ${username} unblocked.`); // Log action
        res.status(200).send({ message: 'Пользователь разблокирован' });
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

// Удаление пользователя
app.delete('/users/:username', (req, res) => {
    const { username } = req.params;
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).send({ message: 'Пользователь удален' });
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(401).send('Пользователь не найден');
        }
    
        if (user.isBlocked) {
            return res.status(403).send('Пользователь заблокирован. Доступ запрещен.');
        }
    
        if (user.password === password) {
            return res.status(200).send({ message: 'Вход выполнен успешно', role: user.role });
        } else {
            return res.status(401).send('Неверные учетные данные');
        }
    });

// Добавляем функцию задержки в начало файла
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Получение всех отзывов
app.get('/feedback', (req, res) => {
    
    res.json(feedbacks);
});

// Добавление нового отзыва
app.post('/feedback', (req, res) => {
    const { feedback, username } = req.body;
    
    if (!feedback) {
        return res.status(400).send('Текст отзыва обязателен');
    }

    const newFeedback = {
        id: feedbacks.length + 1,
        text: feedback,
        username: username || 'Аноним',
        createdAt: new Date().toISOString()
    };

    feedbacks.push(newFeedback);
    res.status(201).json(newFeedback);
});

// Удаление отзыва
app.delete('/feedback/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = feedbacks.findIndex(fb => fb.id === id);

    if (index === -1) {
        return res.status(404).send('Отзыв не найден');
    }

    feedbacks.splice(index, 1);
    res.status(200).send({ message: 'Отзыв удален' });
});

// Обновление отзыва
app.put('/feedback/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { feedback } = req.body;
    const index = feedbacks.findIndex(fb => fb.id === id);

    if (index === -1) {
        return res.status(404).send('Отзыв не найден');
    }

    feedbacks[index].text = feedback;
    res.status(200).json(feedbacks[index]);
});

// Обновление профиля
app.put('/updateProfile', (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    
    // Находим пользователя
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    // Проверяем текущий пароль
    if (user.password !== currentPassword) {
        return res.status(403).json({ message: 'Неверный текущий пароль' });
    }
    
    // Обновляем пароль
    user.password = newPassword;
    
    res.status(200).json({ 
        message: 'Профиль обновлен успешно',
        user: {
            username: user.username,
            role: user.role,
            isBlocked: user.isBlocked
        }
    });
});
    
    // Запуск сервера
    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
    
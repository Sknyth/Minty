const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // временно вместо БД
const JWT_SECRET = 'super_secret_key';

// ===== Регистрация =====
app.post('/api/register', async (req, res) => {
  const { email, password, name, surname, phone } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    surname,
    phone
  };

  users.push(user);

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, surname: user.surname, phone: user.phone },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// ===== Логин =====
app.post('/api/login', async (req, res) => {
  const { email, password, name } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Неверные данные' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Неверные данные' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// ===== Middleware проверки JWT =====
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Нет токена' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
}

// ===== Защищённый роут - получить профиль =====
app.get('/api/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }
  
  res.json({
    message: 'Вы авторизованы',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      phone: user.phone
    },
  });
});

// ===== Защищённый роут - обновить профиль =====
app.put('/api/profile', authMiddleware, (req, res) => {
  const { name, surname, email, phone } = req.body;
  
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }
  
  // Обновляем данные
  if (name) user.name = name;
  if (surname) user.surname = surname;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  
  res.json({
    message: 'Профиль обновлен',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      phone: user.phone
    },
  });
});

app.listen(3000, () => {
  console.log('Backend on http://localhost:3000');
});

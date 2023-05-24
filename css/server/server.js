const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000; // Выберите порт для вашего сервера

// Настройка транспорта для отправки электронной почты с помощью Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com', // Замените на вашу Gmail почту
    pass: 'YOUR_PASSWORD' // Замените на пароль от вашей Gmail почты
  }
});

// Обработка POST запроса от клиента
app.post('/send-email', express.json(), (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // Параметры письма
  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com', // Замените на вашу Gmail почту
    to: 'YOUR_DESTINATION_EMAIL@gmail.com', // Замените на адрес, на который вы хотите получать номера телефонов
    subject: 'Новый номер телефона',
    text: `Номер телефона: ${phoneNumber}`
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Ошибка при отправке письма');
    } else {
      console.log('Письмо успешно отправлено: ' + info.response);
      res.status(200).send('Письмо успешно отправлено');
    }
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

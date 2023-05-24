const express = require('express');
const app = express();
const path = require('path');

// Установка папки для статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Обработчик POST-запроса на адрес '/send_phone'
app.post('/send_phone', (req, res) => {
  let phoneNumber = '';

  req.on('data', (chunk) => {
    phoneNumber += chunk;
  });

  req.on('end', () => {
    // Далее вы можете выполнить необходимые действия с номером телефона,
    // например, сохранить его в базе данных или отправить уведомление менеджеру.

    // Пример вывода номера телефона в консоль
    console.log('Номер телефона:', phoneNumber);

    // Отправка ответа клиенту
    res.send('Номер телефона успешно получен');
  });
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

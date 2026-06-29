const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Путь к файлу с ключом сервисного аккаунта
const KEYFILEPATH = path.join(__dirname, 'key.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// ID вашей папки на Google Диске (вы уже дали: 1irxVmfUx1yxvtAzmKijeon0cNtBdNSF6)
const FOLDER_ID = '1irxVmfUx1yxvtAzmKijeon0cNtBdNSF6';

// Эндпоинт для получения access-токена и ID папки
app.get('/get-token', async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    res.json({
      accessToken: token.token,
      folderId: FOLDER_ID,
    });
  } catch (error) {
    console.error('Ошибка получения токена:', error);
    res.status(500).json({ error: error.message });
  }
});

// Простой проверочный эндпоинт (чтобы убедиться, что сервер работает)
app.get('/', (req, res) => {
  res.send('Бэкенд для загрузки на Google Диск работает!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

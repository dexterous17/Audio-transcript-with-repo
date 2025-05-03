/* eslint-env node */
// eslint-disable-next-line no-unused-vars
// Express server setup for audio app backend
import express from 'express';
import multer from 'multer';
import sqlite3 from 'sqlite3';
import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import process from 'process';

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server/logs/app.log' })
  ]
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads as static
app.use('/uploads', (req, res, next) => {
  if (req.path.endsWith('.webm')) {
    res.type('audio/webm');
  }
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload setup
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// SQLite setup
const dbPath = path.join(__dirname, 'audio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Could not connect to database', err);
  } else {
    logger.info('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS audios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    source TEXT NOT NULL
  )`);
});

// Get all audio records
app.get('/audios', (req, res) => {
  logger.info('GET /audios called');
  db.all('SELECT id, title, description FROM audios', [], (err, rows) => {
    if (err) {
      logger.error('Error fetching audios', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Serve audio file for a given card ID
app.get('/audios/:id/audio', (req, res) => {
  logger.info('GET /audios/:id/audio called', { id: req.params.id });
  const id = req.params.id;
  db.get('SELECT source FROM audios WHERE id = ?', [id], (err, row) => {
    if (err) {
      logger.error('Error finding audio for streaming', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Audio not found' });
    }
    const filePath = path.join(__dirname, row.source);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Audio file not found on disk' });
    }
    res.type('audio/webm');
    fs.createReadStream(filePath).pipe(res);
  });
});

// Upload a new audio file and save metadata
app.post('/audios', upload.single('audio'), (req, res) => {
  logger.info('POST /audios called', { body: req.body, file: req.file });
  const { title, description } = req.body;
  if (!req.file || !title) {
    return res.status(400).json({ error: 'Audio file and title are required' });
  }
  const source = '/uploads/' + req.file.filename;
  db.run(
    'INSERT INTO audios (title, description, source) VALUES (?, ?, ?)',
    [title, description, source],
    function (err) {
      if (err) {
        logger.error('Error inserting audio', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ id: this.lastID, title, description, source });
    }
  );
});

// Delete an audio record and its file
app.delete('/audios/:id', (req, res) => {
  logger.info('DELETE /audios/:id called', { id: req.params.id });
  const id = req.params.id;
  db.get('SELECT source FROM audios WHERE id = ?', [id], (err, row) => {
    if (err) {
      logger.error('Error finding audio', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Audio not found' });
    }
    const filePath = path.join(__dirname, row.source);
    db.run('DELETE FROM audios WHERE id = ?', [id], (err) => {
      if (err) {
        logger.error('Error deleting audio', err);
        return res.status(500).json({ error: 'Database error' });
      }
      fs.unlink(filePath, (fsErr) => {
        if (fsErr && fsErr.code !== 'ENOENT') {
          logger.error('Error deleting file', fsErr);
        }
        res.json({ success: true });
      });
    });
  });
});

// Update an audio record (title, description, optionally replace file)
app.put('/audios/:id', upload.single('audio'), (req, res) => {
  logger.info('PUT /audios/:id called', { id: req.params.id, body: req.body, file: req.file });
  const id = req.params.id;
  const { title, description } = req.body;
  db.get('SELECT * FROM audios WHERE id = ?', [id], (err, row) => {
    if (err) {
      logger.error('Error finding audio', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Audio not found' });
    }
    let newSource = row.source;
    if (req.file) {
      // Delete old file
      fs.unlink(row.source, (fsErr) => {
        if (fsErr && fsErr.code !== 'ENOENT') {
          logger.error('Error deleting old file', fsErr);
        }
      });
      newSource = '/uploads/' + req.file.filename;
    }
    db.run(
      'UPDATE audios SET title = ?, description = ?, source = ? WHERE id = ?',
      [title || row.title, description || row.description, newSource, id],
      function (err) {
        if (err) {
          logger.error('Error updating audio', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.json({ id, title: title || row.title, description: description || row.description, source: newSource });
      }
    );
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
}); 
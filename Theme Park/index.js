const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();


const db = new sqlite3.Database('./Data base/theme_park.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Database opened successfully');

    
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating contacts table:', err.message);
      } else {
        console.log('Contacts table created or already exists');
      }
    });
  }
});


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to the Theme Park!' });
});

app.get('/areas', (req, res) => {
  db.all('SELECT * FROM areas', [], (err, rows) => {
    if (err) throw err;
    res.render('areas', { areas: rows });
  });
});

app.get('/attractions', (req, res) => {
  db.all(
    'SELECT attractions.name AS attraction_name, attractions.description, areas.name AS area_name FROM attractions JOIN areas ON attractions.area_id = areas.id',
    [],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Database error');
      } else {
        res.render('attractions', { attractions: rows });
      }
    }
  );
});

app.get('/faq', (req, res) => {
  res.render('faq');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});


app.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  
  console.log('Received data:', { name, email, phone, message });

  const sql = `INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)`;
  const params = [name, email, phone, message];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).send('There was an error processing your request.');
    } else {
      console.log('Data inserted successfully');
      res.send('Thank you for contacting us!');
    }
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

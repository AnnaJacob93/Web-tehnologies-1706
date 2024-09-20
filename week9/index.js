const express = require('express'); const bodyParser = require('body-parser'); const 
sqlite3 = require('sqlite3').verbose(); const app = express(); const port = 5000; // Port as 
specified in your brief // Middlewares app.use(bodyParser.urlencoded({ extended: true 
})); app.use(express.static('public')); // To serve static files like CSS and JS // Database 
setup const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | 
sqlite3.OPEN_CREATE, (err) => { if (err) { console.error("Error opening database " + 
err.message); } else { db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER 
PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, 
message TEXT NOT NULL)', (err) => { if (err) { console.error("Error creating table " + 
err.message); } }); } }); // Routes app.get('/', (req, res) => { res.sendFile(__dirname + 
'/index.html'); // Ensure this points to your actual HTML file location }); 
app.post('/submit-form', (req, res) => { const { name, email, message } = req.body; 
db.run('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', [name, email, 
message], function(err) { if (err) { return console.error(err.message); } console.log(`A row 
has been inserted with rowid ${this.lastID}`); res.send("Thank you for your 
message!"); }); }); // Start server app.listen(port, () => { console.log(`Server running on 
http://localhost:${port}`); });
// starup set for database setup we will be using sqlite for stroing the issues etc 
// 
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./issues.db', (err)=>{
    if(err){
        console.log('error opening database: ', err.message);

    }
    else{
    console.log('connected to the Sqlite Database Succesfully.');

  // Enable foreign key constraints (CRITICAL FOR SQLite)
    db.run('PRAGMA foreign_keys = ON;');

    db.run(
    `CREATE TABLE IF NOT EXISTS students (
    student_number TEXT PRIMARY KEY,
    room_number TEXT NOT NULL
)`)
    db.run(
        `CREATE TABLE IF NOT EXISTS issues ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_number TEXT NOT NULL,
        name TEXT,
        category TEXT NOT NULL,
            urgency TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT DEFAULT 'new',
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)
            `);
   db.run(`INSERT OR IGNORE INTO students (student_number, room_number) VALUES
      ('2663814', '224A')`);
    }
});

module.exports = db;
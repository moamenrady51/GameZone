/*    Requires     */
const express = require('express');
const path = require('path')
const userRouter = require('./routes/userRoutes');
const gameRouter = require('./routes/gameRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());

// setting up the pug view engine 

app.set('view engine' , 'pug');
app.set('views' , './views');

app.use(express.static(path.join(__dirname, 'golbalData')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/Game_api/v1/Users', userRouter);
app.use('/Game_api/v1/Reviews', reviewRouter);
app.use('/Game_api/v1/Games', gameRouter);




// Error-handling middleware

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.error('Error 💥:', err);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

module.exports = app;






/*
check this 




// Importing the required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {              <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // Serve the HTML file when the root route is accessed
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// Start the server and listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/
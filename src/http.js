/* eslint-disable no-console */
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const http = createServer(app); // Create http protocol
const io = new Server(http); // Create websocket protocol

app.use(express.json()); // Middleware parses incoming requests with JSON payloads

// Health check
app.get('/', (req, res) => {
  res.status(200).send('ok');
});

// ================ STATIC FILES ================
app.use(express.static(path.join(__dirname, '/public'))); // Middleware for rendering static files
app.set('views', path.join(__dirname, '/public', '/html')); // Specifiyng the views module
app.engine('html', require('ejs').renderFile); // Template engine html

// Rendering screens with countries data
app.get('/home', (req, res) => {
  res.render('index.html');
});

// Render controller, which uses to change countries screen
app.get('/controller', (req, res) => {
  // Receive country and conversion value
  const dataConversion = req.query;

  // Send data to service constructor (Construir a lista de objetos do tipo Country)
  res.render('controller.html');
});

// Render country-page
app.get('/country-page', (req, res) => {
  res.render('country-page.html');
});

// ================ ROUTES ================
const formRouter = require('./api/routes/forms');

app.use('/forms', formRouter);

// ================ SOCKET ================
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
});

module.exports = { http, io };

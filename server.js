const http = require('http');
const fs = require('fs');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Lese die index.html-Datei und sende sie als Antwort
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/start-spam') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { phoneNumber, countryCode } = JSON.parse(body);
      
      // Hier können Sie den Spam-Prozess starten
      const { state, saveCreds } = await useMultiFileAuthState('.mm');
      const spam = makeWaSocket({
        auth: state,
        mobile: true,
        logger: pino({ level: 'silent' })
      });
      
      // Code hier, um den Spam-Prozess zu starten
      // ...

      res.writeHead(200);
      res.end('Spam started successfully.');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

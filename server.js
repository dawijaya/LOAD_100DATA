const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Membuat path ke file index.html
    const filePath = path.join(__dirname, 'public', 'index.html');

    // Membaca isi file index.html
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Jika terjadi kesalahan, kirim respons dengan kode status 500 (Internal Server Error)
            res.writeHead(500);
            res.end('Internal Server Error');
        } else {
            // Jika berhasil, kirim respons dengan isi file index.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const app = express();
const path = require('path');

// Middleware untuk menangani data JSON dalam permintaan POST dan PUT
app.use(express.json());

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Data dummy
const dummyData = require('./DummyData');

// Endpoint untuk mengambil data pengguna berdasarkan ID
app.get('/data/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Mengambil ID pengguna dari parameter URL
    const user = dummyData.find(user => user.id === userId); // Mencari pengguna dengan ID yang cocok
    if (user) {
        res.json(user); // Mengirimkan data pengguna jika ditemukan
    } else {
        res.status(404).json({ message: 'User not found' }); // Mengirimkan respons 404 jika pengguna tidak ditemukan
    }
});

// Endpoint untuk mengirimkan data dummy
app.get('/data', (req, res) => {
    res.json(dummyData);
});

// Endpoint untuk menyajikan halaman HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint untuk menambahkan user baru
app.post('/users', (req, res) => {
    const newUser = req.body; // Mengambil data user dari body permintaan
    dummyData.push(newUser); // Menambahkan user baru ke dalam data dummy
    res.status(201).json(newUser); // Mengirimkan respons dengan data user baru yang ditambahkan
});

// Endpoint untuk mendapatkan semua user
app.get('/users', (req, res) => {
    res.json(dummyData); // Mengirimkan semua data dummy user dalam bentuk JSON
});

// Endpoint untuk mendapatkan satu user berdasarkan ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = dummyData.find(user => user.id === parseInt(userId));
    if (user) {
        res.json(user); // Mengirimkan user yang ditemukan dalam bentuk JSON
    } else {
        res.status(404).json({ message: 'User not found' }); // Memberikan respons bahwa user tidak ditemukan
    }
});

// Endpoint untuk mengedit user berdasarkan ID
// Endpoint untuk mengedit user berdasarkan ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body; // Mengambil data user yang diperbarui dari body permintaan
    const index = dummyData.findIndex(user => user.id === userId);
    if (index !== -1) {
        // Memperbarui data user di dalam data dummy
        dummyData[index] = {...dummyData[index], ...updatedUser };
        // Mengirimkan respons dengan data user yang diperbarui
        res.json(dummyData[index]);
    } else {
        // Memberikan respons bahwa user tidak ditemukan
        res.status(404).json({ message: 'User not found' });
    }
});



// Endpoint untuk menghapus user berdasarkan ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const index = dummyData.findIndex(user => user.id === parseInt(userId));
    if (index !== -1) {
        dummyData.splice(index, 1); // Menghapus user dari data dummy
        res.status(204).send(); // Mengirimkan respons tanpa konten setelah penghapusan berhasil
    } else {
        res.status(404).json({ message: 'User not found' }); // Memberikan respons bahwa user tidak ditemukan
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
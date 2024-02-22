// Fungsi untuk menampilkan data dari server
async function displayData() {
    try {
        const response = await fetch('/data');
        const data = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        data.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `<span>Name:</span>${user.name} <span>Email:</span>${user.email} 
                            <button onclick="editUser(${user.id})">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fungsi untuk menambahkan user baru
async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name && email) {
        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });
            const newUser = await response.json();
            displayData(); // Tampilkan ulang data setelah menambahkan user baru
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
        } catch (error) {
            console.error('Error creating user:', error);
        }
    } else {
        alert('Please enter name and email');
    }
}

// Fungsi untuk menghapus user
async function deleteUser(id) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
        try {
            await fetch(`/users/${id}`, { // Menggunakan endpoint '/users/:id'
                method: 'DELETE'
            });
            displayData(); // Tampilkan ulang data setelah menghapus user
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}

// Fungsi untuk mengedit user
async function editUser(id) {
    const newName = prompt('Enter new name:');
    const newEmail = prompt('Enter new email:');
    if (newName && newEmail) {
        try {
            await fetch(`/users/${id}`, { // Menggunakan endpoint '/users/:id'
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newName, email: newEmail })
            });
            displayData(); // Tampilkan ulang data setelah mengedit user
        } catch (error) {
            console.error('Error updating user:', error);
        }
    } else {
        alert('Please enter valid name and email');
    }
}

// Panggil fungsi untuk menampilkan data saat halaman dimuat
window.onload = displayData;
const dummyData = [];

for (let i = 1; i <= 100; i++) {
    dummyData.push({ id: i, name: `Data ${i}`, email: `data${i}@example.com` });
}

module.exports = dummyData;
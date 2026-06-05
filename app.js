const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('CI/CD Pipeline Successfully Deployed!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
app.get('/k8s', (req, res) => {
    res.send("Hello from Kubernetes v2");
});
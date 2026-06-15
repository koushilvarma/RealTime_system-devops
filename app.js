const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>CI/CD Login Demo</title>
        </head>
        <body style="font-family: Arial; text-align:center; margin-top:100px;">
            <h1>CI/CD Pipeline Demo Application</h1>
            <h2>Kubernetes + Jenkins + Docker</h2>

            <form action="/login" method="POST">
                <input type="text" name="username" placeholder="Username" required />
                <br><br>

                <input type="password" name="password" placeholder="Password" required />
                <br><br>

                <button type="submit">Login</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/login', (req, res) => {

    const username = req.body.username;

    res.send(`
        <html>
        <body style="font-family: Arial; text-align:center; margin-top:100px;">
            <h1>Welcome ${username}!</h1>

            <h2>Application Successfully Deployed via CI/CD Pipeline</h2>

            <ul style="list-style:none;">
                <li>✅ GitHub</li>
                <li>✅ Jenkins</li>
                <li>✅ Docker</li>
                <li>✅ Kubernetes</li>
                <li>✅ Prometheus</li>
                <li>✅ Grafana</li>
            </ul>
        </body>
        </html>
    `);
});

app.get('/k8s', (req, res) => {
    res.send("Hello from Kubernetes v3");
});

app.get('/webhook', (req, res) => {
    res.send("Webhook Auto Trigger Test");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '..', 'public', 'build');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.send('index.html');
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Frontend server is up!');
});

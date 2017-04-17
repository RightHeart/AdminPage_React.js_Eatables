const express = require('express');
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// In production env we need to use express.
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Web app listening on port ${PORT}!`);
});
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/message', (req, res) => {
    console.log('Request received');
    res.json({ message: 'Hello from the backend!' });
});


app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});

console.log('Backend started');
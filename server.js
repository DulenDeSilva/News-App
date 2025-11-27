const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
const apiKey = 'af08045ea98c46c7ad7859da4eb22c81';

app.use(cors());
app.use(express.json());

app.get('/news', async (req, res) => {
    const { query, from, to, language } = req.query;

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                from,
                to,
                language,
                apiKey,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

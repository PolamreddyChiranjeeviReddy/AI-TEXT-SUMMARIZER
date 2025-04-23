

const express = require('express');
const summarizeText = require('./summarize');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(express.json());  // Built-in middleware to parse JSON requests
app.use(cors())
// POST endpoint to summarize text
app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  if (!text || text.length < 200) {
    return res.status(400).json({ error: 'Text must be at least 200 characters long.' });
  }

  summarizeText(text)
    .then(summary => {
      res.json({ summary }); // Send the summary as a JSON response
    })
    .catch(error => {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Failed to summarize the text.' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

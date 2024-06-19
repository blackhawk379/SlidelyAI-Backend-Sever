// server.ts
import express from 'express';
import bodyParser from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
const dbFile = 'db.json';

app.use(bodyParser.json());

// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.json(true);
});

// Endpoint to submit form data
app.post('/submit', (req, res) => {
    const { name, email, phone, github, stopwatch } = req.body;
    const newSubmission = { name, email, phone, github, stopwatch };

    let submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    submissions.push(newSubmission);
    fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));

    res.status(200).json({ message: 'Submission successful' });
});

// Endpoint to read a specific submission
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);
    let submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

    if (index < 0 || index >= submissions.length) {
        res.status(400).json({ message: 'Invalid index' });
    } else {
        res.status(200).json(submissions[index]);
    }
});

// Endpoint to delete a specific submission by query parameter
app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index as string);
    let submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

    if (index < 0 || index >= submissions.length) {
        res.status(400).json({ message: 'Invalid index' });
    } else {
        submissions.splice(index, 1);
        fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
        res.status(200).json({ message: 'Submission deleted successfully' });
    }
});

// Endpoint to update a specific submission by index
app.put('/update', (req, res) => {
    const index = parseInt(req.query.index as string);
    const { name, email, phone, github, stopwatch } = req.body;
    let submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

    if (index < 0 || index >= submissions.length) {
        res.status(400).json({ message: 'Invalid index' });
    } else {
        submissions[index] = { name, email, phone, github, stopwatch };
        fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
        res.status(200).json({ message: 'Submission updated successfully' });
    }
});


// Endpoint to get the total count of submissions
app.get('/count', (req, res) => {
    let submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    res.status(200).json({ count: submissions.length });
});


// Initialize the JSON database file if it doesn't exist
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]));
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

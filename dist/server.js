"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const express_2 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
const dbFile = 'db.json';
app.use(express_2.default.json());
// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.json(true);
});
// Endpoint to submit form data
app.post('/submit', (req, res) => {
    const { name, email, phone, github, stopwatch } = req.body;
    const newSubmission = { name, email, phone, github, stopwatch };
    let submissions = JSON.parse(fs_1.default.readFileSync(dbFile, 'utf8'));
    submissions.push(newSubmission);
    fs_1.default.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
    res.status(200).json({ message: 'Submission successful' });
});
// Endpoint to read a specific submission
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index);
    let submissions = JSON.parse(fs_1.default.readFileSync(dbFile, 'utf8'));
    if (index < 0 || index >= submissions.length) {
        res.status(400).json({ message: 'Invalid index' });
    }
    else {
        res.status(200).json(submissions[index]);
    }
});
// Endpoint to delete a specific submission by query parameter
app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index);
    let submissions = JSON.parse(fs_1.default.readFileSync(dbFile, 'utf8'));
    if (index < 0 || index >= submissions.length) {
        res.status(400).json({ message: 'Invalid index' });
    }
    else {
        submissions.splice(index, 1);
        fs_1.default.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
        res.status(200).json({ message: 'Submission deleted successfully' });
    }
});
// Endpoint to update a specific submission by index
app.put('/update', (req, res) => {
    const index = parseInt(req.query.index);
    const { name, email, phone, github, stopwatch } = req.body;
    let submissions = JSON.parse(fs_1.default.readFileSync(dbFile, 'utf8'));
    if (index < 0 || index >= submissions.length) {
        res.status(400).json({ message: 'Invalid index' });
    }
    else {
        submissions[index] = { name, email, phone, github, stopwatch };
        fs_1.default.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
        res.status(200).json({ message: 'Submission updated successfully' });
    }
});
// Endpoint to get the total count of submissions
app.get('/count', (req, res) => {
    let submissions = JSON.parse(fs_1.default.readFileSync(dbFile, 'utf8'));
    res.status(200).json({ count: submissions.length });
});
// Initialize the JSON database file if it doesn't exist
if (!fs_1.default.existsSync(dbFile)) {
    fs_1.default.writeFileSync(dbFile, JSON.stringify([]));
}
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

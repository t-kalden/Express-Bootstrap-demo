import express from 'express';
import path from 'path';
import redditData from './data.json';

// const redditData = require('./data.json');
console.log(redditData)
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.get("/", (req, res) => {
    res.render('home');
})

app.get("/rand", (req, res) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand });
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit });
    }
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats });
})

app.listen(8080, () => {
    console.log("Listening on port 8080.");
})

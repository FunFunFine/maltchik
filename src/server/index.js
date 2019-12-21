import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import uuid from 'uuid/v4';

import cookieParser from 'cookie-parser';

export const app = express();
const staticPath = path.join(__dirname, '../../dist/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(staticPath));

app.use(cookieParser());
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).end('Internal server error.');
});

//-----------------------
class Question {
    constructor(id, questionText, answers, right) {
        this.id = id || uuid();
        this.questionText = questionText;
        this.answers = answers;
        if (right >= answers.length)
            throw "There are not enough answers";
        this.right = right;
    }
}
const questionsSets = {
    'math': '12345678'.split('').map(i =>
        new Question(i, `${i} + ${i / 3}`, ['1', '2', '3', `${+i + i / 3}`], 3)
    )
}

class Session {
    constructor(questionsSetName) {
        this.questionsSetName = questionsSetName;
        this.currentQuestion = 0;
    }
}
const sessions = new Map()
sessions.set('test')


//-----

app.get('/teacher', (_, res) => {
    const id = uuid();
    sessions.set(id, new Session('math'))
    res.send(id);
})

app.get('/teacher/:id/next', (req, res) => {
    const id = req.params.id;
    if (!sessions.has(id)) {
        res.sendStatus(403)
    } else {
        const session = { ...sessions.get(id) }
        const amount = questionsSets[session.questionsSetName].length
        if (session.currentQuestion >= amount) {
            res.sendStatus(200).send("ВСЕ")
        } else {
            session.currentQuestion++;
            sessions.set(id, session)
            res.send(session)
        }
    }
})


app.get('/student/:id', (req, res) => {
    const id = req.params['id'];
    if (!sessions.has(id)) {
        res.sendStatus(403)
    } else {
        res.send(sessions.get(id))
    }
})

app.get('/', (_, response) => {
    response.sendFile('index.html', { root: staticPath });
});

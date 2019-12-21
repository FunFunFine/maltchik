import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import uuid from 'uuid/v4';
import { Question, Session } from './data';
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

class Quiz {
    constructor() {
        this.questionsSets = {
            'math': '12345678'.split('').map(i =>
                new Question(i, `${i} + ${i / 3}`, ['1', '2', '3', `${+i + i / 3}`], 3)
            )
        };
        this.sessions = new Map();
    }
    startMathSession(id) {
        this.startSession(id, 'math');
    }
    startSession(id, name) {
        this.sessions.set(id, new Session(name));
    }
    isValidId(id) {
        return this.sessions.has(id);
    }
    updateNext(id) {
        const session = { ...this.sessions.get(id) }
        const amount = this.questionsSets[session.questionsSetName].length
        if (session.currentQuestion >= amount) {
            return { hasNext: false }
        } else {
            session.currentQuestion++;
            this.sessions.set(id, session)
            return { hasNext: true, nextSession: session }
        }
    }
    getCurrentQuestion(id) {
        const session = this.sessions.get(id);
        const qid = session.currentQuestion;
        const { right, ...question } = this.questionsSets[session.questionsSetName][qid];
        return question;
    }
}

const quiz = new Quiz()

app.get('/teacher', (_, res) => {
    const id = uuid();
    quiz.startMathSession(id);
    res.json({ id });
});

app.get('/teacher/:id/next', (req, res) => {
    const id = req.params.id;
    if (!quiz.isValidId(id)) {
        res.sendStatus(403)
    } else {
        const { hasNext, nextSession } = quiz.updateNext(id);
        if (!hasNext)
            res.send('Finished')
        else
            res.send(nextSession)


    }
});


app.get('/student/:id', (req, res) => {
    const id = req.params['id'];
    if (!quiz.isValidId(id)) {
        res.sendStatus(403)
    }
    else {
        const question = quiz.getCurrentQuestion(id);
        res.json(question)
    }
})

app.get('/', (_, response) => {
    response.sendFile('index.html', { root: staticPath });
});

app.get('/home', (_, response) => {
    response.sendFile('index.html', { root: staticPath });
});

app.get('/answers', (_, response) => {
    response.sendFile('index.html', { root: staticPath });
});

app.get('/presentation', (_, response) => {
    response.sendFile('index.html', { root: staticPath });
});

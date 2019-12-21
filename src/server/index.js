import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import uuid from 'uuid/v4';
import { Question, Session } from './data';
import cookieParser from 'cookie-parser';

export const app = express();
const staticPath = path.join(__dirname, '../../dist/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
        this.session = new Map();
    }
    startMathSession(id) {
        this.startSession(id, 'math');
    }
    startSession(id, name) {
        this.sessions.set(id, new Session(name));
    }
    isValidId(id) {
        return !this.sessions.has(id);
    }


}

const questionsSets = {
    'math': '12345678'.split('').map(i =>
        new Question(i, `${i} + ${i / 3}`, ['1', '2', '3', `${+i + i / 3}`], 3)
    )
}


const sessions = new Map()
sessions.set('test')

const quiz = new Quiz()

app.get('/teacher', (_, res) => {
    const id = uuid();
    quiz.startMathSession(id);
    res.json({ id });
})

app.get('/teacher/:id/next', (req, res) => {
    const id = req.params.id;
    if (!quiz.isValidId(id)) {
        res.sendStatus(403)
    } else {
        const { hasNext, nextSession } = quiz.getNext(id);
        if (!hasNext)
            res.send('Finished')
        else
            res.send(next)

        const session = { ...sessions.get(id) }

        const amount = questionsSets[session.questionsSetName].length
        if (session.currentQuestion >= amount) {
            res.sendStatus(200)
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
    response.sendFile('index.html', {root: staticPath});
});

app.get('/home', (_, response) => {
    response.sendFile('index.html', {root: staticPath});
});

app.get('/answers', (_, response) => {
    response.sendFile('index.html', {root: staticPath});
});

app.get('/presentation', (_, response) => {
    response.sendFile('index.html', {root: staticPath});
});

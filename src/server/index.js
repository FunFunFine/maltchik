import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import uuid from 'uuid/v4';
import cookieParser from 'cookie-parser';
import { Quiz } from './Quiz';

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

const quiz = new Quiz()

app.get('/teacher', (_, res) => {
    const sessionId = uuid();
    const teacherId = uuid();

    quiz.startMathSession(sessionId, teacherId);
    res.cookie('session_id', sessionId);
    res.cookie('teacher_id', teacherId);
    res.json({ sessionId, teacherId });
});

app.get('/teacher/next', (req, res) => {
    const sessionId = req.cookies.session_id;
    const teacherId = req.cookies.teacher_id;

    if (!quiz.isValidTeacherSession(sessionId, teacherId))
        return void res.sendStatus(403);

    const { hasNext, nextSession } = quiz.updateNext(sessionId);
    if (!hasNext)
        res.send('Finished')
    else
        res.send(nextSession)
});

app.post('/student', (req, res) => {
    const id = req.body.id;
    const studentId = uuid();

    res.cookie('session_id', id);
    res.cookie('student_id', studentId);
    res.send(200)
});

app.post('/student/answers/send', (req, res) => {
    const answer = req.body.answer;
    const questionId = req.body.question_id;
    const sessionId = req.cookies.session_id;
    const studentId = req.cookies.student_id;

    if (!quiz.isValidSessionId(sessionId))
        return void res.send(403);

    quiz.registerStudentsAnswer(sessionId, studentId, questionId, answer);
    res.send(200);
});

app.get('/student/questions/current', (req, res) => {
    const sessionId = req.cookies.session_id;

    if (!quiz.isValidSessionId(sessionId)) {
        res.sendStatus(403)
    }
    else {
        const question = quiz.getCurrentQuestion(sessionId);
        res.json(question)
    }
});


app.get('/teacher/questions/current', (req, res) => {
    const id = req.cookies.id;
    if (!quiz.isValidTeacherSession(id)) {
        res.sendStatus(403)
    }
    else {
        const question = quiz.getCurrentQuestionForTeacher(id);
        res.json(question)
    }
});


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

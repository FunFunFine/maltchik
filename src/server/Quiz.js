import { Question, Session } from './data';
export class Quiz {
    constructor() {
        this.questionsSets = {
            'math': '12345678'.split('').map(i => new Question(i, `${i} + ${i / 3}`, ['1', '2', '3', `${+i + i / 3}`], 3))
        };
        this.sessions = new Map();
    }
    startMathSession(id, teacherId) {
        this.startSession(id, 'math', teacherId);
    }
    startSession(id, name, teacherId) {
        this.sessions.set(id, new Session(name, teacherId));
    }
    isValidTeacherSession(sessionId, teacherId) {
        return this.sessions.has(sessionId) && this.sessions.get(sessionId).teacherId === teacherId;
    }

    isValidSessionId(sessionId) {
        return this.sessions.has(sessionId);
    }

    registerStudentsAnswer(sessionId, studentId, questionId, answer) {
        const qs = this.questionsSets[this.sessions.get(sessionId).questionsSetName];
        console.log(qs)
        // console.log(q.id)
        console.log(questionId);
        const question = qs.filter(q => q.id === questionId)[0];
        console.log(question);

        const isRight =question.answers.indexOf(answer) === question.right;
        console.log(isRight);
        this.sessions.get(sessionId).setAnswer(studentId, questionId, isRight);
    }

    updateNext(id) {
        const session = { ...this.sessions.get(id) };
        const amount = this.questionsSets[session.questionsSetName].length;
        if (session.currentQuestion >= amount) {
            return { hasNext: false };
        }
        else {
            session.currentQuestion++;
            this.sessions.set(id, session);
            return { hasNext: true, nextSession: session };
        }
    }
    getCurrentQuestion(id) {
        const session = this.sessions.get(id);
        const qid = session.currentQuestion;
        const { right, ...question } = this.questionsSets[session.questionsSetName][qid];
        return question;
    }
    getCurrentQuestionForTeacher(id) {
        const session = this.sessions.get(id);
        const qid = session.currentQuestion;
        const question = this.questionsSets[session.questionsSetName][qid];
        return question;
    }
}

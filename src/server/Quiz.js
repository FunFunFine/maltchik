import { Question, Session } from './data';
export class Quiz {
    constructor() {
        this.questionsSets = {
            'math': [
                new Question(i, 'В какую из этих игр играют не клюшкой?', ['Бильярд', 'Хоккей', 'Гольф', 'Поло'], 1),
                new Question(i, 'Как называется детеныш норки?', ['Котенок','Щенок', 'Белек', 'Норик'], 1),
                new Question(i, 'Где муха-цокотуха нашла денежку?', ['На лугу,', 'Во дворе', 'В поле', 'Во дворе'], 2),
                new Question(i, 'Как называют брата жены?', ['Кум', 'Деверь', 'Свояк', 'Шурин'], 3),
                new Question(i, 'Какой из языков программирования является декларативным?', ['Pascal', 'C#', 'SQL', 'Lisp'], 2),
            ]
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

    getResults(sessionId) {
        const session = this.sessions.get(sessionId);
        const questions = this.questionsSets[session.questionsSetName];
        const answers = session.answers;
        console.log([...answers.entries()]);
        return questions.map(q => {
            return {
                "student answers": [...answers.entries()].filter(a => a[1].id === q.id),
                ...q
            }
        });
    }

    registerStudentsAnswer(sessionId, studentId, questionId, answer) {
        const question = this.questionsSets[this.sessions.get(sessionId).questionsSetName]
            .find(q => q.id === questionId);
        console.log(question);

        const isRight = question.answers.indexOf(answer) === question.right;
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

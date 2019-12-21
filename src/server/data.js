
export class Question {
    constructor(id, questionText, answers, right) {
        this.id = id || uuid();
        this.questionText = questionText;
        this.answers = answers;
        if (right >= answers.length)
            throw "There are not enough answers";
        this.right = right;
    }
}
export class Session {
    constructor(questionsSetName, teacherId) {
        this.questionsSetName = questionsSetName;
        this.currentQuestion = 0;
        this.teacherId = teacherId;
    }
}
import React from 'react';
export class Presentation extends React.Component {
    state = {login: '', password: '', error: null};
    constructor() {
        super();
    }

    componentDidMount() {
        fetch('/students')
    }

    render() {
        return (
            <div className="main-content">
                <div className="question">
                    <span className="theme">Theme</span> <span className="theme">Question number</span>
                    <div className="question-text">QUESTION</div>
                    <button className="next-button">→</button>
                </div>
                <div className="answers">
                    <button className="answer1 answer">answer1</button>
                    <button className="answer2 answer">answer2</button>
                    <button className="answer3 answer">answer3</button>
                    <button className="answer4 answer">answer4</button>
                </div>
            </div>
        );
    }
}


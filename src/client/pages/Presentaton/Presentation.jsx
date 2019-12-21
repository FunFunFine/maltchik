import React from 'react';

export class Presentation extends React.Component {
    state = {login: '', password: '', error: null};

    constructor() {
        super();
        this.state = {questionText: undefined, answers: undefined}
    }

    componentDidMount() {
        fetch('/student/questions/current')
            .then(x => x.json()
                .then(y =>
                    this.setState({questionText: y.questionText, answers: y.answers})
                )
            )
    }

    render() {
        return (
            <div className="main-content">
                <div className="question">
                    <span className="theme">Theme</span> <span className="theme">Question number</span>
                    {this.state.questionText ?
                        <div className="question-text">{this.state.questionText}</div> : undefined
                    }
                    <button className="next-button">→</button>
                </div>
                <div className="answers">
                    {this.state.answers? this.state.answers.map(x => <button className="answer1 answer">{x}</button>): undefined}
                </div>
            </div>
        );
    }
}


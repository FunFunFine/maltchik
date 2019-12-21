import React from 'react';

export class Answers extends React.Component {
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
            <div>
                {/*<div className="question">*/}
                {/*    <span className="theme">Theme</span> <span className="theme">Question number</span>*/}
                {/*    {this.state.questionText ?*/}
                {/*        <div className="question-text">{this.state.questionText}</div> : undefined*/}
                {/*    }*/}
                {/*    <button className="next-button">→</button>*/}
                {/*</div>*/}
                <div className="answers">
                    {this.state.answers ? this.state.answers.map((x, i) =>
                            <button className={`answer${i} answer`}>{x}</button>)
                        : undefined}
                </div>
            </div>
        );
    }
}


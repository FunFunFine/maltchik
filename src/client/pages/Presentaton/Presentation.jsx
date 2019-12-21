import React from 'react';
import s from './Presentation.css';

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

    click = (e) => {
        fetch('/teacher/next')
    };


    render() {
        return (
            <div className="main-content">
                <div className={s.question}>
                    {
                        this.state.questionText ?
                            <div className={s.questionText}>{this.state.questionText}</div> : undefined
                    }
                    <button className={s.arrow} onClick={this.click}>→</button>
                </div>
                <div className="answers">
                    {this.state.answers ? this.state.answers.map(x => <button
                        className={s.answer} >{x}</button>) : undefined}
                </div>
            </div>
        );
    }
}


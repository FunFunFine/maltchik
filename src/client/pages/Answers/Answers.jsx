import React from 'react';
import s from './Answers.css';
export class Answers extends React.Component {
    state = {login: '', password: '', error: null};

    constructor() {
        super();
        this.state = {questionText: undefined, answers: undefined};
        console.log(this.state);

    }

    componentDidMount() {
        fetch('/student/questions/current')
            .then(x => {
                    console.log('answ');
                    console.log(x);
                    x.json()
                        .then(y => {
                                console.log('y');
                                console.log(y);
                                this.setState({questionText: y.questionText, answers: y.answers})
                            }
                        )
                }
            )
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className={s.answers}>
                    {this.state.answers ? this.state.answers.map((x, i) => <button className={s.answer}>{x}</button>)
                        : undefined}
                </div>
            </div>
        );
    }
}


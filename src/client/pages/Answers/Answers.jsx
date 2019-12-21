import React from 'react';
import s from './Answers.css';

export class Answers extends React.Component {
    state = {login: '', password: '', error: null};

    constructor() {
        super();
        this.state = {questionText: undefined, answers: undefined, id: undefined};
        console.log(this.state);

    }

    componentDidMount() {
        fetch('/student/questions/current')
            .then(x => {
                    x.json()
                        .then(y => {
                                this.setState({questionText: y.questionText, answers: y.answers, id: y.id})
                            }
                        )
                }
            );
    }

    onClick = (e, val) => {
        console.log(val);
        console.log(this.state.id);
        fetch('/student/answers/send', {
            method: 'POST',
            body: JSON.stringify({question_id: this.state.id, answer: val}),
            headers: {'Content-Type': 'application/json'}
        }).then(x => {
            this.setState({checked: val});
        });
    };

    render() {
        console.log(this.state);
        return (
            <div>
                {
                    !this.state.checked ?
                        <div className={s.answers}>
                            {this.state.answers ? this.state.answers.map((x, i) => <button className={s.answer} value={x}
                                                                                           onClick={(e) => this.onClick(e, x)}>{x}</button>)
                                : undefined}
                        </div> :
                        <div className={s.done}>
                            SENT!
                        </div>
                }
            </div>
        );
    }
}


import React from 'react';
import s from './Presentation.css';

export class Result extends React.Component {
    constructor() {
        super();
        this.state = {result: undefined}
    }

    componentDidMount() {
        fetch('/teacher/result')
            .then(x => x.json()
                .then(y =>
                    this.setState({result: y})
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


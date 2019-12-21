import React from 'react';
import s from './Home.css';
import {Redirect} from "react-router";

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {token: '', tokenTeacher: undefined, sss: undefined};
    }

    submitStudent = () => {
        fetch('/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.token
            })
        }).then(_ => {
            this.setState({sss: 'student'})
        });
    };

    submitTeacher = () => {
        fetch('/teacher',)
            .then(x => {
                x.json()
                    .then(y => this.setState({tokenTeacher: y.sessionId, sss: 'teacher'}))
            });
    };

    onChange = (event) => {
        this.setState({token: event.target.value});
    };

    render() {
        return (
            <div>
                <main className={s.mainContent}>
                    <div className={s.titleBlock}>
                        <h1 className={s.title}>Quizer</h1>
                    </div>
                    {
                        this.state.sss === 'student' ? <Redirect to='/answers'/> :
                            <div className={s.buttons}>
                                {!this.state.sss ?
                                    <div>
                                        <button className={s.createButton} onClick={this.submitTeacher}>
                                            Create quiz
                                        </button>
                                    </div> : <code>{this.state.tokenTeacher}</code>
                                }

                                <button className={s.join} onClick={this.submitStudent}>
                                    Join quiz
                                </button>
                                <input type="text" value={this.state.token} required placeholder="Quiz ID"
                                       className={s.inputText} onChange={this.onChange}/>

                            </div>

                    }
                    <a href="/presentation">TO PRESENTATION</a>
                </main>
            </div>
        );

    }
}

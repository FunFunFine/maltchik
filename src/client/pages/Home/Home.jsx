import React from 'react';
import s from './Home.css';

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {token: '', tokenTeacher: undefined};
    }

    submitStudent = () => {
        fetch('/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                id: this.state.token
            }
        });
    };

    submitTeacher = () => {
        fetch('/teacher',)
            .then(x => {
                x.json().then(y => this.setState({tokenTeacher: y.id}))
            });
    };

    onChange = (event) => {
        this.setState({token: event.target.value});
    };

    render() {
        return (
            <main className={s.mainContent}>
                <div className={s.titleBlock}>
                    <h1 className={s.title}>Quizer</h1>
                </div>
                <div className={s.buttons}>
                    <button className={s.createButton} onClick={this.submitTeacher}>Create quiz</button>
                    {this.state.tokenTeacher ? <code>{this.state.tokenTeacher}</code>: undefined}
                    <form className={s.form}>
                        <input type="submit" id="join" className={s.join} value="Join quiz"
                               onClick={this.submitStudent}/>
                        <input type="text" value={this.state.token} required placeholder="Quiz ID"
                               className={s.inputText} onChange={this.onChange}/>
                    </form>
                </div>
            </main>
        );
    }
}

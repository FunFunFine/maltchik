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
        }).then(_ => {this.setState({sss: 'student'})});
    };

    submitTeacher = () => {
        fetch('/teacher',)
            .then(x => {
                x.json().then(y => this.setState({tokenTeacher: y.id, sss: 'teacher'}))
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
                    {!this.state.sss ?
                        <div>
                            <button className={s.createButton} onClick={this.submitTeacher}>Create quiz</button>
                            {this.state.tokenTeacher ? <code>{this.state.tokenTeacher}</code> : undefined}
                        </div> : this.state.sss === 'teacher' ? (this.state.tokenTeacher ?
                            <code>{this.state.tokenTeacher}</code> : undefined) : <Redirect to="/answers"/>
                    }
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

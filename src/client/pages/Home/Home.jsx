import React from 'react';
import s from './Home.css';
export class Home extends React.Component {
    state = {login: '', password: '', error: null};

    submitStudent = () => {

    };

    submitTeacher = () => {

    };

    onChange = () => {

    };

    render() {
        return (
            <main className="main-content">
                <div className={s.titleBlock}>
                <h1 className="title">Quizer</h1>
                </div>
                <div className="buttons">
                    <button className="create">Create quiz</button>
                    <form>
                        <input type="submit" id="join" className="join" value="Join quiz" onClick={this.submitStudent}/>
                        <input type="text" required placeholder="Quiz ID" onChange={this.onChange}/>
                    </form>
                </div>
            </main>
        );
    }
}


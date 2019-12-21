import React from 'react';
import s from './Home.css';
export class Home extends React.Component {
    constructor() {
        super();
        this.state = {token: ''};
    }

    submitStudent = () => {
        fetch('/student').then(x => {console.log(x.json())})
    };

    submitTeacher = () => {
        fetch('/teacher').then(x => {console.log(x.json())});
    };

    onChange = (event) => {
        this.setState({token: event.target.value});
    };

    render() {
        return (
            <main className="main-content">
                <div className={s.titleBlock}>
                <h1 className="title">Quizer</h1>
                </div>
                <div className="buttons">
                    <button className="create" onClick={this.submitTeacher}>Create quiz</button>
                    <form>
                        <input type="submit" id="join" className="join" value="Join quiz" onClick={this.submitStudent}/>
                        <input type="text" value={this.state.token} required placeholder="Quiz ID" onChange={this.onChange}/>
                    </form>
                </div>
            </main>
        );
    }
}


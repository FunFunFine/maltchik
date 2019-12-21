import React from 'react';
export class Answers extends React.Component {
    state = {login: '', password: '', error: null};

    render() {
        return (
            <main className="main-content">
                <h1 className="title">Quizer</h1>
                <div className="buttons">
                    <button className="create">Create quiz</button>
                    <form>
                        <input type="submit" id="join" className="join" value="Join quiz"/>
                        <input type="text" required placeholder="Quiz ID"/>
                    </form>
                </div>
            </main>
        );
    }
}


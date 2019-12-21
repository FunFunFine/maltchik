import React from 'react';
export class Answers extends React.Component {
    state = {login: '', password: '', error: null};

    render() {
        return (
            <div>
                <header className="header">Theme. Question Number</header>
                <main className="main-content">
                    <button className="var1 var-button">button1</button>
                    <button className="var2 var-button">button2</button>
                    <button className="var3 var-button">button3</button>
                    <button className="var4 var-button">button4</button>
                </main>
            </div>
        );
    }
}


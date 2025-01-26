import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CardComponent = () => {
    const getListener = (elementID) => {
        return function () {
            fetch('https://byback.bybyte.dev/v1/action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: elementID,
                    d: 'jm'
                })
            });
        };
    };

    useEffect(() => {
        const elements = ['email', 'linkedin', 'telegram', 'github'];
        elements.forEach(elementID => {
            const element = document.getElementById(elementID);
            if (element) {
                element.addEventListener('click', getListener(elementID));
            }
        });

        return () => {
            elements.forEach(elementID => {
                const element = document.getElementById(elementID);
                if (element) {
                    element.removeEventListener('click', getListener(elementID));
                }
            });
        };
    }, []);

    return (
        <div className="card">
            <div className="box">
                <div className="img">
                    <img src="me.jpg" />
                </div>
                <div className="name">
                    <h2>Mark Nicholson</h2>
                    <h3>Software Engineer</h3>
                </div>
                <span>
                    <ul>
                      <li><a href="mailto:i@justmark0.me" title="E-mail"><i className="fa fa-at" aria-hidden="true" id="email" /></a></li>
                      <li><a href="https://t.me/justmark0" title="Telegram"><i className="fa fa-telegram" aria-hidden="true" id="telegram" /></a></li>
                    </ul>
                </span>
                <br/>
                <span>
                    <ul>
                        <li><a href="https://github.com/justmark0" title="GitHub"><i className="fa fa-github" aria-hidden="true" id="github"/></a></li>
                        <li><a href="https://www.linkedin.com/in/justmark0/" title="Linkedin"><i className="fa fa-linkedin" aria-hidden="true" id="linkedin"/></a></li>
                    </ul>
                </span>
            </div>
        </div>
    );
};

ReactDOM.render(
    <CardComponent/>,
    document.getElementById('root')
);

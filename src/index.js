import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CardComponent = () => {
    // Function to create event listeners
    const getListener = (elementID) => {
        return function () {
            fetch(`https://api.justmark0.me/v1/new_request/${elementID}`);
        };
    };

    // Use useEffect to setup listeners after component mounts
    useEffect(() => {
        const elements = ['email', 'linkedin', 'telegram', 'github'];
        elements.forEach(elementID => {
            const element = document.getElementById(elementID);
            if (element) {
                element.addEventListener('click', getListener(elementID));
            }
        });

        // Cleanup listeners when component unmounts
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
                    <h3>Backend Developer</h3>
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

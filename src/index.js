import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var cardConponent =
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
              <li><a href="mailto:i@justmark0.me" title="E-mail"><i className="fa fa-at" aria-hidden="true" /></a></li>
              <li><a href="https://vk.com/justmark0" title="VK"><i className="fa fa-vk" aria-hidden="true" /></a></li>
              <li><a href="https://t.me/justmark0" title="Telegram"><i className="fa fa-telegram" aria-hidden="true" /></a></li>
            </ul>
        </span>
        <br/>
        <span>
            <ul>
                <li><a href="https://github.com/justmark0" title="GitHub"><i className="fa fa-github" aria-hidden="true" /></a></li>
                <li><a href="https://www.facebook.com/profile.php?id=100074042946696" title="Facebook"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                <li><a href="https://instagram.com/just.mark0" title="Instagram"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
            </ul>
        </span>
    </div>
</div>;

ReactDOM.render(
    cardConponent,
  document.getElementById('root')
);

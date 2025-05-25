import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardComponent from './CardComponent';
import PasswordGenerator from './PasswordGenerator';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<CardComponent />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

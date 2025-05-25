import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAR_SETS = {
    numbers: "23456789",
    lowercase: "abcdefghjkmnpqrstuvwxyz",
    uppercase: "ABCDEFGHJKMNPQRSTUVWXYZ",
    symbols: `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`
};
const SIMILAR = /[iIlLoO01]/g;

const defaultOptions = {
    length: 20,
    numbers: true,
    lowercase: true,
    uppercase: true,
    beginLetter: true,
    symbols: false,
    noSimilar: true,
    noDuplicate: true,
    noSequential: true
};

function generatePassword(options) {
    let charset = "";
    if (options.numbers) charset += CHAR_SETS.numbers;
    if (options.lowercase) charset += CHAR_SETS.lowercase;
    if (options.uppercase) charset += CHAR_SETS.uppercase;
    if (options.symbols) charset += CHAR_SETS.symbols;
    if (options.noSimilar) charset = charset.replace(SIMILAR, "");
    if (!charset) return "";
    let password = "";
    let used = new Set();
    let tries = 0;
    while (password.length < options.length && tries < 1000) {
        let ch = charset[Math.floor(Math.random() * charset.length)];
        if (options.noDuplicate && used.has(ch)) {
            tries++; continue;
        }
        if (options.noSequential && password.length > 0) {
            let prev = password.charCodeAt(password.length - 1);
            if (Math.abs(prev - ch.charCodeAt(0)) === 1) {
                tries++; continue;
            }
        }
        if (password.length === 0 && options.beginLetter) {
            if (!/[a-zA-Z]/.test(ch)) { tries++; continue; }
        }
        password += ch;
        if (options.noDuplicate) used.add(ch);
    }
    return password;
}

const lengths = [20, 12, 16, 24, 32];

const PasswordBox = ({ password, onCopy, copied }) => (
    <div
        className="password-box"
        onClick={onCopy}
        style={{
            border: "1px solid #111",
            padding: "14px 12px",
            borderRadius: 6,
            fontSize: 19,
            letterSpacing: "1.5px",
            background: copied ? "#e5e5e5" : "#fafafa",
            cursor: "pointer",
            textAlign: "center",
            userSelect: "all",
            marginBottom: 12,
            position: "relative",
            minHeight: 36,
            transition: "background 0.2s"
        }}
        title="Click to copy"
    >
        {password || "Not enough characters!"}
        <AnimatePresence>
            {copied && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: -30 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "0%",
                        transform: "translateX(-50%)",
                        fontSize: 15,
                        color: "#111",
                        background: "#fff",
                        border: "1px solid #111",
                        borderRadius: 8,
                        padding: "2px 12px",
                        pointerEvents: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                    }}
                >
                    Copied!
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const Checkbox = ({ id, checked, onChange, label }) => (
    <label style={{
        display: "flex", alignItems: "center", marginBottom: 12,
        fontSize: 15, cursor: "pointer", userSelect: "none"
    }}>
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            style={{ marginRight: 10, accentColor: "#111" }}
        />
        {label}
    </label>
);

const PasswordGenerator = () => {
    const [options, setOptions] = useState(defaultOptions);
    const [passwords, setPasswords] = useState(() => Array(3).fill("").map(() => generatePassword(defaultOptions)));
    const [copiedIdx, setCopiedIdx] = useState(-1);

    const handleOptionChange = e => {
        const { id, type, checked, value } = e.target;
        setOptions(prev => ({
            ...prev,
            [id]: type === "checkbox" ? checked : Number(value)
        }));
    };

    // Generate passwords when options change
    React.useEffect(() => {
        setPasswords(Array(3).fill("").map(() => generatePassword(options)));
        setCopiedIdx(-1);
    }, [options]);

    const handleCopy = useCallback((pwd, idx) => {
        if (!pwd || pwd.includes("Not enough")) return;
        navigator.clipboard.writeText(pwd).then(() => {
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(-1), 900);
        });
    }, []);

    return (
        <div style={{
            maxWidth: 420,
            margin: "40px auto",
            padding: 32,
            border: "1px solid #111",
            borderRadius: 8,
            background: "#fff"
        }}>
            <h2 style={{
                fontWeight: "normal",
                marginBottom: 24,
                letterSpacing: 1
            }}>Password Generator</h2>

            <label style={{
                display: "flex", alignItems: "center", marginBottom: 12,
                fontSize: 15, userSelect: "none"
            }}>
                Password length:
                <select
                    id="length"
                    value={options.length}
                    onChange={handleOptionChange}
                    style={{
                        border: "1px solid #111",
                        background: "#fff",
                        color: "#111",
                        padding: "4px 8px",
                        borderRadius: 4,
                        fontSize: 15,
                        marginLeft: 8,
                        width: 62
                    }}
                >
                    {lengths.map(l => (
                        <option value={l} key={l}>{l}</option>
                    ))}
                </select>
            </label>
            <Checkbox id="numbers" checked={options.numbers} onChange={handleOptionChange} label="Include numbers (123456)" />
            <Checkbox id="lowercase" checked={options.lowercase} onChange={handleOptionChange} label="Include lowercase (abcdefg)" />
            <Checkbox id="uppercase" checked={options.uppercase} onChange={handleOptionChange} label="Include uppercase (ABCDEFG)" />
            <Checkbox id="beginLetter" checked={options.beginLetter} onChange={handleOptionChange} label="Begin with a letter" />
            <Checkbox id="symbols" checked={options.symbols} onChange={handleOptionChange} label="Include symbols (!\#$...)" />
            <Checkbox id="noSimilar" checked={options.noSimilar} onChange={handleOptionChange} label="No similar characters" />
            <Checkbox id="noDuplicate" checked={options.noDuplicate} onChange={handleOptionChange} label="No duplicate characters" />
            <Checkbox id="noSequential" checked={options.noSequential} onChange={handleOptionChange} label="No sequential characters" />

            <div style={{ marginTop: 28 }}>
                {passwords.map((pwd, idx) => (
                    <PasswordBox
                        key={idx}
                        password={pwd}
                        onCopy={() => handleCopy(pwd, idx)}
                        copied={copiedIdx === idx}
                    />
                ))}
            </div>
        </div>
    );
};

export default PasswordGenerator;

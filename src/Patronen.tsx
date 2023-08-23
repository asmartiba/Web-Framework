import React, { useEffect, useState } from 'react';
import './App.css';

export const Patronen = () => {
    const letters: string[] = ["ovvvovooovovovovvo", "ooovvvooovvvooovvv", "ooovovovovvoovovov"];
    const [lettersIndex, setLettersIndex] = useState<number>(0);

    const handleNextClick = () => {
        setLettersIndex((lettersIndex + 1) % letters.length);
    }

    const getBackground = (letter: string) => {
        return letter === "o" ? "blue" : "white" 
    }

    return (
        <div style={{display:'flex'}}>
            {letters[lettersIndex].split('').map((letter, i) => (
                <div
                    key={i}
                    style={{backgroundColor:getBackground(letter), width:50, height:50}} 
                />
            ))}
            <button onClick={handleNextClick}>Next</button>
        </div>
    )
}

export const Concat = () => {
    const [word1, setWord1] = useState('');
    const [word2, setWord2] = useState('');
    const [word3, setWord3] = useState('');
    const [word4, setWord4] = useState('');
    const [option, selectedOption] = useState('As filled');

    const handleChange = (event: any) => {
        selectedOption(event.target.value);
    }

    const concatWords = () => {
        if (!word1 || !word2 || !word3 || !word4) {
            return "Please fill all inputs";
        }
        const words = [word1, word2, word3, word4];

        if (option === "A-Z") {words.sort()}
        else if (option === "Z-A") {words.sort().reverse()}
    
        return words.join(' ');
    }

    return (
        <div>
            <div>
                <input type="text" value={word1} onChange={(e) => setWord1(e.target.value)}/>
            </div>
            <div>
                <input type="text" value={word2} onChange={(e) => setWord2(e.target.value)}/>
            </div>
            <div>
                <input type="text" value={word3} onChange={(e) => setWord3(e.target.value)}/>
            </div>
            <div>
                <input type="text" value={word4} onChange={(e) => setWord4(e.target.value)}/>
            </div>

            <label>Option</label>
            <select value={option} onChange={handleChange}>
                    <option value="As Filled">As Filled</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
            </select>

            <p>{concatWords()}</p>
        </div>
    )
}

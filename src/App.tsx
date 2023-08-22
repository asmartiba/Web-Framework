import React, { useState } from 'react';
import './App.css';

interface Dna {
  letter: string;
  match: string;
}

interface NucleotideButtonsProps {
  addNucleotide: (letter: string) => void;
}

const NucleotideButtons: React.FC<NucleotideButtonsProps> = ({ addNucleotide }) => {
  return (
    <div style={{ display: 'flex' }}>
      <button style={{ backgroundColor: 'red', width: 50, height: 50 }} onClick={() => addNucleotide('T')}>T</button>
      <button style={{ backgroundColor: 'green', width: 50, height: 50 }} onClick={() => addNucleotide('A')}>A</button>
      <button style={{ backgroundColor: 'purple', width: 50, height: 50 }} onClick={() => addNucleotide('C')}>C</button>
      <button style={{ backgroundColor: 'yellow', width: 50, height: 50 }} onClick={() => addNucleotide('G')}>G</button>
    </div>
  );
};


const DnaSequence: React.FC<{ sequence: Dna[], onSwap: (index: number) => void }> = ({ sequence, onSwap }) => {
  const getColorForLetter = (letter: string): string => {
    switch (letter) {
      case 'A':
        return 'green';
      case 'T':
        return 'red';
      case 'C':
        return 'purple';
      case 'G':
        return 'yellow';
      default:
        return 'white';
    }
  };

  return (
    <div>
      <table>
        <tbody>
          {sequence.map((dna, index) => (
            <tr key={index}>
              <td style={{ backgroundColor: getColorForLetter(dna.letter), width:50, height:50 }}>{dna.letter}</td>
              <td style={{ backgroundColor: getColorForLetter(dna.match), width:50, height:50 }}>{dna.match}</td>
              <td><button style={{ width:50, height:50}} onClick={() => onSwap(index)}>SWAP</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


function App() {
  const [sequence, setSequence] = useState<Dna[]>([]);
  const [randomSequenceCount, setRandomSequenceCount] = useState<number>(0);

  const addNucleotide = (letter: string) => {
    let match = '';
    if (letter === 'A') match = 'T';
    else if (letter === 'T') match = 'A';
    else if (letter === 'C') match = 'G';
    else if (letter === 'G') match = 'C';

    setSequence(prevSequence => [...prevSequence, { letter, match }]);
  };

  const generateRandomSequence = () => {
    const letters = ['A', 'T', 'C', 'G'];
    const newRandomSequence: Dna[] = [];

    for (let i = 0; i < randomSequenceCount; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const letter = letters[randomIndex];
      let match = '';

      if (letter === 'A') match = 'T';
      else if (letter === 'T') match = 'A';
      else if (letter === 'C') match = 'G';
      else if (letter === 'G') match = 'C';

      newRandomSequence.push({ letter, match });
    }

    setSequence(newRandomSequence);
  };

  const handleSwap = (index: number) => {
    const updatedSequence = [...sequence];
    const tempLetter = updatedSequence[index].letter;
    updatedSequence[index].letter = updatedSequence[index].match;
    updatedSequence[index].match = tempLetter;
    setSequence(updatedSequence);
  };

  return (
    <div className="App">
      <header className="App-header">
      <div>
          <input
            type="number"
            value={randomSequenceCount}
            onChange={(e) => setRandomSequenceCount(parseInt(e.target.value))}
          />
          <button onClick={generateRandomSequence}>Generate Random Sequence</button>
        </div>
        <DnaSequence sequence={sequence} onSwap={handleSwap} />
        <NucleotideButtons addNucleotide={addNucleotide} />
      </header>
    </div>
  );
}

export default App;

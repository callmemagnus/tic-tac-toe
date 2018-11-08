import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

const StyledEmilie = styled.div`
  color: yellow;
`;

const Plateau = styled.div`
  background-color: yellow;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  margin: 30px;
`;

const JoliBouton = styled.button`
  border: solid blueviolet 5px;
  border-radius: 3px;
  background-color: yellow;
  color: blueviolet;
  font-size: 30px;
`;

const JoliJoueur = styled.div`
  color: yellow;
  font-size: 30px;
`;

const Case = styled.button`
  background-color: #282c34;
  color: red;
  height: 60px;
  width: 60px;
  display: grid;
  align-content: center;
  border: none;
  font-size: 40px;
`;

function finiAvecGagnant(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let fini = lines.reduce((acc, combination) => {
    return (
      acc ||
      (cells[combination[0]] !== "" &&
        cells[combination[0]] === cells[combination[1]] &&
        cells[combination[1]] === cells[combination[2]])
    );
  }, false);

  return fini;
}

function finiSansGagnant(cells) {
  return cells.indexOf("") === -1;
}

function auDebut(cells) {
  return cells.filter(value => value === "").length === 9;
}

const debutCases = ["", "", "", "", "", "", "", "", ""];
const debutJoueur = "X";

const App = () => {
  const [cells, setCells] = useState(debutCases);
  const [joueur, setJoueur] = useState(debutJoueur);
  const [enJeu, setEnJeu] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(
    () => {
      if (finiAvecGagnant(cells)) {
        setEnJeu(false);
        setMessage(`${joueur} a gagné.`);
      } else if (finiSansGagnant(cells)) {
        setEnJeu(false);
        setMessage("Fini sans gagnant.");
      } else if (auDebut(cells)) {
        setJoueur(debutJoueur);
        setEnJeu(true);
      } else {
        setJoueur(joueur === "X" ? "O" : "X");
        setEnJeu(true);
      }
    },
    [cells]
  );

  function handleClick(index) {
    if (!enJeu) {
      return;
    }
    if (cells[index] === "") {
      const newCells = [...cells];
      newCells[index] = joueur;
      setCells(newCells);
    }
  }

  function recommencer() {
    setCells(debutCases);
    setMessage(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <JoliJoueur>{message ? message : joueur}</JoliJoueur>

        <Plateau>
          {cells.map((valeur, index) => (
            <Case onClick={() => handleClick(index)}>{valeur}</Case>
          ))}
        </Plateau>
        <JoliBouton onClick={recommencer}>Recommencer</JoliBouton>
      </header>
    </div>
  );
};

export default App;

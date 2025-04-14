import { useState, useEffect } from "react";

import { RegistrationData } from "../components/home/RegistrationData";
import { InitialOVerall } from "../components/home/InitialOverall";
import { FirstContract } from "../components/home/FirstContract";
import { StartFirstSeason } from "../components/home/StartFirstSeason";

import { Player } from "../../gameLogics/Player";

import { nationalLeagues } from "../../data/nationalLeagues/nationalLeagues";

import "../style/Home.css";
import "../style/reset.css";

const player = new Player();

export const Home = () => {
  const [playerData, setPlayerData] = useState({
    name: "",
    age: 17,
    team: "",
    position: "",
    overall: 0,
    careerMatches: 0,
    seasonMatches: 0,
    careerGoals: 0,
    seasonGoals: 0,
    careerAssists: 0,
    seasonAssists: 0,
    careerGrade: 0,
    seasonGrade: 0,
    lastSeasonGrade: 0,
  });

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  });

  const getInitialOverall = (age: number, additionPerGrade: number): number => {
    if (playerData.overall === 0) {
      const initialOverall = player.getPlayerOverall(age, additionPerGrade);

      setPlayerData((playerData) => ({
        ...playerData,
        overall: initialOverall,
      }));

      return initialOverall;
    }

    return playerData.overall;
  };

  const getFirstContract = () => {
    if (playerData.overall != 0 && playerData.team === "") {
      const possibleContracts = player.getPossibleContracts(
        playerData.overall,
        nationalLeagues[0].teams
      );

      const firstContract = player.getContract(possibleContracts);

      setPlayerData((playerData) => ({
        ...playerData,
        team: firstContract.teamName,
      }));

      return firstContract;
    }

    if (playerData.overall === 0) {
      window.alert(
        "É necessário que você gere seu primeiro overall antes de assinar o primeiro contrato"
      );
    }

    if (playerData.team != "") {
      window.alert(
        "Você já obteve seu primeiro contrato. Por favor dê prosseguimento em 'Iniciar a primeira temporada'"
      );
    }
  };

  const generatePlayer = () => {
    const nameInput: HTMLInputElement | null =
      document.querySelector(".player-name-input");

    const positionSelect: HTMLSelectElement | null =
      document.querySelector(".position-select");

    if (positionSelect != null && nameInput != null) {
      const playerName = nameInput.value;
      const playerPosition = positionSelect.value;

      setPlayerData((playerData) => ({
        ...playerData,
        name: playerName,
        position: playerPosition,
      }));
    }
  };

  return (
    <div className="home">
      <div className="page-title-section">
        <img className="page-icon" src="../public/player-icon.png" alt="" />
        <div className="page-title">Criação do jogador</div>
      </div>

      <RegistrationData />

      <div className="generate-first-season">
        <InitialOVerall
          initialOverall={playerData.overall}
          getInitialOverall={getInitialOverall}
        />

        <FirstContract
          team={playerData.team}
          getFirstContract={getFirstContract}
        />
      </div>

      <StartFirstSeason generatePlayer={generatePlayer} />
    </div>
  );
};

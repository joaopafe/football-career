import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RegistrationData } from "../components/home/RegistrationData";
import { InitialOVerall } from "../components/home/InitialOverall";
import { FirstContract } from "../components/home/FirstContract";
import { StartFirstSeason } from "../components/home/StartFirstSeason";

import { getRandomNumber } from "../../utils/getRandomNumber";

import { Player } from "../../gameLogics/Player";
import { Championship } from "../../gameLogics/Championship";

import { nationalLeagues } from "../../data/nationalLeagues/nationalLeagues";

import "../style/Home.css";
import "../style/reset.css";

const player = new Player();
const championship = new Championship();

export const Home = () => {
  const navigate = useNavigate();

  const [playerData, setPlayerData] = useState({
    name: "",
    age: 17,
    team: "",
    teamMinOverall: 0,
    teamMaxOverall: 0,
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
    gradesOnSeason: [],
  });

  const [championshipData, setChampionshipData] = useState({
    championshipName: nationalLeagues[0].championshipName,
    playerTeam: {
      teamName: "",
      teamOverall: 0,
      maxOverall: 0,
      minOverall: 0,
      maxScore: 0,
      minScore: 0,
      score: 0,
    },
    seasonMatches: [
      {
        opposingTeamName: "",
        opposingTeamOverall: 0,
        playerTeamName: "",
        playerTeamOverall: 0,
      },
    ],
  });

  const [season, setSeason] = useState(0);

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  });

  useEffect(() => {
    localStorage.setItem("championshipData", JSON.stringify(championshipData));
  });

  useEffect(() => {
    localStorage.setItem("season", season.toString());
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

      setChampionshipData((championshipData) => ({
        ...championshipData,
        playerTeam: {
          teamName: firstContract.teamName,
          maxOverall: firstContract.maxOverall,
          minOverall: firstContract.minOverall,
          teamOverall: firstContract.teamOverall,
          maxScore: firstContract.maxScore,
          minScore: firstContract.minScore,
          score: 0,
        },
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

  const getTeamsOverall = () => {
    return championship.getTeamsOverall(nationalLeagues[0].teams);
  };

  const getPlayerTeamInformations = () => {
    const playerTeamOverall = championship.getPlayerTeamOverall(
      nationalLeagues[0].teams,
      playerData.team
    );

    setChampionshipData((championshipData) => ({
      ...championshipData,
      playerTeam: {
        teamName: playerTeamOverall[0].teamName,
        teamOverall: playerTeamOverall[0].teamOverall,
        maxOverall: playerTeamOverall[0].maxOverall,
        minOverall: playerTeamOverall[0].minOverall,
        maxScore: playerTeamOverall[0].maxScore,
        minScore: playerTeamOverall[0].minScore,
        score: 0,
      },
    }));
  };

  const getSeasonMatches = () => {
    const teamsOverall = getTeamsOverall();
    const playerTeamOverall = championshipData.playerTeam;

    const seasonMatches = championship.getSeasonMatches(
      teamsOverall,
      playerData.team,
      getRandomNumber(
        playerTeamOverall.maxOverall,
        playerTeamOverall.minOverall
      )
    );

    setChampionshipData((championshipData) => ({
      ...championshipData,
      seasonMatches: seasonMatches,
    }));
  };

  const redirectToGame = () => {
    navigate("/game");
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

      setSeason(1);
      getPlayerTeamInformations();
      getSeasonMatches();

      redirectToGame();
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

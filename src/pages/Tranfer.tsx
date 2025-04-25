import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRandomNumber } from "../../utils/getRandomNumber";

import { Player } from "../../gameLogics/Player";
import { Championship } from "../../gameLogics/Championship";

import { nationalLeagues } from "../../data/nationalLeagues/nationalLeagues";

import { ContractList } from "../components/transfer/ContractList";

import "../style/Transfer.css";

export const Transfer = () => {
  let playerDataStorage = localStorage.getItem("playerData");
  if (playerDataStorage === null) playerDataStorage = "{}";

  let championshipDataStorage = localStorage.getItem("championshipData");
  if (championshipDataStorage === null) championshipDataStorage = "{}";

  const player = new Player();
  const championship = new Championship();

  const navigate = useNavigate();

  const [playerData, setPlayerData] = useState<{
    name: string;
    age: number;
    team: string;
    teamMinOverall: number;
    teamMaxOverall: number;
    position: "Zagueiro" | "Meia" | "Atacante";
    overall: number;
    careerMatches: number;
    seasonMatches: number;
    careerGoals: number;
    seasonGoals: number;
    careerAssists: number;
    seasonAssists: number;
    careerGrade: number;
    seasonGrade: number;
    lastSeasonGrade: number;
    gradesOnSeason: Array<number>;
  }>(JSON.parse(playerDataStorage));
  const [championshipData, setChampionshipData] = useState<{
    championshipName: string;
    playerTeam: {
      teamName: string;
      teamOverall: number;
      maxOverall: number;
      minOverall: number;
      maxScore: number;
      minScore: number;
      score: number;
    };
    seasonMatches: Array<{
      opposingTeamName: string;
      opposingTeamOverall: number;
      playerTeamName: string;
      playerTeamOverall: number;
    }>;
  }>(JSON.parse(championshipDataStorage));

  useEffect(() => {
    const currentPlayerData = playerData;

    const playerOverall = player.getPlayerOverall(
      playerData.age + 1,
      additionalOverall
    );

    setPlayerData((playerData) => ({
      ...playerData,
      age: currentPlayerData.age + 1,
      lastSeasonGrade: currentPlayerData.seasonGrade,
      seasonGrade: 0,
      gradesOnSeason: [],
      overall: playerOverall,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem("championshipData", JSON.stringify(championshipData));
  }, [championshipData]);

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  }, [playerData]);

  const additionalOverall = player.getAdditionOverallPerGrade(
    playerData.lastSeasonGrade
  );

  const possibleLeagues = player.getPossibleLeagues(nationalLeagues);

  const firstPossibleContract = player.getPossibleContracts(
    playerData.overall,
    possibleLeagues[0].teams
  );
  const secondPossibleContract = player.getPossibleContracts(
    playerData.overall,
    possibleLeagues[1].teams
  );
  const thirdPossibleContract = player.getPossibleContracts(
    playerData.overall,
    possibleLeagues[2].teams
  );

  const firstContract = player.getContract(firstPossibleContract);
  const secondContract = player.getContract(secondPossibleContract);
  const thirdContract = player.getContract(thirdPossibleContract);
  const contractRenewed =
    championshipData.playerTeam.teamOverall - playerData.overall <= 5;

  const redirectToGame = () => {
    navigate("/game");
  };

  const selectPlayerTeam = (playerTeamName: string) => {
    const selectedChampionship = nationalLeagues.filter((league) =>
      league.teams.some((team) => team.teamName === playerTeamName)
    );

    const teamList = selectedChampionship[0].teams;

    const playerTeam = championship.getPlayerTeamOverall(
      teamList,
      playerTeamName
    );

    const teamsOverall = championship.getTeamsOverall(teamList);

    const seasonMatches = championship.getSeasonMatches(
      teamsOverall,
      playerTeamName,
      playerTeam[0].teamOverall
    );
    setChampionshipData((championshipData) => ({
      ...championshipData,
      seasonMatches: seasonMatches,
      championshipName: selectedChampionship[0].championshipName,
      playerTeam: {
        teamName: playerTeam[0].teamName,
        maxOverall: playerTeam[0].maxOverall,
        minOverall: playerTeam[0].minOverall,
        teamOverall: getRandomNumber(
          playerTeam[0].maxOverall,
          playerTeam[0].minOverall
        ),
        maxScore: playerTeam[0].maxScore,
        minScore: playerTeam[0].minScore,
        score: 0,
      },
    }));

    setPlayerData((playerData) => ({
      ...playerData,
      team: playerTeam[0].teamName,
      seasonGoals: 0,
      seasonAssists: 0,
      seasonMatches: 0,
      seasonGrade: 0,
    }));

    redirectToGame();
  };

  return (
    <div className="transfer">
      <div className="page-title">Janela de transferência</div>

      <div className="player-informations">
        <div className="player-transfer-name">
          <div className="field-value">Nome: </div>
          <div className="field-name">{playerData.name}</div>
        </div>

        <div className="player-transfer-age">
          <div className="field-value">Idade: </div>
          <div className="field-name">{playerData.age}</div>
        </div>

        <div className="player-overall">
          <div className="field-value">Novo overall: </div>
          <div className="field-name">{playerData.overall}</div>
        </div>
      </div>

      <div className="contracts-section">
        <div className="transfer-message">
          Selecione um contrato para prosseguir:
        </div>

        <ContractList
          firstContract={firstContract}
          secondContract={secondContract}
          thirdContract={thirdContract}
          currentContract={contractRenewed ? championshipData.playerTeam : null}
          selectPlayerTeam={selectPlayerTeam}
        />
      </div>
    </div>
  );
};

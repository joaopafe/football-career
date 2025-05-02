import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PlayerInformation } from "../components/game/PlayerInformations";
import { SeasonInformation } from "../components/game/SeasonInformation";
import { PlayerStats } from "../components/game/PlayerStats";
import { SeasonOpportunities } from "../components/game/SeasonOpportunities";
import { ChampionshipInformations } from "../components/game/ChampionshipInformations";
import { MatchAttempts } from "../components/game/MatchAttempts";
import { MatchInformations } from "../components/game/MatchInformations";
import { MatchButton } from "../components/game/MatchButtons";
import { InformationsModal } from "../components/game/InformationsModal";

import { Player } from "../../gameLogics/Player";
import { Match } from "../../gameLogics/Match";

import "../style/reset.css";
import "../style/Game.css";

export const Game = () => {
  let playerDataStorage = localStorage.getItem("playerData");
  if (playerDataStorage === null) playerDataStorage = "{}";

  let championshipDataStorage = localStorage.getItem("championshipData");
  if (championshipDataStorage === null) championshipDataStorage = "{}";

  const player = new Player();
  const match = new Match();

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
  const [playerSeasonOpportunities, setPlayerSeasonOpportunities] = useState({
    disarmingOpportunities: 0,
    passOpportunities: 0,
    finishingOpportunities: 0,
  });
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
  const [season, setSeason] = useState(1);
  const [round, setRound] = useState(1);
  const [matchResult, setMatchResult] = useState<{
    playerTeamGoals: "" | number;
    opposingTeamGoals: "" | number;
  }>({
    playerTeamGoals: "",
    opposingTeamGoals: "",
  });
  const [showStatsModal, setShowStatsModal] = useState({
    showSeasonStats: false,
    showCareerStats: false,
  });
  const [matchWasPlayed, setMatchWasPlayed] = useState(false);
  const [playerIsInjured, setPlayerIsInjured] = useState(false);

  useEffect(() => {
    getPlayerSeasonOpportunities();

    const savedSeason = localStorage.getItem("season");
    const season = savedSeason === null ? 0 : parseInt(savedSeason);

    setSeason(season);
  }, []);

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  }, [playerData]);

  useEffect(() => {
    localStorage.setItem("championshipData", JSON.stringify(championshipData));
  }, [championshipData]);

  const getPlayerSeasonOpportunities = () => {
    const opportunitiesPerSeason = player.getOpportunitiesPerSeason(
      playerData.position,
      player.getAdditionOverallPerGrade(playerData.lastSeasonGrade)
    );
    const additionalOpportunities = player.getAdditionalOpportunities(
      playerData.overall
    );

    opportunitiesPerSeason.disarmingOpportunities = Math.floor(
      opportunitiesPerSeason.disarmingOpportunities * additionalOpportunities
    );
    opportunitiesPerSeason.passOpportunities = Math.floor(
      opportunitiesPerSeason.passOpportunities * additionalOpportunities
    );
    opportunitiesPerSeason.finishingOpportunities = Math.floor(
      opportunitiesPerSeason.finishingOpportunities * additionalOpportunities
    );

    setPlayerSeasonOpportunities({
      disarmingOpportunities: opportunitiesPerSeason.disarmingOpportunities,
      passOpportunities: opportunitiesPerSeason.passOpportunities,
      finishingOpportunities: opportunitiesPerSeason.finishingOpportunities,
    });
  };

  const validatePlayerAttempts = (
    disarmingAttempts: number,
    passAttempts: number,
    finishingAttempts: number
  ) => {
    let disarmingAttemptsFixed = disarmingAttempts;
    let passAttemptsFixed = passAttempts;
    let finishingAttemptsFixed = finishingAttempts;

    if (disarmingAttempts > playerSeasonOpportunities.disarmingOpportunities) {
      window.alert(
        `Você possui somente ${playerSeasonOpportunities.disarmingOpportunities} tentativas de desarme disponíveis.
        Portanto não poderá utilizar ${disarmingAttempts} tentativas`
      );

      disarmingAttemptsFixed = 0;
    }

    if (passAttempts > playerSeasonOpportunities.passOpportunities) {
      window.alert(
        `Você possui somente ${playerSeasonOpportunities.passOpportunities} tentativas de passe disponíveis.
        Portanto não poderá utilizar ${passAttempts} tentativas`
      );

      passAttemptsFixed = 0;
    }

    if (finishingAttempts > playerSeasonOpportunities.finishingOpportunities) {
      window.alert(
        `Você possui somente ${playerSeasonOpportunities.finishingOpportunities} tentativas de finalização disponíveis.
        Portanto não poderá utilizar ${finishingAttempts} tentativas`
      );

      finishingAttemptsFixed = 0;
    }

    return {
      disarmingAttemptsFixed,
      passAttemptsFixed,
      finishingAttemptsFixed,
    };
  };

  const getPlayerAttempts = () => {
    if (!playerIsInjured) {
      const disarmingAttemptsElement: HTMLInputElement | null =
        document.querySelector("#disarming-attempts");

      const passAttemptsElement: HTMLInputElement | null =
        document.querySelector("#pass-attempts");

      const finishingAttemptsElement: HTMLInputElement | null =
        document.querySelector("#finishing-attempts");

      let disarmingAttempts = 0;
      let passAttempts = 0;
      let finishingAttempts = 0;

      if (
        disarmingAttemptsElement != null &&
        passAttemptsElement != null &&
        finishingAttemptsElement != null
      ) {
        if (disarmingAttemptsElement.value !== "")
          disarmingAttempts = parseInt(disarmingAttemptsElement.value);
        if (passAttemptsElement.value !== "")
          passAttempts = passAttempts = parseInt(passAttemptsElement.value);
        if (finishingAttemptsElement.value !== "")
          finishingAttempts = parseInt(finishingAttemptsElement.value);

        if (disarmingAttemptsElement.value === "") disarmingAttempts = 0;
        if (passAttemptsElement.value === "") passAttempts = 0;
        if (finishingAttemptsElement.value === "") finishingAttempts = 0;
      }

      const fixedAttempts = validatePlayerAttempts(
        disarmingAttempts,
        passAttempts,
        finishingAttempts
      );

      disarmingAttempts = fixedAttempts.disarmingAttemptsFixed;
      passAttempts = fixedAttempts.passAttemptsFixed;
      finishingAttempts = fixedAttempts.finishingAttemptsFixed;

      return {
        disarmingAttempts,
        passAttempts,
        finishingAttempts,
      };
    }

    return {
      disarmingAttempts: 0,
      passAttempts: 0,
      finishingAttempts: 0,
    };
  };

  const getPlayerPerformance = () => {
    if (!playerIsInjured) {
      const playerAttempts = getPlayerAttempts();

      const playerPerfomance = match.getPlayerPerformance(
        playerAttempts.disarmingAttempts,
        playerAttempts.passAttempts,
        playerAttempts.finishingAttempts,
        playerData.overall,
        playerData.position
      );

      return playerPerfomance;
    }

    return {
      successfulDisarms: 0,
      successfulPass: 0,
      successfulFinishing: 0,
      successfulAssists: 0,
      successfulGoals: 0,
      unsuccessfulDisarms: 0,
      unsuccessfulPass: 0,
      unsuccessfulFinishing: 0,
      matchGrade: 6,
    };
  };

  const getGoalsOfTheMatch = () => {
    const roundMatch = championshipData.seasonMatches[round - 1];

    const goalsOfTheMatch = match.getGoalsOfTheMatch(
      roundMatch.playerTeamOverall,
      roundMatch.opposingTeamOverall
    );

    return goalsOfTheMatch;
  };

  const getMatchResult = () => {
    if (matchWasPlayed === true) {
      window.alert(
        "Esta partida já foi jogada. Por favor prossiga clicando em 'Próxima partida'"
      );
    }

    if (matchWasPlayed === false) {
      const goalsOfTheMatch = getGoalsOfTheMatch();
      const playerPerformance = getPlayerPerformance();

      const goalsAvoided = Math.floor(playerPerformance.successfulDisarms / 10);

      let matchPontuation: number;

      goalsOfTheMatch.playerTeamGoals +=
        playerPerformance.successfulGoals + playerPerformance.successfulAssists;
      goalsOfTheMatch.opposingTeamGoals -= goalsAvoided;

      if (goalsOfTheMatch.opposingTeamGoals < 0)
        goalsOfTheMatch.opposingTeamGoals = 0;

      if (goalsOfTheMatch.playerTeamGoals > goalsOfTheMatch.opposingTeamGoals)
        matchPontuation = 3;
      if (goalsOfTheMatch.playerTeamGoals < goalsOfTheMatch.opposingTeamGoals)
        matchPontuation = 0;
      if (goalsOfTheMatch.playerTeamGoals === goalsOfTheMatch.opposingTeamGoals)
        matchPontuation = 1;

      const newGradesOnSeason = [
        ...playerData.gradesOnSeason,
        playerPerformance.matchGrade,
      ];

      window.alert(`
      Gols marcados: ${playerPerformance.successfulGoals}
      Assistências realizadas: ${playerPerformance.successfulAssists}
      Gols evitados: ${goalsAvoided}
      Desarmes bem sucedidos: ${playerPerformance.successfulDisarms}
      Passes bem sucedidos: ${playerPerformance.successfulPass}
      Finalizações bem sucedidas: ${playerPerformance.successfulFinishing}
      Nota na partida: ${playerPerformance.matchGrade}
      
      Placar da partida:
      ${championshipData.seasonMatches[round - 1].playerTeamName} ${
        goalsOfTheMatch.playerTeamGoals
      } VS ${championshipData.seasonMatches[round - 1].opposingTeamName} ${
        goalsOfTheMatch.opposingTeamGoals
      }
    `);

      setPlayerData((playerData) => ({
        ...playerData,
        seasonGoals: playerData.seasonGoals + playerPerformance.successfulGoals,
        careerGoals: playerData.careerGoals + playerPerformance.successfulGoals,
        seasonAssists:
          playerData.seasonAssists + playerPerformance.successfulAssists,
        careerAssists:
          playerData.careerAssists + playerPerformance.successfulAssists,
        seasonMatches: playerData.seasonMatches + 1,
        careerMatches: playerData.careerMatches + 1,
        gradesOnSeason: newGradesOnSeason,
        seasonGrade: parseFloat(
          (
            newGradesOnSeason.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ) / newGradesOnSeason.length
          ).toFixed(2)
        ),
      }));

      setMatchResult({
        playerTeamGoals: goalsOfTheMatch.playerTeamGoals,
        opposingTeamGoals: goalsOfTheMatch.opposingTeamGoals,
      });

      const playerAttempts = getPlayerAttempts();

      if (!playerIsInjured) {
        setPlayerSeasonOpportunities({
          disarmingOpportunities:
            playerSeasonOpportunities.disarmingOpportunities -
            playerAttempts.disarmingAttempts,
          passOpportunities:
            playerSeasonOpportunities.passOpportunities -
            playerAttempts.passAttempts,
          finishingOpportunities:
            playerSeasonOpportunities.finishingOpportunities -
            playerAttempts.finishingAttempts,
        });
      }

      if (playerIsInjured) {
        setPlayerSeasonOpportunities({
          disarmingOpportunities:
            playerSeasonOpportunities.disarmingOpportunities -
            Math.floor(playerSeasonOpportunities.disarmingOpportunities * 0.05),
          passOpportunities:
            playerSeasonOpportunities.passOpportunities -
            Math.floor(playerSeasonOpportunities.passOpportunities * 0.05),
          finishingOpportunities:
            playerSeasonOpportunities.finishingOpportunities -
            Math.floor(playerSeasonOpportunities.finishingOpportunities * 0.05),
        });
      }

      setChampionshipData((championshipData) => ({
        ...championshipData,
        playerTeam: {
          ...championshipData.playerTeam,
          score: championshipData.playerTeam.score + matchPontuation,
        },
      }));

      setMatchWasPlayed(true);
    }
  };

  const openStats = (statsModal: "season" | "career") => {
    if (statsModal === "season") {
      setShowStatsModal((showStatsModal) => ({
        ...showStatsModal,
        showSeasonStats: true,
      }));
    }

    if (statsModal === "career") {
      setShowStatsModal((showStatsModal) => ({
        ...showStatsModal,
        showCareerStats: true,
      }));
    }
  };

  const closeStats = (statsModal: "season" | "career") => {
    if (statsModal === "season") {
      setShowStatsModal((showStatsModal) => ({
        ...showStatsModal,
        showSeasonStats: false,
      }));
    }

    if (statsModal === "career") {
      setShowStatsModal((showStatsModal) => ({
        ...showStatsModal,
        showCareerStats: false,
      }));
    }
  };

  const updateMatch = () => {
    if (round < championshipData.seasonMatches.length) {
      if (matchWasPlayed === true) {
        setRound(round + 1);

        setMatchResult({
          playerTeamGoals: "",
          opposingTeamGoals: "",
        });

        setMatchWasPlayed(false);

        const playerIsInjured = getIfPlayerIsInjured();

        if (playerIsInjured) {
          window.alert(
            "Você sofreu uma pequena lesão muscular para a próxima partida e não poderá jogar"
          );

          setPlayerIsInjured(playerIsInjured);
        }

        if (!playerIsInjured) {
          setPlayerIsInjured(playerIsInjured);
        }
      }
      if (matchWasPlayed === false) {
        window.alert(
          "A partida ainda não foi jogada. Clique em 'Confirmar partida' para prosseguir"
        );
      }
    }

    if (round === championshipData.seasonMatches.length) {
      localStorage.setItem(
        "playerSeasonOpportunities",
        JSON.stringify(playerSeasonOpportunities)
      );

      navigate("/classification");
    }
  };

  const getIfPlayerIsInjured = () => {
    const injuryProbability = player.getInjuryProbability(playerData.age);

    const playerIsInjured = player.getIfPlayerIsInjured(injuryProbability);

    return playerIsInjured;
  };

  return (
    <div className="game">
      <div className="player-information-section">
        <div className="player-information">
          <PlayerInformation idName="player-name" name={playerData.name} />
          <PlayerInformation
            idName="player-position"
            name={playerData.position}
          />
          <PlayerInformation idName="player-team" name={playerData.team} />
        </div>

        <div className="season-information">
          <SeasonInformation
            idName="season-number"
            name={`Temporada ${season}`}
          />
          <SeasonInformation
            idName="player-age"
            name={`${playerData.age} anos`}
          />
          <SeasonInformation
            idName="player-overall"
            name={`${playerData.overall} de overall`}
          />
        </div>
      </div>

      <div className="player-stats">
        <PlayerStats
          buttonName="Estatísticas da temporada"
          buttonCollor="14B8A6"
          idName="season-stats"
          statsModal="season"
          openStats={openStats}
        />
        <PlayerStats
          buttonName="Estatísticas da carreira"
          buttonCollor="3730A3"
          idName="career-stats"
          statsModal="career"
          openStats={openStats}
        />
      </div>

      <div className="season-opportunities">
        <SeasonOpportunities
          oppotunityName="Tentativas de desarme disponíveis"
          opportunitiesQuantity={
            playerSeasonOpportunities.disarmingOpportunities
          }
          idName="desarming-opportunities"
        />

        <SeasonOpportunities
          oppotunityName="Tentativas de passe disponíveis"
          opportunitiesQuantity={playerSeasonOpportunities.passOpportunities}
          idName="pass-opportunities"
        />

        <SeasonOpportunities
          oppotunityName="Tentativas de finalização disponíveis"
          opportunitiesQuantity={
            playerSeasonOpportunities.finishingOpportunities
          }
          idName="finishing-opportunities"
        />
      </div>

      <div className="championship-informations">
        <ChampionshipInformations
          fieldName="Competição:"
          fieldValue={championshipData.championshipName}
          idName="championship-name"
        />
        <ChampionshipInformations
          fieldName="Fase:"
          fieldValue={`${round}º rodada`}
          idName="championship-stage"
        />
      </div>

      <div className="match-attempts-section">
        <MatchAttempts
          attemptName="Tentativas de desarme na partida"
          idName="disarming-attempts"
        />
        <MatchAttempts
          attemptName="Tentativas de passe na partida"
          idName="pass-attempts"
        />
        <MatchAttempts
          attemptName="Tentativas de finalização na partida"
          idName="finishing-attempts"
        />
      </div>

      <div className="match-section">
        <MatchInformations
          playerTeamName={
            championshipData.seasonMatches[round - 1].playerTeamName
          }
          playerTeamGoals={
            matchResult.playerTeamGoals === ""
              ? ""
              : matchResult.playerTeamGoals.toString()
          }
          opposingTeamName={
            championshipData.seasonMatches[round - 1].opposingTeamName
          }
          opposingTeamGoals={
            matchResult.playerTeamGoals === ""
              ? ""
              : matchResult.opposingTeamGoals.toString()
          }
        />
      </div>

      <div className="match-buttons-section">
        <MatchButton
          buttonValue="Confirmar partida"
          buttonColor="30A349"
          idName="match-confirm-button"
          matchAction={getMatchResult}
        />
        <MatchButton
          buttonValue="Próxima partida"
          buttonColor="A33C30"
          idName="next-match-button"
          matchAction={updateMatch}
        />
      </div>

      <InformationsModal
        showModal={showStatsModal.showSeasonStats}
        modalName="Estatísticas da temporada"
        goalsScored={playerData.seasonGoals}
        assistsScored={playerData.seasonAssists}
        matchesPlayed={playerData.seasonMatches}
        avarageGrade={playerData.seasonGrade}
        teamScore={championshipData.playerTeam.score}
        statsModal="season"
        closeStats={closeStats}
      />
      <InformationsModal
        showModal={showStatsModal.showCareerStats}
        modalName="Estatísticas da carreira"
        goalsScored={playerData.careerGoals}
        assistsScored={playerData.careerAssists}
        matchesPlayed={playerData.careerMatches}
        statsModal="career"
        closeStats={closeStats}
      />
    </div>
  );
};

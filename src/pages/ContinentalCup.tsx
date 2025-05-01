import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { continentalCups } from "../../data/continentalCups/continentalCups";

import { Match } from "../../gameLogics/Match";
import { Championship } from "../../gameLogics/Championship";
import { Player } from "../../gameLogics/Player";

import { getRandomNumber } from "../../utils/getRandomNumber";

import { PlayerInformation } from "../components/game/PlayerInformations";
import { SeasonInformation } from "../components/game/SeasonInformation";
import { PlayerStats } from "../components/game/PlayerStats";
import { SeasonOpportunities } from "../components/game/SeasonOpportunities";
import { ChampionshipInformations } from "../components/game/ChampionshipInformations";
import { MatchAttempts } from "../components/game/MatchAttempts";
import { MatchInformations } from "../components/game/MatchInformations";
import { MatchButton } from "../components/game/MatchButtons";
import { InformationsModal } from "../components/game/InformationsModal";

export const ContinentalCup = () => {
  let playerDataStorage = localStorage.getItem("playerData");
  if (playerDataStorage === null) playerDataStorage = "{}";

  let championshipDataStorage = localStorage.getItem("championshipData");
  if (championshipDataStorage === null) championshipDataStorage = "{}";

  let playerSeasonOpportunitiesStorage = localStorage.getItem(
    "playerSeasonOpportunities"
  );
  if (playerSeasonOpportunitiesStorage === null)
    playerSeasonOpportunitiesStorage = "{}";

  let seasonStorage = localStorage.getItem("season");
  if (seasonStorage === null) championshipDataStorage = "1";

  const championship = new Championship();
  const match = new Match();
  const player = new Player();

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
  const [playerSeasonOpportunities, setPlayerSeasonOpportunities] = useState({
    disarmingOpportunities: 0,
    passOpportunities: 0,
    finishingOpportunities: 0,
  });
  const [continentalCup, setContinentalCup] = useState({
    continentalCupName: "",
  });
  const [continentalCupMatches, setContinentalCupMatches] = useState({
    roundOf16: {
      phase: "",
      opposingTeamName: "",
      opposingTeamOverall: 0,
      playerTeamName: "",
      playerTeamOverall: 0,
    },
    quarterFinals: {
      phase: "",
      opposingTeamName: "",
      opposingTeamOverall: 0,
      playerTeamName: "",
      playerTeamOverall: 0,
    },
    semiFinal: {
      phase: "",
      opposingTeamName: "",
      opposingTeamOverall: 0,
      playerTeamName: "",
      playerTeamOverall: 0,
    },
    final: {
      phase: "",
      opposingTeamName: "",
      opposingTeamOverall: 0,
      playerTeamName: "",
      playerTeamOverall: 0,
    },
  });
  const [season, setSeason] = useState(1);
  const [showStatsModal, setShowStatsModal] = useState({
    showSeasonStats: false,
    showCareerStats: false,
  });
  const [cupMatch, setCupMatch] = useState({
    phase: "",
    opposingTeamName: "",
    opposingTeamOverall: 0,
    playerTeamName: "",
    playerTeamOverall: 0,
  });
  const [roundMatch, setRoundMatch] = useState(1);
  const [matchResult, setMatchResult] = useState<{
    playerTeamGoals: "" | number;
    opposingTeamGoals: "" | number;
  }>({
    playerTeamGoals: "",
    opposingTeamGoals: "",
  });
  const [matchWasPlayed, setMatchWasPlayed] = useState(false);
  const [roundGoals, setRoundGoals] = useState({
    playerTeamGoals: 0,
    opposingTeamGoals: 0,
  });
  const [groupStageOpponents, setGroupStageOpponents] = useState<
    {
      teamName: string;
      maxOverall: number;
      minOverall: number;
      maxScore: number;
      minScore: number;
    }[]
  >([]);
  const [groupStageMatches, setGroupStageMatches] = useState<
    {
      opposingTeamName: string;
      opposingTeamOverall: number;
      playerTeamName: string;
      playerTeamOverall: number;
    }[]
  >([]);
  const [teamScoreGroup, setTeamScoreGroup] = useState(0);
  const [playerIsInjured, setPlayerIsInjured] = useState(false);

  useEffect(() => {
    setPlayerSeasonOpportunities(JSON.parse(playerSeasonOpportunitiesStorage));

    const newContinentalCup = championship.getContinentalCup(
      championshipData.championshipName,
      continentalCups
    );

    if (newContinentalCup) {
      setContinentalCup({ continentalCupName: newContinentalCup.cupName });

      const newContinentalCupFiltered = championship.getContinentalCupFiltered(
        newContinentalCup,
        championshipData.playerTeam.teamName
      );

      const threeGroupStageOpponents = championship.getThreeGroupStageOpponents(
        newContinentalCupFiltered
      );

      const groupStageMatches = championship.getGroupStageMatches(
        threeGroupStageOpponents,
        championshipData.playerTeam.teamName,
        championshipData.playerTeam.teamOverall
      );

      const newContinentalCupMatches = championship.getContinentalCupMatches(
        newContinentalCupFiltered,
        {
          playerTeamName: championshipData.playerTeam.teamName,
          playerTeamOverall: championshipData.playerTeam.teamOverall,
        }
      );

      setGroupStageOpponents(threeGroupStageOpponents);
      setGroupStageMatches(groupStageMatches);
      setContinentalCupMatches(newContinentalCupMatches);

      setCupMatch({
        phase: "Fase de grupos",
        playerTeamName: groupStageMatches[roundMatch - 1].playerTeamName,
        playerTeamOverall: groupStageMatches[roundMatch - 1].playerTeamOverall,
        opposingTeamName: groupStageMatches[roundMatch - 1].opposingTeamName,
        opposingTeamOverall:
          groupStageMatches[roundMatch - 1].opposingTeamOverall,
      });
    }

    if (seasonStorage != null) {
      setSeason(parseInt(seasonStorage));
    }

    console.log(playerSeasonOpportunities);
  }, []);

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  }, [playerData]);

  useEffect(() => {
    localStorage.setItem("season", season.toString());
  }, [season]);

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
    const roundMatch = cupMatch;

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

      goalsOfTheMatch.playerTeamGoals +=
        playerPerformance.successfulGoals + playerPerformance.successfulAssists;
      goalsOfTheMatch.opposingTeamGoals -= goalsAvoided;

      if (goalsOfTheMatch.opposingTeamGoals < 0)
        goalsOfTheMatch.opposingTeamGoals = 0;

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
      ${cupMatch.playerTeamName} ${goalsOfTheMatch.playerTeamGoals} VS ${cupMatch.opposingTeamName} ${goalsOfTheMatch.opposingTeamGoals}
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

      if (goalsOfTheMatch.playerTeamGoals > goalsOfTheMatch.opposingTeamGoals)
        setTeamScoreGroup(teamScoreGroup + 3);
      if (goalsOfTheMatch.playerTeamGoals === goalsOfTheMatch.opposingTeamGoals)
        setTeamScoreGroup(teamScoreGroup + 1);

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

      setMatchWasPlayed(true);

      setRoundGoals({
        playerTeamGoals:
          goalsOfTheMatch.playerTeamGoals + roundGoals.playerTeamGoals,
        opposingTeamGoals:
          goalsOfTheMatch.opposingTeamGoals + roundGoals.opposingTeamGoals,
      });

      setRoundMatch(roundMatch + 1);
    }
  };

  const finalResultOfGroupStage = () => {
    if (roundMatch === 7) {
      const firstOpponentScore = {
        teamName: groupStageOpponents[0].teamName,
        score: getRandomNumber(
          groupStageOpponents[0].maxScore,
          groupStageOpponents[0].minScore
        ),
      };

      const secondOpponentScore = {
        teamName: groupStageOpponents[1].teamName,
        score: getRandomNumber(
          groupStageOpponents[1].maxScore,
          groupStageOpponents[1].minScore
        ),
      };

      const thirdOpponentScore = {
        teamName: groupStageOpponents[2].teamName,
        score: getRandomNumber(
          groupStageOpponents[2].maxScore,
          groupStageOpponents[2].minScore
        ),
      };

      const playerTeamScore = {
        teamName: championshipData.playerTeam.teamName,
        score: teamScoreGroup,
      };

      const groupScore = [
        firstOpponentScore,
        secondOpponentScore,
        thirdOpponentScore,
        playerTeamScore,
      ];

      groupScore.sort((a, b) => b.score - a.score);

      window.alert(`
        Classificação do grupo:
        1º - ${groupScore[0].teamName} - ${groupScore[0].score}
        2º - ${groupScore[1].teamName} - ${groupScore[1].score}
        3º - ${groupScore[2].teamName} - ${groupScore[2].score}
        4º - ${groupScore[3].teamName} - ${groupScore[3].score}
      `);

      const playerTeamPosition =
        groupScore.findIndex(
          (team) => team.teamName === playerTeamScore.teamName
        ) + 1;

      if (playerTeamPosition === 3 || playerTeamPosition === 4) {
        window.alert(
          `O seu time ficou em ${playerTeamPosition}º na fase de grupos. Portanto, está eliminado da competição`
        );
      }

      if (playerTeamPosition === 2 || playerTeamPosition === 1) {
        window.alert(
          `O seu time ficou em ${playerTeamPosition}º na fase de grupo. Portanto, está classificado para as oitavas de final`
        );

        setCupMatch({
          phase: continentalCupMatches.roundOf16.phase,
          playerTeamName: continentalCupMatches.roundOf16.playerTeamName,
          playerTeamOverall: continentalCupMatches.roundOf16.playerTeamOverall,
          opposingTeamName: continentalCupMatches.roundOf16.opposingTeamName,
          opposingTeamOverall:
            continentalCupMatches.roundOf16.opposingTeamOverall,
        });

        setRoundGoals({
          playerTeamGoals: 0,
          opposingTeamGoals: 0,
        });
      }
    }
  };

  const updatePhase = () => {
    if (roundMatch >= 1 && roundMatch <= 6) {
      setCupMatch({
        phase: "Fase de grupos",
        playerTeamName: groupStageMatches[roundMatch - 1].playerTeamName,
        playerTeamOverall: groupStageMatches[roundMatch - 1].playerTeamOverall,
        opposingTeamName: groupStageMatches[roundMatch - 1].opposingTeamName,
        opposingTeamOverall:
          groupStageMatches[roundMatch - 1].opposingTeamOverall,
      });
    }

    finalResultOfGroupStage();

    const playerTeamWon =
      roundGoals.playerTeamGoals > roundGoals.opposingTeamGoals;
    const playerTeamTied =
      roundGoals.playerTeamGoals === roundGoals.opposingTeamGoals;
    const playerTeamLost =
      roundGoals.playerTeamGoals < roundGoals.opposingTeamGoals;

    const resultOfPenalties = {
      playerTeamGoals: getRandomNumber(5, 1),
      opposingTeamGoals: getRandomNumber(5, 1),
    };
    if (
      resultOfPenalties.playerTeamGoals === resultOfPenalties.opposingTeamGoals
    ) {
      resultOfPenalties.opposingTeamGoals =
        resultOfPenalties.opposingTeamGoals - 1;
    }

    if (roundMatch === 9) {
      if (playerTeamWon) {
        window.alert(
          `O seu time se classificou para as quartas de final, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        setCupMatch(continentalCupMatches.quarterFinals);

        setRoundGoals({ playerTeamGoals: 0, opposingTeamGoals: 0 });
      }

      if (playerTeamTied) {
        if (
          resultOfPenalties.playerTeamGoals >
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time se classificou para as quartas de final, vencendo por ${resultOfPenalties.playerTeamGoals} a ${resultOfPenalties.opposingTeamGoals} nos pênaltis`
          );
          setCupMatch(continentalCupMatches.quarterFinals);

          setRoundGoals({ playerTeamGoals: 0, opposingTeamGoals: 0 });
        }

        if (
          resultOfPenalties.playerTeamGoals <
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time foi eliminado nas oitavas de final, perdendo por ${resultOfPenalties.opposingTeamGoals} a ${resultOfPenalties.playerTeamGoals} nos pênaltis`
          );

          redirectScreen();
        }
      }

      if (playerTeamLost) {
        window.alert(
          `O seu time foi eliminado nas oitavas de final, perdendo por ${roundGoals.opposingTeamGoals} a ${roundGoals.playerTeamGoals} no placar agregado`
        );

        redirectScreen();
      }
    }

    if (roundMatch === 11) {
      if (playerTeamWon) {
        window.alert(
          `O seu time se classificou para a semi final, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        setCupMatch(continentalCupMatches.semiFinal);

        setRoundGoals({ playerTeamGoals: 0, opposingTeamGoals: 0 });
      }

      if (playerTeamTied) {
        if (
          resultOfPenalties.playerTeamGoals >
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time se classificou para semi final, vencendo por ${resultOfPenalties.playerTeamGoals} a ${resultOfPenalties.opposingTeamGoals} nos pênaltis`
          );
          setCupMatch(continentalCupMatches.semiFinal);

          setRoundGoals({ playerTeamGoals: 0, opposingTeamGoals: 0 });
        }

        if (
          resultOfPenalties.playerTeamGoals <
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time foi eliminado nas quartas de final, perdendo por ${resultOfPenalties.opposingTeamGoals} a ${resultOfPenalties.playerTeamGoals} nos pênaltis`
          );

          redirectScreen();
        }
      }

      if (playerTeamLost) {
        window.alert(
          `O seu time foi eliminado nas quartas de final, perdendo por ${roundGoals.opposingTeamGoals} a ${roundGoals.playerTeamGoals} no placar agregado`
        );

        redirectScreen();
      }
    }

    if (roundMatch === 13) {
      if (playerTeamWon) {
        window.alert(
          `O seu time se classificou para a final, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        setCupMatch(continentalCupMatches.final);

        setRoundGoals({ playerTeamGoals: 0, opposingTeamGoals: 0 });
      }

      if (playerTeamTied) {
        if (
          resultOfPenalties.playerTeamGoals >
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time se classificou para a final, vencendo por ${resultOfPenalties.playerTeamGoals} a ${resultOfPenalties.opposingTeamGoals} nos pênaltis`
          );
          setCupMatch(continentalCupMatches.final);

          setRoundGoals({ playerTeamGoals: 0, opposingTeamGoals: 0 });
        }

        if (
          resultOfPenalties.playerTeamGoals <
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time foi eliminado na semi final, perdendo por ${resultOfPenalties.opposingTeamGoals} a ${resultOfPenalties.playerTeamGoals} nos pênaltis`
          );

          redirectScreen();
        }
      }

      if (playerTeamLost) {
        window.alert(
          `O seu time foi eliminado na semi final, perdendo por ${roundGoals.opposingTeamGoals} a ${roundGoals.playerTeamGoals} no placar agregado`
        );

        redirectScreen();
      }
    }

    if (roundMatch === 14) {
      if (playerTeamWon) {
        window.alert(
          `Parabéns, o seu time foi campeão da ${continentalCup.continentalCupName}, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        redirectScreen();
      }

      if (playerTeamTied) {
        if (
          resultOfPenalties.playerTeamGoals >
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `Parabéns, o seu time foi campeão da ${continentalCup.continentalCupName}, vencendo por ${resultOfPenalties.playerTeamGoals} a ${resultOfPenalties.opposingTeamGoals} nos pênaltis`
          );
          redirectScreen();
        }

        if (
          resultOfPenalties.playerTeamGoals <
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time perdeu o título da ${continentalCup.continentalCupName} na final, perdendo por ${resultOfPenalties.opposingTeamGoals} a ${resultOfPenalties.playerTeamGoals} nos pênaltis`
          );

          redirectScreen();
        }
      }

      if (playerTeamLost) {
        window.alert(
          `O seu time perdeu o título da ${continentalCup.continentalCupName} na final, perdendo por ${resultOfPenalties.opposingTeamGoals} a ${resultOfPenalties.playerTeamGoals} no placar agregado`
        );

        redirectScreen();
      }
    }
  };

  const redirectScreen = () => {
    navigate("/transfer");
  };

  const updateMatch = () => {
    if (matchWasPlayed === true) {
      updatePhase();

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
  };

  const getIfPlayerIsInjured = () => {
    const injuryProbability = player.getInjuryProbability(playerData.age);

    const playerIsInjured = player.getIfPlayerIsInjured(injuryProbability);

    return playerIsInjured;
  };

  return (
    <div className="national-cup">
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
          fieldValue={continentalCup.continentalCupName}
          idName="championship-name"
        />
        <ChampionshipInformations
          fieldName="Fase:"
          fieldValue={`${cupMatch.phase} - ${roundMatch}º jogo`}
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
          playerTeamName={cupMatch.playerTeamName}
          playerTeamGoals={
            matchResult.playerTeamGoals === ""
              ? ""
              : matchResult.playerTeamGoals.toString()
          }
          opposingTeamName={cupMatch.opposingTeamName}
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

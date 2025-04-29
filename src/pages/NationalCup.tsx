import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { nationalCups } from "../../data/nationalCups/nationalCups";

import { Championship } from "../../gameLogics/Championship";
import { Match } from "../../gameLogics/Match";

import { PlayerInformation } from "../components/game/PlayerInformations";
import { SeasonInformation } from "../components/game/SeasonInformation";
import { PlayerStats } from "../components/game/PlayerStats";
import { InformationsModal } from "../components/game/InformationsModal";
import { SeasonOpportunities } from "../components/game/SeasonOpportunities";
import { ChampionshipInformations } from "../components/game/ChampionshipInformations";
import { MatchAttempts } from "../components/game/MatchAttempts";
import { MatchInformations } from "../components/game/MatchInformations";
import { MatchButton } from "../components/game/MatchButtons";
import { getRandomNumber } from "../../utils/getRandomNumber";

export const NationalCup = () => {
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

  let placementLastSeasonStorage = localStorage.getItem("placementLastSeason");
  if (placementLastSeasonStorage === null) placementLastSeasonStorage = "20";

  const championship = new Championship();
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
  const [nationalCup, setNationalCup] = useState({ nationalCupName: "" });
  const [nationalCupMatches, setNationalCupMatches] = useState({
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
  const [placementLastSeason, setPlacementLastSeason] = useState(20);

  useEffect(() => {
    setPlayerSeasonOpportunities(JSON.parse(playerSeasonOpportunitiesStorage));

    const newNationalCup = championship.getNationalCup(
      championshipData.championshipName,
      nationalCups
    )[0];

    setNationalCup({ nationalCupName: newNationalCup.cupName });

    const newNationalCupFiltered = championship.getNationalCupFiltered(
      newNationalCup,
      championshipData.playerTeam.teamName
    );

    const newNationalCupMatches = championship.getNationalCupsMatches(
      newNationalCupFiltered,
      {
        playerTeamName: championshipData.playerTeam.teamName,
        playerTeamOverall: championshipData.playerTeam.teamOverall,
      }
    );

    setNationalCupMatches(newNationalCupMatches);

    if (seasonStorage != null) {
      setSeason(parseInt(seasonStorage));
    }

    setCupMatch(newNationalCupMatches.roundOf16);

    if (placementLastSeasonStorage != null) {
      setPlacementLastSeason(parseInt(placementLastSeasonStorage));
    }
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
      disarmingAttempts = parseInt(disarmingAttemptsElement.value);
      passAttempts = parseInt(passAttemptsElement.value);
      finishingAttempts = parseInt(finishingAttemptsElement.value);
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
  };

  const getPlayerPerformance = () => {
    const playerAttempts = getPlayerAttempts();

    const playerPerfomance = match.getPlayerPerformance(
      playerAttempts.disarmingAttempts,
      playerAttempts.passAttempts,
      playerAttempts.finishingAttempts,
      playerData.overall,
      playerData.position
    );

    return playerPerfomance;
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

      const playerAttempts = getPlayerAttempts();

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

  const redirectScreen = () => {
    if (placementLastSeason <= 6) {
      navigate("/continental-cup");
    }

    if (placementLastSeason >= 7) {
      setSeason(season + 1);

      navigate("/transfer");
    }
  };

  const updatePhase = () => {
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

    if (roundMatch === 3) {
      if (playerTeamWon) {
        window.alert(
          `O seu time se classificou para as quartas de final, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        setCupMatch(nationalCupMatches.quarterFinals);

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
          setCupMatch(nationalCupMatches.quarterFinals);

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

    if (roundMatch === 5) {
      if (playerTeamWon) {
        window.alert(
          `O seu time se classificou para a semi final, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        setCupMatch(nationalCupMatches.semiFinal);

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
          setCupMatch(nationalCupMatches.semiFinal);

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

    if (roundMatch === 7) {
      if (playerTeamWon) {
        window.alert(
          `O seu time se classificou para a final, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        setCupMatch(nationalCupMatches.final);

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
          setCupMatch(nationalCupMatches.final);

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

    if (roundMatch === 9) {
      if (playerTeamWon) {
        window.alert(
          `Parabéns, o seu time foi campeão da ${nationalCup.nationalCupName}, vencendo por ${roundGoals.playerTeamGoals} a ${roundGoals.opposingTeamGoals} no placar agregado`
        );
        redirectScreen();
      }

      if (playerTeamTied) {
        if (
          resultOfPenalties.playerTeamGoals >
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `Parabéns, o seu time foi campeão da ${nationalCup.nationalCupName}, vencendo por ${resultOfPenalties.playerTeamGoals} a ${resultOfPenalties.opposingTeamGoals} nos pênaltis`
          );
          redirectScreen();
        }

        if (
          resultOfPenalties.playerTeamGoals <
          resultOfPenalties.opposingTeamGoals
        ) {
          window.alert(
            `O seu time perdeu o título da ${nationalCup.nationalCupName} na final, perdendo por ${resultOfPenalties.opposingTeamGoals} a ${resultOfPenalties.playerTeamGoals} nos pênaltis`
          );

          redirectScreen();
        }
      }

      if (playerTeamLost) {
        window.alert(
          `O seu time perdeu o título da ${nationalCup.nationalCupName} na final, perdendo por ${resultOfPenalties.opposingTeamGoals} a ${resultOfPenalties.playerTeamGoals} no placar agregado`
        );

        redirectScreen();
      }
    }
  };

  const updateMatch = () => {
    if (matchWasPlayed === true) {
      updatePhase();

      setMatchResult({
        playerTeamGoals: "",
        opposingTeamGoals: "",
      });

      setMatchWasPlayed(false);
    }
    if (matchWasPlayed === false) {
      window.alert(
        "A partida ainda não foi jogada. Clique em 'Confirmar partida' para prosseguir"
      );
    }
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
          fieldValue={nationalCup.nationalCupName}
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

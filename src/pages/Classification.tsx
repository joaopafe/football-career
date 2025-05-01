import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Championship } from "../../gameLogics/Championship";

import { nationalLeagues } from "../../data/nationalLeagues/nationalLeagues";

import { ILeagueScore } from "../../interfaces/championshipInterfaces";

import { PlayerStats } from "../components/game/PlayerStats";
import { InformationsModal } from "../components/game/InformationsModal";
import { ChampionshipInformations } from "../components/game/ChampionshipInformations";
import { ClassificationList } from "../components/classification/ClassificationList";
import { MatchButton } from "../components/game/MatchButtons";

import "../style/reset.css";
import "../style/Classification.css";

export const Classification = () => {
  let playerDataStorage = localStorage.getItem("playerData");
  if (playerDataStorage === null) playerDataStorage = "{}";

  let championshipDataStorage = localStorage.getItem("championshipData");
  if (championshipDataStorage === null) championshipDataStorage = "{}";

  const championship = new Championship();

  const navigate = useNavigate();

  const [playerData] = useState<{
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
  const [showStatsModal, setShowStatsModal] = useState({
    showSeasonStats: false,
    showCareerStats: false,
  });
  const [championshipData] = useState<{
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
  const [leagueScore, setLeagueScore] = useState<Array<ILeagueScore>>([
    {
      teamName: "",
      teamScore: 0,
    },
  ]);

  useEffect(() => {
    const nationalLeague = nationalLeagues.filter((nationalLeague) => {
      return (
        nationalLeague.championshipName === championshipData.championshipName
      );
    });

    const newLeagueScore = championship.getLeagueScore(
      nationalLeague[0].teams,
      championshipData.playerTeam.teamName,
      championshipData.playerTeam.score
    );

    setLeagueScore(newLeagueScore);

    const playerIndex = newLeagueScore.findIndex(
      (team) => team.teamName === championshipData.playerTeam.teamName
    );

    const playerTeamPlacing = {
      team: newLeagueScore[playerIndex],
      placing: playerIndex + 1,
    };

    localStorage.setItem(
      "placementLastSeason",
      playerTeamPlacing.placing.toString()
    );

    if (playerTeamPlacing.placing === 1) {
      window.alert("Parabéns! Seu time foi campeão!");
    }

    if (playerTeamPlacing.placing > 1 && playerTeamPlacing.placing < 7) {
      window.alert(
        "Parabéns! Seu está classificado para jogar a copa continental da próxima temporada!"
      );
    }
  }, []);

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

  const redirectToNationalCup = () => {
    navigate("/national-cup");
  };

  return (
    <div className="classification">
      <div className="classification-page-title">Classificação final</div>

      <ChampionshipInformations
        fieldName="Competição:"
        fieldValue={championshipData.championshipName}
        idName="championship-name"
      />

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

      <div className="classification-columns">
        <div className="placing-column">Colocação</div>
        <div className="team-column">Time</div>
        <div className="score-column">Pontuação</div>
      </div>

      <div className="classification-list">
        <ClassificationList leagueScore={leagueScore} />
      </div>

      <div className="cup-button-section">
        <MatchButton
          buttonValue="Jogar copa nacional"
          buttonColor="32A330"
          idName="go-to-national-cup"
          matchAction={redirectToNationalCup}
        />
      </div>

      <InformationsModal
        showModal={showStatsModal.showSeasonStats}
        modalName="Estatísticas da temporada"
        goalsScored={playerData.seasonGoals}
        assistsScored={playerData.seasonAssists}
        matchesPlayed={playerData.seasonMatches}
        avarageGrade={playerData.seasonGrade}
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

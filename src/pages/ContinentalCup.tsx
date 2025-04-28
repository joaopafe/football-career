import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { continentalCups } from "../../data/continentalCups/continentalCups";

import { Match } from "../../gameLogics/Match";
import { Championship } from "../../gameLogics/Championship";

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
  const [groupStageOpponents, setGroupStageOpponents] = useState({
    firstTeam: {
      teamName: "",
      maxOverall: 0,
      minOverall: 0,
      maxScore: 0,
      minScore: 0,
    },
    secondTeam: {
      teamName: "",
      maxOverall: 0,
      minOverall: 0,
      maxScore: 0,
      minScore: 0,
    },
    thirdTeam: {
      teamName: "",
      maxOverall: 0,
      minOverall: 0,
      maxScore: 0,
      minScore: 0,
    },
  });
  const [groupStageMatches, setGroupStageMatches] = useState();

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

      const groupStageMatches = championship.getGroupStageMatches;

      const newContinentalCupMatches = championship.getContinentalCupMatches(
        newContinentalCupFiltered,
        {
          playerTeamName: championshipData.playerTeam.teamName,
          playerTeamOverall: championshipData.playerTeam.teamOverall,
        }
      );
    }
  }, []);

  return null;
};

import { IContinentalCup } from "../../interfaces/championshipInterfaces";

export const championsLeagueCup: IContinentalCup = {
  relatedNationalLeague: [
    "Premier League",
    "Ligue 1",
    "Bundesliga",
    "Série A Itália",
    "Liga Portugal",
    "La Liga",
  ],
  cupName: "Champions League",
  groupStage: {
    phaseName: "Fase de grupos",
    possibleOpponents: [
      {
        teamName: "Estrelha Vermelha",
        maxOverall: 73,
        minOverall: 70,
        maxScore: 10,
        minScore: 3,
      },
      {
        teamName: "PAOK",
        maxOverall: 73,
        minOverall: 69,
        maxScore: 10,
        minScore: 3,
      },
      {
        teamName: "RB Salzburg",
        maxOverall: 76,
        minOverall: 70,
        maxScore: 11,
        minScore: 5,
      },
      {
        teamName: "Sturm",
        maxOverall: 74,
        minOverall: 68,
        maxScore: 9,
        minScore: 2,
      },
      {
        teamName: "Olympiacos",
        maxOverall: 75,
        minOverall: 70,
        maxScore: 9,
        minScore: 2,
      },
      {
        teamName: "Galatasaray",
        maxOverall: 79,
        minOverall: 73,
        maxScore: 12,
        minScore: 6,
      },
      {
        teamName: "Fenerbahçe",
        maxOverall: 80,
        minOverall: 74,
        maxScore: 12,
        minScore: 6,
      },
      {
        teamName: "Ajax",
        maxOverall: 82,
        minOverall: 77,
        maxScore: 15,
        minScore: 8,
      },
      {
        teamName: "PSV",
        maxOverall: 82,
        minOverall: 77,
        maxScore: 15,
        minScore: 8,
      },
      {
        teamName: "Rangers",
        maxOverall: 72,
        minOverall: 67,
        maxScore: 8,
        minScore: 1,
      },
      {
        teamName: "Alkmaar",
        maxOverall: 78,
        minOverall: 74,
        maxScore: 9,
        minScore: 2,
      },
      {
        teamName: "Viktoria Plzen",
        maxOverall: 73,
        minOverall: 68,
        maxScore: 8,
        minScore: 1,
      },
    ],
  },
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Lyon",
          maxOverall: 80,
          minOverall: 75,
        },
        {
          teamName: "RB Leipzig",
          maxOverall: 83,
          minOverall: 76,
        },
        {
          teamName: "Atalanta",
          maxOverall: 81,
          minOverall: 73,
        },
        {
          teamName: "Sevilla",
          maxOverall: 84,
          minOverall: 77,
        },
        {
          teamName: "Newcastle",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Porto",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Benfica",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Shakhtar Donetsk",
          maxOverall: 79,
          minOverall: 74,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Milan",
          maxOverall: 86,
          minOverall: 80,
        },
        {
          teamName: "PSG",
          maxOverall: 90,
          minOverall: 82,
        },
        {
          teamName: "Borussia Dortmund",
          maxOverall: 87,
          minOverall: 82,
        },
        {
          teamName: "Atlético de Madrid",
          maxOverall: 88,
          minOverall: 82,
        },
        {
          teamName: "Chelsea",
          maxOverall: 87,
          minOverall: 80,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Juventus",
          maxOverall: 88,
          minOverall: 80,
        },
        {
          teamName: "AS Monaco",
          maxOverall: 84,
          minOverall: 77,
        },
        {
          teamName: "Arsenal",
          maxOverall: 90,
          minOverall: 83,
        },
        {
          teamName: "Liverpool",
          maxOverall: 93,
          minOverall: 86,
        },
        {
          teamName: "Bayer Leverkusen",
          maxOverall: 85,
          minOverall: 78,
        },
        {
          teamName: "Napoli",
          maxOverall: 84,
          minOverall: 79,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 1,
      possibleOpponents: [
        {
          teamName: "Internazionale",
          maxOverall: 88,
          minOverall: 80,
        },
        {
          teamName: "Bayern de Munique",
          maxOverall: 92,
          minOverall: 86,
        },
        {
          teamName: "Real Madrid",
          maxOverall: 96,
          minOverall: 87,
        },
        {
          teamName: "Barcelona",
          maxOverall: 95,
          minOverall: 85,
        },
      ],
    },
  ],
};

import { INationalCup } from "../../interfaces/championshipInterfaces";

export const italianCup: INationalCup = {
  relatedNationalLeague: "Série A Itália",
  cupName: "Coppa Italia",
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Cagliari",
          maxOverall: 73,
          minOverall: 65,
        },
        {
          teamName: "Parma",
          maxOverall: 73,
          minOverall: 64,
        },
        {
          teamName: "Lecce",
          maxOverall: 72,
          minOverall: 63,
        },
        {
          teamName: "Empoli",
          maxOverall: 71,
          minOverall: 61,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Torino",
          maxOverall: 76,
          minOverall: 69,
        },
        {
          teamName: "Bologna",
          maxOverall: 75,
          minOverall: 68,
        },
        {
          teamName: "Udinese",
          maxOverall: 75,
          minOverall: 67,
        },
        {
          teamName: "Genoa",
          maxOverall: 74,
          minOverall: 67,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Roma",
          maxOverall: 83,
          minOverall: 77,
        },
        {
          teamName: "Lazio",
          maxOverall: 82,
          minOverall: 75,
        },
        {
          teamName: "Atalanta",
          maxOverall: 81,
          minOverall: 73,
        },
        {
          teamName: "Fiorentina",
          maxOverall: 77,
          minOverall: 70,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Internazionale",
          maxOverall: 88,
          minOverall: 80,
        },
        {
          teamName: "Juventus",
          maxOverall: 88,
          minOverall: 80,
        },
        {
          teamName: "Milan",
          maxOverall: 86,
          minOverall: 80,
        },
        {
          teamName: "Napoli",
          maxOverall: 84,
          minOverall: 79,
        },
      ],
    },
  ],
};

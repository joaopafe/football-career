import { INationalCup } from "../../interfaces/championshipInterfaces";

export const germanCup: INationalCup = {
  relatedNationalLeague: "Bundesliga",
  cupName: "DFB Pokal",
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Hoffenheim",
          maxOverall: 73,
          minOverall: 67,
        },
        {
          teamName: "Union Berlin",
          maxOverall: 72,
          minOverall: 64,
        },
        {
          teamName: "St Pauli",
          maxOverall: 69,
          minOverall: 63,
        },
        {
          teamName: "FC Heidenheim 1846",
          maxOverall: 68,
          minOverall: 61,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Augsburg",
          maxOverall: 77,
          minOverall: 73,
        },
        {
          teamName: "VfB Stuttgart",
          maxOverall: 77,
          minOverall: 70,
        },
        {
          teamName: "Freiburg",
          maxOverall: 74,
          minOverall: 68,
        },
        {
          teamName: "Werder Bremen",
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
          teamName: "RB Leipzig",
          maxOverall: 83,
          minOverall: 76,
        },
        {
          teamName: "Mainz",
          maxOverall: 80,
          minOverall: 75,
        },
        {
          teamName: "Borussia Monchengladbach",
          maxOverall: 79,
          minOverall: 74,
        },
        {
          teamName: "Wolfsburg",
          maxOverall: 78,
          minOverall: 73,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Bayern de Munique",
          maxOverall: 92,
          minOverall: 86,
        },
        {
          teamName: "Borussia Dortmund",
          maxOverall: 87,
          minOverall: 82,
        },
        {
          teamName: "Bayer Leverkusen",
          maxOverall: 85,
          minOverall: 78,
        },
        {
          teamName: "Eintracht Frankfurt",
          maxOverall: 85,
          minOverall: 77,
        },
      ],
    },
  ],
};

import { INationalCup } from "../../interfaces/championshipInterfaces";

export const englishCup: INationalCup = {
  relatedNationalLeague: "Premier League",
  cupName: "FA Cup",
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Fulham",
          maxOverall: 69,
          minOverall: 64,
        },
        {
          teamName: "Leicester City",
          maxOverall: 70,
          minOverall: 64,
        },
        {
          teamName: "Wolverhampton",
          maxOverall: 70,
          minOverall: 64,
        },
        {
          teamName: "Crystal Palace",
          maxOverall: 70,
          minOverall: 64,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Brighton",
          maxOverall: 72,
          minOverall: 64,
        },
        {
          teamName: "Nottingham Forest",
          maxOverall: 73,
          minOverall: 67,
        },
        {
          teamName: "Aston Villa",
          maxOverall: 76,
          minOverall: 72,
        },
        {
          teamName: "West Ham",
          maxOverall: 75,
          minOverall: 70,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Everton",
          maxOverall: 78,
          minOverall: 73,
        },
        {
          teamName: "Newcastle",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Tottenham",
          maxOverall: 83,
          minOverall: 77,
        },
        {
          teamName: "Manchester United",
          maxOverall: 85,
          minOverall: 78,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Manchester City",
          maxOverall: 95,
          minOverall: 87,
        },
        {
          teamName: "Liverpool",
          maxOverall: 93,
          minOverall: 86,
        },
        {
          teamName: "Arsenal",
          maxOverall: 90,
          minOverall: 83,
        },
        {
          teamName: "Chelsea",
          maxOverall: 87,
          minOverall: 80,
        },
      ],
    },
  ],
};

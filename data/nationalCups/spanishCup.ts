import { INationalCup } from "../../interfaces/championshipInterfaces";

export const spanishCup: INationalCup = {
  relatedNationalLeague: "La Liga",
  cupName: "Copa del Rey",
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Celta",
          maxOverall: 71,
          minOverall: 65,
        },
        {
          teamName: "Mallorca",
          maxOverall: 70,
          minOverall: 63,
        },
        {
          teamName: "Getafe",
          maxOverall: 68,
          minOverall: 62,
        },
        {
          teamName: "Osasuna",
          maxOverall: 67,
          minOverall: 62,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Valencia",
          maxOverall: 78,
          minOverall: 70,
        },
        {
          teamName: "Girona",
          maxOverall: 76,
          minOverall: 68,
        },
        {
          teamName: "Rayo Vallecano",
          maxOverall: 73,
          minOverall: 66,
        },
        {
          teamName: "Espanyol",
          maxOverall: 72,
          minOverall: 66,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Athletic Bilbao",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Villarreal",
          maxOverall: 80,
          minOverall: 74,
        },
        {
          teamName: "Betis",
          maxOverall: 80,
          minOverall: 74,
        },
        {
          teamName: "Real Sociedad",
          maxOverall: 80,
          minOverall: 73,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 2,
      possibleOpponents: [
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
        {
          teamName: "Atlético de Madrid",
          maxOverall: 88,
          minOverall: 82,
        },
        {
          teamName: "Sevilla",
          maxOverall: 84,
          minOverall: 77,
        },
      ],
    },
  ],
};

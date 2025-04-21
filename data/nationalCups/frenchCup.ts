import { INationalCup } from "../../interfaces/championshipInterfaces";

export const frenchCup: INationalCup = {
  relatedNationalLeague: "Ligue 1",
  cupName: "Coupe de France",
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "RC Estrasburgo",
          maxOverall: 67,
          minOverall: 59,
        },
        {
          teamName: "Stade Brestois",
          maxOverall: 66,
          minOverall: 58,
        },
        {
          teamName: "AJ Auxerre",
          maxOverall: 64,
          minOverall: 57,
        },
        {
          teamName: "Angers",
          maxOverall: 63,
          minOverall: 55,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Nantes",
          maxOverall: 72,
          minOverall: 66,
        },
        {
          teamName: "Toulouse",
          maxOverall: 71,
          minOverall: 64,
        },
        {
          teamName: "Montpellier",
          maxOverall: 69,
          minOverall: 60,
        },
        {
          teamName: "Saint-Étienne",
          maxOverall: 68,
          minOverall: 60,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Nice",
          maxOverall: 79,
          minOverall: 73,
        },
        {
          teamName: "Lille",
          maxOverall: 76,
          minOverall: 70,
        },
        {
          teamName: "Lens",
          maxOverall: 75,
          minOverall: 68,
        },
        {
          teamName: "Rennes",
          maxOverall: 74,
          minOverall: 67,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "PSG",
          maxOverall: 90,
          minOverall: 82,
        },
        {
          teamName: "AS Monaco",
          maxOverall: 84,
          minOverall: 77,
        },
        {
          teamName: "Olympique Marselha",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Lyon",
          maxOverall: 80,
          minOverall: 75,
        },
      ],
    },
  ],
};

import { INationalCup } from "../../interfaces/championshipInterfaces";

export const brazilianCup: INationalCup = {
  relatedNationalLeague: "Brasileirão",
  cupName: "Copa do Brasil",
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Sport",
          maxOverall: 59,
          minOverall: 52,
        },
        {
          teamName: "Mirassol",
          maxOverall: 60,
          minOverall: 55,
        },
        {
          teamName: "Ponte Preta",
          maxOverall: 58,
          minOverall: 51,
        },
        {
          teamName: "Guarani",
          maxOverall: 58,
          minOverall: 51,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Grêmio",
          maxOverall: 77,
          minOverall: 66,
        },
        {
          teamName: "Fluminense",
          maxOverall: 77,
          minOverall: 67,
        },
        {
          teamName: "Santos",
          maxOverall: 75,
          minOverall: 65,
        },
        {
          teamName: "Vasco",
          maxOverall: 73,
          minOverall: 65,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Cruzeiro",
          maxOverall: 78,
          minOverall: 69,
        },
        {
          teamName: "Corinthians",
          maxOverall: 80,
          minOverall: 70,
        },
        {
          teamName: "Atlético MG",
          maxOverall: 84,
          minOverall: 75,
        },
        {
          teamName: "Palmeiras",
          maxOverall: 84,
          minOverall: 77,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "São Paulo",
          maxOverall: 79,
          minOverall: 70,
        },
        {
          teamName: "Internacional",
          maxOverall: 81,
          minOverall: 75,
        },
        {
          teamName: "Botafogo",
          maxOverall: 85,
          minOverall: 77,
        },
        {
          teamName: "Flamengo",
          maxOverall: 87,
          minOverall: 78,
        },
      ],
    },
  ],
};

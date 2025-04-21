import { INationalCup } from "../../interfaces/championshipInterfaces";

export const portugueseCup: INationalCup = {
  relatedNationalLeague: "Liga Portugal",
  cupName: "Taça de Portugal",
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Nacional",
          maxOverall: 60,
          minOverall: 54,
        },
        {
          teamName: "Gil Vicente",
          maxOverall: 60,
          minOverall: 54,
        },
        {
          teamName: "Estrela da Amadora",
          maxOverall: 59,
          minOverall: 53,
        },
        {
          teamName: "Farense",
          maxOverall: 57,
          minOverall: 53,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Casa Pia",
          maxOverall: 66,
          minOverall: 60,
        },
        {
          teamName: "Famalicão",
          maxOverall: 64,
          minOverall: 58,
        },
        {
          teamName: "Estoril",
          maxOverall: 63,
          minOverall: 56,
        },
        {
          teamName: "Moreirense",
          maxOverall: 61,
          minOverall: 56,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Vitória de Guimarães",
          maxOverall: 75,
          minOverall: 67,
        },
        {
          teamName: "Rio Ave",
          maxOverall: 71,
          minOverall: 66,
        },
        {
          teamName: "Arouca",
          maxOverall: 70,
          minOverall: 66,
        },
        {
          teamName: "Santa Clara",
          maxOverall: 68,
          minOverall: 62,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Benfica",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Porto",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Sporting",
          maxOverall: 80,
          minOverall: 74,
        },
        {
          teamName: "Braga",
          maxOverall: 78,
          minOverall: 71,
        },
      ],
    },
  ],
};

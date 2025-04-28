import { IContinentalCup } from "../../interfaces/championshipInterfaces";

export const libertadoresCup: IContinentalCup = {
  relatedNationalLeague: ["Brasileirão"],
  cupName: "Libertadores",
  groupStage: {
    phaseName: "Fase de grupos",
    possibleOpponents: [
      {
        teamName: "Bolivar",
        maxOverall: 72,
        minOverall: 66,
        maxScore: 10,
        minScore: 2,
      },
      {
        teamName: "Independiente Del Valle",
        maxOverall: 74,
        minOverall: 68,
        maxScore: 11,
        minScore: 3,
      },
      {
        teamName: "Lanús",
        maxOverall: 75,
        minOverall: 69,
        maxScore: 12,
        minScore: 5,
      },
      {
        teamName: "Racing",
        maxOverall: 77,
        minOverall: 70,
        maxScore: 15,
        minScore: 9,
      },
      {
        teamName: "Universidad Católica",
        maxOverall: 75,
        minOverall: 68,
        maxScore: 10,
        minScore: 4,
      },
      {
        teamName: "Barcelona de Guayaquil",
        maxOverall: 76,
        minOverall: 70,
        maxScore: 11,
        minScore: 8,
      },
      {
        teamName: "LDU Quito",
        maxOverall: 74,
        minOverall: 65,
        maxScore: 10,
        minScore: 4,
      },
      {
        teamName: "Defensor Sporting",
        maxOverall: 70,
        minOverall: 62,
        maxScore: 9,
        minScore: 3,
      },
      {
        teamName: "Deportivo Táchira",
        maxOverall: 69,
        minOverall: 60,
        maxScore: 9,
        minScore: 2,
      },
      {
        teamName: "América de Cali",
        maxOverall: 71,
        minOverall: 60,
        maxScore: 11,
        minScore: 5,
      },
      {
        teamName: "Alianza Lima",
        maxOverall: 72,
        minOverall: 65,
        maxScore: 12,
        minScore: 6,
      },
      {
        teamName: "Junior Barranquilla",
        maxOverall: 73,
        minOverall: 65,
        maxScore: 13,
        minScore: 7,
      },
    ],
  },
  phases: [
    {
      phaseName: "Oitavas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Nacional",
          maxOverall: 77,
          minOverall: 70,
        },
        {
          teamName: "Atlético Nacional",
          maxOverall: 74,
          minOverall: 69,
        },
        {
          teamName: "Estudiantes",
          maxOverall: 79,
          minOverall: 72,
        },
        {
          teamName: "Colo-Colo",
          maxOverall: 77,
          minOverall: 70,
        },
        {
          teamName: "Libertad",
          maxOverall: 76,
          minOverall: 73,
        },
        {
          teamName: "Cerro Porteño",
          maxOverall: 77,
          minOverall: 74,
        },
        {
          teamName: "Olimpia",
          maxOverall: 78,
          minOverall: 75,
        },
        {
          teamName: "Vélez Sársfield",
          maxOverall: 79,
          minOverall: 73,
        },
      ],
    },
    {
      phaseName: "Quartas de final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Boca Juniors",
          maxOverall: 82,
          minOverall: 76,
        },
        {
          teamName: "Peñarol",
          maxOverall: 78,
          minOverall: 73,
        },
        {
          teamName: "Atlético MG",
          maxOverall: 84,
          minOverall: 75,
        },
        {
          teamName: "São Paulo",
          maxOverall: 79,
          minOverall: 70,
        },
      ],
    },
    {
      phaseName: "Semi final",
      numberOfMatches: 2,
      possibleOpponents: [
        {
          teamName: "Botafogo",
          maxOverall: 85,
          minOverall: 77,
        },
        {
          teamName: "Internacional",
          maxOverall: 81,
          minOverall: 75,
        },
        {
          teamName: "River Plate",
          maxOverall: 83,
          minOverall: 78,
        },
        {
          teamName: "Corinthians",
          maxOverall: 80,
          minOverall: 70,
        },
      ],
    },
    {
      phaseName: "Final",
      numberOfMatches: 1,
      possibleOpponents: [
        {
          teamName: "Flamengo",
          maxOverall: 87,
          minOverall: 78,
        },
        {
          teamName: "Palmeiras",
          maxOverall: 84,
          minOverall: 77,
        },
        {
          teamName: "Fluminense",
          maxOverall: 79,
          minOverall: 74,
        },
        {
          teamName: "Grêmio",
          maxOverall: 79,
          minOverall: 74,
        },
      ],
    },
  ],
};

import { getRandomNumber } from "../utils/getRandomNumber";

import {
  ITeam,
  ITeamsOverall,
  ISeasonMatches,
  ILeagueScore,
  INationalCup,
  IContinentalCup,
} from "../interfaces/championshipInterfaces";

export class Championship {
  getPlayerTeamOverall(teamsList: ITeam[], playerTeamName: string): ITeam[] {
    const playerTeam = teamsList.filter((team) => {
      return team.teamName === playerTeamName;
    });

    return playerTeam;
  }

  getTeamsOverall(teamsList: ITeam[]): ITeamsOverall[] {
    const teamsOverall = teamsList.map((team) => {
      return {
        teamName: team.teamName,
        teamOverallOnSeason: getRandomNumber(team.maxOverall, team.minOverall),
      };
    });

    return teamsOverall;
  }

  getSeasonMatches(
    teamsOverall: {
      teamName: string;
      teamOverallOnSeason: number;
    }[],
    playerTeamName: string,
    playerTeamOverall: number
  ): ISeasonMatches[] {
    const opposingTeams = teamsOverall.filter((team) => {
      return team.teamName != playerTeamName;
    });

    const seasonMatches = opposingTeams.map((team) => {
      return {
        opposingTeamName: team.teamName,
        opposingTeamOverall: team.teamOverallOnSeason,
        playerTeamName: playerTeamName,
        playerTeamOverall: playerTeamOverall,
      };
    });

    for (let i = 0; i < 19; i++) {
      seasonMatches.push({
        opposingTeamName: seasonMatches[i].opposingTeamName,
        opposingTeamOverall: seasonMatches[i].opposingTeamOverall,
        playerTeamName: seasonMatches[i].playerTeamName,
        playerTeamOverall: seasonMatches[i].playerTeamOverall,
      });
    }

    return seasonMatches;
  }

  getLeagueScore(
    teamsList: ITeam[],
    playerTeamName: string,
    playerTeamScore: number
  ): ILeagueScore[] {
    const opposingTeams = teamsList.filter((team) => {
      return team.teamName != playerTeamName;
    });

    const teamsScore = opposingTeams.map((team) => {
      return {
        teamName: team.teamName,
        teamScore: getRandomNumber(team.maxScore, team.minScore),
      };
    });

    teamsScore.push({
      teamName: playerTeamName,
      teamScore: playerTeamScore,
    });

    return teamsScore.sort((a, b) => {
      return b.teamScore - a.teamScore;
    });
  }

  getNationalCup(playerTeamLeague: string, nationalCups: INationalCup[]) {
    const nationalCup = nationalCups.filter((nationalCup) => {
      return nationalCup.relatedNationalLeague === playerTeamLeague;
    });

    return nationalCup;
  }

  getNationalCupFiltered(nationalCup: INationalCup, playerTeamName: string) {
    const nationalCupFiltered = {
      ...nationalCup,
      phases: nationalCup.phases.map((phase) => ({
        ...phase,
        possibleOpponents: phase.possibleOpponents.filter(
          (team) => team.teamName !== playerTeamName
        ),
      })),
    };

    return nationalCupFiltered;
  }

  getNationalCupsMatches(
    nationalCup: INationalCup,
    playerTeam: { playerTeamName: string; playerTeamOverall: number }
  ) {
    const roundOf16Index = getRandomNumber(
      nationalCup.phases[0].possibleOpponents.length - 1,
      0
    );
    const quarterFinalsIndex = getRandomNumber(
      nationalCup.phases[1].possibleOpponents.length - 1,
      0
    );
    const semiFinalIndex = getRandomNumber(
      nationalCup.phases[2].possibleOpponents.length - 1,
      0
    );
    const finalIndex = getRandomNumber(
      nationalCup.phases[3].possibleOpponents.length - 1,
      0
    );

    const roundOf16 = nationalCup.phases[0].possibleOpponents[roundOf16Index];
    const quarterFinals =
      nationalCup.phases[1].possibleOpponents[quarterFinalsIndex];
    const semiFinal = nationalCup.phases[2].possibleOpponents[semiFinalIndex];
    const final = nationalCup.phases[3].possibleOpponents[finalIndex];

    return {
      roundOf16: {
        phase: "Oitavas de final",
        opposingTeamName: roundOf16.teamName,
        opposingTeamOverall: getRandomNumber(
          roundOf16.maxOverall,
          roundOf16.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
      quarterFinals: {
        phase: "Quartas de final",
        opposingTeamName: quarterFinals.teamName,
        opposingTeamOverall: getRandomNumber(
          quarterFinals.maxOverall,
          quarterFinals.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
      semiFinal: {
        phase: "Semi final",
        opposingTeamName: semiFinal.teamName,
        opposingTeamOverall: getRandomNumber(
          semiFinal.maxOverall,
          semiFinal.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
      final: {
        phase: "Final",
        opposingTeamName: final.teamName,
        opposingTeamOverall: getRandomNumber(
          final.maxOverall,
          final.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
    };
  }

  getContinentalCup(
    playerTeamLeague: string,
    continentalCups: IContinentalCup[]
  ) {
    const continentalCup = continentalCups.find((continentalCup) => {
      return continentalCup.relatedNationalLeague.includes(playerTeamLeague);
    });

    return continentalCup;
  }

  getContinentalCupFiltered(
    continentalCup: IContinentalCup,
    playerTeamName: string
  ) {
    const continentalCupFiltered = {
      ...continentalCup,
      groupStage: {
        ...continentalCup.groupStage,
        possibleOpponents: continentalCup.groupStage.possibleOpponents.filter(
          (team) => team.teamName !== playerTeamName
        ),
      },
      phases: continentalCup.phases.map((phase) => ({
        ...phase,
        possibleOpponents: phase.possibleOpponents.filter(
          (team) => team.teamName !== playerTeamName
        ),
      })),
    };

    return continentalCupFiltered;
  }

  getThreeGroupStageOpponents(continentalCup: IContinentalCup) {
    const opponents = [...continentalCup.groupStage.possibleOpponents];
    const selectedOpponents: typeof opponents = [];

    while (selectedOpponents.length < 3 && opponents.length > 0) {
      const randomIndex = getRandomNumber(opponents.length - 1, 0);
      const opponent = opponents[randomIndex];

      selectedOpponents.push(opponent);
      opponents.splice(randomIndex, 1);
    }

    return selectedOpponents;
  }

  getGroupStageMatches(
    threeGroupStageOpponents: {
      teamName: string;
      maxOverall: number;
      minOverall: number;
      maxScore: number;
      minScore: number;
    }[],
    playerTeamName: string,
    playerTeamOverall: number
  ) {
    const groupStageMatches = [];

    for (let i = 0; i <= 5; i++) {
      if (i === 1 || i === 2) {
        groupStageMatches.push({
          opposingTeamName: threeGroupStageOpponents[0].teamName,
          opposingTeamOverall: getRandomNumber(
            threeGroupStageOpponents[0].maxOverall,
            threeGroupStageOpponents[0].minOverall
          ),
          playerTeamName,
          playerTeamOverall,
        });
      }

      if (i === 2 || i === 3) {
        groupStageMatches.push({
          opposingTeamName: threeGroupStageOpponents[1].teamName,
          opposingTeamOverall: getRandomNumber(
            threeGroupStageOpponents[1].maxOverall,
            threeGroupStageOpponents[1].minOverall
          ),
          playerTeamName,
          playerTeamOverall,
        });
      }

      if (i === 4 || i === 5) {
        groupStageMatches.push({
          opposingTeamName: threeGroupStageOpponents[2].teamName,
          opposingTeamOverall: getRandomNumber(
            threeGroupStageOpponents[2].maxOverall,
            threeGroupStageOpponents[2].minOverall
          ),
          playerTeamName,
          playerTeamOverall,
        });
      }
    }

    return groupStageMatches;
  }

  getContinentalCupMatches(
    continentalCup: IContinentalCup,
    playerTeam: { playerTeamName: string; playerTeamOverall: number }
  ) {
    const roundOf16Index = getRandomNumber(
      continentalCup.phases[0].possibleOpponents.length - 1,
      0
    );
    const quarterFinalsIndex = getRandomNumber(
      continentalCup.phases[1].possibleOpponents.length - 1,
      0
    );
    const semiFinalIndex = getRandomNumber(
      continentalCup.phases[2].possibleOpponents.length - 1,
      0
    );
    const finalIndex = getRandomNumber(
      continentalCup.phases[3].possibleOpponents.length - 1,
      0
    );

    const roundOf16 =
      continentalCup.phases[0].possibleOpponents[roundOf16Index];
    const quarterFinals =
      continentalCup.phases[1].possibleOpponents[quarterFinalsIndex];
    const semiFinal =
      continentalCup.phases[2].possibleOpponents[semiFinalIndex];
    const final = continentalCup.phases[3].possibleOpponents[finalIndex];

    return {
      roundOf16: {
        phase: "Oitavas de final",
        opposingTeamName: roundOf16.teamName,
        opposingTeamOverall: getRandomNumber(
          roundOf16.maxOverall,
          roundOf16.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
      quarterFinals: {
        phase: "Quartas de final",
        opposingTeamName: quarterFinals.teamName,
        opposingTeamOverall: getRandomNumber(
          quarterFinals.maxOverall,
          quarterFinals.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
      semiFinal: {
        phase: "Semi final",
        opposingTeamName: semiFinal.teamName,
        opposingTeamOverall: getRandomNumber(
          semiFinal.maxOverall,
          semiFinal.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
      final: {
        phase: "Final",
        opposingTeamName: final.teamName,
        opposingTeamOverall: getRandomNumber(
          final.maxOverall,
          final.minOverall
        ),
        playerTeamName: playerTeam.playerTeamName,
        playerTeamOverall: playerTeam.playerTeamOverall,
      },
    };
  }
}

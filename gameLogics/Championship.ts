import { getRandomNumber } from "../utils/getRandomNumber";

import {
  ITeam,
  ITeamsOverall,
  ISeasonMatches,
  ILeagueScore,
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
}

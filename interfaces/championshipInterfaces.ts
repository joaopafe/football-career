export interface ITeam {
  teamName: string;
  teamOverall: number;
  maxOverall: number;
  minOverall: number;
  maxScore: number;
  minScore: number;
}

export interface IChampionship {
  championshipName: string;
  teams: ITeam[];
}

export interface ITeamsOverall {
  teamName: string;
  teamOverallOnSeason: number;
}

export interface ISeasonMatches {
  opposingTeamName: string;
  opposingTeamOverall: number;
  playerTeamName: string;
  playerTeamOverall: number;
}

export interface ILeagueScore {
  teamName: string;
  teamScore: number;
}

export interface INationalCup {
  relatedNationalLeague: string;
  cupName: string;
  phases: {
    phaseName: string;
    numberOfMatches: number;
    possibleOpponents: {
      teamName: string;
      maxOverall: number;
      minOverall: number;
    }[];
  }[];
}

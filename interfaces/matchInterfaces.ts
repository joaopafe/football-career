export interface IPossibleGoals {
  playerTeamPossibleGoals: number[];
  opposingTeamPossibleGoals: number[];
}

export interface IGoalsOnTheMatch {
  playerTeamGoals: number;
  opposingTeamGoals: number;
}

export interface ISuccessfulProbability {
  disarmingProbability: number;
  passProbability: number;
  finishingProbability: number;
  goalProbability: number;
}

export interface IPlayerPerformance {
  successfulDisarms: number;
  successfulPass: number;
  successfulFinishing: number;
  successfulAssists: number;
  successfulGoals: number;
  unsuccessfulDisarms: number;
  unsuccessfulPass: number;
  unsuccessfulFinishing: number;
  matchGrade: number;
}

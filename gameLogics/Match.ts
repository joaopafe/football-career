import { getRandomNumber } from "../utils/getRandomNumber";
import { getProbabilityResult } from "../utils/getProbabiltyResult";

import {
  IPossibleGoals,
  IGoalsOnTheMatch,
  ISuccessfulProbability,
  IPlayerPerformance,
} from "../interfaces/matchInterfaces";

export class Match {
  getPossibleGoals = (ratioBetweenOverall: number): IPossibleGoals => {
    let playerTeamPossibleGoals: number[] = [];
    let opposingTeamPossibleGoals: number[] = [];

    if (ratioBetweenOverall <= 0.7) {
      playerTeamPossibleGoals = [0, 1];
      opposingTeamPossibleGoals = [2, 3, 4];
    }

    if (ratioBetweenOverall > 0.7 && ratioBetweenOverall <= 0.8) {
      playerTeamPossibleGoals = [0, 1];
      opposingTeamPossibleGoals = [1, 2, 3];
    }

    if (ratioBetweenOverall > 0.8 && ratioBetweenOverall <= 0.9) {
      playerTeamPossibleGoals = [0, 1, 2];
      opposingTeamPossibleGoals = [0, 1, 2, 3];
    }

    if (ratioBetweenOverall > 0.9 && ratioBetweenOverall <= 1) {
      playerTeamPossibleGoals = [0, 1, 2];
      opposingTeamPossibleGoals = [0, 1, 2];
    }

    if (ratioBetweenOverall > 1 && ratioBetweenOverall <= 1.1) {
      playerTeamPossibleGoals = [0, 1, 2];
      opposingTeamPossibleGoals = [0, 1, 2];
    }

    if (ratioBetweenOverall > 1.1 && ratioBetweenOverall <= 1.2) {
      playerTeamPossibleGoals = [0, 1, 2];
      opposingTeamPossibleGoals = [0, 1, 2];
    }

    if (ratioBetweenOverall > 1.2 && ratioBetweenOverall <= 1.3) {
      playerTeamPossibleGoals = [0, 1, 2];
      opposingTeamPossibleGoals = [0, 1];
    }

    if (ratioBetweenOverall > 1.3) {
      playerTeamPossibleGoals = [1, 2];
      opposingTeamPossibleGoals = [0, 1];
    }

    return {
      playerTeamPossibleGoals: playerTeamPossibleGoals,
      opposingTeamPossibleGoals: opposingTeamPossibleGoals,
    };
  };

  getGoalsOfTheMatch(
    playerTeamOverall: number,
    opposingTeamOverall: number
  ): IGoalsOnTheMatch {
    const ratioBetweenOverall = playerTeamOverall / opposingTeamOverall;

    const possibleGoals = this.getPossibleGoals(ratioBetweenOverall);

    const playerTeamPossibleGoals = possibleGoals.playerTeamPossibleGoals;
    const opposingTeamPossibleGoals = possibleGoals.opposingTeamPossibleGoals;

    const playerTeamGoals =
      playerTeamPossibleGoals[
        getRandomNumber(playerTeamPossibleGoals.length - 1, 0)
      ];
    const opposingTeamGoals =
      opposingTeamPossibleGoals[
        getRandomNumber(opposingTeamPossibleGoals.length - 1, 0)
      ];

    return {
      playerTeamGoals: playerTeamGoals,
      opposingTeamGoals: opposingTeamGoals,
    };
  }

  getMatchGrade = (
    succesfulDisarming: number,
    succesfulPass: number,
    succesfulFinishing: number,
    succesfulAssists: number,
    succesfulGoals: number,
    unsuccesfulDisarming: number,
    unsuccesfulPass: number,
    unsuccesfulFinishing: number
  ): number => {
    const addedGrade =
      succesfulDisarming * 0.2 +
      succesfulPass * 0.05 +
      succesfulFinishing * 0.5 +
      succesfulAssists * 2 +
      succesfulGoals * 3;

    const subtractedGrade =
      unsuccesfulDisarming * 0.15 +
      unsuccesfulPass * 0.1 +
      unsuccesfulFinishing * 0.1;

    let matchGrade = 6 + addedGrade - subtractedGrade;

    if (matchGrade > 10) matchGrade = 10;
    if (matchGrade < 0) matchGrade = 0;

    return matchGrade;
  };

  getSuccessfulProbability = (
    playerPosition: "Zagueiro" | "Meia" | "Atacante",
    playerOverall: number
  ): ISuccessfulProbability => {
    if (playerPosition === "Zagueiro") {
      return {
        disarmingProbability: playerOverall * 0.7,
        passProbability: playerOverall * 0.85,
        finishingProbability: playerOverall * 0.2,
        goalProbability: playerOverall * 0.3,
      };
    }

    if (playerPosition === "Meia") {
      return {
        disarmingProbability: playerOverall * 0.5,
        passProbability: playerOverall * 0.9,
        finishingProbability: playerOverall * 0.3,
        goalProbability: playerOverall * 0.4,
      };
    }

    return {
      disarmingProbability: playerOverall * 0.2,
      passProbability: playerOverall * 0.8,
      finishingProbability: playerOverall * 0.5,
      goalProbability: playerOverall * 0.5,
    };
  };

  getPlayerPerformance = (
    disarmingAttempts: number,
    passAttempts: number,
    finishingAttempts: number,
    playerOverall: number,
    playerPosition: "Zagueiro" | "Meia" | "Atacante"
  ): IPlayerPerformance => {
    const successfulProbability = this.getSuccessfulProbability(
      playerPosition,
      playerOverall
    );

    const successfulDisarms = getProbabilityResult(
      disarmingAttempts,
      successfulProbability.disarmingProbability
    );
    const successfulPass = getProbabilityResult(
      passAttempts,
      successfulProbability.passProbability
    );
    const successfulFinishing = getProbabilityResult(
      finishingAttempts,
      successfulProbability.finishingProbability
    );
    const successfulAssists = Math.floor(successfulPass / 40);
    const successfulGoals = getProbabilityResult(
      successfulFinishing,
      successfulProbability.goalProbability
    );

    const unsuccessfulDisarms =
      disarmingAttempts - successfulDisarms > 0
        ? disarmingAttempts - successfulDisarms
        : (disarmingAttempts - successfulDisarms) * -1;
    const unsuccessfulPass =
      passAttempts - successfulPass > 0
        ? passAttempts - successfulPass
        : (passAttempts - successfulPass) * -1;
    const unsuccessfulFinishing =
      finishingAttempts - successfulFinishing > 0
        ? finishingAttempts - successfulFinishing
        : (finishingAttempts - successfulFinishing) * -1;

    const matchGrade = this.getMatchGrade(
      successfulDisarms,
      successfulPass,
      successfulFinishing,
      successfulAssists,
      successfulGoals,
      unsuccessfulDisarms,
      unsuccessfulPass,
      unsuccessfulFinishing
    );

    return {
      successfulDisarms: successfulDisarms,
      successfulPass: successfulPass,
      successfulFinishing: successfulFinishing,
      successfulAssists: successfulAssists,
      successfulGoals: successfulGoals,
      unsuccessfulDisarms: unsuccessfulDisarms,
      unsuccessfulPass: unsuccessfulPass,
      unsuccessfulFinishing: unsuccessfulFinishing,
      matchGrade: matchGrade,
    };
  };
}

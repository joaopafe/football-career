import { getRandomNumber } from "..//utils/getRandomNumber";
import { getProbabilityResult } from "../utils/getProbabiltyResult";

import { ITeam } from "../interfaces/championshipInterfaces";
import { IOpportunitiesPerSeason } from "../interfaces/playerInterface";
import { IChampionship } from "../interfaces/championshipInterfaces";

import { overallEvolution } from "../data/player/overallEvolution";

export class Player {
  getAdditionalOpportunities(playerOverall: number): number {
    if (playerOverall > 50 && playerOverall <= 60) return 1;

    if (playerOverall > 60 && playerOverall <= 70) return 1.05;

    if (playerOverall > 70 && playerOverall <= 80) return 1.1;

    if (playerOverall > 80 && playerOverall <= 90) return 1.15;

    return 1.2;
  }

  getOpportunitiesPerSeason(
    playerPosition: "Zagueiro" | "Meia" | "Atacante",
    additionalOpportunities: number
  ): IOpportunitiesPerSeason {
    const opportunitiesPerSeason = {
      disarmingOpportunities: 0,
      passOpportunities: 0,
      finishingOpportunities: 0,
    };

    if (playerPosition === "Zagueiro") {
      opportunitiesPerSeason.disarmingOpportunities =
        getRandomNumber(650, 610) + additionalOpportunities;
      opportunitiesPerSeason.passOpportunities =
        getRandomNumber(1770, 1590) + additionalOpportunities;
      opportunitiesPerSeason.finishingOpportunities =
        getRandomNumber(44, 38) + additionalOpportunities;
    }

    if (playerPosition === "Meia") {
      opportunitiesPerSeason.disarmingOpportunities =
        getRandomNumber(350, 320) + additionalOpportunities;
      opportunitiesPerSeason.passOpportunities =
        getRandomNumber(2650, 2400) + additionalOpportunities;
      opportunitiesPerSeason.finishingOpportunities =
        getRandomNumber(132, 90) + additionalOpportunities;
    }

    if (playerPosition === "Atacante") {
      opportunitiesPerSeason.disarmingOpportunities =
        getRandomNumber(88, 80) + additionalOpportunities;
      opportunitiesPerSeason.passOpportunities =
        getRandomNumber(1320, 1200) + additionalOpportunities;
      opportunitiesPerSeason.finishingOpportunities =
        getRandomNumber(176, 160) + additionalOpportunities;
    }

    return opportunitiesPerSeason;
  }

  getInjuryProbability(playerAge: number): 5 | 10 | 15 | 20 | 25 | 30 | 35 {
    if (playerAge >= 17 || playerAge <= 20) return 5;

    if (playerAge >= 21 || playerAge <= 25) return 10;

    if (playerAge >= 26 || playerAge <= 30) return 15;

    if (playerAge >= 31 || playerAge <= 35) return 20;

    if (playerAge === 36 || playerAge === 37) return 25;

    if (playerAge === 38 || playerAge == 39) return 30;

    return 35;
  }

  getIfPlayerIsInjured(
    injuryProbability: 5 | 10 | 15 | 20 | 25 | 30 | 35
  ): boolean {
    const probabilityResult = getProbabilityResult(1, injuryProbability);

    const playerIsInjured = probabilityResult === 1 ? true : false;

    return playerIsInjured;
  }

  getAdditionOverallPerGrade(seasonGrade: number) {
    if (seasonGrade > 0 && seasonGrade <= 5) return 0;

    if (seasonGrade > 5 && seasonGrade <= 6) return 1;

    if (seasonGrade > 6 && seasonGrade <= 6.5) return 2;

    if (seasonGrade > 6.5 && seasonGrade <= 7) return 4;

    if (seasonGrade > 7 && seasonGrade <= 7.5) return 5;

    if (seasonGrade > 7.5 && seasonGrade <= 8) return 6;

    if (seasonGrade > 8 && seasonGrade <= 8.5) return 8;

    if (seasonGrade > 8.5 && seasonGrade <= 9) return 9;

    return 10;
  }

  getPlayerOverall = (age: number, additionPerGrade: number) => {
    const overallRangePlayer = overallEvolution.filter((overallRange) => {
      return overallRange.age === age;
    });

    const playerOverall =
      getRandomNumber(
        overallRangePlayer[0].maximunOverall,
        overallRangePlayer[0].minimunOverall
      ) + additionPerGrade;

    return playerOverall;
  };

  getPossibleLeagues(nationalLeagues: IChampionship[]): IChampionship[] {
    let leagueOneIndex = getRandomNumber(nationalLeagues.length - 1, 0);
    let leagueTwoIndex = getRandomNumber(nationalLeagues.length - 1, 0);
    let leagueThreeIndex = getRandomNumber(nationalLeagues.length - 1, 0);

    while (leagueTwoIndex === leagueOneIndex) {
      leagueTwoIndex = getRandomNumber(nationalLeagues.length - 1, 0);
    }

    while (
      leagueThreeIndex === leagueTwoIndex ||
      leagueThreeIndex === leagueOneIndex
    ) {
      leagueThreeIndex = getRandomNumber(nationalLeagues.length - 1, 0);
    }

    return [
      nationalLeagues[leagueOneIndex],
      nationalLeagues[leagueTwoIndex],
      nationalLeagues[leagueThreeIndex],
    ];
  }

  getPossibleContracts = (
    playerOverall: number,
    teamsList: ITeam[]
  ): ITeam[] => {
    const possibleContracts = teamsList.filter((team) => {
      return team.teamOverall <= playerOverall + 5;
    });

    return possibleContracts;
  };

  getContract(possibleContracts: ITeam[]): ITeam {
    const contract =
      possibleContracts[getRandomNumber(possibleContracts.length - 1, 0)];

    return contract;
  }

  getSeasonGrade(gradesOnSeason: number[]) {
    let seasonGrade = 0;

    for (const grade of gradesOnSeason) {
      seasonGrade += grade;
    }

    seasonGrade = parseFloat((seasonGrade / gradesOnSeason.length).toFixed(2));

    return seasonGrade;
  }
}

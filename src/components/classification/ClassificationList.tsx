import { FunctionComponent } from "react";

import { TeamClassification } from "./TeamClassification";

import { ILeagueScore } from "../../../interfaces/championshipInterfaces";

interface ClassificationListProps {
  leagueScore: ILeagueScore[];
}

export const ClassificationList: FunctionComponent<ClassificationListProps> = ({
  leagueScore,
}) => {
  const classification = leagueScore.map((team, index) => {
    return (
      <TeamClassification
        teamClassification={index + 1}
        teamName={team.teamName}
        teamScore={team.teamScore}
        key={index}
      />
    );
  });

  return classification;
};

import { FunctionComponent } from "react";

interface TeamClassificationProps {
  teamClassification: number;
  teamName: string;
  teamScore: number;
}

export const TeamClassification: FunctionComponent<TeamClassificationProps> = ({
  teamClassification,
  teamName,
  teamScore,
}) => {
  return (
    <div className="team-classification">
      <div className="team-placing">{teamClassification}º</div>
      <div className="team-name">{teamName}</div>
      <div className="team-final-score">{teamScore}</div>
    </div>
  );
};

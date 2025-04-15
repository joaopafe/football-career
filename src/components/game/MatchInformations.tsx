import { FunctionComponent } from "react";

interface MatchInformationsProps {
  playerTeamName: string;
  playerTeamGoals: string;
  opposingTeamName: string;
  opposingTeamGoals: string;
}

export const MatchInformations: FunctionComponent<MatchInformationsProps> = ({
  playerTeamName,
  playerTeamGoals,
  opposingTeamName,
  opposingTeamGoals,
}) => {
  const renderGoals = (goals: string) => {
    return goals === "" ? "?" : goals;
  };

  return (
    <>
      <div className="player-team">
        <div className="player-team-name">{playerTeamName}</div>
        <div className="team-goals">{renderGoals(playerTeamGoals)}</div>
      </div>

      <div className="versus-icon">VS</div>

      <div className="opposing-team">
        <div className="team-goals">{renderGoals(opposingTeamGoals)}</div>
        <div className="opposing-team-name">{opposingTeamName}</div>
      </div>
    </>
  );
};

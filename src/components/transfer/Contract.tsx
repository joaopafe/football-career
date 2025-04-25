import { FunctionComponent } from "react";

interface ContractProps {
  teamName: string;
  selectPlayerTeam: (playerTeamName: string) => void;
}

export const Contract: FunctionComponent<ContractProps> = ({
  teamName,
  selectPlayerTeam,
}) => {
  return (
    <button onClick={() => selectPlayerTeam(teamName)} className="contract">
      {teamName}
    </button>
  );
};

import { FunctionComponent } from "react";

interface PlayerStatsProps {
  buttonName: string;
  buttonCollor: string;
  idName: string;
}

export const PlayerStats: FunctionComponent<PlayerStatsProps> = ({
  buttonName,
  buttonCollor,
  idName,
}) => {
  return (
    <button
      style={{ backgroundColor: `#${buttonCollor}` }}
      id={idName}
      className="stats"
    >
      {buttonName}
    </button>
  );
};

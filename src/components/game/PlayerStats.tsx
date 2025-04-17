import { FunctionComponent } from "react";

interface PlayerStatsProps {
  buttonName: string;
  buttonCollor: string;
  idName: string;
  statsModal: "season" | "career";
  openStats: (statsModal: "season" | "career") => void;
}

export const PlayerStats: FunctionComponent<PlayerStatsProps> = ({
  buttonName,
  buttonCollor,
  idName,
  statsModal,
  openStats,
}) => {
  return (
    <button
      style={{ backgroundColor: `#${buttonCollor}` }}
      id={idName}
      className="stats"
      onClick={() => openStats(statsModal)}
    >
      {buttonName}
    </button>
  );
};

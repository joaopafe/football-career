import { FunctionComponent } from "react";

interface InformationsModalProps {
  showModal: boolean;
  modalName: string;
  goalsScored: number;
  assistsScored: number;
  matchesPlayed: number;
  avarageGrade?: number;
  teamScore?: number;
  statsModal: "season" | "career";
  closeStats: (statsModal: "season" | "career") => void;
}

export const InformationsModal: FunctionComponent<InformationsModalProps> = ({
  showModal,
  modalName,
  goalsScored,
  assistsScored,
  matchesPlayed,
  avarageGrade,
  teamScore,
  statsModal,
  closeStats,
}) => {
  if (showModal) {
    return (
      <div className="modal-background">
        <div className="informations-modal">
          <div className="modal-name">{modalName}</div>

          <div className="modal-stats">
            <div className="goals-scored">Gols marcados: {goalsScored}</div>
            <div className="assists-scored">
              Assistências realizadas: {assistsScored}
            </div>
            <div className="matches-played">
              Partidas jogadas: {matchesPlayed}
            </div>
          </div>

          {avarageGrade === undefined ? null : (
            <div className="avarage-grade">Nota média: {avarageGrade}</div>
          )}

          {teamScore === undefined ? null : (
            <div className="team-score">Pontuação do time: {teamScore}</div>
          )}

          <div className="confirmation">
            <button
              onClick={() => closeStats(statsModal)}
              className="confirmation-button"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

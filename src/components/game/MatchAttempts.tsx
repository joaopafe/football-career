import { FunctionComponent } from "react";

interface MatchAttemptsProps {
  attemptName: string;
  idName: string;
}

export const MatchAttempts: FunctionComponent<MatchAttemptsProps> = ({
  attemptName,
  idName,
}) => {
  return (
    <div id={idName} className="match-attempt">
      <div className="attempt-name">{attemptName}</div>
      <input className="attempt-quantity" type="number" />
    </div>
  );
};

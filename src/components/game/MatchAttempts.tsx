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
    <div className="match-attempt">
      <div className="attempt-name">{attemptName}</div>
      <input
        defaultValue={0}
        id={idName}
        className="attempt-quantity"
        type="number"
      />
    </div>
  );
};

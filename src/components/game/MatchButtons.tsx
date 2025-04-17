import { FunctionComponent } from "react";

interface MatchButtonProps {
  buttonValue: string;
  buttonColor: string;
  idName: string;
  matchAction?: () => void;
}

export const MatchButton: FunctionComponent<MatchButtonProps> = ({
  buttonValue,
  buttonColor,
  idName,
  matchAction,
}) => {
  return (
    <button
      style={{ backgroundColor: `#${buttonColor}` }}
      id={idName}
      className="match-button"
      onClick={matchAction}
    >
      {buttonValue}
    </button>
  );
};

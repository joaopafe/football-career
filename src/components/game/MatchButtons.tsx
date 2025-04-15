import { FunctionComponent } from "react";

interface MatchButtonProps {
  buttonValue: string;
  buttonColor: string;
  idName: string;
}

export const MatchButton: FunctionComponent<MatchButtonProps> = ({
  buttonValue,
  buttonColor,
  idName,
}) => {
  return (
    <button
      style={{ backgroundColor: `#${buttonColor}` }}
      id={idName}
      className="match-button"
    >
      {buttonValue}
    </button>
  );
};

import { FunctionComponent } from "react";

interface PlayerInformationProps {
  name: string;
  idName: string;
}

export const PlayerInformation: FunctionComponent<PlayerInformationProps> = ({
  name,
  idName,
}) => {
  return (
    <div id={idName} className="player-information">
      <div>{name}</div>
    </div>
  );
};

import { FunctionComponent } from "react";

interface SeasonInformationProps {
  name: string;
  idName: string;
}

export const SeasonInformation: FunctionComponent<SeasonInformationProps> = ({
  name,
  idName,
}) => {
  return (
    <div id={idName} className="season-information">
      {name}
    </div>
  );
};

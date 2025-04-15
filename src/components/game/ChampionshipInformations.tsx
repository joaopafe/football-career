import { FunctionComponent } from "react";

interface ChampionshipInformationsProps {
  fieldName: string;
  fieldValue: string;
  idName: string;
}

export const ChampionshipInformations: FunctionComponent<
  ChampionshipInformationsProps
> = ({ fieldName, fieldValue, idName }) => {
  return (
    <div className="championship-information">
      <div id={idName} className="field-title">
        {fieldName}
      </div>
      <div className="field-value">{fieldValue}</div>
    </div>
  );
};

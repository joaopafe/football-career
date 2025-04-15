import { FunctionComponent } from "react";

interface SeasonOpportunitiesProps {
  oppotunityName: string;
  opportunitiesQuantity: number;
  idName: string;
}

export const SeasonOpportunities: FunctionComponent<
  SeasonOpportunitiesProps
> = ({ oppotunityName, opportunitiesQuantity, idName }) => {
  return (
    <div id={idName} className="opportunity">
      <div className="opportunity-title">{oppotunityName}</div>
      <div className="opportunities-quantity">{opportunitiesQuantity}</div>
    </div>
  );
};

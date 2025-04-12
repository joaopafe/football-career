import { FunctionComponent } from "react";
import { ITeam } from "../../../interfaces/championshipInterfaces";

interface firstContract {
  team: string;
  getFirstContract: () => ITeam | undefined;
}

export const FirstContract: FunctionComponent<firstContract> = ({
  team,
  getFirstContract,
}) => {
  return (
    <div className="first-contract-section">
      <button className="get-first-contract-button" onClick={getFirstContract}>
        Gerar o primeiro contrato
      </button>

      <div className="first-contract">{team === "" ? "?" : team}</div>
    </div>
  );
};

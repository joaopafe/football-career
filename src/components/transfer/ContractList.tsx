import { FunctionComponent } from "react";

import { Contract } from "./Contract";

import { ITeam } from "../../../interfaces/championshipInterfaces";

interface ContractListProps {
  firstContract: ITeam;
  secondContract: ITeam;
  thirdContract: ITeam;
  currentContract?: ITeam | null;
  selectPlayerTeam: (playerTeamName: string) => void;
}

export const ContractList: FunctionComponent<ContractListProps> = ({
  firstContract,
  secondContract,
  thirdContract,
  currentContract,
  selectPlayerTeam,
}) => {
  const contracts = [firstContract, secondContract, thirdContract];

  if (currentContract != null) contracts.push(currentContract);

  const contractsComponents = contracts.map((contract, index) => {
    return (
      <Contract
        selectPlayerTeam={selectPlayerTeam}
        teamName={contract.teamName}
        key={index}
      />
    );
  });

  return <div className="contract-list">{contractsComponents}</div>;
};

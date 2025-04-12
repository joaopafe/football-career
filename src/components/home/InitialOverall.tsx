import { FunctionComponent } from "react";

interface initialOverall {
  initialOverall: number;
  getInitialOverall: (age: number, additionPerGrade: number) => number;
}

export const InitialOVerall: FunctionComponent<initialOverall> = ({
  initialOverall,
  getInitialOverall,
}) => {
  return (
    <div className="initial-overall-section">
      <button
        className="get-initial-overall-button"
        onClick={() => getInitialOverall(17, 0)}
      >
        Gerar overall inicial
      </button>

      <div className="initial-overall">
        {initialOverall === 0 ? "?" : initialOverall}
      </div>
    </div>
  );
};

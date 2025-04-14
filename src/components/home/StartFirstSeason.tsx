import { FunctionComponent, useState, useEffect } from "react";

interface StartFirstSeason {
  generatePlayer: () => void;
}

export const StartFirstSeason: FunctionComponent<StartFirstSeason> = ({
  generatePlayer,
}) => {
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const nameInputElement = document.querySelector(
      ".player-name-input"
    ) as HTMLInputElement | null;
    const initialOverallElement = document.querySelector(
      ".player-name-input"
    ) as HTMLElement | null;
    const firstContractElement = document.querySelector(
      ".first-contract"
    ) as HTMLElement | null;

    const getButtonIsDisabled = (): boolean => {
      const inputsAreNull =
        nameInputElement === null ||
        initialOverallElement === null ||
        firstContractElement === null;

      if (!inputsAreNull) {
        return (
          nameInputElement.value === "" ||
          initialOverallElement.innerText === "?" ||
          firstContractElement.innerText === "?"
        );
      }

      return true;
    };

    const overallObserver = new MutationObserver(() => {
      setButtonIsDisabled(getButtonIsDisabled());
    });

    const inputListener = () => {
      setButtonIsDisabled(getButtonIsDisabled());
    };

    if (nameInputElement) {
      nameInputElement.addEventListener("input", inputListener);
    }

    if (initialOverallElement) {
      overallObserver.observe(initialOverallElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    if (firstContractElement) {
      overallObserver.observe(firstContractElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    return () => {
      if (nameInputElement) {
        nameInputElement.removeEventListener("input", inputListener);
      }
      overallObserver.disconnect();
    };
  }, []);

  return (
    <div className="start-first-season-section">
      <button
        disabled={buttonIsDisabled}
        onClick={generatePlayer}
        className="start-first-season-button"
      >
        Iniciar a primeira temporada
      </button>
    </div>
  );
};

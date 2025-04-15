import { PlayerInformation } from "../components/game/PlayerInformations";
import { SeasonInformation } from "../components/game/SeasonInformation";
import { PlayerStats } from "../components/game/PlayerStats";
import { SeasonOpportunities } from "../components/game/SeasonOpportunities";
import { ChampionshipInformations } from "../components/game/ChampionshipInformations";
import { MatchAttempts } from "../components/game/MatchAttempts";
import { MatchInformations } from "../components/game/MatchInformations";
import { MatchButton } from "../components/game/MatchButtons";

import "../style/reset.css";
import "../style/Game.css";

export const Game = () => {
  return (
    <div className="game">
      <div className="player-information-section">
        <div className="player-information">
          <PlayerInformation idName="player-name" name="José Silva" />
          <PlayerInformation idName="player-position" name="Atacante" />
          <PlayerInformation idName="player-team" name="America MG" />
        </div>

        <div className="season-information">
          <SeasonInformation idName="season-number" name="Temporada 1" />
          <SeasonInformation idName="player-age" name="17 anos" />
          <SeasonInformation idName="player-overall" name="60 de overall" />
        </div>
      </div>

      <div className="player-stats">
        <PlayerStats
          buttonName="Estatísticas da temporada"
          buttonCollor="14B8A6"
          idName="season-stats"
        />
        <PlayerStats
          buttonName="Estatísticas da carreira"
          buttonCollor="3730A3"
          idName="career-stats"
        />
      </div>

      <div className="season-opportunities">
        <SeasonOpportunities
          oppotunityName="Tentativas de desarme disponíveis"
          opportunitiesQuantity={289}
          idName="desarming-opportunities"
        />

        <SeasonOpportunities
          oppotunityName="Tentativas de passe disponíveis"
          opportunitiesQuantity={2098}
          idName="pass-opportunities"
        />

        <SeasonOpportunities
          oppotunityName="Tentativas de finalização disponíveis"
          opportunitiesQuantity={94}
          idName="finishing-opportunities"
        />
      </div>

      <div className="championship-informations">
        <ChampionshipInformations
          fieldName="Competição:"
          fieldValue="Campeonato Brasileiro"
          idName="championship-name"
        />
        <ChampionshipInformations
          fieldName="Fase:"
          fieldValue={`${5}º rodada`}
          idName="championship-stage"
        />
      </div>

      <div className="match-attempts-section">
        <MatchAttempts
          attemptName="Tentativas de desarme na partida"
          idName="disarming-attempts"
        />
        <MatchAttempts
          attemptName="Tentativas de passe na partida"
          idName="pass-attempts"
        />
        <MatchAttempts
          attemptName="Tentativas de finalização na partida"
          idName="finishing-attempts"
        />
      </div>

      <div className="match-section">
        <MatchInformations
          playerTeamName="America MG"
          playerTeamGoals=""
          opposingTeamName="Fluminense"
          opposingTeamGoals=""
        />
      </div>

      <div className="match-buttons-section">
        <MatchButton
          buttonValue="Confirmar partida"
          buttonColor="30A349"
          idName="match-confirm-button"
        />
        <MatchButton
          buttonValue="Próxima partida"
          buttonColor="A33C30"
          idName="next-match-button"
        />
      </div>
    </div>
  );
};

export const RegistrationData = () => {
  return (
    <>
      <div className="player-name">
        Nome do jogador
        <input type="text" className="player-name-input" />
      </div>

      <div className="player-position-input">
        Posição do jogador
        <select name="positions" className="position-select">
          <option value="Zagueiro">Zagueiro</option>
          <option value="Meia">Meia</option>
          <option value="Atacante">Atacante</option>
        </select>
      </div>
    </>
  );
};

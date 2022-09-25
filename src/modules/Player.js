const Player = () => {
  const attackLocations = [];

  const alreadyAttacked = (x, y) => {
    if (attackLocations.length > 0) {
      for (let i = 0; i < attackLocations.length; i += 1) {
        if (attackLocations[i][0] === x && attackLocations[i][1] === y) {
          return true;
        }
      }
    }
    return false;
  };

  const attack = (x, y, gameboard) => {
    if (alreadyAttacked()) {
      return;
    }
    gameboard.receiveAttack(x, y);
    attackLocations.push([x, y]);
  };

  const attackRandomSquare = (gameboard) => {
    if (attackLocations.length === 100) return;
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (alreadyAttacked(x, y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    gameboard.receiveAttack(x, y);
    attackLocations.push([x, y]);
  };

  return { attack, attackRandomSquare, alreadyAttacked };
};

export default Player;

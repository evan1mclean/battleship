const Ship = (length) => {
  const hits = Array(length).fill(null);

  const hit = (position) => {
    if (position < hits.length) {
      hits[position] = position;
    }
  };
  const isSunk = () => {
    if (hits.includes(null)) {
      return false;
    }
    return true;
  };
  return { length, hit, isSunk, hits };
};

export default Ship;

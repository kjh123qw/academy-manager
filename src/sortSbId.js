const sortSbId = (key, ok = true) => {
  return (a, b) => {
    if (!ok) return 0;
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    let comparison = 0;
    if (a[key] === "0" && b[key] !== "0") comparison = -1;
    if (a[key] !== "0" && b[key] === "0") comparison = 1;
    return comparison;
  };
};

export default sortSbId;

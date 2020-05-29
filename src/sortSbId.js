const sortSbId = (ok = true) => {
  return (a, b) => {
    if (!ok) return 0;
    if (!a.hasOwnProperty("sbId") || !b.hasOwnProperty("sbId")) return 0;

    let comparison = 0;
    if (a.sbId === "0" && b.sbId !== "0") comparison = -1;
    if (a.sbId !== "0" && b.sbId === "0") comparison = 1;
    return comparison;
  };
};

export default sortSbId;

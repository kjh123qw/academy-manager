const sortDate = (key, order = "asc") => {
  return (a, b) => {
    let numberA, numberB;
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    numberA = Number(a[key]);
    numberB = Number(b[key]);
    let comparison = 0;
    if (numberA > numberB) comparison = 1;
    if (numberA < numberB) comparison = -1;
    if (order === "desc") comparison *= -1;
    return comparison;
  };
};

export default sortDate;

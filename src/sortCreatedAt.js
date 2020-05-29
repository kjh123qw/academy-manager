const sortCreatedAt = (key, order = "asc") => {
  return (a, b) => {
    let stringA, stringB;
    let numberA, numberB;
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    stringA =
      a[key].substr(0, 4) +
      a[key].substr(5, 2) +
      a[key].substr(8, 2) +
      a[key].substr(11, 2) +
      a[key].substr(14, 2);
    stringB =
      b[key].substr(0, 4) +
      b[key].substr(5, 2) +
      b[key].substr(8, 2) +
      b[key].substr(11, 2) +
      b[key].substr(14, 2);

    numberA = Number(stringA);
    numberB = Number(stringB);
    let comparison = 0;
    if (numberA > numberB) comparison = 1;
    if (numberA < numberB) comparison = -1;
    if (order === "desc") comparison *= -1;
    return comparison;
  };
};

export default sortCreatedAt;

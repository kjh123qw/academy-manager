const filterApply = (apply = true) => {
  return (obj) => {
    if (!apply) return 1;
    let date = new Date();
    let year = date.getFullYear();
    let month =
      1 + date.getMonth() >= 10
        ? 1 + date.getMonth()
        : "0" + (1 + date.getMonth());
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    let newDate = Number(year + "" + month + "" + day);
    let endApply = Number(obj.endApply);
    let comparison = true;

    if (endApply >= newDate) comparison = true;
    if (endApply < newDate) comparison = false;
    return comparison;
  };
};

export default filterApply;

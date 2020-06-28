const sortStarted = (ok = true) => {
  return (a, b) => {
    if (!ok) return 0;
    let date = new Date();
    let year = date.getFullYear();
    let month =
      1 + date.getMonth() >= 10
        ? 1 + date.getMonth()
        : "0" + (1 + date.getMonth());
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    let newDate = Number(year + "" + month + "" + day);
    if (!a.hasOwnProperty("SubjectInfo") || !b.hasOwnProperty("SubjectInfo"))
      return 0;

    let comparison = 0;
    if (Number(a.SubjectInfo.endApply) <= newDate) comparison = 0;
    if (Number(b.SubjectInfo.endApply) <= newDate) comparison = 1;
    return comparison;
  };
};

export default sortStarted;

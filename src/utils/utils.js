const timestampToDate = (timestamp) => {
  const date = timestamp.split("T")[0].split("-").reverse().join("-");
  return date;
};

const capitalizeString = (word) => {
  if(word !== null && typeof word.charAt(0) !== "number") return word.charAt(0).toUpperCase() + word.slice(1);
};

module.exports = { timestampToDate, capitalizeString };

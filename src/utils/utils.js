const timestampToDate = (timestamp) => {
  const date = timestamp.split("T")[0].split("-").reverse().join("-");
  return date;
};

const capitalizeString = (word) => {
  if(word !== null && typeof word.charAt(0) !== "number") return word.charAt(0).toUpperCase() + word.slice(1);
};

const validateUsername = (username) => {
  const usernameRegex = /^[a-z][a-z0-9_]{7,24}$/;
  return usernameRegex.test(username);
}

module.exports = { timestampToDate, capitalizeString, validateUsername};

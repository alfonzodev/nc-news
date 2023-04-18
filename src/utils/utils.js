const timestampToDate = (timestamp) => {
    const date = timestamp.split("T")[0].split('-').reverse().join("-");
    return date;
}

module.exports = {timestampToDate}

const { timestampToDate } = require("../src/utils/utils.js");

describe("timestampToDate", () => {
  test("it does not mutate timestamp", () => {
    const timestamp = "2020-11-15T13:25:00.000Z";
    timestampToDate(timestamp);
    expect(timestamp).toBe("2020-11-15T13:25:00.000Z");
  });
  test("it returns the date portion of the timestamp in format dd-mm-yyyy", () => {
    const timestamp = "2020-11-15T13:25:00.000Z";
    const date = timestampToDate(timestamp);
    expect(date).toBe("15-11-2020");
  });
});

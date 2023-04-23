const { timestampToDate, capitalizeString, validateUsername } = require("../src/utils/utils.js");

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

describe("capitalizeString", () => {
  test("it returns an empty string when passed an empty string", () => {
    const word = "";
    const result = capitalizeString(word);
    expect(result).toBe("");
  });
  test("it returns capitalized word", () => {
    const word = "hello";
    const result = capitalizeString(word);
    expect(result).toBe("Hello");
  });
  test("it returns unmodified word if first char is a num", () => {
    const word = "5hello";
    const result = capitalizeString(word);
    expect(result).toBe("5hello");
  });
});

describe("validateUsername", () => {
  test("it returns true if username has at least 8 characters, does not start with a number and has no capital letters", () => {
    const username = 'testusername123';
    expect(validateUsername(username)).toBe(true);
  })
  test("it returns false if username has more than 25 chars", () => {
    const username = 'testusernamefasdfasfasdfsadfa';
    expect(validateUsername(username)).toBe(false);
  })
  test("it returns false if username has less than 8 chars", () => {
    const username = 'testuse';
    expect(validateUsername(username)).toBe(false);
  })
  test("it returns false if username has capital letter", () => {
    const username = 'testUsername';
    expect(validateUsername(username)).toBe(false);
  })
  test("it returns false if username starts with a number", () => {
    const username = '1testusername';
    expect(validateUsername(username)).toBe(false);
  })
})

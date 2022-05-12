const { BrowserWindow } = require("electron");

/**
 * Calculate day difference between two dates
 * See: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
 * @param {Date} date1 first date
 * @param {Date} date2 second date
 * @returns {Number}
 */
const dayDateDiff = (date1, date2) => {
  const timeDiff = date2.getTime() - date1.getTime();

  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

const getBrowserWindowFromEvent = (e) => {
  return BrowserWindow.fromId(e.sender.id);
};

module.exports = {
  dayDateDiff,
  getBrowserWindowFromEvent,
};

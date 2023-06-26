
// function that returns the current date and time as a Date object
function getCurrentDateTime(): Date {
  return new Date();
}

/**
 * Function that adds a specified amount of time to the current date and time
 * @param {string} timeToAdd - The Time You Want To Add , For Example 1 minute , 1 hour , 1 day.
 * @returns {Date} Return Date + Added Time.
 */
function addTimeToDate(timeToAdd: string): Date {
  const now = getCurrentDateTime();
  const timeUnits: { [key: string]: number } = {
    minute: 60000, // 1 minute = 60 seconds * 1000 milliseconds
    hour: 3600000, // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
    day: 86400000, // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  };
  const [timeValue, timeUnit] = timeToAdd.split(" ");
  const millisecondsToAdd = timeUnits[timeUnit] * parseInt(timeValue);
  return new Date(now.getTime() + millisecondsToAdd);
}

// function that checks if the current date and time is before a specified date and time
function isExpired(expiryDate: Date): { message: string; expired: boolean } {
  const now = getCurrentDateTime();
  const isExpired = now.getTime() >= expiryDate.getTime();
  return {
    message: isExpired ? "Time has expired." : "Time has not yet expired.",
    expired: isExpired,
  };
}

const time = Object.freeze({
    getCurrentDateTime,
    addTimeToDate,
    isExpired
});
export default time;
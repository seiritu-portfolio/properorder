import moment from "moment";

/**
 * getLocalTime
 * get a formatted date string ('MMM DD at hh:MM')
 * e.g. May 08 at 11:00
 *
 * @param {Date} date
 * @returns {string}
 */
function getLocalTime(date) {
  if (isToday(date)) {
    return "Today at " + moment(date).format("HH:MM");
  }
  return moment(date).format("MMM DD, HH:MM").replace(",", " at");
}

/**
 * getOrderTime
 * get a formatted date string ('ddd MMM Do')
 * e.g. May 08 at 11:00
 *
 * @param {Date} date
 * @returns {string}
 */
function getOrderTime(date) {
  return moment(date).format("ddd MMM Do");
}

/**
 * getServerTimeString
 */
function getServerTimeString(date) {
  return moment(date).format("MM/DD/YYYY");
}

/**
 * getServerDateTimeString
 */
function getServerDateTimeString(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * getOrderDate
 * get a formatted date string ('ddd MM')
 * e.g. May 08
 *
 * @param {Date} date
 * @returns {string}
 */
function getOrderDate(date) {
  return moment(date).format("ddd MM");
}

/**
 * isToday
 *
 * @param {Date} someDate
 * @returns {boolean}
 */
function isToday(someDate) {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
}

/**
 * isYesterday
 *
 * @param {Date} someDate
 * @returns {boolean}
 */
function isYesterday(someDate) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * getDayOfWeek
 *
 * @param {Date} date
 * @returns {string}
 */
function getDayOfWeek(date) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[date.getDay()];
}

/**
 * getTomorrowDate
 */
function getTomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

/**
 * getSaturday
 */
function getSaturday() {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay();
  const last = first + 6;

  return new Date(curr.setDate(last)).toUTCString();
}

function getSunday() {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay();
  const nextFirst = first + 7;
  return new Date(curr.setDate(nextFirst)).toUTCString();
}

function getRateDateString(date) {
  const d = new Date(date);
  if (isYesterday(d)) {
    return "Yesterday";
  }
  if (isToday(d)) {
    return "Today";
  }
  return moment(d).format("ddd MMM Do");
}

export default {
  getLocalTime,
  isToday,
  getDayOfWeek,
  getOrderTime,
  getOrderDate,
  getTomorrowDate,
  getSunday,
  getSaturday,
  getServerTimeString,
  getRateDateString,
  getServerDateTimeString,
};

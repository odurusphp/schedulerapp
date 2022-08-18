//success response

import moment from "moment";

const successResponse = (res, message, data, code = 200) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

//error response

const errorResponse = (res, error, code = 422) => {
  return res.status(code).json({
    status: "error",
    error,
  });
};
function formatdate(date) {
  var dateObj = new Date(date);
  const rightNow = moment(dateObj).format("YYYY-MM-DD HH:mm");
  const now = rightNow.toLocaleString("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  });
  return now;
}

function getTime(date) {
  var dateObj = new Date(date);
  var newdate = dateObj.getHours() + ":" + dateObj.getMinutes();

  const rightNow = moment(dateObj).format("HH:mm");
  const now = rightNow.toLocaleString("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  });
  return now;
}
const formattext = (string) => {
  const fm = string.toString();
  if (fm.length >= 2) {
    return string;
  } else {
    return "0" + string;
  }
};
function dumpError(err) {
  if (typeof err === "object") {
    if (err.message) {
      console.log("\nMessage: " + err.message);
    }
    if (err.stack) {
      console.log("\nStacktrace:");
      console.log("====================");
      console.log(err.stack);
    }
  } else {
    console.log("dumpError :: argument is not an object");
  }
}
//get duration of booking from from_date_time and to_date_time
const getDuration = (from_date_time, to_date_time) => {
  const from_date = new Date(from_date_time);
  const to_date = new Date(to_date_time);
  const diff = to_date.getTime() - from_date.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60) - hours * 60;
  const seconds = Math.floor(diff / 1000) - hours * 60 * 60 - minutes * 60;
  return hours + ":" + minutes + ":" + seconds;
};

const getSeconds = (from_date_time, to_date_time) => {
  const from_date = new Date();
  const to_date = new Date(to_date_time);
  const diff = to_date.getTime() - from_date.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60) - hours * 60;
  var seconds = Math.abs(from_date - to_date) / 1000;
  return minutes * 60;
};

//export module
module.exports = {
  successResponse,
  errorResponse,
  formatdate,
  dumpError,
  getDuration,
  getTime,
  getSeconds,
};

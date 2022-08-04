//success response 
const successResponse = (res, message, data,code=200) => {
    return res.status(code).json({
        status: "success",
        message,
        data
    });
}

//error response

const errorResponse = (res, error, code = 422) => {
    return res.status(code).json({
        status: "error",
        error
    });
}
 function formatdate(date) {
    var dateObj = new Date(date);
    var month = formattext(dateObj.getMonth() + 1); //months from 1-12
    var day = formattext(dateObj.getDate());
    var year = dateObj.getFullYear();
    var newdate = year + "-" + month + "-" + day + " " + dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
    return newdate; 
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
    if (typeof err === 'object') {
      if (err.message) {
        console.log('\nMessage: ' + err.message)
      }
      if (err.stack) {
        console.log('\nStacktrace:')
        console.log('====================')
        console.log(err.stack);
      }
    } else {
      console.log('dumpError :: argument is not an object');
    }
  }

//export module
module.exports = {
    successResponse,
    errorResponse,
    formatdate,
    dumpError
}
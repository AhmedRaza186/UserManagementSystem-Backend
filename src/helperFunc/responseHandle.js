
function responseHandler(res,statusCode, status, message, data = null){
   return res.status(statusCode).json({
        status: status,
        message: message,
        data: data
    });
}

module.exports = responseHandler;
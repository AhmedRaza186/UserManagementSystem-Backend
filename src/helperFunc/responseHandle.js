
function responseHandler(res,statusCode, status, message, data = null, token = null) {
   return res.status(statusCode).json({
        status: status,
        message: message,
        data: data,
        token: token
    });
}

module.exports = responseHandler;
module.exports = {

    // success response
    success: (res, code, status, message, data) => res.status(code).json({
        status,
        message,
        data
    }),

    // error response
    error: (res, code, status, message) => res.status(code).json({
        status,
        message
    })

}
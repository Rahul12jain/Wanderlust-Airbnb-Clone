class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Pass message to built-in Error constructor
        this.statusCode = statusCode;
        this.name = "ExpressError"; // Optional: helps identify in logs
    }
}

module.exports = ExpressError;

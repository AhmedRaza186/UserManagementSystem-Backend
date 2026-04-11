function formatMongoError(error) {
    // Duplicate key error (unique fields like email)
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];

        return `${field.slice(0,1).toUpperCase() + field.slice(1)} already exists`;
    }

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return messages.join(', ');
    }

    // Cast error (invalid ObjectId etc)
    if (error.name === 'CastError') {
        return `Invalid ${error.path}`;
    }

    // Default fallback
    return 'Something went wrong, please try again';
}

module.exports = formatMongoError;
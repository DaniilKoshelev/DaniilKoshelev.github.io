function jsonResponse(response) {
    return {
        data: [],
        message: "success",
        ...response
    }
}

module.exports = jsonResponse;
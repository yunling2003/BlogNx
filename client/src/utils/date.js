
exports.getFormatDate = (dateStr) => {
    const dateTime = new Date(dateStr)
    return `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`
}
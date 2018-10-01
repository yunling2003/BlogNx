
exports.getFormatDate = (dateStr) => {
    const dateTime = new Date(dateStr)
    return `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()}`
}
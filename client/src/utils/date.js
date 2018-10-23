
exports.getFormatDate = (dateStr) => {
    const dateTime = new Date(dateStr)
    return `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()}`
}

exports.getFullDateTime = (dateStr) => {
    const dateTime = new Date(dateStr)
    const year = dateTime.getFullYear()
    const month = checkTime(dateTime.getMonth() + 1)
    const day = checkTime(dateTime.getDate())
    const hour = checkTime(dateTime.getHours())
    const minute = checkTime(dateTime.getMinutes())
    const second = checkTime(dateTime.getSeconds())
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const checkTime = (timeStr) => {    
    return timeStr < 10 ? '0' + timeStr : timeStr
}
export const isDateInBetween = (date, startDate, endDate) => {
    return (
        new Date(date).getTime() >= new Date(startDate).getTime() &&
        new Date(date).getTime() <= new Date(endDate).getTime()
    )
}

export const getDaysDifference = (checkin, checkout) => {
    return (
        (new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 3600 * 24) + 1
    )
}
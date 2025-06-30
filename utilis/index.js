export const isDateInBetween = (date, startDate, endDate) => {
    return (
        new Date(date).getTime() >= new Date(startDate).getTime() &&
        new Date(date).getTime() <= new Date(endDate).getTime()
    )
}
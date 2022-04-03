export const getTodayAtBeginning = () => {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    return startOfDay
}
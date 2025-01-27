export const getTimeIntervalInMinutes = (startTimestamp: number, endTimestamp: number) => {
    const secondsElapsed: number = (endTimestamp - startTimestamp) / 1000;
    const minutesElapsed: number = Math.floor(secondsElapsed / 60);
    const secondsRemainder: number = Math.floor(secondsElapsed - minutesElapsed * 60);
    const leadingZero: string = secondsRemainder < 10? "0": "";

    return `${minutesElapsed}:${leadingZero}${secondsRemainder}`;
};
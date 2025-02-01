export const getTimeInterval = (startTimestamp: number, endTimestamp: number) => {
    const secondsElapsed: number = (endTimestamp - startTimestamp) / 1000;
    const minutesElapsed: number = Math.floor(secondsElapsed / 60);
    const hoursElapsed: number = Math.floor(minutesElapsed / 60);

    const minutesRemainder: number = Math.floor(minutesElapsed - hoursElapsed * 60);
    const secondsRemainder: number = Math.floor(secondsElapsed - minutesElapsed * 60);

    const leadingMinutesZero: string = minutesRemainder < 10? "0": "";
    const leadingSecondsZero: string = secondsRemainder < 10? "0": "";
    const hoursString: string = hoursElapsed >= 1? `${hoursElapsed}:${leadingMinutesZero}`: "";

    return `${hoursString}${minutesRemainder}:${leadingSecondsZero}${secondsRemainder}`;
};
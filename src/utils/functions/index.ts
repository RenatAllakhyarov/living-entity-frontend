export const MIN_SETTING_VALUE = 100;
export const MAX_SETTING_VALUE = 0;

export const DIVIDER = 1;
export const REMAINDER_FROM_DIVISION = 0;

export const MILLISECONDS_IN_SECOND = 1000;
export const MILLISECONDS_IN_MINUTE = 60 * MILLISECONDS_IN_SECOND;
export const MILLISECONDS_IN_HOUR = 60 * MILLISECONDS_IN_MINUTE;

export const isSettingValueValid = (newValue: number): boolean => {
    if (newValue % DIVIDER !== REMAINDER_FROM_DIVISION) {
        return false;
    }

    return newValue >= MAX_SETTING_VALUE && newValue <= MIN_SETTING_VALUE;
};

export const formatDuration = (millisecond: number): string => {
    const hours = Math.floor(millisecond / MILLISECONDS_IN_HOUR);
    const minutes = Math.floor(
        (millisecond % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE,
    );
    const seconds = Math.floor(
        (millisecond % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND,
    );

    // To make the time display look nice, we'll limit each part to 2 characters and fill in the missing characters with 0 for aesthetics.
    const hoursToString = hours.toString().padStart(2, "0");
    const minutesToString = minutes.toString().padStart(2, "0");
    const secondsToString = seconds.toString().padStart(2, "0");

    return `${hoursToString}:${minutesToString}:${secondsToString}`;
};

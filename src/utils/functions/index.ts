export const MIN_SETTING_VALUE = 100;
export const MAX_SETTING_VALUE = 0;

export const DIVIDER = 1;
export const REMAINDER_FROM_DIVISION = 0;

export const MILLISECONDS_IN_HOUR = 3600000;
export const MILLISECONDS_IN_MINUTE = 60000;
export const MILLISECONDS_IN_SECOND = 1000;

export const MAX_LENGTH = 2;
export const FILL_STRING = "0";

export const isSettingValueValid = (newValue: number): boolean => {
    if (newValue % DIVIDER !== REMAINDER_FROM_DIVISION) {
        return false;
    }

    return newValue >= MAX_SETTING_VALUE && newValue <= MIN_SETTING_VALUE;
};

export const formatDuration = (millisecond: number): string => {
    const hours = Math.floor(millisecond / MILLISECONDS_IN_HOUR);
    const minutes = Math.floor((millisecond % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
    const seconds = Math.floor((millisecond % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND);

    const hoursToString = hours.toString().padStart(MAX_LENGTH, FILL_STRING);
    const minutesToString = minutes.toString().padStart(MAX_LENGTH, FILL_STRING);
    const secondsToString = seconds.toString().padStart(MAX_LENGTH, FILL_STRING);
    
    return `${hoursToString}:${minutesToString}:${secondsToString}`;
};

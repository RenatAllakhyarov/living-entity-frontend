export const MIN_SETTING_VALUE = 100;
export const MAX_SETTING_VALUE = 0;

export const DIVIDER = 1;
export const REMAINDER_FROM_DIVISION = 0;

export const isSettingValueValid = (newValue: number): boolean => {
    if (newValue % DIVIDER !== REMAINDER_FROM_DIVISION) {
        return false;
    }

    return newValue >= MAX_SETTING_VALUE && newValue <= MIN_SETTING_VALUE;
};

export const formatDuration = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    
    return `${hh}:${mm}:${ss}`;
};

export const MIN_SETTING_VALUE = 100;
export const MAX_SETTING_VALUE = 0;

export const DIVIDER = 1;
export const REMAINDER_FROM_DIVISION = 0;

export const isSettingValueValid = (newValue: number): boolean => {
    if (newValue % DIVIDER !== REMAINDER_FROM_DIVISION) {
        return false;
    }

    return newValue >= MAX_SETTING_VALUE && newValue <= MIN_SETTING_VALUE;
}

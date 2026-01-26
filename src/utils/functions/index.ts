export const maxAge = 100;
export const minAge = 0;

export const maxHealthPoints = 100;
export const minHealthPoints = 0;

export const isAgeValid = (newAge: number): boolean => {
    if (newAge % 1 !== 0) {
        return false;
    } 

    return newAge >= minAge && newAge <= maxAge;        
};

export const isHealthPointsValid = (newHealthPoints: number): boolean => {
    if (newHealthPoints %1!==0) {
        return false;
    }

    return newHealthPoints >= minHealthPoints && newHealthPoints <= maxHealthPoints;
}
import { Emotions } from "@domains/LivingEntity";

export const getEmotion = (
    healthPoints: number,
    hungerPoints: number,
): Emotions => {
    if (healthPoints >= 80 && hungerPoints >= 80) {
        return Emotions.HAPPY;
    }

    if (healthPoints <= 40 && hungerPoints > 10) {
        return Emotions.AFRAID;
    }
    
    if (hungerPoints > 10 && hungerPoints <= 30) {
        return Emotions.SAD;
    }
    
    if (healthPoints > 20 && healthPoints < 70 && hungerPoints > 30 && hungerPoints < 70) {
        return Emotions.BORED;
    }
    
    if (healthPoints <= 10) {
        return Emotions.SICK;
    }

    if (healthPoints >= 70 && hungerPoints >= 70) {
        return Emotions.HORNY;
    }

    if (hungerPoints <= 10) {
        return Emotions.ANGRY;
    }

    if (hungerPoints === 0 && healthPoints === 0) {
        return Emotions.NONE;
    }

    return Emotions.NONE;
};
    
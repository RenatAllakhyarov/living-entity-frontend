import { Emotions } from "@domains/LivingEntity";

export const getEmotion = (
    healthPoints: number,
    hungerPoints: number,
): Emotions => {
    if (healthPoints === 0 && hungerPoints === 0) {
        return Emotions.DEAD;
    }

    if (healthPoints > 0 && healthPoints <= 20) {
        return Emotions.SICK;
    }

    if (hungerPoints >= 0 && hungerPoints <= 10) {
        return Emotions.ANGRY;
    }

    if (hungerPoints > 10 && hungerPoints <= 30) {
        return Emotions.SAD;
    }

    if (hungerPoints >= 80 && healthPoints >= 80) {
        return Emotions.HAPPY;
    }

    if (hungerPoints >= 70 && hungerPoints < 80 && healthPoints >= 70 && healthPoints < 80) {
        return Emotions.HORNY;
    }

    return Emotions.BORED;
};
    
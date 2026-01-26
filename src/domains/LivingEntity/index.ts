import { isAgeValid, isHealthPointsValid } from "@utils/functions";

export const DEFAULT_LIVING_ENTITY_NAME = "Tamagochik";

export const MIN_GOOD_HUNGRY_VALUE = 75;
export const MAX_HUNGRY_VALUE = 100;
export const MIN_HUNGRY_VALUE = 0;

export const MAX_HEALTH_POINTS = 100;

export const CHANGE_HEALTH_POINTS_VALUE = 1;

export const MIN_AGE = 0;

export enum Emotions {
    HAPPY = "happy",
    AFRAID = "afraid",
    SAD = "sad",
    BORED = "bored",
    SICK = "sick",
    HORNY = "horny",
    ANGRY = "angry",
}

class LivingEntity {
    private name: string;
    private age: number;
    private hungerPoints: number;
    private healthPoints: number;
    private emotion: Emotions;

    constructor() {
        this.name = DEFAULT_LIVING_ENTITY_NAME;
        this.age = MIN_AGE;
        this.healthPoints = MAX_HEALTH_POINTS;
        this.emotion = Emotions.HAPPY;
        this.hungerPoints = MAX_HUNGRY_VALUE;
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(newAge: number) {
        if (!isAgeValid(newAge)) {
            throw new Error("Incorrect age");
        }

        this.age = newAge;
    }

    public getHealthPoints(): number {
        return this.healthPoints;
    }

    public setHealthPoints(newHealthPoints: number) {
        if (!isHealthPointsValid(newHealthPoints)) {
            throw new Error("Incorrect health point");
        }

        this.healthPoints = newHealthPoints;
    }

    public getEmotion(): Emotions {
        return this.emotion;
    }

    public setEmotion(newEmotion: Emotions) {
        this.emotion = newEmotion;
    }

    public getHungerPoints(): number {
        return this.hungerPoints;
    }

    public decreaseHungryPoints(decreasePoints: number) {
        if (this.hungerPoints === MIN_HUNGRY_VALUE) {
            this.healthPoints -= CHANGE_HEALTH_POINTS_VALUE;

            return;
        } 

        this.hungerPoints = Math.max(this.hungerPoints - decreasePoints,MIN_HUNGRY_VALUE);
    }

    public increaseHungryPoints(increasePoints: number) {
        if (this.hungerPoints > MAX_HUNGRY_VALUE ) {
            throw new Error("Max Hunger Points");
        }

        if (this.healthPoints >= MAX_HEALTH_POINTS) {
            this.hungerPoints += increasePoints;

            return;
        }

        this.hungerPoints += increasePoints;
        this.healthPoints += CHANGE_HEALTH_POINTS_VALUE;
    }

    public feed(meatCount: number) {
        if (!(this.hungerPoints >= MIN_GOOD_HUNGRY_VALUE)) {
            throw new Error("Your entity is not hungry!");
        }

        this.hungerPoints = Math.min(
            this.hungerPoints + meatCount,
            MAX_HUNGRY_VALUE,
        );
    }
}

export default LivingEntity;

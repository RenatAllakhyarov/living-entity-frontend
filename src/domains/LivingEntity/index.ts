export const DEFAULT_LIVING_ENTITY_NAME = "Tamagochik";

export const MAX_HUNGRY_POINTS = 100;

export const MAX_HEALTH_POINTS = 100;

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
        this.hungerPoints = MAX_HUNGRY_POINTS;
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

    public getHealthPoints(): number {
        return this.healthPoints;
    }

    public setHealthPoints(newHealthPoints: number) {
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

    public setHungerPoints(newHungerPoints: number) {
        this.healthPoints = newHungerPoints;
    }
}

export default LivingEntity;

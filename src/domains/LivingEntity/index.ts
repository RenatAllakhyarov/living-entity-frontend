export enum Emotions {
    HAPPY = "happy",
    AFRAID = "afraid",
    SAD = "sad",
    BORED = "bored",
    SICK = "sick",
    HORNY = "horny",
    ANGRY = "angry",
}

export const DEFAULT_AGE = 100;
export const DEFAULT_HUNGER_POINTS = 100;
export const DEFAULT_HEALTH_POINTS = 100;
export const DEFAULT_EMOTION = Emotions.HAPPY;

class LivingEntity {
    private name: string;
    private age: number;
    private hungerPoints: number;
    private healthPoints: number;
    private emotion: Emotions;

    constructor(
        name: string,
        age?: number,
        healthPoints?: number,
        emotion?: Emotions,
        hungerPoints?: number,
    ) {
        this.name = name;
        this.age = age ?? DEFAULT_AGE;
        this.healthPoints = healthPoints ?? DEFAULT_HEALTH_POINTS;
        this.emotion = emotion ?? Emotions.HAPPY;
        this.hungerPoints = hungerPoints ?? DEFAULT_HUNGER_POINTS;
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

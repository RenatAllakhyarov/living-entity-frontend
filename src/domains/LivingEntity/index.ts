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

    constructor(name: string, age: number, hungerPoints: number, healthPoints: number, emotion: Emotions) {
        this.name = name;
        this.age = age;
        this.healthPoints = healthPoints;
        this.emotion = emotion;
        this.hungerPoints = hungerPoints;
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

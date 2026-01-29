import { formatDuration } from "@utils/functions";

export enum Emotions {
    HAPPY = "happy",
    AFRAID = "afraid",
    SAD = "sad",
    BORED = "bored",
    SICK = "sick",
    HORNY = "horny",
    ANGRY = "angry",
}

export const DEFAULT_AGE = 0;
export const DEFAULT_HUNGER_POINTS = 100;
export const DEFAULT_HEALTH_POINTS = 100;
export const DEFAULT_EMOTION = Emotions.HAPPY;

export const DECREASED_HUNGER_AND_HEALTH_POINTS_VALUE = 10;

class LivingEntity {
    private name: string;
    private age: number;
    private createdAt: number;
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
        this.emotion = emotion ?? DEFAULT_EMOTION;
        this.hungerPoints = hungerPoints ?? DEFAULT_HUNGER_POINTS;
        this.createdAt = Date.now();

        setInterval(() => {
            this.getAge();

            if (this.hungerPoints > 0) {
                const newHunger =
                    this.hungerPoints - DECREASED_HUNGER_AND_HEALTH_POINTS_VALUE;

                this.setHungerPoints(newHunger < 0 ? 0 : newHunger);
                
                this.selectableEmotion();
                
                return;
            }

            if (this.hungerPoints === 0 && this.healthPoints > 0) {
                const newHealth =
                    this.healthPoints - DECREASED_HUNGER_AND_HEALTH_POINTS_VALUE;

                this.setHealthPoints(newHealth < 0 ? 0 : newHealth);
                
                this.selectableEmotion();
                
                return;
            }

            this.selectableEmotion();
        }, 1000);
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public getAge(): number {
        return this.age = Date.now() - this.createdAt;
    }

    public showAge(): string {
        return formatDuration(this.age);
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
        this.hungerPoints = newHungerPoints;
    }

    private selectableEmotion() {
        if (this.healthPoints < 20) {
            this.setEmotion(Emotions.SICK);
            
            return;
        }

        if (this.hungerPoints <= 10) {
            this.setEmotion(Emotions.ANGRY);
            
            return;
        }

        if (this.hungerPoints > 10 && this.hungerPoints <= 30) {
            this.setEmotion(Emotions.SAD);
            
            return;
        }

        if (this.hungerPoints >= 80 && this.healthPoints >= 80) {
            this.setEmotion(Emotions.HAPPY);
            
            return;
        }

        if (this.hungerPoints >= 70 && this.healthPoints >= 70) {
            this.setEmotion(Emotions.HORNY);
            
            return;
        }

        this.setEmotion(Emotions.BORED);
    }
}

export default LivingEntity;

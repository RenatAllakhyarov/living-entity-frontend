import { getEmotion } from "@config/EntityConfig";

export enum Emotions {
    HAPPY = "😊",
    AFRAID = "😨",
    SAD = "😢",
    BORED = "😒",
    SICK = "🤧",
    HORNY = "😏",
    ANGRY = "🤬",
    NONE = "😑",
}

export enum LifeStatus {
    DEAD = "dead",
    LIVE = "live",
}

export const ZERO_VALUE = 0;
export const DEFAULT_HUNGER_POINTS = 100;
export const DEFAULT_HEALTH_POINTS = 100;
export const DEFAULT_EMOTION = Emotions.HAPPY;

export const DECREASE_VALUE = 10;
export const DECREASE_BY_ONE_POINT = 1;

export const GOOD_HUNGER_VALUE = 60;
export const MIN_GOOD_HEALTH_POINTS_VALUE = 20;

function handleIncorrectValues(
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
) {
    const original = descriptor.value;

    descriptor.value = function(newValue: number) {
        if (newValue < 0) {
            newValue = 0;
        }

        return original.apply(this, [newValue]);
    };

    return descriptor;
}

class LivingEntity {
    private name: string;
    private createdAt: number;
    private hungerPoints: number;
    private healthPoints: number;
    private emotion: Emotions;
    private lifeStatus: LifeStatus;

    constructor(
        name: string,
        healthPoints?: number,
        emotion?: Emotions,
        hungerPoints?: number,
    ) {
        this.name = name;
        this.healthPoints = healthPoints ?? DEFAULT_HEALTH_POINTS;
        this.emotion = emotion ?? DEFAULT_EMOTION;
        this.hungerPoints = hungerPoints ?? DEFAULT_HUNGER_POINTS;
        this.createdAt = Date.now();
        this.lifeStatus = LifeStatus.LIVE;

        setInterval(() => {
            this.entityLife();

            this.computeEmotion();
        }, 1000);
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public getAge(): number {
        return Date.now() - this.createdAt;
    }

    public getHealthPoints(): number {
        return this.healthPoints;
    }

    @handleIncorrectValues
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

    private computeEmotion() {
        this.setEmotion(getEmotion(this.healthPoints, this.hungerPoints));
    }

    private entityLife() {
        if (this.lifeStatus === LifeStatus.DEAD) {
            return;
        }

        if (
            this.hungerPoints > GOOD_HUNGER_VALUE &&
            this.healthPoints < DEFAULT_HEALTH_POINTS
        ) {
            this.setHealthPoints(
                Math.min(
                    this.healthPoints + DECREASE_VALUE,
                    DEFAULT_HEALTH_POINTS,
                ),
            );

            return;
        }

        if (
            this.hungerPoints > ZERO_VALUE &&
            this.healthPoints > MIN_GOOD_HEALTH_POINTS_VALUE
        ) {
            this.setHungerPoints(
                Math.max(
                    ZERO_VALUE,
                    this.hungerPoints - DECREASE_VALUE,
                ),
            );

            return;
        }

        if (this.healthPoints > ZERO_VALUE) {
            const decreaseValue =
                this.healthPoints < MIN_GOOD_HEALTH_POINTS_VALUE
                    ? DECREASE_BY_ONE_POINT
                    : DECREASE_VALUE;

            this.setHealthPoints(
                Math.max(
                    ZERO_VALUE,
                    this.healthPoints - decreaseValue,
                ),
            );

            return;
        }

        if (this.healthPoints === ZERO_VALUE) {
            this.emotion = Emotions.NONE;
            this.healthPoints = ZERO_VALUE;
            this.hungerPoints = ZERO_VALUE;
            this.createdAt = ZERO_VALUE;
            this.lifeStatus = LifeStatus.DEAD;

            return;
        }
    }
}

export default LivingEntity;

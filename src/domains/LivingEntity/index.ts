import { getEmotion } from "@config/EntityConfig";

export enum Emotions {
    HAPPY = "happy",
    AFRAID = "afraid",
    SAD = "sad",
    BORED = "bored",
    SICK = "sick",
    HORNY = "horny",
    ANGRY = "angry",
    DEAD = "dead",
}

export const MIN_HUNGER_AND_HEALTH_POINTS_VALUE = 0;
export const DEFAULT_HUNGER_POINTS = 100;
export const DEFAULT_HEALTH_POINTS = 100;
export const DEFAULT_EMOTION = Emotions.HAPPY;

export const DECREASE_HUNGER_AND_HEALTH_POINTS_VALUE = 10;
export const DECREASE_HEALTH_POINTS_BY_ONE_POINT = 1;

export const GOOD_HUNGER_VALUE = 60;
export const MIN_GOOD_HEALTH_POINTS_VALUE = 20;

function handleIncorrectValues(
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
) {
    const original = descriptor.value;

    descriptor.value = function (newHunger: number) {
        if (newHunger < 0) {
            newHunger = 0;
        }

        return original.apply(this, [newHunger]);
    };

    return descriptor;
}

class LivingEntity {
    private name: string;
    private createdAt: number;
    private hungerPoints: number;
    private healthPoints: number;
    private emotion: Emotions;

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

        setInterval(() => {
            if (this.emotion === Emotions.DEAD) {
                return;
            }

            if (
                this.hungerPoints > GOOD_HUNGER_VALUE &&
                this.healthPoints < DEFAULT_HEALTH_POINTS
            ) {
                this.setHealthPoints(
                    Math.min(
                        this.healthPoints +
                            DECREASE_HUNGER_AND_HEALTH_POINTS_VALUE,
                        DEFAULT_HEALTH_POINTS,
                    ),
                );

                return;
            }

            if (
                this.hungerPoints > MIN_HUNGER_AND_HEALTH_POINTS_VALUE &&
                this.healthPoints > MIN_GOOD_HEALTH_POINTS_VALUE
            ) {
                this.setHungerPoints(
                    Math.max(
                        MIN_HUNGER_AND_HEALTH_POINTS_VALUE,
                        this.hungerPoints -
                            DECREASE_HUNGER_AND_HEALTH_POINTS_VALUE,
                    ),
                );

                return;
            }

            if (this.healthPoints > MIN_HUNGER_AND_HEALTH_POINTS_VALUE) {
                const decreaseValue =
                    this.healthPoints < MIN_GOOD_HEALTH_POINTS_VALUE
                        ? DECREASE_HEALTH_POINTS_BY_ONE_POINT
                        : DECREASE_HUNGER_AND_HEALTH_POINTS_VALUE;

                this.setHealthPoints(
                    Math.max(
                        MIN_HUNGER_AND_HEALTH_POINTS_VALUE,
                        this.healthPoints - decreaseValue,
                    ),
                );

                return;
            }

            if (
                this.hungerPoints === MIN_HUNGER_AND_HEALTH_POINTS_VALUE &&
                this.healthPoints === MIN_HUNGER_AND_HEALTH_POINTS_VALUE
            ) {
                this.setEmotion(Emotions.DEAD);

                this.name = "";
                this.healthPoints = MIN_HUNGER_AND_HEALTH_POINTS_VALUE;
                this.hungerPoints = MIN_HUNGER_AND_HEALTH_POINTS_VALUE;
                this.createdAt = MIN_HUNGER_AND_HEALTH_POINTS_VALUE;

                return;
            }

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
}

export default LivingEntity;

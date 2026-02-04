import { EntityConfig } from "@config/EntityConfig";
import { Emotions } from "@utils/constants";

function handleIncorrectValues<T>(
    value: Function,
    context: ClassMethodDecoratorContext,
) {
    return function (this: T, ...methodArguments: any[]) {
        if (typeof methodArguments[0] !== "number") {
            return;
        }

        if (methodArguments[0] < 0) {
            methodArguments[0] = 0;
        }

        if (methodArguments[0] > 100) {
            methodArguments[0] = 100;
        }

        return value.apply(this, methodArguments);
    };
}

class LivingEntity {
    private name: string;
    private createdAt: number;
    private hungerPoints: number;
    private healthPoints: number;
    private emotion: Emotions;
    private isAlive: boolean;
    private interval: NodeJS.Timeout | null;

    constructor(
        name: string,
        healthPoints?: number,
        emotion?: Emotions,
        hungerPoints?: number,
    ) {
        this.name = name;
        this.healthPoints = healthPoints ?? EntityConfig.DEFAULT_HEALTH_POINTS;
        this.emotion = emotion ?? EntityConfig.DEFAULT_EMOTION;
        this.hungerPoints = hungerPoints ?? EntityConfig.DEFAULT_HUNGER_POINTS;
        this.createdAt = Date.now();
        this.isAlive = true;

        this.interval = setInterval(() => {
            this.entityLife();
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

    public updateEmotion() {
        this.emotion = this.computeEmotion();
    }

    public getHungerPoints(): number {
        return this.hungerPoints;
    }

    @handleIncorrectValues
    public setHungerPoints(newHungerPoints: number) {
        this.hungerPoints = newHungerPoints;
    }

    private computeEmotion() {
        if (!this.hungerPoints && !this.healthPoints) {
            return Emotions.NONE;
        }

        if (this.healthPoints >= 80 && this.hungerPoints >= 80) {
            return Emotions.HAPPY;
        }

        if (this.healthPoints <= 40 && this.hungerPoints > 10) {
            return Emotions.AFRAID;
        }

        if (this.hungerPoints > 10 && this.hungerPoints <= 30) {
            return Emotions.SAD;
        }

        if (
            this.healthPoints > 20 &&
            this.healthPoints < 70 &&
            this.hungerPoints > 30 &&
            this.hungerPoints < 70
        ) {
            return Emotions.BORED;
        }

        if (this.healthPoints <= 10) {
            return Emotions.SICK;
        }

        if (this.healthPoints >= 70 && this.hungerPoints >= 70) {
            return Emotions.HORNY;
        }

        if (this.hungerPoints <= 10) {
            return Emotions.ANGRY;
        }

        return EntityConfig.DEFAULT_EMOTION;
    }

    private entityLife() {
        if (!this.isAlive) {
            this.interval && clearInterval(this.interval);
            this.interval = null;

            return;
        }

        if (
            this.hungerPoints > EntityConfig.GOOD_HUNGER_VALUE &&
            this.healthPoints < EntityConfig.DEFAULT_HEALTH_POINTS
        ) {
            this.setHealthPoints(
                this.healthPoints + EntityConfig.HEALTH_LOOSE_SPEED,
            );

            this.updateEmotion();

            return;
        }

        if (
            this.hungerPoints > 0 &&
            this.healthPoints > EntityConfig.MIN_GOOD_HEALTH_POINTS_VALUE
        ) {
            this.setHungerPoints(
                this.hungerPoints - EntityConfig.STARVING_SPEED,
            );

            this.updateEmotion();

            return;
        }

        if (this.healthPoints > 0) {
            const decreaseValue =
                this.healthPoints < EntityConfig.MIN_GOOD_HEALTH_POINTS_VALUE
                    ? EntityConfig.DYING_SPEED
                    : EntityConfig.HEALTH_LOOSE_SPEED;

            this.setHealthPoints(this.healthPoints - decreaseValue);

            this.updateEmotion();

            return;
        }

        if (!this.healthPoints) {
            this.emotion = Emotions.NONE;
            this.isAlive = false;
            this.interval && clearInterval(this.interval);
            this.interval = null;

            return;
        }

        this.updateEmotion();
    }
}

export default LivingEntity;

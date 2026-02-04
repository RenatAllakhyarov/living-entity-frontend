import { EntityConfig } from "@config/EntityConfig";
import { Emotions } from "@utils/constants";

function handleIncorrectValues(
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
) {
    const original = descriptor.value;

    descriptor.value = function (newValue: number) {
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
    private isAlive: boolean;

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

        setInterval(() => {
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

    public setEmotion() {
        this.emotion = this.computeEmotion();
    }

    public getHungerPoints(): number {
        return this.hungerPoints;
    }

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
            return;
        }

        if (
            this.hungerPoints > EntityConfig.GOOD_HUNGER_VALUE &&
            this.healthPoints < EntityConfig.DEFAULT_HEALTH_POINTS
        ) {
            this.setHealthPoints(
                Math.min(
                    this.healthPoints + EntityConfig.HEALTH_LOOSE_SPEED,
                    EntityConfig.DEFAULT_HEALTH_POINTS,
                ),
            );

            this.setEmotion();
            
            return;
        }

        if (
            this.hungerPoints > 0 &&
            this.healthPoints > EntityConfig.MIN_GOOD_HEALTH_POINTS_VALUE
        ) {
            this.setHungerPoints(
                Math.max(0, this.hungerPoints - EntityConfig.STARVING_SPEED),
            );
            
            this.setEmotion();
            
            return;
        }

        if (this.healthPoints > 0) {
            const decreaseValue =
                this.healthPoints < EntityConfig.MIN_GOOD_HEALTH_POINTS_VALUE
                    ? EntityConfig.DYING_SPEED
                    : EntityConfig.HEALTH_LOOSE_SPEED;

            this.setHealthPoints(
                Math.max(0, this.healthPoints - decreaseValue),
            );
            
            this.setEmotion();
            
            return;
        }

        if (!this.healthPoints) {
            this.emotion = Emotions.NONE;
            this.isAlive = false;
            
            return;
        }

        this.setEmotion();
    }
}

export default LivingEntity;

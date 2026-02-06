import { EntityConfig } from "@config/EntityConfig";
import { Emotions, LifeState } from "@utils/constants";

export interface IStateEntity {
    onEntry?: () => void;
    onTick?: () => void;
}

function preventMaxExceed<T>(
    value: Function,
    context: ClassMethodDecoratorContext,
) {
    return function (this: T, ...methodArguments: any[]) {
        if (typeof methodArguments[0] !== "number") {
            return;
        }

        if (methodArguments[0] > EntityConfig.MAX_POINTS_VALUE) {
            methodArguments[0] = EntityConfig.MAX_POINTS_VALUE;
        }

        return value.apply(this, methodArguments);
    };
}

function preventNegativeValues<T>(
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

        return value.apply(this, methodArguments);
    };
}

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
    private state: LifeState;
    // private emotion: Emotions | LifeStatus;
    // private lifeStatus: LifeStatus;

    constructor(
        name: string,
        healthPoints?: number,
        emotion?: Emotions | LifeStatus,
        hungerPoints?: number,
    ) {
        this.name = name;
        this.healthPoints = healthPoints ?? EntityConfig.DEFAULT_HEALTH_POINTS;
        this.emotion = emotion ?? EntityConfig.DEFAULT_EMOTION;
        this.hungerPoints = hungerPoints ?? EntityConfig.DEFAULT_HUNGER_POINTS;
        this.createdAt = Date.now();
        this.state = LifeState.STARVING;

        this.entityLife();
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string): void {
        this.name = newName;
    }

    public getAge(): number {
        return Date.now() - this.createdAt;
    }

    public getHealthPoints(): number {
        return this.healthPoints;
    }

    @preventMaxExceed
    @preventNegativeValues
    public setHealthPoints(newHealthPoints: number): void {
        this.healthPoints = newHealthPoints;
    }

    public getEmotion(): Emotions | LifeStatus {
        return this.emotion;
    }

    public setEmotion(newEmotion: Emotions | LifeStatus) {
        this.emotion = newEmotion;
    }

    public getHungerPoints(): number {
        return this.hungerPoints;
    }

    @preventMaxExceed
    @preventNegativeValues
    public setHungerPoints(newHungerPoints: number): void {
        this.hungerPoints = newHungerPoints;
    }

    private computeEmotion(): Emotions {
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

    private computeState(): LifeState {
        if (this.healthPoints <= 0) {
            return LifeState.DEAD;
        }

        if (
            this.hungerPoints > EntityConfig.GOOD_HUNGER_VALUE &&
            this.healthPoints < EntityConfig.DEFAULT_HEALTH_POINTS
        ) {
            return LifeState.REGENERATION;
        }

        if (
            this.hungerPoints > 0 &&
            this.healthPoints > EntityConfig.MIN_GOOD_HEALTH_POINTS_VALUE
        ) {
            return LifeState.STARVING;
        }

        return LifeState.DYING;
    }

    private stateMachine: Record<LifeState, IStateEntity> = {
        [LifeState.REGENERATION]: {
            onTick: () => {
                this.setHealthPoints(
                    this.healthPoints + EntityConfig.REGENERATION_SPEED,
                );
            },
        },

        [LifeState.STARVING]: {
            onTick: () => {
                this.setHungerPoints(
                    this.hungerPoints - EntityConfig.STARVING_SPEED,
                );
            },
        },

        [LifeState.DYING]: {
            onTick: () => {
                const decreaseValue =
                    this.healthPoints <
                    EntityConfig.MIN_GOOD_HEALTH_POINTS_VALUE
                        ? EntityConfig.DYING_SPEED
                        : EntityConfig.HEALTH_LOOSE_SPEED;

                this.setHealthPoints(this.healthPoints - decreaseValue);
            },
        },

        [LifeState.DEAD]: {
            onEntry: () => {
                this.emotion = Emotions.NONE;
            },
        },
    };

    private tick(): void {
        const nextState = this.computeState();

        if (nextState !== this.state) {
            this.state = nextState;

            this.stateMachine[this.state].onEntry?.();
        }

        this.stateMachine[this.state].onTick?.();

        this.setEmotion(this.computeEmotion());
    }

    private entityLife() {
        const interval = setInterval(() => {
            if (!this.healthPoints) {
                clearInterval(interval);

                return;
            }

            this.tick();
        }, EntityConfig.LIVING_INTERVAL);
    }
}

export default LivingEntity;

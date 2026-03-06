import { Emotions, EntityState, LifeState } from "@utils/constants";
import { EntityConfig } from "@config/EntityConfig";

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

class LivingEntity {
    private name: string;
    private createdAt: number;
    private hungerPoints: number;
    private healthPoints: number;
    private state: LifeState;
    private emotion: Emotions;

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

    public getEmotion(): Emotions {
        return this.emotion;
    }

    public setEmotion(newEmotion: Emotions) {
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

    public getState(): LifeState {
        return this.state;
    }

    public getAllState(): EntityState {
        return {
            name: this.getName(),
            hungerPoints: this.getHungerPoints(),
            healthPoints: this.getHealthPoints(),
            emotion: this.getEmotion(),
            state: this.getState(),
        };
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
            this.hungerPoints >= EntityConfig.GOOD_HUNGER_VALUE &&
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

                this.setHungerPoints(
                    this.hungerPoints - EntityConfig.STARVING_SPEED,
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
            return;
        }

        this.stateMachine[this.state].onTick?.();

        this.setEmotion(this.computeEmotion());
    }

    private entityLife() {
        const interval = setInterval(() => {
            if (this.state === LifeState.DEAD) {
                clearInterval(interval);

                return;
            }

            this.tick();
        }, EntityConfig.LIVING_INTERVAL);
    }
}

export default LivingEntity;

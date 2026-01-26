import LivingEntity from "@domains/LivingEntity";

export const LIVING_INTERVAL = 1000;

export const DECREASE_HUNGRY_POINTS = 5;
export const INCREASE_HUNGRY_POINTS = 5;

class EntityLifeCycle {
    public entity: LivingEntity;

    constructor(entity: LivingEntity) {
        this.entity = entity;

        setInterval(() => {
            this.starvation()
        }, LIVING_INTERVAL);
    }

    public starvation(): void {
        this.entity.decreaseHungryPoints(DECREASE_HUNGRY_POINTS);
    }
}

export default EntityLifeCycle;

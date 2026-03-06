import LivingEntity from "@domains/LivingEntity";
import { EntityState, LifeState } from "@utils/constants";
import { EntityConfig } from "@config/EntityConfig";

function preventActionOnDeadEntity<T>(
    value: Function,
    context: ClassMethodDecoratorContext,
): any {
    return function (this: LivingEntityController, ...methodArguments: any[]) {
        if (this.getEntity().getState() === LifeState.DEAD) {
            throw new Error("Entity is dead");
        }

        return value.apply(this, methodArguments);
    };
}

class LivingEntityController {
    private entity: LivingEntity;

    constructor(entity: LivingEntity) {
        this.entity = entity;
    }

    public getEntity() {
        return this.entity;
    }

    @preventActionOnDeadEntity
    public feed() {
        const hungerPoints = this.entity.getHungerPoints();
        if (hungerPoints >= EntityConfig.GOOD_HUNGER_VALUE) {
            return;
        }

        this.entity.setHungerPoints(
            hungerPoints + EntityConfig.HUNGER_RESTORE_POINTS,
        );
    }

    @preventActionOnDeadEntity
    public cure() {
        const healthPoints = this.entity.getHealthPoints();
        if (healthPoints >= EntityConfig.GOOD_HEALTH_VALUE) {
            return;
        }

        this.entity.setHealthPoints(
            healthPoints + EntityConfig.HEALTH_RESTORE_POINTS,
        );
    }

    public static changeName(
        setName: (newName: string) => void,
        newName: string,
    ) {
        setName(newName);
    }

    public static shouldUpdate(oldState: EntityState, newState: EntityState) {
        return (
            oldState.name !== newState.name ||
            oldState.hungerPoints !== newState.hungerPoints ||
            oldState.healthPoints !== newState.healthPoints ||
            oldState.emotion !== newState.emotion ||
            oldState.state !== newState.state
        );
    }
}

export default LivingEntityController;

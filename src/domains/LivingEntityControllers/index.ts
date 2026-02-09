import LivingEntity from "@domains/LivingEntity";
import { EntityConfig } from "@config/EntityConfig";
import { LifeState } from "@utils/constants";

export const INCREASE_VALUE = 20;

function isEntityDead<T>(
    value: Function,
    context: ClassMethodDecoratorContext,
) {
    return function (this: T, ...methodArguments: any[]) {
        if (typeof methodArguments[0] !== "object") {
            return;
        }

        if (methodArguments[0] === LifeState.DEAD) {
            return;
        }

        return value.apply(this, methodArguments);
    };
}

class LivingEntityControllers {
    @isEntityDead
    public static feed(entity: LivingEntity) {
        if (entity.getHungerPoints() >= EntityConfig.GOOD_HUNGER_VALUE) {
            return;
        }

        entity.setHungerPoints(entity.getHungerPoints() + INCREASE_VALUE);
    }

    @isEntityDead
    public static cure(entity: LivingEntity) {
        if (entity.getHealthPoints() >= EntityConfig.GOOD_HEALTH_VALUE) {
            return;
        }

        entity.setHealthPoints(entity.getHealthPoints() + INCREASE_VALUE);
    }

    @isEntityDead
    public static changeName(entity: LivingEntity, newName: string) {
        entity.setName(newName);
    }
}

export default LivingEntityControllers;

import LivingEntity from "@domains/LivingEntity";
import { EntityConfig } from "@config/EntityConfig";
import { LifeState } from "@utils/constants";

export const INCREASE_VALUE = 20;

class LivingEntityControllers {
    public static feed(entity: LivingEntity) {
        if (entity.getState() === LifeState.DEAD) {
            return;
        }

        if (entity.getHungerPoints() >= EntityConfig.GOOD_HUNGER_VALUE) {
            throw new Error("Your entity is not hungry!");
        }

        entity.setHungerPoints(entity.getHungerPoints() + INCREASE_VALUE);
    }

    public static cure(entity: LivingEntity) {
        if (entity.getState() === LifeState.DEAD) {
            return;
        }

        if (entity.getHealthPoints() >= EntityConfig.GOOD_HEALTH_VALUE) {
            throw new Error("Your entity is feeling well");
        }

        entity.setHealthPoints(entity.getHealthPoints() + INCREASE_VALUE);
    }

    public static changeName(entity: LivingEntity, newName: string) {
        if (entity.getState() === LifeState.DEAD) {
            return;
        }

        entity.setName(newName);
    }
}

export default LivingEntityControllers;

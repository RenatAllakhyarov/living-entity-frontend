import LivingEntity, {
} from "@domains/LivingEntity";

export const MEAT_COUNT = 20;

class LifeEntityActions {
    public static feed(entity: LivingEntity) {
        entity.increaseHungryPoints(MEAT_COUNT);
    }
}

export default LifeEntityActions;

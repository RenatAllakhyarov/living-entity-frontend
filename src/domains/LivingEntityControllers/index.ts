import { EntityConfig } from "@config/EntityConfig";
import { LifeState } from "@utils/constants";

function preventActionOnDeadEntity<T>(
    value: Function,
    context: ClassMethodDecoratorContext,
): any {
    return function (this: T, ...methodArguments: any[]) {
        if (methodArguments[0].state === LifeState.DEAD) {
            throw new Error("Entity is dead");
        }

        return value.apply(this, methodArguments);
    };
}

class LivingEntityControllers {
    @preventActionOnDeadEntity
    public static feed(
        getHungerPoints: () => number,
        setHungerPoints: (newHungerPoints: number) => void,
    ) {
        if (getHungerPoints() >= EntityConfig.GOOD_HUNGER_VALUE) {
            return;
        }

        setHungerPoints(getHungerPoints() + EntityConfig.RESTORE_VALUE);
    }

    @preventActionOnDeadEntity
    public static cure(
        getHealthPoints: () => number,
        setHealthPoints: (newHealthPoints: number) => void,
    ) {
        if (getHealthPoints() >= EntityConfig.GOOD_HEALTH_VALUE) {
            return;
        }

        setHealthPoints(getHealthPoints() + EntityConfig.RESTORE_VALUE);
    }

    @preventActionOnDeadEntity
    public static changeName(
        setName: (newName: string) => void,
        newName: string,
    ) {
        setName(newName);
    }
}

export default LivingEntityControllers;

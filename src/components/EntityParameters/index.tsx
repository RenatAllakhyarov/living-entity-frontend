import LivingEntity from "@domains/LivingEntity";
import { ReactElement, useEffect, useState } from "react";
import { EntityConfig } from "@config/EntityConfig";
import { LifeState } from "@utils/constants";
import "./style.css";

interface IEntityParamsProps {
    entity: LivingEntity;
}

const EntityParameters = ({ entity }: IEntityParamsProps): ReactElement => {
    const [entityState, setEntityState] = useState({
        name: entity.getName(),
        hungerPoints: entity.getHungerPoints(),
        healthPoints: entity.getHealthPoints(),
        emotion: entity.getEmotion(),
        state: entity.getState(),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (entityState.name !== entity.getName()) {
                setEntityState((previous) => ({
                    ...previous,
                    name: entity.getName(),
                }));
            }

            if (entityState.state !== entity.getState()) {
                setEntityState((previous) => ({
                    ...previous,
                    state: entity.getState(),
                }));
            }

            setEntityState((previous) => ({
                ...previous,
                hungerPoints: entity.getHungerPoints(),
                healthPoints: entity.getHealthPoints(),
                emotion: entity.getEmotion(),
            }));
        }, EntityConfig.LIVING_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="entity-data">
            <div className="entity-parameters">
                <div
                    className="entity-parameter"
                    style={{
                        background: `linear-gradient(to right, red ${entityState.hungerPoints}%, transparent ${entityState.hungerPoints}%)`,
                    }}
                >
                    HUNGER: {entityState.hungerPoints}
                </div>
                <div className="entity-parameter">{entityState.name}</div>
                <div
                    className="entity-parameter"
                    style={{
                        background: `linear-gradient(to right, brown ${entityState.healthPoints}%, transparent ${entityState.healthPoints}%)`,
                    }}
                >
                    HEALTH: {entityState.healthPoints}
                </div>
            </div>
            <div className="entity-emotion">
                {entityState.state !== LifeState.DEAD && entityState.emotion}
                {entityState.state === LifeState.DEAD && LifeState.DEAD}
            </div>
        </div>
    );
};

export default EntityParameters;

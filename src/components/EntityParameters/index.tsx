import LivingEntity from "@domains/LivingEntity";
import EntityEmotion from "@components/EntityEmotion";
import LivingEntityController from "@domains/LivingEntityController";
import { CSSProperties, type ReactElement, useEffect, useState } from "react";
import { EntityConfig } from "@config/EntityConfig";
import { EntityState } from "@utils/constants";
import "./style.css";

interface IEntityParamsProps {
    entity: LivingEntity;
}

const EntityParameters = ({ entity }: IEntityParamsProps): ReactElement => {
    const [entityState, setEntityState] = useState(entity.getAllState());

    const computeEntityNextState = (
        previousState: EntityState,
        entity: LivingEntity,
    ): EntityState => {
        const nextState: EntityState = entity.getAllState();

        const isChanged = LivingEntityController.shouldUpdate(
            previousState,
            nextState,
        );

        if (isChanged) {
            return nextState;
        }

        return previousState;
    };

    const hungerParameterBackground: CSSProperties = {
        background: `linear-gradient(to right, red ${entityState.hungerPoints}%, transparent ${entityState.hungerPoints}%)`,
    };

    const healthParameterBackground: CSSProperties = {
        background: `linear-gradient(to right, brown ${entityState.healthPoints}%, transparent ${entityState.healthPoints}%)`,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setEntityState((previous) =>
                computeEntityNextState(previous, entity),
            );
        }, EntityConfig.LIVING_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="entity-data">
            <div className="entity-parameters">
                <div
                    className="entity-parameter"
                    style={hungerParameterBackground}
                >
                    HUNGER: {entityState.hungerPoints}
                </div>
                <div className="entity-parameter">{entityState.name}</div>
                <div
                    className="entity-parameter"
                    style={healthParameterBackground}
                >
                    HEALTH: {entityState.healthPoints}
                </div>
            </div>
            <EntityEmotion
                emotion={entityState.emotion}
                state={entityState.state}
            />
        </div>
    );
};

export default EntityParameters;

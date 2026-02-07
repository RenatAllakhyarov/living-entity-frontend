import LivingEntity from "@domains/LivingEntity";
import { ReactElement, useEffect, useState } from "react";
import "./style.css";

interface IEntityParamsProps {
    entity: LivingEntity;
}

const EntityParameters = ({ entity }: IEntityParamsProps): ReactElement => {
    const [name, setName] = useState(entity.getName());
    const [hungerPoints, setHungerPoints] = useState(entity.getHungerPoints());
    const [healthPoints, setHealthPoints] = useState(entity.getHealthPoints());
    const [emotion, setEmotion] = useState(entity.getEmotion());

    useEffect(() => {
        const interval = setInterval(() => {
            setName(entity.getName());
            setHungerPoints(entity.getHungerPoints());
            setHealthPoints(entity.getHealthPoints());
            setEmotion(entity.getEmotion());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="entity-data">
            <div className="entity-parameters">
                <div
                    className="entity-parameter"
                    style={{
                        background: `linear-gradient(to right, red ${hungerPoints}%, transparent ${hungerPoints}%)`,
                    }}
                >
                    HUNGER: {hungerPoints}
                </div>
                <div className="entity-parameter">{name}</div>
                <div
                    className="entity-parameter"
                    style={{
                        background: `linear-gradient(to right, brown ${healthPoints}%, transparent ${healthPoints}%)`,
                    }}
                >
                    HEALTH: {healthPoints}
                </div>
            </div>
            <div className="entity-emotion">{emotion}</div>
        </div>
    );
};

export default EntityParameters;

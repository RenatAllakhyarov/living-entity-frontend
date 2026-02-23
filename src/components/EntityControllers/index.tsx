import LivingEntity from "@domains/LivingEntity";
import EntityNameEditor from "@components/EntityNameEditor";
import LivingEntityControllers from "@domains/LivingEntityControllers";
import { type ReactElement } from "react";
import "./style.css";

interface IEntityControllerProps {
    entity: LivingEntity;
}

const EntityControllers = ({
    entity,
}: IEntityControllerProps): ReactElement => {
    const handleFeedEntity = () => {
        LivingEntityControllers.feed(
            () => entity.getHungerPoints(),
            (newHungerPoints) => entity.setHungerPoints(newHungerPoints),
        );
    };

    const handleCureEntity = () => {
        LivingEntityControllers.cure(
            () => entity.getHealthPoints(),
            (newHealthPoints) => entity.setHealthPoints(newHealthPoints),
        );
    };

    return (
        <div className="entity-controllers">
            <div className="entity-controller">
                <button onClick={handleFeedEntity}>FEED</button>
            </div>
            <div className="entity-controller">
                <button onClick={handleCureEntity}>CURE</button>
            </div>
            <div className="entity-controller">
                <EntityNameEditor
                    initialName={entity.getName()}
                    onSubmit={(newName) => entity.setName(newName)}
                />
            </div>
        </div>
    );
};

export default EntityControllers;

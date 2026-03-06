import LivingEntity from "@domains/LivingEntity";
import EntityNameEditor from "@components/EntityNameEditor";
import LivingEntityController from "@domains/LivingEntityController";
import { type ReactElement } from "react";
import "./style.css";

interface IEntityControllerProps {
    entity: LivingEntity;
}

const EntityController = ({
    entity,
}: IEntityControllerProps): ReactElement => {
    const entityController = new LivingEntityController(entity)

    const handleFeedEntity = () => {
        entityController.feed()
    };

    const handleCureEntity = () => {
        entityController.cure()
    };

    return (
        <div className="entity-controller-section">
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

export default EntityController;

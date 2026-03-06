import LivingEntity from "@domains/LivingEntity";
import EntityNameEditor from "@components/EntityNameEditor";
import LivingEntityController from "@domains/LivingEntityController";
import { useMemo, type ReactElement } from "react";
import "./style.css";

interface IEntityControllerProps {
    entity: LivingEntity;
}

const EntityController = ({ entity }: IEntityControllerProps): ReactElement => {
    const entityController = useMemo(
        () => new LivingEntityController(entity),
        [],
    );

    return (
        <div className="entity-controller-section">
            <div className="entity-controller">
                <button onClick={() => entityController.feed()}>FEED</button>
            </div>
            <div className="entity-controller">
                <button onClick={() => entityController.cure()}>CURE</button>
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

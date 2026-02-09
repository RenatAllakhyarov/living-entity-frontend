import LivingEntity from "@domains/LivingEntity";
import LivingEntityControllers from "@domains/LivingEntityControllers";
import { type ChangeEvent, type ReactElement, useState } from "react";
import "./style.css";

interface IEntityControllerProps {
    entity: LivingEntity;
}

const EntityControllers = ({
    entity,
}: IEntityControllerProps): ReactElement => {
    const [newName, setNewName] = useState("");
    const [isNameChangingOpened, setIsNameChangingOpened] = useState(false);

    const handleFeedEntity = () => {
        LivingEntityControllers.feed(entity);
    };

    const handleCureEntity = () => {
        LivingEntityControllers.cure(entity);
    };

    const handleNameChange = () => {
        if (entity.getName() === newName || newName === "") {
            setIsNameChangingOpened(false);

            return;
        }

        LivingEntityControllers.changeName(entity, newName);

        setIsNameChangingOpened(false);
    };

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === entity.getName()) {
            return;
        }

        setNewName(event.target.value);
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
                {!isNameChangingOpened && (
                    <button
                        onClick={() => {
                            setIsNameChangingOpened(true);
                        }}
                    >
                        CHANGE NAME
                    </button>
                )}

                {isNameChangingOpened && (
                    <div className="changing-name">
                        <input
                            type="text"
                            value={newName}
                            onChange={handleTextChange}
                            autoFocus
                        />
                        <button onClick={handleNameChange}>submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EntityControllers;

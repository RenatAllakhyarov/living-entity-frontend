import LivingEntity from "@domains/LivingEntity";
import LivingEntityControllers from "@domains/LivingEntityControllers";
import { ChangeEvent, type ReactElement, useState } from "react";
import "./style.css";

interface IEntityControllerProps {
    entity: LivingEntity;
}

const EntityControllers = ({
    entity,
}: IEntityControllerProps): ReactElement => {
    const [isOpened, setIsOpened] = useState(false);
    const [newName, setNewName] = useState("");

    const handleFeedEntity = () => {
        LivingEntityControllers.feed(entity);
    };

    const handleCureEntity = () => {
        LivingEntityControllers.cure(entity);
    };

    const handleNameChange = () => {
        if (entity.getName() === newName || newName === "") {
            setIsOpened(false);

            return;
        }

        LivingEntityControllers.changeName(entity, newName);

        setIsOpened(false);
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
                {!isOpened && (
                    <button
                        onClick={() => {
                            setIsOpened(true);
                        }}
                    >
                        CHANGE NAME
                    </button>
                )}

                {isOpened && (
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

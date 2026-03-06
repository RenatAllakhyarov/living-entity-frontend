import LivingEntityController from "@domains/LivingEntityController";
import { useState, type ChangeEvent, type ReactElement } from "react";

interface IEntityNameEditorProps {
    initialName: string;
    onSubmit: (newName: string) => void;
}

const EntityNameEditor = ({
    initialName,
    onSubmit,
}: IEntityNameEditorProps): ReactElement => {
    const [newName, setNewName] = useState(initialName);
    const [isNameChangingOpened, setIsNameChangingOpened] = useState(false);

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === initialName) {
            return;
        }

        setNewName(event.target.value);
    };

    const handleNameChange = () => {
        if (initialName === newName || !newName) {
            setIsNameChangingOpened(false);

            return;
        }

        LivingEntityController.changeName(onSubmit, newName);

        setIsNameChangingOpened(false);
    };

    if (!isNameChangingOpened) {
        return (
            <button
                className="name-editor-toggle"
                onClick={() => {
                    setIsNameChangingOpened(true);
                }}
            >
                CHANGE NAME
            </button>
        );
    }

    return (
        <div className="name-editor">
            <input
                className="name-editor-input"
                type="text"
                value={newName}
                onChange={handleTextChange}
                autoFocus
            />
            <button className="name-editor-submit" onClick={handleNameChange}>
                submit
            </button>
        </div>
    );
};

export default EntityNameEditor;

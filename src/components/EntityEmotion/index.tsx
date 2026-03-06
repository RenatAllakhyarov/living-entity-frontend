import { Emotions, LifeState } from "@utils/constants";
import { type ReactElement } from "react";
import "./style.css";

interface IEntityEmotionProps {
    emotion: Emotions;
    state: LifeState;
}

const EntityEmotion = ({
    state,
    emotion,
}: IEntityEmotionProps): ReactElement => {
    if (state === LifeState.DEAD) {
        return <div className="entity-emotion">{LifeState.DEAD}</div>;
    }

    return <div className="entity-emotion">{emotion}</div>;
};

export default EntityEmotion;

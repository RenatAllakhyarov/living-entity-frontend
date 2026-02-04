import LivingEntity from "@domains/LivingEntity";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import "./style.css";

const App = (): ReactElement => {
    const testEntity = useMemo(() => new LivingEntity("MotherFucker"), []);

    const [state, setState] = useState({
        hungerPoints: testEntity.getHungerPoints(),
        healthPoints: testEntity.getHealthPoints(),
        emotion: testEntity.getEmotion(),
    });

    const handleChange = () => {
        console.log("FEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEED");
    };

    useEffect(() => {
        console.log("REREEEEEENDEEEER");
        const interval = setInterval(() => {
            setState({
                hungerPoints: testEntity.getHungerPoints(),
                healthPoints: testEntity.getHealthPoints(),
                emotion: testEntity.getEmotion(),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div>HUNGER: {state.hungerPoints}</div>
            <div>HEALTH: {state.healthPoints}</div>
            <div>EMOTION: {state.emotion}</div>
            {/* <button onClick={handleChange}>FEED</button> */}
        </div>
    );
};

export default App;

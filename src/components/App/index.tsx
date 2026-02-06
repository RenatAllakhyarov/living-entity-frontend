import LivingEntity from "@domains/LivingEntity";
import { useEffect, useMemo, useState, type ReactElement } from "react";
// import EntityControllers from "@components/EntityControllers";
// import EntityParameters from "@components/EntityParameters";
import "./style.css";

const App = (): ReactElement => {
    const testEntity = useMemo(() => new LivingEntity("MotherFucker"), []);
 
    return (
        <div className="page">
            {/* <EntityParameters entity={testEntity}/>
            <EntityControllers entity={testEntity}/> */}
        </div>
    );
};

export default App;

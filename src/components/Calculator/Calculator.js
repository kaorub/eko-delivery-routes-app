import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import GraphBuilder from "../GraphBuilder/GraphBuilder";
import CostCalculator from "../CostCalculator/CostCalculator";
import RouteCasesCalculator from "../RouteCasesCalculator/RouteCasesCalculator";

function Calculator() {
    const [calc, setCalc] = useState(null);

    return (
        <Grid container spacing={2} className="Calculator">
            <GraphBuilder onBuild={setCalc}/>
            {calc && <CostCalculator calc={calc}/>}
            {calc && <RouteCasesCalculator calc={calc}/>}
        </Grid>
    );
}
export default Calculator;

import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import {NO_SUCH_ROUTE_ERROR} from "../../common/constants";

function CostCalculator({ calc }) {
    const [route, setRoute] = useState('A-B-E');
    const [cost, setCost] = useState(0);
    const [err, setErr] = useState('');

    const calculateCostForRoute = () => {
        const cost = calc.calculateCost(route)
        if (cost === -1) {
            setErr(NO_SUCH_ROUTE_ERROR)
        }
        setCost(cost)
    }

    const handleRouteChange = (event) => {
        setRoute(event.target.value)
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor="component-route">Route</InputLabel>
                    <Input
                        id="component-route"
                        value={route}
                        onChange={handleRouteChange}
                        aria-describedby="component-route-helper-text"
                    />
                    <FormHelperText id="component-route-helper-text">Input route i.e. 'AB1'</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => { calculateCostForRoute(route) }}>
                    Find cost for route
                </Button>
            </Grid>
            <Grid item xs={12}>
                {cost && <Paper variant="outlined" >
                    Cost: { cost }
                </Paper>}
                {err && <Paper variant="outlined" >
                    Error: { err }
                </Paper>}
            </Grid>
        </React.Fragment>
    );
}

export default CostCalculator;

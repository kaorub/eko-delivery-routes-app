import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

function RouteCasesCalculator({ calc }) {
    const [path, setPath] = useState('ED');
    const [cases, setCases] = useState(0);

    const calculateCasesForPath = () => {
        const [START, FINISH] = path
        const count = calc.run(START, FINISH, {})
        setCases(count)
    }

    const handlePathChange = (event) => {
        setPath(event.target.value)
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor="component-cases">Route</InputLabel>
                    <Input
                        id="component-cases"
                        value={path}
                        onChange={handlePathChange}
                        aria-describedby="component-cases-helper-text"
                    />
                    <FormHelperText id="component-cases-helper-text">Input path which cases are looking for</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => { calculateCasesForPath(path) }}
                    disabled={!calc}
                >
                    Calculate possible routes
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Paper variant="outlined" >
                    Possible routes count: { cases }
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default RouteCasesCalculator;

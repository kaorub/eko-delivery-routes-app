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
    const [condition, setCondition] = useState('{}');
    const [err, setErr] = useState('');

    const calculateCasesForPath = () => {
        try {
            const parsed = JSON.parse(JSON.stringify(condition))
            const [START, FINISH] = path
            const count = calc.run(START, FINISH, parsed)
            setCases(count)
        } catch (err) {
            setErr('Parsing the condition failed: ' + err)
        }
    }

    const handlePathChange = (event) => {
        setErr('')
        setPath(event.target.value)
    }

    const handleConditionChange = (event) => {
        setErr('')
        setCondition(event.target.value)
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
                <FormControl>
                    <InputLabel htmlFor="component-conditions">Conditions in JSON</InputLabel>
                    <Input
                        id="component-conditions"
                        value={condition}
                        onChange={handleConditionChange}
                        aria-describedby="component-conditions-helper-text"
                    />
                    <FormHelperText id="component-conditions-helper-text">
                        Input conditions on JSON format with parameters limitCost, limitStops, isRoundTrack, canRepeat }"
                    </FormHelperText>
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
                {cases && <Paper variant="outlined" >
                    Possible routes count: { cases }
                </Paper>}
                {err && <Paper variant="outlined" >
                    Error: { err }
                </Paper>}
            </Grid>
        </React.Fragment>
    );
}

export default RouteCasesCalculator;

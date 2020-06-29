import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Calc } from '../../common/utils';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function GraphBuilder({ onBuild }) {
    const [edges, setEdges] = useState('AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1');
    const [buildingResult, setBuildingResult] = useState(null);

    const setUpGraphStructure = () => {
        const calc = new Calc({ edges })
        setBuildingResult('Graph was build successfully')
        onBuild(calc)
    }

    const handleEdgesChange = (event) => {
        setEdges(event.target.value)
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor="component-edges">Edges</InputLabel>
                    <Input
                        id="component-edges"
                        multiline={true}
                        value={edges}
                        rows={3}
                        rowsMax={3}
                        autoFocus
                        onChange={handleEdgesChange}
                        aria-describedby="component-edges-helper-text"
                    />
                    <FormHelperText id="component-edges-helper-text">Input edges divided by ',' in a string</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => { setUpGraphStructure(edges) }}>
                    Set up graph from edges
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Paper variant="outlined" >
                    { buildingResult }
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default GraphBuilder;

import React from 'react';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import PlayerGlobalStatisticsTab from "./PlayerGlobalStatisticsTab";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function PlayerGlobalStatistics(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{width: '100%', marginTop: 20}}>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="За все время" id='global-statistics-tab-0' />
                    <Tab label="За месяц" id='global-statistics-tab-1' />
                </Tabs>
            </Paper>

            <TabPanel value={value} index={0}>
                <PlayerGlobalStatisticsTab statistics={props.statistics.global}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PlayerGlobalStatisticsTab statistics={props.statistics.month}/>
            </TabPanel>
        </div>
    );
}
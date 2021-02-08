import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import {Grid} from "@material-ui/core";
import PlayerSegmentsStatisticsTab from "./PlayerSegmentsStatisticsTab";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function PlayerSegmentsStatistics(props) {
    const statistics = props.statistics;
    const classes = useStyles();
    const [segmentsValue, setSegmentsValue] = React.useState(0);
    const [value, setValue] = React.useState(0);

    const handleSegmentsChange = (event, newValue) => {
        setSegmentsValue(newValue);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div style={{width: '100%', marginTop: 20}}>
                <Paper>
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

                <GlobalTabPanel value={value} index={0}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={segmentsValue}
                                onChange={handleSegmentsChange}
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
                            >
                                {statistics.global.segments.map((segment, i) => {
                                    return (
                                        <Tab key={`global-${i}-tab`} label={segment.label} {...setProperties(i)} />
                                    );
                                })}
                            </Tabs>
                        </Grid>
                        <Grid item xs={9}>
                            {statistics.global.segments.map((segment, i) => {
                                return (
                                    <TabPanel key={`global-${i}-tab-panel`} value={segmentsValue} index={i}>
                                        <PlayerSegmentsStatisticsTab segment={segment}/>
                                    </TabPanel>
                                );
                            })}
                        </Grid>
                    </Grid>
                </GlobalTabPanel>
                <GlobalTabPanel value={value} index={1}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={segmentsValue}
                                onChange={handleSegmentsChange}
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
                            >
                                {statistics.month.segments.map((segment, i) => {
                                    return (<Tab key={`month-${i}-tab`} label={segment.label} {...setProperties(i)} />);
                                })}
                            </Tabs>
                        </Grid>
                        <Grid item xs={9}>
                            {statistics.month.segments.map((segment, i) => {
                                return (
                                    <TabPanel key={`month-${i}-tab-panel`} value={segmentsValue} index={i}>
                                        <PlayerSegmentsStatisticsTab segment={segment}/>
                                    </TabPanel>
                                );
                            })}
                        </Grid>
                    </Grid>
                </GlobalTabPanel>
            </div>
        </div>
    );
}

function setProperties(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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

function GlobalTabPanel(props) {
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

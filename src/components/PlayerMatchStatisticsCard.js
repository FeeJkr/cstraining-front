import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
    },
    pos: {
        marginTop: 12,
        marginBottom: 6,
        textAlign: 'center',
        fontSize: 14,
    },
});

export default function PlayerMatchStatisticsCard(props) {
    const classes = useStyles();
    const statistics = props.statistics;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.title}
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                    Средний рейтинг
                </Typography>
                <Typography variant="h6" component="h3" style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {statistics.averageKd}
                </Typography>
                <Grid container style={{marginTop: 12}} alignItems="center">
                    <Grid item md>
                        <Typography className={classes.pos} color="textSecondary">
                            Побед
                        </Typography>
                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                            {statistics.wins}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item md>
                        <Typography className={classes.pos} color="textSecondary">
                            Поражений
                        </Typography>
                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                            {statistics.loses}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item md>
                        <Typography className={classes.pos} color="textSecondary">
                            Всего
                        </Typography>
                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                            {statistics.total}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
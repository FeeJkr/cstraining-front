import React from 'react';
import {Grid} from "@material-ui/core";
import PlayerMatchStatisticsCard from "./PlayerMatchStatisticsCard";

export default function PlayerMatchesStatistics(props) {
    const today = props.today;
    const yesterday = props.yesterday;
    const month = props.month;

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item sm={4}>
                    <PlayerMatchStatisticsCard statistics={today} title='Сегодня'/>
                </Grid>
                <Grid item sm={4}>
                    <PlayerMatchStatisticsCard statistics={yesterday} title='Вчера'/>
                </Grid>
                <Grid item sm={4}>
                    <PlayerMatchStatisticsCard statistics={month} title='За последний месяц'/>
                </Grid>
            </Grid>
        </div>
    );
}
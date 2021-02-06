import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export default function PlayerGlobalStatisticsTab(props) {
    const statistics = props.statistics;

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md>
                    <Paper elevation={3} style={{minHeight: 95}}>
                        <div style={{textAlign: 'center', fontSize: '1.25rem', paddingTop: 10, minHeight: 30}}>Матчей</div>
                        <div style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{statistics.matches}</div>
                    </Paper>
                </Grid>
                <Grid item md>
                    <Paper elevation={3} style={{minHeight: 95}}>
                        <div style={{textAlign: 'center', fontSize: '1.25rem', paddingTop: 10, minHeight: 30}}>Побед</div>
                        <div style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{statistics.wins}</div>
                    </Paper>
                </Grid>
                <Grid item md>
                    <Paper elevation={3} style={{minHeight: 95, ...(statistics.isGoodWinRate ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                        <div style={{textAlign: 'center', fontSize: '1.25rem', paddingTop: 10, minHeight: 30}}>Процент побед</div>
                        <div style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{statistics.winRate}%</div>
                    </Paper>
                </Grid>
                <Grid item md>
                    <Paper elevation={3} style={{minHeight: 95, ...(statistics.isGoodAverageKdRatio ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'}), }}>
                        <div style={{textAlign: 'center', fontSize: '1.25rem', paddingTop: 10, minHeight: 30}}>Средний КД</div>
                        <div style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{statistics.averageKdRatio}</div>
                    </Paper>
                </Grid>
                <Grid item md>
                    <Paper elevation={3} style={{minHeight: 95, ...(statistics.isGoodAverageHeadshots ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'}), }}>
                        <div style={{textAlign: 'center', fontSize: '0.65rem', paddingTop: 10, minHeight: 30}}>Средний процент попаданий в голову</div>
                        <div style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{statistics.averageHeadshots}%</div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
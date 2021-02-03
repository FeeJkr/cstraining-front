import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

export default function PlayerSegmentsStatisticsTab(props) {
    const segment = props.segment;

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper elevation={3} style={{minHeight: 345}}>
                        <div style={{textAlign: 'center', paddingTop: 10}}>
                            Статистика карты: <span style={{fontSize: 21, fontWeight: 'bold'}}>{segment.label}</span>
                        </div>
                        <div key={`${segment.id}-div`}>
                            <ul key={`${segment.id}-matches-global`}>
                                <li key={`${segment.id}-matches`} style={{fontSize: 14}}>Количество матчей: <Chip color='primary' size="small" label={segment.matches}/> </li>
                                <li key={`${segment.id}-rounds`} style={{fontSize: 14, marginTop: 5}}>Количество раундов: <Chip color='primary' size="small" label={segment.rounds}/></li>
                                <li key={`${segment.id}-winRate`} style={{fontSize: 14, marginTop: 5}}>Общий процент побед: <Chip color='primary' size="small" label={`${segment.winRate}%`}/></li>
                            </ul>
                            <Divider variant={'middle'}/>
                            <ul key={`${segment.id}-mvps-global`}>
                                <li key={`${segment.id}-mvps`} style={{fontSize: 14, marginTop: 5}}>Количество MVP: <Chip color='primary' size="small" label={segment.mvps}/></li>
                                <li key={`${segment.id}-averageMvps`} style={{fontSize: 14, marginTop: 5}}>Среднее кол-во MVP за игру: <Chip color='primary' size="small" label={segment.averageMvps}/></li>
                            </ul>
                            <Divider variant={'middle'}/>
                            <ul key={`${segment.id}-kills-global`}>
                                <li key={`${segment.id}-tripleKills`} style={{fontSize: 14}}>3x убийства: <Chip color='primary' size="small" label={`${segment.tripleKills} (${segment.averageTripleKills})`}/> </li>
                                <li key={`${segment.id}-quadroKills`} style={{fontSize: 14, marginTop: 5}}>4х убийства: <Chip color='primary' size="small" label={`${segment.quadroKills} (${segment.averageQuadroKills})`}/></li>
                                <li key={`${segment.id}-pentaKills`} style={{fontSize: 14, marginTop: 5}}>5х убийства: <Chip color='primary' size="small" label={`${segment.pentaKills} (${segment.averagePentaKills})`}/></li>
                            </ul>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Paper elevation={3} style={{minHeight: 160, ...(segment.isGoodAverageKills ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                                <div style={{textAlign: 'center', paddingTop: 15}}>
                                    Убийства
                                </div>
                                <Divider style={{marginTop: 5}}/>
                                <Grid container style={{marginTop: 30}} alignItems="center">
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Общее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.kills}
                                        </Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Среднее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.averageKills}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper elevation={3} style={{minHeight: 160, ...(segment.isGoodAverageAssists ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                                <div style={{textAlign: 'center', paddingTop: 15}}>
                                    Ассисты
                                </div>
                                <Divider style={{marginTop: 5}}/>
                                <Grid container style={{marginTop: 30}} alignItems="center">
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Общее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.assists}
                                        </Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Среднее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.averageAssists}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper elevation={3} style={{minHeight: 160, ...(segment.isGoodAverageDeaths ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                                <div style={{textAlign: 'center', paddingTop: 15}}>
                                    Смерти
                                </div>
                                <Divider style={{marginTop: 5}}/>
                                <Grid container style={{marginTop: 30}} alignItems="center">
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Общее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.deaths}
                                        </Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Среднее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.averageDeaths}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20}}>
                        <Grid item xs={4}>
                            <Paper elevation={3} style={{minHeight: 160, ...(segment.isGoodAverageHeadshots ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                                <div style={{textAlign: 'center', paddingTop: 15}}>
                                    Хэдшоты
                                </div>
                                <Divider style={{marginTop: 5}}/>
                                <Grid container style={{marginTop: 30}} alignItems="center">
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Среднее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.averageHeadshots}%
                                        </Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            За игру
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.headshotsPerMatch}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper elevation={3} style={{minHeight: 160, ...(segment.isGoodAverageKdRatio ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                                <div style={{textAlign: 'center', paddingTop: 15}}>
                                    K/D Рейтинг
                                </div>
                                <Divider style={{marginTop: 5}}/>
                                <Grid container style={{marginTop: 30}} alignItems="center">
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Среднее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.averageKdRatio}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper elevation={3} style={{minHeight: 160, ...(segment.isGoodAverageKrRatio ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                                <div style={{textAlign: 'center', paddingTop: 15}}>
                                    K/R Рейтинг
                                </div>
                                <Divider style={{marginTop: 5}}/>
                                <Grid container style={{marginTop: 30}} alignItems="center">
                                    <Grid item md>
                                        <Typography style={{textAlign: 'center'}} color="textSecondary">
                                            Среднее
                                        </Typography>
                                        <Typography variant="h6" component="h3" style={{textAlign: 'center'}}>
                                            {segment.averageKrRatio}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
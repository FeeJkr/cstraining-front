import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PlayerInformation from "../components/PlayerInformation";
import {Grid} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import PlayerMatchesStatistics from "../components/PlayerMatchesStatistics";
import PlayerGlobalStatistics from "../components/PlayerGlobalStatistics";
import PlayerMatches from "../components/PlayerMatches";
import PlayerSegmentsStatistics from "../components/PlayerSegmentsStatistics";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function User() {
    let routeData = useParams();
    const [userInformation, setUserInformation] = useState(null);
    const [userMatches, setUserMatches] = useState(null);
    const [userStatistics, setUserStatistics] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        axios.all([
            getUserInformation(routeData.username),
            getUserMatches(routeData.username),
            getUserStatistics(routeData.username)
        ]).then((response) => {
                setUserInformation(response[0].data);
                setUserMatches(response[1].data);
                setUserStatistics(response[2].data);
                setIsLoaded(true);
        });
    }, []);

    if (!isLoaded) {
        return (
            <div style={{textAlign: 'center', marginTop: 50}}>
                <CircularProgress disableShrink />
            </div>
        );
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <h1>{routeData.username}</h1>
                </Grid>
            </Grid>
            <Divider component="div" />
            <Grid container spacing={3} style={{marginTop: 30}}>
                <Grid item xs={3} md={3}>
                    <PlayerInformation playerInformation={userInformation}/>
                </Grid>
                <Grid item xs={9} md={9}>
                    <PlayerMatchesStatistics today={userMatches.today} yesterday={userMatches.yesterday} month={userMatches.month} />
                </Grid>
            </Grid>
            <Grid container>
                <PlayerGlobalStatistics statistics={userStatistics}/>
            </Grid>
            <Grid container style={{marginTop: 20}}>
                <PlayerMatches matches={userMatches.matches}/>
            </Grid>
            <Grid container style={{marginTop: 20}}>
                <PlayerSegmentsStatistics statistics={userStatistics}/>
            </Grid>

            <Grid container style={{marginBottom: 100}}/>
        </div>
    );
}

function getUserMatches(nickname) {
    return axios.get(process.env.REACT_APP_API_DOMAIN + '/api/v1/faceit/player/matches', {params: {nickname: nickname}});
}

function getUserStatistics(nickname) {
    return axios.get(process.env.REACT_APP_API_DOMAIN + '/api/v1/faceit/player/statistics', {params: {nickname: nickname}});
}

function getUserInformation(nickname) {
    return axios.get(process.env.REACT_APP_API_DOMAIN + '/api/v1/faceit/player', {params: {nickname: nickname}});
}
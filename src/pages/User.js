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
    return axios.get('http://localhost:8080/api/v1/faceit/player/matches', {params: {nickname: nickname}});
}

function getUserStatistics(nickname) {
    return axios.get('http://localhost:8080/api/v1/faceit/player/statistics', {params: {nickname: nickname}});
}

function getUserInformation(nickname) {
    return axios.get('http://localhost:8080/api/v1/faceit/player', {params: {nickname: nickname}});
}

// function getUserMatches(username) {
//     return {
//         today: {
//             total: 12,
//             wins: 2,
//             loses: 10,
//             averageKd: 1.24,
//         },
//         yesterday: {
//             total: 5,
//             wins: 4,
//             loses: 1,
//             averageKd: 1.0,
//         },
//         month: {
//             total: 17,
//             wins: 6,
//             loses: 11,
//             averageKd: 0.87,
//         },
//         matches: [
//             {
//                 id: 1,
//                 map: 'de_mirage',
//                 score: '16 / 12',
//                 finishedAt: '27-01-2021 21:57',
//                 faceitUrl: 'https://google.com',
//                 kills: 10,
//                 assists: 5,
//                 deaths: 20,
//                 headshots: 10,
//                 headshotsPercentage: 100,
//                 tripleKills: 3,
//                 quadroKills: 2,
//                 pentaKills: 1,
//                 mvps: 12,
//                 kdRatio: 0.9,
//                 krRatio: 0.8,
//                 isWin: false,
//                 isGoodKdRatio: false,
//                 isGoodKrRatio: false,
//             },
//             {
//                 id: 2,
//                 map: 'de_nuke',
//                 score: '16 / 12',
//                 finishedAt: '27-01-2021 21:57',
//                 faceitUrl: 'https://google.com',
//                 kills: 30,
//                 assists: 15,
//                 deaths: 26,
//                 headshots: 15,
//                 headshotsPercentage: 50,
//                 tripleKills: 10,
//                 quadroKills: 25,
//                 pentaKills: 0,
//                 mvps: 2,
//                 kdRatio: 6.5,
//                 krRatio: 2,
//                 isWin: true,
//                 isGoodKdRatio: false,
//                 isGoodKrRatio: false,
//             },
//             {
//                 id: 3,
//                 map: 'de_inferno',
//                 score: '16 / 12',
//                 finishedAt: '27-01-2021 21:57',
//                 faceitUrl: 'https://google.com',
//                 kills: 12,
//                 assists: 2,
//                 deaths: 15,
//                 headshots: 8,
//                 headshotsPercentage: 75,
//                 tripleKills: 0,
//                 quadroKills: 0,
//                 pentaKills: 1,
//                 mvps: 3,
//                 kdRatio: 1.1,
//                 krRatio: 1.2,
//                 isWin: true,
//                 isGoodKdRatio: true,
//                 isGoodKrRatio: true,
//             },
//             {
//                 id: 4,
//                 map: 'de_dust2',
//                 score: '16 / 12',
//                 finishedAt: '27-01-2021 21:57',
//                 faceitUrl: 'https://google.com',
//                 kills: 60,
//                 assists: 17,
//                 deaths: 48,
//                 headshots: 15,
//                 headshotsPercentage: 12,
//                 tripleKills: 4,
//                 quadroKills: 0,
//                 pentaKills: 0,
//                 mvps: 15,
//                 kdRatio: 2.5,
//                 krRatio: 12.4,
//                 isWin: false,
//                 isGoodKdRatio: true,
//                 isGoodKrRatio: true,
//             },
//         ]
//     };
// }
//
// function getUserStatistics(username) {
//     return {
//         global: {
//             id: 1,
//             matches: 123,
//             wins: 10,
//             winRate: 12,
//             isGoodWinRate: false,
//             averageKdRatio: 1.2,
//             isGoodAverageKdRatio: true,
//             headshots: 1234,
//             averageHeadshots: 48,
//             isGoodAverageHeadshots: true,
//             segments: [
//                 {
//                     'id': 1,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_dust2',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 2,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_mirage',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 3,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_nuke',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 4,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_overpass',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 5,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_inferno',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 6,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_train',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 7,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_cache',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 }
//             ],
//         },
//         month: {
//             id: 2,
//             matches: 10,
//             wins: 5,
//             winRate: 50,
//             isGoodWinRate: true,
//             averageKdRatio: 0.9,
//             isGoodAverageKdRatio: false,
//             headshots: 999,
//             averageHeadshots: 12,
//             isGoodAverageHeadshots: false,
//             segments: [
//                 {
//                     'id': 8,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_dust2',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 9,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_mirage',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 10,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_nuke',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 11,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_overpass',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 12,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_inferno',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 13,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_train',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 },
//                 {
//                     'id': 14,
//                     'type': 'competition',
//                     'mode': '5v5',
//                     'label': 'de_cache',
//                     'image': 'https://google.com',
//                     'kills': getRandomInt(100),
//                     'averageKills': getRandomFloat(30),
//                     'isGoodAverageKills': Math.random() < 0.5,
//                     'assists': getRandomInt(100),
//                     'averageAssists': getRandomFloat(10),
//                     'isGoodAverageAssists': Math.random() < 0.5,
//                     'deaths': getRandomInt(100),
//                     'averageDeaths': getRandomFloat(20),
//                     'isGoodAverageDeaths': Math.random() < 0.5,
//                     'headshots': getRandomInt(100),
//                     'totalHeadshots': getRandomInt(100),
//                     'averageHeadshots': getRandomInt(60),
//                     'isGoodAverageHeadshots': Math.random() < 0.5,
//                     'headshotsPerMatch': getRandomFloat(12),
//                     'krRatio': getRandomInt(100),
//                     'averageKrRatio': getRandomFloat(2),
//                     'isGoodAverageKrRatio': Math.random() < 0.5,
//                     'kdRatio': getRandomInt(100),
//                     'averageKdRatio': getRandomFloat(2),
//                     'isGoodAverageKdRatio': Math.random() < 0.5,
//                     'tripleKills': getRandomInt(100),
//                     'quadroKills': getRandomInt(50),
//                     'pentaKills': getRandomInt(10),
//                     'averageTripleKills': getRandomFloat(2),
//                     'averageQuadroKills': getRandomFloat(1),
//                     'averagePentaKills': getRandomFloat(1),
//                     'mvps': getRandomInt(200),
//                     'averageMvps': getRandomFloat(10),
//                     'isGoodAverageMvps': Math.random() < 0.5,
//                     'matches': getRandomInt(300),
//                     'rounds': getRandomInt(2000),
//                     'wins': getRandomInt(500),
//                     'winRate': getRandomInt(90),
//                     'isGoodWinRate': Math.random() < 0.5,
//                 }
//             ],
//         },
//     };
// }
//
// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }
//
// function getRandomFloat(max) {
//     return (Math.random() * max).toFixed(2);
// }
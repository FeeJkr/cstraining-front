import React, {useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from "@material-ui/core/TableHead";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Collapse} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Row(props) {
    const {map} = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow key={map.id} style={{maxHeight: 40}}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center" style={{...(map.isWin ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                    {map.finishedAt}
                </TableCell>
                <TableCell align="center" style={{...(map.isWin ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                    {map.map}
                </TableCell>
                <TableCell align="center" style={{...(map.isWin ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'})}}>
                    {map.score}
                </TableCell>
                <TableCell align="center">
                    {map.requestedPlayer.kills} - {map.requestedPlayer.assists} - {map.requestedPlayer.deaths}
                </TableCell>
                <TableCell align="center">
                    {map.requestedPlayer.headshots} ({map.requestedPlayer.headshotsPercentage}%)
                </TableCell>
                <TableCell align="center">
                    {map.requestedPlayer.tripleKills} / {map.requestedPlayer.quadroKills} / {map.requestedPlayer.pentaKills}
                </TableCell>
                <TableCell align="center">
                    {map.requestedPlayer.mvps}
                </TableCell>
                <TableCell align="center" style={{...(map.requestedPlayer.isGoodKdRatio ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'}), fontWeight: 'bold'}}>
                    {map.requestedPlayer.kdRatio}
                </TableCell>
                <TableCell align="center" style={{...(map.requestedPlayer.isGoodKrRatio ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'}), fontWeight: 'bold'}}>
                    {map.requestedPlayer.krRatio}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {map.teams.map((team) => (
                                <TeamTable key={team.id} team={team}/>
                            ))}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function TeamTable(props) {
    const {team} = props;

    return (
        <React.Fragment>
            <div style={{backgroundColor: 'rgba(64, 64, 64, 0.87)'}}>
                    <Grid container>
                        <Grid item xs={3} style={{paddingLeft: 50, paddingTop: 10}}>
                            <Typography variant="h6" gutterBottom component="div" style={{color: 'rgb(225, 255, 255)'}}>
                                {team.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}/>
                        <Grid item xs={3} style={{paddingLeft: 50, paddingTop: 10}}>
                            <Typography variant="h6" gutterBottom component="div" style={{color: 'rgb(225, 255, 255)'}}>
                                Раунды: {team.finalRounds} ({team.firstHalfRounds} / {team.secondHalfRounds} / {team.overtimeRounds})
                            </Typography>
                        </Grid>
                    </Grid>
            </div>
            <Table size="small" width="100%" aria-label="purchases">
                <TableHead style={{backgroundColor: 'rgb(225, 255, 255)'}}>
                    <TableRow>
                        <TableCell align="center" style={{color: 'black', fontWeight: 'bold'}}>Ник</TableCell>
                        <TableCell align="center" style={{color: 'black', fontWeight: 'bold'}}>K-A-D</TableCell>
                        <TableCell align="center" style={{color: 'black', fontWeight: 'bold'}}>В голову (% в голову)</TableCell>
                        <TableCell align="center" style={{color: 'black', fontWeight: 'bold'}}>3x / 4x /5x убийств</TableCell>
                        <TableCell align="center" style={{color: 'black', fontWeight: 'bold'}}>MVPs</TableCell>
                        <TableCell align="center" style={{color: 'black', fontWeight: 'bold'}}>K/D Рейтинг</TableCell>
                        <TableCell align="center" style={{color: 'black', fontWeight: 'bold'}}>K/R Рейтинг</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {team.players.map((player) => (
                        <TableRow>
                            <TableCell align="center">{player.nickname}</TableCell>
                            <TableCell align="center">{player.kills}-{player.assists}-{player.deaths}</TableCell>
                            <TableCell align="center">{player.headshots} ({player.headshotsPercentage}%)</TableCell>
                            <TableCell align="center">{player.tripleKills} / {player.quadroKills} / {player.pentaKills}</TableCell>
                            <TableCell align="center">{player.mvps}</TableCell>
                            <TableCell align="center">{player.kdRatio}</TableCell>
                            <TableCell align="center">{player.krRatio}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default function PlayerMatches(props) {
    const matches = props.matches;
    const rowsPerPage = matches.length <= 10 ? matches.length : 10;
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <TableContainer component={Paper}>
            <Table style={{minWidth: 500}} aria-label="pagination table">
                <TableHead style={{backgroundColor: '#3F51B5'}}>
                    <TableRow>
                        <TableCell width={20} align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}/>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>Дата</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>Карта</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>Счет карты</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>K - A - D</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>В голову (% в голову)</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>3х / 4x / 5x убийств</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>MVPs</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>K/D Рейтинг</TableCell>
                        <TableCell align="center" style={{color: 'rgb(225,255,255)', fontSize: 12}}>K/R Рейтинг</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((map) => (
                        <Row key={map.id} map={map}/>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            colSpan={9}
                            count={matches.length}
                            labelRowsPerPage={''}
                            labelDisplayedRows={({from, to, count}) => `` }
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'Матчей на странице' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{flexShrink: 0, marginLeft: theme.spacing(2.5)}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="Первая страница"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Предыдущая страница">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Следующая страница"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Последняя страница"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}
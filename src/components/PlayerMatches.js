import React from 'react';
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
                        <TableRow key={map.finishedAt}>
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
                                {map.kills} - {map.assists} - {map.deaths}
                            </TableCell>
                            <TableCell align="center">
                                {map.headshots} ({map.headshotsPercentage}%)
                            </TableCell>
                            <TableCell align="center">
                                {map.tripleKills} / {map.quadroKills} / {map.pentaKills}
                            </TableCell>
                            <TableCell align="center">
                                {map.mvps}
                            </TableCell>
                            <TableCell align="center" style={{...(map.isGoodKdRatio ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'}), fontWeight: 'bold'}}>
                                {map.kdRatio}
                            </TableCell>
                            <TableCell align="center" style={{...(map.isGoodKrRatio ? {backgroundColor: 'rgba(72, 245, 66, 0.3)'} : {backgroundColor: 'rgba(247, 52, 52, 0.3)'}), fontWeight: 'bold'}}>
                                {map.krRatio}
                            </TableCell>
                        </TableRow>
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
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import {Link} from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        minWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Home() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/faceit/players')
            .then((response) => {
                setUsers(response.data);
            })
    }, []);

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Список доступных пользователей
                </ListSubheader>
            }
            className={classes.root}
        >
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <Link to={"/player/" + user.nickname} style={{textDecoration: 'none', color: 'black'}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText style={{textAlign: 'center'}} primary={user.nickname} />
                            </ListItem>
                        </Link>
                    </div>
                )
            })}
        </List>
    );
}

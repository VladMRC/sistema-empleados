import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import BookIcon from '@material-ui/icons/Book';
import GroupIcon from '@material-ui/icons/Group';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

export const SidebarListIcons = ({useStyles, handleDrawerOpen, handleDrawerClose }) => {
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(null);
    
    const [open, setOpen] = React.useState(false);
    
    const handleClick = (event) => {
        open ? handleDrawerClose(event) : handleDrawerOpen(event);
        setOpen(!open);
    };
    const handleListItemClick = (event, index) => {
        if(index === 4) handleClick(event);
        
        setSelectedIndex(index);
    };

    return (
        <div>
            <Link to="/" className={classes.textLinks} >
                <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)} >
                    <ListItemIcon>
                        <PersonIcon style={ {color: 'white'} } />
                    </ListItemIcon>
                    
                    <ListItemText primary="Empleados" />
                </ListItem>
            </Link>
        </div>
    )
}

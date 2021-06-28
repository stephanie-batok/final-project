import React,{useState,useEffect} from 'react';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider,Typography} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 400
    }
}));

export default function UserChats(props) {
    const [sendToId,setSendToId] = useState(props.sendToId);
    const my_id = localStorage.getItem('id');
    const { date } = props;
    const classes = useStyles();

    useEffect(() => {
        console.log(sendToId);
        setSendToId(props.sendToId);
    }, [props.sendToId]);


    const chooseChat  = (sendToId,chat_num) => e =>{
        console.log(sendToId);
        setSendToId(sendToId);
        props.openChat({sendToId:sendToId,chat_num:chat_num});
    }

    return (
        <>
            {props.chats.length>0?
            <List className={classes.root} style={{display:props.showUserChats?"block":"none"}}>
                {props.chats.map((chat) => (
                    (chat.user_id1===my_id?
                    <>
                    <ListItem onClick={chooseChat(chat.user_id2,chat.chat_num)} style={{backgroundColor:sendToId===chat.user_id2?"#b5bbdc36":"white"}}>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={chat.user_name2} secondary={chat.last_message} />
                        <ListItemText edge="end" secondary={chat.dateStr===date?chat.timeStr.substring(0, 5):chat.dateStr} />
                    </ListItem>
                    <Divider/>
                    </>:
                    <>
                    <ListItem onClick={chooseChat(chat.user_id1,chat.chat_num)} style={{backgroundColor:sendToId===chat.user_id1?"#b5bbdc36":"white"}}>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={chat.user_name1} secondary={chat.last_message} />
                        <ListItemText edge="end" secondary={chat.dateStr===date?chat.timeStr.substring(0, 5):chat.dateStr} />
                    </ListItem>
                    <Divider/>
                    </>
                    )
                ))}
            </List>:
            <Typography>
                    לא קיימות הודעות בהמערכת
            </Typography>}
        </>
    )
}

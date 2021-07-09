import React, { useState, useEffect } from 'react';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider,Typography} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import apiUrl,{uplodedPicPath} from '../../global';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 400
    }
}));


export default function ContactList(props) {
    const my_id = localStorage.getItem('id');
    const classes = useStyles();
    const [contacts,setContacts] = useState([]);
    const [chat_num,setChat_num] = useState("");
    const [sendToId,setSendToId] = useState("");


    useEffect(() => {
        fetch(apiUrl+"SystemUser/",
            {
                method: 'GET',
                headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json();
            })
            .then((result) => {
                    let temp = result.filter(x=>x.id!==my_id);
                    setContacts(temp);
                },
                (error) => {
                alert(error);
            }
        );
    }, []);

    const go2Chat = (selectedId) => e => {
        setSendToId(selectedId);

        let newChat = {
            last_message:"",
            user_id1:my_id,
            user_id2:selectedId
        };

        fetch(apiUrl+"AppUser/Chats",
            {
                method: 'POST',
                body: JSON.stringify(newChat),
                headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json();
            })
            .then((result) => {
                console.log(result);
                setChat_num(result);
            },
            (error) => {
            console.log(error);
            }
        );
    }

    useEffect(() => {
        if(chat_num!==""){
            props.openNewChat({sendToId:sendToId,chat_num:chat_num});
            setSendToId("");
        }
    },[chat_num]);

    return (
        <>
            {contacts.length>0?
            <List className={classes.root} style={{display:props.showContactList?"block":"none"}}>
                {contacts.map((contact)=>(
                    <>
                    <ListItem onClick={go2Chat(contact.id)} style={{backgroundColor:sendToId===contact.id?"#b5bbdc36":"white"}}>
                        <ListItemAvatar>
                            <Avatar src={uplodedPicPath+contact.profileImg} />
                        </ListItemAvatar>
                        <Typography>{contact.first_name+" "+contact.last_name}</Typography>
                    </ListItem>          
                    <Divider/>
                    </>          
                ))
                }
            </List>:null}
        </>
    )
}

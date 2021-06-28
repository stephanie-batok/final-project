import React, { useState,useEffect } from 'react';
import '../../App.css';
import apiUrl from '../../global';
import {Container, Toolbar, IconButton,Divider,Typography} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import makeStyles from "@material-ui/core/styles/makeStyles";
import UserChats from './UserChats';
import Chat from './Chat';
import ContactList from './ContactList';


const useStyles = makeStyles(theme => ({
  container: {
    display:"grid",
    overflow: "hidden",
    gridTemplateColumns:"0.7fr 2fr"
  },
  userChatsContainer:{
    border: "0.5px solid gray",
    minHeight: 455,
    maxHeight: 455,
    overflow: "auto",
  }
}));

export default function Messages(props) {
    const classes = useStyles();
    const my_id = localStorage.getItem('id');
    const [chat_num,setChat_num] = useState("");
    const [sendToId,setSendToId] = useState("");
    const [chats,setChats] = useState([]);
    const [date,setDate] = useState("");
    const [show,setShow] = useState(false);

    useEffect(() => {
      let day = new Date().getDate();
      let month = new Date().getMonth();
      let year = new Date().getFullYear();
      setDate(day + "." + (month+1) + "." + year);

      getChats();
    },[]);

    const getChats = () => {
      console.log("render chats");
      fetch(apiUrl+"AppUser/Chats/"+my_id,
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
            
            if(result.length!==0){
                console.log(result);
                setChats(result);
            }
            },
            (error) => {
            alert(error);
        }
      );
    }

    const openChat = (data) => {
      setChat_num(data.chat_num);
      setSendToId(data.sendToId);
    }

    const openNewChat = (data) => {
      getChats();
      setChat_num(data.chat_num);
      setSendToId(data.sendToId);
      setShow(!show);
    }

    return (
      <Container>
        <br/>
        <div className={classes.container}>
          <div className={classes.userChatsContainer}>
            <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setShow(!show)}>
                {show?<ArrowForwardIcon/>:<ChatIcon />}
            </IconButton>
            <Typography edge="end" variant="h6" style={{alignItems:"center"}}>
                  {show?"אנשי קשר":"שיחות"}
            </Typography>
            </Toolbar>
            <Divider/>
            <UserChats chats={chats} sendToId={sendToId} openChat={openChat} date={date} showUserChats={!show}/>
            <ContactList openNewChat={openNewChat} showContactList={show}/>
          </div>
          <div>
            <Chat chat_num={chat_num} sendToId={sendToId} date={date} onSend={getChats}/>
          </div>
        </div>
      </Container>
    )
}

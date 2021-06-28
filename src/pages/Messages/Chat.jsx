import React, { useState,useEffect,useLayoutEffect} from 'react';
import '../../App.css';
import {Button,Grid,TextField,IconButton,InputAdornment,Typography} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {db} from '../../fireB';
import apiUrl from '../../global';
import SendIcon from "@material-ui/icons/Send";


const useStyles = makeStyles(theme => ({
    chatContainer:{
      border: "0.5px solid gray",
      minHeight: 400,
      maxHeight: 400,
      overflowY:"auto"
    },
    bubbleContainer: {
      width: "100%",
      display:"grid",
    },
    bubble: {
      border: "0.5px solid black",
      borderRadius: "10px",
      margin: "5px",
      padding: "10px",
      display: "inline-block",
      backgroundColor:"white"
    },
    dateStamp:{
      textAlign:"center",
      justifySelf:"center"
    }
}));

export default function Chat(props) {
    const my_id = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    const classes = useStyles();
    const { sendToId, chat_num, date } = props;
    const [messages,setMessages] = useState([]);
    const [sendToToken,setSendToToken] = useState("");
    const [value, setValue] = useState("");


    useLayoutEffect(() => {

      if(sendToId!=="" && chat_num!==""){

        const unsubscribe = db.collection('chat_'+chat_num)
        .orderBy('createdAt', 'asc')
        .onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
            }))
        ));
        return unsubscribe; 
      }
  }, [chat_num]);

    const onSend = () => {
      console.log(value);
      console.log(sendToId);

      if(value.trim()!=="" && sendToId!=="" && chat_num!==""){
        //get token from DB and send push notification!
        fetch(apiUrl+"AppUser/Token/"+sendToId,
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
              setSendToToken(result);
              console.log(result);
              },
              (error) => {
              console.log(error);
          }
        );
        
        let createdAt = new Date();
        const crypto = require("crypto");
        const _id = crypto.randomBytes(16).toString("hex");
        
        //add value to messages and update firebase
        let message =
        {
          _id: _id,
          createdAt: createdAt,
          text: value,
          user: {
            _id: email,
            name: 'user',
            avatar: 'https://www.trackergps.com/canvas/images/icons/avatar.jpg'
          }
        };
        setMessages([...messages , message]);
        db.collection('chat_' + chat_num).add(message);

        //create chat and update DB - SQL
        const chat = {
          chat_num: chat_num,
          dateTime: createdAt,
          dateStr: new Date().toLocaleDateString(),
          timeStr: new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
          last_message:value,
        }
        
        fetch(apiUrl+"AppUser/Chats/",
          {
              method: 'PUT',
              body: JSON.stringify(chat),
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
              },
              (error) => {
              console.log(error);
          })
          .then(()=>{
            props.onSend();
          });

        setValue("");
      }
    };

    useEffect(() => {
      console.log(sendToId);
      
      if(sendToToken!==""){
          let pnd = {
              to: sendToToken,
              title: 'מועדון רכיבה רעננה',
              body: "התקבלה הודעה חדשה",
              badge: 4,
              data: { chat_num:chat_num, from_id:my_id ,action:"chat" }
          };

          console.log(pnd);

          fetch(apiUrl+"AppUser/PushNotification", {
            method: 'POST',
            body: JSON.stringify(pnd),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => {
            if (json != null) {
              console.log(`
                    returned from Ruppin server\n
                    json= ${JSON.stringify(json)}`);
            } else {
              console.log('err json');
            }
          });
        }
    },[sendToToken]);

    return (
      <>
        <div className={classes.chatContainer}>
            {messages.length>0?messages.map((obj) => (
                <div className={`${classes.bubbleContainer} ${email===obj.user._id?"right":"left"}`}>
                    {/* <div className={classes.dateStamp}>{obj.createdAt.toLocaleDateString()===date?"היום":obj.createdAt.toLocaleDateString()}</div> */}
                    <div className={classes.bubble}>
                        <div className={classes.button}>
                          <Typography>{obj.text}</Typography>
                          <Typography style={{fontSize:"9px",textAlign:"left"}}>{(obj.createdAt.toLocaleDateString()===date?"היום":obj.createdAt.toLocaleDateString()) + " " + obj.createdAt.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</Typography>
                        </div>
                    </div>
                </div>
                ))
            :null}
        </div>
        <TextField
              style={{alignSelf:"flex-end"}}
              variant="outlined"
              fullWidth
              value={value}
              placeholder="הקלד/י הודעה"
              onChange={e => setValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton color="primary" onClick={onSend}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
          />
      </>
    )
}

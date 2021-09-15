import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import Container from '@material-ui/core/Container';
import { TextField, Typography} from '@material-ui/core';


const rooms = [
  "Aula",
  "Exercicios",
]

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100vh',
    display: 'flex',
  },
  painel:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '15px',
    marginBottom: '5px',
  },
  headerTitle: {
    color: '#666666',
    fontFamily: 'Quicksand',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  subheader: {
    fontFamily: 'Quicksand',
    fontSize: '15px',
  },
  msg: {
    fontFamily: 'Quicksand',
    marginTop: '-10%',
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '-50%',
    marginBottom: '10%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '-10%',
    },
  },
  btn:{
    border: '1px solid #ccc',
    backgroundColor: 'rgb(99, 26, 236)',
    color: '#fff',
  },
  paper: {
    padding: '0px',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  msgBox:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '20px',
  },
  bigCircle:{
    backgroundColor: 'rgb(99, 26, 236)',
    borderRadius: '50%',
    height: '20vh',
    width: '20vh',
    marginTop: '-50%',
    marginLeft: '10%',
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      height: '25vh',
      width: '25vh',
      marginTop: '-20%',
      marginLeft: '10%',
    },
    [theme.breakpoints.up('md')]: {
      height: '30vh',
      width: '30vh',
      marginTop: '-10%',
      marginLeft: '10%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '40vh',
      width: '40vh',
      marginTop: '-15%',
      marginLeft: '10%',
    },
  },
  smallCircle: {
    backgroundColor: 'rgb(245, 138, 67)',
    borderRadius: '50%',
    height: '15vh',
    width: '15vh',
    marginLeft: '30%',
    marginTop: '-25%',
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: '25%',
      marginTop: '-15%',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '25%',
      marginTop: '-10%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '25vh',
      width: '25vh',
      marginTop: '-18%',
    },
  },
 
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 3,
  
  },
  chatHeader: {
    fontFamily: 'Quicksand',
    textTransform: 'capitalize',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'rgb(99, 26, 236)'

  },
  chatBody: {
    fontFamily: 'Quicksand',
    color: 'rgb(245, 138, 67)',
  },
  textBox: {
    height: '15%',
    width: '100%',
  },
  appBar: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    top: 'auto',
    bottom: 0,
    flexDirection: 'row',
  },
  icons: {
    color: '#000',
  },
}));

export default function Chat(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  console.log(props);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const classes = useStyles();

  function renderRooms(room) {
        const currentChat = {
          chatName: room,
          isChannel: true,
          receiverId: "",
        }
        return (
          <MenuItem
            onClick={() => props.toggleChat(currentChat)}
            key={room}
          >
            {room}
          </MenuItem>
        )
      }

  function renderYou(user) {
    if (user.id === props.yourId) {
      return (
        <Container className={classes.header} key={props.currentChat} >
          <Typography className={classes.headerTitle} key={user.id}>
            Olá {user.username}
          </Typography>
          <Typography className={classes.subheader} key={props.currentChat.chatName}>
            Sala: {props.currentChat.chatName}
          </Typography>
        </Container>
      )
    }
  }

  function renderUser(user) {
    const currentChat = {
      chatName: user.username,
      isChannel: false,
      receiverId: user.id,
    }
    return (
      <MenuItem 
        onClick={() => props.toggleChat(currentChat)}
        key={user.id}>
          {user.username}
        </MenuItem>
    );
  };


  function renderMessages(message, index) {
    return (
      <Container className={classes.chatBox} key={index}>
        <Typography className={classes.chatHeader}>{message.sender}:</Typography>
        <Typography className={classes.chatBody}>&nbsp;&nbsp;{message.content}</Typography>
      </Container>
    )
  }
  
  let body;
  if (!props.currentChat.isChannel || props.connectedRooms.includes(props.currentChat.ChatName)) {
    body = (
      <Container className={classes.messages}>
        {props.messages.map(renderMessages)}
      </Container>
    )
  } else if (props.currentChat.chatName === "Aula") {
    body = (
      <Container className={classes.msgBox}>
        <Typography className={classes.subheader}>
          A aula está em andamento!
        </Typography>
      </Container>
    )
  } else {
    body = (
      <Container className={classes.btnBox}>
        <Button
        className={classes.btn}
        onClick={() => props.joinRoom(props.currentChat.ChatName)}
      >
        Acessar Chat da Sala
      </Button>
      </Container>
    )
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      props.sendMessage()
    }
  }

  return (
    <Container className={classes.main}> 
      <CssBaseline />
      {/* <Paper square className={classes.paper}>
      </Paper> */}
      <Container className={classes.painel}>
          {props.allUsers.map(renderYou)}

          {props.teacher.length <= 0
          ?
          <Typography className={classes.msg}>Ainda não foi inicializada a aula. Espere o Professor(a).</Typography>
          :
          <Typography className={classes.msg}>Preste atenção ao professor(a)</Typography> 
          }
          <Container className={classes.paper}>
          {props.currentChat.chatName === 'Aula' 
          ?
            <>
            <Container className={classes.bigCircle}>&nbsp;</Container>
            <Container className={classes.smallCircle}>&nbsp;</Container>
            </>
          :
            <Container>&nbsp;</Container>
          }
           {body}
         </Container>
        {props.currentChat.chatName === 'Aula'
        ?
        <Container>&nbsp;</Container>
        :
        <TextField 
           value={props.message}
           onChange={props.handleMessageChange}
           onKeyPress={handleKeyPress}
           placeholder= "Escreva aqui..."
           className={classes.textBox}
        />
        }
      </Container>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Button 
            aria-controls="rooms-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            label="salas"
            className={classes.icons}
          >
            <MeetingRoomOutlinedIcon  />
          </Button>
          <Menu
            id="rooms-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {rooms.map(renderRooms)}
          </Menu>
          <Button 
            aria-controls="user-menu" 
            aria-haspopup="true" 
            onClick={handleClick2}
            label="Amigos"
            className={classes.icons}
          >
            <PeopleAltIcon />
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
          >
            {props.allUsers.map(renderUser)}
          </Menu>
          <IconButton label="configurações" className={classes.icons} edge="end" >
            <SettingsIcon />
          </IconButton>
      </AppBar>
    </Container>
  );
}

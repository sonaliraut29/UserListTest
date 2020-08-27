import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      transform: 'translateZ(0)',
      // The position fixed scoping doesn't work in IE 11.
      // Disable this demo to preserve the others.
      '@media all and (-ms-high-contrast: none)': {
        display: 'none',
      },
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Popup = (props) => {

    const classes = useStyles();

	const history = useHistory();

    const submitUser = async (e) => {
    	e.preventDefault();
    	history.push(`/users`);
    }


	return (
        <div className={classes.root}>
        <Modal
          open
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          className={classes.modal}
          BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
          <div className={classes.paper}>
            <form onSubmit = {submitUser}>
                <h2 id="server-modal-title">User created successfully</h2>
                <Button variant="primary" type="submit">Ok</Button>
            </form>
          </div>
        </Modal>
      </div>
	)
}

export default Popup ;
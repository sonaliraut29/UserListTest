import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddUser } from '../../stores/actions/user';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Popup from './Popup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
	  minWidth: 275,
	},
	bullet: {
	  display: 'inline-block',
	  margin: '0 2px',
	  transform: 'scale(0.8)',
	},
	title: {
	  fontSize: 14,
	},
	pos: {
	  marginBottom: 12,
	},
  });

const CreateUser = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const [role, setRole] = useState('');
	const [username, setUsername] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
	
	const [error, setError] = useState(false);
	const [errorMessage , setErrorMessage] = useState('');
	const [visible , setVisible] = useState("");

	// To  Manage the State in the Component :-
	let { userType} =  useSelector( state => state.User );

    const dispatchAction = useDispatch();

	useEffect( () => {
		if(userType === 0){
			history.push("/");
		}
    }, []);
    
	const popupStatus = () => {
		setVisible(!visible);
	}

	const submitUser = (e) => {
		e.preventDefault();
		if(username === "" || address === "" || phone_no === ""){
			setError(true);
			setErrorMessage("Fields are required");
			return false ;
		}
		dispatchAction(AddUser({ id : (new Date()).getTime(), username : username, phone_no : phone_no, address : address, role:role }));
		setVisible(true);
		setUsername('');	
		setPhoneNo('');
		setAddress('');
		setErrorMessage(true);
	}

	const handleChange = (e, type) => {

		if(type === "username"){
			setUsername(e.target.value);
		}else if(type === "phone_no"){
			setPhoneNo(e.target.value);
		}else if(type === "address"){
			setAddress(e.target.value);
		} else if(type === 'role') {
			setRole(e.target.value)
		}
		console.log(role);
	}

	return (
		<div style={{
			marginTop:'55px'
		}}>
			{visible && <Popup/>}
			<Card className={classes.root}>
            <CardContent>
			<form onSubmit = {submitUser}>
			  <div className="form-group">
                  <div className="row">
                      <lable className="col-md-2 control-lable">Username</lable>
                      <div className="col-md-12">
                        <input 
                            type="text" 
                            className="form-control" 
                            value = {username} 
                            onChange = {(e) => handleChange(e, 'username') }
                            placeholder="Username"
                        />
                    </div>
                    {error && username === "" && <p className="alert-danger">{errorMessage}</p>}
                  </div>    
			  </div>
			  <div className="form-group">
                  <div className="row">
                    <lable className="col-md-2 control-lable">Phone No</lable>
			        <div className="col-md-12">
						<input 
							type="text" 
							className="form-control"  
							value = {phone_no} 
							onChange = {(e) => handleChange(e, 'phone_no') }
							placeholder="Phone Number"
                        />
                        {error && phone_no === "" && <p className="alert-danger">{errorMessage}</p>}
                    </div>
                </div>
			  </div>
			  <div className="form-group">
			  	<div className="row">
					<label className="col-md-2 control-lable">Address</label>
					<div className="col-md-12">
						<input 
							type="text" 
							className="form-control"  
							value = {address} 
							onChange = {(e) => handleChange(e, "address") }
							placeholder="Enter Address" 
							id="pwd" 
						/>
						{error && address === "" && <p className="alert-danger">{errorMessage}</p>}
					</div>
				</div>
			  </div>
			  <div className="form-group">
			  	<div className="row">
					<label className="col-md-2 control-lable">Role</label>
					<div className="col-md-12">
						<select name="role" onChange = {(e) => handleChange(e, "role") } className="form-control">
							<option value=''>Select User Type</option>
							<option value="1">Admin</option>
							<option value="2">User</option>
						</select>
						{/* <input 
							type="text" 
							className="form-control"  
							value = {address} 
							onChange = {(e) => handleChange(e, "address") }
							placeholder="Enter Address" 
							id="pwd" 
						/> */}
						{error && role === "" && <p className="alert-danger">{errorMessage}</p>}
					</div>
				</div>
			  </div>
			  <Button type="submit" variant="primary">Create User</Button>
			</form>
			</CardContent>
			</Card>
		</div>
	)
}

export default CreateUser;
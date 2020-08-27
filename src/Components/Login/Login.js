import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from 'react-redux';
import { loginUserAs } from '../../stores/actions/user';
import { useHistory } from  'react-router-dom';
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

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setUserType] =  useState(0)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatchActions = useDispatch();
    let userType = useSelector(state => state.User);

    const handleChange = (event, type) => {
        if(type === 'username' && '' !== event.target.value) {
            setUsername(event.target.value);
        } else if(type === 'password' && '' !== event.target.value) {
            setPassword(event.target.value);
        } else if( type === 'admin') {
            setUserType(1);
        } else if( type === 'user') {
            setUserType(2);
        }

    }

    const history = useHistory();

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(username === '') {
            setError(true);
            setErrorMessage('Username is required');
            return false;
        }

        if(password === '') {
            setError(true);
            setErrorMessage('Password is required');
            return false;
        }
        if(username === '' && password === '') {
            setError(true);
            setErrorMessage('Both fields are required');
            return false;
        }

        if(type === '') {
            setError(true);
            setErrorMessage('Please select user type.');
            return false;
        }

        dispatchActions(loginUserAs(type));
        history.push('users');
    }
    return (
        <div  style={{
            marginTop:'55px',
            padding:'40px'
		}}
        >        
        <Card className={classes.root}>
            <CardContent>
            <div className="">
                {
                    error ? <p className="fade alert alert-danger show"> { errorMessage } </p>: ''
                }
            </div>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <div className="row">
                        <lable className="form-label">Username</lable>
                        <div className="col-md-12">
                            <input type="text" name="username" onChange={(event) => handleChange(event, 'username')} className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="form-group ">
                    <div className="row">
                        <lable className="form-label">Password</lable>
                        <div className="col-md-12">
                            <input type="password" name="password" onChange={(event) => handleChange(event, 'password')} className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label>
                                <input type="radio" name="userType" className="form-control" onClick={(event) => handleChange(event,'admin')}/>
                                Admin
                            </label>
                        </div>
                        <div className="col-md-6">
                            <label>
                                <input type="radio" name="userType" className="form-control" onClick={(event) => handleChange(event,'user')}/>
                                User
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="">
                        <Button variant="primary" type="submit">Login</Button>
                    </div>
                </div>
            </form>
        </CardContent>
        </Card>
        </div>
    )
}

export default Login;
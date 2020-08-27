import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList } from '../../stores/actions/user';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Users = (props) => {
    
    const history = useHistory();

    let {usersData, userType} =  useSelector( state => state.User );

    const dispatchActions = useDispatch();

    const getUsers =  () => {
        dispatchActions(getUserList());
   }

   useEffect( () => {
        if(userType === 0){
            history.push("/");
        }
        getUsers();
    }, []);


    const handlePopup = () => {
		props.history.push(`/createUser`);
    }
    
    const classes = useStyles();
    
    return (
        <div>
            { userType === 1 && <div style={{
            marginLeft:'80%',
            marginTop:'25px'
        }}><Button variant="primary" onClick = {handlePopup}>Add User</Button></div>}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Phone No</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {usersData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.phone_no}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.role === '1' ? 'Admin' : 'User' }</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    )
}

export default Users;

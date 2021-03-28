import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, sortUsers } from '../../store/actions/users'
import { useHistory } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import './MainTable.css'



function MainTable({users, fetchUsers, sortUsers}) {

    useEffect(() => fetchUsers(), [fetchUsers]);

    const {push} = useHistory();
    const [inputValue, setInputValue] = useState('');

    function sortByName(){
        users.sort(function(a, b) {
            if (a.name < b.name) {
              return -1
            }
            if (a.name > b.name) {
              return 1
            }
            return 0;
        });
        sortUsers(users);
    }

    function sortByHits(){
        users.sort((a, b) => a.hits - b.hits);
        sortUsers(users.reverse());
    }

    function sortByRate(){
        users.sort((a, b) => a.rate - b.rate);
        sortUsers(users.reverse());
    }

    function sortByPlace(){
        users.sort((a, b) => a.place - b.place);
        sortUsers(users);
    }

    function pushToUser(value){
        const selectedSticker = users.find((item) => item.name === value);
        push('/user/' + selectedSticker.id);
    }



    return (
        <div className="main-table-main-container">
            <Autocomplete
                className="main-table-search"
                onChange={(e, newValue) => newValue ? pushToUser(newValue) : ''}
                inputValue={inputValue}
                onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                options={users.map((item) => item.name)}
                renderInput={(params) => <TextField {...params} color="secondary" label="Поиск" variant="outlined"/>}
            />
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="main-table-table-cell"><Typography className="main-table-typography" onClick={() => sortByName()}>Name:</Typography></TableCell>
                            <TableCell className="main-table-table-cell" align="right"><Typography className="main-table-typography" onClick={() => sortByHits()}>Hits:</Typography></TableCell>
                            <TableCell className="main-table-table-cell" align="right"><Typography className="main-table-typography" onClick={() => sortByRate()}>Rate:</Typography></TableCell>
                            <TableCell className="main-table-table-cell" align="right"><Typography className="main-table-typography" onClick={() => sortByPlace()}>Place:</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">{item.name}</TableCell>
                                <TableCell align="right">{item.hits}</TableCell>
                                <TableCell align="right">{item.rate}</TableCell>
                                <TableCell align="right">{item.place}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = ({users}) => ({users})

const mapDispatchToProps = {
    fetchUsers,
    sortUsers,
}   

export default connect(mapStateToProps, mapDispatchToProps)(MainTable)

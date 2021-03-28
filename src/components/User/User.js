import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../store/actions/users'
import { useHistory, withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'



function User({user, fetchUsers}) {
    
    useEffect(() => fetchUsers(), [fetchUsers]);

    const {push} = useHistory();

    function pushToMain(){
        push('/main');
    }

    return (
        <div className="main-table-main-container">
            <ChevronLeftIcon className="main-table-chevron" onClick={() => pushToMain()}/>
            {user === undefined ? '' : (
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="main-table-table-cell"><Typography className="main-table-typography">Name:</Typography></TableCell>
                                <TableCell className="main-table-table-cell" align="right"><Typography className="main-table-typography">Hits:</Typography></TableCell>
                                <TableCell className="main-table-table-cell" align="right"><Typography className="main-table-typography">Rate:</Typography></TableCell>
                                <TableCell className="main-table-table-cell" align="right"><Typography className="main-table-typography">Place:</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">{user.name}</TableCell>
                                <TableCell align="right">{user.hits}</TableCell>
                                <TableCell align="right">{user.rate}</TableCell>
                                <TableCell align="right">{user.place}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    )
}

const mapStateToProps = ({users}, {match: {params: {id}}}) => ({user: users.find((item) => item.id === id)})

const mapDispatchToProps = {
    fetchUsers,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))

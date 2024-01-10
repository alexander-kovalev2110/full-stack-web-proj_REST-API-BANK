import React from 'react'
import Box from '@mui/material/Box'
import { Paper } from "@mui/material"
import { Table } from "@mui/material"
import { TableBody } from "@mui/material"
import { TableCell } from "@mui/material"
import { TableContainer } from "@mui/material"
import { TableHead } from "@mui/material"
import { TableRow } from "@mui/material"
import { Toolbar } from "@mui/material"
import { Button } from '@mui/material'
import { Stack } from '@mui/material'
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { nextPage, previousPage } from "../store/transSlice"
import { useAppSelector, useAppDispatch } from "../store/hook"

const TransTable: React.FC = () => {
    const  { tabAr, previousDisabled, nextDisabled } = useAppSelector(state => state.trans)

    const dispatch = useAppDispatch()

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>TransactionId</b></TableCell>
                            <TableCell><b>Amount</b></TableCell>
                            <TableCell><b>Date</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { tabAr.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.transactionId}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.date.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} ml={2} mt={2}>
                <Button variant="outlined" startIcon={<NavigateBeforeIcon />}
                        disabled={previousDisabled} 
                        onClick={() => dispatch(previousPage())}>
                    Previous
                </Button>
                <Button variant="outlined" startIcon={<NavigateNextIcon />}
                        disabled={nextDisabled} 
                        onClick={() => dispatch(nextPage())} >
                    Next
                </Button>
            </Stack>
        </Box>
    )
}

export default TransTable

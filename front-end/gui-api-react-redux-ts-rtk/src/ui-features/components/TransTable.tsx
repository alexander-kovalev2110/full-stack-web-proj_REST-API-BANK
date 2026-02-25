import React, { useEffect } from "react"

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

import { nextPage, previousPage } from "../../store/trans/trans.slice"
import { fetchTransactionsByFilter } from "../../store/trans/trans.thunks"
import { useAppSelector, useAppDispatch } from "../shared/hook"

import {
  selectPaginatedTransactions,
  selectPaginationState,
} from "../../store/trans/trans.selectors"

const TransTable: React.FC = () => {
    const dispatch = useAppDispatch()

    const tabAr = useAppSelector(selectPaginatedTransactions)
    const { previousDisabled, nextDisabled, page } =
        useAppSelector(selectPaginationState)

    const handlePrev = () => {
        dispatch(previousPage())
        dispatch(fetchTransactionsByFilter())
    }

    const handleNext = () => {
        dispatch(nextPage())
        dispatch(fetchTransactionsByFilter())
    }

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
                        onClick={handlePrev}>
                    Previous
                </Button>
                <Button variant="outlined" startIcon={<NavigateNextIcon />}
                        disabled={nextDisabled} 
                        onClick={handleNext} >
                    Next
                </Button>
            </Stack>
        </Box>
    )
}

export default TransTable

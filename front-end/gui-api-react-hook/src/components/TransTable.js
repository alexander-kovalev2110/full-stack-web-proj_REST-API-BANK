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

const page = 5          // Table page size

const TransTable = (props) => {
    const { transactions, offset, setOffset } = props

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
                        {transactions.filter((el, index) => ((index >= offset) && (index < offset + page)))
                            .map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.transactionId}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} ml={2} mt={2}>
                <Button disabled={!((offset - page) > 0)}
                        variant="outlined" startIcon={<NavigateBeforeIcon />}
                        onClick={() => setOffset(offset - page)}>
                    Previous
                </Button>
                <Button disabled={!((offset + page) < transactions.length)}
                        variant="outlined" startIcon={<NavigateNextIcon />}
                        onClick={() => setOffset(offset + page)}>
                    Next
                </Button>
            </Stack>
        </Box>
    )
}

export default TransTable
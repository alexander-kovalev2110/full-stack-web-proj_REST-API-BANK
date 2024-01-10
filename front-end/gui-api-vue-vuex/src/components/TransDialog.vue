<template>
    <v-dialog
        v-model="$store.state.transMod.transDialog"
        width="auto"
    >
        <v-card width="400">
            <v-card-text>
                <v-row v-for="(inp, index) in inpData[$store.state.transMod.command]" :key="index">
                    <v-col cols="12">
                        <v-text-field :id="inp.id" :label="inp.label" :type="inp.type"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="transRequest">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import store from '@/store'

// Data for creating an input dialog for the selected comand
const inpData = {}
inpData['Add Transaction'] = [{ id: 'amount', label: 'Amount', type: 'number' }]
inpData['Get Transaction'] = [{ id: 'transactionId', label: 'TransactionId', type: 'number' }]
inpData['Get Transaction by Filter'] = [{ id: 'amount', label: 'Amount', type: 'number' },
                                        { id: 'date', label: '', type: 'date' }]
inpData['Update Transaction'] = [{ id: 'transactionId', label: 'TransactionId', type: 'number' },
                                { id: 'amount', label: 'Amount', type: 'number' }]
inpData['Delete Transaction'] = [{ id: 'transactionId', label: 'TransactionId', type: 'number' }]
inpData[''] = []

const transRequest = () => {
        const payload = {}      // Object with input values for request (for creating url)

        switch (store.state.transMod.command) {
            case 'Add Transaction':
                payload.amount = document.getElementById('amount').value
                break

            case 'Get Transaction':
                payload.transactionId = document.getElementById('transactionId').value
                break

            case 'Get Transaction by Filter':
                payload.amount = document.getElementById('amount').value
                payload.date = document.getElementById('date').value
                break

            case 'Update Transaction':
                payload.transactionId = document.getElementById('transactionId').value
                payload.amount = document.getElementById('amount').value
                break

            case 'Delete Transaction':
                payload.transactionId = document.getElementById('transactionId').value
                break

            default:
        }

        store.commit('closeTransDialog'),
        store.dispatch('fetchTrans', payload)
    }
</script>
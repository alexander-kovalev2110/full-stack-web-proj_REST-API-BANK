<template>
    <v-dialog
        v-model="store.state.transMod.transOpen"
        width="auto"
    >

        <v-card width="400" class="position-relative">
        <!-- Close icon -->
            <v-btn
                icon="mdi-close"
                class="close-button"
                @click="store.commit('closeTrans')"
                variant="text"
            />

            <v-card-text>
                <v-row v-for="(inp, index) in inpData[store.state.transMod.command]" :key="index">
                    <v-col cols="12">
                        <v-text-field :id="inp.id" :label="inp.label" :type="inp.type"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" variant="outlined" prepend-icon="mdi-send"
                    @click="transRequest">Submit</v-btn>
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

        store.commit('closeTrans'),
        store.dispatch('fetchTrans', payload)
    }
</script>
<style scoped>
.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #616161;
  z-index: 1;
}
</style>
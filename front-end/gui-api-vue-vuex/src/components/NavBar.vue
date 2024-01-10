<template>
  <v-card flat >
    <v-container fluid>
      <v-row class="child-flex">
        <v-toolbar>
          <v-toolbar-title>REST-API-BANK {{ (customerId)? `Customer ${customerId}` : '' }}</v-toolbar-title>

          <v-btn prepend-icon="$vuetify"
                 @click="dialog = true">
            Login
          </v-btn>

          <v-btn prepend-icon="$vuetify"
                  @click="console.log('Signup')">
            Signup
          </v-btn>

          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <v-card width="400">
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field id="name" label="Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field id="pw" label="Password" type="password"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false,
                $store.dispatch('fetchCustomer', 'GET')">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
        </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
// import { mapGetters } from "vuex"
import { ref } from 'vue'
import store from '@/store'

let dialog = ref(false)
const customerId = ref(store.state.customerMod.customerId)


// export default {
//     data: () => ({
//       dialog: false
//     }),
//     computed: {
//     ...mapGetters({
//       customerId: 'getCustomer'
//     })
//   }
// }
</script>

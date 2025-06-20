<template>
  <v-dialog
    v-model="store.state.customerMod.authorOpen"
    width="auto"
  >
     <v-card width="400" class="position-relative">
      <!-- Close icon -->
      <v-btn
        icon="mdi-close"
        class="close-button"
        @click="store.commit('closeAuthor')"
        variant="text"
      />

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
        <v-btn color="primary" variant="outlined" prepend-icon="mdi-send"
            @click="handleSubmit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import store from '@/store'
// import router from '@/router'

const handleSubmit = () => {
  store.commit('closeAuthor')
  store.dispatch('fetchCustomer')
//   router.push({name: 'trans'})           // Go to page <TransPage>
};
</script>
<style scoped>
.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #616161;;
  z-index: 1;
}
</style>
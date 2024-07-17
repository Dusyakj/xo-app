<template>
  <router-view />
</template>

<script setup>
import { usePersonStore } from '/src/stores/PersonStore'
const store = usePersonStore()

const isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'))
if (isLoggedIn) {
  store.setLoggedIn()
  store.setPersonId(localStorage.getItem('PersonId'))
  store.setPersonName(localStorage.getItem('Name'))
}
</script>

<style scoped></style>

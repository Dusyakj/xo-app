<template>
  <div>игра</div>
  <xoGame />
</template>
<script setup>
// import { ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { usePersonStore } from '../stores/PersonStore'
import xoGame from '../components/xoGame.vue'

const route = useRoute()
const router = useRouter()
const store = usePersonStore()

const checkUserId = async () => {
  try {
    const res = await axios.post('http://localhost:3000/info/check', {
      gameId: route.params.id,
      userId: store.getPersonId
    })
    console.log(res.data.message)
    if (res.data.message != 'ok') {
      router.push('/')
    }
  } catch (e) {
    console.log(e)
  }
}

checkUserId()
</script>
<style></style>

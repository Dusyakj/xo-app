<template>
  <div class="field-cont">
    <xoField
      class="field"
      v-for="(pole, index) in game.value"
      :key="pole[0][0]"
      :index="index"
      :game="pole"
      :isTurn="isTurn"
      :now="now"
      :ws="ws"
    />
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import xoField from './xoField.vue'
import { usePersonStore } from '@/stores/PersonStore'
const game = reactive([])

const route = useRoute()
const store = usePersonStore()

const ws = new WebSocket('ws://localhost:3000/game')

const isTurn = ref(false)
const now = ref(0)

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      method: 'connection',
      gameId: route.params.id
    })
  )
}

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data)
  console.log(data)

  if (`${data._id}` == route.params.id) {
    game.value = data.game
    now.value = data.now
    if (data.turn == store.getPersonId) {
      isTurn.value = true
    } else {
      isTurn.value = false
    }
  }
  console.log(now.value, isTurn.value)
}
</script>
<style>
.field {
  display: flex;
}
.field-cont {
  display: flex;
  flex-wrap: wrap;
  height: 390px;
  width: 390px;
}
</style>

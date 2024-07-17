<template>
  <div class="pole-cont">
    <div class="" v-if="props.game[0] != '-'">{{ props.game[0] }}</div>
    <div v-else v-for="(pole, index) in props.game.slice(1)" :key="pole" class="pole">
      <div
        @click="sendTurn(index + 1)"
        class="pointer"
        v-if="pole == '-' && (props.now == 0 || props.now == props.index + 1) && isTurn"
      >
        +
      </div>
      <div class="" v-if="pole != '-'">{{ pole }}</div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { usePersonStore } from '../stores/PersonStore'

const store = usePersonStore()
const route = useRoute()

const props = defineProps({
  game: Array,
  index: Number,
  now: Number,
  isTurn: Boolean,
  ws: Object
})

// const ws = new WebSocket('ws://localhost:3000/game')

const sendTurn = (pole) => {
  const id = store.getPersonId
  try {
    props.ws.send(
      JSON.stringify({
        method: 'turn',
        id: id,
        gameId: route.params.id,
        field: props.index + 1,
        pole: pole
      })
    )
  } catch (e) {
    console.log(e)
  }
}
</script>
<style>
.pole-cont {
  flex-wrap: wrap;
  height: 90px;
  width: 90px;
  display: flex;
  margin: 20px;
}

.pole {
  height: 33%;
  width: 33%;
  border: 1px solid black;
}

.pointer {
  cursor: pointer;
}
</style>

<template lang="">
  <div>Поиск</div>
  <el-button @click="createGame()"> Создать игру </el-button>
  <div>
    <div v-for="game in games.value" :key="game._id">
      Игрок : {{ game.name }} Рейтинговая игра {{ game.isRating }}
      <el-button @click="acceptGame(game._id, game.name, game.id)">Присоединиться к игре</el-button>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { usePersonStore } from '../stores/PersonStore'
import axios from 'axios'
import { useRouter } from 'vue-router'

const store = usePersonStore()
const router = useRouter()

const games = reactive([])
const ws = new WebSocket('ws://localhost:3000/search-game')

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      method: 'connection'
    })
  )
}

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data)
  console.log(data)
  if (data.id == 1) {
    games.value = data.games
    console.log(games.value)
  } else {
    if (data.userId == store.getPersonId) {
      router.push(`/game/${data.id}`)
    }
  }
}

const createGame = () => {
  const id = store.getPersonId
  const name = store.getPersonName
  ws.send(
    JSON.stringify({
      method: 'add',
      info: {
        id: id,
        name: name,
        isRating: false
      }
    })
  )
}

const acceptGame = async (id, name, userid) => {
  const gameId = id
  console.log(gameId)
  ws.send(
    JSON.stringify({
      method: 'delete',
      gameId: gameId
    })
  )
  try {
    const res = await axios.post('http://localhost:3000/game/create-game', {
      id1: userid,
      id2: store.getPersonId,
      name1: name,
      name2: store.getPersonName
    })
    ws.send(
      JSON.stringify({
        method: 'start',
        user: userid,
        gameId: res.data._id
      })
    )
    router.push(`/game/${res.data._id}`)
  } catch (e) {
    console.log(e)
  }
}

// ws.on('open', function open() {
//   ws.send('something')
// })

// ws.on('message', function message(data) {
//   console.log('received: %s', data)
// })
</script>
<style lang=""></style>

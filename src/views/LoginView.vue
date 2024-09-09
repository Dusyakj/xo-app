<template>
  <div>
    <el-input v-model="login" style="width: 240px" placeholder="Please input" />
    <el-input
      v-model="password"
      style="width: 240px"
      type="password"
      placeholder="Please input password"
      show-password
    />
    <el-button @click="toLogin"> Войти </el-button>
    <el-button @click="router.push('/registration')">зарегистрироваться</el-button>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePersonStore } from '../stores/PersonStore'

const router = useRouter()
const store = usePersonStore()
const login = ref('')
const password = ref('')

const toLogin = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      username: login.value,
      password: password.value
    })
    console.log(res.data)
    if (res.data.message == 'Success') {
      store.setLoggedIn()
      store.setPersonId(res.data.id)
      store.setPersonName(res.data.name)
      router.push('/')
    } else {
      login.value = ''
      password.value = ''
    }
  } catch (e) {
    console.log(e)
  }
}
</script>
<style></style>

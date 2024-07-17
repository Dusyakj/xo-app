<template>
  <div>
    <el-input v-model="login" style="width: 240px" placeholder="Please input" />
    <el-input v-model="name" style="width: 240px" placeholder="Please input" />
    <el-input
      v-model="password"
      style="width: 240px"
      type="password"
      placeholder="Please input password"
      show-password
    />
    <el-button @click="toRegistration">Зарегистрироваться</el-button>
    <el-button @click="router.push('/login')">войти</el-button>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref('')
const name = ref('')
const password = ref('')

const toRegistration = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/registration', {
      username: login.value,
      password: password.value,
      name: name.value
    })
    console.log(res.data)
    if (res.data.message == 'User is registered') {
      router.push('/login')
    } else {
      login.value = ''
      password.value = ''
      name.value = ''
    }
  } catch (e) {
    console.log(e)
  }
}
</script>
<style></style>

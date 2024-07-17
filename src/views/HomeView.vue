<template>
  <div class="cont">
    <el-menu
      class="el-menu-demo"
      style="justify-content: space-between"
      mode="horizontal"
      :ellipsis="false"
    >
      <div class="">
        <el-button style="height: 100%; border: none" @click="router.push('/')">XO</el-button>
        <el-button style="height: 100%; border: none" @click="router.push('/games')"
          >Поиск игры</el-button
        >
      </div>
      <el-dropdown trigger="click">
        <el-button style="height: 100%; border: none; font-size: 15px">
          {{ store.getPersonName }}
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/profile')"> Профиль </el-dropdown-item>
            <el-dropdown-item @click="logOut"> Выйти </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePersonStore } from '../stores/PersonStore'

const router = useRouter()
const store = usePersonStore()

const logOut = () => {
  store.setLogOut()
  router.push('/login')
}
</script>

<style>
.cont {
  height: 100vh;
  width: 100%;
}
</style>

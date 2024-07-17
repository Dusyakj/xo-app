import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePersonStore = defineStore('PersonStore', () => {
  const LoggedIn = ref(false)
  const PersonId = ref('')
  const Name = ref('')

  const getLoggedIn = computed(() => LoggedIn.value)

  const getPersonId = computed(() => PersonId.value)

  const getPersonName = computed(() => Name.value)

  const setLoggedIn = () => {
    LoggedIn.value = true
    localStorage.setItem('LoggedIn', true)
  }
  const setLogOut = () => {
    LoggedIn.value = false
    PersonId.value = ''
    Name.value = ''
    localStorage.removeItem('LoggedIn')
    localStorage.removeItem('PersonId')
    localStorage.removeItem('Name')
  }
  const setPersonId = (value) => {
    PersonId.value = value
    localStorage.setItem('PersonId', value)
  }
  const setPersonName = (value) => {
    Name.value = value
    localStorage.setItem('Name', value)
  }
  return {
    LoggedIn,
    getLoggedIn,
    getPersonId,
    getPersonName,
    PersonId,
    Name,
    setLoggedIn,
    setPersonId,
    setPersonName,
    setLogOut
  }
})

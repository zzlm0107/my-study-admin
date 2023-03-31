// 用户状态模块
import { defineStore } from "pinia"

export default defineStore({
  id: "user",
  state: () => ({
    token: '',
    nickname: ''
  }),
  actions: {
    getUserInfo() {
      return new Promise(((resolve, reject) => {

      }))
    }
  }
})


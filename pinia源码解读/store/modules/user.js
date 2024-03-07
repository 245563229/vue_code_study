import storage from "@utils/storage";
import {reactive, computed} from 'vue';
// 笔记1
// setupOptions选项式
const useUserStore = defineStore("user", {
  state: () => ({
    token: storage.getStorage("token") || "",
    userInfo: storage.getStorage("userInfo") || {},
  }),
  actions: {
    // 设置token
    setToken(data) {
      return new Promise((resolve) => {
        this.token = data;
        console.log(data);
        storage.setStorage("token", data);
        return resolve(data);
      });
    },
    // 设置userInfo
    setUserInfo(data) {
      return new Promise((resolve) => {
        this.userInfo = data;
        this.name = data.name;
        storage.setStorage("userInfo", data);
        console.log(data);
        return resolve(data);
      });
    },
  },
});

// setup组合式
const useUserStore2 = defineStore('user2', () => {
  const state = reactive({
    token: storage.getStorage("token") || "",
    userInfo: storage.getStorage("userInfo") || {},
  })

  const setToken = (data) => {
    return new Promise((resolve) => {
      state.token = data;
      storage.setStorage("token", data);
      return resolve(data);
    });
  }
  // 设置userInfo
  const setUserInfo = (data) => {
    return new Promise((resolve) => {
      state.userInfo = data;
      storage.setStorage("userInfo", data);
      return resolve(data);
    });
  }
  return {state,setToken,setUserInfo}
})
export default useUserStore;

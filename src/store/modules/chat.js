const state = {
    show: false,
    userArr: [],
    activeUser: null,
    isSmall: false,
    isShowChat: false,
    update: 1,
    noRead: null,
    isCloseWebsocket: false
}
const getters = {

}

const actions = {
    getNoReadMessage({ commit },data){
      commit('getNoReadMessage',data)
    },
    show({ commit }, data) {
        commit('show', data)
    },
    close({ commit }) {
        commit('close')
    },
    closeThis({ commit }, data) {
        commit('closeThis', data)
    },
    select({ commit }, data) {
        commit('select', data)
    },
    small({ commit }) {
        commit('small')
    },
    closeWebChat({ commit }) {
        commit('closeWebChat')
    },
    openWebChat({ commit }) {
        commit('openWebChat')
    },
    updateChat( { commit }){
        commit("updateChat")
    },
    closeWebsoket( { commit },val ){
        commit("closeWebsoket",val)
    }
}

const mutations = {
    closeWebsoket(state,val){ //关闭websocket连接
         state.isCloseWebsocket = val
    },
    getNoReadMessage(state,data){
        if(data == 0){
            data = null
        }
        state.noRead = data
    },
    updateChat(state){
        state.update++
    },
    small(state) {
        state.show = false
        state.isSmall = true
    },
    show(state, data) { //弹出聊天窗口 and 改变当前聊天窗口
        console.log(data)
        state.show = true
        state.isSmall = false
        if(!data){
            return;
        }
        if(state.activeUser.receiverId == data.receiverId){ 
            return;
        }
        for (let i = 0; i < state.userArr.length; i++) {
            if (state.userArr[i].receiverId == data.receiverId) {
                state.userArr.splice(i, 1)
            }
        }
        state.userArr.push(data)
        state.activeUser = data
    },
    close(state) { //关闭所有聊天窗口
        state.show = false
        sessionStorage.clear()
        state.activeUser = []
        state.userArr = []
    },
    closeThis(state, data) { //关闭当前聊天窗口
        sessionStorage.removeItem(state.activeUser.receiverId)
        console.log(state.activeUser, "这是当前的数组")
        for (let i = 0; i < state.userArr.length; i++) {
            if (state.userArr[i].receiverId == data.receiverId) {
                if (state.activeUser.receiverId == data.receiverId) { //替换当前窗口
                    if (state.userArr[i - 1]) {
                        state.activeUser = state.userArr[i - 1]
                    } else {
                        state.activeUser = state.userArr[i + 1]
                    }
                }
                state.userArr.splice(i, 1)

            }
        }
    },
    select(state, data) { //聊天框侧边切换聊天窗口
        state.activeUser = data
    },
    closeWebChat(state) {
        state.isShowChat = false
    },
    openWebChat(state) {
        state.isShowChat = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
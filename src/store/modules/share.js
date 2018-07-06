const state = {
    url: 'www.baidu.com',
    title: "无",
    img: "无",
    show: false
}
const getters = {

}

const actions = {
    changeUrl({ commit }, data) {
        commit('changeUrl', data)
    },
    showShare({ commit }){
        commit('showShare')
    },
    hideShare( { commit }){
        commit('hideShare')
    }
}

const mutations = {
    changeUrl(state,data) {
        sessionStorage.setItem("share_url",data.url)
        sessionStorage.setItem("share_title",data.title)
        sessionStorage.setItem("share_img",data.img)
        state.url = data.url
        state.img = data.img
        state.title = data.title
    },
    showShare(state){
        state.show = true
    },
    hideShare(state){
        state.show = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
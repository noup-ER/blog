import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        currentPage:'Home'
    },
    mutations:{
        changeCurrentPage(state,currentPage){
            state.currentPage = currentPage;
        }
    }
})

export default store;

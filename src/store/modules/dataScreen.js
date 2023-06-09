const hasFull = JSON.parse(localStorage.getItem('isDataScrrenFull'))
const state = {
    isDataScrrenFull: hasFull ? hasFull : false
}

const mutations = {
    CHANGE_FULL:(state, isDataScrrenFull) => {
        state.isDataScrrenFull = isDataScrrenFull
        localStorage.setItem('isDataScrrenFull',JSON.stringify(isDataScrrenFull))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
  }
  
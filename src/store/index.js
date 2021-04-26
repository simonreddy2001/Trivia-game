import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        categories: [],
        questions: null,
        inputs: {
              userName: "",
              noOfQ: null,
              category: null,
              difficulty: null,
              type: null,},
        userAnswers: [],
        displayQuestions: [],
        step: 0,
        score: 0,
        error: "",
        routerError: "",
    },
    mutations: {
        setDifficulty: (state, payload) => {
            state.difficulty = payload;
        },
        setType: (state, payload) => {
            state.type = payload;
        },
        setNoOfQ: (state, payload) => {
            state.noOfQ = payload;
        },
        setInputs: (state, payload) => {
            state.inputs = payload;
        },
        setCategories: (state, payload) => {
            state.categories = payload;
        },
        setUsername: (state, payload) => {
            state.userName = payload;
        },
        setQuestions: (state, payload) => {
            state.questions = payload;
        },
        resetUserAnswers: (state) => {
            state.userAnswers = [];
        },
        setUserAnswer: (state, payload) => {
            state.userAnswers.push(payload);
        },
        setDisplayQuestions: (state, payload) => {
            state.displayQuestions.push(payload);
        },
        setScore: (state, payload) => {
            state.score = payload;
        },
        setError: (state, payload) => {
            state.error = payload;
        },
        setRouterError: (state, payload) => {
            state.routerError = payload;
        },
    },
    getters: {
    
    },
    actions: {
        async fetchQuestions({ commit, state }, router) {
            const { inputs } = state;
            try {
                const questions = await fetch(
                    `https://opentdb.com/api.php?amount=${inputs.noOfQ}&category=${inputs.category}&difficulty=${inputs.difficulty}&type=${inputs.type}`
                )
                    .then(response => response.json())
                    .then(data => data.results);
        
                if (questions.length) {
                    commit("setQuestions", questions)
                    router.push("/games");
                } else {
                    commit(
                        "setError",
                        "There was no questions found with those options"
                    );
                }
            } catch (e) {
                commit("setError", e.message);
            }
        },
        async fetchCategories({ commit }) {
            try {
                const categories = await fetch('https://opentdb.com/api_category.php')
                .then(response => response.json())
                .then(data => data.trivia_categories);
                commit("setCategories", categories);
            } catch (e) {
                commit("setError", e.message);
            }
        },
    },
    

});
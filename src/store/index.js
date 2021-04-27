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
        displayQuestions: null,
        score: 0,
        error: "",
        routerError: "",
        allQuestions: 0,
        answeredQuestions: 0,
        correctlyAnsweredQuestions: 0,
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
        setDisplayQuestions: (state, payload) => {
            state.displayQuestions= payload;
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
        // calculateScore ({commit, state}){
        //     const score = state.questions.reduce(
        //         (count, currentQuestion) => {
        //           if (currentQuestion.rightAnswer) {
        //             count++;
        //           }
        //           return count;
        //         },
        //         0
        //       )
        //       commit("setScore", score)
        // },
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

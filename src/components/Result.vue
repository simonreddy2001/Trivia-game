<template>
  <div class="game-box">
    <div class="quiz-container">
      <div class="quiz-top">
        <h1>Congratulations!</h1>
        <h3>You've completed your Quiz!</h3>
        </div>
          <div class="quiz-middle" id="score">
            <h1>
              You answered <span class="highlight">% correctly!</span>Answered
              <span class="highlight"></span>questions.
            </h1>
            <!-- <div id="score">
              You answered
              <span class="highlight"
                >{{
                  Math.floor(
                    (quizScore.correctlyAnsweredQuestions /
                      quizScore.allQuestions) *
                      100
                  )
                }}
                % correctly!</span
              >
              Answered
              <span class="highlight"
                >{{ quizScore.correctlyAnsweredQuestions }} out of
                {{ quizScore.answeredQuestions }}</span
              >
              {{ displayQuestions() }}
              
            </div> -->
            
            <!-- <ResultQuestion
            v-for="(question, index) in questions"
            :key="index"
            :question="question"
            :userAnswer="userAnswers[index]"
        /> -->
        <!-- <h5 class="mb-3">{{ question.question }}</h5>
        <ul class="list-group">
            <li
                class="list-group-item"
                v-for="(answer, index) in getCurrentAnswers"
                :key="index"
            >
                <span :class="checkAnswer(answer)">{{
                    decodeURIComponent(answer)
                }}</span>
            </li>
        </ul> -->

<p v-for="(result, index) in displayQuestions" :key="index">{{ displayQuestions }}</p>
          
            
            <p v-for="(answer, index) in userAnswers" :key="index">{{ answer }}</p>
          </div>
        
        <div class="quiz-bottom">
          <button @click="playNewGame">
                Wanna Try A New Game
            </button>
            <button  @click="playSameGame">
                Reset Game With Same Options
            </button>

        </div>
      </div>
    </div>
</template>

<script>

import { mapActions, mapState } from "vuex";

export default {
  name: "Result",
  computed: {
    ...mapState(["userAnswers", "questions", "inputs","score","displayQuestions"]),
  },
  data() {
    return {
      quizKey: 0,
      quizScore: {
        allQuestions: 0,
        answeredQuestions: 0,
        correctlyAnsweredQuestions: 0,
      },
    };
  },
  methods: {
    ...mapActions([""]),
    playNewGame() {
            this.$router.push("/");
        },
        playSameGame() {
            this.fetchQuestions(this.$router.push("/games"))
        },
        displayQuestions(){
          this.questions
        },
   
        // checkAnswer(answer) {
        //     if (
        //         answer === this.question.correct_answer &&
        //         answer === this.userAnswer
        //     ) {
        //         return "text-success fw-bold";
        //     }
        //     if (answer === this.userAnswer) {
        //         return "text-danger fw-bold";
        //     }
        //     if (answer === this.question.correct_answer) {
        //         return "text-success fw-bold";
        //     }
        //     return "";
        // },


    created() {
    this.getQuestions();
  },
  },
};
</script>

<style scoped>
</style>

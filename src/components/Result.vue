<template>
  <div class="game-box">
    <div class="quiz-container">
      <h1 id="logo-headline">Trivia-Game</h1>
      <p>Amazing -- {{ inputs.userName }}</p>
      <div class="quiz-top">
        <h3>Congratulations! You've completed your Quiz!</h3>
      </div>
      <div class="quiz-middle">
        <h1>You scored {{ score * 10 }} out of {{ inputs.noOfQ * 10 }}.</h1>
        <div v-for="(question, index) in displayQuestions" :key="index">
          <p v-html="question.question" />
          <div class="tables">
            <table>
              <tr>
                <th>Correct Answer</th>
                <th>Your Answer</th>
              </tr>
              <tr>
                <td v-html="question.correct_answer" />
                <td v-html="question.userAnswer" />
              </tr>
            </table>
          </div>
        </div>
        </div>
        <div class="quiz-bottom">
          <button @click="playNewGame">Wanna Try A New Game</button>
          <button @click="playSameGame">Reset Game With Same Options</button>
        </div>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Result",
  computed: {
    ...mapState([
      "userAnswers",
      "questions",
      "inputs",
      "score",
      "displayQuestions",
      "resetUserAnswers",
      "correctAnswers",
    ]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["calculateScore"]),
    playNewGame() {
      this.$router.push("/");
    },
    playSameGame() {
      this.fetchQuestions(this.$router.push("/games"));
    },
    created() {
      this.calculateScore();
    },

  },
};
</script>

<style scoped>

</style>

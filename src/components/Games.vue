<template>
  <div class="game-box">
    <div class="quiz-container">
      <h1>Trivia-Game</h1>
      <p>All the best -- {{ inputs.userName }}</p>

      <div class="quiz-top">
        Currently at question {{ index + 1 }} of {{ questions.length }}
      </div>
      <hr />
      <div class="quiz-middle">
        <h1
          v-html="currentQuestion ? currentQuestion.question : 'Loading...'"
        ></h1>
        <form v-if="currentQuestion">
          <button
            v-for="answer in currentQuestion.answers"
            :index="currentQuestion.key"
            :key="answer"
            v-html="answer"
            @click.prevent="handleButtonClick($event, answer)"
          ></button>
        </form>
        <hr class="divider" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Games",
  data() {
    return {
      questions: [],
      index: 0,
    };
  },
  props: {},
  computed: {
    ...mapState(["inputs"]),
    currentQuestion: function () {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    },
    correctAnswers: function () {
      if (this.questions && this.questions.length > 0) {
        let streakCounter = 0;
        this.questions.forEach(function (question) {
          if (!question.rightAnswer) {
            return;
          } else if (question.rightAnswer === true) {
            streakCounter++;
          }
        });
        return streakCounter;

      } else {
        return "--";
      }
    },
    quizCompleted: function () {
      if (this.questions.length === 0) {
        return false;
      }
      /* Check if all questions were answered */
      let questionsAnswered = 0;
      this.questions.forEach(function (question) {
        question.rightAnswer !== null ? questionsAnswered++ : null;
      });
      return questionsAnswered === this.questions.length;
    },
  },
  watch: {
    quizCompleted: function (completed) {
      completed &&
        setTimeout(() => {
          this.$emit("quiz-completed");
        }, 1000);
      if (!this.error) {
        this.$router.push("/result");
      }
    },
  },
  methods: {
    ...mapMutations(["setDisplayQuestions", "setScore"]),
    getQuestions: async function () {
      let quiz = [];
      await fetch(
        `https://opentdb.com/api.php?amount=${this.inputs.noOfQ}&category=${this.inputs.category}&difficulty=${this.inputs.difficulty}&type=${this.inputs.type}`
      )
        .then((res) => res.json())
        .then((jsonResponse) => {
          let index = 0;
          jsonResponse.results.map((question) => {
            question.answers = [
              question.correct_answer,
              ...question.incorrect_answers,
            ];

            /* Shuffle question.answers array */
            for (let i = question.answers.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [question.answers[i], question.answers[j]] = [
                question.answers[j],
                question.answers[i],
              ];
            }
            question.rightAnswer = null;
            question.key = index;
            index++;
          });
          quiz = jsonResponse.results;
        });
      this.questions = quiz;
      this.setDisplayQuestions(this.questions);
    },
    handleButtonClick: function (event) {
      /* Find index to identiy question object in data */
      let index = event.target.getAttribute("index");
      let pollutedUserAnswer = event.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
      /* Clear from pollution with ' */
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");

      /* Set userAnswer on question object in data */
      this.questions[index].userAnswer = userAnswer;
      /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
      event.target.classList.add("clicked");
      let allButtons = document.querySelectorAll(`[index="${index}"]`);

      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === event.target) continue;

        allButtons[i].setAttribute("disabled", "");
      }
      /* Invoke checkAnswer to check Answer */
      this.checkAnswer(event, index);
    },
    checkAnswer: function (event, index) {
      let question = this.questions[index];
      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(
            function () {
              this.index += 1;
            }.bind(this),
            1000
          );
        }
        if (question.userAnswer === question.correct_answer) {
          this.questions[index].rightAnswer = true;
          this.setScore((this.score)+1)
        } else {
          this.questions[index].rightAnswer = false;
        }
      }
    },
  },
  mounted() {
    this.getQuestions();
  },
};
</script>

<style scoped>
.divider {
  margin: 0.5rem 0;
  border: 3px solid rgba(102, 255, 166, 0.7);
  border-radius: 2px;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 1.3rem;
  padding: 0.7rem;
}

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  font-size: 1.1rem;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0.3rem;
  width: 47%;
  background-color: rgba(100, 100, 100, 0.3);
  border: none;
  border-radius: 0.4rem;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
}

button:hover:enabled {
  transform: scale(1.02);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
}

button:focus {
  outline: none;
}

button:active:enabled {
  transform: scale(1.05);
}

button.clicked {
  pointer-events: none;
}

@keyframes flashButton {
  0% {
    opacity: 1;
    transform: scale(1.01);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

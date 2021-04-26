<template>
  <div class="game-box">
    <div class="quiz-container">
      <div class="quiz-top"><h1>Welcome to Trivia Game</h1></div>
      <div class="quiz-middle">
        <label>Enter Your Name</label>
        <input
          v-model="inputs.userName"
          placeholder="User Name"
          name="userName"
          id="userName"
        />

        <label for="difficulty">select difficulty:</label>
        <select v-model="inputs.difficulty" name="difficulty" id="difficulty">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>

        <p>Select number of questions</p>
        <input
          v-model="inputs.noOfQ"
          name="noOfQ"
          id="noOfQ"
          type="number"
          min="1"
          max="50"
        />

        <p>Select type of quiz</p>
        <select v-model="inputs.type" name="type" id="type">
          <option disabled>Please select one</option>
          <option>multiple</option>
          <option>boolean</option>
        </select>

        <p>Select catogery</p>
        <select v-model="inputs.category" name="category" id="category">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>

        <div class="quiz-bottom">
          <button @click="onEnterClick">Enter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Enter",
  data() {
    return {
      userName: "",
      noOfQ: null,
      category: "1",
      difficulty: null,
      type: null,
    };
  },
  computed: {
    ...mapState(["error", "inputs", "categories"]),
  },
  methods: {
    ...mapActions(["fetchCategories"]),
    ...mapMutations(["setUsername", "getQuestions"]),
    noQuestions(event) {
      this.inputs.noOfQ = event.target.value;
    },
    onEnterClick() {
      if (!this.error) {
        this.$router.push("/games");
      }
    },
    onUsername(event) {
      this.setUsername(event.target.value.trim());
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

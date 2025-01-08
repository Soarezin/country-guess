<template>
  <v-container class="game-container" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <div class="game-header">
          <h1>O Jogo da Bandeira</h1>
          <p class="subtitle">Descubra qual é o país. Você tem 6 tentativas.</p>
        </div>
        <div class="rule-counter">
          Tentativa {{ totalGuesses + 1 }} de 6
        </div>
        <div class="game-card">
          <div class="flag-box">
            <v-img
              :src="flag"
              alt="Bandeira do país"
              height="200px"
              contain
              class="game-flag"
            />
          </div>
          <div class="hint-box" :class="{ 'pulse': newHint }">
            <span class="hint-number">DICA #{{ totalGuesses + 1 }}</span>
            <p class="hint-text">{{ hint }}</p>
          </div>
          <input_guess
            :country="randomCountry"
            :total-guesses="totalGuesses"
            :guess-is-correct="guessIsCorrect"
            @guess="userGuess"
            @reset="resetGame"
            class="guess-input"
          />
          <transition name="fade">
            <div v-if="message" class="message-box" :class="{ 'success': guessIsCorrect, 'error': !guessIsCorrect }">
              {{ message }}
            </div>
          </transition>
          <div v-if="lastGuess.length > 0" class="previous-guesses">
            <h3>Tentativas Anteriores:</h3>
            <div class="guess-list">
              <div v-for="(guess, index) in lastGuess" 
                   :key="index" 
                   class="guess-item"
                   :class="{ 'latest': index === lastGuess.length - 1 }">
                {{ guess }}
              </div>
            </div>
          </div>
        </div>
        <div class="lives-counter">
          <span v-for="n in 6" :key="n" 
                class="life-icon"
                :class="{ 'lost': n <= totalGuesses }">
            ❤️
          </span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Input_guess from "./Input_guess.vue";

export default {
  name: "MainScreen",
  components: {
    Input_guess,
  },
  data() {
    return {
      countries: [],
      randomCountry: null,
      hint: null,
      message: null,
      lastGuess: [],
      flag: null,
      totalGuesses: 0,
      guessIsCorrect: false,
      newHint: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch("app/loadCountries").then((res) => {
        this.countries = res;
        this.chooseRandomCountry();
      });
    },
    chooseRandomCountry() {
      this.randomCountry =
        this.countries[Math.floor(Math.random() * this.countries.length)];
      this.setHint();
      this.getFlag();
    },
    getFlag() {
      this.flag = this.randomCountry.flags.png;
    },
    setHint() {
      if (this.randomCountry) {
        const hints = [
          `Este país está localizado no continente ${this.randomCountry.continents[0]}.`,
          `A população deste país é de ${this.randomCountry.population.toLocaleString('pt-BR')} habitantes.`,
          `Este país está no fuso horário ${this.randomCountry.timezones[0]}.`,
        ];
        this.hint = hints[Math.floor(Math.random() * hints.length)];
        this.newHint = true;
        setTimeout(() => {
          this.newHint = false;
        }, 1000);
      }
    },
    userGuess(userInput) {
      this.lastGuess.push(userInput);
      const countryNames = [
        this.randomCountry.name.common.toLowerCase(),
        this.randomCountry.name.official.toLowerCase(),
      ];
      if (this.randomCountry.translations?.por) {
        countryNames.push(
          this.randomCountry.translations.por.common.toLowerCase(),
          this.randomCountry.translations.por.official.toLowerCase()
        );
      }
      if (countryNames.includes(userInput.toLowerCase())) {
        this.message = "✨ País correto! Você venceu! ✨";
        this.guessIsCorrect = true;
      } else {
        this.message = "Resposta incorreta. Tente novamente.";
        this.setHint();
      }
      this.totalGuesses++;
      if (this.totalGuesses === 6) {
        this.message = `Fim de jogo. O país era ${this.randomCountry.translations.por.common}.`;
      }
    },
    resetGame() {
      this.totalGuesses = 0;
      this.guessIsCorrect = false;
      this.lastGuess = [];
      this.message = null;
      this.chooseRandomCountry();
    },
  },
};
</script>

<style scoped>
.game-container {
  background-color: #1a1a1a;
  min-height: 100vh;
  padding: 2rem;
  color: #ffffff;
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;
}

.game-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.subtitle {
  color: #888;
  font-size: 1.1rem;
}

.rule-counter {
  background-color: #00ff00;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: bold;
}

.game-card {
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
}

.flag-box {
  background-color: #333;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid #00ff00;
}

.game-flag {
  border-radius: 4px;
}

.hint-box {
  background-color: #333;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #00ff00;
}

.hint-box.pulse {
  animation: pulse 1s ease-in-out;
}

.hint-number {
  color: #00ff00;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.hint-text {
  color: #fff;
  font-size: 1.1rem;
  margin: 0;
}

.message-box {
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
  font-weight: bold;
}

.message-box.success {
  background-color: rgba(0, 255, 0, 0.1);
  color: #00ff00;
  border: 1px solid #00ff00;
}

.message-box.error {
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff0000;
  border: 1px solid #ff0000;
}

.previous-guesses {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #444;
}

.guess-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.guess-item {
  background-color: #333;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-family: monospace;
}

.guess-item.latest {
  border: 1px solid #00ff00;
  animation: highlight 1s ease-in-out;
}

.lives-counter {
  text-align: center;
  margin-top: 1rem;
}

.life-icon {
  font-size: 1.5rem;
  margin: 0 0.25rem;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.life-icon.lost {
  opacity: 0.3;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes highlight {
  0% { background-color: #00ff00; }
  100% { background-color: #333; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

:deep(.v-text-field) {
  background-color: #333 !important;
  border-radius: 4px;
  font-family: monospace;
}

:deep(.v-text-field input) {
  color: #00ff00 !important;
}

:deep(.v-text-field .v-label) {
  color: #666 !important;
}
</style>
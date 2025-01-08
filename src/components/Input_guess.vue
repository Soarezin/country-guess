<template>
  <div class="input-container">
    <v-form class="text-center" @submit.prevent="submitGuess">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="terminal-prompt">
              <span class="prompt-symbol">></span>
              <v-text-field
                v-model="guess"
                label="DIGITE O NOME DO PAÍS"
                type="text"
                variant="outlined"
                clearable
                clear-icon="mdi-close-circle"
                @keyup.enter="submitGuess"
                :disabled="totalGuesses === 6 || guessIsCorrect"
                class="terminal-input"
                :class="{ 'disabled': totalGuesses === 6 || guessIsCorrect }"
              />
            </div>
          </v-col>
        </v-row>
        <v-row class="button-container">
          <v-col cols="12">
            <v-btn
              @click="submitGuess"
              :disabled="totalGuesses === 6 || guessIsCorrect"
              class="terminal-button submit-btn"
              elevation="0"
            >
              <span class="button-content">
                <span class="button-icon">[</span>
                ENVIAR
                <span class="button-icon">]</span>
              </span>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              v-if="totalGuesses > 0"
              @click="resetGame"
              class="terminal-button reset-btn"
              elevation="0"
            >
              <span class="button-content">
                <span class="button-icon">{</span>
                REINICIAR
                <span class="button-icon">}</span>
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "InputGuess",
  props: {
    country: {
      type: Object,
      required: true
    },
    totalGuesses: {
      type: Number,
      required: true
    },
    guessIsCorrect: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      guess: "",
    };
  },
  methods: {
    submitGuess() {
      if (this.guess.trim()) {
        this.$emit("guess", this.guess);
        this.guess = "";
      }
    },
    resetGame() {
      this.$emit("reset");
    }
  },
};
</script>

<style scoped>
.input-container {
  margin: 1rem 0;
}

.terminal-prompt {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 4px;
  padding: 0 0.5rem;
  padding-top: 20px;
}

.prompt-symbol {
  color: #00ff00;
  font-family: monospace;
  font-size: 1.5rem;
  margin-right: 0.5rem;
  animation: blink 1s step-end infinite;
  margin-bottom: 25px;
}

:deep(.terminal-input) {
  background-color: transparent !important;
}

:deep(.terminal-input .v-field__field) {
  color: #00ff00 !important;
  font-family: monospace !important;
  font-size: 1.1rem !important;
}

:deep(.terminal-input .v-field__outline) {
  border-color: #00ff00 !important;
  opacity: 0.5;
}

:deep(.terminal-input:hover .v-field__outline) {
  border-color: #00ff00 !important;
  opacity: 0.8;
}

:deep(.terminal-input.disabled) {
  opacity: 0.5;
}

:deep(.terminal-input .v-label) {
  color: #00ff00 !important;
  font-family: monospace !important;
  opacity: 0.7;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.terminal-button {
  background-color: transparent !important;
  border: 1px solid #00ff00 !important;
  color: #00ff00 !important;
  font-family: monospace !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
  padding: 0.5rem 2rem !important;
  transition: all 0.3s ease !important;
  min-width: 200px !important;
}

.terminal-button:hover:not(:disabled) {
  background-color: rgba(0, 255, 0, 0.1) !important;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3) !important;
}

.terminal-button:disabled {
  opacity: 0.5 !important;
  border-color: #666 !important;
  color: #666 !important;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button-icon {
  font-size: 1.2rem;
  opacity: 0.8;
}

.submit-btn .button-icon {
  color: #00ff00;
}

.reset-btn {
  border-color: #ff3366 !important;
  color: #ff3366 !important;
}

.reset-btn:hover {
  background-color: rgba(255, 51, 102, 0.1) !important;
  box-shadow: 0 0 10px rgba(255, 51, 102, 0.3) !important;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Animação para o botão desabilitado */
.terminal-button:disabled::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.1) 10px,
    rgba(0, 0, 0, 0.1) 20px
  );
}
</style>
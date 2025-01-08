// Utilities
import { createStore } from "vuex";
import app from "./app.js";

// Cria o store
const store = createStore({
  modules: {
    app,
  },
});

export default store;

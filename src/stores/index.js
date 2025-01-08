import { createStore } from "vuex";
import app from "./app.js";

const store = createStore({
  modules: {
    app,
  },
});

export default store;

export default {
  namespaced: true,
  state: () => ({
    countries: [],
  }),
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
  },
  actions: {
    async loadCountries({ commit }) {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();
        commit("setCountries", countries);
        return countries;
      } catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
      }
    },
  },
};

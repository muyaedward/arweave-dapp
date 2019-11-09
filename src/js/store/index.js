import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth";
import Balance from "./modules/balance";
import Profile from "./modules/profile";
import SubmissionPaper from "./modules/paper";

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
      Auth,
      Balance,
      Profile,
      SubmissionPaper
  }
})
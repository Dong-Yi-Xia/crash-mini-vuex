import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    }
});

new Vue({
  el: '#app',
  // inject the store at the root, therefore all child component will have access to store using this.$store
  store,
  computed: {
      count () {
          return this.$store.state.count
      }
  }
});



//The html has a <p> {{count}} </p>

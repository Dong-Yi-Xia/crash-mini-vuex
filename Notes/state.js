import Vue from 'vue';
import { component } from 'vue/types/umd';
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

//Shorthand
import { mapState } from 'vuex';

new Vue({
    el: '#app',
    store,
    computed: mapState([ 'count' ]),
});


//The html has a <p> {{count}} </p>

// Vue      Vuex
// Data === State
// Method === Actions		action commits the mutation
// Computed === Getters

// The Cycle of State Management
// 1. component dispatch an action
// 2. action commits a mutation
// 3. mutation update the state
// 4. getter render the state onto the component

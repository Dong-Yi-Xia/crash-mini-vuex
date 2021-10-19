import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      count: 0
    },
    //mutation are must be synchronous, capture before and after state snapshot.
    //To handle asyn chronous we need to use actions
    //the mutations will update the state, 1st argu is always the state
    mutations: {
      increment (state) {
          state.count++
      },
      //the 2nd argu is the payload is a object of data
      incrementBy (state, payload) {
        state.count += payload.amount
      },
    }
});

import { mapState, mapMutations } from 'vuex';


new Vue({
    el: '#app',
    store,
    data: {
    },
    computed: mapState([
        'count'
    ]),
    // methods: {
    //   increment () {
    //       this.$store.commit('increment')
    //   }
    // }

    // Just a single method only
    // methods: mapMutations([
    //   'increment',
    //   'incrementBy'
    // ])

    //using the spread inside of methods
    methods: {
      ...mapMutations([
      'increment',
      'incrementBy'
      ])
    }
});

//this is which commit the mutation type.
store.commit('increment');
store.commit('incrementBy', { amount: 29 });

// also can be written by committing object with a type.
store.commit({
  type: 'incrementBy',
  amount: 40
})

console.log(store.state.count);

// Vue is reactive, should initial store with all its properties
// Two option. Less than ideal (should not use) by adding new property to state
// Vue.set(obj, 'new prop', 123)
// state.obj = { ...state.obj, newProp: 123 }

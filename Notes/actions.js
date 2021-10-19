import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        decrement (state) {
            state.count--
        }
    },
    //Handle any asynchronous call. Then call the mutation to update the state which is synchronous
    actions: {
      // the context expose the store, similar to methods this.$store
      // give access context.state / context.getters / context.dispatch for other actions
      // increment (context) {
      //     context.commit('increment')
      // }

        //using destructing
        incrementAsync ({ commit }) {
          //setTimeout is like creating async, after 1sec we are committing the mutation
          setTimeout(() => {
            commit('increment')
          }, 1000)
        },
        actionA ({ commit }) {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  commit('someMutation')
                  resolve()
              }, 1000)
          })
        },
    }
})

import { mapState, mapMutations } from 'vuex';

new Vue({
    el: '#app',
    store,
    data: {
    },
    computed: mapState([ 'count' ]),
    methods: {
        increment () {
          //calling the action with dispatch, can also pass in a payload just like mutation
          //this.$store.dispatch('incrementAsync', payload);
          this.$store.dispatch('incrementAsync');
        },
        decrement () {
            this.$store.commit('decrement');
        },
        //the methods name doesn't have to be the same as the action name.
        //the dispatch must have the action name
        testAction () {
          this.$store.dispatch('actionA').then(() => {

          })
        }
    }
});

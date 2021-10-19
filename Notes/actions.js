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
        actionB ({ dispatch, commit }) {
          return dispatch('actionA').then(() => {
              commit('someOtherMutation')
          })
        },
        //the commit 'gotData' will not mutate until getData() Promise comes back
        async actionC ({ commit }) {
            //commit type and payload
            commit('gotData', await getData())
        },
        //wait for dispatch('actionC') then
        //the commit 'gotOtherData' will not mutate until getOtherData() Promise comes back
        async actionD ({ dispatch, commit} ) {
            await dispatch('actionC')
            commit('gotOtherData', await getOtherData())
        }
    }
})

import { mapState } from 'vuex';

new Vue({
    el: '#app',
    store,
    data: {
    },
    computed: mapState([ 'count' ]),
    methods: {
        //onClick use method name
        increment () {
          //calling the action with dispatch, can also pass in a payload just like mutation
          //this.$store.dispatch('incrementAsync', payload);
          this.$store.dispatch('incrementAsync');

          // Dispatch with payload
          // this.$store.dispatch('incrementAsync', {amount: 1000});

          // Dispatch with an object
          // this.$store.dispatch({
          //   type: 'incrementAsync',
          //   amount: 1000,
          // });
        },
        decrement () {
            this.$store.commit('decrement');
        },
        //the methods name doesn't have to be the same as the action name.
        //the dispatch must have the action name
        testAction () {
          //.then() waits for the promise
          this.$store.dispatch('actionA').then(() => {

          })
        }
    }
});


//Shorthand
import { mapState, mapMutations, mapActions } from 'vuex';

new Vue({
    el: '#app',
    store,
    data: {
    },
    computed: mapState([ 'count' ]),
    methods: {
        //onClick use store type action/mutation name
        ...mapActions(['incrementAsync']),
        ...mapMutations(['decrement']),
        testAction () {
          this.$store.dispatch('actionA').then(() => {
          })

        // onClick use the new Method name
        // create new method `this.addMe()` that runs `this.$store.dispatch('incrementAsync')`
        // ...mapActions({ addMe:'incrementAsync' }),
        }
    }
});

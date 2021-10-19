import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleA = {
    //add namespaced to be self contain when being called.
    namespaced: true,
    state: {
        count: 3
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
    getters: {
      doubleCount (state) {
          return state.count * 2
      }
    },
    actions: {
        incrementIfOdd({state, commit}) {
            if (state.count % 2 === 1) {
                commit('increment');
            }
        }
    }
}

const moduleB = {
    namespaced: true,
    modules: {
        subModule: {
            namespaced: true,
            state: {

            },
            mutations: {
                login () {}
            },
            getters: {
              login () {}
            },
            actions: {
              login () {}
            }
        }
    },
    state: {
        count: 8
    },
    mutations: {

    },
    getters: {
      someGetter (state, getters, rootState, rootGetters) {
          //local module access
          state.count;
          //root store access
          rootState.count;

          getters.someOtherGetter;
          rootGetters.someOtherGetter;
      }
    },
    actions: {
        someAction({ dispatch, commit, getters, rootGetters }) {
            getters.someGetter;
            rootGetters.someGetter;

            //local module access
            dispatch('someOtherAction');
            //1st-name, 2nd-payload, 3th-root:true -- access root store
            dispatch('someOtherAction', null, { root: true });

            commit('someMutation');
            commit('someMutation', null, { root: true });
        }
    }
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    },
    state: {
        count: 2
    },
    mutations: {

    },
    getters: {

    },
    actions: {

    }
})


import { mapState, mapActions } from 'vuex';

new Vue({
    el: '#app',
    store,
    data: {
    },
    computed: mapState({
        //this.a & this.b
        a: state => state.a.count,
        b: state => state.b.subModule.count,
    }),
    //1st is the path, 2nd ['name']
    methods: mapActions('some/nested/module', [
        'foo' // this.foo()
    ])
});

console.log(store.state.a.count);
// console.log(store.state.b.count);

//without namespaced, any module mutation that have named 'increment' will be called
store.commit('increment');

//with namespaced, modules pathway to mutation name
store.commit('a/increment');

//Nested subModule namespaced. store > b > subModule > 'name type'
store.commit('b/subModule/login');
store.dispatch('b/subModule/login');

//getters must be in []
store.getters['b/subModule/login'];

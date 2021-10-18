import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
   state: {
       todos: [
           { id: 1, text: '...', done: true },
           { id: 2, text: '...', done: false },
       ]
   },
   getters: {
      //getters 1st argument is always the state
       doneTodos: state => {
           return state.todos.filter(todo => todo.done);
       },
       //can use other getters by passing in a second arguments
       doneTodosCount: (state, getters) => {
           return getters.doneTodos.length
       },
       //can pass in an argument by using a second => function
       getTodoById: (state) => (id) => {
           return state.todos.find(todo => todo.id === id)
       }
   }
});

/*
new Vue({
    el: '#app',
    store,
    data: {
    },
    computed: {
        doneTodos () {
          return this.$store.getters.doneTodos
        },
        doneTodosCount () {
            return this.$store.getters.doneTodosCount
        },
        getTodoById () {
          return this.$store.getters.getTodoById
        },
});
*/

// console.log(store.getters.getTodoById(48))


// the shorthand for getters
import { mapGetters } from 'vuex';

new Vue({
    el: '#app',
    store,
    data: {
    },
    computed: mapGetters([
        'doneTodos', 'doneTodosCount', 'getTodoById'
    ])
});

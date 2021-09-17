// import axios from 'axios';

const state = {
  todos: [
    {
      id: 1,
      title: 'Things to do 1',
    },
    {
      id: 2,
      title: 'Things to do 2',
    },
  ]
};

const getters = {
  //object: function return state.todos
  allTodos: (state) => state.todos
};

const actions = {};

const mutations = {};

//Because of ES6 rather than exporting the object such as state: state, just write it one time.
export default {
  state,
  getters,
  actions,
  mutations
};

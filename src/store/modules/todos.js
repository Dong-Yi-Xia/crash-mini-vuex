import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  //object: function return state.todos
  allTodos: (state) => state.todos
};


const actions = {
  //READ, create an action to fetch the data. Destructure and use the commit in the object
  async fetchTodos({ commit }){
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    //commit, a mutation, like .then do something with the data. 1st para is the mutation method, 2nd is what is being passed in
    commit('setTodos', response.data)
  },

  //Create / POST request, a new todo
  async addTodo( { commit }, title){
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false})
    //commit a mutation, like .then do something with the data
    commit('newTodo', response.data)
  },

  //Delete request
  async deleteTodo( { commit }, id){
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //commit a mutation
    commit('removeTodo', id)
  },

  //Filter limit
  async filterTodos({commit}, e){
    //console.log(commit, e)
    //Get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
    commit('setTodos', response.data)
  },

  //Update Request
  async updateTodo({ commit }, updatedTodo ){
    const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo)
    // console.log(response.data)
    commit('updTodo', response.data)
  },

};


const mutations = {
  //update the state, 2 parameters passing in the (state, response.data)
  setTodos: (state, todos) => (state.todos = todos),

  //adding a new todo at the beginning of the array, update state
  newTodo: (state, todo) => state.todos.unshift(todo),

  //deleting a todo
  removeTodo: (state, id) =>
    state.todos = state.todos.filter(todo => todo.id !== id),

  //update todo
  updTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if(index !== -1){
      state.todos.splice(index, 1, updTodo)
    }
  },

};

//Because of ES6 rather than exporting the object such as state: state, just write it one time.
export default {
  state,
  getters,
  actions,
  mutations
};

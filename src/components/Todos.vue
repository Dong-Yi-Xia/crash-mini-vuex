<template>
  <div>
    <h3>Todos</h3>
    <div class="todos">
      <div class="todo" v-for="todo in allTodos" :key="todo.id">
        {{ todo.title }}
      </div>
    </div>
  </div>
</template>

<script>
//mapGetters is like redux connect to store
import { mapGetters } from 'vuex';

export default {
  name: 'Todos',
  // pass in an array in the mapGetter in computed, coming from store/modules
  computed: mapGetters(['allTodos'])
};

</script>

<style>

</style>

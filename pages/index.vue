<script lang="ts" setup>
import { useTodoStore} from "~/store/todo";
import { ref } from 'vue';
const newTodo = ref("")
const error = ref(false);

watch(error, (value: boolean) => {
  if(value) {
    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
})

const todoStore = useTodoStore()
const saveNewTodo = () => {
  if(newTodo.value.length <= 0) {
    error.value = true;
    return;
  }
  todoStore.add({
    label: newTodo.value
  });
  newTodo.value = "";
}
</script>
<template>
  <main class="bg-gray-100 pt-18 min-h-screen">
    <section class="text-center py-10">
      <h1 class="text-5xl font-bold text-gray-700">What are we doing today?</h1>
    </section>
    <section class="md:w-8/12 md:mx-auto lg:w-6/12 py-4 rounded-lg">
      <TodoInput v-model="newTodo" @save="saveNewTodo" :error="error"  />
      <TodoList :items="todoStore.getSortedTodos.reverse()" />
    </section>
  </main>
</template>

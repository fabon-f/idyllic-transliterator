<script setup lang="ts">
import { computed, ref } from 'vue';
import { createTransliterator } from './utils/table';
import transliterations from './utils/transliterations';

const input = ref('');
const selectedTransliteration = ref(transliterations[0]);
const transliterator = computed(() => createTransliterator(selectedTransliteration.value.table));
const result = computed(() => transliterator.value(input.value));
</script>

<template>
  <div>
    <div><label>input: <textarea v-model="input"></textarea></label></div>
    <div><label>transliteration: <textarea readonly :value="result"></textarea></label></div>
    <div>
      <label>
        <span>transliteration system:</span>
        <select v-model="selectedTransliteration">
          <option v-for="transliteration in transliterations" :value="transliteration" :key="transliteration.name">{{ transliteration.name }}</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
</style>

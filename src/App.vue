<script setup lang="ts">
import { computed, ref } from 'vue';
import { createTransliterator } from './utils/table';
import transliterations from './utils/transliterations';
import { useSelectFromKeyValue } from './composables/useSelectFromKeyValue';

const input = ref('');
const {
  entries: transliterationEntries,
  selectedKey: selectedTransliterationKey,
  selectedValue: selectedTransliteration,
} = useSelectFromKeyValue(transliterations);
const transliterator = computed(() =>
  createTransliterator(selectedTransliteration.value.table),
);
const result = computed(() => transliterator.value(input.value));
</script>

<template>
  <div>
    <div><label>input: <textarea v-model="input"></textarea></label></div>
    <div><label>transliteration: <textarea readonly :value="result"></textarea></label></div>
    <div>
      <label>
        <span>transliteration system:</span>
        <select v-model="selectedTransliterationKey">
          <option v-for="[key, { name }] in transliterationEntries" :value="key" :key="key">{{ name }}</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
</style>

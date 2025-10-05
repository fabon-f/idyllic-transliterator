import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue';

export function useSelectFromKeyValue<V>(object: MaybeRefOrGetter<Record<string, V>>) {
  const objectComputed = computed(() => toValue(object));
  const entriesComputed = computed(() => Object.entries<V>(objectComputed.value));
  const initialEntries = entriesComputed.value[0];
  if (initialEntries === undefined) {
    throw new Error(`Initial object doesn't have any keys`);
  }
  const selectedKey = ref(initialEntries[0]);
  const selectedValue = computed(() => {
    const obj = objectComputed.value;
    const key = selectedKey.value;
    if (key in obj) {
      return obj[key]!;
    }
    throw new Error(`selected key not found in the object: ${key}`);
  });
  return {
    entries: entriesComputed,
    selectedKey,
    selectedValue,
  };
}

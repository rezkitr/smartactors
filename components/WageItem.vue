<template>
  <div class="flex justify-between items-center mb-1">
    <div>
      <h6 class="text-base font-semibold capitalize">{{ name }}</h6>
      <p class="text-sm text-gray-400">{{ donominal }} {{ unit }}</p>
    </div>
    <div class="flex justify-end items-center">
      <p>{{ subtotalItem }}</p>
      <button
        v-if="!this.viewMode"
        class="text-base text-gray-300 ml-3 font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'unit', 'nominal', 'donominal', 'viewMode'],
  computed: {
    subtotalItem() {
      return this.nominal * this.donominal
    },
  },
}
</script>

<style></style>

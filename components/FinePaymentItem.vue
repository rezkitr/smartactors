<template>
  <div class="flex justify-between items-center mb-1">
    <div>
      <h6 class="text-base font-semibold">{{ item.nama }}</h6>
      <p class="text-sm text-gray-400">{{ item.keterangan }}</p>
    </div>
    <div class="flex justify-end items-center text-red-400">
      <p>{{ item.nominal }}</p>
      <button
        v-if="!this.viewMode"
        class="text-base ml-3 font-semibold"
        @click="showModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
          />
          <path
            fill-rule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'viewMode'],
  methods: {
    showModal() {
      this.$emit('showFinePaymentModal', this.item)
    },
  },
}
</script>

<style></style>

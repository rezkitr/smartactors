<template>
  <ModalBase @onClose="close">
    <template v-slot:header> Ubah Kehadiran </template>

    <template v-slot:body>
      <div class="py-2">
        <label class="text-xs text-gray-400">Durasi Keterlambatan</label>
        <div class="flex flex-row justify-center items-center mt-1">
          <button
            class="border h-8 w-8 rounded-l flex justify-center items-center"
            @click="subtractPresence"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 12H6"
              />
            </svg>
          </button>
          <div
            class="h-8 flex-1 flex justify-center items-center border-t border-b"
          >
            {{ inquiry.total_kehadiran }} Hari
          </div>
          <button
            class="border h-8 w-8 rounded-r flex justify-center items-center"
            @click="addPresence"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <div class="grid gap-2 grid-cols-2 mt-3">
        <button
          @click="clear"
          class="text-red-500 rounded border border-red-500 px-6 py-1 hover:bg-red-500 hover:text-white"
        >
          Hapus
        </button>
        <button
          @click="save"
          class="text-white rounded bg-blue-400 px-6 py-1 hover:bg-blue-500"
        >
          Simpan
        </button>
      </div>
    </template>
  </ModalBase>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('onClose')
    },
    addPresence() {
      this.$store.commit('addPresence')
    },
    subtractPresence() {
      this.$store.commit('subtractPresence')
    },
    clear() {
      this.$store.commit('resetInquiry', {
        total_kehadiran: this.originPresence,
      })
      this.$store.commit('setSubTotalSalary')
      this.close()
    },
    save() {
      this.$store.commit('setSubTotalSalary')
      this.close()
    },
  },
  computed: {
    inquiry() {
      return this.$store.state.inquiry
    },
    originPresence() {
      return this.$store.state.originInquiry.total_kehadiran
    },
  },
}
</script>

<style></style>

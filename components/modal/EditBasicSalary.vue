<template>
  <ModalBase @onClose="close">
    <template v-slot:header> Ubah Gaji Pokok </template>
    <template v-slot:body>
      <div class="py-2">
        <label class="text-xs text-gray-400">Nominal</label>
        <div class="mt-1">
          <div
            class="flex flex-row justify-between items-center flex-wrap border-b border-dashed pb-4"
          >
            <div class="flex flex-row flex-1">
              <div
                class="border text-sm h-8 px-2 rounded-l flex justify-center items-center bg-gray-200"
              >
                Rp
              </div>
              <div class="h-8 flex-1">
                <input
                  type="number"
                  class="h-full w-full border rounded-r px-2 text-sm"
                  v-model="nominal"
                />
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mx-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div class="flex flex-row justify-end">
              <div class="h-8 w-8">
                <input
                  type="number"
                  class="h-full w-full border rounded-l px-2 text-sm"
                  v-model="period"
                />
              </div>
              <div
                class="border px-2 text-sm h-8 rounded-r flex justify-center items-center bg-gray-200"
              >
                Periode
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between items-center text-sm mt-2">
            <p>Jumlah</p>
            <p>Rp {{ total }}</p>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="mt-3">
        <button
          class="text-white bg-blue-400 rounded py-1 w-full hover:bg-blue-500"
          @click="save"
        >
          Simpan
        </button>
      </div>
    </template>
  </ModalBase>
</template>

<script>
export default {
  data() {
    return {
      nominal: 0,
      period: 1,
    }
  },
  methods: {
    close() {
      this.$emit('onClose')
    },
    save() {
      this.$store.commit('updateBasicSalary', {
        total_periode: this.period,
        nominal: this.nominal,
      })
      this.$store.commit('setSubTotalSalary')
      this.close()
    },
  },
  mounted() {
    this.nominal = this.salaryItem.nominal
    this.period = this.inquiry.total_periode
  },
  computed: {
    inquiry() {
      return this.$store.state.inquiry
    },
    salaryItem() {
      return this.inquiry.pengaturan_gaji.find(
        (item) => item.jenis === 'periode'
      )
    },
    total() {
      return this.nominal * this.period
    },
  },
}
</script>

<style></style>

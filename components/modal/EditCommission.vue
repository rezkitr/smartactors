<template>
  <ModalBase @onClose="close">
    <template v-slot:header v-if="item"> Ubah Komisi </template>
    <template v-slot:header v-else> Tambah Komisi </template>
    <template v-slot:body>
      <div class="py-2">
        <div>
          <label class="text-xs text-gray-400">Nama Komisi</label>
          <div class="h-8">
            <input
              type="text"
              placeholder="Nama Komisi"
              class="h-full w-full border rounded px-2"
              v-model="name"
            />
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400">Nominal</label>
          <div class="flex flex-row flex-1">
            <div
              class="border text-sm h-8 px-2 rounded-l flex justify-center items-center bg-gray-200"
            >
              Rp
            </div>
            <div class="h-8 flex-1">
              <input
                type="number"
                placeholder="Nominal"
                class="h-full w-full border rounded-r px-2"
                v-model="nominal"
              />
            </div>
          </div>
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
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      name: '',
      nominal: null,
    }
  },
  props: ['item'],
  methods: {
    close() {
      this.$emit('onClose')
    },
    save() {
      if (this.item) {
        this.$store.commit('updateCommission', {
          id: this.item.id,
          name: this.name,
          nominal: parseInt(this.nominal),
        })
      } else {
        this.$store.commit('addCommission', {
          id: uuidv4(),
          nama: this.name,
          nominal: parseInt(this.nominal),
        })
      }
      this.$store.commit('setSubTotalCommission')
      this.close()
    },
    clear() {
      if (this.item) {
        this.$store.commit('deleteCommission', this.item.id)
        this.$store.commit('setSubTotalCommission')
      }
      this.close()
    },
  },
  mounted() {
    if (this.item) {
      this.name = this.item.nama
      this.nominal = this.item.nominal
    }
  },
}
</script>

<style></style>

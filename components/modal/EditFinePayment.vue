<template>
  <ModalBase @onClose="close">
    <template v-slot:header v-if="item"> Ubah Tanggungan/Denda </template>
    <template v-slot:header v-else> Tambah Tanggungan/Denda </template>
    <template v-slot:body>
      <div class="py-2">
        <div>
          <label class="text-xs text-gray-400">Nama Tanggungan</label>
          <div class="h-8">
            <input
              type="text"
              placeholder="Contoh: Ganti Barang Hilang"
              class="h-full w-full border rounded px-2 text-sm"
              v-model="name"
            />
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400">Nominal Pembayaran</label>
          <div class="flex flex-row flex-1">
            <div
              class="border text-sm h-8 px-2 rounded-l flex justify-center items-center bg-gray-200"
            >
              Rp
            </div>
            <div class="h-8 flex-1">
              <input
                :disabled="item"
                type="number"
                placeholder="Nominal Pembayaran"
                class="h-full w-full border rounded-r px-2 text-sm"
                v-model="nominal"
              />
            </div>
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400">Keterangan</label>
          <div class="h-8">
            <input
              type="text"
              placeholder="Contoh: Baju yang hilang warna merah"
              class="h-full w-full border rounded px-2 text-sm"
              v-model="note"
            />
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
      note: '',
    }
  },
  props: ['item'],
  methods: {
    close() {
      this.$emit('onClose')
    },
    save() {
      if (this.item) {
        this.$store.commit('updatePaidFine', {
          id: this.item.id,
          nama: this.name,
          keterangan: this.note,
        })
      } else {
        this.$store.commit('addPaidFine', {
          id: uuidv4(),
          nama: this.name,
          nominal: parseInt(this.nominal),
          keterangan: this.note,
        })
      }
      this.$store.commit('setPaidFine')
      this.close()
    },
    clear() {
      if (this.item) {
        this.$store.commit('deletePaidFine', this.item.id)
        this.$store.commit('setPaidFine')
      }
      this.close()
    },
  },
  mounted() {
    if (this.item) {
      this.name = this.item.nama
      this.nominal = this.item.nominal
      this.note = this.item.keterangan
    }
  },
}
</script>

<style></style>

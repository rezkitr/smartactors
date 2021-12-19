<template>
  <div
    class="max-w-screen-sm min-h-screen mx-auto border-2 flex flex-col"
    v-if="banks"
  >
    <div
      class="py-4 px-4 bg-white border-b text-center flex justify-center items-center"
    >
      <NuxtLink
        to="/salaryinvoice"
        class="text-blue-400 hover:text-blue-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </NuxtLink>
      <div class="flex-1">
        <h3 class="font-semibold">Detail Pembayaran</h3>
      </div>
    </div>

    <div class="bg-white mb-3 py-4 px-4">
      <div class="border-b pb-2 border-dashed">
        <PaymentDetailsItem class="font-semibold">
          <template v-slot:title>
            <p>Subtotal Gaji</p>
          </template>
          <template v-slot:nominal>
            <p>Rp {{ subTotalSalary }}</p>
          </template>
        </PaymentDetailsItem>
        <PaymentDetailsItem class="font-semibold">
          <template v-slot:title>
            <p>Subtotal Upah</p>
          </template>
          <template v-slot:nominal>
            <p>Rp {{ subTotalWage }}</p>
          </template>
        </PaymentDetailsItem>
        <PaymentDetailsItem class="font-semibold">
          <template v-slot:title>
            <p>Subtotal Komisi</p>
          </template>
          <template v-slot:nominal>
            <p>Rp {{ subTotalCommission }}</p>
          </template>
        </PaymentDetailsItem>

        <PaymentDetailsItem class="mt-4 font-semibold">
          <template v-slot:title>
            <p>Gaji Kotor</p>
          </template>
          <template v-slot:nominal>
            <p>Rp {{ totalGrossSalary }}</p>
          </template>
        </PaymentDetailsItem>

        <PaymentDetailsItem class="mt-5 text-red-500 font-semibold">
          <template v-slot:title>
            <p class="text-sm">Tanggungan</p>
          </template>
          <template v-slot:nominal>
            <p>(-) Rp {{ paidFine }}</p>
          </template>
        </PaymentDetailsItem>
      </div>
      <PaymentDetailsItem class="text-blue-500 mt-3 font-bold">
        <template v-slot:title>
          <p>Total Gaji Bersih</p>
        </template>
        <template v-slot:nominal>
          <p>Rp {{ totalTakeHomePaySalary }}</p>
        </template>
      </PaymentDetailsItem>
    </div>

    <div class="bg-white py-4 px-4 border flex flex-col flex-1 justify-between">
      <div>
        <div>
          <label class="text-sm text-gray-400"
            >Bayar dari Rekening
            <span class="text-blue-500 font-semibold">*</span></label
          >
          <div class="h-8 px-2 border rounded">
            <select
              class="w-full h-full text-sm outline-none"
              :class="{ 'text-gray-400': selectedBank === 'select' }"
              v-model="selectedBank"
            >
              <option
                disabled
                :selected="selectedBank === 'select'"
                hidden
                value="select"
              >
                Pilih Rekening Bank
              </option>
              <option
                v-for="bank in banks"
                :key="bank.nomor"
                :value="bank"
                class="text-black"
              >
                {{ bank.bank }} {{ bank.nomor }} - {{ bank.pemilik }}
              </option>
            </select>
          </div>
          <p class="text-red-500 text-xs mt-1" v-if="errorBank">
            Silakan pilih Rekening Bank
          </p>
        </div>
        <div class="mt-2">
          <label class="text-sm text-gray-400"
            >Dicatat pada Tanggal
            <span class="text-blue-500 font-semibold">*</span></label
          >
          <date-picker
            style="width: 100%; height: 100%"
            v-model="selectedDate"
            type="date"
            format="DD-MM-YYYY"
            placeholder="Pilih Tanggal"
            input-class="outline-none border rounded w-full h-8 px-3 text-sm"
          ></date-picker>
          <p class="text-red-500 text-xs mt-1" v-if="errorDate">
            Silakan pilih Tanggal Pencatatan
          </p>
        </div>
        <div class="mt-2">
          <label class="text-sm text-gray-400"
            >Keterangan <span class="text-blue-500 font-semibold"></span
          ></label>
          <div class="h-8">
            <input
              type="text"
              placeholder="Tambah Keterangan"
              v-model="note"
              class="w-full h-full px-2 border rounded text-sm"
            />
          </div>
        </div>
      </div>
      <div class="mt-8">
        <button
          class="bg-blue-500 rounded w-full text-white py-2"
          @click="submit"
        >
          Submit Gaji
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/id'
import moment from 'moment'

export default {
  components: { DatePicker },
  data() {
    return {
      selectedBank: 'select',
      selectedDate: null,
      note: '',
      errorBank: false,
      errorDate: false,
    }
  },

  methods: {
    submit() {
      if (this.selectedBank === 'select') {
        this.errorBank = true
      }
      if (!this.selectedDate) {
        this.errorDate = true
      }
      if (this.selectedBank !== 'select' && this.selectedDate) {
        this.$store
          .dispatch('submit', {
            rekening: this.selectedBank,
            tanggal_catat: moment(this.selectedDate).format('YYYY-MM-DD'),
            keterangan: this.note,
          })
          .then(() => {
            this.$router.push('/invoicedetails')
          })
      }
    },
  },
  watch: {
    selectedBank(newBank, oldBank) {
      if (newBank !== 'select') {
        this.errorBank = false
      }
    },
    selectedDate(newDate, oldDate) {
      if (newDate) {
        this.errorDate = false
      }
    },
  },
  computed: {
    banks() {
      return this.$store.state.banks
    },
    subTotalSalary() {
      return this.$store.state.subTotalSalary
    },
    subTotalCommission() {
      return this.$store.state.subTotalCommission
    },
    paidFine() {
      return this.$store.state.paidFine
    },
    subTotalWage() {
      return this.$store.state.subTotalWage
    },
    totalGrossSalary() {
      return this.$store.getters.totalGrossSalary
    },
    totalTakeHomePaySalary() {
      return this.$store.getters.totalTakeHomePaySalary(this.totalGrossSalary)
    },
  },
  mounted() {
    this.$store.dispatch('getBanks')
  },
}
</script>

<style></style>

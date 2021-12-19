<template>
  <div class="max-w-screen-sm mx-auto" v-if="inquiry">
    <!-- section 1 -->
    <div class="bg-white w-full mb-3">
      <div class="py-4 border-b text-center">
        <h3 v-if="!this.viewMode" class="font-semibold">Faktur Gaji</h3>
        <h3 v-else class="font-semibold">Detail Faktur</h3>
      </div>
      <div class="px-4 py-4">
        <div v-if="this.viewMode" class="mb-3">
          <h2 class="font-bold text-lg mb-1">
            {{ inquiry.id_karyawan }}
          </h2>
          <p class="text-base tracking-tight text-gray-500">
            Dicatat: {{ recordDate }}
          </p>
        </div>
        <div>
          <h2 class="font-bold text-lg mb-1">
            {{ inquiry.nama_karyawan }}
          </h2>
          <p class="text-base tracking-tight text-gray-500">
            {{ startDate }} - {{ endDate }}
          </p>
        </div>

        <div
          class="flex justify-between items-center mt-4 pt-4 border-t border-dashed"
          v-if="!this.viewMode"
        >
          <p class="text-base font-semibold text-gray-500">
            Masuk {{ inquiry.total_kehadiran }} Hari
          </p>
          <button
            class="text-base text-blue-500 font-semibold"
            @click="toggleModal('prsc')"
          >
            Ubah Kehadiran
          </button>
        </div>
      </div>
    </div>

    <!-- section 2 -->
    <div class="bg-white w-full mb-3">
      <div class="border-b py-4 px-4">
        <h5 class="font-bold">Gaji</h5>
      </div>
      <div class="px-4 py-4">
        <!-- salary item -->
        <div class="pb-4 border-b border-dashed">
          <SalaryItem
            v-for="slrItem in inquiry.pengaturan_gaji"
            :key="slrItem.id"
            :name="slrItem.nama"
            :nominal="slrItem.nominal"
            :type="slrItem.jenis"
            :totalPeriod="inquiry.total_periode"
            :totalPresence="inquiry.total_kehadiran"
            :viewMode="viewMode"
            @showSalaryModal="setShowSalaryModal(slrItem)"
          />
        </div>
        <div class="flex justify-between items-center mt-4">
          <h5 class="font-bold">Subtotal Gaji</h5>
          <h5 class="font-bold">Rp {{ subTotalSalary }}</h5>
        </div>
      </div>
    </div>

    <!-- section 3 -->
    <div class="bg-white w-full mb-3">
      <div class="border-b py-4 px-4">
        <h5 class="font-bold">Upah Borongan</h5>
      </div>
      <div class="px-4 py-4">
        <!-- wage item -->
        <div class="pb-4 border-b border-dashed">
          <WageItem
            v-for="wageItem in wageItems"
            :key="wageItem.id"
            :name="wageItem.nama"
            :unit="wageItem.satuan"
            :nominal="wageItem.nominal"
            :donominal="wageItem.nominal_pengerjaan"
            :viewMode="viewMode"
          />
        </div>
        <div class="flex justify-between items-center mt-4">
          <h5 class="font-bold">Subtotal Upah</h5>
          <h5 class="font-bold">Rp {{ subTotalWage }}</h5>
        </div>
      </div>
    </div>

    <!-- section 4 -->
    <div class="bg-white w-full mb-3">
      <div class="border-b py-4 px-4">
        <h5 class="font-bold">Komisi</h5>
      </div>
      <div class="px-4 py-4">
        <div v-if="!this.viewMode" class="mb-4">
          <button
            class="flex items-center text-blue-400 hover:text-blue-500"
            @click="setShowCommissionModal(null)"
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="ml-1">Tambah komisi lain...</p>
          </button>
        </div>
        <!-- commission item -->
        <div v-if="inquiry.komisi.length">
          <div class="pb-4 border-b border-dashed">
            <CommissionItem
              v-for="comItem in inquiry.komisi"
              :key="comItem.id"
              :item="comItem"
              :viewMode="viewMode"
              @showCommissionModal="setShowCommissionModal"
            />
          </div>
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-bold">Subtotal Komisi</h5>
            <h5 class="font-bold">Rp {{ subTotalCommission }}</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- section 5 -->
    <div class="bg-white w-full mb-3">
      <div class="flex justify-between items-center p-4">
        <h3 class="font-semibold text-gray-400 text-lg">Total Gaji Kotor</h3>
        <h3 class="font-semibold text-gray-400 text-lg">
          Rp {{ totalGrossSalary }}
        </h3>
      </div>
    </div>

    <!-- section 6 -->
    <div class="bg-white w-full mb-3">
      <div class="border-b py-4 px-4">
        <h5 class="font-bold">Tanggungan</h5>
        <p v-if="paidFine !== 0" class="text-xs sm:text-sm text-gray-400">
          Karyawan ini memiliki tanggungan Rp {{ paidFine }}
        </p>
      </div>
      <div class="px-4 py-4">
        <div v-if="!this.viewMode" class="mb-4">
          <button
            class="flex items-center text-blue-400 hover:text-blue-500"
            @click="setShowFinePaymentModal(null)"
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="ml-1">Tambah pembayaran tanggungan...</p>
          </button>
        </div>
        <div v-if="inquiry.tanggungan.length">
          <div class="pb-4 border-b border-dashed">
            <FinePaymentItem
              v-for="fpmItem in inquiry.tanggungan"
              :key="fpmItem.id"
              :item="fpmItem"
              :viewMode="viewMode"
              @showFinePaymentModal="setShowFinePaymentModal"
            />
          </div>
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-bold">Tanggungan Dibayar</h5>
            <h5 class="font-bold text-red-400">(-) Rp {{ paidFine }}</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- section 7 -->
    <div class="bg-white w-full mb-3">
      <div class="p-4">
        <div
          class="flex justify-between items-center text-blue-400 font-bold text-lg xs:text-xl"
        >
          <div class="flex items-center">
            <h2 class="mr-1">Total Gaji Bersih</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h2>Rp {{ totalTakeHomePaySalary }}</h2>
        </div>
        <p class="text-sm text-gray-400 mt-2">
          Nominal akhir yang diterima karyawan setelah ditambah komisi dikurangi
          pembayaran tanggungan (jika ada).
        </p>
        <div class="mt-5" v-if="!this.viewMode">
          <NuxtLink
            to="/paymentdetails"
            class="bg-blue-500 inline-block w-full rounded text-white font-semibold text-center py-2 cursor-pointer"
          >
            Berikutnya
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- section 8 -->
    <div class="bg-white w-full mb-3" v-if="this.viewMode">
      <div class="p-4">
        <label class="text-xs text-gray-400">Keterangan</label>
        <p>{{ inquiry.keterangan }}</p>

        <button class="bg-gray-400 text-white w-full rounded py-2 mt-6">
          Cetak
        </button>
      </div>
    </div>

    <!--  modal -->
    <ModalEditPresence
      v-if="showPresenceModal"
      @onClose="toggleModal('prsc')"
    />
    <ModalEditBasicSalary
      v-if="showBasicSalaryModal"
      @onClose="toggleModal('bscslr')"
    />
    <ModalEditCompensationSalary
      v-if="showCompensationSalaryModal"
      @onClose="toggleModal('cmpslr')"
      :item="selectedCompensationSalary"
    />
    <ModalEditCommission
      v-if="showCommissionModal"
      @onClose="toggleModal('cms')"
      :item="selectedCommission"
    />
    <ModalEditFinePayment
      v-if="showFinePaymentModal"
      @onClose="toggleModal('fpm')"
      :item="selectedFinePayment"
    />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      DATE_FORMAT: 'DD MMMM YYYY',
      showPresenceModal: false,
      showBasicSalaryModal: false,
      showCompensationSalaryModal: false,
      selectedCompensationSalary: null,
      showCommissionModal: false,
      selectedCommission: null,
      showFinePaymentModal: false,
      selectedFinePayment: null,
    }
  },
  props: ['viewMode'],
  mounted() {
    console.log(this.viewMode)
  },
  methods: {
    toggleModal(type) {
      switch (type) {
        case 'prsc':
          this.showPresenceModal = !this.showPresenceModal
          break
        case 'bscslr':
          this.showBasicSalaryModal = !this.showBasicSalaryModal
          break
        case 'cmpslr':
          if (this.showCompensationSalaryModal) {
            this.selectedCompensationSalary = null
          }
          this.showCompensationSalaryModal = !this.showCompensationSalaryModal
          break
        case 'cms':
          if (this.showCommissionModal) {
            this.selectedCommission = null
          }
          this.showCommissionModal = !this.showCommissionModal
          break
        case 'fpm':
          if (this.showFinePaymentModal) {
            this.selectedFinePayment = null
          }
          this.showFinePaymentModal = !this.showFinePaymentModal
          break

        default:
          break
      }
    },
    setShowSalaryModal(item) {
      if (item.jenis === 'periode') {
        this.toggleModal('bscslr')
      } else if (item.jenis === 'kehadiran') {
        this.selectedCompensationSalary = item
        this.toggleModal('cmpslr')
      }
    },
    setShowCommissionModal(value) {
      if (value) {
        this.selectedCommission = value
      }
      this.toggleModal('cms')
    },
    setShowFinePaymentModal(value) {
      if (value) {
        this.selectedFinePayment = value
      }
      this.toggleModal('fpm')
    },
  },
  computed: {
    inquiry() {
      return this.$store.state.inquiry
    },
    startDate() {
      return moment(new Date(this.inquiry.tanggal_awal)).format(
        this.DATE_FORMAT
      )
    },
    endDate() {
      return moment(new Date(this.inquiry.tanggal_akhir)).format(
        this.DATE_FORMAT
      )
    },
    recordDate() {
      return moment(new Date(this.inquiry.tanggal_catat)).format(
        this.DATE_FORMAT
      )
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
    wageItems() {
      return this.$store.state.wageItems
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
}
</script>

<style></style>

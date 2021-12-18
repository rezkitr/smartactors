<template>
  <div class="max-w-screen-sm mx-auto" v-if="inquiry">
    <!-- section 1 -->
    <div class="bg-white w-full mb-3">
      <div class="py-4 border-b text-center">
        <h3 class="font-semibold">Faktur Gaji</h3>
      </div>
      <div class="px-4 py-4">
        <div class="border-b border-dashed pb-4">
          <h2 class="font-bold text-lg mb-1">
            {{ inquiry.nama_karyawan }}
          </h2>
          <p class="text-base tracking-tight text-gray-500">
            {{ startDate }} - {{ endDate }}
          </p>
        </div>

        <div class="flex justify-between items-center mt-4">
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
        <SalaryItem
          v-for="slrItem in inquiry.pengaturan_gaji"
          :key="slrItem.id"
          :name="slrItem.nama"
          :nominal="slrItem.nominal"
          :type="slrItem.jenis"
          :totalPeriod="inquiry.total_periode"
          :totalPresence="inquiry.total_kehadiran"
          @showSalaryModal="setShowSalaryModal(slrItem)"
        />
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
        <WageItem
          v-for="wageItem in wageItems"
          :key="wageItem.id"
          :name="wageItem.nama"
          :unit="wageItem.satuan"
          :nominal="wageItem.nominal"
          :donominal="wageItem.nominal_pengerjaan"
        />
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
        <div class="mb-4">
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
          <CommissionItem
            v-for="comItem in inquiry.komisi"
            :key="comItem.id"
            :item="comItem"
            @showCommissionModal="setShowCommissionModal"
          />
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
        <p class="text-sm text-gray-400">
          Karyawan ini memiliki tanggungan Rp 570.000
        </p>
      </div>
      <div class="px-4 py-4">
        <div class="mb-4">
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
        <div
          class="flex justify-between items-center pb-4 border-b border-dashed"
        >
          <div>
            <h6 class="text-base font-semibold">Ganti Barang Hilang</h6>
            <p class="text-sm text-gray-400">Baju hilang warna merah</p>
          </div>
          <div class="flex justify-end items-center text-red-400">
            <p class="mr-3">200.000</p>
            <a href="/" class="text-base font-semibold">
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
            </a>
          </div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <h5 class="font-bold">Tanggungan Dibayar</h5>
          <h5 class="font-bold text-red-400">(-) Rp 200.000</h5>
        </div>
      </div>
    </div>

    <!-- section 7 -->
    <div class="bg-white w-full">
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
        <div class="mt-5">
          <div
            class="bg-blue-500 rounded text-white font-semibold text-center py-2 cursor-pointer"
          >
            Berikutnya
          </div>
        </div>
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
  mounted() {
    this.$store.dispatch('getInquiry')
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
      return moment(new Date(this.$store.state.inquiry.tanggal_awal)).format(
        this.DATE_FORMAT
      )
    },
    endDate() {
      return moment(new Date(this.$store.state.inquiry.tanggal_akhir)).format(
        this.DATE_FORMAT
      )
    },
    subTotalSalary() {
      return this.$store.state.subTotalSalary
    },
    subTotalCommission() {
      return this.$store.state.subTotalCommission
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

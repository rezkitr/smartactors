<template>
  <div class="max-w-screen-sm mx-auto">
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
            <p>Rp 2542000</p>
          </template>
        </PaymentDetailsItem>
        <PaymentDetailsItem class="font-semibold">
          <template v-slot:title>
            <p>Subtotal Upah</p>
          </template>
          <template v-slot:nominal>
            <p>Rp 2542000</p>
          </template>
        </PaymentDetailsItem>
        <PaymentDetailsItem class="font-semibold">
          <template v-slot:title>
            <p>Subtotal Komisi</p>
          </template>
          <template v-slot:nominal>
            <p>Rp 2542000</p>
          </template>
        </PaymentDetailsItem>

        <PaymentDetailsItem class="mt-4 font-semibold">
          <template v-slot:title>
            <p>Gaji Kotor</p>
          </template>
          <template v-slot:nominal>
            <p>Rp 2542000</p>
          </template>
        </PaymentDetailsItem>

        <PaymentDetailsItem class="mt-5 text-red-500 font-semibold">
          <template v-slot:title>
            <p class="text-sm">Tanggungan</p>
          </template>
          <template v-slot:nominal>
            <p>(-) Rp 2542000</p>
          </template>
        </PaymentDetailsItem>
      </div>
      <PaymentDetailsItem class="text-blue-500 mt-3 font-bold">
        <template v-slot:title>
          <p>Total Gaji Bersih</p>
        </template>
        <template v-slot:nominal>
          <p>Rp 2542000</p>
        </template>
      </PaymentDetailsItem>
    </div>

    <div class="bg-white py-4 px-4">
      <div>
        <label class="text-sm text-gray-400"
          >Bayar dari Rekening
          <span class="text-blue-500 font-semibold">*</span></label
        >
        <div class="h-8 px-2 border rounded">
          <select
            class="w-full h-full text-sm outline-none"
            :class="{ 'text-gray-400': selectedBank === '0' }"
            v-model="selectedBank"
          >
            <option value="0" disabled selected hidden>
              Pilih Rekening Bank
            </option>
            <option value="BNI">BNI</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-sm text-gray-400"
          >Dicatat pada Tanggal
          <span class="text-blue-500 font-semibold">*</span></label
        >
        <div class="h-8 px-2 border rounded">
          <!-- <input
            class="text-sm w-full h-full outline-none"
            type="text"
            placeholder="Pilih tanggal"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            v-model="selectedDate"
          /> -->
          <input
            type="date"
            class="w-full h-full outline-none text-sm"
            placeholder="Choose a Date"
            v-model="selectedDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBank: '0',
      selectedDate: new Date(),
    }
  },
  methods: {},
  mounted() {
    console.log(this.selectedBank)
  },
}
</script>

<style></style>

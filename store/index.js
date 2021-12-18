export const state = () => ({
  originInquiry: null,
  inquiry: null,
  wageItems: null,
  subTotalSalary: 0,
  subTotalWage: 0,
  subTotalCommission: 0,
  paidFine: 0,
})

export const getters = {
  totalGrossSalary: (state) => {
    return state.subTotalSalary + state.subTotalWage + state.subTotalCommission
  },
  totalTakeHomePaySalary: (state) => (totalGross) => {
    return totalGross - state.paidFine
  },
}

export const mutations = {
  setInquiry(state, inquiryData) {
    state.originInquiry = inquiryData
    state.inquiry = inquiryData
  },

  setWageItems(state, data) {
    const wageData = data.pengaturan_upah
    const doWageData = data.pengerjaan_upah
    let items = []
    wageData.map((item) => {
      const doItemData = doWageData.find(
        (doItem) => doItem.pengaturan_upah_id === item.id
      )

      if (doItemData) {
        items.push({
          ...item,
          satuan: doItemData.satuan,
          nominal_pengerjaan: doItemData.nominal,
        })
      }
    })
    state.wageItems = items
  },
  setSubTotalSalary(state) {
    let total = 0
    state.inquiry.pengaturan_gaji.map((item) => {
      if (item.jenis === 'periode') {
        total += item.nominal * state.inquiry.total_periode
      } else if (item.jenis === 'kehadiran') {
        total += item.nominal * state.inquiry.total_kehadiran
      }
    })
    state.subTotalSalary = total
  },
  setSubTotalWage(state) {
    let total = 0
    state.wageItems.map((item) => {
      total += item.nominal * item.nominal_pengerjaan
    })
    state.subTotalWage = total
  },
  setSubTotalCommission(state) {
    let total = 0
    state.inquiry.komisi.map((item) => {
      total += item.nominal
    })
    state.subTotalCommission = total
  },
  setPaidFine(state) {
    let total = 0
    state.inquiry.tanggungan.map((item) => {
      total += item.nominal
    })
    state.paidFine = total
  },
  addPresence(state) {
    state.inquiry = {
      ...state.inquiry,
      total_kehadiran: state.inquiry.total_kehadiran + 1,
    }
  },
  subtractPresence(state) {
    state.inquiry = {
      ...state.inquiry,
      total_kehadiran: state.inquiry.total_kehadiran - 1,
    }
  },
  updateInquiry(state, data) {
    state.inquiry = { ...state.inquiry, ...data }
  },
}

export const actions = {
  async getInquiry({ commit }) {
    const result = await this.$axios.$get(
      'https://boss.smartlink.id/salary/inquiry'
    )
    if (result.success) {
      commit('setInquiry', result.data)
      commit('setWageItems', result.data)
      commit('setSubTotalSalary')
      commit('setSubTotalWage')
      commit('setSubTotalCommission')
      commit('setPaidFine')
    }
  },
}

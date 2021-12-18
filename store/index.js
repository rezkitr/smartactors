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
  resetInquiry(state, data) {
    state.inquiry = { ...state.inquiry, ...data }
  },
  updateBasicSalary(state, data) {
    const updatedSalary = state.inquiry.pengaturan_gaji.map((item) =>
      item.jenis === 'periode' ? { ...item, nominal: data.nominal } : item
    )
    state.inquiry = {
      ...state.inquiry,
      total_periode: data.total_periode,
      pengaturan_gaji: updatedSalary,
    }
  },
  updateCompensationSalary(state, data) {
    const updatedSalary = state.inquiry.pengaturan_gaji.map((item) =>
      item.id === data.id ? { ...item, nominal: data.nominal } : item
    )
    state.inquiry = {
      ...state.inquiry,
      pengaturan_gaji: updatedSalary,
    }
  },
  addCommission(state, data) {
    state.inquiry = {
      ...state.inquiry,
      komisi: [...state.inquiry.komisi, data],
    }
  },
  updateCommission(state, data) {
    const updatedCommission = state.inquiry.komisi.map((item) =>
      item.id === data.id
        ? { ...item, nama: data.nama, nominal: data.nominal }
        : item
    )
    state.inquiry = {
      ...state.inquiry,
      komisi: updatedCommission,
    }
  },
  deleteCommission(state, id) {
    const updatedCommission = state.inquiry.komisi.filter(
      (item) => item.id !== id
    )

    state.inquiry = {
      ...state.inquiry,
      komisi: updatedCommission,
    }
  },
  addPaidFine(state, data) {
    state.inquiry = {
      ...state.inquiry,
      tanggungan: [...state.inquiry.tanggungan, data],
    }
  },
  updatePaidFine(state, data) {
    const updatedPaidFine = state.inquiry.tanggungan.map((item) =>
      item.id === data.id
        ? { ...item, nama: data.nama, keterangan: data.keterangan }
        : item
    )
    state.inquiry = {
      ...state.inquiry,
      tanggungan: updatedPaidFine,
    }
  },
  deletePaidFine(state, id) {
    const updatedPaidFine = state.inquiry.tanggungan.filter(
      (item) => item.id !== id
    )

    state.inquiry = {
      ...state.inquiry,
      tanggungan: updatedPaidFine,
    }
  },
}

export const actions = {
  async getInquiry({ commit }) {
    const result = await this.$axios.$get('/inquiry')
    console.log(result.data)
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

<template>
  <ModalBase @onClose="close">
    <template v-slot:header v-if="item"> Ubah Tanggungan/Denda </template>
    <template v-slot:header v-else> Tambah Tanggungan/Denda </template>
    <template v-slot:body></template>
    <template v-slot:footer></template>
  </ModalBase>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    close() {
      this.$emit('onClose')
    },
  },
}
</script>

<style></style>

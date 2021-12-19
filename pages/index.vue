<template></template>
<script>
export default {
  name: 'IndexPage',
  mounted() {
    this.$store.dispatch('getInquiry')
    this.$router.push('/salaryinvoice')
  },
}
</script>

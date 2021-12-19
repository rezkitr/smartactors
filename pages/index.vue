<script>
export default {
  name: 'IndexPage',
  beforeMount() {
    this.$store.dispatch('getInquiry')
    this.$router.push('/salaryinvoice')
  },
}
</script>

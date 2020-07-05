<template>
  <Layout>
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getCookieRedirect']),
  },
  created() {
    this.$router.replace({
      force: true,
      path: this.getCookieRedirect,
    });
  }
};
</script>
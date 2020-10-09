<template>
  <Layout>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    getUserId(ref) {
      this.$db.getUserId(ref)
        .then(id => console.log(id))
        .catch(err => console.error(err))
    }
  }
}
</script>
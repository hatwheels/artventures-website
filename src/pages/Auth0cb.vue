<template>
  <div class="spinner">
    <img src="../../static/loading.svg" alt="Loading">
  </div>
</template>

<script>
export default {
  mounted() {
    this.$auth.handleAuthentication().then( (data) => {
      this.$auth.getUserRole()
        .then(() => {
          this.$auth.getProvider()
            .then(() => this.$router.push({ path: '/user/profile' }))
            .catch(err => {
              this.$auth.logout()
            })
        })
        .catch(err => {
          this.$auth.logout()
        })
    })
  }
}
</script>

<style scoped>
  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: transparent;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
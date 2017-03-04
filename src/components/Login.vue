<template>
  <div class="login">
    <form>
      <input name="email" type="text" v-model="username" />
      <input name="password" type="password" v-model="password" />
      <button type="button" v-on:click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      const { username, password } = this
      this.$store.dispatch('login', {
        username, password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

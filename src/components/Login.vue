<template>
  <div class="login">
    <form v-if="!loading" v-on:keyup.enter="login">
      <label class="login__label">Username / email</label>
      <input class="login__input" name="email" type="text" v-model="username" />
      <label class="login__label">Password</label>
      <input class="login__input" name="password" type="password" v-model="password" />
      <button class="login__submit" type="button" v-on:click="login">Login</button>
    </form>
    <ring-loader class="login__spinner" v-if="loading" />
  </div>
</template>

<script>
import RingLoader from 'vue-spinner/src/RingLoader.vue'

export default {
  name: 'login',
  data () {
    return {
      username: null,
      password: null,
      loading: false
    }
  },
  components: {
    RingLoader
  },
  methods: {
    login () {
      this.loading = true
      const { username, password } = this
      this.$store.dispatch('login', {
        username, password
      }).then(() => {
        this.$router.replace('/project-list')
      }).catch(() => {
        this.loading = false
        alert('an error occured')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .login {
    width: 300px;
    margin: auto;
  }

  .login__label {
    display: block;
  }

  .login__input {
    display: block;
    margin-bottom: 25px;
    width: 100%;
  }

  .login__submit {
    margin: 0 0 0 auto;
    display: block;
  }

  .login__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

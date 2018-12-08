<template>
  <div class="login">
    <form class="form-signin">
      <img
        class="mb-4"
        src="../assets/logo.png"
        alt=""
        width="72"
        height="72"
      >
      <h1 class="h3 mb-3 font-weight-normal">請登入</h1>
      <label
        for="inputEmail"
        class="sr-only"
      >Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="電子信箱"
        required
        autofocus
        v-model="user.username"
      >
      <label
        for="inputPassword"
        class="sr-only"
      >Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="密碼"
        required
        v-model="user.password"
      >
      <div class="checkbox mb-3 mt-3 remember-me">
        <label>
          <input
            type="checkbox"
            value="remember-me"
          > 記住我
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click="signIn"
      >登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const path = `${process.env.VUE_APP_APIPATH}/signin`;
      console.log(path);
      const vm = this;
      vm.$http.post(path, vm.user).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/admin/products');
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login{
  text-align: center;
  width: 30%;
  margin: auto;
}
.remember-me{
  text-align: left;
}
</style>

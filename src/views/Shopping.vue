<template>
    <div>
      <Navbar/>
      <div class="container-fluid">
        <div class="row">
        <main
          role="main"
          class="col-md-9 ml-sm-auto col-lg-10 px-4"
        >
        <router-view></router-view>
        </main>
        </div>
      </div>
    </div>
</template>
<script>
import Navbar from 'components/ShoppingNavbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

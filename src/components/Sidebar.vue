<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item" @click="activeLink('products')">
            <router-link
              class="nav-link"
              to="/admin/products"
              :class="{'active': isActive.products}"
            >
              商品列表
            </router-link>
          </li>
          <li class="nav-item" @click="activeLink('orders')">
            <router-link
              class="nav-link"
              to="/admin"
              :class="{'active': isActive.orders}"
            >
              訂單列表
            </router-link>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between
            align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a
            class="d-flex align-items-center text-muted"
            href="#"
          >
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: {
        products: true,
        orders: false,
      },
    };
  },
  methods: {
    activeLink(link) {
      Object.keys(this.isActive).forEach((element) => {
        if (link === element) {
          this.$set(this.isActive, element, true);
        } else {
          this.$set(this.isActive, element, false);
        }
      });
    },
  },
};
</script>

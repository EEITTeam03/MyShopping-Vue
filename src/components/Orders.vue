<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in setOrder"
          :key="item.id"
          :class="{'text-secondary': !item.is_paid}"
        >
          <td>{{ item.create_at | date }}</td>
          <td><span v-if="item.user" v-text="item.user.email" /></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :page="pagination"
      @changePage="getOrders"
    />
  </div>
</template>
<script>
import Pagination from 'components/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      isLoading: false,
      pagination: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const path = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/orders?page=${page}`;
      console.log(path);
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(path).then((response) => {
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
  },
  computed: {
    setOrder() {
      let newOrders = [];
      const vm = this;
      if (vm.orders.length) {
        newOrders = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          console.log(bIsPaid - aIsPaid);
          return bIsPaid - aIsPaid;
        });
      }
      return newOrders;
    },
  },
  created() {
    this.getOrders();
  },
  components: {
    Pagination,
  },
};
</script>

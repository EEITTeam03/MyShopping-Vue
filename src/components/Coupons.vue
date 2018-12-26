<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        @click="openModal(true)"
      >建立新的優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in coupons"
          :key="item.id"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date}}</td>
          <td>
            <span
              v-if="item.is_enabled"
              class="text-success"
            >啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >編輯</button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteModal(item)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :page="pagination"
      @changePage="getCoupons"
    />
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-md"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span v-if="isNew">新增優惠卷</span>
              <span v-else>編輯優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
                  <div class="form-group col-md-8">
                    <label for="title">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入標題"
                      v-model="tempCoupon.title"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-8">
                    <label for="code">優惠碼</label>
                    <input
                      type="text"
                      class="form-control"
                      id="code"
                      placeholder="請輸入優惠碼"
                      v-model="tempCoupon.code"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-8">
                    <label for="due_date">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      placeholder="請輸入到期日"
                      v-model="tempCoupon.due_date"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-8">
                    <label for="price">折扣百分比</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入折扣百分比"
                      v-model="tempCoupon.percent"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-8">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="is_enabled"
                        v-model="tempCoupon.is_enabled"
                      >
                      <label
                        class="form-check-label"
                        for="is_enabled"
                      >
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
                <hr>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateCoupon"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span>刪除優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Pagination from 'components/Pagination.vue';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  methods: {
    getCoupons(page = 1) {
      const path = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/coupons?page=${page}`;
      console.log(path);
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(path).then((response) => {
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    openDeleteModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $('#delCouponModal').modal('show');
    },
    deleteProduct() {
      const vm = this;
      const path = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/coupon/${vm.tempCoupon.id}`;
      console.log(path);
      vm.$http.delete(path).then((response) => {
        console.log('刪除結果', response.data.success);
        $('#delCouponModal').modal('hide');
        vm.getCoupons();
      });
    },
    updateCoupon() {
      const vm = this;
      let path = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/coupon`;
      let httpMethod = 'post';
      // 若是修改
      if (!vm.isNew) {
        path = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      console.log(path);
      vm.$http[httpMethod](path, { data: vm.tempCoupon }).then((response) => {
        console.log('新增 or 修改結果', response.data);
        $('#couponModal').modal('hide');
        vm.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
  components: {
    Pagination,
  },
};
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !page.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getPage(page.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" v-for="value in page.total_pages" :key="value"><a
          class="page-link"
          :class="{'active': page.current_page === value}"
          href="#"
          @click.prevent="getPage(value)"
        >{{value}}</a></li>
      <li class="page-item" :class="{'disabled': !page.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getPage(page.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    page: Object,
  },
  methods: {
    getPage(toPage) {
      this.$emit('changePage', toPage);
    },
  },
};
</script>

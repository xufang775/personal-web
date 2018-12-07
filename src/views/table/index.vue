<template>
  <div class="app-container">

  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: null,
      listLoading: true
    }
  },
  created () {
    let obj1 = { a : 1 };
    let obj2 = { b : 2 };
    let obj3 = { c : 3 };
    let aa={...obj1,...obj2, ...obj3}
    console.log(aa);

    let obj4 = { a : 1, b : 2, c : 3 };
    let obj5 = { a : 10, b : 20, c : 30 };
    let obj6 = { a : 100, b : 200, c : 300 };
    let bb={ ...obj4, ...obj5, ...obj6 }
    console.log(bb);

    var obj7 = { a : 1 };
    var obj8 = { a : 10, b : 20 };
    var obj9 = { b : 200, c : 300 };
    let cc={ ...obj7, ...obj8, ...obj9 }
    console.log(cc);
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
    }
  }
}
</script>

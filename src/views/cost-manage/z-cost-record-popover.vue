<template>
  <el-popover trigger="hover" placement="right"  width="400">
    <div v-if="data.length==1">
      <p>消费金额：{{data[0].costPrice}}</p>
      <p>消费描述：{{data[0].remark}}</p>
    </div>
    <div v-if="data.length>1">
      <el-table size="mini" :data="data" border>
        <el-table-column width="80" property="costPrice" label="消费金额"></el-table-column>
        <el-table-column property="remark" label="消费描述"></el-table-column>
      </el-table>
    </div>
    <div slot="reference" class="name-wrapper">
      <span :class="{'detail-ico':true}"></span>
    </div>
  </el-popover>
</template>

<script>
    export default {
      name: "z-cost-record-popover",
      props:{
        data:[{
          costPrice:'',
          remark:''
        }]
      }
    }
</script>

<style scoped>

  .detail-ico{
    width:0;
    height:0;
    overflow:hidden;  /*清除ie6下默认的宽高*/
    font-size: 0;     /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
    line-height: 0;  /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
    border-width: 5px;
    border-style: solid;
    border-color: red red transparent transparent;
    position: absolute;
    top:0px;
    right:0px;
    z-index: 99;
  }
</style>

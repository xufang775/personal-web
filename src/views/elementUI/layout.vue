<template>
  <div style="padding: 20px;">
    <div>
    <h3>基础布局</h3>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    </div>
    <div>
      <h3>分栏间隔：Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0。</h3>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
    <div>
      <h3>分栏偏移：通过制定 col 组件的 offset 属性可以指定分栏偏移的栏数。</h3>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
    <div>
      <h3>对齐方式</h3>
      <el-row type="flex" class="row-bg">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
    <div>
      <h3>响应式布局</h3>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-demo'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row{
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .el-col{ border-radius: 4px; }
  .bg-purple-dark{ background: #99a9bf; }
  .bg-purple{ background: #d3dce6; }
  .bg-purple-light{ background: #e5e9f2; }
  .grid-content{ border-radius: 4px; min-height: 36px; }
  .row-bg{ padding: 10px 0; background-color: #f9fafc; }
</style>

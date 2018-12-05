// 基本组件
export { BaseDialog ,BaseSearch, BaseList } from '@/components/base'
//类
export { CostRecord,CostRecordSearch } from '@/model/cost-record'

//请求方法
export { dic as dicCostItem } from '@/api/cost-item';
export {
  pageList,
  save as saveCostRecord,
  saveList as saveCostRecordList,
  del as delCostRecord
} from '@/api/cost-record'


export default {
  data(){
    return {
      // currentDate: new Date,
      weekendCellBg:'#d0e69c',
      total:{sumAll:''},
      columnSum:{
        code:'sum',
        name:'合计',
        field:'sum'
      },
      rowSum: {
        date: '合计',
        dateStr:'sum',
      }
    }
  },
  computed:{
    columns: function () {
      let cols = this.showColumnSum
                ? [ ...this.costTypeList , ...[this.columnSum] ]
                : this.costTypeList;
      return cols;
    },
    rows: function () {
      if(this.costRecordList.length>0 && this.costTypeList.length > 0){
        return this.handleRow();
      } else {
        return [];
      }
    }
  },
  created(){

  },
  methods:{
    handleRow(){
      if(this.searchType){
        let searchTypeU = `handleRow${this.$toUpperCase(this.searchType)}`;
        if(this[searchTypeU]){
          return this[searchTypeU]();
        }
      }
      return [];
    },
    handleRowMonth(){
      let rows = [];
      //================处理其他行======================
      let first = this.currentDate.first('month').date ;
      let last = this.currentDate.last('month').date;
      for(let i= first; i<= last; i++){
        let iDate = this.$getDateStr(this.currentDate,i);
        let row = {};
        // 处理列
        if(iDate) row = this.handleRowDataMonth(iDate);
        rows.push(row);
      }
      //================处理合计行================
      let rowSum = this.handleRowDataSumMonth();
      rows.push(rowSum);
      // this.$emit('totalChange',this.total);
      return rows;
    },
    handleRowYear(){
      console.log('handleRowYear')
    },
    // 每行的数据处理
    handleRowDataMonth(iDate){
      let data = this.costRecordList;
      let iDateStr = iDate.format();
      let row = {
        dateStr: iDateStr ,
        isToday: iDate.isToday ,
        isWeekend: iDate.isWeekend ,
        [this.headerOne.field] : iDate.date
      };
      this.columns.forEach(iCol=>{
        let rowOther = {};
        if(iCol.field === 'sum') {
          // 列合计（最后一列）
          let sumCol =0;
          let itemDatas = data.filter(m=> m.costDate == iDateStr );
          if(itemDatas.length>0){
            itemDatas.forEach(item=> sumCol +=item.costPrice*100);
            row[iCol.field] = sumCol/100;
          }
        } else {
          // 其他列
          rowOther = this.handleCellData(iCol,iDateStr);
          row = {...row,...rowOther};
        }
      });
      return row;
    },
    // 处理每个单元格的业务数据
    handleCellData(iCol,iDateStr){
      let row = {};
      let cellData = this.costRecordList.filter(m=> m.costDate == iDateStr && m.costTypeCode!=null && m.costTypeCode.indexOf(iCol.code)==0);
      if(cellData.length > 0){
        if(cellData && cellData.length>0){
          let sumCol =0;
          let costPriceAll=[];
          let remarkAll=[];
          cellData.forEach(item=>{
            sumCol += item.costPrice*100;
            // 处理详情信息
            costPriceAll.push(...(item.costPriceAll).split('||'));
            if(item.remarkAll){
              remarkAll.push(...(item.remarkAll).split('||'));
            }
          });
          row[iCol.field] = sumCol/100;
          // // 处理详情信息
          let details =[];
          costPriceAll.forEach((m,k)=>{
            details.push({
              costPrice:m,
              remark:remarkAll.length-1>=k? remarkAll[k]:''
            })
          });
          row['details-'+iCol.field]=details;
        }
      }
      return row;
    },
    // 合计行数据处理
    handleRowDataSumMonth(){
      // 最后一个单元格：总合计
      let data = this.costRecordList;
      let sumAll= data.reduce((sum,item)=> sum +=item.costPrice*100,0);
      let rowOne = { ...this.rowSum , ...{ [this.columnSum.field]: sumAll/100 }}
      // 遍历：其他列合计
      this.columns.forEach(iCol=>{
        let columnsData = data.filter(m=> m.costTypeCode!=null && m.costTypeCode.indexOf(iCol.code)==0 );
        let sumColumns= columnsData.reduce((sum,item)=> sum +=item.costPrice*100,0);
        if(sumColumns > 0)
          rowOne[iCol.field] = sumColumns/100;
      });
      // 计算吃食合计
      let filterValue=['早餐','中餐','晚餐','水果蔬菜','其他食物',];
      let colFoods = this.columns.filter(m=>filterValue.indexOf(m.value)>=0);
      let sumFood= colFoods.reduce((sum,item)=> sum += rowOne[col.field]*100,0);
      this.total.sumAll = sumAll/100;
      this.total.foodAll = sumFood/100;

      return rowOne;
    },
  }
}

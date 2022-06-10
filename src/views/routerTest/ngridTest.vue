<template>
    <!-- <div class="ow-grid-wrap">
      <wj-flex-grid
      headersVisibility="Column"
      allowSorting="None"
      selectionMode="None"
      class="ow-grid type-header-group"
      :loadedRows="onloadedRows"
      :itemsSource="data">
      <ow-n-grid :n="2" >
      <wj-flex-grid-column-group binding="vendor" header="협력업체" width="*" />
      <wj-flex-grid-column-group header="발주" align="center">
        <wj-flex-grid-column-group binding="itemCount" header="품목수" :width="50" cssClassAll="ta-c border-right-sm" />
        <wj-flex-grid-column-group binding="count" header="수량" :width="50" cssClassAll="ta-c border-right-sm" />
        <wj-flex-grid-column-group binding="price" header="금액" :width="50" cssClassAll="ta-c" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="발주조정" align="center">
        <wj-flex-grid-column-group binding="mItemCount" header="품목수" :width="50" cssClassAll="ta-c border-right-sm">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span> {{cell.item['mItemCount'] || '-'}} </span><br/>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
        <wj-flex-grid-column-group binding="mCount" header="수량" :width="50" cssClassAll="ta-c border-right-sm">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span> {{cell.item['mCount'] || '-'}} </span><br/>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
        <wj-flex-grid-column-group binding="mPrice" header="금액" :width="50" cssClassAll="ta-c">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span> {{cell.item['mPrice'] || '-'}} </span><br/>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
      </wj-flex-grid-column-group>
  </ow-n-grid>
    </wj-flex-grid>
    </div> -->
  <ow-n-grid :n="2" >
    <div class="ow-grid-wrap">
    <wj-flex-grid
      headersVisibility="Column"
      allowSorting="None"
      selectionMode="None"
      class="ow-grid type-header-group"
      :loadedRows="onloadedRows"
      :itemsSource="data">
      <wj-flex-grid-column-group binding="vendor" header="협력업체" width="*" />
      <wj-flex-grid-column-group header="발주" align="center">
        <wj-flex-grid-column-group binding="itemCount" header="품목수" :width="50" cssClassAll="ta-c border-right-sm" />
        <wj-flex-grid-column-group binding="count" header="수량" :width="50" cssClassAll="ta-c border-right-sm" />
        <wj-flex-grid-column-group binding="price" header="금액" :width="50" cssClassAll="ta-c" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="발주조정" align="center">
        <wj-flex-grid-column-group binding="mItemCount" header="품목수" :width="50" cssClassAll="ta-c border-right-sm">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span> {{cell.item['mItemCount'] || '-'}} </span><br/>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
        <wj-flex-grid-column-group binding="mCount" header="수량" :width="50" cssClassAll="ta-c border-right-sm">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span> {{cell.item['mCount'] || '-'}} </span><br/>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
        <wj-flex-grid-column-group binding="mPrice" header="금액" :width="50" cssClassAll="ta-c">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span> {{cell.item['mPrice'] || '-'}} </span><br/>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
      </wj-flex-grid-column-group>
    </wj-flex-grid>
    </div>
  </ow-n-grid>
</template>

<script>
// import OwNGrid from '../../components/grid/new/OwNGrid.vue';

function getRandomCount(i = 1500){
  return Math.round(Math.random() * i);
} ;
function getVendorName(code) {
  const vendor = ITEM_VENDORS.filter(o => o.code == code)[0];
  return vendor ? vendor.name : '';
}

const ITEM_VENDORS = [
  {code: 0, name: '현대바이오랜드'},
  {code: 1, name: 'KaVo Dental GmbH'},
  {code: 2, name: '엔에스케이덴탈코리아 (주)'},
  {code: 3, name: '(주)가나시이스'},
  {code: 4, name: '디메가'},
  {code: 5, name: 'NAVER'},
  {code: 6, name: 'KAKAO'},
  {code: 7, name: '(주) 오스템 임플란트'},
  {code: 8, name: '아름다운 가게'},
  {code: 9, name: '명화당'},
  {code: 11, name: 'KOSA'},
  {code: 12, name: '요기요'},
  {code: 13, name: '배달의 민족'},
  {code: 14, name: '쿠팡잇츠'},
  {code: 15, name: 'KGC인삼공사'},
  {code: 16, name: '교보문고'},
  {code: 17, name: '삼성전자'},
  {code: 18, name: 'Apple'},
  {code: 19, name: '신세계 백화점'},
  {code: 20, name: 'KISA'},
];


export default {
  components: {
  }
  // ,props: {
  //   read: {
  //     // type: Object,
  //     default: function () {
  //       // return true;
  //       return {
  //         show: false,
  //       };
  //     },
  //   },
  //   insert: {
  //     // type: Object,
  //     default: function () {
  //       return true;
  //     },
  //   },
  // }
  , data () {
    return {
      data : [] ,
    }
  }
  , methods : {
    getData() {
      let data =  ITEM_VENDORS.reduce((acc, cur) => [...acc, ...[{...cur, ...{
          vendor: getVendorName(cur.code),
          itemCount: getRandomCount(),
          count: getRandomCount(),
          price: getRandomCount(),
          mItemCount: 1,
          mCount: 2,
          mPrice: 3000
      }}]], []);

      data.splice(0, 0, (data.reduce((acc, cur) => {
        Object.keys(cur).forEach(k => {
          if (k !== 'vendor') acc[k] += cur[k];
        })
        return acc;
      }, {vendor: '전체', itemCount: 0, count: 0, price: 0, mItemCount: 0, mCount: 0, mPrice: 0})));

      return data;
    } ,
    onloadedRows(grid) {
      console.log( 'onloadedRows in', grid.rows[0] );
      console.log('grid.rows : ' + grid.rows);
      console.log('grid.rows.length : ' + grid.rows.length);
      console.log('grid.rows[0] : ' + grid.rows[0]);
      if (grid.rows && grid.rows.length) {
        // grid.rows[0].cssClass = 15;
        // grid.rows[0].cssClass = grid.rows.length;
        grid.rows[0].cssClass = 'cell-total';
      }
    }
  } , 
  created () {
    this.data = this.getData() ;
  }
};

</script>

<style lang="scss">
.ow-grid {
  .wj-cell {
    &.clr-red {
      color : #f60808 ; 
    }
  }
}
</style>
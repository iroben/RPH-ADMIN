<template>
  <div>
  	<Table border :columns="columns1" :data="tableData" size="small"></Table>
  	<div class="page-bar" v-if="pageData">
  		<span class="page-bar-left">总{{pageData.total}}条</span>
  		<Page class="page-bar-right" 
  		:total="pageData.total" 
  		:page-size="pageData.pagesize" 
  		:current="pageData.page" 
  		@on-change="changePage"
  		show-elevator></Page>
  	</div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        columns1: [{
          title: '姓名',
          key: 'name'
        }, {
          title: '年龄',
          key: 'age'
        }, {
          title: '地址',
          key: 'address'
        }],
        tableData: [],
        pageData: null
      }
    },
    mounted() {
    	this.tableData = [123];
    	this.$store.dispatch('testApi',{
    		page: 1,
    		pageSize: 10,
    	}).then(response => {
    		this.tableData = response.data.data;
    		this.pageData = response.data.page;
    	});
    },
    methods: {
    	changePage (page){
    		
    		this.$Message.info('page:'+ page);
    		this.$store.dispatch('testApi',{
	    		page: page,
	    		pageSize: 10,
	    	}).then(response => {
	    		this.tableData = response.data.data;
	    		this.pageData = response.data.page;
	    	});
    	}
    }
}
</script>

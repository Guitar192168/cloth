<template>
	<div class='goods'>
		<goods-list-item v-for='(item, index) in goods' :key='index' :goods-item='item' ></goods-list-item>
		<!-- {{goods}} -->
	</div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default{


	name:'GoodsList',
	components:{
		GoodsListItem
	},
	props:{
		goods:{
			type:Array,
			default(){
				return []
			} 
		}
	}
};
</script>

<style scoped>
.goods{
	display:flex;
	flex-wrap:wrap;
	justify-content:space-around;
	margin: 0 1%;
}
</style>
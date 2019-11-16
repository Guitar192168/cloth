<template>
	<div class='cart'>
		<nav-bar class='nav-bar'>
			<!-- 导航 -->
			<div slot='center'>购物车({{ length }})</div>
		</nav-bar>
		
		<!--  商品的列表-->
		<cart-list/>

		<!-- 底部结算导航 -->
		<cart-bottom-bar/>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar';
import CartList from './childComps/CartList';
import cartBottomBar from './childComps/cartBottomBar';
import { mapGetters } from 'vuex';

export default{
	name:'Cart',
	components:{
		NavBar,
		CartList,
		cartBottomBar
	},
	computed:{
		// ...mapGetters(['cartLength','cartList'])
		...mapGetters({
			length:'cartLength',
		})
	},
};
</script>

<style scoped>
.cart{
	height: 100vh;
}

.nav-bar{
	background-color: pink;
	color:#fff;
	font-size: 20px;
}
</style>
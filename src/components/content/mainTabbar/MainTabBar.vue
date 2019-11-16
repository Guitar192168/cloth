<template>
		<tab-bar>
		<tab-bar-item path='/home'>
			<img slot='item-icon' src="~assets/img/tabbar/home.png" height="200" width="200" alt=""><img slot='item-icon-active' src="~assets/img/tabbar/home_active.png" height="200" width="200" alt="">
			<div slot='item-text' style="white-space:nowrap">首页</div>
		</tab-bar-item>
		<tab-bar-item path='/category'>
			<img slot='item-icon' src="~assets/img/tabbar/category.png" height="200" width="200" alt="">
			<img slot='item-icon-active' src="~assets/img/tabbar/category_active.png" height="200" width="200" alt="">
			<div slot='item-text'>分类</div>
		</tab-bar-item>
		<tab-bar-item path='/cart'>
			<img slot='item-icon' src="~assets/img/tabbar/cart.png" height="200" width="200" alt="">
			<img slot='item-icon-active' src="~assets/img/tabbar/cart_active.png" height="200" width="200" alt="">
			<div slot='item-text'>购物车</div>
		</tab-bar-item>
		<tab-bar-item path='/profile'>
			<img slot='item-icon' src="~assets/img/tabbar/profile.png" height="200" width="200" alt="">
			<img slot='item-icon-active' src="~assets/img/tabbar/profile_active.png" height="200" width="200" alt="">
			<div slot='item-text'>我的</div>
		</tab-bar-item>
	</tab-bar>	
</template>

<script>
import TabBar from '../../../components/common/tabbar/TabBar.vue'
import TabBarItem from '../../../components/common/tabbar/TabBarItem.vue'

export default{
	name:'MainTarBar',
	components:{
		TabBar,
		TabBarItem
	}
};
</script>

<style>

</style>
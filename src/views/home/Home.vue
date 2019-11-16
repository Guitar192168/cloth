<template>
	<div id='home'>
		<nav-bar class='home-nav'><div slot='center'>购物街</div></nav-bar>
		
		<tab-control 
		:titles="['流行','新款','精选']"
		@tabClick='tabClick' ref='tabControl1' class='tab-control'
		v-show='isTabFixed'/>

		<Scroll class='content' 
		ref='scroll' 
		:probe-type='3' 
		:pull-up-load='true'
		@scroll='contentScroll'
		@pullingUp='loadMore'>
		<home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
		<home-recommend-view :recommends='recommends'></home-recommend-view>
		<feature-view></feature-view>
		<tab-control 
		:titles="['流行','新款','精选']"
		@tabClick='tabClick' ref='tabControl2'/>
		<goods-list :goods="showGoods"/>
	</Scroll>

	<back-top @click.native='backClick' v-show='isShowBackTop'/>

</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'


/*用大括号是因为没有 用default导出*/
import {getHomeMultidata,getHomeGoods} from '../../network/home'
import {debounce} from '../../common/utils'
import { itemListenerMixin, backTopMixin } from '../../common/mixin'


export default{
	name:'Home',
	components:{
		NavBar,
		TabControl,
		GoodsList,
		Scroll,
		HomeSwiper,
		HomeRecommendView,
		FeatureView,
	},
	mixins:[itemListenerMixin, backTopMixin],
	data(){
		return {
			banners:[],
			recommends:[],
			goods:{
				'pop':{page:0, list:[]},
				'new':{page:0,list:[]},
				'sell':{page:0,list:[]},
			},
			currentType:'pop',
			tabOffsetTop:0,
			isTabFixed:false,
			saveY:0
		}
	},
	actived(){
		this.$refs.scroll.scrollTo(0, this.saveY, 0)
		this.$refs.scroll.refresh()
	},
	deactived(){
		// // 1.保存Y值
		this.saveY = this.$refs.scroll.getScrollY()

		// 2.取消全局事件的监听
		// this.$bus.$off('itemimageLoad',函数)
		this.$bus.$off('itemimageLoad',this.itemImageListener)
	},
	// 等 组件 一旦创建好
	created(){
		// 1.请求多个数据
		this.getHomeMultidata()

		// 2.请求商品数据
		this.getHomeGoods('pop')
		this.getHomeGoods('new')
		this.getHomeGoods('sell')		

	},
	// mounted(){
	// 	// 图片完成加载的事件监听
	// 	const refresh = debounce(this.$refs.scroll.refresh,500)
	// 	// func = this.$refs.scroll.refresh()

	// 	// const refresh = function(...args){
	// 	// 	if(timer)clearTimeout(timer)
	// 	// 		tix`mer = setTimeout(() => {
	// 	// 			func.apply(this,  args)
	// 	// 		},delay)
	// 	// }


	// 	// 3.监听item中图片加载完成

	// 	// 对监听的事件进行保存
	// 	this.itemImageListener = () => {
	// 		// this.$refs.scroll.refresh()	 

	// 		refresh()
	// 	}

	// 	this.$bus.$on('itemimageLoad',this.itemImageListener)
			
		
	// },
	destroyed(){
		console.log('destroyed')
	},
	computed:{
		showGoods(){
			return this.goods[this.currentType].list
		}
	},
	methods:{
		/**
		事件监听相关的方法
		**/
		backClick(){
			// this.$refs.scroll.scroll.scrollTo(0,0,500)
			this.$refs.scroll.scrollTo(0, 0, 500)
		},	
		tabClick(index){
			switch (index){
				case 0:
				this.currentType = 'pop'
				break
				case 1:
				this.currentType = 'new'
				break
				case 2:
				this.currentType = 'sell'
				break
			}
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
		},
		contentScroll(position){
			// console.log(position)
			// 1. 判断backTop是否显示
			this.isShowBackTop  = Math.abs(position.y) > 1000

			// 2.决定tabControl是否吸顶(position:fixed)
			this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
		},
		loadMore(){
			// console.log('加载更多')
			this.getHomeGoods(this.currentType)
		},
		swiperImageLoad(){
			// 获取tabControl的offsetTop
			//所有的组件都有一个属性$el:用于获取组件中的元素
			// console.log(this.$refs.tabControl.$el.offsetTop )
			this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
		},
		/**
		网络请求相关的方法
		*/
		getHomeMultidata(){
			getHomeMultidata().then(res => {
			// console.log(res.data)
			// this.result = res;
			this.banners = res.data.banner.list;
			this.recommends = res.data.recommend.list;
		})
		},
		getHomeGoods(type){
			const page = this.goods[type].page + 1
			getHomeGoods(type,page).then(res => {
				// 这里不保存下来就会被回收处理
				this.goods[type].list.push(...res.data.list)
				this.goods[type].page += 1
				// console.log(res);

				// 完成上拉加载更多
				this.$refs.scroll.finishPullUp()
			})
		}
	}
};
</script>

<style scoped>
#home{
	/*padding-top:44px;*/
	height:100vh;
	position:relative;
}

.home-nav{
	background-color: var(--color-tint);
	color:#fff;

	/*这是原生的固定方法，为了防止导航栏滑动到上面*/
	/*position:fixed;
	left:0;
	right:0;
	top:0;
	z-index:9;*/
}

/*不起效果*/
/*.tab-control{
	position:sticky;
	top:44px;
	z-index:9;
	}*/
	.tab-control{
		position:relative;
		z-index:9;
	}

	
	.fixed{
		position:fixed;
		left:0;
		right:0;
		top:44px;
		}

		.content{
			/*height: 300px;*/
			overflow: hidden;
			position:absolute;
			top:44px;
			bottom:49px;
			left:0;
			right:0;
		}

		/*.content{*/
			/*height: calc(100% - 93px);*/

/*	overflow:hidden;
	margin-top:44px;
	}*/
	</style>

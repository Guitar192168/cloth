<template>
	<div id='detail'>
		<detail-nav-bar class='detail-nav' :probeType='3' @titleClick='titleClick' ref='nav'/>
		<scroll class='content' ref='scroll' :probeType='3' @scroll='contentScroll'>
			<detail-swiper :top-images='topImages'/>
			<detail-base-info :goods='goods'/>
			<detail-shop-info class='shop-info' :shop='shop'/>
			<detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
			<detail-param-info ref='params' :param-info='paramInfo'/>
			<detail-comment-info ref='comment' :comment-info='commentInfo'/>
			<goods-list ref='recommend' :goods='recommends'/>
		</scroll>
		<detail-bottom-bar @addCart='addToCart'/>

		<back-top @click.native='backClick' v-show='isShowBackTop'/>
		<!-- <toast/> -->

	</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from '../../components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'
import BackTop from '../../components/content/backtop/BackTop'

import { getDetail, Goods, getRecommend,Shop, GoodsParam } from '../../network/detail'
import { debounce } from '../../common/utils'
import { itemListenerMixin,backTopMixin } from '../../common/mixin'

import { mapActions } from 'vuex';
 
// import Toast from '../../components/common/toast/Toast'

export default{
	name:'Detail',
	components:{
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommentInfo,
		DetailBottomBar,
		GoodsList,
		Scroll,
		// Toast
	},
	mixins:[itemListenerMixin, backTopMixin ],
	data(){
		return {
			iid:null,
			topImages:[],
			goods:{},
			shop:{},
			detailInfo:{},
			paramInfo:{},
			commentInfo:{},
			recommends:[],
			themeTopYs:[],  
			getThemeTopY:null,
			currentIndex:0
		}
	},
	created(){
		// 1.保存传入的iid
		this.iid = this.$route.params.iid

		//2. 根据iid请求详情数据
		getDetail(this.iid).then(res => {
			//1.获取顶部的图片轮播数据
			console.log(res)
			const data = res.result;
			// 取出轮播图的数据
			this.topImages = data.itemInfo.topImages;

			//   获取商品信息
			this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.
				services); 

			// 3.创建店铺信息的对象
			this.shop = new Shop(data.shopInfo)

			//4. 获取商品详情数据
			this.detailInfo = data.detailInfo

			// 5.获取商品参数信息
			this.paramInfo =new GoodsParam(data.itemParams.info, data.itemParams.rule)

			//  6. 获取评论的信息
			if(data.rate.cRate !==0){
				this.commentInfo = data.rate.list[0]
			}
		})


		// 3.请求推荐数据
		getRecommend().then(res => {
			this.recommends = res.data.list
		})

		// 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
		this.getThemeTopY = debounce( () => {
			this.themeTopYs = []

			this.themeTopYs.push(0);
			this.themeTopYs.push(this.$refs.params.$el.offsetTop -15);
			this.themeTopYs.push(this.$refs.comment.$el.offsetTop -20);
			this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -15);
			this.themeTopYs.push(Number.MAX_VALUE);

			console.log(this.themeTopYs)	
		},500)
	},
	mounted(){},
	updated(){},
	destroyed(){
		this.$bus.$off('itemimageLoad',this.itemImageListener)
	},
	methods:{
		...mapActions(['addCart']),
		imageLoad(){
			this.newRefresh() 

			this.getThemeTopY()
		},
		titleClick(index){
			this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
		},
		contentScroll(position){
			// 1.获取Y值
			const positionYY = -position.y

			let length = this.themeTopYs.length
			for(let i = 0; i < length - 1 ; i++){
				if(this.currentIndex !== i && ( positionYY >= this.themeTopYs[i] && positionYY < this.themeTopYs[i + 1] )){
					this.currentIndex = i;
					this.$refs.nav.currentIndex = this.currentIndex;
					console.log(this.currentIndex)
				}
				// 3.是否显示回到顶部
				this.isShowBackTop  = Math.abs(position.y) > 1000
			}
		},
		addToCart(){
			// 1.获取购物车需要展示的信息
			const product = {};
			product.image = this.topImages[0];
			product.title = this.goods.title;
			product.desc = this.goods.desc;
			product.price = this.goods.realPrice;
			product.iid = this.iid;

			// 2.将商品添加到购物车里(1.Promise  2.mapActions)
			// this.$store.commit('addCart', product)

			this.addCart(product).then( res => {
				this.$toast.show(res, 2000)
				// console.log(this.$toast)
			})
				
			// this.$store.dispatch('addCart', product).then(res => {
			// 	console.log(res)
			// })
		}

	}
};
</script>

<style scoped>
#detail{
	position:relative;
	z-index:9;
	background-color: #fff;
	height:100vh;
}
.detail-nav{
	position: relative;
	/*相对定义依然保持在原来位置*/
	z-index:9;
	background-color: #fff;
}

.content{
	/* 100%是相对于父元素的*/
	height:calc(100% - 93px);		
}
</style>

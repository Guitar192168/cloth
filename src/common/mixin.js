import { debounce } from './utils';
import BackTop from '../components/content/backtop/BackTop'

export const itemListenerMixin = {
	data(){
		return{
			itemImageListener:null,
			newRefresh:null
		}
	},
	mounted(){

		this.newRefresh = debounce(this.$refs.scroll.refresh, 500)

		this.itemImageListener = () =>{
			this.newRefresh()
		}

		this.$bus.$on('itemimageLoad',this.itemImageListener)
		// console.log('我是混入的')
	}
}


export const backTopMixin = {
	components:{
		BackTop
	},
	data(){
		return {
			isShowBackTop:false
		}
	},
	// methods仅仅会合并大的函数，函数内部的
	// this.isShowBackTop  = Math.abs(position.y) > 1000

	methods:{
		backClick(){
			// this.$refs.scroll.scroll.scrollTo(0,0,500)
			this.$refs.scroll.scrollTo(0, 0, 500)
		}
	}
}
<template>
	<!-- ref/children  -->
	<div class='wrapper' ref='wrapper'>
		<div class='content'>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'

export default{
	name:'Scroll',
	props:{
		probeType:{
			type:Number,
			default:0
		},
		pullUpLoad:{
			type:Boolean,
			default:false
		}
	},
	data(){
		return {
			scroll:null
		}
	},
	mounted(){
			// 这里不能直接用document.querySelector('wrapper')是因为默认选择第一个wrapper
			// 然而我们不知道哪个是第一个
			// console.log(document.querySelector('wrapper'))

			// 1.创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})

			
			// 2.监听滚动的位置
			this.scroll.on('scroll',(position) => {
				// console.log(position)
				this.$emit('scroll',position)
			})

			//3.监听scroll滚动到底部
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',() => {
					// console.log('监听到滚动到底部')
					this.$emit('pullingUp')
				})
			}
		},
		methods:{
		// 这里使用ES6语法，可以直接设置默认值
		scrollTo(x ,y, time=500){
			this.scroll && this.scroll.scrollTo(x, y, time)
		},
		// finishPullUp(){
		// 	this.scroll.finishPullUp()
		// },
		refresh(){
			// console.log('-----')
			this.scroll && this.scroll.refresh()
		},
		finishPullUp(){
			this.scroll && this.scroll.finishPullUp()
		},
		getScrollY(){
			return this.scroll ? this.scroll.y : 0
		}
	}

};
</script>

<style scoped>

</style>
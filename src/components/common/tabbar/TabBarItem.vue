 <template>
	<div class='tab-bar-item' @click='itemClick'>
		<div v-if='!isActive'><slot name='item-icon'></slot></div>
		<div v-else ><slot name='item-icon-active'></slot></div>
		<div :style='activeStyle'><slot name='item-text'></slot></div>
		<!-- 这里不显示效果，是因为 下面这个slot`会被APP.vue里的
			<div slot='item-text'>我的</div> 给替换掉 -->
		<!-- <slot :class='{active:isActive }' name='item-text'></slot> -->
	</div>
</template>



<script>
export default{
	name:'TabBarItem',
	data(){
		return {
			// isActive:false
		}
	},
	computed:{
		isActive(){
			//  /home ->item1(/home) = true
			//  /home ->item1(/category = false
			//  /home ->item(/cart = false
			//  /home ->item(/profile = false

			// console.log(this.$route.path)
			// console.log(this.path)
			return this.$route.path.indexOf(this.path) !== -1
		},
		activeStyle(){
			return this.isActive ? {color: this.activeColor}:{}
		}
	},
	props:{
		path:String,
		activeColor:{
			type:String,
			default:'red'
		}
	},
	methods:{
		itemClick(){
			// console.log('itemClick')
			// console.log(this.path)
			this.$router.replace(this.path)
			// console.log(this.$router)
		}
	}
};
</script>

<style scoped>

.tab-bar-item{
	flex:1;
	text-align:center;
	height: 49px;
	font-size: 14px;
}

.tab-bar-item img{
	width: 24px;
	height: 24px;
	margin-top:3px;
	vertical-align:middle;
	margin-bottom:2px;
}


</style>

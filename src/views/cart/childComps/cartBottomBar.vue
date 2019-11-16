<template>
	<div class='bottom-bar'>
		<div class='check-content'>
			<check-button :is-checked='isSelectAll' class='check-button' @click.native='allSelect'/>
			<span>全选</span>
		</div>


		<div class='price'>
			合计:{{ totalPrice }}
		</div>

		<div class='calculate' @click='calcClick'>
			去计算({{ checkLength }})
		</div>
	</div>
</template>

<script>
import checkButton from '../../../components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default{
	name:'cartBottomBar',
	components:{
		checkButton
	},
	computed:{
		...mapGetters(['cartList']),
		totalPrice(){
			return '￥' + this.cartList.filter( item => {
				return item.checked
			}).reduce((preValue, item) => {
				return preValue + item.price * item.count
			},0).toFixed(2)
		},
		checkLength(){
			return this.cartList.filter( item => item.checked).length
		},
		isSelectAll(){
			return this.cartList.every( item => item.checked )
		}
	},
	methods:{
		allSelect(){
			if(this.isSelectAll){//全部选中
				this.cartList.forEach( item => item.checked = false )
			}else{//有部分或者全部不选中
				this.cartList.forEach( item => item.checked = true )
			}

			// 这里不能做简化
			// this.cartList.forEach( item => item.checked = !this.isSelectAll)
		},
		calcClick(){
			if(!this.isSelectAll){
				this.$toast.show('请选择购买的商品',2000)
			}
		}
	}
};
</script>

<style scoped>
.bottom-bar{
	display: flex;
	position:relative;
	height: 40px;
	line-height: 40px;
	font-size: 16px;

	background-color: #eee;
}

.check-content{
	display:flex;
	align-items:center;
	margin-left:10px;
	width: 90px;
}

.check-button{
	width: 18px;
	height: 18px;
	line-height:20px;	
	margin-right:5px;
}

.price{
	margin-left:15px;
	flex:1;
}

.calculate{
	width: 90px;
	background: deeppink;
	color: #fff;
	text-align:center;
}
</style>
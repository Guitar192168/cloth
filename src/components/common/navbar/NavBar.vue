<template>
	<div class='nav-bar'>
		<div class='left'><slot name='left'></slot></div>
		<div class='center'><slot name='center'></slot></div>
		<div class='right'><slot name='right'></slot></div>
	</div>
</template>

<script>
export default{
	name:'NavBar'
};
</script>

<style scoped>
.nav-bar{
	text-align:center;
	display:flex;
	height: 44px; 
	/*导航栏一般是44px*/
	/*设置line-height可以直接撑起来*/
	line-height:44px;
	box-shadow:0 1px 1px rgba(100, 100, 100, 0.1);
}

.left, .right {
	width: 60px;
	/*background-color: pink;*/
}

.center{
	flex:1;
	/*background-color: skyblue;*/
}
</style>
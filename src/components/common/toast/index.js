import Toast from './Toast'

const obj = {}

obj.install = function(Vue){

	// 1.先创建组件构造器
	const toastConstructor = Vue.extend(Toast);;

	// 2.new的方式,根据组件构造器，可以创建一个组件对象
	const toast = new toastConstructor();

	// 3.将组件对象，手动挂载到某一个元素上
	toast.$mount(document.createElement('div'));

	// toast.$el对应的就是div
	document.body.appendChild(toast.$el);

	// 只是把对象放到了原型上面，但是这个对象有自己的模板，这些内容没有被添加到body上
	Vue.prototype.$toast = toast;
}


export default  obj
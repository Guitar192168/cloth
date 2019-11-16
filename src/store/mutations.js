export default {
		// mutations中的每个方法尽可能完成的事情比较单一 一点
		addCounter(state, payload){
			payload.count++ 
		},
		addToCart(state, payload){
			payload.checked = true
			state.cartList.push(payload)
		}
	}
import {request} from './request'


export function getDetail(iid){
  return request({
     url:'api/v1/detail',
     params:{
        iid
    }
})
}

export function getRecommend(){
    return request({
        url:'/api/v1/recommend'
    })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
}
}
// 体现面向对象的封装的思想  
// 先把从服务器请求到的数据，先给封装到一个类里面，
// 再来创建对应这个类的对象，用这个对象给传到下一层组件里面,让组件对这个对象进行展示

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
}
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
}
}

// class Person{
// 	constructor(name,age){
// 		this.name = name;
// 		this.age = age
// 	}
// }

// const p = new Person('yangqi',18)
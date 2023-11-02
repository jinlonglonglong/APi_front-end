import axois from '../utils/axiosExport'
interface LoginData {
    password: string;
    refereeUserAddress: string;
    userAddress: string;
    userPower: number;
}

export function Login(data: LoginData) {
    return axois.request({
        url: '/uUser/loginByPass',
        method: 'post',
        data: {
            ...data,
        }
    })
}
/* 获取LP挖矿显示数据 */
export function getHomePrice() {
    return axois.request({
        url: '/ippUserOrder/getHomePrice',
        method: 'get'
    })
}
/* 获取用户分享分红发放记录集合 */
export function getInfo() {
    return axois.request({
        url: `/aAntShareDivvyIncome/getInfo`,
        method: 'get'
    })
}
/* 获取用户分享分红发放记录集合 */
export function grantRecordList() {
    return axois.request({
        url: '/aAntShareDivvyIncome/grantRecordList',
        method: 'get'
    })
}
/* 获取用户分享分红领取记录集合 */
export function receiveRecordList() {
    return axois.request({
        url: '/aAntShareDivvyIncome/receiveRecordList',
        method: 'get'
    })
}
/* 获取用户分享信息 */
export function aAntShareIncomeGetInfo() {
    return axois.request({
        url: '/aAntShareIncome/getInfo',
        method: 'get'
    })
}
/* 获取用户分享记录集合 */
export function recordList() {
    return axois.request({
        url: '/aAntShareIncome/recordList',
        method: 'get'
    })
}
/* 获取用户分享记录集合 */
export function aAntLevelDivvyIncome() {
    return axois.request({
        url: '/aAntLevelDivvyIncome/grantRecordList',
        method: 'get'
    })
}
/* 获取用户分享记录集合 */
export function aAntLevelDivvyIncomeReceiveRecordList() {
    return axois.request({
        url: '/aAntLevelDivvyIncome/receiveRecordList',
        method: 'get'
    })
}
/* 获取用户分享记录集合 */
export function aAntShareIncome() {
    return axois.request({
        url: '/aAntShareIncome/getInfo',
        method: 'get'
    })
}
/* 获取用户分享记录集合 */
export function aAntShareIncomeRecordList() {
    return axois.request({
        url: '/aAntShareIncome/recordList',
        method: 'get'
    })
}
/* 获取用户分享记录集合 */
export function aAntLevelIncomeRecordList() {
    return axois.request({
        url: '/aAntLevelIncome/recordList',
        method: 'get'
    })
}
/* 获取用户星级信息 */
export function aAntUserGetInfo() {
    return axois.request({
        url: '/aAntUser/getInfo',
        method: 'get'
    })
}
/* 
获取用户邀请信息 */
export function getUserReferee() {
    return axois.request({
        url: '/uUser/getUserReferee',
        method: 'get'
    })
}
/* 
获取级别奖励记录集合 */
export function aAntLevelIncome() {
    return axois.request({
        url: '/aAntLevelIncome/recordList',
        method: 'get'
    })
}
/* 
获取节点分红信息 */
export function aAntNodeIncome() {
    return axois.request({
        url: '/aAntNodeIncome/getInfo',
        method: 'get'
    })
}
/* 获取节点分红信息 */
export function aAntNodeIncomeRecordList() {
    return axois.request({
        url: '/aAntNodeIncome/recordList',
        method: 'get'
    })
}
/* 获取用户收益记录集合 */
export function aAntStaticIncome() {
    return axois.request({
        url: '/aAntStaticIncome/recordList',
        method: 'get'
    })
}
/* 获取用户收益记录集合 */
export function getUserInfo() {
    return axois.request({
        url: '/uUser/getUserInfo',
        method: 'get'
    })
}
/* 获取用户收益记录集合 */
export function getCoinPriceOrBpExchangeRate() {
    return axois.request({
        url: 'home/getCoinPriceOrBpExchangeRate',
        method: 'get'
    })
}
// 绑定关系
export function signBindReferee(data: any) {
    console.log(data);

    return axois.request({
        url: `/uUser/signBindReferee`,
        method: 'post',
        data: {
            ...data,
        }
    })
}
// 购买
export function pay(data: any) {
    console.log(data, 'data');
    return axois.request({
        url: `/aAntUser/pay`,
        method: 'post',
        data: {
            ...data,
        }
    })
}
// 领取用户收益
export function receive(data: any) {
    return axois.request({
        url: `/aAntUserIncome/receive`,
        method: 'post',
        data: {
            ...data,
        }
    })
}
// 查询新闻
export function lastNews() {
    return axois.request({
        url: `/prod-api/api/news/lastNews`,
        method: 'get'
    })
}
// 查询币价
export function getPriceList() {
    return axois.request({
        url: `/prod-api/api/price/list`,
        method: 'get'
    })
}

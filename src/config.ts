import Token from './ABI/ERC20Token.json';
import RewardDistribute from './ABI/RewardDistribute.json';
import MY from './ABI/MY.json';
import StarMarket from './ABI/StarMarket.json';
import Union from './ABI/Union.json';
import UnionFactory from './ABI/UnionFactory.json';
import TransferUtil from './ABI/TransferUtil.json';

// 正式
export const LOCAL_KEY = "MBAS_LANG"
export const isMain =  false
// 自己
// export let baseUrl: string = isMain ? 'http://120.79.67.226:16088/' : 'http://192.168.2.114:16088/';
// export let baseUrl: string = isMain ? "http://120.79.67.226:13777/" : 'http://52.74.100.156/';
export let baseUrl: string = isMain ? "http://apidao.org" : 'http://52.74.100.156/';
export let BlockUrl: string = isMain ? 'https://bscscan.com/tx/' : 'wss://bsc-testnet.publicnode.com';
export let ContractUrl: string = isMain ? 'https://bscscan.com/address/' : 'https://testnet.bscscan.com/address/';
export let SwapUrl: string = "https://pancakeswap.finance/swap?outputCurrency=BNB&inputCurrency=0x6D6980B13702059a3CD2911e9547A6B5A76386B0";
export let CodeReportUrl: string = "https://github.com/freshcoins/Smart-Contract-Audits/blob/main/MBAA_0x6d6980b13702059a3cd2911e9547a6b5a76386b0.pdf";
export let RewardType: any = { "1": "16", "2": "17" }
export const BitNumber = 8

interface abiObjType {
    [propName: string]: any;
}

interface contractAddressType {
    [propName: string]: string;
}

export const  MyCoinAssets:any=[

    // {name:"APi",contractAddress:""},
    // {name:"renBTC",contractAddress:"0xfCe146bF3146100cfe5dB4129cf6C82b0eF4Ad8c"},
    // {name:"BTCB",contractAddress:"0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"},
    // {name:"ETH",contractAddress:"0x2170Ed0880ac9A755fd29B2688956BD959F933F8"},
    {name:"BNB",contractAddress:""},
    // {name:"WBNB",contractAddress:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    // {name:"USDT",contractAddress:"0x55d398326f99059fF775485246999027B3197955"},
    // {name:"USDC",contractAddress:"0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"},
]

export const abiObj: abiObjType = {
    "USDT": Token,
    "TransferUtil": TransferUtil,
    "unionCoin": Token,
    "UnionFactory": UnionFactory,
    "AAA_greoup": Union,
}

export const Main: contractAddressType = {
    "USDT": "0x55d398326f99059fF775485246999027B3197955",
    "unionCoin": "0x55d398326f99059fF775485246999027B3197955",
    "TransferUtil": "0x23bD6290226D290c7308FfC1Fb9Fd8F853EDF885",
}

const Test = {
    "USDT": "0xc0285e3235A76f17c68742EFCeA6B625657F8362",
    "unionCoin": "0xc0285e3235A76f17c68742EFCeA6B625657F8362",
    "TransferUtil": "0x23bD6290226D290c7308FfC1Fb9Fd8F853EDF885",

}

export const contractAddress: contractAddressType = isMain ? Main : Test
// Test 


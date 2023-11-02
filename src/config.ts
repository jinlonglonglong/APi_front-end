import Token from './ABI/ERC20Token.json';
import RewardDistribute from './ABI/RewardDistribute.json';
import MY from './ABI/MY.json';
import StarMarket from './ABI/StarMarket.json';
import Union from './ABI/Union.json';
import UnionFactory from './ABI/UnionFactory.json';
import TransferUtil from './ABI/TransferUtil.json';
import AvtorIcon1 from './assets/image/TradeManage/AvtorIcon1.svg'
import AvtorIcon2 from './assets/image/TradeManage/AvtorIcon2.svg'
import AvtorIcon3 from './assets/image/TradeManage/AvtorIcon3.svg'
import AvtorIcon4 from './assets/image/TradeManage/AvtorIcon4.svg'
import AvtorIcon5 from './assets/image/TradeManage/AvtorIcon5.svg'
import AvtorIcon6 from './assets/image/TradeManage/AvtorIcon6.svg'
import AvtorIcon7 from './assets/image/TradeManage/AvtorIcon7.svg'
import AvtorIcon8 from './assets/image/TradeManage/AvtorIcon8.svg'
import AvtorIcon9 from './assets/image/TradeManage/AvtorIcon9.svg'
import AvtorIcon10 from './assets/image/TradeManage/AvtorIcon10.svg'
// 正式
export const LOCAL_KEY = "MBAS_LANG"
export const isMain =  true
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
    // "unionCoin": "0x55d398326f99059fF775485246999027B3197955",
    "TransferUtil": "0x947b79fcB7857C7B160A00eADa919329b4137B2c",
}

const Test = {
    "USDT": "0xc0285e3235A76f17c68742EFCeA6B625657F8362",
    // "unionCoin": "0xc0285e3235A76f17c68742EFCeA6B625657F8362",
    "TransferUtil": "0x23bD6290226D290c7308FfC1Fb9Fd8F853EDF885",

}
// 工会配置
export const GroupArr = [
    // { id: 1, icon: AvtorIcon1, title: "274", contractAddress: "0x4F56076694f394CC9218ba4B23D8e45F0556b33c", defaultAddress: " 0xebA9E1B144355F8FF405edCF90A771402d422AED", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 1, icon: AvtorIcon1, title: "274", contractAddress: "0xB328ca9bc03b629c29eCa0dA19292A2e9F9A1A14", defaultAddress: " 0x9610B26afA8727b42A4C9Da81eA697cAc2431cC0", "coinAddress": "0x55d398326f99059fF775485246999027B3197955" },
    // { id: 2, icon: AvtorIcon2, title: "275", contractAddress: "", defaultAddress: "0xd8F80A99559EFf7aA35b34E7Fe0BdBCe2d075e14", "coinAddress": "0x55d398326f99059fF775485246999027B3197955" },
    { id: 2, icon: AvtorIcon2, title: "275", contractAddress: "0x2D7DB47A836f0E177916FF75914e2cD5Cd6d798f", defaultAddress: "0xd8F80A99559EFf7aA35b34E7Fe0BdBCe2d075e14", "coinAddress": "0x55d398326f99059fF775485246999027B3197955" },
    { id: 3, icon: AvtorIcon3, title: "276", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 4, icon: AvtorIcon4, title: "277", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 5, icon: AvtorIcon5, title: "278", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 6, icon: AvtorIcon6, title: "279", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 7, icon: AvtorIcon7, title: "280", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 8, icon: AvtorIcon8, title: "281", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 9, icon: AvtorIcon9, title: "282", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
    { id: 10, icon: AvtorIcon10, title: "283", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": "0xc0285e3235A76f17c68742EFCeA6B625657F8362" },
   
  ]

export const contractAddress: contractAddressType = isMain ? Main : Test
// Test 


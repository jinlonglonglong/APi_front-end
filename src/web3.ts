import { useCallback, useMemo } from 'react'
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract';
import { provider } from 'web3-core';
import Web3 from 'web3'
import { abiObj, contractAddress, isMain } from './config'
import BigNumber from 'big.js'
declare let window: any;
interface contractType {
    [propName: string]: Contract;
}
export const ChainId = {
    // BSC: "0x61",
    BSC: isMain ? "0x38" : "0x61",
}

//切换链
const SCAN_ADDRESS = {
    [ChainId.BSC]: 'https://scan.demonchain.io/'
}
//配置连接链的信息
export const networkConf = {
    [ChainId.BSC]: {
        // chainId: '0x61',
        chainId: isMain ? '0x38' : '0x61',
        chainName: 'BSC',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: isMain ? ['https://bsc-dataseed.binance.org/'] : ['https://data-seed-prebsc-2-s1.bnbchain.org:8545'],
        blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
    }
}
//切换链
export const changeNetwork = (chainId: number) => {
    return new Promise<void>(reslove => {
        const { ethereum } = window
        if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
            ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        ...networkConf[chainId]
                    }
                ],
            }).then(() => {
                setTimeout(reslove, 500)
            })
        } else {
            reslove()
        }
    })
}

export class Contracts {
    //单例
    static example: Contracts
    web3: Web3
    contract: contractType = {}
    constructor(library: provider) {
        this.web3 = new Web3(library)
        //保存实例到静态属性
        Contracts.example = this
    }
    //判断合约是否实例化
    verification(contractName: string) {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contractAddress[contractName])
        }
    }
    //合约的方法

    //查询BNB余额
    getBalance(addr: string) {
        return this.web3.eth.getBalance(addr)
    }
    // bathTransferBNB(addr: string) {
    //     return this.web3.eth.bathTransferBNB(addr)
    // }
    totalSupply(addr: string) {
        this.verification('PEX')
        return this.contract.PEX?.methods.totalSupply().call({ from: addr })
    }
    //查询余额
    balanceOf(addr: string, contractAddress: string) {
        // this.verification(contractName)
        let obj = new this.web3.eth.Contract(abiObj["USDT"], contractAddress)
        return obj?.methods.balanceOf(addr).call({ from: addr })
    }
    //查询授权
    Tokenapprove(addr: string, toaddr: string, contractName: string) {
        this.verification(contractName)
        let obj = new this.web3.eth.Contract(abiObj[contractName], contractAddress[contractName])
        return obj?.methods.allowance(addr, toaddr).call({ from: addr })
    }
    //授权1
    approve(addr: string, toaddr: string, contractName: string) {
        this.verification(contractName)
        let obj = new this.web3.eth.Contract(abiObj[contractName], contractAddress[contractName])
        var amount = Web3.utils.toBN("99999999999999999999999999999999")
        console.log(toaddr, amount, '########', obj, "*******");
        return obj?.methods.approve(toaddr, amount).send({ from: addr })
    }
    //签名数据
    Sign(addr: string, msg: string) {
        console.log(msg, 'msg');
        return this.web3.eth.personal.sign(this.web3.utils.utf8ToHex(msg) as string, addr, '123')
    }

    
    //查询绑定
    bound(addr: string, contractName: string, contactAddress: string) {
        // this.verification(contractName)
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(obj, addr, abiObj[contractName], "obj");
        return obj?.methods.bound(addr).call({ from: addr })
    }
    //查询绑定
    boundReferrer(addr: string, contractName: string, contactAddress: string, referAddress: any) {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, referAddress);

        return obj?.methods.boundReferrer(referAddress).send({ from: addr })
    }
    symbol(addr: string, contactAddress: any) {
        // this.verification('PEX')
        let obj = new this.web3.eth.Contract(abiObj["USDT"], contactAddress)
        console.log(obj, addr, "obj");
        return obj?.methods.symbol().call({ from: addr })
    }
    buyFinancialManagement(addr: string, contractName: string, contactAddress: string, amount: any, type: any) {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj,amount, '3232');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        let amounted = Web3.utils.toWei(String(amount), "ether")
        console.log(amounted,'amounted1212');
        return obj?.methods.buyFinancialManagement(amounted, type).send({ from: addr })
    }


    getFinancialInfo(addr: string, contactAddress: string, type: number, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj, 'obj1212');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        return obj?.methods.getFinancialInfo(type).call({ from: addr })
    }
    getFinancialInfos(addr: string, contactAddress: string, type: number, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj, 'obj1212');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        return obj?.methods.getFinancialInfos(type).call({ from: addr })
    }
    // 根据usdt查询对应工会代币数量
    getUnionCoinAmount(addr: string, contactAddress: string, amount: string, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj, 'obj1212');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        let amounted = Web3.utils.toWei(String(amount), "ether")
        console.log(amounted, 'amounted');

        return obj?.methods.getUnionCoinAmount(amounted).call({ from: addr })
    }
    // 手续费
    withdrawFee(addr: string, contactAddress: string, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj, 'obj1212');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        return obj?.methods.withdrawFee().call({ from: addr })
    }
    // 领取理财收益方法
    withdrawFinancialInterest(addr: string, contactAddress: string, type: number, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj, type, 'withdrawFinancialInterest');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        return obj?.methods.withdrawFinancialInterest(type).send({ from: addr })
    }
    // 领取分享收益方法
    withdrawInviteReward(addr: string, contactAddress: string, type: number, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj, 'obj1212');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        return obj?.methods.withdrawInviteReward(type).send({ from: addr })
    }
    // 活期理财赎回
    cancleFinancial(addr: string, contactAddress: string, no: number, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        console.log(addr, contractName, contactAddress, obj, 'obj1212');
        // let amounted = new BigNumber(amount).times(10 ** 18).toString()
        return obj?.methods.cancleFinancial(no).send({ from: addr })
    }
    // 查询我的推荐地址
    referrer(addr: string, contactAddress: string, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        return obj?.methods.referrer(addr).call({ from: addr })
    }
    // 查询直推地址
    getReferers(addr: string, contactAddress: string, type: any, contractName: string = 'AAA_greoup') {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        }
        let obj = new this.web3.eth.Contract(abiObj[contractName], contactAddress)
        return obj?.methods.getReferers(addr, type).call({ from: addr })
    }
    // BNB批量转
    bathTransferBNB(addr: string,addList:any,amounts:any,amount:any) {
        this.verification('TransferUtil')
        let amountsed=Web3.utils.toWei(String(amounts),'ether')
        let amounted=Web3.utils.toWei(String(amount),'ether')
        console.log(addList,amounted);
        return this.contract.TransferUtil?.methods.bathTransferBNB(addList,amounted).send({ from: addr,value: amountsed})
    }
    // ERC20批量转
    bathTransferERC20(addr: string,tokenAddress:any,addList:any,amounts:any,amount:any) {
        this.verification('TransferUtil')
        let amounted=Web3.utils.toWei(String(amount),'ether')
        return this.contract.TransferUtil?.methods.bathTransferERC20(tokenAddress,addList,amounted).send({ from: addr })
    }





}
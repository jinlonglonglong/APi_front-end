import React, { useState, useEffect } from 'react'
import { getHomePrice } from '../../API/index'
import NoData from '../NoData'
import Table from '../Table'
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/reducer';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ContainerBox, FlexBox, FlexCCBox, FlexECBox, FlexSBCBox, FlexSCBox } from '../FlexBox'
import { Dropdown, Menu, Modal, Switch, Input } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ChainIcon from '../../assets/image/Tools/ChainIcon.svg'
import downIcon from '../../assets/image/Tools/downIcon.svg'
import WordIcon from '../../assets/image/Tools/WordIcon.svg'
import BigNumber from 'big.js'
import BNB from '../../assets/image/Market/BNB.svg'
import USDT from '../../assets/image/Market/USDT.svg'
import { url } from 'inspector'
import i18n from '../../lang/i18n'
import MessageBox from '../MessageBox/MessageBox'
import { Contracts } from '../../web3';
import { addMessage, showLoding } from '../../utils/tool';
import { contractAddress } from '../../config';
import web3 from 'web3'

const { TextArea } = Input;


const TabContainer = styled.div`
width: 100%;
padding: 33px 0px;
`
const TabTitle = styled.div` 
text-align: left;
padding-left:13px;
background: linear-gradient(180deg, #3C84FF 0%, #0ED7FE 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
/* 投影1 */
text-shadow: 0px 16px 11px rgba(66, 99, 235, 0.07);
font-family: Source Han Sans CN;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 33.6px */
`

const InfoBox = styled.div`
margin-top: 25px;
  width: 100%;
  position: relative;
  border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
padding: 28px 21px;
`
const LeftBg = styled.div`
position: absolute;
z-index: -1;
left:12px;
top:50%;
transform: translateY(-50%);
width: 8px;
height: calc(100% - 10px);
background: linear-gradient(180deg, rgba(108, 182, 255, 0.18) -7.29%, rgba(4, 218, 254, 0.35) 103.13%);`

const InfoItemsBox = styled.div`
  width: 100%;
`
const InfoItems = styled.div`
position: relative;
  width: 100%;
  z-index: 99;
>div{
  &:last-child{
    margin-bottom: 0;
  }
  &:nth-child(2){
align-items: flex-start;
  }
  &:nth-child(4){
align-items: flex-end;
  }
}
`
const InfoItem = styled(FlexBox)`
z-index: 999;
>div{
    /* &:first-child{
    align-items: flex-start;}
    &:last-child{
    align-items: flex-end;} */
}
justify-content: flex-start;
  width: 100%;
  margin-bottom: 35px;
`
const InfoLeft = styled(FlexCCBox) <{ active: boolean }>`
 width: 32px;
height: 32px;
border-radius: 50%;
margin-right: 13px;
background-color: ${({ active }) => active ? "#6CB6FF" : "#D4D4D4"};
border: 2px solid #6CB6FF;
flex-shrink:0;
`
const InfoRight = styled.div`
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
text-align: left;
/* word-break: break-all; */
/* width: 100% */
>div{
  color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
text-align: left;

/* width: 100% */
}
`
const BottomContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin-top: 10px;
`
const ItemsBox = styled.div`
width: 100%;
margin-top: 18px;
.ant-dropdown-menu{
    border-radius: 20px !important;
}
`
const ItemsTitle = styled.div`
width: 100%;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 19.6px */
margin-bottom: 12px;
`
const Items = styled(FlexSBCBox)`
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding: 13px 20px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const AcceptItems = styled(FlexBox)`
width: 100%;
align-items: center;
justify-content: space-around;
background: #FFF;
padding: 13px 20px;
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
`
const AcceptAddressItems = styled.div`
padding: 13px 18px;
width: 100%;
min-height: 228px;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
color: #000;
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 18px */
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
/* >div{
  color: #7681AA;
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
margin-top: 8px;

>img{
  margin-bottom: 8px;
}
`
const ItemLeft = styled(FlexBox)`
width: 100%;
    align-items: center;
    justify-content: flex-start;
    color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
white-space: nowrap;
`
const ItemLeftContent = styled(FlexBox)`
    align-items: center;
    justify-content: flex-start;
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
min-height: 32px;
width: 100%;
>input{
  width: 100%;
  border: none;
  color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 32px; 
&::-webkit-outer-spin-button{
  -webkit-appearance:textfield;
}
&::-webkit-inner-spin-button{
  -webkit-appearance:textfield;
}
}
input[type="number"]{
        -moz-appearance:textfield;
    }
`
const ItemRight = styled(FlexBox)`
    align-items: center;
    justify-content: flex-end;
`
const ItemsTitleContainer = styled(FlexBox)`
width: 100%;
    align-items: start;
    justify-content: space-between;

`
const ItemsRightTitle = styled(FlexBox)`
justify-content: flex-end;
width: 100%;
    align-items: start;
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
    >button{
      margin-left: 8px;
    }

`

const ItemBtn = styled(FlexCCBox)`
  color: #FFF;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 228.571% */
padding: 8px 0px;
width: 100%;
margin-top: 37px;
max-width: 268px;
border-radius: 10px;
background: var(--Linear, linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%));

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`



const SubTabContainer = styled(FlexBox)`
/* max-width: 290px; */
align-items: center;
width: 100%;
border-radius: 10px;
border: 1px solid rgba(66, 99, 235, 0.10);
background: var(--main-greyscale-5, #F8FAFC);
padding:  3.919px;
flex-shrink: 0;
/* margin-top: 26px; */

.ActiveTab{
    border-radius: 8.333px;
border: 0.833px solid #CED7FD;
background: var(--others-white, #FFF);
box-shadow: 0px 5.91002px 5.91002px 0px rgba(66, 99, 235, 0.09);
color: #2873FF;
text-align: center;
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 18px */
}

`
const SubTab = styled(FlexCCBox)`
height: 100%;
flex-basis:100%;
flex: 1;
display: flex;
padding: 7.84px;
justify-content: center;
align-items: center;
color: #8E9BAE;
text-align: center;
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 18px */
border: 1px solid transparent;
background: transparent;
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
`
const TabItems = styled(FlexSBCBox)`
width: 100%;
align-items: center;
`
const TabLeftItem = styled(FlexSBCBox)`

`
const TabRightItem = styled.div`
    line-height: 100%;
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
`
const AcceptAddressContent = styled.div`
width: 100%;
margin-top: 20px;

`
const AcceptSubTitle = styled.div`
width: 100%;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
text-align: left;
`
const AcceptAddressBox = styled.div`
width: 100%;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
text-align: left;
margin-top: 20px;
`
const CoinTypeBox = styled(FlexSBCBox)`
    width: 100%;
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */

`

const coinAddress = [
    { id: 1, icon: BNB, coinName: "BNB", address: "" },
    { id: 2, icon: USDT, coinName: "USDT", address: contractAddress?.USDT},
]

export default function Rank() {
    const { t, i18n } = useTranslation()
    const { account } = useWeb3React()
    const state = useSelector<stateType, stateType>(state => state)
    const [HomePrice, setHomePrice] = useState<any>([])
    const [ActiveSubTab, setActiveSubTab] = useState<any>(1)
    const [addressValue, setAddressValue] = useState<any>("")
    const [CoinType, setCoinType] = useState<any>(1)

    const [Amount, setAmount] = useState<any>()
    const [AddressArr, setAddressArr] = useState<any>("")
    const [AddressList, setAddressList] = useState<any>([])
    const [DropDownClose, setDropDownClose] = useState<any>(false)
    const [Balance, setBalance] = useState<any>("")
    const [ApproveValue, setApproveValue] = useState<any>("")



    function ApproveFun() {
        if (!account) {
            return addMessage(t("Please link wallet"))
        }
        showLoding(true)
        Contracts.example.approve(account as string, contractAddress?.TransferUtil, "USDT").then(() => {
            Contracts.example.Tokenapprove(account as string, contractAddress?.TransferUtil, "USDT").then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
                showLoding(false)
            })
        }).finally(() => {
            showLoding(false)
        })
    }

    const onChangeArrList = (e: any) => {
        console.log(e.target.value);
        let value = e.target.value
        setAddressArr(value)
        let valueed = value.replace(/\s*/g, "")
        console.log(String(valueed).split(","), 'addressList');

        setAddressList(String(valueed).split(","))
    };

    const changeCoinType = (e: any) => {
        console.log(coinAddress?.find((item: any) => Number(item?.id) === Number(e.key))?.address||"BNB");
        setCoinType(coinAddress?.find((item: any) => Number(item?.id) === Number(e.key))?.id)
        setAddressValue(coinAddress?.find((item: any) => Number(item?.id) === Number(e.key))?.address||"BNB")
    };
    const inputAddressFun = (e: any) => {
        let value = e.target.value;
        setAddressValue(value)
    }
    const inputAmountFun = (e: any) => {
        let value = e.target.value;
        setAmount(value)
    }

    const GetInitData = (type: any) => {
        if (Number(type) === 1) {
            Contracts.example.getBalance(account as string).then((res: any) => {
                setBalance(new BigNumber(res).div(10 ** 18).toString())
            })
        } else if (Number(type) === 2) {
            Contracts.example.balanceOf(account as string, contractAddress?.USDT).then((res: any) => {
                setBalance(new BigNumber(res).div(10 ** 18).toString())
            })
            Contracts.example.Tokenapprove(account as string, contractAddress?.TransferUtil, "USDT").then((res: any) => {
                console.log(res, 'shouquan');
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
            })
        }
    }

    const transferFun = () => {
        console.log(Number(AddressList?.length) * Number(Amount),Balance);
        
        if (Number(AddressList?.length) * Number(Amount) > Number(Balance)) return addMessage(t("Insufficient balance"))
        let tag=AddressList?.every((item: any) => web3.utils.isAddress(item || ""))
        // try {
        //     tag = 
        // } catch{
        //     return addMessage(t("286"))
        // }
        if (!tag) return addMessage(t("286"))
        showLoding(true)
        if (Number(CoinType) === 1) {
            Contracts.example.bathTransferBNB(account as string, AddressList, Number(AddressList?.length) * Number(Amount),Amount).then((res: any) => {
                showLoding(false)
                addMessage(t("284"))
            }).catch(() => {
                showLoding(false)
                addMessage(t("285"))
            })
        } else if (Number(CoinType) === 2) {
            Contracts.example.bathTransferERC20(account as string, addressValue, AddressList, Number(AddressList?.length) * Number(Amount),Amount).then((res: any) => {
                showLoding(false)
                addMessage(t("284"))
            }).catch(() => {
                showLoding(false)
                addMessage(t("285"))
            })
        }
    }


    useEffect(() => {
        if (account) {

            GetInitData(CoinType)

        }
    }, [account, CoinType])


    return (
        <TabContainer>
            <TabTitle>{t("161")}</TabTitle>
            <InfoBox>
                <InfoItemsBox>
                    <InfoItems>
                        <LeftBg></LeftBg>
                        <InfoItem>
                            <InfoLeft active={false}><img src={ChainIcon} alt="" /></InfoLeft>
                            <InfoRight>
                                {t("162")}
                                <div>{t("163")}</div>
                            </InfoRight>
                        </InfoItem>
                        <InfoItem>
                            <InfoLeft active={false}><img src={ChainIcon} alt="" /></InfoLeft>
                            <InfoRight>
                                {t("164")}
                                <div>{t("165")}</div>
                            </InfoRight>
                        </InfoItem>
                        <InfoItem>
                            <InfoLeft active={false}><img src={ChainIcon} alt="" /></InfoLeft>
                            <InfoRight>
                                {t("166")}
                                <div>{t("167")}</div>
                            </InfoRight>
                        </InfoItem>
                    </InfoItems>
                </InfoItemsBox>
            </InfoBox>
            <BottomContainer>

                <ItemsBox>
                    <ItemsTitle>{t("141")}</ItemsTitle>
                    <Items>
                        <ItemLeft>
                            <InfoLeft active={true}><img src={ChainIcon} alt="" /></InfoLeft>{t("147")}
                        </ItemLeft>
                        <ItemRight><img src={downIcon} alt="" /></ItemRight>
                    </Items>
                </ItemsBox>

                <ItemsBox>
                    <ItemsTitle>{t("148")}</ItemsTitle>
                    <Dropdown
                        overlay={<Menu
                            onClick={changeCoinType}
                            items={
                                coinAddress.map((item: any) => {
                                    return {
                                        label: <CoinTypeBox><img src={item?.icon} alt="" />{item?.coinName}</CoinTypeBox>,
                                        key: item?.id,
                                    }
                                })
                            }
                        />}
                        placement="bottomCenter"
                        overlayClassName="LangDropDown"
                        trigger={["click"]}
                        getPopupContainer={triggerNode => triggerNode}
                        overlayStyle={{ zIndex: '999' }}
                        onOpenChange={(boolean) => { setDropDownClose(boolean); }}
                    >
                        <Items>
                            <ItemLeft>
                                <ItemLeftContent>
                                    <input type="text" value={addressValue} placeholder={t("149")} onChange={inputAddressFun} />
                                </ItemLeftContent>
                            </ItemLeft>
                            <ItemRight><img src={downIcon} className={!DropDownClose ? 'rotetaOpen' : 'rotetaClose'} alt="" /></ItemRight>
                        </Items>
                    </Dropdown>
                </ItemsBox>

                <ItemsBox>
                    <ItemsTitleContainer>

                        <ItemsTitle>{t("150")}</ItemsTitle>
                        <ItemsRightTitle>
                            {t("151")}<Switch defaultChecked />
                        </ItemsRightTitle>
                    </ItemsTitleContainer>
                    <Items>
                        <ItemLeft>
                            {/* <ItemLeftContent>{t("168")}</ItemLeftContent> */}
                            <ItemLeftContent>
                                <input type="number" value={Amount} placeholder={t("168")} onChange={inputAmountFun} />
                            </ItemLeftContent>
                        </ItemLeft>
                        {/* <ItemRight><img src={downIcon} alt="" /></ItemRight> */}
                    </Items>
                </ItemsBox>

                <ItemsBox>
                    <ItemsTitle>{t("169")}</ItemsTitle>
                    <AcceptAddressItems>
                        <TabItems>
                            <TabLeftItem>
                                <SubTabContainer>
                                    <SubTab className={ActiveSubTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(1) }}>{t("170")}</SubTab>
                                    <SubTab className={ActiveSubTab === 2 ? "ActiveTab" : ""}>{t("171")}</SubTab>
                                    {/* <SubTab className={ActiveSubTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(2) }}>{t("171")}</SubTab> */}
                                </SubTabContainer>
                            </TabLeftItem>
                            <TabRightItem>{t("172")}</TabRightItem>
                        </TabItems>
                        <AcceptAddressContent>
                            <AcceptSubTitle>{t("173")}</AcceptSubTitle>
                            <AcceptAddressBox>
                                <TextArea showCount maxLength={500} autoSize={{ minRows: 4}} value={AddressArr} onChange={onChangeArrList} />
                            </AcceptAddressBox>
                        </AcceptAddressContent>
                    </AcceptAddressItems>
                </ItemsBox>

                {Number(CoinType) === 1 && <ItemBtn  onClick={() => { transferFun() }}>{t("182")}</ItemBtn>}
                {Number(CoinType) === 2 && (Number(ApproveValue) >= Number(Number(AddressList?.length) * Number(Amount)) ? <ItemBtn onClick={() => { transferFun() }}>{t("182")}</ItemBtn> : <ItemBtn onClick={() => { ApproveFun() }}>{t("Approve")}</ItemBtn>)}

            </BottomContainer>

        </TabContainer>
    )
}

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
import { Slider, Modal, Switch } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ChainIcon from '../../assets/image/Tools/ChainIcon.svg'
import BTC from '../../assets/image/Market/BTC.svg'
import BNB from '../../assets/image/Market/BNB.svg'
import USDT from '../../assets/image/Market/USDT.svg'
import downIcon from '../../assets/image/Tools/downIcon.svg'
import WIFIIcon from '../../assets/image/Tools/WIFIIcon.svg'
import InfoIcon from '../../assets/image/Tools/InfoIcon.svg'

import { url } from 'inspector'
import i18n from '../../lang/i18n'
import MessageBox from '../MessageBox/MessageBox'

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
align-items: center;
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
`
const InfoRight = styled.div`
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
text-align: left;
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
`
const ItemsTitle = styled.div`
width: 100%;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
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
const ContractItems = styled(FlexSBCBox)`
padding: 13px 18px;

border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const SplitItems = styled(FlexSBCBox)`
padding:  0px;
width: 100%;
>div{
    width: 100%;
    >.ant-slider-rail, .ant-slider-track{
height: 10px;
border-radius: 8px;
    }
    >.ant-slider-handle{
        height: 20px;
        width: 20px;
    }
}
`


const SplitTip = styled(FlexBox)`
margin-top: 15px;
width: 100%;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
>img{
    margin-right: 12px;
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
const WifiItemLeft = styled.div`
    align-items: center;
    justify-content: flex-start;
    color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
white-space: nowrap;
>img{
    margin-right: 12px;
}
>div{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
}
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
background:linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%);

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`



const SubTabContainer = styled(FlexBox)`
max-width: 160px;
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
line-height: 150%; /* 18px */
}

`
const SubTab = styled(FlexCCBox)`
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
line-height: 150%; /* 18px */
border: 1px solid transparent;
background: transparent;
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
`

const SwitchBtn = styled(FlexCCBox)`
width: fit-content;
padding: 6px 12px;
color: #FFF;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 185.714% */
min-height: 40px;
letter-spacing: 0.112px;
border-radius: 10px;
background: linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%);
box-shadow: 0px 10px 20px 0px rgba(66, 99, 235, 0.20);
`

const CoinContainer = styled.div`
margin-top: 27px;
width: 100%;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding: 24px 17px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const CoinBalanceItems = styled(FlexSBCBox)`
margin-bottom: 16px;

`
const BuyCoinContainer = styled.div`
margin-top: 27px;
width: 100%;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding: 10px 20px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
@media (max-width:768px) {
 padding: 6px 12px;   
}
`
const CoinBalanceItem = styled(FlexBox)`
flex-direction: column;
align-items: center;
width: 47%;
color: #15141F;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
`
const CoinKindItems = styled(FlexSBCBox)`
margin-top: 22px;
`
const CoinKindItem = styled(FlexBox)`
flex-direction: column;
align-items:stretch;
width: 47%;
color: #15141F;
text-align: left;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
>div{
    min-height: 62px;
}
>.CoinKindSubTitle{
    min-height: auto;
}
`
const CoinKindPriceItem = styled(FlexBox)`
flex-direction: column;
align-items:stretch;
width: 47%;

>div{
    min-height: 62px;
}
`
const CoinKindSubTitle = styled.span`
width: 100%;
display: flex;
align-content: center;
justify-content: space-between;
min-height: auto;
color: #15141F;
text-align: left;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 19.6px */
>div{
    display: flex;
    align-items: center;
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 14px */
}

`
const BalanceValue = styled(FlexCCBox)`
width: 100%;
margin-top: 11px;
padding: 16px 0px;
color: #15141F;
text-align: center;
font-family: Source Han Sans CN;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 33.6px */
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);

`
const CoinTipCOntainer = styled.div`
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
margin-top: 16px;
`

const BtnContainer = styled(FlexBox)`
flex-direction: column;
align-items: center;
width: 47%;
`

const SelectCoinBox = styled(FlexSBCBox)`
  width: 100%;
  padding: 5px 12px;  
margin-top: 11px;
color: #15141F;
text-align: center;
font-family: Source Han Sans CN;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 33.6px */
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);
`
const PoolBox = styled(FlexBox)`
flex-direction: column;
align-items: center;
justify-content: center;
  width: 100%;
  padding: 5px 12px; 
margin-top: 11px;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 16.8px */
text-align: left;
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);
>div{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 14px */
}
`
const PriceBox = styled(FlexBox)`
flex-direction: column;
align-items: start;
justify-content: center;
  width: 100%;
  padding: 5px 12px; 
margin-top: 11px;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
text-align: left;
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);
>div{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 14px */
}
`

const SelectLeftBox = styled(FlexBox)`
align-items: center;
width: 100%;
justify-content: start;
>img{
    margin-right: 12px;
}
`

const CoinType = styled.div`
color: #10192D;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */
>div{
    text-align: left;
}
`

const SubTabContentContainer = styled.div`
width: 100%;
`
const ItemItemDetail = styled(FlexSBCBox)`
width:100%;
margin-top: 26px;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
>input{
    width: 50%;
    color: #FFF;
text-align: center;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 14px; /* 116.667% */
letter-spacing: 0.096px;
border: none;
padding: 10px;
    border-radius: 10px;
background: #7681AA;
box-shadow: 0px 10px 20px 0px rgba(66, 99, 235, 0.20);
}

`
const InputTradeFee = styled.div`
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
margin-top: 26px;
`
const InputBox = styled.div`
    border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
padding: 18px;
margin-top: 18px;
`



export default function Rank() {
    const { t, i18n } = useTranslation()
    const { account } = useWeb3React()
    const state = useSelector<stateType, stateType>(state => state)
    const [HomePrice, setHomePrice] = useState<any>([])
    const [ActiveSubTab, setActiveSubTab] = useState<any>(1)

    const onChangeSwitch = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const onChange = (value: number | [number, number]) => {
        console.log('onChange: ', value);
    };

    const onAfterChange = (value: number | [number, number]) => {
        console.log('onAfterChange: ', value);
    };


    useEffect(() => {
        if (account && state.token) {
            getHomePrice().then((res: any) => {
                if (res?.code === 200) {
                    console.log("getHomePrice", res?.data)
                    setHomePrice(res?.data)
                }
            })

        }
    }, [account, state.token])


    return (
        <TabContainer>
            <TabTitle>{t("174")}</TabTitle>

            <BottomContainer>

                <ItemsBox>
                    {/* <ItemsTitle>选择公链</ItemsTitle> */}
                    <Items>
                        <WifiItemLeft>
                            <img src={WIFIIcon} alt="" />{t("175",{num:114})}
                            <div>https://www.modao.cc</div>
                        </WifiItemLeft>
                        <ItemRight>
                            <SwitchBtn>{t("176")}</SwitchBtn>
                        </ItemRight>
                    </Items>
                </ItemsBox>

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
                    <ItemsTitle>{t("177")}</ItemsTitle>
                    <Items>
                        <ItemLeft>
                            <InfoLeft active={true}><img src={BTC} alt="" /></InfoLeft>{t("147")}
                        </ItemLeft>
                        <ItemRight><img src={downIcon} alt="" /></ItemRight>
                    </Items>
                </ItemsBox>


                <ItemsBox>
                    <ItemsTitleContainer>

                        <ItemsTitle>{t("150")}</ItemsTitle>
                        <ItemsRightTitle>
                        {t("151")}<Switch defaultChecked onChange={onChangeSwitch} />
                        </ItemsRightTitle>
                    </ItemsTitleContainer>
                    <Items>
                        <ItemLeft>
                            <ItemLeftContent>{t("168")}</ItemLeftContent>
                        </ItemLeft>
                        {/* <ItemRight><img src={downIcon} alt="" /></ItemRight> */}
                    </Items>
                </ItemsBox>


                <CoinContainer>
                    <CoinBalanceItems>
                        <CoinBalanceItem>
                        {t("178")}
                            <BalanceValue>1255.0</BalanceValue>
                        </CoinBalanceItem>
                        <CoinBalanceItem>
                        {t("179")}
                            <BalanceValue>--</BalanceValue>
                        </CoinBalanceItem>
                    </CoinBalanceItems>
                    <BtnContainer>
                        <SwitchBtn>{t("180")}</SwitchBtn>
                    </BtnContainer>
                    <CoinTipCOntainer>
                    {t("181")} <br /> {t("183")}
                    </CoinTipCOntainer>

                </CoinContainer>

                <BuyCoinContainer>
                    <SubTabContainer>
                        <SubTab className={ActiveSubTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(1) }}>{t("185")}</SubTab>
                        <SubTab className={ActiveSubTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(2) }}>{t("186")}</SubTab>
                    </SubTabContainer>

                    <SubTabContentContainer>
                        <CoinKindItems>
                            <CoinKindItem>
                            {t("187")}
                                <SelectCoinBox>
                                    <SelectLeftBox>
                                        <img src={BTC} alt="" />
                                        <CoinType>BNB
                                            <div>BNB</div>
                                        </CoinType>
                                    </SelectLeftBox>
                                    <ItemRight><img src={downIcon} alt="" /></ItemRight>
                                </SelectCoinBox>
                            </CoinKindItem>
                            <CoinKindItem>
                            {t("188")}
                                <PoolBox>
                                {t("189")}
                                    <div>(BNB/USDT/BUSD) {t("191")}</div>
                                </PoolBox>
                            </CoinKindItem>
                        </CoinKindItems>
                        <ItemsBox>
                            <ItemsTitleContainer>

                                <ItemsTitle>{t("190")}</ItemsTitle>
                            </ItemsTitleContainer>
                            <ContractItems>
                                <ItemLeft>
                                    <ItemLeftContent>{t("192")}</ItemLeftContent>
                                </ItemLeft>
                                {/* <ItemRight><img src={downIcon} alt="" /></ItemRight> */}
                                <SwitchBtn>{t("Approve")}</SwitchBtn>

                            </ContractItems>
                        </ItemsBox>

                        <CoinKindItems>
                            <CoinKindItem>
                            {t("194")}
                                <PriceBox>
                                {t("195")}（BNB）
                                </PriceBox>
                            </CoinKindItem>
                            <CoinKindItem>
                            {t("196")}
                                <PriceBox>
                                {t("197")}
                                {t("198")}1（BNB）
                                </PriceBox>
                            </CoinKindItem>
                        </CoinKindItems>

                        <CoinKindItems>
                            <CoinKindPriceItem>
                                <CoinKindSubTitle className='CoinKindSubTitle'>{t("199")} <div>{t("200")}</div></CoinKindSubTitle>
                                <PriceBox>
                                {t("195")}(BNB)
                                </PriceBox>
                            </CoinKindPriceItem>
                            <CoinKindItem>
                                {t("201")}
                                <PriceBox>
                                    {t("201")}（USDT）
                                </PriceBox>
                            </CoinKindItem>
                        </CoinKindItems>


                        <ItemsBox>
                            <ItemsTitleContainer>

                                <ItemsTitle>{t("202")}</ItemsTitle>
                            </ItemsTitleContainer>
                            <SplitItems>
                                <Slider defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} />

                            </SplitItems>
                            <SplitTip>
                                <img src={InfoIcon} alt="" />{t("203")}
                            </SplitTip>
                        </ItemsBox>

                        <ItemItemDetail>{t("204")}<Switch defaultChecked onChange={onChangeSwitch} /></ItemItemDetail>
                        <ItemItemDetail>{t("205")}<Switch defaultChecked onChange={onChangeSwitch} /></ItemItemDetail>
                        <ItemItemDetail>{t("206")}<input type="Number" value={3000} /></ItemItemDetail>

                        <InputTradeFee>{t("207")}
                            <InputBox>{t("208")}</InputBox>
                        </InputTradeFee>

                    </SubTabContentContainer>
                </BuyCoinContainer>

                <ItemBtn>{t("209")}</ItemBtn>

            </BottomContainer>

        </TabContainer>
    )
}

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
import { Slider, Modal, Switch } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ChainIcon from '../../assets/image/Tools/ChainIcon.svg'
import BTC from '../../assets/image/Market/BTC.svg'
import BNB from '../../assets/image/Market/BNB.svg'
import USDT from '../../assets/image/Market/USDT.svg'
import downIcon from '../../assets/image/Tools/downIcon.svg'
import WIFIIcon from '../../assets/image/Tools/WIFIIcon.svg'
import InfoIcon from '../../assets/image/Tools/InfoIcon.svg'

import { url } from 'inspector'
import i18n from '../../lang/i18n'
import MessageBox from '../MessageBox/MessageBox'

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
align-items: center;
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
`
const InfoRight = styled.div`
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
text-align: left;
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
`
const ItemsTitle = styled.div`
width: 100%;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
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
const ContractItems = styled(FlexSBCBox)`
padding: 13px 18px;

border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const SplitItems = styled(FlexSBCBox)`
padding:  0px;
width: 100%;
>div{
    width: 100%;
    >.ant-slider-rail, .ant-slider-track{
height: 10px;
border-radius: 8px;
    }
    >.ant-slider-handle{
        height: 20px;
        width: 20px;
    }
}
`


const SplitTip = styled(FlexBox)`
margin-top: 15px;
width: 100%;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
>img{
    margin-right: 12px;
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
const WifiItemLeft = styled.div`
    align-items: center;
    justify-content: flex-start;
    color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
white-space: nowrap;
>img{
    margin-right: 12px;
}
>div{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
}
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
background:linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%);

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`



const SubTabContainer = styled(FlexBox)`
max-width: 160px;
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
line-height: 150%; /* 18px */
}

`
const SubTab = styled(FlexCCBox)`
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
line-height: 150%; /* 18px */
border: 1px solid transparent;
background: transparent;
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
`

const SwitchBtn = styled(FlexCCBox)`
width: fit-content;
padding: 6px 12px;
color: #FFF;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 185.714% */
min-height: 40px;
letter-spacing: 0.112px;
border-radius: 10px;
background: linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%);
box-shadow: 0px 10px 20px 0px rgba(66, 99, 235, 0.20);
`

const CoinContainer = styled.div`
margin-top: 27px;
width: 100%;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding: 24px 17px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const CoinBalanceItems = styled(FlexSBCBox)`
margin-bottom: 16px;

`
const BuyCoinContainer = styled.div`
margin-top: 27px;
width: 100%;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding: 10px 20px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
@media (max-width:768px) {
 padding: 6px 12px;   
}
`
const CoinBalanceItem = styled(FlexBox)`
flex-direction: column;
align-items: center;
width: 47%;
color: #15141F;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
`
const CoinKindItems = styled(FlexSBCBox)`
margin-top: 22px;
`
const CoinKindItem = styled(FlexBox)`
flex-direction: column;
align-items:stretch;
width: 47%;
color: #15141F;
text-align: left;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
>div{
    min-height: 62px;
}
>.CoinKindSubTitle{
    min-height: auto;
}
`
const CoinKindPriceItem = styled(FlexBox)`
flex-direction: column;
align-items:stretch;
width: 47%;

>div{
    min-height: 62px;
}
`
const CoinKindSubTitle = styled.span`
width: 100%;
display: flex;
align-content: center;
justify-content: space-between;
min-height: auto;
color: #15141F;
text-align: left;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 19.6px */
>div{
    display: flex;
    align-items: center;
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 14px */
}

`
const BalanceValue = styled(FlexCCBox)`
width: 100%;
margin-top: 11px;
padding: 16px 0px;
color: #15141F;
text-align: center;
font-family: Source Han Sans CN;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 33.6px */
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);

`
const CoinTipCOntainer = styled.div`
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
margin-top: 16px;
`

const BtnContainer = styled(FlexBox)`
flex-direction: column;
align-items: center;
width: 47%;
`

const SelectCoinBox = styled(FlexSBCBox)`
  width: 100%;
  padding: 5px 12px;  
margin-top: 11px;
color: #15141F;
text-align: center;
font-family: Source Han Sans CN;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 33.6px */
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);
`
const PoolBox = styled(FlexBox)`
flex-direction: column;
align-items: center;
justify-content: center;
  width: 100%;
  padding: 5px 12px; 
margin-top: 11px;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 16.8px */
text-align: left;
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);
>div{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 14px */
}
`
const PriceBox = styled(FlexBox)`
flex-direction: column;
align-items: start;
justify-content: center;
  width: 100%;
  padding: 5px 12px; 
margin-top: 11px;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
text-align: left;
border-radius: 10px;
border: 0.5px solid #6CB6FF;
background: rgba(255, 255, 255, 0.09);
>div{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 14px */
}
`

const SelectLeftBox = styled(FlexBox)`
align-items: center;
width: 100%;
justify-content: start;
>img{
    margin-right: 12px;
}
`

const CoinType = styled.div`
color: #10192D;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */
>div{
    text-align: left;
}
`

const SubTabContentContainer = styled.div`
width: 100%;
`
const ItemItemDetail = styled(FlexSBCBox)`
width:100%;
margin-top: 26px;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
>input{
    width: 50%;
    color: #FFF;
text-align: center;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 14px; /* 116.667% */
letter-spacing: 0.096px;
border: none;
padding: 10px;
    border-radius: 10px;
background: #7681AA;
box-shadow: 0px 10px 20px 0px rgba(66, 99, 235, 0.20);
}

`
const InputTradeFee = styled.div`
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
margin-top: 26px;
`
const InputBox = styled.div`
    border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
padding: 18px;
margin-top: 18px;
`



export default function Rank() {
    const { t, i18n } = useTranslation()
    const { account } = useWeb3React()
    const state = useSelector<stateType, stateType>(state => state)
    const [HomePrice, setHomePrice] = useState<any>([])
    const [ActiveSubTab, setActiveSubTab] = useState<any>(1)

    const onChangeSwitch = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const onChange = (value: number | [number, number]) => {
        console.log('onChange: ', value);
    };

    const onAfterChange = (value: number | [number, number]) => {
        console.log('onAfterChange: ', value);
    };


    useEffect(() => {
        if (account && state.token) {
            getHomePrice().then((res: any) => {
                if (res?.code === 200) {
                    console.log("getHomePrice", res?.data)
                    setHomePrice(res?.data)
                }
            })

        }
    }, [account, state.token])


    return (
        <TabContainer>
            <TabTitle>{t("174")}</TabTitle>

            <BottomContainer>

                <ItemsBox>
                    {/* <ItemsTitle>选择公链</ItemsTitle> */}
                    <Items>
                        <WifiItemLeft>
                            <img src={WIFIIcon} alt="" />{t("175",{num:114})}
                            <div>https://www.modao.cc</div>
                        </WifiItemLeft>
                        <ItemRight>
                            <SwitchBtn>{t("176")}</SwitchBtn>
                        </ItemRight>
                    </Items>
                </ItemsBox>

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
                    <ItemsTitle>{t("177")}</ItemsTitle>
                    <Items>
                        <ItemLeft>
                            <InfoLeft active={true}><img src={BTC} alt="" /></InfoLeft>{t("147")}
                        </ItemLeft>
                        <ItemRight><img src={downIcon} alt="" /></ItemRight>
                    </Items>
                </ItemsBox>


                <ItemsBox>
                    <ItemsTitleContainer>

                        <ItemsTitle>{t("150")}</ItemsTitle>
                        <ItemsRightTitle>
                        {t("151")}<Switch defaultChecked onChange={onChangeSwitch} />
                        </ItemsRightTitle>
                    </ItemsTitleContainer>
                    <Items>
                        <ItemLeft>
                            <ItemLeftContent>{t("168")}</ItemLeftContent>
                        </ItemLeft>
                        {/* <ItemRight><img src={downIcon} alt="" /></ItemRight> */}
                    </Items>
                </ItemsBox>


                <CoinContainer>
                    <CoinBalanceItems>
                        <CoinBalanceItem>
                        {t("178")}
                            <BalanceValue>1255.0</BalanceValue>
                        </CoinBalanceItem>
                        <CoinBalanceItem>
                        {t("179")}
                            <BalanceValue>--</BalanceValue>
                        </CoinBalanceItem>
                    </CoinBalanceItems>
                    <BtnContainer>
                        <SwitchBtn>{t("180")}</SwitchBtn>
                    </BtnContainer>
                    <CoinTipCOntainer>
                    {t("181")} <br /> {t("183")}
                    </CoinTipCOntainer>

                </CoinContainer>

                <BuyCoinContainer>
                    <SubTabContainer>
                        <SubTab className={ActiveSubTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(1) }}>{t("185")}</SubTab>
                        <SubTab className={ActiveSubTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(2) }}>{t("186")}</SubTab>
                    </SubTabContainer>

                    <SubTabContentContainer>
                        <CoinKindItems>
                            <CoinKindItem>
                            {t("187")}
                                <SelectCoinBox>
                                    <SelectLeftBox>
                                        <img src={BTC} alt="" />
                                        <CoinType>BNB
                                            <div>BNB</div>
                                        </CoinType>
                                    </SelectLeftBox>
                                    <ItemRight><img src={downIcon} alt="" /></ItemRight>
                                </SelectCoinBox>
                            </CoinKindItem>
                            <CoinKindItem>
                            {t("188")}
                                <PoolBox>
                                {t("189")}
                                    <div>(BNB/USDT/BUSD) {t("191")}</div>
                                </PoolBox>
                            </CoinKindItem>
                        </CoinKindItems>
                        <ItemsBox>
                            <ItemsTitleContainer>

                                <ItemsTitle>{t("190")}</ItemsTitle>
                            </ItemsTitleContainer>
                            <ContractItems>
                                <ItemLeft>
                                    <ItemLeftContent>{t("192")}</ItemLeftContent>
                                </ItemLeft>
                                {/* <ItemRight><img src={downIcon} alt="" /></ItemRight> */}
                                <SwitchBtn>{t("Approve")}</SwitchBtn>

                            </ContractItems>
                        </ItemsBox>

                        <CoinKindItems>
                            <CoinKindItem>
                            {t("194")}
                                <PriceBox>
                                {t("195")}（BNB）
                                </PriceBox>
                            </CoinKindItem>
                            <CoinKindItem>
                            {t("196")}
                                <PriceBox>
                                {t("197")}
                                {t("198")}1（BNB）
                                </PriceBox>
                            </CoinKindItem>
                        </CoinKindItems>

                        <CoinKindItems>
                            <CoinKindPriceItem>
                                <CoinKindSubTitle className='CoinKindSubTitle'>{t("199")} <div>{t("200")}</div></CoinKindSubTitle>
                                <PriceBox>
                                {t("195")}(BNB)
                                </PriceBox>
                            </CoinKindPriceItem>
                            <CoinKindItem>
                                {t("201")}
                                <PriceBox>
                                    {t("201")}（USDT）
                                </PriceBox>
                            </CoinKindItem>
                        </CoinKindItems>


                        <ItemsBox>
                            <ItemsTitleContainer>

                                <ItemsTitle>{t("202")}</ItemsTitle>
                            </ItemsTitleContainer>
                            <SplitItems>
                                <Slider defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} />

                            </SplitItems>
                            <SplitTip>
                                <img src={InfoIcon} alt="" />{t("203")}
                            </SplitTip>
                        </ItemsBox>

                        <ItemItemDetail>{t("204")}<Switch defaultChecked onChange={onChangeSwitch} /></ItemItemDetail>
                        <ItemItemDetail>{t("205")}<Switch defaultChecked onChange={onChangeSwitch} /></ItemItemDetail>
                        <ItemItemDetail>{t("206")}<input type="Number" value={3000} /></ItemItemDetail>

                        <InputTradeFee>{t("207")}
                            <InputBox>{t("208")}</InputBox>
                        </InputTradeFee>

                    </SubTabContentContainer>
                </BuyCoinContainer>

                <ItemBtn>{t("209")}</ItemBtn>

            </BottomContainer>

        </TabContainer>
    )
}

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
import downIcon from '../../assets/image/Tools/downIcon.svg'
import SpeedyIcon from '../../assets/image/Tools/SpeedyIcon.svg'
import Slowly from '../../assets/image/Tools/Slowly.svg'
import NormalIcon from '../../assets/image/Tools/NormalIcon.svg'
import WalletCardIcon from '../../assets/image/Tools/WalletCardIcon.png'

import { url } from 'inspector'
import i18n from '../../lang/i18n'

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


const SubTitle = styled.div`
   color: #7681AA !important;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
max-width: 186px;
padding-left: 13px;
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
/* margin-top: 10px; */
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
const SpeedyItems = styled.div`
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
const ItemTop = styled(FlexSBCBox)`
width: 100%;
`
const ItemBottom = styled(FlexSBCBox)`
width: 100%;
>div{
    color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
}
`

const ItemTopLeft = styled.div`
color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */
>img{
    margin-right: 5px;
}
`
const ItemTopRight = styled.div`
color: #4263EB;
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */`

const ItemRight = styled(FlexBox)`
    align-items: center;
    justify-content: flex-end;
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
            <TabTitle>{t("270")} 
            </TabTitle>

            <BottomContainer>

                <ItemsBox>
                    <ItemsTitle>{t("141")} </ItemsTitle>
                    <Items>
                        <ItemLeft>
                            <InfoLeft active={true}><img src={ChainIcon} alt="" /></InfoLeft>{t("147")} 
                        </ItemLeft>
                        <ItemRight><img src={downIcon} alt="" /></ItemRight>
                    </Items>
                </ItemsBox>

                <ItemsBox>
                    <SpeedyItems>
                        <ItemTop>
                            <ItemTopLeft><img src={SpeedyIcon} alt="" />speedy</ItemTopLeft>
                            <ItemTopRight>0</ItemTopRight>
                        </ItemTop>
                        <ItemBottom>
                            <div>15 seconds</div>
                            <div>￥0 / $0</div>
                        </ItemBottom>
                    </SpeedyItems>
                </ItemsBox>
                <ItemsBox>
                    <SpeedyItems>
                        <ItemTop>
                            <ItemTopLeft><img src={NormalIcon} alt="" />speedy</ItemTopLeft>
                            <ItemTopRight>0</ItemTopRight>
                        </ItemTop>
                        <ItemBottom>
                            <div>15 seconds</div>
                            <div>￥0 / $0</div>
                        </ItemBottom>
                    </SpeedyItems>
                </ItemsBox>
                <ItemsBox>
                    <SpeedyItems>
                        <ItemTop>
                            <ItemTopLeft><img src={Slowly} alt="" />speedy</ItemTopLeft>
                            <ItemTopRight>0</ItemTopRight>
                        </ItemTop>
                        <ItemBottom>
                            <div>15 seconds</div>
                            <div>￥0 / $0</div>
                        </ItemBottom>
                    </SpeedyItems>
                </ItemsBox>

            </BottomContainer>

        </TabContainer>
    )
}

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
import { Carousel, Modal, Switch } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ChainIcon from '../../assets/image/Tools/ChainIcon.svg'
import downIcon from '../../assets/image/Tools/downIcon.svg'
import WordIcon from '../../assets/image/Tools/WordIcon.svg'

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
height: calc(100% - 30px);
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
flex: 1;
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
const AcceptItems = styled(FlexBox)`
width: 100%;
align-items: center;
justify-content: space-around;
background: #FFF;
padding: 13px 20px;
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
`
const AcceptWordItems = styled(FlexBox)`
width: 100%;
height: 228px;
flex-direction: column;
align-items: center;
justify-content: center;
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
>div{
  color: #7681AA;
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
margin-top: 8px;
}
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
>span{
    display: flex;
    align-items: center;
    width: 100%;
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 19.6px */
min-height: 32px;
word-break: break-all;
flex-wrap: wrap; 
white-space: wrap;

}
`
const SwitchItemLeft = styled(FlexBox)`
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
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
min-height: 32px;
word-break: break-all;
flex-wrap: wrap;
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
align-items: center;
justify-content: flex-end;
width: 100%;
    /* align-items: start; */
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

export default function Rank() {
    const { t, i18n } = useTranslation()
    const { account } = useWeb3React()
    const state = useSelector<stateType, stateType>(state => state)
    const [HomePrice, setHomePrice] = useState<any>([])

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
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
            <TabTitle>{t("140")}</TabTitle>
            <InfoBox>
                <InfoItemsBox>
                    <InfoItems>
                        <LeftBg></LeftBg>
                        <InfoItem>
                            <InfoLeft active={false}><img src={ChainIcon} alt="" /></InfoLeft>
                            <InfoRight>
                            {t("141")}
                                <div>{t("142")}</div>
                            </InfoRight>
                        </InfoItem>
                        <InfoItem>
                            <InfoLeft active={false}><img src={ChainIcon} alt="" /></InfoLeft>
                            <InfoRight>
                            {t("143")}
                                <div>{t("144")}</div>
                            </InfoRight>
                        </InfoItem>
                        <InfoItem>
                            <InfoLeft active={false}><img src={ChainIcon} alt="" /></InfoLeft>
                            <InfoRight>
                            {t("145")}
                                <div>{t("146")}</div>
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
                    <Items>
                        <ItemLeft>
                        <span>{t("149")}</span>
                            {/* <ItemLeftContent>{t("149")}</ItemLeftContent> */}
                        </ItemLeft>
                        <ItemRight><img src={downIcon} alt="" /></ItemRight>
                    </Items>
                </ItemsBox>

                <ItemsBox>
                    <ItemsTitleContainer>

                        <ItemsTitle>{t("150")}</ItemsTitle>
                        <ItemsRightTitle>
                        {t("151")}<Switch defaultChecked onChange={onChange} />
                        </ItemsRightTitle>
                    </ItemsTitleContainer>
                    <Items>
                        <ItemLeft>
                            <ItemLeftContent>{t("152")}</ItemLeftContent>
                        </ItemLeft>
                        {/* <ItemRight><img src={downIcon} alt="" /></ItemRight> */}
                    </Items>
                </ItemsBox>

                <ItemsBox>
                    <ItemsTitle>{t("153")}</ItemsTitle>
                    <Items>
                        <ItemLeft>
                            <ItemLeftContent>{t("152")}</ItemLeftContent>
                        </ItemLeft>
                        {/* <ItemRight><img src={downIcon} alt="" /></ItemRight> */}
                    </Items>
                </ItemsBox>
                <ItemsBox>
                    <ItemsTitle>{t("154")}</ItemsTitle>
                    <AcceptItems>
                        <SwitchItemLeft>
                            <ItemLeftContent>
                                <ItemsRightTitle>
                                {t("155")}<Switch defaultChecked onChange={onChange} />
                                </ItemsRightTitle></ItemLeftContent>
                        </SwitchItemLeft>
                        <ItemRight>
                            <ItemsRightTitle>
                            {t("156")}<Switch defaultChecked onChange={onChange} />
                            </ItemsRightTitle></ItemRight>
                    </AcceptItems>
                </ItemsBox>

                <ItemsBox>
                    <ItemsTitle>{t("157")}</ItemsTitle>
                    <AcceptWordItems>
                        <img src={WordIcon} alt="" />
                        {t("158")}
                        <div>{t("159")}</div>
                    </AcceptWordItems>
                </ItemsBox>

                <ItemBtn>{t("160")}</ItemBtn>

            </BottomContainer>

        </TabContainer>
    )
}

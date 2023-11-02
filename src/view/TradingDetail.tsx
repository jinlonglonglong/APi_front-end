import React, { useState, useEffect } from 'react'
import { getHomePrice } from '../API/index'
import '../assets/style/Home.scss'
import NoData from '../components/NoData'
import Table from '../components/Table'
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { stateType } from '../store/reducer';
import styled, { keyframes } from 'styled-components';
import { useViewport } from '../components/viewportContext';
import { AddrHandle, EthertoWei, NumSplic1, ToString, addMessage, dateFormat, goTime, showLoding } from '../utils/tool';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ContainerBox, FlexBox, FlexCCBox, FlexECBox, FlexSBCBox, FlexSCBox } from '../components/FlexBox'
import { Carousel, Modal } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import SubPageLoding from '../components/SubPageLoding';
import Web3 from 'web3'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs'
import HomeBgImg from '../assets/image/Home/HomeBgImg.png'
import ImgItem1 from '../assets/image/Home/ImgItem1.png'
import toolItem1 from '../assets/image/Home/toolItem1.svg'
import toolItem2 from '../assets/image/Home/toolItem2.svg'
import toolItem3 from '../assets/image/Home/toolItem3.svg'
import toolItem4 from '../assets/image/Home/toolItem4.svg'
import TradeManageBanner from '../assets/image/TradeManage/TradeManageBanner.png'
import TradeManageLeftBanner from '../assets/image/TradeManage/TradeManageLeftBanner.png'
import StepImg1 from '../assets/image/TradeManage/StepImg.svg'
import Icon01 from '../assets/image/TradeManage/01.svg'
import Icon02 from '../assets/image/TradeManage/02.svg'
import Icon03 from '../assets/image/TradeManage/03.svg'
import AvtorIcon1 from '../assets/image/TradeManage/AvtorIcon1.svg'
import SettingIcon from '../assets/image/TradeManage/SettingIcon.svg'
import AvtorIcon2 from '../assets/image/TradeManage/AvtorIcon2.svg'
import CloseIcon from '../assets/image/closeIcon.svg'
import JoinInTradeBg from '../assets/image/Home/JoinInTradeBg.png'
import infoIcon from '../assets/image/infoIcon.svg'
import pageBg1 from '../assets/image/TradingDetail/pageBg1.png'
import asideBg1 from '../assets/image/TradingDetail/asideBg1.png'
import asideBg2 from '../assets/image/TradingDetail/asideBg2.png'
import ruleImg1 from '../assets/image/TradingDetail/ruleImg.png'
import UionLogo from '../assets/image/TradingDetail/UionLogo.svg'
import rewardIcon from '../assets/image/TradingDetail/rewardIcon.png'
import teamIcon from '../assets/image/TradingDetail/teamIcon.png'
import myreferIcon from '../assets/image/TradingDetail/myreferIcon.png'
import endTagBg from '../assets/image/TradingDetail/endTagBg.png'
import pageBg2 from '../assets/image/pageBg2.png'
import pageBg3 from '../assets/image/pageBg3.png'
import pageBg4 from '../assets/image/pageBg4.png'
import pageBg5 from '../assets/image/pageBg5.png'
import ReturnImg1 from '../assets/image/returnIcon.svg'
import copyIcon from '../assets/image/copyIcon.svg'
import BigNumber from 'big.js'
import { url } from 'inspector'
import i18n from '../lang/i18n'
import MessageBox from '../components/MessageBox/MessageBox'
import { Contracts } from '../web3'
import { contractAddress } from '../config'
import useTime from '../hooks/useTime'
const HomeContainerBox = styled(ContainerBox)`
padding: 0px;
position: relative;
width: 100%;
color: #fff;
`



const BgBox1 = styled(FlexBox)`
position: absolute;
width: 194px;
height: 194px;
right: -100px;
top: 0px;
background: #6AB7FF;
filter: blur(97px);
height: 123px;
z-index: -999;


`
const BgBox2 = styled(FlexBox)`
position: absolute;
width: 194px;
height: 194px;
right: -40px;
top: -126px;
background: #93EEFF;
filter: blur(82px);
z-index: -999;

`
const BgBox3 = styled(FlexBox)`
position: absolute;
width: 194px;
height: 194px;
left: 0px;
top: 354px;
background: #BBF3FF;
filter: blur(97px);
z-index: -999;

`
const BgBox4 = styled(FlexBox)`
position: absolute;
width: 182px;
height: 182px;
left: -67px;
top: 529px;
background: #93EEFF;
filter: blur(97px);
z-index: -999;

`

const BgImg1 = styled.img`
  position: absolute;
  width: 199px;
height: 204px;
top: -157px;
left: -39px;
z-index: -999;
`
const BgImg2 = styled.img`
  position: absolute;
  width: 268px;
height: 275px;
top: 172px;
right: 0px;
transform: translateX(50%);
z-index: -999;
`
const BgImg3 = styled.img`
  position: absolute;
  width: 209px;
height: 214px;
top: 643px;
left: -90px;
z-index: -999;
`
const BgImg4 = styled.img`
  position: absolute;
  width: 115px;
height: 115px;
top: 611px;
right: -14px;
z-index: -999;
`
const BgImg5 = styled.img`
  position: absolute;
  width: 113px;
height: 113px;
top: 1024px;
left: -24px;
z-index: -999;
`
const BannerContainer = styled.div`
width: 100%;
`
const ReturnContainer = styled(FlexCCBox)`
height: 48px;

position: relative;
width: 100%;
color: #2D2D2D;
text-align: center;
font-family: Source Han Sans CN;
font-size: 18px;
font-style: normal;
font-weight: 900;
line-height: 26px; /* 144.444% */
letter-spacing: 0.144px;
`
const ReturnImg = styled.img`
width: 48px;
height: 48px;
position: absolute;
top: 0;
left:24px;
@media (max-width:375px) {
left: 16px;
  width: 32px;
  height: 32px;
}
`




const HomeContent = styled.div`
width: 100%;
padding-bottom: 83px;
padding: 0px 25px; 
@media (max-width:375px) {
  padding: 0px 16px; 

  
}
`


const TabContainer = styled(FlexBox)`
margin-top: 22px;
justify-content: flex-start;
.ActiveTab{
  border-radius: 20px;
background: linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%);
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
color: #FFF;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 22px; /* 157.143% */
letter-spacing: 0.112px;
}
>div{
  margin-right: 12px;
}
`
const Tab = styled(FlexCCBox)`
display: flex;
padding: 8px 16px;
justify-content: center;
align-items: center;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px; /* 157.143% */
letter-spacing: 0.112px;
border-radius: 20px;
border: 1px solid #21D7FF;
background: #FFF;

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`

const BuyContainer = styled.div`
  width: 100%;
`



const UionContainer = styled.div`
position: relative;
width: 100%;
margin-top: 23px;
border-radius: 10px;
background: #FFF;
padding: 18px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const UionTitleBox = styled(FlexBox)`
align-items: center;
margin-right: 10px;
color: #000;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
margin-top: 12px;
`
const UionTimeOut = styled(FlexCCBox) <{ src: string }>`
position: absolute;
right: -5px;
top: 12px;
height: 34px;
width: fit-content;
padding: 4px 10px 10px;
color: #FFF;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
background-image:${({ src }) => `url(${src})`};
/* background-position: center; */
background-size: 100% 100%; //根据你图片的大小自定义
background-repeat: no-repeat;
@media (max-width:375px) {
  top: 2px;

  
}

`

const SubTabContainer = styled(FlexBox)`
align-items: center;
width: 100%;
border-radius: 10px;
border: 1px solid rgba(66, 99, 235, 0.10);
background: var(--main-greyscale-5, #F8FAFC);
padding:  3.919px;
flex-shrink: 0;
margin-top: 20px;
min-height: 40px;

.ActiveTab{
  height: 100%;
  border-radius: 10px;
border: 1px solid #CED7FD;
background: var(--others-white, #FFF);
box-shadow: 0px 7.09203px 7.09203px 0px rgba(66, 99, 235, 0.09);
color: var(--main-primary-100, #2873FF);
text-align: center;
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 21px */
min-height: 40px;
height: 100%;
@media (max-width:375px) {
line-height: normal;
line-height: 100%; /* 21px */
  
}
}

`
const SubTab = styled(FlexCCBox)`
flex: 1;
display: flex;
padding: 7.84px;
justify-content: center;
align-items: center;
color: var(--main-greyscale-40, #8E9BAE);
text-align: center;
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 21px */
border: 1px solid transparent;
background: transparent;
min-height: 40px;
@media (max-width:375px) {
line-height: normal;
line-height: 100%; /* 21px */
  
}
@media (max-width:375px) {
  line-height: 100%;

  
}
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
`

const PriceContainer = styled(FlexSBCBox)`
width: 100%;
border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.49);
background: #FFF;
margin-top: 10px;
padding: 5px 8px 5px 20px;
@media (max-width:375px) {
  padding: 5px 8px 5px 12px;

  
}

`
const PriceLeft = styled.div`
color: #23262F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
>input{
  width: 100%;
  border: none;
  color: #23262F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
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
const PriceBottom = styled.div`
color: #A4A6AA;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 400;
min-height: 20px;
`
const PriceRight = styled(FlexBox)`
justify-content: flex-end;
align-items: center;
`
const BtnManageBox = styled(FlexBox)`
flex-direction: column;
justify-content: space-between;
align-items: center;
margin-right: 12px;
>div{
  &:last-child{
  margin-top: 5px;
}}
`


const ManageBtn = styled(FlexCCBox)`
width: 100%;
max-width: 20px;
color: #FCFCFD;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
border-radius: 5px;
background: var(--002, linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%));
padding: 2px 12px;
`
const MaxBtn = styled(FlexCCBox)`
white-space: nowrap;
color: #FCFCFD;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
border-radius: 14px;
background: var(--002, linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%));
padding: 5px 16px;
@media (max-width:375px) {
padding: 5px 8px;
  
}
`
const TagContainer = styled.div`
  margin-top: 19px;
  width: 100%;
`
const Tag = styled(FlexBox)`
  align-items: center;

margin-bottom: 14px;
>div{
  min-width: 92px;
  color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */
}
>span{
  color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */
}
`

const RewardContainer = styled(FlexSBCBox)`
width: 100%;
border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.49);
background: #FFF;
margin-top: 10px;
padding:15px 16px;

`
const RewardLeft = styled(FlexBox)`
justify-content: flex-start;
align-items: center;
color: #23262F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
`
const Radio = styled.div`
background: #4263EB;
width: 6px;
height: 6px;
border-radius:50%;
margin-right: 15px;
`
const RewardRight = styled(FlexBox)`
justify-content: flex-end;
align-items: center;
color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */
`
const RedioRight = styled.div`
background: #FFF;
border: 2px solid #4263EB;
width: 16px;
height: 16px;
border-radius:50%;
margin-right: 10px;

`

const RadioContainer = styled.div`
  margin-top: 19px;
  width: 100%;
`
const RadioItems = styled.div`
  margin-top: 8px;
  width: 100%;
`
const RadioItem = styled(FlexSBCBox) <{ active: boolean }>`
padding: 7px 14px;
border-radius: 6px;
background: ${({ active }) => active ? "rgba(225, 231, 255, 0.45)" : ""};
color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */
>span{
  color: #7681AA;
text-align: right;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */
}
`

const RuleContainer = styled.div`
position: relative;
width: 100%;
margin-top: 23px;
border-radius: 10px;
background: #FFF;
padding: 18px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
/* overflow: hidden; */
`
const RuleTitle = styled(FlexCCBox) <{ src: string }>`
position: absolute;
left: -5px;
top: 19px;
height: 38px;
width: fit-content;
padding: 5px 16px 9px;
color: #FFF;
text-align: right;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 16px;
font-style: normal;
font-weight: 800;
line-height: 150%; /* 24px */
background-image:${({ src }) => `url(${src})`};
/* background-position: center; */
background-size: 100% 100%; //根据你图片的大小自定义
background-repeat: no-repeat;
@media (max-width:375px) {
padding: 5px 8px 9px;
  
}
`

const RuleImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 89px;
  width: 100%;
  z-index: 1;
  @media (max-width:375px) {
  max-width: 75px;
    
  }
`
const RuleItems = styled.div`
margin-top: 58px;
  width: 100%;

`
const RuleItem = styled(FlexSBCBox)`
  width: 100%;
  margin-bottom: 14px;
  >div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

`
const RuleleftItem = styled.div`
color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */`
const RuleRightItem = styled.div`
color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */`


const RuleBox = styled.div`
margin-bottom: 23px;
display: flex;
flex-wrap: wrap;
align-items: center;
padding: 13px;
border-radius: 15px;
border: 1px solid rgba(66, 99, 235, 0.29);
background: linear-gradient(180deg, rgba(66, 99, 235, 0.08) 0%, rgba(66, 99, 235, 0.00) 100%);
>div{
  text-align: left;
  width: 33.33%;
  min-width: 83px;
  color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 11px;
font-style: normal;
font-weight: 500;
line-height: 194%; /* 21.34px */
white-space: nowrap;
@media (max-width:375px) {
 width: 50%;
 text-align: center;
}
}

`

const RuleBox1 = styled.div`
margin-bottom: 23px;
color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */
padding: 17px 19px;
border-radius: 15px;
background: linear-gradient(180deg, rgba(66, 99, 235, 0.08) 0%, rgba(66, 99, 235, 0.00) 100%);
>.tip{
  &:first-child{
    margin-top: 17px;
  }
  margin-top: 10px;
  color: #15141F;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */
}
`

const RuleTitleBox = styled(FlexBox)`
width: fit-content;
  flex-direction: column;
  align-items: flex-start;
  color: #15141F;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 16px;
font-style: normal;
font-weight: 800;
line-height: 150%; /* 24px */
margin-bottom: 14px;
>div{
  margin-top: -6px;
  width: 100%;
height: 7px;
opacity: 0.1;
background: var(--001, linear-gradient(131deg, #4263EB -0.46%, #A851FF 103.67%));
}
  `

const RuleSubTitle = styled.div`
    color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */
margin-bottom: 10px;
  `
const TableBox = styled(FlexBox)`
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  margin-bottom: 10px;
  `
const TableItems = styled(FlexBox)`
  width: 33.33%;
  padding-right: 10px;

  align-items: center;
  justify-content: flex-start;
  >div{
    /* &:first-child{
      margin-top: 5px;
    } */
    margin-top: 10px;
  }

  `
const TableItem = styled(FlexCCBox)`
width: 100%;
  color: #4263EB;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
border-radius: 4px;
border: 0.5px solid rgba(66, 99, 235, 0.50);
  `

const MyManageContainer = styled.div`
  width: 100%;
`

const ManageTabContainer = styled(FlexBox)`
align-items: center;
margin-top: 20px;
  width: 100%;
  .ActiveTab{
    border-radius: 24px;
border: 1px solid #4AD4F8;
background: rgba(74, 212, 248, 0.14);
  }
`
const ManageSubTab = styled(FlexCCBox)`
padding: 2px 11px;
color: #00C2FF;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 100%; /* 166.667% */
border-radius: 24px;
border: 1px solid #4AD4F8;
background: rgba(74, 212, 248, 0.00);
margin-right: 14px;
min-height: 30px;
text-align: center;
`

const DataBox = styled.div`
margin-top: 30px;
padding: 19px 13px;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const DataTopBox = styled(FlexSBCBox)`

`
const DataItem = styled.div`
padding: 12px;
border-radius: 16px;
background: #F5F7FE;
width: 48%;
color:  #52525C;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 19.6px */
`
const NumBox = styled(FlexSBCBox)`
  color: #15141F;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Manrope;
font-size: 20px;
font-style: normal;
font-weight: 800;
line-height: 135%; /* 27px */
letter-spacing: -0.3px;
margin-top: 8px;
>div{
  color: #4BA8E6;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
}
`
const DataBottomItem = styled.div`
padding: 12px;
border-radius: 16px;
width: 48%;
color: #23262F;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
`
const NumBottomBox = styled(FlexSBCBox)`
color: #23262F;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
margin-top: 8px;

>div{
  width: 100%;
  padding-left: 12px;
  color: #4BA8E6;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
}
`

const RewardDataContainer = styled(FlexSBCBox)`
  margin-top: 20px;
  width: 100%;
  `
const RewardData = styled(FlexBox)`
flex-direction: column;
align-items: center;
padding: 19px 16px;
width: 47%;
border-radius: 20px;
background: #FFF;
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const RewardTop = styled(FlexSBCBox)`
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 19.6px */
>img{
  width: 49px;
  height: 49px;
}
`
const RewardBottom = styled(FlexSBCBox)`
color: #10192D;
font-family: Manrope;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 28px */

>div{
  color: #7681AA;
text-align: right;

/* Body / Small / medium */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */
}
`

const GetBtn = styled(FlexBox) <{ active: boolean }>`
margin-top: 20px;
flex-direction: column;
align-items: center;
justify-content: center;
height: 40px;
width: 100%;
max-width: 112px;
color: "#FFF";
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
letter-spacing: 0.112px;
border-radius: 10px;
background:  ${({ active }) => active ? "linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%)" : "#CCD3DB"};
box-shadow: 0px 10px 20px 0px rgba(66, 99, 235, 0.20);
>div{
  color: rgba(255,255,255,0.5);
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
white-space: nowrap;
}`

const RewardItemContainer = styled.div`
  
width: 100%;
`

const RecordItem = styled.div`
position: relative;
margin-top: 20px;
  padding: 23px 28px;
  border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const RecordTime = styled.div`
color: #23262F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 142.857% */
`
const TipBox = styled(FlexCCBox) <{ src: string }>`
position: absolute;
right: -5px;
top: 19px;
height: 34px;
width: fit-content;
padding: 4px 17px 10px 15px;
color: #FFF;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
background-image:${({ src }) => `url(${src})`};
/* background-position: center; */
background-size: 100% 100%; //根据你图片的大小自定义
background-repeat: no-repeat;
`

const RecordTagBox = styled(FlexBox)`
align-items: center;
justify-content: center;
margin-top: 13px;
>div{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
`
const RecordTag = styled(FlexCCBox)`
/* flex: 1; */
width: fit-content;
color: #4263EB;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 166.667% */
padding: 0px 11px;
/* margin-right: 12px; */
border-radius: 24px;
border: 1px solid #4263EB;
background: rgba(66, 99, 235, 0.00);
`
const InfoBox = styled(FlexSBCBox)`
margin-top: 18px;
width: 100%;
`
const InfoItem = styled.div`
display: flex;          
flex-direction: column;
align-items: center;
width: 50%;
color: #23262F;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
`
const InfoBottom = styled(FlexBox)`
margin-top: 7px;
align-items: center;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
>div{
  color: #4BA8E6;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-left: 17px;
}
`

const AllBtn = styled(FlexCCBox) <{ active: boolean }>`
margin-top: 26px;
width: 100%;
padding: 8px ;
color: #FFF;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 228.571% */
border-radius: 10px;
background: ${({ active }) => active ? "linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%)" : "#CCD3DB"};
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`

const InviteContainer = styled.div`
margin-top: 37px;

`
const InviteTitle = styled(FlexBox)`
align-items: center;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 800;
line-height: 20px; /* 142.857% */
background: linear-gradient(131deg, #4263EB -0.46%, #A851FF 103.67%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
>img{
  width: 38px;
  height: 38px;
}
`
const InviteContent = styled(FlexSBCBox)`
margin-top: 13px;
border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.53);
background: #FFF;
padding: 6px 16px;
color: #A4A6AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
/* line-height: 20px; */
word-break: break-all;
>div{
  word-break: keep-all;
  color: #23262F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
margin-right: 5px;
/* line-height: 32px; */
}
>img{
  width: 20px;
  height: 20px;
}
`
const MyTeamContainer = styled.div`
margin-top: 23px;
padding: 16px 24px;
border-radius: 24px;
background: #FFF;
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const MyTeamTitle = styled(FlexSBCBox)`
color: #15141F;
font-family: Work Sans;
font-size: 16px;
font-style: normal;
font-weight: 800;
line-height: 20px; /* 125% */
>img{
  width: 65px;
height: 45px;
}
`
const MySubTitle = styled.div`
  margin-top: 7px;
  color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
`
const MySubContent = styled(FlexSBCBox)`
  color: #15141F;
font-family: Source Han Sans CN;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 133.333% */
>div{
  color: #23262F;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 32px; /* 200% */
}
`
const MyInviteContainer = styled.div`
margin: 20px 0px 40px;
padding: 18px 22px;
border-radius: 24px;
background: #FFF;
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const MyInviteTitleContainer = styled(FlexBox)`
width: 100%;
>img{
  width: 65px;
height: 54px;
}
`
const MyInviteTitle = styled.div`
color: #15141F;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
>div{
  color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
}
`
const InviteList = styled.div`
  margin-top: 42px;
  width: 100%;
`
const TableTitleItems = styled(FlexBox)`
width: 100%;
align-items: center;
>div{
  
  
  flex:1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:first-child{
    width: 70%;
  }
}
`
const InviteTableItem = styled.div`
  color: #15141F;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
`
const InviteTableItem1 = styled.div`
  color: #23262F;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 32px; /* 266.667% */
`


const TableContentBox = styled.div`
width: 100%;
margin-top: 16px;

`
const TableContentItems = styled(FlexBox) <{ active: boolean }>`
padding: 2px 8px ;
align-items: center;
border-radius: 6px;
background: ${({ active }) => active ? "rgba(66, 99, 235, 0.08)" : ""};
>div{
  
  flex:1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:first-child{
    width: 70%;
  }
  
}
`




const CloseBox = styled.img`
position: absolute;
top: 15px;
right: 15px;
z-index: 1000;
`
const ModalBg = styled.div`
  position: absolute;
  left: 0px;
  top:0px;
  width: 100%;
  height: 124px;
  border-radius: 20px;
background: linear-gradient(180deg, rgba(66, 174, 235, 0.24) 0%, rgba(81, 213, 255, 0.00) 94.35%);
box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.60) inset;
/* z-index: -999; */

`
const ModalBg1 = styled.div`
  position: absolute;
  right: 47px;
  top:0px;
  transform: translateY(-50%);
  width: 114px;
height: 114px;
background: #C2FBFF;
filter: blur(66px);
/* z-index: -999; */
`
const ModalBg2 = styled.div`
  position: absolute;
  right: -33px;
  top:41px;
  transform: translateY(-50%);
  width: 114px;
height: 114px;
background: #BADEFF;
filter: blur(48.5px);
/* z-index:-999 */
`

const TopImg = styled(FlexCCBox)`
  height: 93px;
  >img{
    height: 75px;
  }
 `
const ModalTitle = styled(FlexCCBox)`
  color: #000;
text-align: center;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 900;
line-height: 26px; /* 162.5% */
letter-spacing: 0.128px;
 `

const InputCointainer = styled(FlexCCBox)`
justify-content: flex-start;
 padding: 11px 17px;
 margin: 12px 0px;
 border-radius: 10px;
border: 1px solid #8CE3FF;
background: #EDFDFF;
 >input{
  color: #000;
text-align: left;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 26px; /* 185.714% */
letter-spacing: 0.112px;
border: none;
background: transparent;
 }
 `
const BtnBox = styled(FlexCCBox)`
width: 100%;
 `


const InfoContainer = styled(FlexCCBox)`
  margin: 6px 0px;
  color: #7681AA;
text-align: center;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 26px; /* 216.667% */
letter-spacing: 0.096px;
  >img{
    margin-right: 8px;
  }
 `
const ModalContentCointainer = styled.div`
margin: 27px 0px;
 max-width: 235px;
 color: #7681AA;
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 21px */
>div{
  color: #7681AA;
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 21px */
}
`



const Btn = styled(FlexCCBox) <{ active: boolean }>`
max-width: 112px;
width: 100%;
border-radius: 10px;
background: ${({ active }) => active ? "linear-gradient(180deg, #6CB6FF 0%, #04DAFE 100%)" : "#7681AA"};
color: #FFF;
text-align: center;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 26px; /* 185.714% */
letter-spacing: 0.112px;
padding: 7px;
 `

const ModalBox = styled.div`
  width: 100%;
margin: 22px 0px;
 `
const ModalItem = styled(FlexSBCBox)`
  width: 100%;
margin-bottom: 16px;
 `
const ModalLeft = styled(FlexBox)`
align-items: center;
color: #15141F;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */
 `
const ModalRight = styled(FlexSBCBox)`
  width: 100%;
  max-width: 162px;
  padding: 14px 18px;
  color: #15141F;
text-align: right;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */
border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.53);
background: #FFF;
  >input{
    width: 100%;
    border: none;
    background: transparent;
    font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 21px */
background: linear-gradient(131deg, #4263EB -0.46%, #A851FF 103.67%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  }
 `

const ModalTipBox = styled.div`
margin-bottom: 32px;
 >div{
  color: #7681AA;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Work Sans;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */
 }
 `

const BuyBtn = styled(FlexCCBox) <{ active: boolean }>`
width: 100%;
padding: 8px 0px;
color: ${({ active }) => active ? "#FFF" : "#FFF"};
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 228.571% */
border-radius: 10px;
background: ${({ active }) => active ? "linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%)" : "linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%)"};
margin-top: 20px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const ActiveManageSubTabContainer = styled.div`
width: 100%;
`
const BottomContainer = styled.div`
width: 100%;
`
const LoadingContainer = styled.div`
width: 100%;
`


export default function Rank() {
  const { state: stateObj }: any = useLocation()
  const params = useParams<{ label: string;[key: string]: string }>()
  console.log(stateObj, "----------------", params, 'stateObj');
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const state = useSelector<stateType, stateType>(state => state)
  const [HomePrice, setHomePrice] = useState<any>([])
  const [OpenBindModal, setOpenBindModal] = useState<any>(false)
  const [GetRewardModal, setGetRewardModal] = useState<any>(false)
  const [ReturnRewardModal, setReturnRewardModal] = useState<any>(false)
  const [loading, setLoading] = useState<any>(false)
  const [GetCurrentReward, setGetCurrentReward] = useState<any>({
    type: 0,
    amount: 0,
    amounted: 0,
    fee: 0
  })
  const [ActiveTab, setActiveTab] = useState<any>(1)
  const [ActiveSubTab, setActiveSubTab] = useState<any>(1)
  const [Coin, setCoin] = useState<any>()
  const [ActiveManageSubTab, setActiveManageSubTab] = useState<any>(1)
  const { width } = useViewport()
  const Navigate = useNavigate()
  const [ApproveValue, setApproveValue] = useState<any>("")
  const [Balance, setBalance] = useState<any>("")
  const [amount, setAmount] = useState<any>()
  const [AllData, setAllData] = useState<any>()
  const [RecordList, setRecordList] = useState<any>()
  const [CurrentRecord, setCurrentRecord] = useState<any>()
  const [ExitRecordList, setExitRecordList] = useState<any>()
  const [ReferrerAddress, setReferrerAddress] = useState<any>('')
  const [FeeValue, setFeeValue] = useState<any>('')
  const [ReferrerAddressList, setReferrerAddressList] = useState<any>({})
  const [diffTime, statusBtn] = useTime({ initDiffTime: Number(AllData?.nextWithdrawTime ?? 0) })


  function ApproveFun() {
    if (!account) {
      return addMessage(t("Please link wallet"))
    }
    showLoding(true)
    Contracts.example.approve(account as string, stateObj?.contractAddress, "USDT").then(() => {
      Contracts.example.Tokenapprove(account as string, stateObj?.contractAddress, "USDT").then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        showLoding(false)
      })
    }).finally(() => {
      showLoding(false)
    })
  }

  const BuyFun = () => {
    if (!account) {
      return addMessage(t("Please link wallet"))
    }
    if (Number(amount) === 0) return addMessage(t("43"))
    if (Number(amount) % 100 !== 0) return addMessage(t("44"))
    showLoding(true)
    Contracts.example.buyFinancialManagement(account as string, 'AAA_greoup', stateObj?.contractAddress, amount, Number(ActiveSubTab)).then((res: any) => {
      console.log(res, 'jiaoyi');
      if (res.status) {
        showLoding(false)
        GetInitData()
        addMessage((Number(ActiveSubTab) === 1 ? t("45") : t("46")) + t("47"))
      } else {
        showLoding(false)
        addMessage(t("48"))
      }
    }).catch((res: any) => {
      // if ( !res?.status||res?.code === 4001) {
      showLoding(false)
      addMessage(t("48"))
      // }
    })
  }




  const inputAmountFun = (e: any) => {
    let value = e.target.value;
    if (Number(value) >= 0) {
      setAmount(value)
    }
  }
  const setAmountFun = (value: number) => {
    let valued = Number(Math.floor(Number(amount ?? 0) / 100) * 100) + Number(value);
    if (Number(valued) >= 100) {
      setAmount(valued)
    }
  }


  useEffect(() => {
    if (account) {
      Contracts.example.symbol(account, stateObj?.coinAddress).then((res: any) => {
        console.log(res, 'coin');
        setCoin(res)
      })
    }
  }, [account])


  const GetInitData = () => {
    Contracts.example.Tokenapprove(account as string, stateObj?.contractAddress, "USDT").then((res: any) => {
      console.log(res, 'shouquan');

      setApproveValue(new BigNumber(res).div(10 ** 18).toString())
    })
    Contracts.example.balanceOf(account as string, contractAddress?.USDT).then((res: any) => {
      setBalance(new BigNumber(res).div(10 ** 18).toString())
    })
  }

  const GetInitRecord = (type: any) => {
    setLoading(true)
    Contracts.example.getFinancialInfo(account as string, stateObj?.contractAddress, Number(type)).then((res: any) => {
      // setBalance(new BigNumber(res).div(10 ** 18).toString())
      console.log(res, 'heyuefanhui');
      setAllData(res)
      setLoading(false)

    }).catch(() => {
      setLoading(false)

    })

  }
  const referrerFun = async () => {
    let data = await Contracts.example.referrer(account as string, stateObj?.contractAddress)
    setReferrerAddress(data)
  }
  const referrerListFun = async (type: any) => {
    let data = await Contracts.example.getReferers(account as string, stateObj?.contractAddress, type)
    console.log(data, '直推地址');
    setReferrerAddressList(data)
  }
  const GetInitRecordList = async (type: any) => {
    // Contracts.example.getFinancialInfos(account as string, stateObj?.contractAddress, Number(type)).then((res: any) => {
    //   console.log(res, 'heyuefanhuiList');
    //   let Arr1 = res.filter((item: any) => Number(item?.status) !== 2)
    //   setRecordList(Arr1)
    //   // let Arr2 = res.filter((item: any) => Number(item?.status) === 2)
    //   // setExitRecordList(Arr2)
    // })
    // setLoading(true)
    let data = await Contracts.example.getFinancialInfos(account as string, stateObj?.contractAddress, Number(type))
    let Arr1 = data?.filter((item: any) => Number(item?.status) !== 2)
    console.log(Arr1, 'heyuefanhuiList');
    setRecordList(Arr1)
  }
  const GetInitExitRecordList = () => {
    Promise.all([Contracts.example.getFinancialInfos(account as string, stateObj?.contractAddress, Number(1)), Contracts.example.getFinancialInfos(account as string, stateObj?.contractAddress, Number(2))]).then((res: any) => {
      console.log(res, 'res');
      const [data1, data2] = res;
      let Arr = [...data1, ...data2]?.filter((item: any) => Number(item?.status) === 2)
      console.log(Arr, 'tuichu');
      setExitRecordList(Arr)
    })

  }

  const getUnionCoinAmountFun = async (type: any, amount: any) => {
    // let amountValue = await Contracts.example.getUnionCoinAmount(account as string, stateObj?.contractAddress, amount)
    let amountValue;
    if(String(stateObj?.coinAddress).toLowerCase()===String(contractAddress?.USDT).toLowerCase()){
      amountValue=Web3.utils.toWei(String(amount), "ether")
    }else{
      amountValue = await Contracts.example.getUnionCoinAmount(account as string, stateObj?.contractAddress, amount)
    }

    let feeValue = await Contracts.example.withdrawFee(account as string, stateObj?.contractAddress)
    console.log(amountValue, feeValue, 'shouxufe');
    setGetCurrentReward({ type: type, amount: amount, amounted: EthertoWei(amountValue ?? "0"), fee: feeValue })
  }

  const selectFeeFun = async () => {
    let feeValue = await Contracts.example.withdrawFee(account as string, stateObj?.contractAddress)
    setFeeValue(feeValue)
  }

  const opengetRewardFun = async (type: any, amountUsdt: any) => {
    // if (type === 1 && (!statusBtn)) return addMessage("领取暂未开放")
    // 1:理财收益 2:分享收益
    await getUnionCoinAmountFun(type, amountUsdt)
    setGetRewardModal(true)
  }

  const getRewardFun = () => {
    if (Number(GetCurrentReward?.type) === 1) {
      showLoding(true)
      Contracts.example.withdrawFinancialInterest(account as string, stateObj?.contractAddress, Number(ActiveManageSubTab)).then((res: any) => {
        if (res?.status) {
          showLoding(false)

          setGetRewardModal(false)
          GetInitRecord(ActiveManageSubTab)
          GetInitRecordList(ActiveManageSubTab)
          addMessage(Number(ActiveManageSubTab) === 1 ? t("49") : t("50"))
        } else {
          showLoding(false)

          addMessage(t("51"))

        }

      }).catch((res: any) => {
        // if (!res?.status||res.code === 4001) {
        showLoding(false)

        addMessage(t("51"))
        // }
      })
    } else if (Number(GetCurrentReward?.type) === 2) {
      showLoding(true)

      Contracts.example.withdrawInviteReward(account as string, stateObj?.contractAddress, Number(ActiveManageSubTab)).then((res: any) => {
        if (res?.status) {
          showLoding(false)

          setGetRewardModal(false)
          GetInitRecord(ActiveManageSubTab)
          GetInitRecordList(ActiveManageSubTab)
          addMessage(Number(ActiveManageSubTab) === 1 ? t("52") : t("53"))
        } else {
          showLoding(false)

          addMessage(t("51"))

        }
      }).catch((res: any) => {
        // if (!res?.status||res.code === 4001) {
        showLoding(false)

        addMessage(t("51"))
        // }
      })
    }
  }
  // 活期理财赎回
  const cancleFinancialFun = (no: any) => {
    showLoding(true)

    Contracts.example.cancleFinancial(account as string, stateObj?.contractAddress, Number(no)).then((res: any) => {
      console.log(res, 'shuhiu1');

      if (res?.status) {
        showLoding(false)

        setReturnRewardModal(false)
        GetInitRecordList(ActiveManageSubTab)
        addMessage(t("54"))
      } else {
        showLoding(false)

        addMessage(t("55"))
      }
    }).catch((res: any) => {
      console.log(res, 'shuhiu2');

      // if (!res?.status||res.code === 4001) {
      showLoding(false)
      addMessage(t("55"))
      // }
    })
  }

  function invitation() {
    if (!account) {
      return addMessage(t("Please link wallet"));
    } else {
      copy(
        window.location.origin + "/" + account + `/TradingManage/${stateObj?.id}`
      );
      addMessage(t("Copied successfully"));
    }
  }


  useEffect(() => {
    if (account) {
      GetInitData()
    }
  }, [account])

  useEffect(() => {
    if (account) {
      if (Number(ActiveTab) === 1) {
        GetInitRecord(ActiveSubTab)
      } else if (Number(ActiveTab) === 2) {
        if (Number(ActiveManageSubTab) === 3) return GetInitExitRecordList()
        referrerFun()
        GetInitRecord(ActiveManageSubTab)
        GetInitRecordList(ActiveManageSubTab)
        referrerListFun(ActiveManageSubTab)
      }
    }
  }, [account, ActiveTab, ActiveSubTab, ActiveManageSubTab])


  return (
    <HomeContainerBox>
      <BgBox1>
      </BgBox1>
      <BgBox2>
      </BgBox2>
      <BgBox3>
      </BgBox3>
      <BgBox4>
      </BgBox4>

      <BgImg1 src={pageBg1}></BgImg1>
      <BgImg2 src={pageBg2}></BgImg2>
      <BgImg3 src={pageBg3}></BgImg3>
      <BgImg4 src={pageBg4}></BgImg4>
      <BgImg5 src={pageBg5}></BgImg5>
      <BannerContainer>
        <ReturnContainer>
          <ReturnImg src={ReturnImg1} onClick={() => { Navigate("/View/TradingManage/1") }}></ReturnImg>
          {t(stateObj?.title)}
        </ReturnContainer>
      </BannerContainer>


      <HomeContent>

        <TabContainer>
          <Tab className={ActiveTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveTab(1) }}>{t("56")}</Tab>
          <Tab className={ActiveTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveTab(2) }}>{t("57")}</Tab>
        </TabContainer>
        {ActiveTab === 1 && <BuyContainer>
          <UionContainer>
            <UionTimeOut src={asideBg1}>
              {t("58")} 15{t("111")}
            </UionTimeOut>
            <UionTitleBox>
              <img src={stateObj?.icon} alt="" />{t(stateObj?.title)}
            </UionTitleBox>
            <SubTabContainer>
              <SubTab className={ActiveSubTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(1) }}>{t("45")}</SubTab>
              <SubTab className={ActiveSubTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(2) }}>{t("46")}</SubTab>
            </SubTabContainer>

            <PriceContainer>
              <PriceLeft>
                <input type="Number" value={amount} placeholder={t("59")} onChange={inputAmountFun} />
                <PriceBottom>
                  {amount ? `≈$${amount}` : ""}
                </PriceBottom>
              </PriceLeft>
              <PriceRight>
                <BtnManageBox>
                  <ManageBtn onClick={() => { setAmountFun(+100) }}>+</ManageBtn>
                  <ManageBtn onClick={() => { setAmountFun(-100) }}>-</ManageBtn>
                </BtnManageBox>
                <MaxBtn onClick={() => { setAmount(Math.floor(Number(Balance) / 100) * 100) }}>{t("60")}</MaxBtn>
              </PriceRight>
            </PriceContainer>

            <TagContainer>
              <Tag>
                <div>{t("61")}：</div><span>{NumSplic1(Balance, 2)} USDT</span>
              </Tag>
              <Tag>
                <div> {t("62")}：</div><span>{EthertoWei(AllData?.investAmount ?? "0")} USDT</span>
              </Tag>
            </TagContainer>


            <RewardContainer>
              <RewardLeft>
                <Radio></Radio>{t("63")}
              </RewardLeft>
              <RewardRight>
                <RedioRight></RedioRight>
                {Coin}
              </RewardRight>
            </RewardContainer>

            <RadioContainer>
              <Tag style={{ justifyContent: "space-between" }}>
                <div>{t("64")}（%）</div>{ActiveSubTab === 2 && <span>1%</span>}
              </Tag>
              {ActiveSubTab === 1 && <RadioItems>
                {
                  [{ title: t("69"), radio: "0.6%" },
                  { title: t("70"), radio: "0.7%" },
                  { title: t("71"), radio: "0.8%" }
                  ].map((item: any, index: any) => <RadioItem key={index} active={index % 2 === 0}>
                    {item?.title} <span>{item?.radio}</span>
                  </RadioItem>)
                }
              </RadioItems>}

              {Number(ApproveValue) >= Number(amount ?? 100) ? (Number(Balance) >= Number(amount ?? 100) ? <BuyBtn active={true} onClick={() => { BuyFun() }}>{t("56")}</BuyBtn> : <BuyBtn active={false}>{t("66")}</BuyBtn>) :
                <BuyBtn active={true} onClick={() => { ApproveFun() }}>{t("67")}</BuyBtn>}
            </RadioContainer>
          </UionContainer>

          <RuleContainer>
            {ActiveSubTab === 1 && <RuleTitle src={asideBg2}>
              {t("68")} 15 {t("111")}
            </RuleTitle>}
            <RuleImg src={ruleImg1}>
            </RuleImg>
            <RuleItems>

              <RuleItem>
                <RuleleftItem>{t("63")}：</RuleleftItem>
                <RuleRightItem>
                  <RedioRight></RedioRight>
                  {Coin}
                </RuleRightItem>
              </RuleItem>
              <RuleItem>
                <RuleleftItem>{t("72")}：</RuleleftItem>
                <RuleRightItem>
                  5%
                </RuleRightItem>
              </RuleItem>
              {ActiveSubTab !== 1 && <RuleItem>
                <RuleleftItem>{t("73")}：</RuleleftItem>
                <RuleRightItem>
                  1%
                </RuleRightItem>
              </RuleItem>}
            </RuleItems>

            {ActiveSubTab === 1 && <RuleBox>
              <div>{t("69")}：0.6%，</div><div> {t("70")}：0.7%，</div> <div>{t("71")}：0.8%，</div>
              <div>{t("74")}：0.9%，</div><div>{t("75")}：1%，</div><div>{t("76")}：1.1%，</div>
              <div>{t("77")}：1.2%，</div><div>{t("78")}：1.3%，</div><div>{t("79")}：1.4%，</div>
              <div>{t("80")}：1.5%.</div>
            </RuleBox>}
            <RuleBox1>
              <RuleTitleBox>
                - {t("81")}
                <div></div>
              </RuleTitleBox>
              {t("82")}
            </RuleBox1>
            <RuleBox1>
              <RuleTitleBox>
                - {t("83")}
                <div></div>
              </RuleTitleBox>
              {t("84")}
              <div className='tip'>{t("85")}</div>
              <div className='tip'>{t("86")}</div>
              <div className='tip'>{t("87")}</div>
            </RuleBox1>
            <RuleBox1>
              <RuleTitleBox>
                - {t("88")}
                <div></div>
              </RuleTitleBox>
              <RuleSubTitle>
                {t("89")}：
              </RuleSubTitle>
              {t("90")}：
              <TableBox>
                <TableItems>
                  <TableItem>{t("91")}</TableItem>
                </TableItems>
              </TableBox>
              {t("92")}：
              <TableBox>
                <TableItems>
                  <TableItem>{t("93")}</TableItem>
                </TableItems>
                <TableItems><TableItem>{t("94")}</TableItem></TableItems>
                <TableItems style={{paddingRight:"0px"}}><TableItem>{t("95")}</TableItem>
                </TableItems>
                <TableItems><TableItem>{t("271")}</TableItem></TableItems>
                <TableItems><TableItem>{t("272")}</TableItem></TableItems>
                <TableItems style={{paddingRight:"0px"}}><TableItem>{t("273")}</TableItem>
                </TableItems>
              </TableBox>
              <RuleSubTitle>
                {t("96")}：
              </RuleSubTitle>
              {t("97")}
            </RuleBox1>



          </RuleContainer>
        </BuyContainer>}
        {ActiveTab === 2 && <MyManageContainer>
          <ManageTabContainer>
            <ManageSubTab className={ActiveManageSubTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveManageSubTab(1) }}>{t("98")}</ManageSubTab>
            <ManageSubTab className={ActiveManageSubTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveManageSubTab(2) }}>{t("99")}</ManageSubTab>
            <ManageSubTab className={ActiveManageSubTab === 3 ? "ActiveTab" : ""} onClick={() => { setActiveManageSubTab(3) }}>{t("100")}</ManageSubTab>
          </ManageTabContainer>


          {!loading ? <LoadingContainer>

            {ActiveManageSubTab !== 3 && <ActiveManageSubTabContainer>

              <DataBox>
                <DataTopBox>
                  <DataItem> {t("101")}
                    <NumBox>{EthertoWei(AllData?.investAmount ?? "0")} <div>USDT</div></NumBox>
                  </DataItem>
                  <DataItem> {t("102")}
                    <NumBox>{EthertoWei(AllData?.exitAmount ?? "0")} <div>USDT</div></NumBox>
                  </DataItem>
                </DataTopBox>

                <DataTopBox>
                  <DataBottomItem> {t("103")}
                    <NumBottomBox>{EthertoWei(AllData?.withdrawAmount ?? "0")} <div>USDT</div></NumBottomBox>
                  </DataBottomItem>
                  <DataBottomItem> {t("104")}
                    <NumBottomBox>{EthertoWei(AllData?.pendingAmount ?? "0")} <div>USDT</div></NumBottomBox>
                  </DataBottomItem>
                </DataTopBox>
              </DataBox>

              <RewardDataContainer>
                <RewardData>
                  <RewardTop>{t("105")}<img src={rewardIcon} alt="" /></RewardTop>
                  <RewardBottom>{EthertoWei(AllData?.financialPendingAmount ?? "0")} <div>USDT</div></RewardBottom>
                  <GetBtn active={!!Number(EthertoWei(AllData?.financialPendingAmount ?? "0")) && statusBtn}
                    onClick={() => {
                      // setGetRewardModal(true)
                      if (!!Number(EthertoWei(AllData?.financialPendingAmount ?? "0"))) {
                        opengetRewardFun(1, EthertoWei(AllData?.financialPendingAmount ?? "0"))
                      }
                    }}
                  >
                    {t("106")}
                    {Number(diffTime) > 0 && <div>{t("107")} {dayjs.duration(diffTime, 'seconds').format('HH:mm:ss')}</div>}
                  </GetBtn>
                </RewardData>
                <RewardData>
                  <RewardTop>{t("287")}<img src={rewardIcon} alt="" /></RewardTop>
                  <RewardBottom>{EthertoWei(AllData?.invitePendingAmount ?? "0")} <div>USDT</div></RewardBottom>
                  <GetBtn active={!!Number(EthertoWei(AllData?.invitePendingAmount ?? "0"))} onClick={() => {
                    // setGetRewardModal(true)
                    if (!!Number(EthertoWei(AllData?.invitePendingAmount ?? "0"))) {
                      opengetRewardFun(2, EthertoWei(AllData?.invitePendingAmount ?? "0"))
                    }
                  }}>
                    {t("106")}
                  </GetBtn>
                </RewardData>
              </RewardDataContainer>
            </ActiveManageSubTabContainer>}


            {ActiveManageSubTab !== 3 ? (RecordList?.map((item: any, index: any) => <RewardItemContainer key={index}>
              <RecordItem>
                <RecordTime>
                  {dateFormat("YYYY:mm:dd HH:MM:SS", new Date(Number(item?.startTime * 1000)))}
                </RecordTime>
                {Number(item?.status) === 1 && <TipBox src={endTagBg}>{t("108")}</TipBox>}
                <RecordTagBox>
                  <div><RecordTag> {Number(item?.financialType) === 1 ? t("45") : t("46")}</RecordTag></div>
                  <div>{!!Number(item?.cycle) && ActiveManageSubTab !== 2 && (i18n.language==="zh"?<RecordTag> 第{ToString(Number(item?.cycle))}周期</RecordTag>:<RecordTag> Cycle {item?.cycle}</RecordTag>)}</div>
                  {/* {!!Number(item?.cycle) && <RecordTag> {ArrTime[Number(item?.cycle)]}</RecordTag>} */}
                </RecordTagBox>
                <InfoBox>
                  <InfoItem>
                    {t("109")}
                    <InfoBottom>{EthertoWei(item?.financialAmount ?? 0)}<div>USDT</div></InfoBottom>
                  </InfoItem>
                  <InfoItem>
                    {t("110")}

                    <InfoBottom>{item?.startDays}<div>{t("111")}</div></InfoBottom>
                  </InfoItem>
                </InfoBox>

                {Number(ActiveManageSubTab) !== 2 && (Number(item?.status) === 0 ? <AllBtn active={true} onClick={() => {
                  if (Number(ActiveManageSubTab) !== 2) {
                    setReturnRewardModal(true);
                    setCurrentRecord(item)
                    selectFeeFun()
                  }
                }}>
                  {t("112")}
                </AllBtn> : <AllBtn active={false}>
                  {t("108")}
                </AllBtn>)}
                {/* <AllBtn active={false}>
                距离下次领取 00：00：23
              </AllBtn> */}
              </RecordItem>
            </RewardItemContainer>)) :
              (ExitRecordList?.length > 0 ? ExitRecordList?.map((item: any, index: any) => <RewardItemContainer key={index}>
                <RecordItem>
                  <RecordTime>
                    {dateFormat("YYYY:mm:dd HH:MM:SS", new Date(Number(item?.startTime * 1000)))}
                  </RecordTime>
                  {<TipBox src={endTagBg}>{t("100")}</TipBox>}
                  {/* {Number(item?.status) === 1 && <TipBox src={endTagBg}>已退出</TipBox>} */}
                  <RecordTagBox>
                    <div><RecordTag> {Number(item?.financialType) === 1 ? t("45") : t("46")}</RecordTag></div>
                    <div>{Number(item?.financialType) !== 2 && (i18n.language==="zh"?<RecordTag> 第{ToString(Number(item?.cycle))}周期</RecordTag>:<RecordTag> Cycle {item?.cycle}</RecordTag>)}</div>
                    {/* <div>{ActiveManageSubTab !== 2&&<RecordTag> 第{ToString(Number(item?.cycle))}周期</RecordTag>}</div>  */}
                  </RecordTagBox>
                  <InfoBox>
                    <InfoItem>
                      {t("109")}
                      <InfoBottom>{EthertoWei(item?.financialAmount ?? 0)}<div>USDT</div></InfoBottom>
                    </InfoItem>
                    <InfoItem>
                      {t("110")}
                      <InfoBottom>{item?.startDays}<div>{t("111")}</div></InfoBottom>
                    </InfoItem>
                  </InfoBox>

                  <AllBtn active={false}>
                    {t("100")}
                  </AllBtn>
                </RecordItem>
              </RewardItemContainer>) : <NoData />)
            }



            {Number(ActiveManageSubTab) !== 3 && <BottomContainer>
              <InviteContainer>
                <InviteTitle>
                  <img src={SettingIcon} alt="" />{t("113", { "name": t(stateObj?.title) })}
                  {/* <img src={SettingIcon} alt="" />邀请好友来{stateObj?.title}，一起赚取奖励 */}
                </InviteTitle>
                <InviteContent>
                  <div>{t("114")}</div>{window.location.origin +
                    "/" + AddrHandle(account as string) + `/TradingManage/${stateObj?.id}`}
                  <img src={copyIcon} alt="" onClick={() => { invitation() }} />
                </InviteContent>
              </InviteContainer>

              <MyTeamContainer>
                <MyTeamTitle>{t("115")} <img src={teamIcon} alt="" /></MyTeamTitle>
                <MySubTitle>{t("116")}</MySubTitle>
                <MySubContent>{ReferrerAddressList[1]?.reduce((snum: any, item: any) => { return Number(snum) + Number(EthertoWei(item ?? "0")) }, 0)}</MySubContent>
                {/* <MySubContent>{ReferrerAddressList[1]?.reduce((snum: any, item: any) => { return Number(snum) + Number(EthertoWei(item ?? "0")) }, 0)}<div>USDT</div></MySubContent> */}
              </MyTeamContainer>

              <MyInviteContainer>
                <MyInviteTitleContainer>
                  <img src={myreferIcon} alt="" />
                  <MyInviteTitle>
                    {t("117")}
                    <div>{AddrHandle(ReferrerAddress, 6, 10) ?? "-"}</div>
                  </MyInviteTitle>
                </MyInviteTitleContainer>

                <InviteList>
                  <TableTitleItems>
                    <InviteTableItem>{t("118")}</InviteTableItem>
                    <InviteTableItem>{t("119")}/USDT</InviteTableItem>
                  </TableTitleItems>

                  <TableContentBox>
                    {ReferrerAddressList[0]?.length > 0 ? ReferrerAddressList[0]?.map((item: any, index: any) => <TableContentItems active={true} key={index}>
                      <InviteTableItem1>{AddrHandle(item)}</InviteTableItem1>
                      <InviteTableItem1>{EthertoWei(ReferrerAddressList[1][index] ?? "0")}</InviteTableItem1>
                    </TableContentItems>) : <NoData />}
                  </TableContentBox>

                </InviteList>
              </MyInviteContainer>
            </BottomContainer>}

          </LoadingContainer>
            : <SubPageLoding></SubPageLoding>}




        </MyManageContainer>}
      </HomeContent>

      <Modal
        visible={GetRewardModal}
        className='allModal'
        centered
        width={'301px'}
        destroyOnClose={true}
        closable={false}
        key={GetCurrentReward?.type}
        footer={null}
        // style={{ padding: "25px" }}
        onCancel={() => { setGetRewardModal(false) }}>
        <CloseBox src={CloseIcon} onClick={() => { setGetRewardModal(false) }}></CloseBox>
        <ModalBg></ModalBg>
        <ModalBg1></ModalBg1>
        <ModalBg2></ModalBg2>
        {/* <TopImg><img src={JoinInTradeBg} alt="" /></TopImg> */}
        <ModalTitle>{t("120")}</ModalTitle>
        <ModalBox>
          <ModalItem>
            <ModalLeft> <Radio></Radio> {t("121")}</ModalLeft>
            <ModalRight><input value={GetCurrentReward?.amount} type="Number" readOnly={true} />USDT</ModalRight>
          </ModalItem>
          <ModalItem>
            <ModalLeft> <Radio></Radio> {t("122")}</ModalLeft>
            <ModalRight><input value={NumSplic1(GetCurrentReward?.amounted, 2)} type="Number" readOnly={true} />{Coin}</ModalRight>
          </ModalItem>
        </ModalBox>
        <ModalTipBox>
          <div>{t("123")}：{GetCurrentReward?.fee}%</div>
          <div>{t("124")}：{NumSplic1(GetCurrentReward?.amounted * (1 - Number(GetCurrentReward?.fee / 100)), 2)} {Coin}</div>
        </ModalTipBox>
        <BtnBox>
          <Btn active={!!GetCurrentReward?.amounted} onClick={() => {
            if (!!GetCurrentReward?.amounted) {
              getRewardFun()
            }
          }}>{t("125")}</Btn>
        </BtnBox>
      </Modal>

      <Modal
        visible={ReturnRewardModal}
        className='allModal'
        centered
        width={'301px'}
        closable={false}
        footer={null}
        // style={{ padding: "25px" }}
        onCancel={() => { setReturnRewardModal(false) }}>
        <CloseBox src={CloseIcon} onClick={() => { setReturnRewardModal(false) }}></CloseBox>
        <ModalBg></ModalBg>
        <ModalBg1></ModalBg1>
        <ModalBg2></ModalBg2>
        {/* <TopImg><img src={JoinInTradeBg} alt="" /></TopImg> */}
        <ModalTitle>{t("126")}</ModalTitle>
        <ModalContentCointainer>
          {/* 当前账户已参与理财{CurrentRecord?.startDays}天，
          退出将扣除{FeeValue}%手续费 */}
          {t("127", { day: CurrentRecord?.startDays, fee: FeeValue })}
          <div>（～{Number((Number(EthertoWei(CurrentRecord?.financialAmount ?? "0")) - (1 - Number(FeeValue) / 100)).toFixed(10))} USDT）</div>
        </ModalContentCointainer>
        <BtnBox>
          <Btn active={!!CurrentRecord?.no} onClick={() => {
            if (!!CurrentRecord?.no) {
              cancleFinancialFun(CurrentRecord?.no)
            }
          }}>{t("125")}</Btn>
        </BtnBox>
      </Modal>

    </HomeContainerBox >
  )
}

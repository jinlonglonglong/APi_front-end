import React, { useState, useEffect } from 'react'
import { getHomePrice, getPriceList, lastNews } from '../API/index'
import '../assets/style/Home.scss'
import NoData from '../components/NoData'
import Table from '../components/Table'
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { stateType } from '../store/reducer';
import styled, { keyframes } from 'styled-components';
import { useViewport } from '../components/viewportContext';
import { AddrHandle, NumSplic1 } from '../utils/tool';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ContainerBox, FlexBox, FlexCCBox, FlexECBox, FlexSBCBox, FlexSCBox } from '../components/FlexBox'
import { Carousel } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import BigNumber from 'big.js'

import ImgItem1 from '../assets/image/Home/ImgItem1.png'
import CoinBg1 from '../assets/image/Home/CoinBg1.png'
import CoinBg2 from '../assets/image/Home/CoinBg2.png'
import CoinBg3 from '../assets/image/Home/CoinBg3.png'
import MYBG from '../assets/image/Home/MYBG.png'
import NoticeIcon from '../assets/image/Home/NoticeIcon.svg'
import arrowUp from '../assets/image/Home/arrowUp.svg'
import toolItem1 from '../assets/image/Home/toolItem1.svg'
import toolItem2 from '../assets/image/Home/toolItem2.svg'
import toolItem3 from '../assets/image/Home/toolItem3.svg'
import toolItem4 from '../assets/image/Home/toolItem4.svg'
import toolItem5 from '../assets/image/Home/toolItem5.svg'
import toolItem6 from '../assets/image/Home/toolItem6.svg'
import toolItem7 from '../assets/image/Home/toolItem7.svg'
import toolItem8 from '../assets/image/Home/toolItem8.svg'
import NewsImg1 from '../assets/image/Home/NewsImg.png'
import JoinInTradeBg from '../assets/image/Home/JoinInTradeBg.png'
import arrowRight from '../assets/image/Home/arrowRight.svg'
import avtorIcon from '../assets/image/Home/avtorIcon.svg'
import NewsBg1 from '../assets/image/Home/NewsBg.png'
import MarketLine from '../assets/image/Home/MarketLine.png'
import MarketDesLine from '../assets/image/Home/MarketDesLine.png'
import BNBIcon from '../assets/image/Home/BNBIcon.svg'
import bgImg1 from '../assets/image/Home/bgImg1.png'
import { url } from 'inspector'
import MessageBox from '../components/MessageBox/MessageBox'

const HomeContainerBox = styled(ContainerBox)`
position: absolute;
top:0;
left:0;
width: 100%;
padding: 64px 0px 0px;
color: #fff;
`
const BannerContainer = styled.div`
width: 100%;
`


const BgBox1 = styled(FlexBox)`
position: absolute;
width: 194px;
height: 194px;
right: -100px;
top: 0px;
background: #6AB7FF;
filter: blur(97px);
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
max-width: 118px;
right: 39px;
    top: 256px;
transform: translateX(50%);
z-index: -999;
/* opacity: 0.5; */


`
const BannerBigBox = styled(FlexSBCBox)`
padding: 29px 41px  24px;
width: 100%;
position: relative;
@media (max-width:375px) {
  padding: 29px 24px  24px;

  
}
`
const BannerBigLeftBox = styled.div`
    width: 70%;
`
const BannerBigRightBox = styled.img`
position: absolute;
right: 0px;
top: 0px;
    width: 30%;
`
const NoticeContainer = styled(FlexBox)`
justify-content: flex-start;
align-items: center;
margin-top: 30px;
  width: 100%;
  border-radius: 10px;
background: #F2F4FF;
padding: 4px 12px;
`
const NoticeIconContainer = styled.img` 
width: 24px;
height: 24px;
margin-right: 12px;
`

const HomeContent = styled.div`
width: 100%;
padding-bottom: 83px;
.ant-carousel{
  width: 100%;
  .myselfCarousel{
  width: 100%;  
  .slick-dots-bottom{
    bottom: -22px !important;
  }
.slick-dots li.slick-active button{
  background: rgba(66, 99, 235, 1) !important;
  width: 30px !important;
}
.slick-dots li  {
  width: fit-content;
  button{
  background: rgba(208, 216, 245, 1) !important;
  height: 8px !important;
  width: 8px !important;
  border-radius: 4px !important;
}
}
}}

.mySwiper{
  margin: 54px 0px 0px;
padding:0px 20px;
.swiper-wrapper {
    justify-content: space-between;

    .swiper-slide {
        width: 96px;

        /* &:nth-child(2) {
            padding: 0px 10px;
        } */

 
    }
}
}
.newsSwiper{
.swiper-wrapper {
    justify-content: space-between;

    .swiper-slide {
        width: 100%;

        /* &:nth-child(2) {
            padding: 0px 10px;
        } */

 
    }
}
}
`

const TopCoinContainer = styled(FlexSBCBox)`
width: 100%;
`
const CoinBigContainer = styled(FlexSBCBox)`
width: 100%;
padding: 0px 13px;
`
const TopCoinItem = styled.div`
position: relative;
width: 33.33%;
padding: 17px 16px;
border-radius: 10px;
padding: 0px 7px;
@media (max-width:768px) {
padding: 0px 3px;
  
}
`
const CoinBox = styled.div`
position: relative;
width: 100%;
padding: 17px 16px;
border-radius: 10px;
background: #FFF;
z-index: 99;
`

const CoinName = styled(FlexBox)`
color: #10192D;
text-transform: uppercase;
font-family: "Manrope";
font-size: 12.476px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 18.714px */
>span{
  color: var(--main-greyscale-40, #8E9BAE);
font-family: "Manrope";
font-size: 12.476px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 18.714px */
}
`
const CoinPriceBox = styled.div` 
margin-top: 5px;
color: var(--main-greyscale-90, #10192D);
font-family: "Manrope";
font-size: 16px;
font-style: normal;
font-weight: 800;
line-height: 140%; /* 22.4px */
`
const CoinRate = styled(FlexBox) <{ add: any }>` 
margin-top: 10px;
align-items: center;
color: ${({add})=>add?"#22C36B":"#FF3030"};
font-family: "Manrope";
font-size: 11.913px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 17.869px */
>img{
  margin-right: 5px;
  transform: ${({add})=>add?"rotate(0deg)":"rotate(-180deg)"};
}
`
const CNYPrice = styled.div` 
margin-top: 2.8px;
color: "#8E9BAE";
font-family: "Manrope";
font-size: 12.476px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18.714px */
`
const CoinBg = styled.div` 
position: absolute;
bottom: 0;
right:0;
max-width: 59px;
width: 100%;
z-index: -99;
opacity: 0.3;
>img{
  width: 100%;
  /* max-width: 47px; */
}
`


const ToolsItems = styled(FlexSBCBox)` 
/* min-width: 800px; */
`

const ToolsItem = styled(FlexBox)` 
flex-direction: column;
align-items: center;
color: #000;
font-family: "Manrope";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 21px */
text-align: center;
@media (max-width:768px) {
line-height: normal; /* 21px */
  
}
`
const ToolsBox = styled(FlexCCBox)` 
width: 80px;
height: 80px;
margin-bottom: 8px;
border-radius: 14px;
background: #FFF;
box-shadow: 0px 12px 11px 0px rgba(66, 99, 235, 0.04);
>img{
  width: 32px;
  height: 32px;
}
`

const JoinInTradeCointainrtBox = styled.div`
  width: 100%;
  padding-right: 62px;
`
const JoinInTradeCointainrt = styled(FlexSBCBox)`
margin-top: 22px; 
position: relative;
width: 100%;
padding-right: 15px;
border-radius: 0px 16px 16px 0px;
background: linear-gradient(266deg, rgba(66, 99, 235, 0.21) -25.45%, rgba(66, 99, 235, 0.00) 95.46%);
`
const LeftBox = styled.div` 
margin: 12px 0px 12px 45px;
color: #15141F;
text-align: center;
font-family: Manrope;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 28px */
@media (max-width:375px) {
margin: 12px 0px 12px 24px;
  
}
>div{
  color: #15141F;
text-align: center;

/* Body/Small/regular */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
margin-top: 5px;
}
`
const MidBox = styled.img`
  height: 100%;
  width: 100%;
  max-width: 110px;
`
const RightBox = styled(FlexCCBox)` 
width: 52px;
height: 52px;
flex-shrink: 0;
position: absolute;
right: 0px;
top: 50%;
transform: translate(50%,-50%);
fill: #FFF;
stroke-width: 1px;
stroke: #7A91F1;
border: 1px solid #7A91F1;
border-radius: 50%;
background: #fff;
>img{
width: 16px;
height: 16px;
}
`
const NewsContainer = styled.div`
position: relative;
  margin-top: 31px;
  width: 100%;
`
const NewsBg = styled.img`
 position: absolute;
 left: -24px;
 top: -10px;
 width: 113px;
height: 113px;
z-index: -999;
 `
const NewsTitleBox = styled(FlexSBCBox)` 
padding: 0px 24px;
width: 100%;
color: #10192D;
margin-bottom: 20px;
/* Body / Large / bold */
font-family: Manrope;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 24px */
@media (max-width:375px) {
padding: 0px 12px;
  
}
>span{
  color: var(--main-primary-100, #2873FF);
text-align: right;

/* Body/Medium/bold */
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
}
`
const CoinTitleBox = styled(FlexSBCBox)` 
padding: 0px 24px;
width: 100%;
color: #10192D;
margin-bottom: 8px;

/* Body / Large / bold */
font-family: Manrope;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 24px */
>span{
  color: var(--main-primary-100, #2873FF);
text-align: right;

/* Body/Medium/bold */
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
}
`

const NewsContents = styled.div`
position: relative;
  padding: 0px 12px;
  margin-top:10px;
  background: transparent;
`

const NewsItem = styled(FlexSBCBox)` 
padding: 15px;
border-radius: 16px;
background: #FFF;
margin-bottom: 23px;
&:last-child{
  margin-bottom: 0px;
}

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`

const NewsLeft = styled.div`
position: relative;
width: 40%;
height: 93px;
`
const NewsImg = styled.img`
    position: absolute;
    top: 0px;
    right:22px;
    left: -27px;
    width: 100%;
    max-height: 93px;
border-radius:0px 9px 9px 0px;
    
`
const NewsRight = styled(FlexBox)`
justify-content: space-between;
flex-direction: column;

// position: relative;
width: 60%;
height:100%;
// height: 93px;
padding: 4px 0px;
>.swiper{
  width: 100%;
}
`

const NewsTitle = styled.div` 
color: #000;
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

const NewsDescript = styled.div` 
color:#010101;
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
word-break: break-word;
`
const NewsAutor = styled(FlexBox)`
justify-content: flex-start;
align-items: center;
color: #000;
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
>img{
  margin-right: 5px;
} 
`
const NewsTime = styled.div`
// margin-top:5px;
text-align:right;
color: #010101;
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
`


const MarketContainer = styled.div`
margin-top: 27px;
width: 100%;

padding: 0px 24px;
`
const MarketTabContainer = styled(FlexSBCBox)`
/* height: 56px; */
border-radius: 30px;
background: #EDF1FF;
padding: 4px !important;
width: 100%;
box-sizing: content-box;
/* min-width: 400px; */
overflow-x: auto;
&::-webkit-scrollbar {
  scrollbar-width: none;
  display: none;
}
.ActiveTab{
  color: #191C32;
text-align: center;
font-family: PingFang SC;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
padding: 14px 20px;
border-radius: 25px;
background: rgba(255, 255, 255, 0.80);
box-shadow: 0px 20px 40px 0px rgba(55, 62, 125, 0.10);}
`
const Tab = styled.div` 
width:fit-content;
color: #9395A5;
text-align: center;
font-family: Poppins;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
padding: 14px 21px;
background: transparent;
white-space: nowrap;
`


const MarketContent = styled.div`
    width: 100%;
    padding-bottom: 35px;
`
const MarketCoinItems = styled.div`
`
const MarketCoinItem = styled(FlexSBCBox)`
margin-top: 10px;
width: 100%;
min-height: 64px;
`
const MarketCoinLeft = styled(FlexBox)`
width: fit-content;
>img{
  width:40px;
  height:40px;
  margin-right: 16px;
}
`
const CoinNameBox = styled.div`
  color: var(--main-greyscale-90, #10192D);
/* Body/Medium/bold */
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
>div{
  color: var(--main-greyscale-40, #8E9BAE);
/* Body/Small/regular */
font-family: Open Sauce Sans;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
}
`
const MarketCoinRight = styled(FlexBox)`
width: fit-content;

`
const MarketLineBox = styled(FlexCCBox)`
  max-width: 70px;
  width: 100%;
  margin-right: 24px;
  >img{
    width: 100%;
    
  }
`
const MarketPriceBox = styled.div <{ add: boolean }>`
color: var(--main-greyscale-90, #10192D);
text-align: right;

/* Body/Medium/bold */
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
>div{
color: ${({ add }) => add ? "#22C36B" : "#F65556"};
text-align: right;

/* Body / Small / medium */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */
}
`



const BannerTitle = styled(FlexBox)`

color: #2D2D2D;
font-family: Source Han Sans CN;
font-size: 18px;
font-style: normal;
font-weight: 900;
line-height: 26px; /* 144.444% */
letter-spacing: 0.144px;
`
const BannerSubTitle = styled(FlexBox)`
margin-top: 20px;
color: #6B8496;
font-family: Arial;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
`

const ContractTitle = styled.div` 
text-align: center;
font-family: Inter;
font-size: 24px;
/* text-shadow: -2px 1px 0px #5B3800; */
font-style: normal;
font-weight: 600;
line-height: normal;
background: linear-gradient(180deg, #FF995C 0%, #FBC830 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
margin-bottom: 20px;
img{
  max-width: 225px;
  object-fit: contain;
max-height: 30px;
}
`
const ContractList = styled(FlexSBCBox)` 
flex-wrap: wrap;
`
const ContractItem = styled(FlexCCBox)` 
width:33.33%;
margin-bottom: 18px;
img{
  width: 90%;
}
`

const ContentContainer = styled.div`
width: 100%;
padding: 25px 25px 0px;
/* >div{
  &:last-child{
margin-bottom:0px;
}} */
`

const NewsBottomContainer = styled.div`
width: 100%;
margin-bottom: 26px;

`
const NoMoreContainer = styled.div`
width: 100%;
margin:0px 0px 26px;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
text-align:center;
`
const TimeBox = styled(FlexBox)`
width: 100%;
  align-items: center;
  justify-content: flex-end;
  color:#010101;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
margin-bottom: 6px;
text-align: right;
>div{
  width: 100%;
  text-align: right;
  margin-right: 13px;
}
`
const RadioBox = styled.div`
width: 8px;
height: 8px;
background: #4263EB;
border-radius: 50%;
`
const NewsBox = styled.div`
  padding: 13px 24px;
  color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 142.857% */
border-radius: 20px;
border: 1px solid rgba(66, 99, 235, 0.18);
background: #FFF;

/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const NewsBottomTitle = styled(FlexBox)`
align-items: center;
 color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 142.857% */
margin-bottom: 8px;
word-break: break-all;

`
const NewsContent = styled.div`
  
  color: #010101;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 350;
line-height: 20px; /* 166.667% */
`

const TitleLeftBox = styled.div`
position: relative;
width: 78px;
min-height: 60px;
height: 100%;
>img{
  position: absolute;
  right: 11px;
  bottom: 8px;
  width: 102px;
height: 71px;
border-radius: 9px;
}
`
const TitleRightBox = styled.div`
flex: 1;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 142.857% */
`
const NewBottomBox = styled(FlexSBCBox)`
margin-top: 10px;
width: 100%;
`
const TagBox = styled(FlexCCBox)`
  color: #4263EB;
font-family: Work Sans;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 166.667% */
padding: 2px 11px;
border-radius: 24px;
border: 1px solid #4263EB;
background: rgba(66, 99, 235, 0.00);
`


const CoinLeftBox = styled(FlexSBCBox)`

>img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
`
const CoinRightBox = styled(FlexSBCBox)`
width: 100%;
max-width: 180px;
`
const CoinInfo = styled.div`
color: #8E9BAE;

/* Body/Small/regular */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */`

const CoinTopInfo = styled(FlexBox)`
align-items: center;
color: #10192D;
text-transform: uppercase;
/* Body/Medium/bold */
font-family: Manrope;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
>div{
  margin-left: 7px;
  color: #8E9BAE;

/* Body/Small/regular */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
}
`
const CoinMiddle = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  color: #7681AA;
text-align: right;

/* Body / Small / medium */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */
`
const CoinRight = styled.div<{ add: boolean }>`
  flex-direction: column;
  align-items: center;
  color: ${({ add }) => add ? "#22C36B" : "#FE1717"};
text-align: right;

/* Body / Small / medium */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */
`


const CoinContainer = styled.div`
width: 100%;
margin: 30px 0px 83px;
`
const CoinItem = styled(FlexSBCBox)`
width: 100%;
padding: 11px 0px;
margin-bottom:8px;
`




export default function Rank() {
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const state = useSelector<stateType, stateType>(state => state)
  const [NewsList, setNewsList] = useState<any>([])
  const [PriceList, setPriceList] = useState<any>([])
  const [more, setMore] = useState<any>(true)
  const [ActiveTab, setActiveTab] = useState<any>(1)
  const { width } = useViewport()
  const Navigate = useNavigate()


  const ToolsArr = [
    { icon: toolItem1, title: "6", route: "/Tools", tabId: "1" },
    { icon: toolItem2, title: "7", route: "/Market", tabId: "1" },
    { icon: toolItem3, title: "8", route: "/Tools", tabId: "2" },
    { icon: toolItem4, title: "9", route: "/Tools", tabId: "4" },
    { icon: toolItem5, title: "10", route: "/Tools", tabId: "5" },
    { icon: toolItem6, title: "11", route: "/Tools", tabId: "6" },
    { icon: toolItem7, title: "12", route: "/", tabId: "1" },
    { icon: toolItem8, title: "13", route: "/Notice", tabId: "1" },
  ]



  useEffect(() => {
    lastNews().then((res: any) => {
        if (res?.error_code === 0) {
          console.log("lastNews", res?.data)
          setNewsList(res?.data?.data||[])
        }
      })
    getPriceList().then((res: any) => {
        if (res?.error_code === 0) {
          console.log("getPriceList", res?.data)
          setPriceList(res?.data||[])
        }
      })
  }, [])


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
      {/* <BgImg1 src={bgImg1}>

      </BgImg1> */}
      <BannerContainer>
        <BannerBigBox>
          <BannerBigLeftBox>
            <BannerTitle>{t('14')}</BannerTitle>
            <BannerSubTitle>{t('15')}</BannerSubTitle>
            <NoticeContainer>
              <NoticeIconContainer src={NoticeIcon}></NoticeIconContainer>
              <MessageBox preNoticeList={[{ noticeTitle: '16'}, { noticeTitle: '16'}, { noticeTitle: '16' }]} />
            </NoticeContainer>
          </BannerBigLeftBox>
          <BannerBigRightBox src={ImgItem1}>
          </BannerBigRightBox>
        </BannerBigBox>
      </BannerContainer>


      <HomeContent>
        <Carousel autoplay autoplaySpeed={3000} style={{ width: "100%" }} className="myselfCarousel" dots={true}>
        <CoinBigContainer>
            <TopCoinContainer>
            {PriceList?.[0]?.slice(0,3)?.map((item:any,index:any)=><TopCoinItem   key={index}>
                <CoinBox>
                  <CoinName>{item?.symbol}<span>/USDT</span></CoinName>
                  <CoinPriceBox>{item?.current_price}</CoinPriceBox>
                  {item?.price_change_percentage_24h>0?<CoinRate add={true}><img src={arrowUp} alt="" /> +{item?.price_change_percentage_24h}%</CoinRate>:
                  <CoinRate add={false}><img src={arrowUp} alt="" /> {item?.price_change_percentage_24h}%</CoinRate>
                  }
                  <CNYPrice>≈¥{PriceList?.[1]?.slice(0,6)?.[index]?.current_price}</CNYPrice>
                  <CoinBg>
                    <img src={item?.image} alt="" />
                  </CoinBg>
                </CoinBox>
              </TopCoinItem>
          )}
            </TopCoinContainer>
          </CoinBigContainer>

       <CoinBigContainer >
            <TopCoinContainer>
            {PriceList?.[0]?.slice(3,6)?.map((item:any,index:any)=><TopCoinItem  key={index}> 
                <CoinBox>
                  <CoinName>{item?.symbol}<span>/USDT</span></CoinName>
                  <CoinPriceBox>{item?.current_price}</CoinPriceBox>
                  {item?.price_change_percentage_24h>0?<CoinRate add={true}><img src={arrowUp} alt="" /> +{item?.price_change_percentage_24h}%</CoinRate>:
                  <CoinRate add={false}><img src={arrowUp} alt="" /> {item?.price_change_percentage_24h}%</CoinRate>
                  }
                  <CNYPrice>≈¥{PriceList?.[1]?.slice(0,6)?.[index]?.current_price}</CNYPrice>
                  <CoinBg>
                    <img src={item?.image} alt="" />
                  </CoinBg>
                </CoinBox>
              </TopCoinItem>)}

            </TopCoinContainer>
          </CoinBigContainer>
              {/* <CoinItem>
                <CoinBox>
                  <CoinName>ETH<span>/USDT</span></CoinName>
                  <CoinPriceBox>1425.11</CoinPriceBox>
                  <CoinRate add={true}><img src={arrowUp} alt="" /> +1.11%</CoinRate>
                  <CNYPrice>≈$13,445.23</CNYPrice>
                  <CoinBg>
                    <img src={CoinBg2} alt="" />
                  </CoinBg>
                </CoinBox>
              </CoinItem> */}
             {/*  <CoinItem>
                <CoinBox>

                  <CoinName>ETH<span>/USDT</span></CoinName>
                  <CoinPriceBox>1425.11</CoinPriceBox>
                  <CoinRate add={true}><img src={arrowUp} alt="" /> +1.11%</CoinRate>
                  <CNYPrice>≈$13,445.23</CNYPrice>
                  <CoinBg>
                    <img src={CoinBg3} alt="" />
                  </CoinBg>
                </CoinBox>
              </CoinItem>
            </CoinContainer>
          </CoinBigContainer>
          <CoinBigContainer>
            <CoinContainer>
              <CoinItem>
                <CoinBox>

                  <CoinName>ETH<span>/USDT</span></CoinName>
                  <CoinPriceBox>1425.11</CoinPriceBox>
                  <CoinRate add={true}><img src={arrowUp} alt="" /> +1.11%</CoinRate>
                  <CNYPrice>≈$13,445.23</CNYPrice>
                  <CoinBg>
                    <img src={CoinBg1} alt="" />
                  </CoinBg>
                </CoinBox>
              </CoinItem>
              <CoinItem>
                <CoinBox>

                  <CoinName>ETH<span>/USDT</span></CoinName>
                  <CoinPriceBox>1425.11</CoinPriceBox>
                  <CoinRate add={true}><img src={arrowUp} alt="" /> +1.11%</CoinRate>
                  <CNYPrice>≈$13,445.23</CNYPrice>
                  <CoinBg>
                    <img src={CoinBg1} alt="" />
                  </CoinBg>
                </CoinBox>
              </CoinItem>
              <CoinItem>
                <CoinBox>
                  <CoinName>ETH<span>/USDT</span></CoinName>
                  <CoinPriceBox>1425.11</CoinPriceBox>
                  <CoinRate add={true}><img src={arrowUp} alt="" /> +1.11%</CoinRate>
                  <CNYPrice>≈$13,445.23</CNYPrice>
                  <CoinBg>
                    <img src={CoinBg1} alt="" />
                  </CoinBg>
                </CoinBox>
              </CoinItem> */}
            {/* </CoinContainer>
          </CoinBigContainer> */}
        </Carousel>


        <Swiper
          slidesPerView="auto"
          // spaceBetween={30}
          freeMode={true}
          pagination={false}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {ToolsArr.map((item: any, index: any) => <SwiperSlide  key={index} onClick={() => { Navigate("/View" + item?.route, { state: { tabId: item?.tabId } }) }}>
            <ToolsItems>
              <ToolsItem>
                <ToolsBox>
                  <img src={item?.icon} alt="" />
                </ToolsBox>
                {t(item?.title)}
              </ToolsItem>
            </ToolsItems>
          </SwiperSlide>)}
        </Swiper>

        <JoinInTradeCointainrtBox>
          <JoinInTradeCointainrt onClick={() => { Navigate("/View/TradingManage/1") }}>
            <LeftBox>
            {t('17')}
              <div>{t('18')}</div>
            </LeftBox>
            <MidBox src={JoinInTradeBg}></MidBox>
            <RightBox><img src={arrowRight} alt="" /></RightBox>
          </JoinInTradeCointainrt>
        </JoinInTradeCointainrtBox>


        <ContentContainer>
        <NewsTitleBox>
        {t('19')} <span onClick={()=>{Navigate("/View/News")}}>{t('20')}</span>
          </NewsTitleBox> 
          {NewsList?.length>0?NewsList?.slice(0,3).map((item:any,index:any)=><NewsBottomContainer key={index} onClick={()=>{window.open(item?.url)}}>
<NewsBox>
              <NewsBottomTitle>
                <TitleLeftBox>
                  <img src={item?.thumbnail} alt="" />
                </TitleLeftBox>
                <TitleRightBox>
                  {item?.title}
                </TitleRightBox>
              </NewsBottomTitle>
              <NewsContent>&nbsp;&nbsp;&nbsp;&nbsp;{item?.description}</NewsContent>
              <NewBottomBox>
                {/* <TagBox>行业洞察</TagBox> */}
                <TimeBox>
                 {String(item?.createdAt)?.slice(0,-5)}
                  {/* <RadioBox></RadioBox>{item?.createdAt} */}
                </TimeBox>
              </NewBottomBox>
            </NewsBox>
          </NewsBottomContainer>):<NoData/>}
        </ContentContainer>

        <MarketContainer>
          {/* <MarketTabContainer>
            <Tab className={ActiveTab === 1 ? 'ActiveTab' : ""} onClick={() => { setActiveTab(1) }}>热门</Tab>
            <Tab className={ActiveTab === 2 ? 'ActiveTab' : ""} onClick={() => { setActiveTab(2) }}>涨幅榜</Tab>
            <Tab className={ActiveTab === 3 ? 'ActiveTab' : ""} onClick={() => { setActiveTab(3) }}>跌幅榜</Tab>
            <Tab className={ActiveTab === 4 ? 'ActiveTab' : ""} onClick={() => { setActiveTab(4) }}>24H成交量</Tab>
          </MarketTabContainer> */}
          <CoinTitleBox>
          {t('21')} <span onClick={()=>{Navigate("/View/Market")}}>{t('20')}</span>
          </CoinTitleBox>

          <MarketContent>
            <MarketCoinItems>
              {PriceList?.length>0?PriceList?.[0]?.slice(0,5).map((item:any,index:any)=><CoinItem key={index}>

<CoinLeftBox>
  <img src={item?.image} alt="" />
  <CoinInfo>
    <CoinTopInfo>{item?.symbol}
    {/* <CoinTopInfo>{item?.symbol} <div>{item?.name}</div> */}
    </CoinTopInfo>
    {t('22')}($){i18n.language==="zh"?(NumSplic1(new BigNumber(item?.market_cap).div(10**8).toNumber(),2)+"亿"):(NumSplic1(new BigNumber(item?.market_cap).div(10**9).toNumber(),2)+"B")}
  </CoinInfo>
</CoinLeftBox>
<CoinRightBox>

  <CoinMiddle>
    <CoinTopInfo>${item?.current_price}</CoinTopInfo>
    ￥{PriceList?.[1]?.[index]?.current_price}
  </CoinMiddle>
  {Number(item?.price_change_percentage_24h)>0?<CoinRight add={true}>
    +{item?.price_change_percentage_24h}%
  </CoinRight>:<CoinRight add={false}>
    {item?.price_change_percentage_24h}%
  </CoinRight>}
</CoinRightBox>

</CoinItem>):<NoData/>}
              {/* <MarketCoinItem>
                <MarketCoinLeft>
                  <img src={BNBIcon} alt="" />
                  <CoinNameBox>
                    Binance
                    <div>BNB</div>
                  </CoinNameBox>
                </MarketCoinLeft>
                <MarketCoinRight>
                  <MarketLineBox>
                    <img src={MarketLine} alt="" />
                  </MarketLineBox>
                  <MarketPriceBox add={true}>
                    $18,788
                    <div>+0,15%</div>
                  </MarketPriceBox>
                </MarketCoinRight>
              </MarketCoinItem> */}
            </MarketCoinItems>
          </MarketContent>
        </MarketContainer>
      </HomeContent>
    </HomeContainerBox >
  )
}

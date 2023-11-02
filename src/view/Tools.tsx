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
import { AddrHandle } from '../utils/tool';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerBox, FlexBox, FlexCCBox, FlexECBox, FlexSBCBox, FlexSCBox } from '../components/FlexBox'
import { Carousel, Modal, Switch } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import CloseIcon from '../assets/image/closeIcon.svg'
import JoinInTradeBg from '../assets/image/Home/JoinInTradeBg.png'
import infoIcon from '../assets/image/infoIcon.svg'
import pageBg1 from '../assets/image/TradingDetail/pageBg1.png'
import ChainIcon from '../assets/image/Tools/ChainIcon.svg'
import downIcon from '../assets/image/Tools/downIcon.svg'
import WordIcon from '../assets/image/Tools/WordIcon.svg'
import pageBg2 from '../assets/image/pageBg2.png'
import pageBg3 from '../assets/image/pageBg3.png'
import pageBg4 from '../assets/image/pageBg4.png'
import pageBg5 from '../assets/image/pageBg5.png'
import ReturnImg1 from '../assets/image/returnIcon.svg'
import copyIcon from '../assets/image/copyIcon.svg'

import { url } from 'inspector'
import i18n from '../lang/i18n'
import MessageBox from '../components/MessageBox/MessageBox'
import TabContainer1 from '../components/TabContainer/TabContainer1'
import TabContainer2 from '../components/TabContainer/TabContainer2'
import TabContainer3 from '../components/TabContainer/TabContainer3'
import TabContainer4 from '../components/TabContainer/TabContainer4'
import TabContainer5 from '../components/TabContainer/TabContainer5'
import TabContainer6 from '../components/TabContainer/TabContainer6'
import TabContainer7 from '../components/TabContainer/TabContainer7'
import TabContainer8 from '../components/TabContainer/TabContainer8'
import TabContainer9 from '../components/TabContainer/TabContainer9'
import TabContainer10 from '../components/TabContainer/TabContainer10'

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
const BannerContainer = styled(FlexCCBox)`
width: 100%;
padding: 0px 0px;
.mySwiper{
margin: 12px 0px 0px;
.swiper-wrapper {
    justify-content: space-between;
    .swiper-slide {
      width:fit-content;
  }
  >div{
    &:last-child{
  padding-right: 16px;
}
}
}
}
`

const HomeContent = styled.div`
width: 100%;
padding-bottom: 83px;
padding: 0px 25px 56px; 
@media (max-width:768px) {
padding: 0px 12px 56px; 
  
}
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
margin-top: 26px;
.ActiveTab{
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
line-height: 150%; /* 21px */
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
line-height: 150%; /* 21px */
border: 1px solid transparent;
background: transparent;
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
`
const NewTimeBox = styled.div`
font-family: Work Sans;
font-size: 14px;
font-style: normal;
text-align: center;
width: 100%;
font-weight: 800;
line-height: 20px; /* 142.857% */
background: var(--001, linear-gradient(131deg, #4263EB -0.46%, #A851FF 103.67%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
margin: 15px 0px;
`

const ContentContainer = styled.div`
width: 100%;
margin-bottom: 26px;
`
const NewsContainer = styled.div`
width: 100%;
margin-bottom: 26px;
`
const TimeBox = styled(FlexBox)`
  align-items: center;
  color:#7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
margin-bottom: 6px;
>div{
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
const NewsTitle = styled(FlexBox)`
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
  
  color: #7681AA;
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
const ToolsItems = styled(FlexSBCBox)` 
width: fit-content;
padding-left:  16px;

`

const ToolsItem = styled(FlexBox) <{ active: any }>` 
padding: 8px 16px;
border-radius: 20px;
border: 1px solid #21D7FF;
background: ${({ active }) => active ? "linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%)" : "#FFF"};
/* 投影1 */
/* box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07); */
flex-direction: column;
align-items: center;
color: ${({ active }) => active ? "#FFF" : "#7681AA"};
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px; /* 157.143% */
letter-spacing: 0.112px;
`

export default function Rank() {
  const { state: stateObj } = useLocation()
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const state = useSelector<stateType, stateType>(state => state)
  const [HomePrice, setHomePrice] = useState<any>([])
  const [OpenBindModal, setOpenBindModal] = useState<any>(false)
  const [ActiveTab, setActiveTab] = useState<any>(1)
  const [ActiveSubTab, setActiveSubTab] = useState<any>(1)
  const { width } = useViewport()
  const Navigate = useNavigate()


  const ToolsArr = [
    { title: t("130"), activeTab: "1" },
    // { title: "行情异动", activeTab: "2" },
    { title: t("131"), activeTab: "2" },
    { title: t("132"), activeTab: "3" },
    { title: t("133"), activeTab: "4" },
    { title: t("134"), activeTab: "5" },
    { title: t("135"), activeTab: "6" },
    { title: t("136"), activeTab: "7" },
    { title: t("137"), activeTab: "8" },
    { title: t("138"), activeTab: "9" },
    { title: t("139"), activeTab: "10" },
  ]
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
  useEffect(() => {
    
    if (stateObj?.tabId) {
      setActiveTab(stateObj?.tabId)
    }
  }, [stateObj?.tabId])


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
        <Swiper
          slidesPerView="auto"
          // spaceBetween={30}
          freeMode={true}
          pagination={false}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {ToolsArr.map((item: any, index: any) => <SwiperSlide key={index} >
            <ToolsItems>
              <ToolsItem active={Number(item?.activeTab) === Number(ActiveTab)} onClick={() => { setActiveTab(item?.activeTab) }}>
                {item?.title}
              </ToolsItem>
            </ToolsItems>
          </SwiperSlide>)}
        </Swiper>
      </BannerContainer>

      <HomeContent>
        {Number(ActiveTab) === 1 && <TabContainer1></TabContainer1>}
        {Number(ActiveTab) === 2 && <TabContainer2></TabContainer2>}
        {Number(ActiveTab) === 3 && <TabContainer3></TabContainer3>}
        {Number(ActiveTab) === 4 && <TabContainer4></TabContainer4>}
        {Number(ActiveTab) === 5 && <TabContainer5></TabContainer5>}
        {Number(ActiveTab) === 6 && <TabContainer6></TabContainer6>}
        {Number(ActiveTab) === 7 && <TabContainer7></TabContainer7>}
        {Number(ActiveTab) === 8 && <TabContainer8></TabContainer8>}
        {Number(ActiveTab) === 9 && <TabContainer9></TabContainer9>}
        {Number(ActiveTab) === 10 && <TabContainer10></TabContainer10>}

      </HomeContent>


    </HomeContainerBox >
  )
}

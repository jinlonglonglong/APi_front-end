import React, { useState, useEffect } from 'react'
import { getHomePrice, lastNews } from '../API/index'
import '../assets/style/Home.scss'
import NoData from '../components/NoData'
import Table from '../components/Table'
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { stateType } from '../store/reducer';
import styled, { keyframes } from 'styled-components';
import { useViewport } from '../components/viewportContext';
import { AddrHandle, dateFormat } from '../utils/tool';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ContainerBox, FlexBox, FlexCCBox, FlexECBox, FlexSBCBox, FlexSCBox } from '../components/FlexBox'
import { Carousel, Modal } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
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
import NewsImg from '../assets/image/News/NewsImg.png'
import pageBg2 from '../assets/image/pageBg2.png'
import pageBg3 from '../assets/image/pageBg3.png'
import pageBg4 from '../assets/image/pageBg4.png'
import pageBg5 from '../assets/image/pageBg5.png'
import ReturnImg1 from '../assets/image/returnIcon.svg'
import copyIcon from '../assets/image/copyIcon.svg'

import { url } from 'inspector'
import i18n from '../lang/i18n'
import MessageBox from '../components/MessageBox/MessageBox'

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
padding: 0px 43px;
`

const HomeContent = styled.div`
width: 100%;
padding-bottom: 83px;
padding: 0px 25px 16px; 
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
margin-bottom: 83px;
/* >div{
  &:last-child{
margin-bottom:0px;
}} */
`


const NewsContainer = styled.div`
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
  max-width: 147px;
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







export default function Rank() {
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const state = useSelector<stateType, stateType>(state => state)
  const [HomePrice, setHomePrice] = useState<any>([])
  const [OpenBindModal, setOpenBindModal] = useState<any>(false)
  const [ActiveTab, setActiveTab] = useState<any>(1)
  const [ActiveSubTab, setActiveSubTab] = useState<any>(2)
  const [ActiveManageSubTab, setActiveManageSubTab] = useState<any>(1)
  const [NewsList, setNewsList] = useState<any>([])

  const { width } = useViewport()
  const Navigate = useNavigate()


  const ToolsArr = [
    { icon: toolItem1, title: "批量归集钱包", route: "/" },
    { icon: toolItem2, title: "行情异动", route: "/" },
    { icon: toolItem3, title: "批量打币", route: "/" },
    { icon: toolItem4, title: "靓号生成", route: "/" },
  ]



  useEffect(() => {
    lastNews().then((res: any) => {
        // if (res?.code === 200) {
          console.log("lastNews", res?.data)
          setNewsList(res?.data?.data||[])
        // }
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

      <BgImg1 src={pageBg1}></BgImg1>
      <BgImg2 src={pageBg2}></BgImg2>
      <BgImg3 src={pageBg3}></BgImg3>
      <BgImg4 src={pageBg4}></BgImg4>
      <BgImg5 src={pageBg5}></BgImg5>
      <BannerContainer>
        <SubTabContainer>
          {/* <SubTab className={ActiveSubTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(1) }}>快讯</SubTab> */}
          {/* <SubTab className={ActiveSubTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(2) }}>资讯</SubTab> */}
          <SubTab className="ActiveTab">{t('3')}</SubTab>
        </SubTabContainer>
      </BannerContainer>

      <HomeContent>
        <NewTimeBox>{dateFormat("YYYY-mm-dd HH:MM:SS",new Date())}</NewTimeBox>
        {/* {ActiveSubTab === 1 && <ContentContainer>
          <NewsContainer>
            <TimeBox>
              <RadioBox></RadioBox>33分钟前
            </TimeBox>
            <NewsBox>
              <NewsTitle>过去30天DMarket销售额超越BAYC排名第一，实为该平台支持CSGO皮肤交易</NewsTitle>
              <NewsContent>BlockBeats 消息，9 月 23 日，Cryptoslam 数据显示过去 30 天销售额最高的 NFT 藏品系列为 DMarket (约3133 万美元)，超过 BAYC 过去 30 天销售额 (约 186.</NewsContent>
            </NewsBox>
          </NewsContainer>
        </ContentContainer>} */}

        {ActiveSubTab === 2 && <ContentContainer>
          
          {NewsList?.map((item:any,index:any)=><NewsContainer key={index} onClick={()=>{window.open(item?.url)}}>
<NewsBox>
              <NewsTitle>
                <TitleLeftBox>
                  <img src={item?.thumbnail} alt="" />
                </TitleLeftBox>
                <TitleRightBox>
                  {item?.title}
                </TitleRightBox>
              </NewsTitle>
              <NewsContent>&nbsp;&nbsp;&nbsp;&nbsp;{item?.description}</NewsContent>
              <NewBottomBox>
                {/* <TagBox>行业洞察</TagBox> */}
                <TimeBox>
                 {String(item?.createdAt)?.slice(0,-5)}
                  {/* <RadioBox></RadioBox>{item?.createdAt} */}
                </TimeBox>
              </NewBottomBox>
            </NewsBox>
          </NewsContainer>)}
          {NewsList?.length>0&&<NoMoreContainer>
            {t('24')}...
          </NoMoreContainer>}
        </ContentContainer>}
      </HomeContent>


    </HomeContainerBox >
  )
}

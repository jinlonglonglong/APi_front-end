import React, { useState, useEffect, useRef } from 'react'
import { getHomePrice, getPriceList } from '../API/index'
import '../assets/style/Home.scss'
import NoData from '../components/NoData'
import Table from '../components/Table'
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { stateType } from '../store/reducer';
import styled, { keyframes } from 'styled-components';
import { useViewport } from '../components/viewportContext';
import { AddrHandle, NumSplic1, addMessage, startWord } from '../utils/tool';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerBox, FlexBox, FlexCCBox, FlexECBox, FlexSBCBox, FlexSCBox } from '../components/FlexBox'
import { Carousel, Modal } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import BigNumber from 'big.js'
import HomeBgImg from '../assets/image/Home/HomeBgImg.png'
import ImgItem1 from '../assets/image/Home/ImgItem1.png'
import toolItem1 from '../assets/image/Home/toolItem1.svg'
import toolItem2 from '../assets/image/Home/toolItem2.svg'
import toolItem3 from '../assets/image/Home/toolItem3.svg'
import toolItem4 from '../assets/image/Home/toolItem4.svg'
import searchIcon from '../assets/image/Market/searchIcon.svg'
import BTC from '../assets/image/Market/BTC.svg'
import CloseIcon from '../assets/image/closeIcon.svg'
import JoinInTradeBg from '../assets/image/Home/JoinInTradeBg.png'
import infoIcon from '../assets/image/infoIcon.svg'
import pageBg1 from '../assets/image/TradingDetail/pageBg1.png'
import pageBg2 from '../assets/image/pageBg2.png'
import pageBg3 from '../assets/image/pageBg3.png'
import pageBg4 from '../assets/image/pageBg4.png'
import pageBg5 from '../assets/image/pageBg5.png'
import ReturnImg1 from '../assets/image/returnIcon.svg'
import copyIcon from '../assets/image/copyIcon.svg'

import { url } from 'inspector'
import i18n from '../lang/i18n'
import MessageBox from '../components/MessageBox/MessageBox'
import ReactDOM from 'react-dom'

const HomeContainerBox = styled(ContainerBox)`
padding: 0px;
position: relative;
width: 100%;
color: #fff;
height: 100%;
/* overflow: hidden; */
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
padding: 0px 25px;
`

const HomeContent = styled.div`
width: 100%;
padding-bottom: 83px;
padding: 0px 25px; 
`
const FilterBox = styled(FlexSBCBox)`
width: 100%;
>div{
  display: flex;justify-content: space-between;
  &:nth-child(2){
width: 100%;
max-width: 180px;
  }
}
`
const FilterItems = styled(FlexSBCBox)`
width: fit-content;
color: #000;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
>img{
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
`
const FilterItem = styled(FlexSBCBox)`
width: fit-content;
color: #000;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
margin-left: 12px;
&:first-child{
margin-left: 0px;
}
`
const BtnSmallBox = styled(FlexBox)`
flex-direction: column;
align-items: center;
width: fit-content;
margin-left: 10px;
`
const BtnTop = styled.div`
width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom: 5px solid blue;
    `
const BtnBottom = styled.div`
margin-top: 5px;
width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 5px solid blue;
    `


// const SubTabContainer = styled(FlexBox)`
// /* max-width: 290px; */
// align-items: center;
// padding: 18px 16px;
// width: 100%;
// border-radius: 16px;
// border: 1px solid #E2E8F0;
// background: #FFF;
// flex-shrink: 0;
// margin:12px 0px 26px;
// >input{
//   margin-left: 16px;
//   color:#8E9BAE;
// text-align: left;
// border: none;
// background: transparent;

// /* Body/Medium/regular */
// font-family: Manrope;
// font-size: 14px;
// font-style: normal;
// font-weight: 400;
// line-height: 140%; /* 19.6px */
// }
// >img{
//   width: 24px;
//   height: 24px;

// }

// `


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

const CoinContainer = styled.div`
width: 100%;
margin: 30px 0px 83px;
`
const CoinItem = styled(FlexSBCBox)`
width: 100%;
padding: 11px 0px;
margin-bottom:8px;
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
@media (max-width:375px) {
  max-width: 160px;

  
}
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








export default function Rank() {
  const aboutSection = useRef(null);
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const state = useSelector<stateType, stateType>(state => state)
  const [HomePrice, setHomePrice] = useState<any>([])
  const [OpenBindModal, setOpenBindModal] = useState<any>(false)
  const [PriceList, setPriceList] = useState<any>([])
  
  const { width } = useViewport()
  const Navigate = useNavigate()
  const location = useLocation();
  const pathname = startWord(location.pathname)



  const scrollDown = () => {
    console.log('nihao');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    document.body.scrollTo(0, 0)
    // aboutSection.current.scrollTop = 0
  };

  // const container = ReactDOM.findDOMNode(aboutSection);
  // container.scrollTop = "125px"

  useEffect(() => {

    getPriceList().then((res: any) => {
        if (res?.error_code === 0) {
          console.log("getPriceList", res?.data)
          setPriceList(res?.data||[])
        }else{
          addMessage(res?.error_msg)
        }
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      scrollDown()
    }, 500)
  }, [pathname])

  return (
    <HomeContainerBox ref={aboutSection}>
      <BgBox1>
      </BgBox1>
      <BgBox2>
      </BgBox2>
      <BgBox3>
      </BgBox3>
      <BgBox4 >
      </BgBox4>

      <BgImg1 src={pageBg1}></BgImg1>
      <BgImg2 src={pageBg2}></BgImg2>
      <BgImg3 src={pageBg3}></BgImg3>
      <BgImg4 src={pageBg4}></BgImg4>
      <BgImg5 src={pageBg5}></BgImg5>
      {/* <BannerContainer>
        <SubTabContainer>
          <img src={searchIcon} alt="" /><input type="text" placeholder='Search...' />
        </SubTabContainer>
      </BannerContainer> */}

<BannerContainer>
        <SubTabContainer>
          {/* <SubTab className={ActiveSubTab === 1 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(1) }}>快讯</SubTab> */}
          {/* <SubTab className={ActiveSubTab === 2 ? "ActiveTab" : ""} onClick={() => { setActiveSubTab(2) }}>资讯</SubTab> */}
          <SubTab className="ActiveTab">{t('21')}</SubTab>
        </SubTabContainer>
      </BannerContainer>

      <HomeContent>
        {/* <FilterBox>
          <FilterItems>
            <img src={searchIcon} alt="" />名称
          </FilterItems>
          <FilterItems>
            <FilterItem>全球指数
              <BtnSmallBox>
                <BtnTop></BtnTop>
                <BtnBottom></BtnBottom>
              </BtnSmallBox>
            </FilterItem>
            <FilterItem>24H涨幅
              <BtnSmallBox>
                <BtnTop></BtnTop>
                <BtnBottom></BtnBottom>
              </BtnSmallBox>
            </FilterItem>
          </FilterItems>
        </FilterBox> */}

        <CoinContainer>
          {PriceList?.[0]?.map((item:any,index:any)=><CoinItem key={index}>

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

          </CoinItem>)}
          {PriceList?.length>0&&<NoMoreContainer>
            {t('24')}...
          </NoMoreContainer>}

        </CoinContainer>

      </HomeContent>


    </HomeContainerBox >
  )
}

import React, { useState, useEffect } from 'react'
import { getHomePrice, getPriceList } from '../API/index'
import '../assets/style/Home.scss'
import NoData from '../components/NoData'
import Table from '../components/Table'
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { stateType } from '../store/reducer';
import styled, { keyframes } from 'styled-components';
import { useViewport } from '../components/viewportContext';
import { AddrHandle, EthertoWei, NumSplic } from '../utils/tool';
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
import WalletCardIcon from '../assets/image/My/WalletCardIcon.png'
import ToGoIcon from '../assets/image/My/ToGoIcon.svg'
import AboutIcon from '../assets/image/My/AboutIcon.svg'
import ContractIcon from '../assets/image/My/ContractIcon.svg'
import NoticeIcon from '../assets/image/My/NoticeIcon.svg'
import VerSionIcon from '../assets/image/My/VerSionIcon.svg'
import BTC from '../assets/image/Market/BTC.svg'
import BNB from '../assets/image/Market/BNB.svg'
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
import { Contracts } from '../web3'
import { MyCoinAssets } from '../config'

const HomeContainerBox = styled(ContainerBox)`
padding: 0px 25px;
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
position: relative;
width: 100%;
padding: 17px 20px;
margin: 37px 0px 24px;
color: #15141F;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 900;
line-height: 140%; /* 22.4px */
text-align: left;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`

const HomeContent = styled.div`
width: 100%;
padding-bottom: 83px;
/* padding: 0px 25px;  */
`

const CoinContainer = styled.div`
width: 100%;
margin: 0px 0px 23px;
`
const CoinItem = styled(FlexSBCBox)`
width: 100%;
padding: 11px 0px;
margin-bottom: 8px;
`
const CoinLeftBox = styled(FlexSBCBox)`

>img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
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
  color: #04DAFE;

text-align: right;

/* Body / Small / medium */
font-family: Manrope;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 18px */F
`


const BannerImg = styled.div`
position: absolute;
top: 0px;
right: 0px;
transform: translateY(-50%);
>img{
  max-width: 125px;
}
`

const BannerValue = styled(FlexSBCBox)`
margin: 10px 0px ;
    padding: 8px 13px;
    border-radius: 10px;
  background: rgba(66, 154, 235, 0.12);
  color: #4263EB;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 33.6px */

  `
const CoinName = styled(FlexBox)`
height: 100%;
align-items: end;
  color: #7681AA;
font-family: Manrope;
font-size: 16px;
font-style: normal;
font-weight: 700;
/* line-height: 140%; */
  `
const EqualUSD = styled.div`
 color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */   
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

const NavContainer = styled.div`
  width: 100%;
`
const NavItem = styled(FlexSBCBox)`
  width: 100%;
  padding: 16px 22px ;
  border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
margin-bottom: 12px;
`
const NavLeftBox = styled(FlexSBCBox)`
  width: fit-content;
  color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 19.6px */
  >img{
    margin-right: 13px;
  }
`
const NavRightBox = styled(FlexSBCBox)`
  width: fit-content;
  color: #7681AA;
font-family: Source Han Sans CN;
font-size: 10px;
font-style: normal;
font-weight: 350;
line-height: 20px; /* 200% */
>img{
  margin-left: 20px;
}
`








export default function Rank() {
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const state = useSelector<stateType, stateType>(state => state)
  const [BalanceList, setBalanceList] = useState<any>([])
  const [PriceList, setPriceList] = useState<any>([])
  const { width } = useViewport()
  const Navigate = useNavigate()


 

  const GetInitData = () => {

    let Arr: any = [];
    for (const item of MyCoinAssets) {
      if(String(item?.name)==="BNB") {
        
        Contracts.example.getBalance(account as string).then((res: any) => {
          console.log(res, 'res');
          Arr.push({ ...item, "balance": EthertoWei(res??"0") })
          setBalanceList(Arr)

        })
      }else{
        Contracts.example.balanceOf(account as string, item?.contractAddress).then((res: any) => {
          console.log(res, 'res');
          Arr.push({ ...item, "balance": EthertoWei(res??"0") })
         
          if (Arr.length === MyCoinAssets.length) {
            // GroupArr = Arr
            console.log(Arr, "Arr1212");
            setBalanceList(Arr)
          }
        })
      }
    }
    // Contracts.example.balanceOf(account as string, contractAddress?.USDT).then((res: any) => {
    //   setBalance(new BigNumber(res).div(10 ** 18).toString())
    // })

  }

  const initPriceFun=()=>{
    getPriceList().then((res: any) => {
      if (res?.error_code === 0) {
        console.log("getPriceList", res?.data)
        setPriceList(res?.data||[])
      }
    })
  }

  useEffect(() => {
    if (account) {
      GetInitData()
      initPriceFun()
    }
  }, [account])


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
        <BannerImg><img src={WalletCardIcon} alt="" /></BannerImg>
        {t('25')}
        <BannerValue>
          {NumSplic(BalanceList[0]?.balance*(PriceList[0]?.find((item:any)=>item?.symbol==="bnb")?.current_price??0),2)} <CoinName>USD</CoinName>
        </BannerValue>

        <EqualUSD>  ≈¥{NumSplic(BalanceList[0]?.balance*(PriceList[1]?.find((item:any)=>item?.symbol==="bnb")?.current_price??0),2)}</EqualUSD>
      </BannerContainer>

      <HomeContent>

        <CoinContainer>
          {BalanceList?.map((item:any,index:any)=><CoinItem key={index}>

            <CoinLeftBox>
              <img src={BNB} alt="" />
              <CoinInfo>
                <CoinTopInfo>BNB <div>BINANCE</div></CoinTopInfo>
                BNB
              </CoinInfo>
            </CoinLeftBox>
            <CoinMiddle>
              <CoinTopInfo>{NumSplic(BalanceList[0]?.balance,4)}</CoinTopInfo>
              ${NumSplic(BalanceList[0]?.balance*(PriceList[0]?.find((item:any)=>item?.symbol==="bnb")?.current_price??0),2)}
            </CoinMiddle>

          </CoinItem>)}

        </CoinContainer>


        <NavContainer>
          <NavItem>
            <NavLeftBox><img src={AboutIcon} alt="" />{t('26')}</NavLeftBox>
            <NavRightBox><img src={ToGoIcon} alt="" /></NavRightBox>
          </NavItem>
        </NavContainer>
        <NavContainer>
          <NavItem onClick={()=>{Navigate("/View/Notice")}}>
            <NavLeftBox><img src={NoticeIcon} alt="" />{t('27')}</NavLeftBox>
            <NavRightBox><img src={ToGoIcon} alt="" /></NavRightBox>
          </NavItem>
        </NavContainer>
        <NavContainer>
          <NavItem>
            <NavLeftBox><img src={ContractIcon} alt="" />{t('28')}</NavLeftBox>
            <NavRightBox><img src={ToGoIcon} alt="" /></NavRightBox>
          </NavItem>
        </NavContainer>
        <NavContainer>
          <NavItem>
            <NavLeftBox><img src={VerSionIcon} alt="" />{t('29')}</NavLeftBox>
            <NavRightBox>V1.0<img src={ToGoIcon} alt="" /></NavRightBox>
          </NavItem>
        </NavContainer>




      </HomeContent>


   


    </HomeContainerBox >
  )
}

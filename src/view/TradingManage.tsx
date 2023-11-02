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
import { AddrHandle, addMessage, showLoding } from '../utils/tool';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ContainerBox, FlexBox, FlexCCBox, FlexECBox, FlexSBCBox, FlexSCBox } from '../components/FlexBox'
import { Carousel, Modal } from 'antd'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import web3 from 'web3'
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
import AvtorIcon2 from '../assets/image/TradeManage/AvtorIcon2.svg'
import AvtorIcon3 from '../assets/image/TradeManage/AvtorIcon3.svg'
import AvtorIcon4 from '../assets/image/TradeManage/AvtorIcon4.svg'
import AvtorIcon5 from '../assets/image/TradeManage/AvtorIcon5.svg'
import AvtorIcon6 from '../assets/image/TradeManage/AvtorIcon6.svg'
import AvtorIcon7 from '../assets/image/TradeManage/AvtorIcon7.svg'
import AvtorIcon8 from '../assets/image/TradeManage/AvtorIcon8.svg'
import AvtorIcon9 from '../assets/image/TradeManage/AvtorIcon9.svg'
import AvtorIcon10 from '../assets/image/TradeManage/AvtorIcon10.svg'
import SettingIcon from '../assets/image/TradeManage/SettingIcon.svg'
import CloseIcon from '../assets/image/closeIcon.svg'
import JoinInTradeBg from '../assets/image/Home/JoinInTradeBg.png'
import infoIcon from '../assets/image/infoIcon.svg'
import pageBg1 from '../assets/image/pageBg1.png'
import pageBg2 from '../assets/image/pageBg2.png'
import pageBg3 from '../assets/image/pageBg3.png'

import { url } from 'inspector'
import i18n from '../lang/i18n'
import MessageBox from '../components/MessageBox/MessageBox'
import { Contracts } from '../web3'
import { contractAddress } from '../config'
import { log } from 'console'
import { Group } from 'antd/lib/avatar'

const HomeContainerBox = styled(ContainerBox)`
padding: 0px;
position: relative;
width: 100%;
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
z-index: -999;

filter: blur(97px);
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


const BannerBigBox = styled(FlexSBCBox)`
padding: 33px 41px;
width: 100%;
position: relative;
height: 123px;
@media (max-width:375px) {
padding: 24px 16px;
  
}
`
const BannerBigLeftBox = styled.div`
    width: 60%;
`
const BannerBigRightBox = styled.img`
position: absolute;
right: 16px;
top: 0px;
width: 50%;
z-index: -999;

`
const BannerBg = styled.img`
position: absolute;
left: 27px;
top: 24px;
width: 103px;
z-index: -9999;
`


const HomeContent = styled.div`
width: 100%;
padding-bottom: 83px;
`


const BannerTitle = styled(FlexBox)`

text-align: center;
text-shadow: 0px -2px 11px rgba(66, 99, 235, 0.15);
font-family: Source Han Sans CN;
font-size: 24px;
font-style: normal;
font-weight: 900;
line-height: 26px; /* 108.333% */
letter-spacing: 0.192px;
background: var(--003, linear-gradient(114deg, #4790FF 10.7%, #04C2FE 88.65%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

const StepContainer = styled.div`
width: 100%;
padding: 0px 27px;
@media (max-width:375px) {
padding: 0px 16px;
}

`
const StepBox = styled.div`
width: 100%;
border-radius: 10px;
background: #FFF;
padding: 15px 27px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`
const StepTitle = styled.div` 
color: #2D2D2D;
text-align: center;
font-family: Source Han Sans CN;
font-size: 16px;
font-style: normal;
font-weight: 900;
line-height: 26px; /* 162.5% */
letter-spacing: 0.128px;
margin-bottom: 18px;
`
const StepItem = styled(FlexBox)`
justify-content: flex-start;
align-items: center;
color: #2D2D2D;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 26px; /* 185.714% */
letter-spacing: 0.112px;
@media (max-width:375px) {
  line-height: normal;

  
}
`
const StepNum = styled(FlexCCBox)`
margin-right: 10px;
    color: #4263EB;
text-align: center;
font-family: YouSheBiaoTiHei;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 26px; /* 108.333% */
letter-spacing: 0.192px;
`
const StepImgItem = styled(FlexCCBox)`
  width: 100%;
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
  width: 100%;
  color: #000;
text-align: left;
font-family: Source Han Sans CN;
font-size: 12px;
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
cursor: pointer;
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
const SelectUnion = styled.div`
margin-top: 37px;
  width: 100%;
  padding: 0px 16px;
 `
const SelectUnionTitle = styled(FlexBox)`
margin-bottom: 26px;

align-items: center;

text-align: center;
/* 投影1 */
text-shadow: 0px 16px 11px rgba(66, 99, 235, 0.07);
font-family: Source Han Sans CN;
font-size: 20px;
font-style: normal;
font-weight: 900;
line-height: 26px; /* 130% */
letter-spacing: 0.16px;
background: var(--002, linear-gradient(114deg, #6CB6FF 10.7%, #04DAFE 88.65%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
 `

const UnionItemsBox = styled.div`
  width: 100%;
  
 `
const UnionItems = styled(FlexSBCBox)`
flex-wrap: wrap;

  width: 100%;
  margin-bottom: 32px;
 `
const UnionActiveItems = styled(FlexSBCBox)`
  width: 100%;
  margin-bottom: 19px;
 `
const UnionItem = styled(FlexCCBox)`
  width: 50%;
  padding:0px 5px;
  margin-bottom: 32px;
 `
const UnionActiveItem = styled(FlexCCBox)`
  width: 33.33%;
  padding:0px 7px;
 `
const Item = styled(FlexBox)`
flex-direction: column;
align-items: center;
border-radius: 15px;
position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 12px;
 `
const AvtorIcon = styled(FlexCCBox)`
margin-bottom: 3px;
 `
const AvtorTitle = styled(FlexCCBox)`
margin-bottom: 12px;
color: #15141F;
text-align: center;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 900;
line-height:100%; /* 216.667% */
letter-spacing: 0.096px;
min-height: 33px;
@media (max-width:375px) {
  line-height: normal;

  
}
 `
const Btn = styled(FlexCCBox) <{ active: boolean }>`
position: absolute;
bottom: 0;
transform: translateY(50%);
border-radius: 20px;
background: ${({ active }) => active ? "linear-gradient(180deg, #6CB6FF 0%, #04DAFE 100%)" : "#7681AA"};
color: #FFF;
text-align: center;
text-shadow: 0px 0px 3px rgba(66, 99, 235, 0.78);
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 26px; /* 216.667% */
letter-spacing: 0.096px;
padding: 3px 23px;
 `
const BoundBtn = styled(FlexCCBox) <{ active: boolean }>`
/* transform: translateY(50%); */
border-radius: 10px;
background: ${({ active }) => active ? "linear-gradient(180deg, #6CB6FF 0%, #04DAFE 100%)" : "#7681AA"};
color: #FFF;
text-align: center;
text-shadow: 0px 0px 3px rgba(66, 99, 235, 0.78);
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 26px; /* 216.667% */
letter-spacing: 0.096px;
padding: 7px 41px;
 `





export default function Rank() {
  const params = useParams<any>()
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const state = useSelector<stateType, stateType>(state => state)
  const [ArrList, setArrList] = useState<any>([])
  const [OpenBindModal, setOpenBindModal] = useState<any>(false)
  const [topAddress, setTopAddress] = useState<any>()
  const [CurrentItem, setCurrentItem] = useState<any>()
  const { width } = useViewport()
  const Navigate = useNavigate()


  const GroupArr = [
    // { id: 1, icon: AvtorIcon1, title: "274", contractAddress: "0x23432533f70962158e2f854b9A6014ce149A931b", defaultAddress: " 0x9610B26afA8727b42A4C9Da81eA697cAc2431cC0", "coinAddress": "0x55d398326f99059fF775485246999027B3197955" },
    // { id: 2, icon: AvtorIcon2, title: "275", contractAddress: "0xf9C3162cB05cAF4886d81cf731B5C663B7B772Bc", defaultAddress: "0xd8F80A99559EFf7aA35b34E7Fe0BdBCe2d075e14", "coinAddress": "0x55d398326f99059fF775485246999027B3197955" },
    { id: 3, icon: AvtorIcon3, title: "276", contractAddress: "0xB59873874d869df130Cc7d08043f22DF416Aa28e", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
    { id: 4, icon: AvtorIcon4, title: "277", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
    { id: 5, icon: AvtorIcon5, title: "278", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
    { id: 6, icon: AvtorIcon6, title: "279", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
    { id: 7, icon: AvtorIcon7, title: "280", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
    { id: 8, icon: AvtorIcon8, title: "281", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
    { id: 9, icon: AvtorIcon9, title: "282", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
    { id: 10, icon: AvtorIcon10, title: "283", contractAddress: "", defaultAddress: "0xCb75C706a45fefF971359F53dF7DD6dF47a41013", "coinAddress": contractAddress.unionCoin },
   
  ]

  const bindFun = (address: any, contractAddress: any) => {
    if (!account) return addMessage(t("Please link wallet"))
    if ((!address) || (!contractAddress)) return addMessage(t("31"))
    if (account) {
      showLoding(true)
      Contracts.example.boundReferrer(account, 'AAA_greoup', contractAddress, address).then((res: any) => {
      if(res?.status){
        showLoding(false)
        console.log(res,'res');
        addMessage(t("Binding successful"))
        setOpenBindModal(false)
        Navigate(`/View/TradingDetail`, { state: CurrentItem })
        getData()
      }else{
          showLoding(false)
        addMessage(t("Binding failed"))

        }
      }).catch((res:any) => {
        console.log(res,'xiaohuli');
        // if(!res?.status||res.code===4001){
          showLoding(false)

          addMessage(t("Binding failed"))
        // }
      })
    }
  }

  const openModalFun = (data: any) => {
    if (data?.active) {
      Navigate(`/View/TradingDetail`, { state: data })
    }else if(!!data?.contractAddress){
      setTopAddress("")
      setOpenBindModal(true)
      setCurrentItem(data)
    } else {
      addMessage(t("Open soon"))
    }
  }
  const inputAddress = (e: any) => {
    let value = e.target.value.trim()
    setTopAddress(value)
  }

  const getData = async() => {
    let Arr: any = [];
    for (const item of GroupArr) {
      if(!!item?.contractAddress){  
      await  Contracts.example.bound(account as string, 'AAA_greoup', item?.contractAddress).then((res: any) => {
          Arr.push({ ...item, "active": res })
          let tag = web3.utils.isAddress(params?.address || "")
          if (tag && Number(params?.teamId) === Number(item?.id) && (!res)) {
            openModalFun(item)
            setTopAddress(params?.address)
          }
          console.log(Arr, "GroupArr");
          if (Arr.length === GroupArr.length) {
            // GroupArr = Arr
            console.log(Arr, "Arr1212");
            // setArrList(Arr)
          }
        })
      }else{
          Arr.push({ ...item, "active": false })
        }
    }
    setArrList(Arr)
  }

  useEffect(() => {
    if (account) {
      let active: any
      // let Arr = GroupArr.map((item: any) => {
      //   Contracts.example.bound(account as string, 'AAA_greoup', item?.contractAddress).then((res: any) => {
      //     active = res
      //   })
      //   console.log(active, 'active');
      //   return {
      //     ...item, "active": active
      //   }
      // })
      getData()
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
      <BannerContainer>
        <BannerBigBox>
          <BannerBg src={TradeManageLeftBanner}>
          </BannerBg>
          <BannerBigLeftBox>
            <BannerTitle>{t('32')}</BannerTitle>
          </BannerBigLeftBox>
          <BannerBigRightBox src={TradeManageBanner}>
          </BannerBigRightBox>
        </BannerBigBox>
      </BannerContainer>


      <HomeContent>
        <StepContainer>
          <StepBox>
            <StepTitle>{t('33')}</StepTitle>
            <StepItem>
              <StepNum><img src={Icon01} alt="" /></StepNum>
              {t('34')}
            </StepItem>
            <StepImgItem><img src={StepImg1} alt="" /></StepImgItem>
            <StepItem>
              <StepNum><img src={Icon02} alt="" /></StepNum>
              {t('35')}
            </StepItem>
            <StepImgItem><img src={StepImg1} alt="" /></StepImgItem>
            <StepItem>
              <StepNum><img src={Icon03} alt="" /></StepNum>
              {t('36')}
            </StepItem>
            <StepImgItem><img src={StepImg1} alt="" /></StepImgItem>
          </StepBox>
        </StepContainer>

        <SelectUnion>
          <SelectUnionTitle><img src={SettingIcon} alt="" />{t('37')}</SelectUnionTitle>
          <UnionItemsBox>
            <UnionItems>
              {account?ArrList?.map((item: any, index: any) => <UnionItem key={index}>
                <Item>
                  <AvtorIcon><img src={item?.icon} alt="" /></AvtorIcon>
                  <AvtorTitle>{t(item?.title)}</AvtorTitle>
                  <Btn active={item?.contractAddress} onClick={() => { openModalFun(item) }}>{t('38')}</Btn>
                </Item>
              </UnionItem>):GroupArr?.map((item: any, index: any) => <UnionItem key={index}>
                <Item>
                  <AvtorIcon><img src={item?.icon} alt="" /></AvtorIcon>
                  <AvtorTitle>{t(item?.title)}</AvtorTitle>
                  <Btn active={false} onClick={() => { openModalFun(item) }}>{t('38')}</Btn>
                </Item>
              </UnionItem>)}
              {/* <UnionItem>
                <Item>
                  <AvtorIcon><img src={AvtorIcon1} alt="" /></AvtorIcon>
                  <AvtorTitle>牛魔王交易公会</AvtorTitle>
                  <Btn active={false}>{t('38')}</Btn>
                </Item>
              </UnionItem> */}
            </UnionItems>


            {false && <UnionActiveItems>
              {ArrList.map((item: any, index: any) => <UnionActiveItem key={index}>
                <Item>
                  <AvtorIcon><img src={item?.icon} alt="" /></AvtorIcon>
                  <AvtorTitle>{t(item?.title)}</AvtorTitle>
                  <Btn active={true}>{t('38')}</Btn>
                </Item>
              </UnionActiveItem>)}
            </UnionActiveItems>}
          </UnionItemsBox>
        </SelectUnion>

      </HomeContent>


      <Modal
        visible={OpenBindModal}
        className='Modal'
        centered
        width={'301px'}
        closable={false}
        footer={null}
        onCancel={() => { setOpenBindModal(false) }}>
        <CloseBox src={CloseIcon} onClick={() => { setOpenBindModal(false) }} ></CloseBox>
        <ModalBg></ModalBg>
        <ModalBg1></ModalBg1>
        <ModalBg2></ModalBg2>
        <TopImg><img src={JoinInTradeBg} alt="" /></TopImg>
        <ModalTitle>{t('39')}</ModalTitle>
        <InputCointainer>
          <input type="text" value={topAddress} placeholder={t('40')} onChange={(e) => { inputAddress(e) }} />
        </InputCointainer>
        <BtnBox>
          <BoundBtn active={!!account} onClick={() => { bindFun(String(topAddress) === String(CurrentItem?.defaultAddress) ? "0x0000000000000000000000000000000000000000" : topAddress, CurrentItem?.contractAddress) }}>{t('41')}</BoundBtn>
        </BtnBox>
        <InfoContainer onClick={() => { setTopAddress(CurrentItem?.defaultAddress) }} >
          <img src={infoIcon} alt="" />{t('42')}
        </InfoContainer>
      </Modal>

    </HomeContainerBox >
  )
}

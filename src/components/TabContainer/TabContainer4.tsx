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
import stepIcon from '../../assets/image/Tools/stepIcon.svg'
import infoIcon from '../../assets/image/Tools/InfoIcon.svg'

import { url } from 'inspector'
import i18n from '../../lang/i18n'
import MessageBox from '../MessageBox/MessageBox'

const TabContainer = styled.div`
width: 100%;
padding: 33px 0px;
`

const CoinContainer = styled.div`
/* margin-top: 27px; */
width: 100%;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding: 24px 17px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`

const StepItems = styled(FlexBox)`
justify-content: flex-start;
align-items: center;
margin-bottom: 20px;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 19.6px */
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
>img{
    margin-right: 10px;
}
`

const AddressBox = styled(FlexSBCBox)`
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 19.6px */
>input{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 19.6px */
    /* margin: 0px 6px; */
    border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding:10px 16px;
max-width: 90px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
}
`

const BtnTip = styled(FlexCCBox)`
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
margin-top: 10px;
>img{
    margin-right: 8px;
    width: 16px;
    height: 16px;
}
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

            <CoinContainer>
                <StepItems><img src={stepIcon} alt="" />{t("210")}</StepItems>
                <StepItems><img src={stepIcon} alt="" />{t("211")}</StepItems>
                <StepItems><img src={stepIcon} alt="" />{t("212")}</StepItems>

                <AddressBox>
                    0×<input type="text" placeholder={t("213")} />000000000<input type="text" placeholder={t("214")} />
                </AddressBox>
                <ItemBtn>{t("182")}</ItemBtn>
                <BtnTip>
                    <img src={infoIcon} alt="" />{t("215")}
                </BtnTip>
            </CoinContainer>

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
import stepIcon from '../../assets/image/Tools/stepIcon.svg'
import infoIcon from '../../assets/image/Tools/InfoIcon.svg'

import { url } from 'inspector'
import i18n from '../../lang/i18n'
import MessageBox from '../MessageBox/MessageBox'

const TabContainer = styled.div`
width: 100%;
padding: 33px 0px;
`

const CoinContainer = styled.div`
/* margin-top: 27px; */
width: 100%;
border-radius: 20px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding: 24px 17px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
`

const StepItems = styled(FlexBox)`
justify-content: flex-start;
align-items: center;
margin-bottom: 20px;
color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 19.6px */
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
>img{
    margin-right: 10px;
}
`

const AddressBox = styled(FlexSBCBox)`
color: #15141F;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 19.6px */
>input{
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 19.6px */
    /* margin: 0px 6px; */
    border-radius: 10px;
border: 0.5px solid rgba(66, 99, 235, 0.19);
background: #FFF;
padding:10px 16px;
max-width: 90px;
/* 投影1 */
box-shadow: 0px 16px 11px 0px rgba(66, 99, 235, 0.07);
}
`

const BtnTip = styled(FlexCCBox)`
    color: #7681AA;
font-family: Source Han Sans CN;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 16.8px */
margin-top: 10px;
>img{
    margin-right: 8px;
    width: 16px;
    height: 16px;
}
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

            <CoinContainer>
                <StepItems><img src={stepIcon} alt="" />{t("210")}</StepItems>
                <StepItems><img src={stepIcon} alt="" />{t("211")}</StepItems>
                <StepItems><img src={stepIcon} alt="" />{t("212")}</StepItems>

                <AddressBox>
                    0×<input type="text" placeholder={t("213")} />000000000<input type="text" placeholder={t("214")} />
                </AddressBox>
                <ItemBtn>{t("182")}</ItemBtn>
                <BtnTip>
                    <img src={infoIcon} alt="" />{t("215")}
                </BtnTip>
            </CoinContainer>

        </TabContainer>
    )
}

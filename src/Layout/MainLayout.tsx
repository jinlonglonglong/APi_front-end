import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
// import { useConnectWallet, injected, ChainId } from "../web3";
import { AddrHandle, addMessage, GetQueryString, showLoding, NumSplic, getFullNum, startWord, NumSplic1 } from "../utils/tool";
import { getUserInfo, signBindReferee } from '../API/index'
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from '../store/reducer'
import { Contracts } from '../web3'
import { useThrottleFn } from '@umijs/hooks';
import { savePriceAction } from '../store/actions'
import BigNumber from 'big.js'
import copy from "copy-to-clipboard";
import logo from "../assets/image/logo.png";
import ANT from "../assets/image/logo.png";
import Lang from "../assets/image/Lang.png";
import close from "../assets/image/closeIcon.svg";
import HomeIcon from "../assets/image/layout/HomeIcon.svg";
import MarketIcon from "../assets/image/layout/MarketIcon.svg";
import MyIcon from "../assets/image/layout/MyIcon.svg";
import NewsIcon from "../assets/image/layout/NewsIcon.svg";
import ToolsIcon from "../assets/image/layout/ToolsIcon.svg";
import HomeActiveIcon from "../assets/image/layout/HomeActiveIcon.svg";
import MarketActiveIcon from "../assets/image/layout/MarketActiveIcon.svg";
import MyActiveIcon from "../assets/image/layout/MyActiveIcon.svg";
import NewsActiveIcon from "../assets/image/layout/NewsActiveIcon.svg";
import ToolsActiveIcon from "../assets/image/layout/ToolsActiveIcon.svg";

import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import useConnectWallet from "../hooks/useConnectWallet";
import { contractAddress, LOCAL_KEY } from "../config";
import { useViewport } from "../components/viewportContext";
import Web3 from "web3";
import styled from "styled-components";
const { Header, Content, Footer, Sider } = Layout;

let refereeUserAddress: any;
let langObj = { "zh": "简", "en": "EN", "kr": "한국인" }


const LogoContainer = styled.img` 
width: 41px;
height: 41px;
`

const MainLayout: React.FC = () => {
  const web3 = new Web3()
  let dispatch = useDispatch()
  let state = useSelector<stateType, stateType>(state => state);
  let { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  let [ItemActive, setItemActive] = useState('/');
  let [Price, setPrice] = useState('');
  let [showRefereeAddress, setShowRefereeAddress] = useState(false);
  const [InputValue, setInputValue] = useState<any>('')
  const Navigate = useNavigate()
  const { connectWallet } = useConnectWallet()
  const { width } = useViewport()
  const [collapsed, setCollapsed] = useState(true);


  let tag = web3.utils.isAddress(window.location.pathname.slice(1))
  if (tag) {
    refereeUserAddress = window.location.pathname.slice(1)
  } else {
    refereeUserAddress = ''
  }
  function changeLanguage(lang: any) {
    window.localStorage.setItem(LOCAL_KEY, lang.key);
    i18n.changeLanguage(lang.key);
  }

  const langArr = [
    { key: "zh", label: "ZH 简体中文" },
    // { key: "zhtw", label: "ZH-TW 繁體中文" },
    { key: "en", label: "EN English" },
    // { key: "ja", label: "JA 日本語" },
    // { key: "ko", label: "KO 한국어" },
    // { key: "vi", label: "VI Tiếng" },
    // { key: "th", label: "TH ภาษาไทย" },
  ]

  const item = langArr.map((item: any) => {
    return {
      label: <div className={String(i18n.language) === String(item?.key) ? "activeLangItem" : "LangItem"}>{item?.label}</div>,
      key: item?.key,
    }
  })


  const menu = (
    <Menu
      onClick={changeLanguage}
      // items={[
      //   {
      //     label: <div className={i18n.language === "" ? "activeLangItem" : "LangItem"}>ZH 简体中文</div>,
      //     key: "zh",
      //   },
      //   {
      //     label: <div className={i18n.language === "" ? "activeLangItem" : "LangItem"}>ZH-TW 繁體中文</div>,
      //     key: "zhtw",
      //   },
      //   {
      //     label: <div className={i18n.language === "" ? "activeLangItem" : "LangItem"}>EN English</div>,
      //     key: "en",
      //   },
      //   {
      //     label: <div className={i18n.language === "" ? "activeLangItem" : "LangItem"}>JA 日本語</div>,
      //     key: "ja",
      //   },
      //   {
      //     label: <div className={i18n.language === "" ? "activeLangItem" : "LangItem"}>KO 한국어</div>,
      //     key: "ko",
      //   },
      //   {
      //     label: <div className={i18n.language === "" ? "activeLangItem" : "LangItem"}>VI Tiếng</div>,
      //     key: "vi",
      //   },
      //   {
      //     label: <div className={i18n.language === "" ? "activeLangItem" : "LangItem"}>TH ภาษาไทย</div>,
      //     key: "ths",
      //   },
      // ]}
      items={item}
    />
  );

  const location = useLocation();
  const pathname = startWord(location.pathname)

  const inputFun = (e: any) => {
    // let value = e.target.value
    // let value = e.target.value.replace(/^[^1-9]+|[^0-9]/g, '')
    let str = e.target.value.trim()
    setInputValue(str)
  }





  const headerIconObj: any = {
    "/": { "Icon": HomeIcon, "activeIcon": HomeActiveIcon, "menu": "MenuItem pointer", "menuActive": "MenuItem pointer active" },
    "/Market": { "Icon": MarketIcon, "activeIcon": HomeActiveIcon, "menu": "MenuItem pointer", "menuActive": "MenuItem pointer active" },
    "/News": { "Icon": NewsIcon, "activeIcon": NewsActiveIcon, "menu": "MenuItem pointer", "menuActive": "MenuItem pointer active" },
    "/Tools": { "Icon": ToolsIcon, "activeIcon": HomeActiveIcon, "menu": "MenuItem pointer", "menuActive": "MenuItem pointer active" },
    "/My": { "Icon": MyIcon, "activeIcon": HomeActiveIcon, "menu": "MenuItem pointer", "menuActive": "MenuItem pointer active" },
  }



  // 导航
  const navigateFun = (path: string) => {
    // scrollToTop()
    Navigate("/View" + path)
  }

  function menuActive(path: string) {
    if (ItemActive === path) {
      return headerIconObj[ItemActive]?.menuActive;
    } else {
      return headerIconObj[path]?.menu;
    }
  }

  function iconActive(path: string) {
    if (ItemActive === path) {
      return headerIconObj[ItemActive]?.activeIcon;
    } else {
      return headerIconObj[path]?.Icon;
    }
  }



  function scrollToTop() {
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // });
    document.body.scrollTo(0, 0)
    // ReactDOM.findDOMNode(this).scrollTop = 0
  }



  useEffect(() => {
    console.log(pathname, location.pathname, 'pathname');
    if (pathname) {
      scrollToTop()
      setItemActive(pathname)
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname, web3React.account])

  // useEffect(() => {
  //   if (state.token) {
  //     getUserInfo().then((res: any) => {
  //       // console.log(res.data, "我的信息")
  //       if (res.code == 200) {
  //         setShowRefereeAddress(!res.data.isBind)
  //       } else {
  //         setShowRefereeAddress(true)
  //       }
  //     })
  //     if (refereeUserAddress) {
  //       setInputValue(refereeUserAddress)
  //     }
  //   }
  // }, [state.token, refereeUserAddress, showRefereeAddress, web3React.account])

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 999999, width: "100%", height: 64 }}>
        <div className="HeaderNav" >
          <LogoContainer src={logo} onClick={() => { Navigate("/View/") }}>
          </LogoContainer>

          <div className="setBox">

            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              overlayClassName="LangDropDown"
              trigger={["click"]}
              getPopupContainer={triggerNode => triggerNode}
              overlayStyle={{ zIndex: '999' }}
            >
              <div className="Lang">
                <img style={{ width: "40px" }} src={Lang} alt="" />
              </div>
            </Dropdown>

            {web3React.account ? (
              <>
                <div className="Connect  pointer activeConnect">
                  {AddrHandle(web3React.account as string)}
                </div>
              </>
            ) : (
              <>
                <div
                  className="Connect  pointer flexCenter "
                  onClick={() => {
                    connectWallet && connectWallet();
                  }}
                >
                  Connect
                </div>
              </>
            )}

          </div>
        </div>
      </Header >
      <Content
        className="MainContent"
        style={{ position: "relative", zIndex: 99 }}
      >
        <Layout>
          <Outlet />
        </Layout>
        {!collapsed && <div className="Mask"></div>}
      </Content>

      {(String(ItemActive) !== "/TradingManage" && String(ItemActive) !== "/TradingDetail") && <div className="app-footer" style={{ position: "fixed", bottom: 0 }}>
        <div className="tabBox">
          <div className="tabItem" onClick={() => { navigateFun("/") }}>
            <div className={menuActive('/') ?? headerIconObj['/']?.menuActive}>
              <div className="menuTop"><img src={iconActive('/') ?? headerIconObj['/']?.activeIcon} alt="" /></div>
              {t('1')}
            </div>
          </div>
          <div className="tabItem" onClick={() => { navigateFun("/Market") }}>
            <div className={menuActive("/Market")}>
              <div className="menuTop"><img src={iconActive("/Market")} alt="" /></div>
              {t('2')}
            </div>
          </div>
          <div className="tabItem" onClick={() => { navigateFun("/News") }}>
            <div className={menuActive("/News")}>
              <div className="menuTop"><img src={iconActive("/News")} alt="" /></div>
              {t('3')}
            </div>
          </div>
          <div className="tabItem" onClick={() => { navigateFun("/Tools") }}>
            <div className={menuActive("/Tools")}>
              <div className="menuTop"><img src={iconActive("/Tools")} alt="" /></div>
              {t('4')}
            </div>
          </div >
          <div className="tabItem" onClick={() => { navigateFun("/My") }}>
            <div className={menuActive("/My")}>
              <div className="menuTop"><img src={iconActive("/My")} alt="" /></div>
              {t('5')}
            </div>
          </div >
        </div >
      </div>}




    </Layout >
  );
};
export default MainLayout;
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MessageBox.scss'
import { useTranslation } from 'react-i18next'
export default function MessageBox({ preNoticeList }: any) {
    const {t} =useTranslation()
    const navigate = useNavigate()
    const [animate, setAnimate] = useState(false)
    const [NoticeList, setNoticeList] = useState<any>(preNoticeList)
    const intervalRef = useRef<any>()
    const [timer, setTimer] = useState(0)

    // 公告向上轮播
    const changeAnim = () => {
        if (NoticeList) {
            setTimeout(() => {
                NoticeList.push(NoticeList[0]);
                NoticeList.shift();
                setNoticeList(NoticeList)
                setAnimate(false)
            }, 1500)
        }
    }


    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setAnimate(true)
            changeAnim()
            setTimer(timer + 1)
        }, 1500)
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [timer])
    return (
        <div className='NoticeBox'>
            {NoticeList?.length > 0 && <>
                {/* <MassageBox messageData={NoticeList}>
            </MassageBox> */}

                <div className="bannerBox" onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                }}>
                    <div className="content">
                        {NoticeList?.map((item: any, index: any) => <div className={animate ? 'anim box' : 'box'} key={index}>
                            <div className={index === 1 ? "active subBannerTitle" : "subBannerTitle"} onClick={() => { navigate("/View/Notice") }}>{t(item?.noticeTitle)}</div>
                            {/* {(index === 1 && <div className="view" onClick={() => { navigate("/Notice") }}>{t("195")}</div>)} */}
                        </div>
                        )}
                    </div>
                </div >
            </>}
        </div>
    )
}

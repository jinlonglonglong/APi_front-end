import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import PageLoding from '../components/PageLoding';
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";
const Home = React.lazy(() => import('../view/Home'));
const TradingManage = React.lazy(() => import('../view/TradingManage'));
const TradingDetail = React.lazy(() => import('../view/TradingDetail'));
const News = React.lazy(() => import('../view/News'));
const Market = React.lazy(() => import('../view/Market'));
const Tools = React.lazy(() => import('../view/Tools'));
const My = React.lazy(() => import('../view/My'));
const Notice = React.lazy(() => import('../view/Notice'));
const NoticeContent = React.lazy(() => import('../view/NoticeContent'));

export default function Router() {
  return (
    <Suspense fallback={<PageLoding></PageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path=":address/">
            <Route index element={<Home />}></Route>
            <Route path="TradingManage/:teamId" element={<TradingManage />}></Route>
            <Route path="TradingDetail" element={<TradingDetail />}></Route>
            <Route path="News" element={<News />}></Route>
            <Route path="Market" element={<Market />}></Route>
            <Route path="Tools" element={<Tools />}></Route>
            <Route path="My" element={<My />}></Route>
            <Route path="Notice" element={<Notice />}></Route>
            <Route path="NoticeContent" element={<NoticeContent />}></Route>
          </Route>
          <Route path="" element={<Home />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}>
        </Route>
      </Routes>
    </Suspense>
  )
}

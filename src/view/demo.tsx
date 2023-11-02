
<NewsContainer>
          <NewsBg src={NewsBg1}>
          </NewsBg>
          <NewsTitleBox>
            热门资讯 <span onClick={()=>{Navigate("/View/News")}}>See All</span>
          </NewsTitleBox>
          <NewsContents>
            <BgImg1 src={bgImg1}>
            </BgImg1>
            {NewsList?.slice(0,5)?.map((item:any,index:any)=><NewsItem key={index} onClick={()=>{window.open(item?.url)}}>
              <NewsLeft>
                <NewsImg src={item?.thumbnail}></NewsImg>
              </NewsLeft>
              <NewsRight>
                {/* <NewsTitle>{item?.title}</NewsTitle> */}
                <Swiper
          slidesPerView="auto"
          // spaceBetween={30}
          freeMode={true}
          pagination={false}
          modules={[FreeMode, Pagination]}
          className="newsSwiper"
        >
          <SwiperSlide>
            <NewsTitle>{item?.title}</NewsTitle>
            </SwiperSlide>
        </Swiper>
                <NewsDescript>&nbsp;&nbsp;&nbsp;&nbsp;{item?.description}</NewsDescript>
                {/* <NewsAutor><img src={avtorIcon} alt="" />星球日报</NewsAutor> */}
                <NewsTime>{item?.createdAt}</NewsTime>
              </NewsRight>
            </NewsItem>)}


            {/* <NewsItem>
              <NewsLeft>
                <NewsImg src={NewsImg1}></NewsImg>
              </NewsLeft>
              <NewsRight>
                <NewsTitle>一文读懂Dencun升级新增的EIP-7514提案</NewsTitle>
                <NewsAutor><img src={avtorIcon} alt="" />星球日报</NewsAutor>
                <NewsTime>刚刚</NewsTime>
              </NewsRight>
            </NewsItem> */}
            {/* <NewsItem>
              <NewsLeft>
                <NewsImg src={NewsImg1}></NewsImg>
              </NewsLeft>
              <NewsRight>
                <NewsTitle>一文读懂Dencun升级新增的EIP-7514提案</NewsTitle>
                <NewsAutor><img src={avtorIcon} alt="" />星球日报</NewsAutor>
                <NewsTime>刚刚</NewsTime>
              </NewsRight>
            </NewsItem>
            <NewsItem>
              <NewsLeft>
                <NewsImg src={NewsImg1}></NewsImg>
              </NewsLeft>
              <NewsRight>
                <NewsTitle>一文读懂Dencun升级新增的EIP-7514提案</NewsTitle>
                <NewsAutor><img src={avtorIcon} alt="" />星球日报</NewsAutor>
                <NewsTime>刚刚</NewsTime>
              </NewsRight>
            </NewsItem> */}
          </NewsContents>
        </NewsContainer>
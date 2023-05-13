import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(30);
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let newsData = await fetch(newsUrl);
    let parsedNewsData = await newsData.json();
    setArticles(parsedNewsData.articles);
    setTotalResults(parsedNewsData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsHunter`
    updateNews()
    // eslint-disable-next-line
  }, []);
  

  const fetchMoreData = async () => {
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let newsData = await fetch(newsUrl);
    let parsedNewsData = await newsData.json();
    setArticles(articles.concat(parsedNewsData.articles));
    setTotalResults(parsedNewsData.totalResults);
  };


  return (
    <div style={{marginTop: '90px'}}>
      <h2 className="text-center my-5">NewsHunter - {capitalizeFirstLetter(props.category)} News</h2>


      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    des={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />

                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

    </div>
  );
}


// News.prototype.defaultProps = {
//   country: 'in',
//   pageSize: 8,
//   category: "general",
// }

// News.prototype.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// }

export default News;

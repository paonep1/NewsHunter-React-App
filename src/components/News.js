import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHunter`
  }

  async updateNews() {
      const newsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36638a95296f45828217855d9d80435d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let newsData = await fetch(newsUrl);
      let parsedNewsData = await newsData.json();
      this.setState({
        articles: parsedNewsData.articles,
        totalResults: parsedNewsData.totalResults,
        loading: false
      });
  }

  async componentDidMount() {
    this.updateNews()
  }


  // handlePerClick = async () => {
  //   this.setState({page: this.state.page - 1})
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({page: this.state.page + 1})
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36638a95296f45828217855d9d80435d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let newsData = await fetch(newsUrl);
    let parsedNewsData = await newsData.json();
    this.setState({
      articles: this.state.articles.concat(parsedNewsData.articles),
      totalResults: parsedNewsData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center my-5">NewsHunter - {this.capitalizeFirstLetter(this.props.category)} News</h2>


        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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

      </>
    );
  }
}

export default News;

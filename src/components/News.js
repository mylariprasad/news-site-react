import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// we cant setState inside the render method
// constructor, render, ComponentDidMount,  componentDidUpdate it is the sequence follows to run code

export class News extends Component {
    static defaultProps={
        country: "in",
        pageSize: 8
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number
    }
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: true,
            page: 1 ,
            totalResults:0
        }
        document.title= "NewsMonkey- "+this.props.category;
    }
    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d28ad02deab64ccfaed56c2a5ddb2c06&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.articles,
            loading:false});
    }
    async componentDidMount(){
        this.updateNews();
    }
    handleNextClick=async()=>{
        this.setState({page: this.state.page+1})
            this.updateNews();
    }
    handlePrevClick=async()=>{
        this.setState({page: this.state.page-1})
        this.updateNews();
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d28ad02deab64ccfaed56c2a5ddb2c06&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.articles});
      };
  render() {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
            <h1>NewsMonkey Top - {this.props.category} headlines</h1>
            </div>
            {this.state.loading && <Spinner/>}
            <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage?element.urlToImage:"https://c.ndtvimg.com{this.props.pageSize}23-03/v0obk3o_sultan-alneyadi-afp-650_625x300_02_March_23.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                </div>
            })}
            </div> 
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
            {!this.state.loading && <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>Previous</button>}
            {!this.state.loading && <button disabled={this.state.articles.length<this.props.pageSize} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>}
        </div> */}
        </>
        
    )
  }
}

export default News

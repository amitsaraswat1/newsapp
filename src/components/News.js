import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export class News extends Component {
 
  constructor(){
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
        articles: [],
        loading: false, 
        page:  1
    }
  }
    async componentDidMount(){
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=08cf867a14d6487eaad031b08e5b2787&page=1&pageSize=${this.props.Size}';
    let data =  await fetch(url);
    let parsedDate =  await data.json()
    console.log(parsedDate);
    this.setState({articles: parsedDate.articles})
}
   handlePrevClick = async()=>{
  console.log("Previous");
       let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=08cf867a14d6487eaad031b08e5b2787&page=${this.state.page - 1}&pageSize=${this.props.Size}';
     let data = await fetch(url);
     let parsedData = await data.json()
     console.log(parsedData);
     this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles

  })
 }
 handleNextClick = async ()=>{
  console.log("Next");
  if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.state.page)){

  }
  else{
     let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=08cf867a14d6487eaad031b08e5b2787&page=${this.state.page + 1}pageSize=${this.props.Size}';
     let data = await fetch(url);
     let parsedData = await data.json()
     console.log(parsedData);
     this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
     
  })
 }
}
  render(){
    return (
      <div>
        <div className="container my-3"></div>
        <h1 className="text-centre">NewsMonkey - Top Headlines</h1>
        <Spinner/>
        <div className='row'></div>
        {this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imgUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > this.state.totalResults/this.state.page}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#8594;</button>
        </div>
       
        </div>
      
    )
  }
}

export default News

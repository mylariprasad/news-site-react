import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title,description,imageUrl,newsUrl,author,date}=this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{width: '20rem'}}>
                    <img src={imageUrl} className="card-img-top" style={{height: '10rem'}} alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title" style={{height: '4rem' , display: 'flex' , alignItems: 'center'}}>{title}...</h5>
                            <p className="card-text" style={{height: '4rem',  display: 'flex' , alignItems: 'center'}}>{description}...</p>
                            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} className="btn btn-sn btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem

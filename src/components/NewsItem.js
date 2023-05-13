import React from 'react'

const NewsItem = (props)=>{
    let {title, des, imgUrl, url, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger">{source}</span>
          <img className="card-img-top" src={!imgUrl?"https://cdn.dribbble.com/users/937082/screenshots/5516643/blob_4x":imgUrl} alt="Card img"/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{des}</p>
              <p className="card-text"><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
              <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-warning">Read More...</a>
            </div>
        </div>
      </div>
    )
    
}

export default NewsItem

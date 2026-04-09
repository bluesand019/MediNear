import React from 'react'

const GridList = ({title, sub, dummy_data, className}) => {
  return (
    <div className={`grid-list ${className}`}>
        <p className="sec-title">{title}</p>
        <p className="sec-sub">{sub}</p>
        <ul>
          {dummy_data.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
  )
}

export default GridList

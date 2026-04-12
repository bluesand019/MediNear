import React from 'react'

const DoctorCard = ({name, gender, department, experience, rating, distance, hospital}) => {
  return (
    <li key={Date.now() + ""}>
      <h4>{name}</h4>
      <p>{gender}</p>
      <p>{department}</p>
      <p>{experience} years experience</p>
      <p>&#11088; {rating}</p>
      <p>{distance} km away</p>
      <p>{hospital}</p>
      <button>View profile</button>
      <button>Book now</button>
    </li>
  )
}

export default DoctorCard

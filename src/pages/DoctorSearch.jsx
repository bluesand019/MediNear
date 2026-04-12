import React from 'react'
import DoctorCard from '../components/layout/DoctorCard'

const DoctorSearch = () => {
  const DUMMY_DOCTORS = [{
    name: "Dr. Sadia Islam",
    gender: "Female",
    department: "Gynecologist",
    experience: 8,
    rating: 4.9,
    distance: 0.8,
    hospital: "Ibn Sina Hospital, Rajshahi"
  }]
  return (
    <div className='doctor-li-container'>
      {DUMMY_DOCTORS.map(item => {
        return <DoctorCard 
        name={item.name}
        gender={item.gender}
        department={item.department}
        experience={item.experience}
        rating={item.rating}
        distance={item.distance}
        hospital={item.hospital}
        />
      })}
    </div>
  )
}

export default DoctorSearch

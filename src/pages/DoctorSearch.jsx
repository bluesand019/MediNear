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
  },
{
    name: "Dr. Rezaul Karim",
    gender: "Male",
    department: "Cardiologist",
    experience: 20,
    rating: 4.9,
    distance: 5.1,
    hospital: "Heart Foundation Hospital"
  },
{
    name: "Dr. Fahmida Hossain",
    gender: "Female",
    department: "Cardiologist",
    experience: 14,
    rating: 4.8,
    distance: 1.2,
    hospital: "Rajshahi Medical College Hospital"
  },
{
    name: "Dr. Rubina Khanam",
    gender: "Female",
    department: "Dermatologist",
    experience: 11,
    rating: 4.7,
    distance: 3.2,
    hospital: "Skin & Care Center"
  },]
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

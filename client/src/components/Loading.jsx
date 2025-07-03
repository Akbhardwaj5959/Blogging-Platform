import React from 'react'
import lodingIcon from "@/assets/images/loading.svg"
const loading = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0  z-50 flex items-center justify-center'>
         <img src={lodingIcon} width={100} />
    </div>
  )
}

export default loading

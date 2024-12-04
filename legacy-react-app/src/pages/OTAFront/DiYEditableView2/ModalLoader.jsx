import LoadingSpinner from 'components/LoadingSpinner/index'
import React from 'react'

const ModalLoader = () => {
  return (
    <div className='sm:h-[503px] h-full w-full flex justify-center items-center'>
     
      <LoadingSpinner />

    </div>
  )
}

export default ModalLoader

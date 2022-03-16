import React from 'react'

const Page = ({actualPage, number, imageSrc, imageAlt, children, id}) => {
  return (
      <div className='page' id={id}>
        <img className={actualPage === number ? "icon" : "icon hidden"} src={imageSrc} alt={imageAlt}/>
        <div className={actualPage === number ? "text" : "text hidden"}>
            {children}
        </div>
    </div>
  )
}

export default Page
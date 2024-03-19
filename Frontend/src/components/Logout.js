import React from 'react'
import LoginPage from './LoginPage'

export default function Logout() {
  return (
  <div className='flex w-[90%] flex-col'>
  
    <div className=' logout mx auto text-green-700 py-2 text-xl text-center'>
      Session logged out succesfully ! Login again
    </div>
    <div className='w-[100%]'>

    <LoginPage></LoginPage>
    </div>
    </div>
  
  )
}

// 검색창 포함된 메인 페이지
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

const HomePage = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  
  useEffect(() => {
    if (!username) {
      navigate('/login')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-8 right-10 flex flex-col items-end text-gray-600 text-base">
        👋 홍서현 님, 환영합니다!
        <button
          onClick={() => navigate('/interests')}
          className="text-blue-600 hover:underline text-base"
        >
          ❤️ 관심 행사 List
      </button>
      </div>

      <h1 className="text-4xl font-bold mb-10">SeoulMate !</h1>
      <SearchBar />
    </div>
  )
}

export default HomePage
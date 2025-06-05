// src/pages/InterestPage.tsx

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface InterestItem {
  interest_id: number
  user_id: number
  event_id: number
  bookmarked_at: string
}

const InterestPage = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const [interests, setInterests] = useState<InterestItem[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const user_id = localStorage.getItem("username")
    if (!user_id) {
      setError("로그인이 필요합니다.")
      return
    }

    const fetchInterests = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/interests/user/${user_id}`)
        if (!res.ok) throw new Error("서버 오류")
        const data = await res.json()
        setInterests(data)
      } catch (err) {
        console.error(err)
        setError("관심 행사 정보를 불러오지 못했어요.")
      }
    }

    fetchInterests()
  }, [])

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="absolute top-8 right-10 flex flex-col items-end text-gray-600 text-base mb-2">
        👋 홍서현 님, 환영합니다!
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline text-base"
        >
          🏡 Home
      </button>
      </div>
      <h1 className="text-2xl font-bold mt-8 mb-10">❤️ 나의 관심 행사 List</h1>

      {error && <p className="text-red-500">{error}</p>}

      {interests.length === 0 && !error && (
        <p className="text-gray-500">등록된 관심 행사가 없습니다.</p>
      )}

      {interests.map(item => (
        <div
          key={item.interest_id}
          className="border rounded p-4 shadow mb-3 bg-white"
        >
          <p className="font-semibold">🎫 Event ID: {item.event_id}</p>
          <p>🕒 등록 시간: {item.bookmarked_at}</p>
        </div>
      ))}
    </div>
  )
}

export default InterestPage
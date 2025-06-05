// src/pages/ResultPage.tsx

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import EventCard from '../components/EventCard'

interface Event {
  event_id: number
  title: string
  start_date: string
  end_date: string
  is_free: string
  place_name: string
  expected_attendance_by_hour: { [time: string]: number }
  latitude: number
  longitude: number
}

const ResultPage = () => {
  const username = localStorage.getItem('username')
  const location = useLocation()
  const navigate = useNavigate()

  const { district, category, target_date } = queryString.parse(location.search)

  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentEvents = events.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(events.length / itemsPerPage)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = new URLSearchParams()
        if (district) query.append('district', district as string)
        if (category) query.append('category', category as string)
        if (target_date) query.append('target_date', target_date as string)

        const url = `http://localhost:8000/api/events/search?${query.toString()}`

        const response = await fetch(url)
        if (!response.ok) throw new Error('서버 응답 실패')

        const data = await response.json()
        setEvents(data)
      } catch (err) {
        console.error(err)
        setError('행사 데이터를 불러오지 못했어요.')
      }
    }

    fetchEvents()
  }, [district, category, target_date])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getVisiblePages = () => {
    const maxPages = 10
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2))
    let endPage = startPage + maxPages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPages + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="absolute top-8 right-10 flex flex-col items-end text-gray-600 text-base mb-2">
        👋 홍서현 님, 환영합니다!
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline text-base"
        >
          🏡 Home
      </button>
        <button
          onClick={() => navigate('/interests')}
          className="text-blue-600 hover:underline text-base"
        >
          ❤️ 관심 행사 List
        </button>
      </div>

      <h1 className="mt-12 mb-4 text-2xl font-bold">🎯 추천된 문화행사</h1>
      {category && <p className="mb-1">선택한 장르: <strong>{category}</strong></p>}
      {target_date && <p className="mb-4">선택한 날짜: <strong>{target_date}</strong></p>}

      {error && <p className="text-red-500">{error}</p>}

      {events.length === 0 && !error && (
        <p className="text-gray-500">일치하는 문화행사가 없습니다.</p>
      )}

      <div className="space-y-6">
        {currentEvents.map((event) => (
          <EventCard
            key={event.event_id}
            event_id={event.event_id}
            title={event.title}
            startDate={event.start_date}
            endDate={event.end_date}
            isFree={event.is_free}
            placeName={event.place_name}
            expectedAttendanceByHour={event.expected_attendance_by_hour}
            latitude={event.latitude}
            longitude={event.longitude}
          />
        ))}
      </div>

      {events.length > itemsPerPage && (
        <div className="flex justify-center mt-16 gap-1 flex-wrap text-sm">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="border px-2 py-1 rounded disabled:opacity-50"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border px-2 py-1 rounded disabled:opacity-50"
        >
          ‹
        </button>
        
        {getVisiblePages().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`border px-3 py-1 rounded ${
                currentPage === pageNum ? 'bg-gray-700 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-2 py-1 rounded disabled:opacity-50"
          >
            ›
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="border px-2 py-1 rounded disabled:opacity-50"
          >
            »
          </button>
        </div>
      )}
    </div>
  )
}

export default ResultPage
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SearchBar = () => {
  const [district, setDistrict] = useState('')
  const [genre, setGenre] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = new URLSearchParams()
    if (district) query.append("district", district)
    if (genre) query.append("category", genre)
    if (date) query.append('target_date', date.toLocaleDateString('sv-SE'))
    navigate(`/results?${query.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-80">
      <div className="flex items-center">
        <label className="w-12 font-medium gap-2">구</label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-0.5 flex-1"
        >
          <option value="">전체</option>
          <option value="강서구">강서구</option>
          <option value="마포구">마포구</option>
          <option value="강남구">강남구</option>
        </select>
      </div>

      <div className="flex items-center">
        <label className="w-12 font-medium gap-2">장르</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-0.5 flex-1"
        >
          <option value="">전체</option>
          <option value="공연예술">공연예술</option>
          <option value="전시/미술">전시/미술</option>
          <option value="축제/행사">축제/행사</option>
          <option value="교육/체험">교육/체험</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div>
        <label className="flex justify-center mt-4 mb-2 font-medium">날짜 선택</label>
        <div className="flex justify-center">
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            inline
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        검색
      </button>
    </form>
  )
}

export default SearchBar
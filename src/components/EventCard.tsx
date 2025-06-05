import React from 'react'
import CrowdChart from './CrowdChart'
import MapView from './MapView'

interface Props {
  event_id: number
  title: string
  startDate: string
  endDate: string
  isFree: string
  placeName: string
  expectedAttendanceByHour?: { [time: string]: number }
  latitude: number
  longitude: number
}

const EventCard: React.FC<Props> = ({
  event_id,
  title,
  startDate,
  endDate,
  isFree,
  placeName,
  expectedAttendanceByHour,
  latitude,
  longitude
}) => {
  const recommendedTime = expectedAttendanceByHour
    ? Object.entries(expectedAttendanceByHour).reduce((min, curr) =>
        curr[1] < min[1] ? curr : min
      )[0]
    : '정보 없음'

  const handleSaveInterest = async () => {
    const user_id = localStorage.getItem("username")
    if (!user_id) {
      alert("로그인이 필요합니다.")
      return
    }

    const saved = JSON.parse(localStorage.getItem("interests") || "[]")
    const alreadySaved = saved.find((e: any) => e.event_id === event_id)

    if (!alreadySaved) {
      saved.push({ event_id, title })
      localStorage.setItem("interests", JSON.stringify(saved))
    }

    try {
      const response = await fetch("http://localhost:8000/api/interests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          event_id,
          bookmarked_at: new Date().toISOString().slice(0, 16)
        })
      })

      if (response.ok)
        alert("관심 행사로 등록했어요!")
      else
        alert("등록 실패!")

    } catch (err) {
      alert("서버에 연결할 수 없습니다.")
      console.error(err)
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-md mb-6 bg-white">
      <h2 className="text-lg font-semibold mb-2 ml-2">{title}</h2>
      <p>🗓 {startDate} ~ {endDate}</p>
      <p>📍 {placeName}</p>
      <p>💰 {isFree}</p>
      <p className="mt-2 text-green-600 font-semibold">
        🕒 방문 추천 시간: {recommendedTime}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
      <MapView latitude={latitude} longitude={longitude} placeName={placeName} />
        {expectedAttendanceByHour ? (
          <CrowdChart data={expectedAttendanceByHour} />
        ) : (
          <p className="text-gray-500">혼잡도 정보 없음</p>
        )}
      </div>

      <button
        onClick={handleSaveInterest}
        className="text-red-500 hover:text-red-700 mt-3"
      >
        ❤️ 관심 행사로 저장
      </button>
    </div>
  )
}

export default EventCard
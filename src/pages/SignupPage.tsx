// 회원가입 페이지

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [userId, setUserId] = useState('')
  const [loginId, setLoginId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [genre, setGenre] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(userId),
          email,
          login_id: loginId,
          hashed_password: password,
          age: parseInt(age),
          preferred_genre: genre
        })
      })

      if (response.ok) {
        setSuccess('회원가입이 완료됐어요! 로그인해주세요.')
        setTimeout(() => navigate('/login'), 1500)
      } else {
        const data = await response.json()
        setError(data.detail || '회원가입에 실패했어요.')
      }
    } catch (err) {
      setError('서버 연결에 실패했어요.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
        <input
          type="str"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setLoginId(e.target.value)}
          className="border p-2"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="나이"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2"
        >
          <option value="">선호 장르 선택</option>
          <option value="공연예술">공연예술</option>
          <option value="전시/미술">전시/미술</option>
          <option value="축제/행사">축제/행사</option>
          <option value="교육/체험">교육/체험</option>
          <option value="기타">기타</option>
        </select>
        <button
          type="submit"
          className="bg-blue-300 text-white px-4 py-2 rounded"
        >
          회원가입
        </button>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
      </form>
    </div>
  )
}

export default SignupPage

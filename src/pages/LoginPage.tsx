// 로그인

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const rememberedId = localStorage.getItem('rememberedUserId')
    if (rememberedId) {
      setUserId(rememberedId)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          hashed_password: password
        })
      })

      if (response.ok) {
        localStorage.setItem('username', userId)
        if (rememberMe) {
          localStorage.setItem('rememberedUserId', userId)
        } else {
          localStorage.removeItem('rememberedUserId')
        }
        navigate('/')
      } else {
        setError('로그인에 실패했어요. 아이디나 비밀번호를 확인해주세요.')
      }
    } catch (err) {
      setError('서버 연결에 실패했어요.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mb-6">
      <h1 className="text-3xl font-bold mb-4">로그인</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          아이디 기억하기
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          로그인
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-blue-600 hover:underline text-sm"
        >
          ➕ Sign up
        </button>
      </form>
    </div>
  )
}

export default LoginPage
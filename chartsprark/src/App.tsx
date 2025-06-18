import React, { useState } from 'react'

import './App.css'
import "tailwindcss";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Geminiscreen from './Chatscreen/Geminiscreen';
import DarkModeToggle from './components/Common/DarkModeToggle';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';

const App: React.FC = () => {
  const [step, setStep] = useState<'register' | 'login' | 'chat'>('register');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="flex justify-end mb-4">
        <DarkModeToggle />
      </div>
      {step === 'register' && <Register onRegistered={() => setStep('login')} />}
      {step === 'login' && <Login onLoginSuccess={() => setStep('chat')} />}
      {step === 'chat' && (
        <>
          <AnalyticsDashboard />
          <Geminiscreen />
        </>
      )}
    </div>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import JournalPage from './components/JournalPage'
import StudentPortal from './components/StudentPortal'
import { TakeTest, MoodTrack, Resources, BuddyBot, Community, Counselling } from './pages/FeaturePages'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>} />
      <Route path="/login" element={<Layout></Layout>} />
      <Route path="/register" element={<Layout></Layout>} />
      <Route path="/admin-dashboard" element={<Layout></Layout>} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/student-portal" element={<StudentPortal />} />
      <Route path="/test" element={<TakeTest />} />
      <Route path="/mood" element={<MoodTrack />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/buddy" element={<BuddyBot />} />
      <Route path="/community" element={<Community />} />
      <Route path="/counselling" element={<Counselling />} />
    </Routes>
  )
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageLayout = ({ title, icon, children }) => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#D4E7ED] to-[#BED7C3] p-6 font-sans">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-2xl text-[#2C3E3F] hover:opacity-70 transition-opacity"
            >
                ← Back
            </button>
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-lg text-center">
                <div className="text-6xl mb-4">{icon}</div>
                <h1 className="text-3xl font-bold text-[#2C3E3F] mb-4">{title}</h1>
                <div className="text-[#5F6F73] text-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const TakeTest = () => (
    <PageLayout title="Take Test" icon="📋">
        <p>Your scheduled assessments will appear here.</p>
        <button className="mt-6 bg-[#A8C699] text-white px-6 py-3 rounded-full font-semibold hover:brightness-105 transition-all">
            Start New Assessment
        </button>
    </PageLayout>
);

export const MoodTrack = () => (
    <PageLayout title="Mood Tracker" icon="❤️">
        <p>How are you feeling right now?</p>
        <div className="flex justify-center gap-4 mt-6 text-4xl">
            <button className="hover:scale-110 transition-transform">😄</button>
            <button className="hover:scale-110 transition-transform">🙂</button>
            <button className="hover:scale-110 transition-transform">😐</button>
            <button className="hover:scale-110 transition-transform">😔</button>
            <button className="hover:scale-110 transition-transform">😫</button>
        </div>
    </PageLayout>
);

export const Resources = () => (
    <PageLayout title="Resources" icon="💡">
        <p>Explore our library of mental health articles, videos, and guides.</p>
        <div className="mt-6 space-y-4 text-left">
            <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                <h3 className="font-bold text-[#2C3E3F]">Understanding Anxiety</h3>
                <p className="text-sm">5 min read</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                <h3 className="font-bold text-[#2C3E3F]">Better Sleep Habits</h3>
                <p className="text-sm">Video • 10 mins</p>
            </div>
        </div>
    </PageLayout>
);

export const BuddyBot = () => (
    <PageLayout title="BuddyBot" icon="🤖">
        <p>I'm here to listen. Start a conversation below.</p>
        <div className="mt-6 h-48 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
            Chat Interface Placeholder
        </div>
    </PageLayout>
);

export const Community = () => (
    <PageLayout title="Community" icon="🤝">
        <p>Connect with peers in a safe, moderated environment.</p>
        <div className="mt-6 space-y-4 text-left">
            <div className="p-4 border border-[#A8C699] rounded-xl">
                <h3 className="font-bold text-[#2C3E3F]">Exam Stress Support Group</h3>
                <p className="text-sm text-green-700">25 members online</p>
            </div>
            <div className="p-4 border border-[#A8C699] rounded-xl">
                <h3 className="font-bold text-[#2C3E3F]">Meditation Club</h3>
                <p className="text-sm text-green-700">12 members online</p>
            </div>
        </div>
    </PageLayout>
);

export const Counselling = () => (
    <PageLayout title="Counselling" icon="📅">
        <p>Book a session with our professional counsellors.</p>
        <div className="mt-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">👨‍⚕️</div>
                <div className="text-left">
                    <h3 className="font-bold text-[#2C3E3F]">Dr. Strange</h3>
                    <p className="text-sm">Available Today, 4:00 PM</p>
                </div>
                <button className="ml-auto bg-[#A8C699] text-white px-4 py-2 rounded-full text-sm">Book</button>
            </div>
        </div>
    </PageLayout>
);

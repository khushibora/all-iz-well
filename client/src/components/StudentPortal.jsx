import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentPortal.css';

// --- Sub-components ---

const DashboardHeader = ({ language, setLanguage }) => {
    const navigate = useNavigate();
    const [showLangMenu, setShowLangMenu] = useState(false);
    const languages = ["English", "Hindi", "Assamese"];

    return (
        <header className="portal-header">
            <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
                ←
            </button>

            <div className="portal-logo-container">
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    🎓
                </div>
            </div>

            <div className="lang-selector">
                <button className="lang-btn" onClick={() => setShowLangMenu(!showLangMenu)}>
                    {language} <span>⌄</span>
                </button>
                {showLangMenu && (
                    <div className="lang-menu">
                        {languages.map(lang => (
                            <button
                                key={lang}
                                onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                                className={`lang-option ${language === lang ? 'selected' : ''}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

const UserSection = () => {
    return (
        <section className="user-section">
            <h1 className="portal-title">Student Portal</h1>

            <div className="user-info-row">
                <span className="notification-icon" onClick={() => console.log("Notifications clicked")}>🔔</span>
                <div className="user-avatar">👤</div>
                <span className="username">Rancho</span>
            </div>

            <p className="quote-text">"The best way out is always through." - Robert Frost</p>
        </section>
    );
};

const ShortsSection = ({ onShortClick }) => {
    const shorts = [
        { id: 1, icon: "🧠", label: "Mind", color: "#FF9A9E" },
        { id: 2, icon: "📚", label: "Study", color: "#A8C699" },
        { id: 3, icon: "🧘", label: "Yoga", color: "#D4E7ED" },
        { id: 4, icon: "🏏", label: "Sport", color: "#FECFEF" }
    ];

    return (
        <section className="shorts-section">
            <div className="shorts-container">
                {shorts.map(short => (
                    <button
                        key={short.id}
                        className="short-btn"
                        onClick={() => onShortClick(short)}
                        aria-label={short.label}
                        style={{ borderColor: short.color }}
                    >
                        {short.icon}
                    </button>
                ))}
            </div>
            <p className="shorts-caption">Personalised inspiring & educational shorts</p>
        </section>
    );
};

const NotificationBanner = ({ onClick }) => {
    return (
        <div className="notification-banner" onClick={onClick}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🔔</span>
                <span className="banner-text">Booking <span style={{ color: 'green', fontWeight: 'bold' }}>approved</span> by counsellor Dr. Strange</span>
            </div>
            <button className="banner-link">
                Click here to see more details
            </button>
        </div>
    );
};

const FeatureGrid = () => {
    const navigate = useNavigate();

    const features = [
        { id: 'test', label: 'Take Test', icon: '📋', path: '/test' },
        { id: 'mood', label: 'Mood Track', icon: '❤️', path: '/mood' },
        { id: 'journal', label: 'Journal', icon: '📓', path: '/journal' },
        { id: 'resources', label: 'Resources', icon: '💡', path: '/resources' },
        { id: 'buddy', label: 'BuddyBot', icon: '🤖', path: '/buddy' },
        { id: 'community', label: 'Community', icon: '🤝', path: '/community' },
        { id: 'counselling', label: 'Counselling & Booking', icon: '📅', path: '/counselling' },
    ];

    return (
        <div className="feature-grid">
            {features.map(feature => (
                <div
                    key={feature.id}
                    className="feature-card"
                    onClick={() => navigate(feature.path)}
                >
                    <span className="feature-icon">{feature.icon}</span>
                    <span className="feature-label">{feature.label}</span>
                </div>
            ))}
        </div>
    );
};

const EmergencySection = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [sosSent, setSosSent] = useState(false);

    const handleSosClick = () => {
        setShowDialog(true);
        setSosSent(false);
    };

    const confirmSos = () => {
        setSosSent(true);
        // Simulate API call delay
        setTimeout(() => {
            setShowDialog(false);
            setSosSent(false);
        }, 3000);
    };

    return (
        <>
            <div className="emergency-section">
                <button className="sos-btn" onClick={handleSosClick}>SOS</button>
            </div>

            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        {!sosSent ? (
                            <>
                                <h3 className="dialog-title text-red-600">Emergency SOS</h3>
                                <p className="mb-4">Are you sure you want to trigger an SOS alert? This will notify your emergency contacts and authorities.</p>
                                <div className="dialog-actions">
                                    <button className="btn-cancel" onClick={() => setShowDialog(false)}>Cancel</button>
                                    <button className="btn-confirm" onClick={confirmSos}>YES, HELP ME</button>
                                </div>
                            </>
                        ) : (
                            <div className="py-4">
                                <div className="text-4xl mb-2">✅</div>
                                <h3 className="dialog-title text-green-600">Help is on the way!</h3>
                                <p>Emergency contacts have been notified.</p>
                                <p className="text-sm text-gray-500 mt-2">Closing in 3 seconds...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

// --- Modals ---

const VideoModal = ({ isOpen, onClose, short }) => {
    if (!isOpen || !short) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content video-modal" onClick={e => e.stopPropagation()}>
                <div className="video-placeholder">
                    <span className="text-6xl">{short.icon}</span>
                    <p>Playing {short.label} Short...</p>
                </div>
                <button className="close-modal-btn" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

const BookingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content booking-modal" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <p className="font-semibold text-green-800">Status: Approved ✅</p>
                </div>
                <div className="space-y-3 text-left">
                    <p><strong>Counsellor:</strong> Dr. Strange</p>
                    <p><strong>Date:</strong> Oct 24, 2025</p>
                    <p><strong>Time:</strong> 4:00 PM - 5:00 PM</p>
                    <p><strong>Mode:</strong> Video Call</p>
                </div>
                <button className="mt-6 w-full bg-[#A8C699] text-white py-2 rounded-full font-semibold" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---

const StudentPortal = () => {
    const [language, setLanguage] = useState("English");
    const [selectedShort, setSelectedShort] = useState(null);
    const [showBooking, setShowBooking] = useState(false);

    return (
        <div className="student-portal-container">
            <DashboardHeader language={language} setLanguage={setLanguage} />
            <UserSection />
            <ShortsSection onShortClick={setSelectedShort} />
            <NotificationBanner onClick={() => setShowBooking(true)} />
            <FeatureGrid />
            <EmergencySection />

            <VideoModal
                isOpen={!!selectedShort}
                short={selectedShort}
                onClose={() => setSelectedShort(null)}
            />

            <BookingModal
                isOpen={showBooking}
                onClose={() => setShowBooking(false)}
            />
        </div>
    );
};

export default StudentPortal;

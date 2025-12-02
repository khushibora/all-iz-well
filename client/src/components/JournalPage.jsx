import React, { useState } from 'react';
import './JournalPage.css';
const JournalHeader = () => {

    const [language, setLanguage] = useState("English");
    const [showLangMenu, setShowLangMenu] = useState(false);
    const languages = ["English", "Hindi", "Assamese"];
    return (
        <header className="journal-header">
            <button
                className="header-btn"
                aria-label="Go back"
                onClick={() => console.log("Back clicked")}
            >
                ←
            </button>

            <div className="logo-circle" />

            <div className="lang-container">
                <button
                    className={`lang-pill ${showLangMenu ? 'active' : ''}`}
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    aria-label="Select Language"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="lang-text">{language}</span>
                    <svg className={`chevron ${showLangMenu ? 'rotate' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>

                {showLangMenu && (
                    <>
                        <div className="lang-menu-backdrop" onClick={() => setShowLangMenu(false)} />
                        <div className="lang-menu">
                            {languages.map((lang) => (
                                <button
                                    key={lang}
                                    className={`lang-option ${language === lang ? 'selected' : ''}`}
                                    onClick={() => {
                                        setLanguage(lang);
                                        setShowLangMenu(false);
                                    }}
                                >
                                    {lang}
                                    {language === lang && <span className="check-icon">✓</span>}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

const JournalTitleSection = () => {
    return (
        <section className="journal-title-section">
            <h1 className="page-title">Journal</h1>
            <p className="page-subtitle">How are you feeling today?</p>
        </section>
    );
};

const DateTimeChips = () => {
    return (
        <div className="date-time-chips">
            <button
                className="chip-btn"
                onClick={() => console.log("Date chip clicked")}
            >
                Sept 15, 2025
            </button>
            <button
                className="chip-btn"
                onClick={() => console.log("Time chip clicked")}
            >
                12:00 PM
            </button>
        </div>
    );
};

const JournalEntryCard = ({ title, time, preview, footerLabel, footerIconType }) => {
    return (
        <article
            className="journal-card"
            onClick={() => console.log(`Clicked entry: ${title}`)}
        >
            <div className="card-header">
                <h3 className="entry-title">{title}</h3>
                <span className="entry-time">{time}</span>
            </div>

            <p className="entry-preview">{preview}</p>

            <div className="card-footer">
                <span className="footer-label">{footerLabel}</span>
                <span className="footer-icon">
                    {footerIconType === 'share' ? '↗' : '🔒'}
                </span>
            </div>
        </article>
    );
};

const JournalList = ({ entries }) => {
    return (
        <div className="journal-list">
            {entries.map(entry => (
                <JournalEntryCard
                    key={entry.id}
                    title={entry.title}
                    time={entry.time}
                    preview={entry.preview}
                    footerLabel={entry.footerLabel}
                    footerIconType={entry.footerIconType}
                />
            ))}
        </div>
    );
};

const AddNoteButton = ({ onClick }) => {
    return (
        <div className="add-note-container">
            <button
                className="add-note-btn"
                onClick={onClick}
            >
                Add a Note +
            </button>
        </div>
    );
};

const NewEntryModal = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        onSave({ title, content });
        setTitle('');
        setContent('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">New Journal Entry</h2>

                <form onSubmit={handleSubmit} className="modal-input-group">
                    <label className="modal-label">Title</label>
                    <input
                        type="text"
                        className="modal-input"
                        placeholder="e.g. Morning Reflection"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />

                    <label className="modal-label">Thoughts</label>
                    <textarea
                        className="modal-textarea"
                        placeholder="How are you feeling?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Save Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const JournalPage = () => {
    const [entries, setEntries] = useState([
        {
            id: 1,
            title: "Today's Reflection",
            time: "2h ago",
            preview: "Had a challenging day with assignments but managed to complete most tasks. I felt a bit overwhelmed at noon but took a break.",
            footerLabel: "Share with counselor",
            footerIconType: "lock"
        },
        {
            id: 2,
            title: "Morning thoughts",
            time: "Yesterday",
            preview: "Feeling more optimistic today. The breathing exercises helped me calm down before the exam. I want to keep this streak going.",
            footerLabel: "Shared",
            footerIconType: "share"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddEntry = ({ title, content }) => {
        const newEntry = {
            id: Date.now(),
            title: title,
            time: "Just now",
            preview: content,
            footerLabel: "Private",
            footerIconType: "lock"
        };
        setEntries([newEntry, ...entries]);
    };

    return (
        <div className="journal-page-wrapper">
            <JournalHeader />
            <JournalTitleSection />
            <DateTimeChips />
            <JournalList entries={entries} />
            <AddNoteButton onClick={() => setIsModalOpen(true)} />
            <div className="bottom-indicator" />

            <NewEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddEntry}
            />
        </div>
    );
};

export default JournalPage;

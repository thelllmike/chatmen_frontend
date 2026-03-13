"use client";

import { useState } from "react";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    id: 1,
    type: "image-grid",
    question: "What are you looking for?",
    options: [
      { label: "A committed relationship", emoji: "💕", img: "/images/committed.jpg" },
      { label: "Casual dating and fun", emoji: "💋", img: "/images/casual.jpg" },
      { label: "New friendships", emoji: "🤝", img: "/images/friendship.jpg" },
      { label: "Still figuring it out", emoji: "🤷", img: "/images/figuring.jpg" },
    ],
  },
  {
    id: 2,
    type: "option-list",
    question: "How old are you?",
    options: [
      { label: "18 - 24" },
      { label: "25 - 34" },
      { label: "35 - 44" },
      { label: "45 - 54" },
      { label: "55 +" },
    ],
  },
  {
    id: 3,
    type: "option-list-icon",
    question: "How would you describe your personality?",
    options: [
      { label: "Introverted", icon: "🏠" },
      { label: "Extroverted", icon: "👥" },
      { label: "A mix of both", icon: "🏡" },
      { label: "Not sure", icon: "🤔" },
    ],
  },
  {
    id: 4,
    type: "option-list",
    question: "Where are you on your dating journey?",
    options: [
      { label: "Almost living my dream love life" },
      { label: "Making some progress" },
      { label: "Just getting started" },
    ],
  },
  {
    id: 5,
    type: "info",
    title: "You've come to the right place!",
    subtitle:
      "Men like you make up 34% of our community and have already found what they were looking for.",
    rating: "4.6/5",
    reviews: "465 reviews",
  },
  {
    id: 6,
    type: "checkbox",
    question: "What skills would you like to improve?",
    subtitle: "Select all that apply",
    options: [
      { label: "Secrets of attraction", icon: "💜" },
      { label: "Texting with confidence", icon: "💬" },
      { label: "Flirting tips", icon: "💫" },
      { label: "Building self-confidence", icon: "💪" },
      { label: "Starting conversations", icon: "🗨️" },
    ],
  },
];

const TOTAL_STEPS = 26;
const PROGRESS_SECTIONS = 5;

function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.logoIcon}>💬</div>
      <span className={styles.logoText}>
        <span className={styles.logoTextPink}>Chatmen</span>
      </span>
    </div>
  );
}

function ProgressBar({ step }) {
  const sectionIndex = Math.floor(((step - 1) / TOTAL_STEPS) * PROGRESS_SECTIONS);
  const sectionProgress = ((step - 1) / TOTAL_STEPS) * PROGRESS_SECTIONS - sectionIndex;

  return (
    <div className={styles.progressBar}>
      <div
        className={`${styles.progressDot} ${styles.progressDotFirst}`}
      />
      {Array.from({ length: PROGRESS_SECTIONS }).map((_, i) => (
        <div key={i} style={{ display: "contents" }}>
          <div
            className={`${styles.progressSegment} ${
              i < sectionIndex ? styles.progressSegmentActive : ""
            }`}
            style={
              i === sectionIndex
                ? {
                    background: `linear-gradient(to right, var(--progress-active) ${sectionProgress * 100}%, var(--progress-inactive) ${sectionProgress * 100}%)`,
                  }
                : undefined
            }
          />
          <div
            className={`${styles.progressDot} ${
              i < sectionIndex ? styles.progressDotActive : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
}

function ImageGrid({ options, selected, onSelect }) {
  return (
    <div className={styles.imageGrid}>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`${styles.imageCard} ${
            selected === i ? styles.imageCardSelected : ""
          }`}
          onClick={() => onSelect(i)}
        >
          <div className={styles.imageCardImg} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
            {opt.emoji}
          </div>
          <div className={styles.imageCardLabel}>{opt.label}</div>
        </div>
      ))}
    </div>
  );
}

function OptionList({ options, selected, onSelect, showIcons }) {
  return (
    <div className={styles.optionList}>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`${styles.optionItem} ${
            selected === i ? styles.optionItemSelected : ""
          }`}
          onClick={() => onSelect(i)}
        >
          {showIcons && opt.icon && (
            <div className={styles.optionIcon}>{opt.icon}</div>
          )}
          {opt.label}
        </div>
      ))}
    </div>
  );
}

function CheckboxList({ options, selected, onToggle }) {
  return (
    <div className={styles.optionList}>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`${styles.checkboxItem} ${
            selected.includes(i) ? styles.checkboxItemSelected : ""
          }`}
          onClick={() => onToggle(i)}
        >
          {opt.icon && <div className={styles.optionIcon}>{opt.icon}</div>}
          <span className={styles.checkboxLabel}>{opt.label}</span>
          <div
            className={`${styles.checkbox} ${
              selected.includes(i) ? styles.checkboxChecked : ""
            }`}
          >
            {selected.includes(i) && "✓"}
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoScreen({ data }) {
  return (
    <div className={styles.infoScreen}>
      <h2 className={styles.infoTitle}>{data.title}</h2>
      <p className={styles.infoSubtitle}>{data.subtitle}</p>

      <div className={styles.ratingBadge}>
        <div className={styles.ratingIcon}>★</div>
        <div className={styles.ratingText}>
          <div className={styles.ratingScore}>{data.rating}</div>
          <div className={styles.ratingCount}>{data.reviews}</div>
        </div>
      </div>

      <div className={styles.beforeAfter}>
        <div className={styles.beforeAfterCol}>
          <div className={styles.beforeAfterLabel}>Before ✗</div>
          <div className={styles.phonePreview}>
            <div className={styles.notifItem}>
              <div className={styles.notifDot} style={{ background: "#E94057" }} />
              <div className={styles.notifText}>
                <span className={styles.notifApp}>Tinder</span>
                <span className={styles.notifMsg}>1 new message</span>
              </div>
            </div>
            <div className={styles.notifItem}>
              <div className={styles.notifDot} style={{ background: "#FFC629" }} />
              <div className={styles.notifText}>
                <span className={styles.notifApp}>Bumble</span>
                <span className={styles.notifMsg}>1 new message</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.beforeAfterCol}>
          <div className={styles.beforeAfterLabel}>After ✓</div>
          <div className={styles.phonePreview}>
            {[
              { app: "Tinder", count: 32, color: "#E94057" },
              { app: "Bumble", count: 21, color: "#FFC629" },
              { app: "Match", count: 16, color: "#6C63FF" },
              { app: "Badoo", count: 13, color: "#783BF9" },
              { app: "Hinge", count: 23, color: "#4A4A4A" },
            ].map((n, i) => (
              <div key={i} className={styles.notifItem}>
                <div className={styles.notifDot} style={{ background: n.color }} />
                <div className={styles.notifText}>
                  <span className={styles.notifApp}>{n.app}</span>
                  <span className={styles.notifMsg}>{n.count} new messages</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checkboxSelections, setCheckboxSelections] = useState([]);

  const currentQ = QUESTIONS[step];
  const isFirst = step === 0;
  const isLast = step === QUESTIONS.length - 1;

  const handleSelect = (index) => {
    setAnswers({ ...answers, [currentQ.id]: index });
    // Auto-advance for single-select questions
    if (currentQ.type !== "checkbox" && currentQ.type !== "info") {
      setTimeout(() => {
        if (step < QUESTIONS.length - 1) setStep(step + 1);
      }, 300);
    }
  };

  const handleCheckboxToggle = (index) => {
    setCheckboxSelections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleContinue = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      if (QUESTIONS[step - 1].type === "checkbox") {
        // Keep checkbox state
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          {!isFirst && (
            <button className={styles.backButton} onClick={handleBack}>
              ‹
            </button>
          )}
          <Logo />
          <span className={styles.stepCounter}>
            {step + 1}/{TOTAL_STEPS}
          </span>
        </div>

        {/* Progress */}
        <ProgressBar step={step + 1} />

        {/* Content */}
        <div className={styles.content}>
          {currentQ.type === "image-grid" && (
            <>
              <h2 className={styles.question}>{currentQ.question}</h2>
              <ImageGrid
                options={currentQ.options}
                selected={answers[currentQ.id]}
                onSelect={handleSelect}
              />
            </>
          )}

          {currentQ.type === "option-list" && (
            <>
              <h2 className={styles.question}>{currentQ.question}</h2>
              <OptionList
                options={currentQ.options}
                selected={answers[currentQ.id]}
                onSelect={handleSelect}
              />
            </>
          )}

          {currentQ.type === "option-list-icon" && (
            <>
              <h2 className={styles.question}>{currentQ.question}</h2>
              <OptionList
                options={currentQ.options}
                selected={answers[currentQ.id]}
                onSelect={handleSelect}
                showIcons
              />
            </>
          )}

          {currentQ.type === "info" && <InfoScreen data={currentQ} />}

          {currentQ.type === "checkbox" && (
            <>
              <h2 className={styles.question}>{currentQ.question}</h2>
              {currentQ.subtitle && (
                <p className={styles.subtitle}>{currentQ.subtitle}</p>
              )}
              <CheckboxList
                options={currentQ.options}
                selected={checkboxSelections}
                onToggle={handleCheckboxToggle}
              />
            </>
          )}
        </div>

        {/* CTA for info and checkbox screens */}
        {(currentQ.type === "info" || currentQ.type === "checkbox") && (
          <button
            className={`${styles.ctaButton} ${
              currentQ.type === "checkbox" && checkboxSelections.length === 0
                ? styles.ctaButtonDisabled
                : ""
            }`}
            onClick={handleContinue}
            disabled={
              currentQ.type === "checkbox" && checkboxSelections.length === 0
            }
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

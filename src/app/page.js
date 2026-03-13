"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    id: 1,
    type: "image-grid",
    question: "What are you looking for?",
    options: [
      { label: "Serious relationship", emoji: "💕", img: "/images/committed.webp" },
      { label: "Casual connection", emoji: "🔥", img: "/images/casual.webp" },
      { label: "New friends", emoji: "🤝", img: "/images/friendship.webp" },
      { label: "Still figuring it out", emoji: "🤷", img: "/images/figuring.webp" },
    ],
  },
  {
    id: 2,
    type: "option-list",
    question: "How old are you?",
    options: [
      { label: "18 – 24" },
      { label: "25 – 34" },
      { label: "35 – 44" },
      { label: "45 – 54" },
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
    title: "You\u2019ve come to the right place!",
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
      { label: "Secrets of attraction", icon: "🎯" },
      { label: "Texting with confidence", icon: "💬" },
      { label: "Flirting techniques", icon: "🔥" },
      { label: "Building self-confidence", icon: "💪" },
      { label: "Starting conversations", icon: "🗣️" },
    ],
  },
  {
    id: 7,
    type: "goal-summary",
    title: "Awesome! You\u2019ve just set your first goal!",
    encouragement:
      "Let\u2019s keep going so we can find the perfect way for you to build an emotional connection.",
  },
  {
    id: 8,
    type: "likert",
    question: "I prefer to keep my texts light and casual",
    subtitle: "How well does the statement above describe you?",
  },
  {
    id: 9,
    type: "likert",
    question: "I struggle dealing with rejection",
    subtitle: "How well does the statement above describe you?",
  },
  {
    id: 10,
    type: "slider",
    question: "How important is it that a woman shows interest early on?",
    subtitle: "Please choose the level of importance",
    min: 0,
    max: 10,
    minLabel: "Not that important",
    maxLabel: "Very important",
  },
  {
    id: 11,
    type: "before-after-text",
    title:
      "It\u2019s important for a man to know when a woman is interested in him.",
    subtitle:
      "Recognizing her feelings can help guide you toward achieving your dating goals. We\u2019ll take all your preferences into account to create your personalized plan!",
    before: [
      "I\u2019ve been thinking about you\u2026 Want to hang out soon?",
      "Did you enjoy your night?",
      "I\u2019m swamped with work right now; can we chat later?",
    ],
    after: [
      "I can\u2019t stop thinking about our last conversation. Let\u2019s catch up soon!",
      "I had a great night out, but it would\u2019ve been better with you there. How about a fun date this weekend?",
      "I\u2019m buried in work at the moment, but you\u2019re definitely on my mind. Let\u2019s schedule a chat when I\u2019m free!",
    ],
  },
  {
    id: 12,
    type: "likert",
    question: "I tend to open up about my needs right away",
    subtitle: "How well does the statement above describe you?",
  },
  {
    id: 13,
    type: "option-list-icon",
    question: "Do you struggle to keep a conversation going?",
    options: [
      { label: "Yes", icon: "👍" },
      { label: "No", icon: "👎" },
      { label: "Not sure", icon: "🤷" },
    ],
  },
  {
    id: 14,
    type: "option-list-icon",
    question:
      "How quickly do you usually reply to a woman you\u2019re interested in?",
    options: [
      { label: "Right away", icon: "⚡" },
      { label: "I wait a bit", icon: "🕐" },
    ],
  },
  {
    id: 15,
    type: "testimonial",
    title: "Dating can be a challenge, but we are here to support you",
    stat: "Our plans have helped 150,000 men improve their love life",
    reviews: [
      {
        name: "Harry",
        stars: 5,
        text: "I love how personalized the advice is; it really feels tailored to my needs! 💝✨",
      },
      {
        name: "Austin",
        stars: 5,
        text: "The challenges really pushed me out of my comfort zone in the best way! 🙌",
      },
      {
        name: "James",
        stars: 5,
        text: "Finally an app that actually helps with real dating advice. Game changer! 🔥",
      },
    ],
  },
  {
    id: 16,
    type: "option-list-icon",
    question: "Can you easily read between the lines when she texts?",
    options: [
      { label: "Yes", icon: "👍" },
      { label: "No", icon: "👎" },
    ],
  },
  {
    id: 17,
    type: "likert",
    question: "I find it easy to express my emotions through text",
    subtitle: "How well does the statement above describe you?",
  },
  {
    id: 18,
    type: "option-list-icon",
    question: "Do you overthink your messages before sending them?",
    options: [
      { label: "Always", icon: "🔄" },
      { label: "Sometimes", icon: "🤔" },
      { label: "Rarely", icon: "😎" },
      { label: "Never", icon: "⚡" },
    ],
  },
  {
    id: 19,
    type: "likert",
    question: "I know how to create tension and excitement over text",
    subtitle: "How well does the statement above describe you?",
  },
  {
    id: 20,
    type: "slider",
    question: "How confident are you when approaching someone new?",
    subtitle: "Please choose the level of confidence",
    min: 0,
    max: 10,
    minLabel: "Not confident",
    maxLabel: "Very confident",
  },
  {
    id: 21,
    type: "option-list-icon",
    question: "What\u2019s your biggest challenge on dating apps?",
    options: [
      { label: "Getting matches", icon: "💔" },
      { label: "Starting conversations", icon: "💬" },
      { label: "Keeping interest alive", icon: "🔥" },
      { label: "Moving to a real date", icon: "📅" },
    ],
  },
  {
    id: 22,
    type: "likert",
    question: "I feel comfortable being vulnerable with someone I like",
    subtitle: "How well does the statement above describe you?",
  },
  {
    id: 23,
    type: "option-list-icon",
    question: "How do you usually handle silence in a conversation?",
    options: [
      { label: "I double text", icon: "📱" },
      { label: "I wait patiently", icon: "⏳" },
      { label: "I change the topic", icon: "🔀" },
      { label: "I feel anxious", icon: "😰" },
    ],
  },
  {
    id: 24,
    type: "slider",
    question: "How important is humor in your conversations?",
    subtitle: "Please choose the level of importance",
    min: 0,
    max: 10,
    minLabel: "Not important",
    maxLabel: "Essential",
  },
  {
    id: 25,
    type: "likert",
    question: "I can tell when a conversation is going well",
    subtitle: "How well does the statement above describe you?",
  },
  {
    id: 26,
    type: "option-list",
    question: "What best describes your texting style?",
    options: [
      { label: "Short and direct" },
      { label: "Long and detailed" },
      { label: "Playful and witty" },
      { label: "Depends on the person" },
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length;
const PROGRESS_SECTIONS = 5;

const LIKERT_OPTIONS = [
  { icon: "👎", size: "lg", label: "Completely disagree" },
  { icon: "👎", size: "sm", label: "" },
  { icon: "🤷", size: "md", label: "" },
  { icon: "👍", size: "sm", label: "" },
  { icon: "👍", size: "lg", label: "Completely agree" },
];

/* =========================================
   Components
   ========================================= */

function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src="/images/logo.png"
        alt="Chatmen"
        width={32}
        height={32}
        className={styles.logoImg}
      />
      <span className={styles.logoText}>
        <span className={styles.logoTextBrand}>Chatmen</span>
      </span>
    </div>
  );
}

function ProgressBar({ step }) {
  const sectionIndex = Math.floor(
    ((step - 1) / TOTAL_STEPS) * PROGRESS_SECTIONS
  );
  const sectionProgress =
    ((step - 1) / TOTAL_STEPS) * PROGRESS_SECTIONS - sectionIndex;

  return (
    <div className={styles.progressBar}>
      <div className={`${styles.progressDot} ${styles.progressDotFirst}`} />
      {Array.from({ length: PROGRESS_SECTIONS }).map((_, i) => (
        <div key={i} style={{ display: "contents" }}>
          <div
            className={`${styles.progressSegment} ${
              i < sectionIndex ? styles.progressSegmentActive : ""
            }`}
            style={
              i === sectionIndex
                ? {
                    background: `linear-gradient(to right, var(--progress-active) ${
                      sectionProgress * 100
                    }%, var(--progress-inactive) ${sectionProgress * 100}%)`,
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
          <div className={styles.imageCardImgWrapper}>
            <Image
              src={opt.img}
              alt={opt.label}
              fill
              sizes="(max-width: 480px) 45vw, 200px"
              className={styles.imageCardImgReal}
            />
            <div className={styles.imageCardBadge}>{opt.emoji}</div>
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

function LikertScale({ selected, onSelect }) {
  return (
    <div className={styles.likertWrapper}>
      <div className={styles.likertScale}>
        {LIKERT_OPTIONS.map((opt, i) => (
          <div
            key={i}
            className={`${styles.likertOption} ${
              selected === i ? styles.likertOptionSelected : ""
            }`}
            onClick={() => onSelect(i)}
          >
            <div
              className={`${styles.likertIcon} ${
                styles[`likertIcon_${opt.size}`]
              }`}
            >
              {opt.icon}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.likertLabels}>
        <span>Completely disagree</span>
        <span>Completely agree</span>
      </div>
    </div>
  );
}

function SliderInput({ value, onChange, min, max, minLabel, maxLabel }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderMarks}>
        <span>{min}</span>
        <span>{Math.round((max - min) / 2)}</span>
        <span>{max}</span>
      </div>
      <div className={styles.sliderTrack}>
        <div className={styles.sliderFill} style={{ width: `${pct}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.sliderInput}
        />
      </div>
      <div className={styles.sliderLabels}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function GoalSummary({ answers, questions, encouragement }) {
  const goalQ = questions.find((q) => q.id === 1);
  const skillsQ = questions.find((q) => q.id === 6);
  const goalAnswer = answers[1];
  const goalLabel =
    goalAnswer !== undefined ? goalQ.options[goalAnswer].label : "—";
  const goalEmoji =
    goalAnswer !== undefined ? goalQ.options[goalAnswer].emoji : "";

  return (
    <div className={styles.goalSummary}>
      <div className={styles.goalSection}>
        <span className={styles.goalSectionLabel}>Your main goal:</span>
        <div className={styles.goalCard}>
          <span className={styles.goalCardIcon}>{goalEmoji}</span>
          <span>{goalLabel}</span>
        </div>
      </div>
      <div className={styles.goalSection}>
        <span className={styles.goalSectionLabel}>Desired skills:</span>
        <div className={styles.goalCard}>
          <span className={styles.goalCardIcon}>🎯</span>
          <span>
            {answers._checkboxLabels
              ? answers._checkboxLabels.join(", ")
              : "—"}
          </span>
        </div>
      </div>
      <p className={styles.goalEncouragement}>{encouragement}</p>
    </div>
  );
}

function BeforeAfterText({ data }) {
  return (
    <div className={styles.batScreen}>
      <h2 className={styles.batTitle}>{data.title}</h2>
      <p className={styles.batSubtitle}>{data.subtitle}</p>
      <div className={styles.batContainer}>
        <div className={styles.batArrow}>↷</div>
        <div className={styles.batColumns}>
          <div className={styles.batCol}>
            <h4 className={styles.batColTitle}>Before</h4>
            {data.before.map((text, i) => (
              <div key={i} className={styles.batItem}>
                <span className={styles.batX}>✗</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className={`${styles.batCol} ${styles.batColAfter}`}>
            <h4 className={styles.batColTitle}>After</h4>
            {data.after.map((text, i) => (
              <div key={i} className={styles.batItem}>
                <span className={styles.batCheck}>✓</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialScreen({ data }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStart = useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIdx < data.reviews.length - 1)
        setActiveIdx(activeIdx + 1);
      if (diff < 0 && activeIdx > 0) setActiveIdx(activeIdx - 1);
    }
  };

  return (
    <div className={styles.testimonialScreen}>
      <h2 className={styles.testimonialTitle}>{data.title}</h2>

      <div className={styles.testimonialHero}>
        <Image
          src="/images/committed.webp"
          alt="Community"
          width={400}
          height={260}
          className={styles.testimonialImg}
        />
      </div>

      <div
        className={styles.testimonialCarousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.testimonialTrack}
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}
        >
          {data.reviews.map((review, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.reviewHeader}>
                <strong>{review.name}</strong>
                <span className={styles.reviewStars}>
                  {"★".repeat(review.stars)}{" "}
                  <span className={styles.reviewStarNum}>{review.stars}</span>
                </span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.testimonialDots}>
        {data.reviews.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${
              i === activeIdx ? styles.dotActive : ""
            }`}
            onClick={() => setActiveIdx(i)}
          />
        ))}
      </div>

      <p className={styles.testimonialStat}>{data.stat}</p>
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
          <div className={`${styles.beforeAfterLabel} ${styles.labelBefore}`}>
            Before ✗
          </div>
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
          <div className={`${styles.beforeAfterLabel} ${styles.labelAfter}`}>
            After ✓
          </div>
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

/* =========================================
   Main App
   ========================================= */

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checkboxSelections, setCheckboxSelections] = useState([]);
  const [sliderValues, setSliderValues] = useState({});

  const currentQ = QUESTIONS[step];
  const isFirst = step === 0;

  const needsCTA =
    currentQ.type === "info" ||
    currentQ.type === "checkbox" ||
    currentQ.type === "goal-summary" ||
    currentQ.type === "slider" ||
    currentQ.type === "before-after-text" ||
    currentQ.type === "testimonial";

  const handleSelect = (index) => {
    setAnswers({ ...answers, [currentQ.id]: index });
    if (!needsCTA) {
      setTimeout(() => {
        if (step < QUESTIONS.length - 1) setStep(step + 1);
      }, 300);
    }
  };

  const handleCheckboxToggle = (index) => {
    setCheckboxSelections((prev) => {
      const next = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
      return next;
    });
  };

  const handleSliderChange = (val) => {
    setSliderValues({ ...sliderValues, [currentQ.id]: val });
  };

  const handleContinue = () => {
    // Save checkbox labels for goal summary
    if (currentQ.type === "checkbox") {
      const skillsQ = QUESTIONS.find((q) => q.id === 6);
      const labels = checkboxSelections.map((i) => skillsQ.options[i].label);
      setAnswers((prev) => ({ ...prev, _checkboxLabels: labels }));
    }
    if (step < QUESTIONS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const isCTADisabled =
    currentQ.type === "checkbox" && checkboxSelections.length === 0;

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

          {currentQ.type === "goal-summary" && (
            <>
              <h2 className={styles.question}>{currentQ.title}</h2>
              <GoalSummary
                answers={answers}
                questions={QUESTIONS}
                encouragement={currentQ.encouragement}
              />
            </>
          )}

          {currentQ.type === "likert" && (
            <>
              <h2 className={styles.question}>{currentQ.question}</h2>
              {currentQ.subtitle && (
                <p className={styles.subtitle}>{currentQ.subtitle}</p>
              )}
              <LikertScale
                selected={answers[currentQ.id]}
                onSelect={handleSelect}
              />
            </>
          )}

          {currentQ.type === "slider" && (
            <>
              <h2 className={styles.question}>{currentQ.question}</h2>
              {currentQ.subtitle && (
                <p className={styles.subtitle}>{currentQ.subtitle}</p>
              )}
              <SliderInput
                value={sliderValues[currentQ.id] ?? 5}
                onChange={handleSliderChange}
                min={currentQ.min}
                max={currentQ.max}
                minLabel={currentQ.minLabel}
                maxLabel={currentQ.maxLabel}
              />
            </>
          )}

          {currentQ.type === "before-after-text" && (
            <BeforeAfterText data={currentQ} />
          )}

          {currentQ.type === "testimonial" && (
            <TestimonialScreen data={currentQ} />
          )}
        </div>

        {/* CTA Button */}
        {needsCTA && (
          <button
            className={`${styles.ctaButton} ${
              isCTADisabled ? styles.ctaButtonDisabled : ""
            }`}
            onClick={handleContinue}
            disabled={isCTADisabled}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

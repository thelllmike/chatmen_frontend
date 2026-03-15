"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  UserIcon,
  LockIcon,
  BubbleChatIcon,
  CrownIcon,
  StarsIcon,
  FavouriteIcon,
  CheckListIcon,
  SecurityCheckIcon,
  CreditCardIcon,
  MailOpenIcon,
  ClockCheckIcon,
} from "@hugeicons/core-free-icons";

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
    id: "testimonial-1",
    type: "testimonial",
    skipCount: true,
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
    id: 15,
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
    id: "chat-compare",
    type: "chat-compare",
    skipCount: true,
    title: "We\u2019re really sorry to hear that!",
    subtitle:
      "But don\u2019t worry, by the end of this journey, your dating life will be exciting and fulfilling.",
    before: { message: "Good morning!", seen: "Seen 2 hours ago" },
    after: {
      message:
        "How would you have liked me to wake you up this morning?",
      reacted: true,
    },
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
    id: "thanks-honest",
    type: "thanks-honest",
    skipCount: true,
    title: "Thanks for being honest!",
    subtitle:
      "We know opening up isn\u2019t always easy, but the results will be worth it. Just a few more questions and your perfect plan will be ready!",
    bullets: [
      "Skip the small talk and dive into conversations",
      "Achieve your dating goals in no time",
      "Always know what to say to any woman",
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
  {
    id: "loading-plan",
    type: "loading-plan",
    skipCount: true,
    title: "Loading your personalized plan!",
    potentialLabel: "Your love life potential",
    steps: [
      { label: "Setting your goals", target: 100 },
      { label: "Adapting key growth areas", target: 87 },
      { label: "Selecting content", target: 100 },
      { label: "Prioritizing challenges", target: 100 },
    ],
    reviews: [
      {
        name: "Jonathan",
        stars: 5,
        text: "Finally, an app that helps me understand what women want \u2014 super helpful! \ud83c\udf89\ud83d\udd0d",
      },
      {
        name: "Kenneth",
        stars: 5,
        text: "I appreciate the daily learning goals; they keep me motivated to grow! \ud83d\udcc8\ud83d\udcaa",
      },
      {
        name: "Lucas",
        stars: 5,
        text: "I\u2019ve never felt more confident texting. This app changed everything! \ud83d\udd25",
      },
    ],
  },
  {
    id: "journey",
    type: "journey",
    skipCount: true,
    title: "Your Journey to Dating Success with Chatmen",
    milestones: [
      { label: "Start using Chatmen", time: "Today", color: "primary" },
      { label: "Go on dates", time: "In 1 week", color: "mid" },
      { label: "Achieve your dating goals", time: "In 4 weeks", color: "success" },
    ],
    cta: "Get My AI Dating Assistant",
  },
  {
    id: "email",
    type: "email",
    skipCount: true,
    title: "Enter your email to see your results",
    privacy:
      "Your privacy is important to us, and we\u2019re dedicated to safeguarding your personal information. We will handle your data in accordance with our Privacy Policy.",
    cta: "Get My AI Dating Assistant",
  },
  {
    id: "subscription",
    type: "subscription",
    skipCount: true,
  },
];

// Count only questions that are not skipped for the step counter
const COUNTED_QUESTIONS = QUESTIONS.filter((q) => !q.skipCount);
const TOTAL_STEPS = COUNTED_QUESTIONS.length;
const PROGRESS_SECTIONS = 5;

function getDisplayStep(stepIndex) {
  let count = 0;
  for (let i = 0; i <= stepIndex; i++) {
    if (!QUESTIONS[i].skipCount) count++;
  }
  return count;
}

const LIKERT_OPTIONS = [
  { icon: "👎", label: "Completely disagree" },
  { icon: "🤷", label: "" },
  { icon: "👍", label: "Completely agree" },
];

/* =========================================
   Components
   ========================================= */

function Logo() {
  return (
    <div className={styles.logo}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.svg"
        alt="Chatmen"
        className={styles.logoImg}
      />
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
            <div className={styles.likertIcon}>
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

function ChatCompareScreen({ data }) {
  return (
    <div className={styles.chatCompareScreen}>
      <h2 className={styles.question}>{data.title}</h2>
      <p className={styles.subtitle}>{data.subtitle}</p>

      <div className={styles.chatCompare}>
        <div className={styles.chatCol}>
          <div className={`${styles.beforeAfterLabel} ${styles.labelBefore}`}>
            Before ✗
          </div>
          <div className={styles.chatBubbleBefore}>
            <p className={styles.chatMsg}>{data.before.message}</p>
            <span className={styles.chatSeen}>{data.before.seen}</span>
          </div>
        </div>

        <div className={styles.chatArrow}>→</div>

        <div className={styles.chatCol}>
          <div className={`${styles.beforeAfterLabel} ${styles.labelAfter}`}>
            After ✓
          </div>
          <div className={styles.chatBubbleAfter}>
            <p className={styles.chatMsg}>{data.after.message}</p>
            {data.after.reacted && (
              <span className={styles.chatReaction}>❤️</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThanksHonestScreen({ data }) {
  return (
    <div className={styles.thanksScreen}>
      <h2 className={styles.question}>{data.title}</h2>
      <p className={styles.subtitle}>{data.subtitle}</p>

      <div className={styles.timeline}>
        {data.bullets.map((item, i) => (
          <div key={i} className={styles.timelineItem}>
            <div className={styles.timelineDotLine}>
              <div className={styles.timelineDot} />
              {i < data.bullets.length - 1 && (
                <div className={styles.timelineLine} />
              )}
            </div>
            <p className={styles.timelineText}>{item}</p>
          </div>
        ))}
      </div>

      <div className={styles.thanksHero}>
        <Image
          src="/images/casual.webp"
          alt="Support"
          width={400}
          height={280}
          className={styles.thanksImg}
        />
      </div>
    </div>
  );
}

function LoadingPlanScreen({ data }) {
  const [progress, setProgress] = useState(data.steps.map(() => 0));
  const [activeReview, setActiveReview] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let stepIdx = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = [...prev];
        if (stepIdx < data.steps.length) {
          next[stepIdx] = Math.min(
            next[stepIdx] + Math.random() * 15 + 5,
            data.steps[stepIdx].target
          );
          if (next[stepIdx] >= data.steps[stepIdx].target) {
            next[stepIdx] = data.steps[stepIdx].target;
            stepIdx++;
          }
        }
        if (stepIdx >= data.steps.length) {
          clearInterval(interval);
          setDone(true);
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [data.steps]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % data.reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [data.reviews.length]);

  return (
    <div className={styles.loadingScreen}>
      <h2 className={styles.question}>{data.title}</h2>
      <p className={styles.loadingPotential}>{data.potentialLabel}</p>

      <div className={styles.loadingBars}>
        {data.steps.map((s, i) => (
          <div key={i} className={styles.loadingBarItem}>
            <div className={styles.loadingBarHeader}>
              <span>{s.label}</span>
              <span>{Math.round(progress[i])}%</span>
            </div>
            <div className={styles.loadingBarTrack}>
              <div
                className={styles.loadingBarFill}
                style={{ width: `${progress[i]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.loadingReviewCarousel}>
        <div
          className={styles.testimonialTrack}
          style={{ transform: `translateX(-${activeReview * 100}%)` }}
        >
          {data.reviews.map((review, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.reviewHeader}>
                <strong>{review.name}</strong>
                <span className={styles.reviewStars}>
                  {"★".repeat(review.stars)}{" "}
                  <span className={styles.reviewStarNum}>{review.stars}.0</span>
                </span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JourneyScreen({ data, onCTA }) {
  return (
    <div className={styles.journeyScreen}>
      <h2 className={styles.journeyTitle}>{data.title}</h2>

      <div className={styles.journeyChart}>
        <svg viewBox="0 0 400 220" className={styles.journeySvg}>
          {/* Background area fill */}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary-200)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary-500)" />
              <stop offset="50%" stopColor="var(--text-muted)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
          </defs>

          {/* Area */}
          <path
            d="M40,200 C80,190 100,160 140,140 C180,120 200,110 220,105 C260,95 300,60 360,40 L360,200 Z"
            fill="url(#areaGrad)"
          />

          {/* Line */}
          <path
            d="M40,200 C80,190 100,160 140,140 C180,120 200,110 220,105 C260,95 300,60 360,40"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="3"
          />

          {/* Milestone dots */}
          <circle cx="100" cy="160" r="6" fill="var(--primary-500)" stroke="white" strokeWidth="2" />
          <circle cx="220" cy="105" r="6" fill="var(--text-muted)" stroke="white" strokeWidth="2" />
          <circle cx="330" cy="50" r="6" fill="var(--success)" stroke="white" strokeWidth="2" />

          {/* Vertical lines */}
          <line x1="100" y1="160" x2="100" y2="210" stroke="var(--primary-300)" strokeWidth="1" strokeDasharray="4" />
          <line x1="220" y1="105" x2="220" y2="210" stroke="var(--border)" strokeWidth="1" strokeDasharray="4" />
          <line x1="330" y1="50" x2="330" y2="210" stroke="var(--success)" strokeWidth="1" strokeDasharray="4" />
        </svg>

        {/* Milestone labels */}
        <div className={styles.journeyLabels}>
          {data.milestones.map((m, i) => (
            <div
              key={i}
              className={`${styles.journeyMilestone} ${styles[`journeyMilestone_${m.color}`]}`}
            >
              <div className={styles.milestoneBadge}>{m.label}</div>
              <span className={styles.milestoneTime}>{m.time}</span>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.ctaButton} onClick={onCTA}>
        {data.cta}
      </button>
    </div>
  );
}

function EmailScreen({ data, onSubmit }) {
  const [email, setEmail] = useState("");
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className={styles.emailScreen}>
      <div className={styles.emailIconWrap}>
        <div className={styles.emailIcon}>
          <HugeiconsIcon icon={MailOpenIcon} size={28} color="var(--primary-600)" />
        </div>
      </div>

      <h2 className={styles.question}>{data.title}</h2>

      <div className={styles.emailInputWrap}>
        <span className={styles.emailInputIcon}>
          <HugeiconsIcon icon={MailOpenIcon} size={18} color="var(--text-muted)" />
        </span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.emailInput}
        />
      </div>

      <div className={styles.emailPrivacy}>
        <span className={styles.emailLock}>
          <HugeiconsIcon icon={LockIcon} size={14} color="var(--text-muted)" />
        </span>
        <p>{data.privacy}</p>
      </div>

      <button
        className={`${styles.ctaButton} ${!isValid ? styles.ctaButtonDisabled : ""}`}
        disabled={!isValid}
        onClick={() => onSubmit(email)}
      >
        {data.cta}
      </button>
    </div>
  );
}

function SubscriptionPage({ answers, questions }) {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [countdown, setCountdown] = useState({ min: 6, sec: 21 });
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.min === 0 && prev.sec === 0) return prev;
        if (prev.sec === 0) return { min: prev.min - 1, sec: 59 };
        return { ...prev, sec: prev.sec - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const goalQ = questions.find((q) => q.id === 1);
  const goalAnswer = answers[1];
  const goalLabel =
    goalAnswer !== undefined ? goalQ.options[goalAnswer].label : "Casual dating and fun";

  const plans = [
    {
      id: "weekly",
      name: "7 - day plan",
      oldTotal: "USD 43.47",
      newTotal: "USD 10.50",
      oldDaily: "USD 6.21",
      newDaily: "USD 1.50",
      perDay: "per day",
    },
    {
      id: "monthly",
      name: "1 - month plan",
      oldTotal: "USD 43.47",
      newTotal: "USD 19.99",
      oldDaily: "USD 1.40",
      newDaily: "USD 0.64",
      perDay: "per day",
      popular: true,
    },
    {
      id: "quarterly",
      name: "3 - month plan",
      oldTotal: "USD 86.95",
      newTotal: "USD 34.99",
      oldDaily: "USD 0.93",
      newDaily: "USD 0.38",
      perDay: "per day",
    },
  ];

  const features = [
    "Generate Custom Charming Conversation Starters And Icebreakers",
    "Personalized Reply Suggestions",
    "Stand Out with our Bio Generator",
    "Prompts For Approaching In Real Life",
    "Access to New Features",
  ];

  const howItWorks = [
    { step: 1, text: "Upload a screenshot" },
    { step: 2, text: "Choose your goal" },
    { step: 3, text: "Charm her with smart replies and openers carefully crafted by AI." },
  ];

  const faqs = [
    {
      q: "Can I cancel my subscription?",
      a: "Yes, you can cancel your subscription at any time by contacting our support team via email.",
    },
    {
      q: "How does Chatmen work?",
      a: "Chatmen uses AI to analyze dating profiles and conversations, providing personalized openers, replies, and conversation tips.",
    },
    {
      q: "Is Chatmen only for casual hookups?",
      a: "No! Chatmen helps with all types of dating goals — from serious relationships to casual connections and making new friends.",
    },
    {
      q: "Can't I just use my own brain to talk to women?",
      a: "Of course! Chatmen is a tool to enhance your natural communication skills, not replace them. Think of it as a dating coach in your pocket.",
    },
  ];

  const PricingSection = () => (
    <>
      <h2 className={styles.subHeading}>
        Text Like a Flirt God with your personal AI dating assistant
      </h2>

      <div className={styles.timerBanner}>
        <span>This offer ends in</span>
        <div className={styles.timerDigits}>
          <span className={styles.timerBox}>
            {String(countdown.min).padStart(2, "0")}
            <small>min</small>
          </span>
          <span className={styles.timerColon}>:</span>
          <span className={styles.timerBox}>
            {String(countdown.sec).padStart(2, "0")}
            <small>sec</small>
          </span>
        </div>
      </div>

      <div className={styles.planList}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.planCard} ${
              selectedPlan === plan.id ? styles.planCardSelected : ""
            } ${plan.popular ? styles.planCardPopular : ""}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className={styles.popularBadge}>Most Popular</div>
            )}
            <div className={styles.planContent}>
              <div className={styles.planLeft}>
                <div
                  className={`${styles.planRadio} ${
                    selectedPlan === plan.id ? styles.planRadioSelected : ""
                  }`}
                />
                <div>
                  <div className={styles.planName}>{plan.name}</div>
                  <div className={styles.planPrices}>
                    <span className={styles.planOldPrice}>{plan.oldTotal}</span>{" "}
                    {plan.newTotal}
                  </div>
                </div>
              </div>
              <div className={styles.planRight}>
                <span className={styles.planOldDaily}>{plan.oldDaily}</span>
                <span className={styles.planNewDaily}>{plan.newDaily}</span>
                <span className={styles.planPerDay}>{plan.perDay}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.ctaButton}>Get my personal Dating Assistant</button>

      <div className={styles.paySecure}>
        <HugeiconsIcon icon={SecurityCheckIcon} size={16} />
        <span>Pay safe &amp; secure</span>
      </div>
      <div className={styles.cardLogos}>
        <span className={styles.cardLogo}>VISA</span>
        <span className={styles.cardLogo}>MC</span>
        <span className={styles.cardLogo}>VISA</span>
        <span className={styles.cardLogo}>maestro</span>
      </div>

      <p className={styles.legalText}>
        1 - month plan: You are enrolling in a 1 month plan subscription to Chatmen
        service with the discount price $19.99. You agree that the plan you selected
        will automatically be extended at the full price for successive renewal periods
        and you will be charged $43.47 every 1 month until you cancel the subscription.
      </p>
    </>
  );

  return (
    <div className={styles.subPage}>
      {/* Logo */}
      <div className={styles.subLogo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.svg"
          alt="Chatmen"
          className={styles.logoImg}
        />
      </div>

      {/* Now vs After comparison */}
      <div className={styles.compareCard}>
        <div className={styles.compareTabs}>
          <span className={styles.compareTab}>Now</span>
          <span className={styles.compareTab}>After</span>
        </div>
        <div className={styles.compareImages}>
          <div className={styles.compareImgBefore}>
            <Image
              src="/images/figuring.webp"
              alt="Now"
              width={200}
              height={200}
              className={styles.compareImg}
            />
          </div>
          <div className={styles.compareArrow}>›</div>
          <div className={styles.compareImgAfter}>
            <Image
              src="/images/casual.webp"
              alt="After"
              width={200}
              height={200}
              className={styles.compareImg}
            />
          </div>
        </div>
        <div className={styles.compareStats}>
          <div className={styles.compareStat}>
            <div className={styles.compareStatLabel}>Success probability:</div>
            <div className={styles.compareStatBefore}>&gt; 30%</div>
            <div className={styles.compareStatLabel}>Texting skills:</div>
            <div className={styles.skillBars}>
              <span className={styles.skillBar} style={{ background: "var(--primary-500)", width: "33%" }} />
              <span className={styles.skillBar} style={{ background: "var(--border)", width: "33%" }} />
              <span className={styles.skillBar} style={{ background: "var(--border)", width: "33%" }} />
            </div>
          </div>
          <div className={styles.compareStat}>
            <div className={styles.compareStatLabel}>Success probability:</div>
            <div className={styles.compareStatAfter}>74 - 94%</div>
            <div className={styles.compareStatLabel}>Texting skills:</div>
            <div className={styles.skillBars}>
              <span className={styles.skillBar} style={{ background: "var(--primary-500)", width: "33%" }} />
              <span className={styles.skillBar} style={{ background: "var(--primary-500)", width: "33%" }} />
              <span className={styles.skillBar} style={{ background: "var(--primary-500)", width: "33%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Generated Summary */}
      <div className={styles.aiSummary}>
        <span className={styles.aiBadge}>AI generated</span>
        <div className={styles.aiGrid}>
          <div className={styles.aiGridItem}>
            <span className={styles.aiGridIcon}>
              <HugeiconsIcon icon={StarIcon} size={22} color="var(--primary-500)" />
            </span>
            <div>
              <span className={styles.aiGridLabel}>Main goal</span>
              <strong>{goalLabel}</strong>
            </div>
          </div>
          <div className={styles.aiGridItem}>
            <span className={styles.aiGridIcon}>
              <HugeiconsIcon icon={ClockCheckIcon} size={22} color="var(--primary-500)" />
            </span>
            <div>
              <span className={styles.aiGridLabel}>Daily learning</span>
              <strong>&lt; 5 minutes/day</strong>
            </div>
          </div>
          <div className={styles.aiGridItem}>
            <span className={styles.aiGridIcon}>
              <HugeiconsIcon icon={CrownIcon} size={22} color="var(--primary-500)" />
            </span>
            <div>
              <span className={styles.aiGridLabel}>Desired skills</span>
              <strong>
                {answers._checkboxLabels
                  ? answers._checkboxLabels[0]
                  : "Texting with confidence"}
              </strong>
            </div>
          </div>
          <div className={styles.aiGridItem}>
            <span className={styles.aiGridIcon}>
              <HugeiconsIcon icon={UserIcon} size={22} color="var(--primary-500)" />
            </span>
            <div>
              <span className={styles.aiGridLabel}>Your personality</span>
              <strong>Extroverted</strong>
            </div>
          </div>
        </div>
      </div>

      {/* First Pricing Section */}
      <PricingSection />

      {/* IT'S A MATCH */}
      <div className={styles.matchSection}>
        <p className={styles.matchIts}>IT&apos;S A</p>
        <h2 className={styles.matchTitle}>MATCH!</h2>
        <p className={styles.matchSub}>but what&apos;s next?</p>
      </div>

      {/* Features */}
      <div className={styles.featureList}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureItem}>
            <span className={styles.featureCheck}>
              <HugeiconsIcon icon={CheckListIcon} size={20} color="var(--success)" />
            </span>
            <span>{f}</span>
          </div>
        ))}
      </div>

      {/* Works with apps */}
      <div className={styles.appsCard}>
        <p>Works with all your favourite dating apps!</p>
        <div className={styles.appIcons}>
          {["T", "P", "ok", "🔥", "H", "💛", "👁", "m"].map((icon, i) => (
            <span key={i} className={styles.appIcon}>
              {icon}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.cheatCode}>
        <p>
          This &apos;cheat code&apos; will transform your online and real life
          social interactions
        </p>
      </div>

      {/* How it works */}
      <div className={styles.howSection}>
        <p className={styles.howLead}>Land 5.5x more dates using AI.</p>
        <h2 className={styles.howTitle}>How does it work?</h2>
        {howItWorks.map((item) => (
          <div key={item.step} className={styles.howStep}>
            <div className={styles.howStepNum}>{item.step}</div>
            <p className={styles.howStepText}>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className={styles.subTestimonial}>
        <div className={styles.subTestimonialHeader}>
          <div className={styles.subTestimonialAvatar}>B</div>
          <div>
            <strong>Ben</strong>
            <div className={styles.subTestimonialLoc}>Toronto</div>
            <div className={styles.reviewStars}>★★★★★</div>
          </div>
        </div>
        <p className={styles.subTestimonialQuote}>
          <strong>A game changer for faster messaging and playful flirting.</strong>
        </p>
        <p className={styles.subTestimonialText}>
          Picks up on social cues, doesn&apos;t sound like a bot, and adjusts
          for the situation and last text sent.
        </p>
      </div>

      {/* Stats */}
      <div className={styles.statsCard}>
        <p>Our users already arranged</p>
        <h3 className={styles.statsBig}>100,000+ dates</h3>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{faq.q}</span>
              <span
                className={`${styles.faqChevron} ${
                  openFaq === i ? styles.faqChevronOpen : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openFaq === i && <p className={styles.faqAnswer}>{faq.a}</p>}
          </div>
        ))}
      </div>

      {/* Second Pricing Section */}
      <PricingSection />
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

      <div className={styles.beforeAfterImage}>
        <Image
          src="/images/right-place.png"
          alt="Before and After comparison showing increased dating app messages"
          width={960}
          height={580}
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        />
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
    currentQ.type === "testimonial" ||
    currentQ.type === "chat-compare" ||
    currentQ.type === "thanks-honest" ||
    currentQ.type === "loading-plan";

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
        {/* Header — hidden on final screens */}
        {currentQ.type !== "loading-plan" &&
          currentQ.type !== "journey" &&
          currentQ.type !== "email" &&
          currentQ.type !== "subscription" && (
          <>
            <div className={styles.header}>
              {!isFirst && (
                <button className={styles.backButton} onClick={handleBack}>
                  ‹
                </button>
              )}
              <Logo />
              <span className={styles.stepCounter}>
                {currentQ.skipCount ? "" : `${getDisplayStep(step)}/${TOTAL_STEPS}`}
              </span>
            </div>

            {/* Progress */}
            <ProgressBar step={getDisplayStep(step)} />
          </>
        )}

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

          {currentQ.type === "chat-compare" && (
            <ChatCompareScreen data={currentQ} />
          )}

          {currentQ.type === "thanks-honest" && (
            <ThanksHonestScreen data={currentQ} />
          )}

          {currentQ.type === "loading-plan" && (
            <LoadingPlanScreen data={currentQ} />
          )}

          {currentQ.type === "journey" && (
            <JourneyScreen data={currentQ} onCTA={handleContinue} />
          )}

          {currentQ.type === "email" && (
            <EmailScreen
              data={currentQ}
              onSubmit={(email) => {
                console.log("Email submitted:", email);
                handleContinue();
              }}
            />
          )}

          {currentQ.type === "subscription" && (
            <SubscriptionPage answers={answers} questions={QUESTIONS} />
          )}
        </div>

        {/* CTA Button — journey and email have their own */}
        {needsCTA &&
          currentQ.type !== "journey" &&
          currentQ.type !== "email" && (
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

"use client";

import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  Flower2,
  Heart,
  MapPin,
  Navigation,
  Share2,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./wedding.module.css";

const weddingDate = new Date("2026-11-04T10:00:00+05:30");

const events = [
  {
    day: "03",
    month: "NOV",
    title: "Haldi Ceremony",
    eyebrow: "Rang-e-Haldi",
    description: "A joyful beginning, wrapped in the warmth of family and blessings.",
    icon: Flower2,
  },
  {
    day: "04",
    month: "NOV",
    title: "Baraat",
    eyebrow: "The Celebration",
    description: "Join us as two hearts and two families begin a beautiful new chapter.",
    icon: Sparkles,
    featured: true,
  },
  {
    day: "05",
    month: "NOV",
    title: "Dawat-e-Walima",
    eyebrow: "The Reception",
    description: "An evening of togetherness, gratitude, good food and warm wishes.",
    icon: Heart,
  },
];

function getCountdown() {
  const distance = Math.max(0, weddingDate.getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export default function WeddingExperience() {
  const [opened, setOpened] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);
  const petals = useMemo(
    () =>
      Array.from({ length: 15 }, (_, index) => ({
        left: `${(index * 17 + 7) % 100}%`,
        delay: `${(index * 0.71) % 6}s`,
        duration: `${8 + (index % 5)}s`,
        size: `${8 + (index % 4) * 3}px`,
      })),
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  async function shareInvitation() {
    const shareData = {
      title: "Kalam & Farhan — Wedding Invitation",
      text: "You are warmly invited to celebrate Kalam & Farhan's wedding on 4 November 2026 in Kushinagar.",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareData.text}\n${shareData.url}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className={`${styles.page} ${opened ? styles.isOpen : ""}`}>
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.petals} aria-hidden="true">
        {petals.map((petal, index) => (
          <i
            key={index}
            style={
              {
                "--left": petal.left,
                "--delay": petal.delay,
                "--duration": petal.duration,
                "--size": petal.size,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <section className={styles.hero} id="home">
        <Image
          className={styles.heroImage}
          src="/wedding/couple-portrait.png"
          alt="Kalam and Farhan in their wedding attire"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.arch} aria-hidden="true" />

        <nav className={styles.nav} aria-label="Wedding invitation navigation">
          <a href="#home" className={styles.monogram} aria-label="Kalam and Farhan home">
            K <span>&amp;</span> F
          </a>
          <div className={styles.navLinks}>
            <a href="#story">Our story</a>
            <a href="#celebrations">Celebrations</a>
            <a href="#venue">Venue</a>
          </div>
          <button className={styles.shareButton} onClick={shareInvitation} type="button">
            <Share2 size={16} />
            <span>Share invite</span>
          </button>
        </nav>

        <div className={styles.heroContent}>
          <p className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
          <p className={styles.kicker}>Together with our families</p>
          <h1>
            <span>Kalam</span>
            <em>&amp;</em>
            <span>Farhan</span>
          </h1>
          <div className={styles.dateLine}>
            <span />
            <time dateTime="2026-11-04">04 · 11 · 2026</time>
            <span />
          </div>
          <p className={styles.heroLocation}>
            <MapPin size={15} /> Kasia, Kushinagar
          </p>
          <a className={styles.scrollCue} href="#story" aria-label="Scroll to our story">
            <ChevronDown size={20} />
          </a>
        </div>
      </section>

      <section className={styles.blessing} id="story">
        <div className={styles.ornament} aria-hidden="true">✦</div>
        <p>With the blessings of Allah Almighty</p>
        <h2>We request the honour of your presence</h2>
        <p className={styles.lead}>
          as we celebrate a promise, a partnership, and a lifetime of love. Your presence will
          make our beginning even more beautiful.
        </p>

        <div className={styles.coupleGrid}>
          <article className={styles.personCard}>
            <div className={styles.portraitWrap}>
              <Image
                src="/wedding/kalam.png"
                alt="Kalam Ansari"
                fill
                sizes="(max-width: 720px) 75vw, 360px"
                className={styles.portrait}
              />
            </div>
            <p>The Bride</p>
            <h3>Kalam Ansari</h3>
            <span>Daughter of Hanif Ansari</span>
          </article>

          <div className={styles.heartSeal} aria-hidden="true">
            <span>و</span>
            <small>WEDS</small>
          </div>

          <article className={styles.personCard}>
            <div className={styles.portraitWrap}>
              <Image
                src="/wedding/farhan.png"
                alt="Farhan Ansari"
                fill
                sizes="(max-width: 720px) 75vw, 360px"
                className={styles.portrait}
              />
            </div>
            <p>The Groom</p>
            <h3>Farhan Ansari</h3>
            <span>Son of Wahid Ansari</span>
          </article>
        </div>
      </section>

      <section className={styles.countdownSection} aria-label="Wedding countdown">
        <div>
          <p className={styles.kicker}>Save the date</p>
          <h2>Counting every moment</h2>
        </div>
        <div className={styles.countdown}>
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <a
          className={styles.calendarButton}
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Kalam+%26+Farhan+Wedding&dates=20261104/20261106&details=Join+us+for+Kalam+and+Farhan%27s+wedding+celebrations&location=Kasia%2C+Kushinagar%2C+Uttar+Pradesh"
          target="_blank"
          rel="noreferrer"
        >
          <CalendarDays size={18} /> Add to calendar
        </a>
      </section>

      <section className={styles.eventsSection} id="celebrations">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Three beautiful days</p>
          <h2>Wedding celebrations</h2>
          <p>Come for the rituals, stay for the memories.</p>
        </div>

        <div className={styles.eventsGrid}>
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <article
                key={event.title}
                className={`${styles.eventCard} ${event.featured ? styles.featuredEvent : ""}`}
              >
                <div className={styles.eventDate}>
                  <strong>{event.day}</strong>
                  <span>{event.month}</span>
                </div>
                <Icon className={styles.eventIcon} size={28} strokeWidth={1.4} />
                <p>{event.eyebrow}</p>
                <h3>{event.title}</h3>
                <div className={styles.goldRule} />
                <span>{event.description}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.photoStory}>
        <div className={styles.photoFrame}>
          <Image
            src="/wedding/couple-ring.png"
            alt="Kalam and Farhan celebrating their union"
            fill
            sizes="(max-width: 900px) 92vw, 52vw"
            className={styles.storyImage}
          />
        </div>
        <div className={styles.storyCopy}>
          <span className={styles.scriptWord}>Maktub</span>
          <p className={styles.kicker}>It was written</p>
          <h2>Two hearts, one beautiful qismat.</h2>
          <blockquote>
            “And We created you in pairs.”
            <cite>— The Holy Quran, 78:8</cite>
          </blockquote>
          <div className={styles.signature}>Kalam <span>&amp;</span> Farhan</div>
        </div>
      </section>

      <section className={styles.venueSection} id="venue">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Join us in Kushinagar</p>
          <h2>Come celebrate with us</h2>
        </div>
        <div className={styles.addressGrid}>
          <article>
            <span>BRIDE&apos;S FAMILY</span>
            <h3>Ansari Residence</h3>
            <p>Ward No. 4, Ambedkar Nagar, Bharauli<br />Kasia, Kushinagar, Uttar Pradesh</p>
          </article>
          <div className={styles.pinSeal}><MapPin size={25} /></div>
          <article>
            <span>GROOM&apos;S FAMILY</span>
            <h3>Ansari Residence</h3>
            <p>Ward No. 9, Balasaheb Deoras Nagar, Shahpur<br />Kasia, Kushinagar, Uttar Pradesh</p>
          </article>
        </div>
        <a
          className={styles.directionButton}
          href="https://www.google.com/maps/search/?api=1&query=Kasia%2C+Kushinagar%2C+Uttar+Pradesh"
          target="_blank"
          rel="noreferrer"
        >
          <Navigation size={17} /> Get directions
        </a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerMonogram}>K <span>&amp;</span> F</div>
        <p>We can&apos;t wait to celebrate with you</p>
        <strong>04 · 11 · 2026</strong>
        <button onClick={shareInvitation} type="button">
          <Share2 size={16} /> Share this invitation
        </button>
        <small>Made with love · Powered by InvoiceWala</small>
      </footer>

      <div className={styles.inviteGate} aria-hidden={opened}>
        <div className={styles.gatePattern} />
        <div className={styles.gateContent}>
          <p className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
          <span className={styles.gateKicker}>A wedding invitation</span>
          <div className={styles.gateMonogram}>K <em>&amp;</em> F</div>
          <p className={styles.gateDate}>04 · NOVEMBER · 2026</p>
          <button type="button" onClick={() => setOpened(true)}>
            <span>Open invitation</span>
          </button>
          <small>Kasia · Kushinagar</small>
        </div>
      </div>
    </main>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FullscreenStackingCards.css';

gsap.registerPlugin(ScrollTrigger);

export type CardData = {
  title: string;
  img: string;
  desc: string;
};

type StackingCardsProps = {
  cards: CardData[];
};

export default function FullscreenStackingCards({ cards }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial position and rotation for each .card
    cardsRef.current.forEach((card) => {
      gsap.set(card, {
        y: window.innerHeight,
        /*  rotate: rotations[index % rotations.length], */
      });
    });

    // If screen width < 900 => window.innerHeight * 5, else * 8
    const endValue =
      window.innerWidth < 900 ? window.innerHeight * 5 : window.innerHeight * 8;

    // Create the ScrollTrigger exactly like the original
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${endValue}px`,
      pin: true, // keep pinned
      pinSpacing: true, // ensure there's extra space after pin
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = cardsRef.current.length;
        const progressPerCard = 1 / totalCards;

        cardsRef.current.forEach((card, index) => {
          // For each card, figure out how far into its progress we are
          const cardStart = index * progressPerCard;
          let cardProgress = (progress - cardStart) / progressPerCard;
          cardProgress = Math.min(Math.max(cardProgress, 0), 1);

          // Move the card from bottom -> center
          let yPos = window.innerHeight * (1 - cardProgress);
          let xPos = 0;

          // If card is fully scrolled in (cardProgress===1)
          // and not the last card, push it away as we progress
          if (cardProgress === 1 && index < totalCards - 1) {
            const remainingProgress =
              (progress - (cardStart + progressPerCard)) /
              (1 - (cardStart + progressPerCard));

            if (remainingProgress > 0) {
              // same logic as original
              const distanceMultiplier = 1 - index * 0.15;
              xPos = 0;
              /*  -window.innerWidth *
                0.3 *
                distanceMultiplier *
                remainingProgress; */
              yPos =
                -window.innerHeight *
                0.3 *
                distanceMultiplier *
                remainingProgress;
            }
          }

          // Apply transforms instantly (duration:0, ease:'none')
          gsap.to(card, {
            x: xPos,
            y: yPos,
            duration: 0,
            ease: 'none',
          });
        });
      },
    });
  }, [cards]);

  return (
    <section className='fc-cards' ref={containerRef}>
      <div className='fc-cards-bg'>
        <h2>We are here to help you!</h2>
        <p>A tech team of extraordinary characters</p>
      </div>

      {cards.map((card, i) => (
        <div
          className='fc-card'
          key={i}
          ref={(el) => {
            if (el) cardsRef.current[i] = el;
          }}
        >
          <div className='fc-card-img'>
            <img src={card.img} alt={card.title} />
          </div>
          <div className='fc-card-content'>
            <h2>{card.title}</h2>
            <p>{card.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

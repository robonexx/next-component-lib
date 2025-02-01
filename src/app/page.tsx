import Image from 'next/image';
import StackingCards from '@/components/StackingCards';

const cardsData = [
  { title: 'Patel X-1Z', img: '/image1.jpg' },
  { title: 'ShaQuona 111-A', img: '/image2.jpg' },
  { title: 'Raphael 33-UI', img: '/image3.jpg' },
  { title: 'Ai-gnes 001', img: '/image4.jpg' },
  { title: 'Bob UX-22', img: '/image5.jpg' },
  { title: 'Chang NGX-99', img: '/image6.jpg' },
];

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col row-start-2 items-center sm:items-start'>
        <section className='hero'>
          <h1>HERO</h1>
        </section>
        {/* Test component here */}
        <StackingCards cards={cardsData} />
        {/* Test componet above */}
        <section className='outro'>
          {' '}
          <h2>Below component</h2>
        </section>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

/* 
 <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

*/

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { observeState } from '@/recoil/observe';
import { content } from '@/types/content';

interface props {
  content: content;
  boardId: string;
  isAdd: boolean;
  lineWeight: string;
  boardTheme: 'strcat' | 'calm' | 'green' | 'cyan';
}

const ObserveContent = ({
  content,
  boardId,
  isAdd,
  boardTheme,
  lineWeight,
}: props) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [observe, setObserve] = useRecoilState(observeState);
  const [card, setCard] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, boundingClientRect }) => {
          if (!isAdd && isIntersecting) {
            console.log('in here');
            setCard(true);
          } else {
            setCard(false);
          }
        });
      },
      {
        rootMargin: '-30% 0% -70% 0%',
        threshold: [],
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={` leading-[23px] text-[18px]`}>
      <div
        ref={ref}
        className={`inline
      ${
        card
          ? ` w-full opacity-100 transition-all bg-sumilee-strcat-text-highlight font-semibold text-[18px]`
          : ` w-full opacity-30 transition-all font-medium text-blue-50 `
      }
    `}
      >
        {content.text}
      </div>
    </div>
  );
};

export default React.memo(ObserveContent);

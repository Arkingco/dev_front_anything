import { useEffect, useRef } from 'react';
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, boundingClientRect }) => {
          if (!isAdd && isIntersecting) {
            console.log('in here');
            setObserve(() => ({
              boardId: boardId,
              contentId: content.id,
              photoUrl: content.photoUrl,
              writer: content.writer,
            }));
          } else {
            console.log('in out');
          }
        });
      },
      {
        rootMargin: '-30% 0% -65% 0%',
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
    <div className={`${lineWeight} text-[18px]`}>
      <div
        ref={ref}
        className={`inline
      ${
        !isAdd &&
        observe.boardId === boardId &&
        observe.contentId === content.id
          ? ` w-full opacity-100 transition-all bg-sumilee-strcat-text-highlight font-semibold text-[18px]`
          : ` w-full opacity-30 transition-all font-medium text-blue-50 `
      }
    `}
      >
        {content.text}
      </div>
      {!isAdd &&
        observe.boardId === boardId &&
        observe.contentId === content.id && (
          <div
            className={`absolute right-[22px] z-10 mt-[1px] animate-slide pl-[2px]  text-white opacity-100`}
          >
            <div
              className={`relative top-[-3px] z-20 w-full whitespace-pre-wrap `}
            >
              <div className={`relative top-[3px]`}>{`From: ${
                observe.writer.length ? observe.writer : '익명의 스트링캣'
              } `}</div>
            </div>
          </div>
        )}
    </div>
  );
};

export default React.memo(ObserveContent);

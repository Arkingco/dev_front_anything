'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import StrcatBoard from '@/component/StrcatBoard';
import { board } from '@/types/boards';
import { useRouter } from 'next/navigation';

export default function Personal({ params }: { params: { id: string } }) {
  const [board, setBoard] = useState<board[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/personal`)
      .then((data) => {
        setBoard([data.data.board]);
      })
      .catch((err) => {
        if (err.response.status === 406) router.push('/not-found');
      });
    if (window) {
      setWindowHeight(window.innerHeight);
    }
  }, [params.id]);

  return (
    <>
      <div className={` min-h-full`}>
        <div
          className={`relative w-full py-[24px] text-justify  bg-black`}
          style={{ paddingBottom: `${windowHeight}px` }}
        >
          {board.length && (
            <StrcatBoard
              board={board[0]}
              isAdd={isAdd}
              setIsAdd={setIsAdd}
              isPersonal={true}
              paramsId={params.id}
            />
          )}
        </div>
      </div>
    </>
  );
}

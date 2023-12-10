import {
  Dispatch,
  SetStateAction,
  forwardRef,
  use,
  useEffect,
  useState,
} from 'react';
import React from 'react';
import { useRecoilState } from 'recoil';

import ObserveContent from './ObserveContent';
import { observeState } from '@/recoil/observe';
import { board } from '@/types/boards';
import { content } from '@/types/content';

interface Props {
  board: board;
  isAdd: boolean;
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  isPersonal: boolean;
  paramsId?: string;
}

const StrcatBoard = ({
  board,
  isAdd,
  setIsAdd,
  isPersonal,
  paramsId,
}: Props) => {
  const [observe, setObserve] = useRecoilState(observeState);
  const [content, setContent] = useState<content[]>([]);

  useEffect(() => {
    setContent(board.contents);
    if (board.contents.length === 1) {
      setObserve(() => ({
        boardId: board.id,
        contentId: board.contents[0].id,
        photoUrl: board.contents[0].photoUrl,
        writer: board.contents[0].writer,
      }));
    }
  }, [board]);

  return (
    <div className={` h-auto min-h-[424px] break-all  px-[24px] `}>
      <div className={`z-0 inline`}>
        {content &&
          content.map((content: content) => {
            return (
              <ObserveContent
                boardTheme={board.theme}
                isAdd={isAdd}
                key={content.id}
                content={content}
                boardId={board.id}
                lineWeight=""
              />
            );
          })}
      </div>
    </div>
  );
};

export default React.memo(StrcatBoard);

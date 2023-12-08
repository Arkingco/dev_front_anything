import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full max-w-md flex-col items-center justify-center bg-strcat-default-black px-[24px] pb-[110px]">
      <div className="mx-[12px] flex items-center justify-center text-strcat-default-white text-opacity-40">
        찾으려는 페이지의 주소가 잘못 입력되었거나, 주소의 변경 혹은 삭제로 인해
        사용하실 수 없습니다. 입력하신 페이지의 주소가 정확한지 다시 한번 확인해
        주세요.
      </div>
    </div>
  );
}

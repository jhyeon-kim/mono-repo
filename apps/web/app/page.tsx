import { trpc } from "@web/app/trpc";
import Image from 'next/image'; // Next.js의 Image 컴포넌트를 불러옵니다.

export default async function Home() {
  const { greeting } = await trpc.hello.query({ name: `여러분🌷` });
  return (
    <div>
      <p>{greeting}</p>
      <Image src="/nbcamp_part.jpg" alt="Example Image" width={300} height={300} />
    </div>
  );
}

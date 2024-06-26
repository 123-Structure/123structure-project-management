"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

// Images
import Image01 from "../../../public/img/auth/01.jpg";
import Image02 from "../../../public/img/auth/02.jpg";
import Image03 from "../../../public/img/auth/03.jpg";
import Image04 from "../../../public/img/auth/04.jpg";
import Image05 from "../../../public/img/auth/05.jpg";
import Image06 from "../../../public/img/auth/06.jpg";
import Image07 from "../../../public/img/auth/07.jpg";
import Image08 from "../../../public/img/auth/08.jpg";
import Image09 from "../../../public/img/auth/09.jpg";
import Image10 from "../../../public/img/auth/10.jpg";
import Image11 from "../../../public/img/auth/11.jpg";

const illustrations = [
  Image01,
  Image02,
  Image03,
  Image04,
  Image05,
  Image06,
  Image07,
  Image08,
  Image09,
  Image10,
  Image11,
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const randomIndex = Math.floor(Math.random() * illustrations.length);
  const randomIllustration = illustrations[randomIndex];

  return (
    <div className="relative flex h-screen w-screen">
      {theme === "dark" ? (
        <Image
          src="/img/logo-dark.png"
          width={300}
          height={300}
          alt="logo"
          className="absolute right-6 top-6"
        />
      ) : (
        <Image
          src="/img/logo-light.png"
          width={300}
          height={300}
          alt="logo"
          className="absolute right-6 top-6"
        />
      )}

      <div className="h-full w-1/2 p-6">
        <div
          className="size-full rounded-2xl"
          style={{
            backgroundImage: `url(${randomIllustration.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4">
        {children}
      </div>
    </div>
  );
}

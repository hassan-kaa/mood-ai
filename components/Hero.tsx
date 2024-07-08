"use client";
import Link from "next/link";
import { useRef } from "react";
import { useEffect } from "react";
import { annotate, annotationGroup } from "rough-notation";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  const href = "/journal";
  const highlightRef = useRef(null);
  const underlineRef = useRef(null);
  useEffect(() => {
    if (highlightRef.current && underlineRef.current) {
      const highlight = annotate(highlightRef.current, {
        type: "highlight",
        multiline: true,
        color: "#5C2FC2",
      });

      const underline = annotate(underlineRef.current, {
        type: "underline",
        color: "#5C2FC2",
      });
      const ag = annotationGroup([highlight, underline]);
      ag.show();
    }
  }, []);

  return (
    <>
      <div className="  w-full p-8  max-w-[800px] m-auto h-full flex flex-col gap-8 items-center justify-center text-center text-white">
        <h1 className="font-bold lg:text-6xl leading-normal lg:leading-relaxed bg-gradient-to-b from-white to-violet-300 bg-clip-text text-4xl text-transparent ">
          Unlock the Power of Your Thoughts with{" "}
          <span ref={highlightRef} className="text-violet-100">
            {" "}
            AI-Driven
          </span>{" "}
          Journaling
        </h1>

        <p className="leading-relaxed lg:text-lg">
          Transform your journaling experience with our{" "}
          <span ref={underlineRef}>intelligent</span> platform. Our AI analyzes
          your entries to provide insights, track your emotional journey, and
          help you achieve personal growth.
        </p>

        <div className="flex w-full gap-8 justify-center items-center">
          <Link href={href}>
            <Button className="bg-violet-700 hover:bg-violet-500   ">
              Get started
            </Button>
          </Link>
          <Link href={"/about"}>
            <Button variant="outline" className="text-black">
              Learn More
            </Button>
          </Link>
        </div>
        <Image
          src={"/Mood-ai.jpeg"}
          alt="mood"
          className="rounded-lg w-2/3"
          width={"1100"}
          height={"600"}
        />
      </div>

      {/* <div className="z-100 absolute top-0 w-full h-full">
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{ y: [0, -20, -40, -20, 0], x: [0, 10, 0, 20, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Image
            src={"/3d-calendar.png"}
            alt="calender"
            width={48}
            height={48}
          />
        </motion.div>

        <Image
          src={"/3d-report.png"}
          alt="report"
          className="absolute top-[20%] right-1/4"
          width={64}
          height={64}
        />
        <Image
          src={"/homework.png"}
          alt="homework"
          className="absolute top-[58%] left-[16%]"
          width={48}
          height={48}
        />
        <motion.div
          className="absolute top-2/3 right-[25%] rotate-90"
          animate={{
            scale: [1, 1.4, 2],
            y: [0, -40, -60],
            x: [0, 40, 60],
          }}
          initial={{ scale: 1, rotate: 90 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Image src={"/rocket.png"} alt="rocket" width={48} height={48} />
        </motion.div>
      </div> */}
    </>
  );
};
export default Hero;

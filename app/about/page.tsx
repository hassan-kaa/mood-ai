import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-60"></div>

      <div className="max-w-4xl mx-auto p-6 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">About Mood-ai</h1>
        <p className="text-lg mb-4">
          Welcome to Mood-ai, a cutting-edge journaling app that leverages the
          power of artificial intelligence to help you track and understand your
          emotions.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg mb-4">
          At Mood-ai, our mission is to provide users with valuable insights
          into their emotional well-being. By analyzing the mood of your journal
          entries, our AI technology offers a unique perspective on your mental
          health journey.
        </p>
        <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>
            <strong>Journaling:</strong> Write daily entries about your
            thoughts, feelings, and experiences.
          </li>
          <li>
            <strong>AI Analysis:</strong> Our AI analyzes the sentiment and mood
            of your entries, providing you with detailed feedback.
          </li>
          <li>
            <strong>Visualizations:</strong> View charts and logs that
            illustrate your mood changes and intensity over time.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>
            <strong>Secure and Private:</strong> Your data is encrypted and
            stored securely, ensuring your privacy.
          </li>
          <li>
            <strong>Intuitive Interface:</strong> Easy-to-use journaling
            platform designed for all users.
          </li>
          <li>
            <strong>Comprehensive Insights:</strong> Gain a deeper understanding
            of your emotional patterns and triggers.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
        <p className="text-lg mb-4">
          Ready to embark on your journey towards better emotional awareness?
          today and start exploring your mood with Mood-ai!
          <div className="flex w-full gap-8 justify-center items-center">
            <Link href={"/sign-up"}>
              <Button className="bg-violet-700 hover:bg-violet-500   ">
                Get started
              </Button>
            </Link>
            <Link href={"/"}>
              <Button variant="outline" className="text-black">
                Home
              </Button>
            </Link>
          </div>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

import React from "react";
import Hero from "./sub-components/Hero";
import Timeline from "./sub-components/Timeline";
import Skills from "./sub-components/Skills";
import Apps from "./sub-components/Apps";
import About from "./sub-components/About";
// import { ThemeProvider } from "@/components/theme-provider";
import Portfolio from "./sub-components/Portfolio";
import Contact from "./sub-components/Contact";

const Home = () => {
  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Hero />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <Apps />
      <Contact />
    </article>
  );
};

export default Home;
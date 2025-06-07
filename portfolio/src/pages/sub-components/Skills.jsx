import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://portfolio-3wz3.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        SKILLS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills &&
          skills.map((element) => {
            return (
               <Card
          className="h-40 sm:h-48 md:h-56 p-6 flex flex-col justify-center items-center gap-4 
             transition-transform duration-300 shadow-md hover:shadow-xl hover:scale-105 
             rounded-xl bg-white dark:bg-gray-800 cursor-pointer"
          key={element._id}
        >
          <img
            src={element.svg?.url}
            alt="skill"
            className="h-10 sm:h-16 md:h-20 w-auto object-contain"
          />
          <p className="text-muted-foreground text-center text-base sm:text-lg md:text-xl font-medium">
            {element.title}
          </p>
        </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
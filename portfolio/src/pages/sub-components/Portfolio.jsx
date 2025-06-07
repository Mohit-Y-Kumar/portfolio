import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1 text-black dark:text-white
          bg-white dark:bg-[hsl(222.2_84%_4.9%)]
          "
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            Projects
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(
          viewAll ? projects : projects.slice(0, 3)).map((element) => (
            <Link to={`/project/${element._id}`} key={element._id}>
              <div className="border border-gray-400 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-[hsl(222.2_84%_4.9%)]">
                <img
                  src={element.projectBanner && element.projectBanner.url}
                  alt={element.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 min-h-[5rem] flex flex-col justify-center">
                  <hr className="border-t border-gray-300 dark:border-gray-600 mb-3" />
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {element.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {projects && projects.length > 3 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
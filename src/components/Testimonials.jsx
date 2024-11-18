import React from "react";
import TestimonialSection from "./TestimonialSection";
import shakeHand from "../assets/hand-shake.png";
import promise from "../assets/promise.png";
import result from "../assets/results.png";
import swear from "../assets/swear.png";

const Testimonials = () => {
  const data = [
    {
      id: "1",
      title: "We’re Reliable",
      description:
        "We establish open and transparent relationships with our clients employees and business partners As professionals we consistently deliver results — even when it’s raining on our parade.",
      image: shakeHand,
    },
    {
      id: "2",
      title: "We’re Committed",
      description:
        "Our commitment towards our clients extends well beyond the time we spend on their project. We guide them through every step of the process, bring new ideas until the last drop of creativity and novelty is squeezed out..",
      image: swear,
    },
    {
      id: "3",
      title: "We Under Promise - Overdeliver",
      description:
        "We’re result-oriented. And thus, we set high standards for ourselves and consistently strive to exceed them. Despite our promises are real; we always try to go beyond what we have committed.",
      image: promise,
    },
    {
      id: "4",
      title: "We Deliver Results",
      description:
        "Result is the name of the game. Our methodologies are result-oriented and proven. With us, we have a team of experts who thrive in their area of expertise. And hence, when we work together, you can expect real results at scale.",
      image: result,
    },
  ];

  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h2>Why us Over others</h2>
        <p>VMJ Differentiators</p>
      </div>
      <div className="testimonials-sections">
        {data.map((item) => (
          <TestimonialSection
            key={item.id}
            description={item.description}
            title={item.title}
            imageUrl={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

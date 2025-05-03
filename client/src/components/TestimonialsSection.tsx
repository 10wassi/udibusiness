import  React,{ useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Testimonial } from "@shared/schema";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/testimonials"],
  });

  useEffect(() => {
    if (testimonials.length === 0) return; // Attendez que les témoignages soient chargés

    gsap.fromTo(
      "#testimonials-heading *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 80%",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, [testimonials]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section
        id="testimonials"
        className="py-24 bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0080FF] rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-[#FFC000] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-[#0080FF]/50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-10 w-60 bg-gray-700 rounded-lg mx-auto mb-4"></div>
            <div className="h-5 w-full max-w-2xl bg-gray-700 rounded-lg mx-auto"></div>
            <div className="w-20 h-1 bg-gray-700 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-3/4 mb-6"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-700 rounded-lg w-24 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded-lg w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="py-24 bg-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0080FF] rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-60 h-60 bg-[#FFC000] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-[#0080FF]/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div id="testimonials-heading" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ce que nos <span className="text-gradient">clients</span> disent
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Témoignages de ceux qui ont fait confiance à nos services
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0080FF] to-[#FFC000] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative"
            >
              <div
                className={`absolute -top-5 -left-5 text-6xl text-[${index % 2 === 0 ? "#0080FF" : "#FFC000"}] opacity-30`}
              >
                "
              </div>
              <div className="mb-6 text-gray-300">
                <p>{testimonial.content}</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

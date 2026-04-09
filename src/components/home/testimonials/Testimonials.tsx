import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Event Organizer",
    content:
      "PLANORA has completely changed how I manage my corporate events. The real-time analytics feature alone is worth every penny.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Festival Director",
    content:
      "The ticketing system is flawless. We processed over 10,000 tickets for our last music festival without a single glitch.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Workshop Host",
    content:
      "I love how easy it is to create beautiful event pages. My attendees always compliment how professional the registration process feels.",
    rating: 5,
  },
];

const avatarColors = [
  "from-teal-400 to-cyan-600",
  "from-violet-400 to-indigo-600",
  "from-rose-400 to-pink-600",
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <span className="text-teal-500 dark:text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">
            Loved By Event Creators
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Here's what our community of organizers has to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-950 p-8 md:p-10 flex flex-col gap-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300 group"
            >
              {/* Quote icon */}
              <Quote className="w-7 h-7 text-teal-500/40 group-hover:text-teal-500/70 transition-colors duration-300 fill-current" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              {/* Quote text */}
              <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed flex-1">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[index]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {testimonial.role}
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

export default Testimonials;
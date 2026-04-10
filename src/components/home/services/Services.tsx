import SectionHeader from "@/components/shared/sectionHeader/SectionHeader";
import { CalendarDays, MapPin, Camera, Mic, Palette, Video } from "lucide-react";

const services = [
  {
    icon: <MapPin className="w-5 h-5" />,
    number: "01",
    title: "Venue Sourcing",
    description: "Discover perfect locations for any event size or style.",
  },
  {
    icon: <CalendarDays className="w-5 h-5" />,
    number: "02",
    title: "Event Planning",
    description: "End-to-end planning services from concept to execution.",
  },
  {
    icon: <Camera className="w-5 h-5" />,
    number: "03",
    title: "Photography",
    description: "Professional coverage to capture every important moment.",
  },
  {
    icon: <Mic className="w-5 h-5" />,
    number: "04",
    title: "Entertainment",
    description: "Book top-tier speakers, musicians, and performers.",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    number: "05",
    title: "Design & Decor",
    description: "Stunning visual experiences tailored to your theme.",
  },
  {
    icon: <Video className="w-5 h-5" />,
    number: "06",
    title: "Virtual Events",
    description: "Seamless broadcasting and interactive online experiences.",
  },
];

const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <SectionHeader
            align="center"
            title="Our Professional Services"
            description="Elevate your next event with our comprehensive suite of professional event management services."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white ">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 border-t border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 transition-colors duration-300 cursor-default"
            >
              {/* Animated teal fill line on top */}
              <div className="absolute top-[-1px] left-0 h-[2px] w-0 bg-teal-500 dark:bg-teal-400 group-hover:w-full transition-all duration-500 ease-out" />

              {/* Ghost number */}
              <span className="absolute top-6 right-6 text-5xl font-black text-gray-100 dark:text-gray-800 select-none group-hover:text-teal-50 dark:group-hover:text-teal-950 transition-colors duration-300 leading-none">
                {service.number}
              </span>

              {/* Icon + title row */}
              <div className="flex items-center gap-3 mb-4 relative">
                <span className="text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300 inline-flex">
                  {service.icon}
                </span>
                <h3 className="text-base font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed relative max-w-xs">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
import { Search, Ticket, CalendarCheck, Handshake } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover Events",
    description: "Browse hundreds of exciting events matching your interests and location.",
  },
  {
    icon: Ticket,
    number: "02",
    title: "Get Your Tickets",
    description: "Securely purchase tickets in seconds and receive them instantly via email.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "RSVP & Plan",
    description: "Add events to your calendar and get reminders before the big day.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Enjoy the Experience",
    description: "Show up, scan your digital ticket, and enjoy a memorable event.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Teal glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-teal-400 text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Four Steps to Your{" "}
            <span className="text-teal-400">Next Event</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Your journey to unforgettable experiences is just four simple steps away.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">

          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center px-6 py-2"
              >
                {/* Icon circle */}
                <div className="relative mb-8">
                  {/* Ghost number behind */}
                  <span className="absolute -top-3 -right-4 text-4xl font-black text-white/5 select-none leading-none group-hover:text-teal-400/10 transition-colors duration-300">
                    {step.number}
                  </span>

                  <div className="w-20 h-20 rounded-full border border-gray-800 group-hover:border-teal-500/50 bg-gray-900 group-hover:bg-teal-500/8 flex items-center justify-center transition-all duration-300 relative z-10">
                    <Icon className="w-7 h-7 text-gray-500 group-hover:text-teal-400 transition-colors duration-300" />
                  </div>

                  {/* Teal dot indicator */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <p className="text-teal-500/60 text-[10px] font-black tracking-[0.2em] uppercase mb-2">
                  Step {step.number}
                </p>
                <h3 className="text-white text-base font-bold mb-3 group-hover:text-teal-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
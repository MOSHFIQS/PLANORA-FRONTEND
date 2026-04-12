"use client";

import { useState } from "react";
import { Sparkles, Loader2, Wand2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
// import { useToast } from "@/hooks/use-toast";
// import { Toaster } from "@/components/ui/toaster";

interface AIMagicWriterProps {
  title: string;
  type: string;
  venue: string;
  onGenerate: (content: string) => void;
}

function generateEventDescription(title: string, type: string, venue: string): string {
  const isOnline = type === "ONLINE";
  const locationText = isOnline
    ? "virtually from anywhere in the world"
    : `at the prestigious <strong>${venue || "selected venue"}</strong>`;

  return `
    <div class="rich-content">
      <h1>Welcome to ${title}</h1>

      <p>
        We are proud to present <strong>${title}</strong> — a landmark event crafted for visionaries,
        industry leaders, and change-makers who are shaping the future. This is not just an event;
        it is a curated experience designed to educate, inspire, and transform the way you think,
        work, and connect.
      </p>

      <p>
        Hosted ${locationText}, <strong>${title}</strong> brings together thousands of attendees,
        hundreds of speakers, and dozens of world-class sponsors under one roof — united by a shared
        commitment to excellence and innovation.
      </p>

      <h2>🎯 Event Highlights</h2>
      <ul>
        <li>
          <strong>Keynote Addresses:</strong> Be inspired by world-renowned speakers, CEOs, and thought
          leaders delivering powerful keynotes on the most pressing topics shaping our industry today.
        </li>
        <li>
          <strong>Expert-Led Workshops:</strong> Choose from 30+ hands-on workshops and deep-dive
          masterclasses tailored to every skill level — from emerging professionals to seasoned executives.
        </li>
        <li>
          <strong>Panel Discussions & Fireside Chats:</strong> Engage in candid, high-impact conversations
          with pioneers who have built and scaled some of the world's most influential organizations.
        </li>
        <li>
          <strong>Networking Lounges & Roundtables:</strong> Forge relationships that last beyond the event
          with structured networking sessions, curated meetups, and exclusive VIP roundtables.
        </li>
        <li>
          <strong>Exhibition Hall & Showcases:</strong> Explore a dynamic expo featuring the latest
          products, platforms, and innovations from leading companies and disruptive startups.
        </li>
        <li>
          <strong>Live Demonstrations:</strong> Witness cutting-edge technology and solutions in action
          with real-time product demonstrations and interactive showcases.
        </li>
      </ul>

      <h2>🌍 Who Should Attend</h2>
      <p>
        <strong>${title}</strong> is designed for professionals, entrepreneurs, and organizations who
        refuse to stand still. Whether you're a startup founder looking for your next big break, a
        corporate executive seeking strategic insights, a creative professional hungry for inspiration,
        or a student eager to fast-track your career — this event was built for you.
      </p>
      <ul>
        <li><strong>C-Suite Executives & Decision Makers</strong> seeking high-level strategic perspectives</li>
        <li><strong>Entrepreneurs & Startup Founders</strong> looking to scale, connect, and raise visibility</li>
        <li><strong>Marketing, Sales & Operations Professionals</strong> wanting actionable industry intel</li>
        <li><strong>Developers & Tech Leaders</strong> staying ahead of the innovation curve</li>
        <li><strong>Academics & Researchers</strong> bridging the gap between theory and real-world application</li>
      </ul>

      <h2>📅 Event Experience</h2>
      <p>
        Over the course of this multi-day event, attendees will immerse themselves in a carefully
        curated programme that balances intellectual stimulation with genuine human connection. Every
        session, break, and social gathering has been thoughtfully designed to maximize your time and
        deliver measurable value — personally, professionally, and organizationally.
      </p>
      <p>
        Our dedicated event team at <strong>Planora</strong> has managed every logistical detail — from
        state-of-the-art audio-visual production and seamless registration flows to world-class catering
        and real-time event support — so that you can focus entirely on what matters most: the experience.
      </p>

      <h2>💡 Why This Event Matters</h2>
      <p>
        In a world that moves faster than ever, staying connected and continuously learning is no longer
        optional — it is a competitive necessity. <strong>${title}</strong> gives you the rare opportunity
        to step out of the day-to-day, gain perspective from the world's brightest minds, and return to
        your work transformed, recharged, and equipped with ideas and relationships that will compound
        in value for years to come.
      </p>

      <blockquote>
        "The most successful people in the world are those who show up — to the right rooms, the right
        conversations, and the right moments. This is one of those moments."
        <br/><em>— Planora AI</em>
      </blockquote>

      <h2>🎟️ Secure Your Place</h2>
      <p>
        Spots are strictly limited to ensure an intimate, high-quality experience for every attendee.
        Early registrations are moving fast — reserve your place today and join thousands of forward-thinking
        professionals who have already committed to making <strong>${title}</strong> a defining moment
        in their year.
      </p>
      <p>
        <strong>Don't just attend events. Be part of the ones that matter.</strong>
      </p>
    </div>
  `;
}

export default function AIMagicWriter({ title, type, venue, onGenerate }: AIMagicWriterProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  

  const handleGenerate = () => {
    if (!title.trim()) {
      toast.error("Event title required", {
        description: "Please enter an event title so Planora AI can craft your description.",
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const generatedHtml = generateEventDescription(title, type, venue);
      onGenerate(generatedHtml);
      setIsGenerating(false);

      toast.success("Description generated!", {
        description: "Planora AI has written a full event description. Review and edit it to your liking.",
        duration: 5000,
        // Custom icon via the description slot isn't natively supported,
        // but you can extend shadcn's toast with a custom variant if needed.
      });
    }, 2000);
  };

  return (
    <>
      {/* The Toaster must be mounted somewhere in your layout. 
          If it's already in your root layout, remove it from here. */}
      {/* <Toaster /> */}

      <div className="rounded-full p-[1px] bg-gradient-to-r from-[#725CAD] via-[#a07cd4] to-[#FE7743] shadow-md mb-3">
  <button
    type="button"
    onClick={handleGenerate}
    disabled={isGenerating}
    className="
      w-full rounded-full px-4 py-2.5
      bg-white hover:bg-gradient-to-r hover:from-[#725CAD] hover:via-[#a07cd4] hover:to-[#FE7743]
      text-[#725CAD] hover:text-white
      transition-all duration-300 group
      flex items-center justify-between gap-3
      disabled:opacity-70 disabled:cursor-not-allowed
    "
  >
    {/* Left: Icon + Text */}
    <div className="flex items-center gap-2.5">
      <div className="
        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
        bg-gradient-to-br from-[#725CAD] to-[#FE7743]
        group-hover:from-white/30 group-hover:to-white/20
        transition-all duration-300
      ">
        {isGenerating ? (
          <Loader2 size={16} className="text-white animate-spin" />
        ) : (
          <Wand2 size={16} className="text-white" />
        )}
      </div>

      <div className="text-left">
        <p className="text-xs font-bold leading-tight">
          {isGenerating ? "Writing..." : "Magic Write with Planora AI"}
        </p>
        <p className="text-[10px] font-normal opacity-60 mt-0.5">
          {isGenerating
            ? "Crafting event copy..."
            : "Generate event description instantly"}
        </p>
      </div>
    </div>

    {/* Right: AI badge */}
    <div className="
      flex items-center gap-1 px-2 py-1 rounded-full flex-shrink-0
      bg-gradient-to-r from-[#725CAD]/10 to-[#FE7743]/10
      group-hover:from-white/20 group-hover:to-white/20
      transition-all duration-300
    ">
      <Sparkles size={11} className={isGenerating ? "opacity-50" : "animate-pulse"} />
      <span className="text-[10px] font-semibold">AI</span>
    </div>
  </button>
</div>
    </>
  );
}
"use client";

import React from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import SectionHeader from "../sectionHeader/SectionHeader";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const router = useRouter();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          toast.success("Message sent successfully We will get back to you soon!");
          router.push("/");
        },
        () => {
          toast.error("Failed to send message");
        }
      );

    e.currentTarget.reset();
  };

  return (
    <div className="px-2 pb-24">
      <SectionHeader
        align="center"
        title="Get In Touch With Us"
        description="Have questions or feedback? We'd love to hear from you!"
      />

      <div className="max-w-7xl mx-auto p-5 bg-white dark:bg-[#141316] text-black dark:text-white space-y-3 shadow border border-gray-400">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={sendEmail}
        >
          <input type="text" name="name" placeholder="Enter Your Name" className="p-3 border w-full" />
          <input type="email" name="email" placeholder="Enter Your Email" className="p-3 border w-full" />
          <input type="text" name="phone" placeholder="Enter Your Phone no" className="p-3 border w-full" />
          <input type="text" name="subject" placeholder="Subject" className="p-3 border w-full" />

          <textarea
            name="message"
            placeholder="Additional Message"
            rows={4}
            className="p-3 border w-full col-span-1 md:col-span-2"
          />

          <Button
            variant="violet"
            type="submit"
            className="col-span-1 md:col-span-2 text-white py-3 font-medium uppercase"
          >
            Send Message Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
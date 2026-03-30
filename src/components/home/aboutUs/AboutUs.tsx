"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PublicStats } from "../publicStatsCard/PublicStatsCard";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

export default function AboutUs({ statData }: { statData: PublicStats }) {
  const stats = statData;

  return (
    <div className="min-h-screen bg-[#fdfaf6] opacity-85">

      {/* HERO SECTION */}
      <section className="relative py-40 text-center bg-gradient-to-b from-black via-black to-[#fdfaf6]  text-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            About Our Platform
          </h1>

          <p className="text-gray-200 text-lg">
            We connect people with real-world events, experiences, and communities.
            From small meetups to large-scale conferences — everything in one place.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link href="/events">
              <Button variant="violet">Explore Events</Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline" className="text-black">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* UNIQUE SECTION */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">

        <Card className="rounded shadow-md hover:shadow-lg transition">
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">🎯 Mission</h3>
            <p className="text-sm text-muted-foreground">
              To simplify event discovery and management for users, organizers,
              and communities worldwide.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded shadow-md hover:shadow-lg transition">
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">🚀 Vision</h3>
            <p className="text-sm text-muted-foreground">
              Build a global ecosystem where events are accessible, organized,
              and seamlessly connected.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded shadow-md hover:shadow-lg transition">
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">💡 What We Offer</h3>
            <p className="text-sm text-muted-foreground">
              Event creation, ticketing, participation tracking, reviews,
              invitations, and secure payments — all in one platform.
            </p>
          </CardContent>
        </Card>

      </section>

      {/* STATS SECTION (WITH COUNTUP) */}
      <section className="py-16 bg-muted/80">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">

          <div>
            <h2 className="text-5xl font-extrabold text-orange-500">
              <CountUp
                end={stats?.totalActiveUsers || 0}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
                separator=","
              />
            </h2>
            <p className="text-lg text-muted-foreground">Active Users</p>
          </div>

          <div>
            <h2 className="text-5xl font-extrabold text-orange-500">
              <CountUp
                end={stats?.totalEventsDone || 0}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
            </h2>
            <p className="text-lg text-muted-foreground">Events Completed</p>
          </div>

          <div>
            <h2 className="text-5xl font-extrabold text-orange-500">
              <CountUp
                end={stats?.totalOrganizers || 0}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
            </h2>
            <p className="text-lg text-muted-foreground">Organizers</p>
          </div>

          <div>
            <h2 className="text-5xl font-extrabold text-orange-500">
              <CountUp
                end={stats?.totalParticipants || 0}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
            </h2>
            <p className="text-lg text-muted-foreground">Participants</p>
          </div>

          <div>
            <h2 className="text-5xl font-extrabold text-orange-500">
              <CountUp
                end={stats?.totalTicketsCreated || 0}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
            </h2>
            <p className="text-lg text-muted-foreground">Tickets Created</p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 text-center bg-[#fdfaf6]">
        <div className="max-w-3xl mx-auto space-y-6 px-4">

          <h2 className="text-3xl font-bold">
            Ready to join the community?
          </h2>

          <p className="text-muted-foreground">
            Create events, join communities, and explore opportunities around you.
          </p>

          <Link href="/register">
            <Button size="lg" variant="violet">
              Get Started
            </Button>
          </Link>

        </div>
      </section>

    </div>
  );
}
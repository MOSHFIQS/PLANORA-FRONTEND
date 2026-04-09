"use client"

import * as React from "react"
import {
     Carousel,
     CarouselContent,
     CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Banner } from "@/types/banner.types"
import { AppImage } from "@/components/appImage/AppImage"
import { format } from "date-fns"
import { useAuth } from "@/context/AuthProvider"
import { useRouter } from "next/navigation"
import { CalendarDays, ArrowRight, MapPin } from "lucide-react"

export default function CarouselPlugin({ banners }: { banners: Banner[] }) {
     const { user } = useAuth()
     const router = useRouter()
     const [activeIndex, setActiveIndex] = React.useState(0)
     const [prevIndex, setPrevIndex] = React.useState(-1)

     const handleViewEvent = (url: string) => {
          if (!user) {
               router.push(`/login?redirect=${encodeURIComponent(url)}`)
          } else {
               router.push(url)
          }
     }

     const plugin = React.useRef(
          Autoplay({ delay: 4500, stopOnInteraction: true })
     )

     const mainBanners = banners
          .filter((b) => b.position === "MAIN" && b.isActive)
          .sort((a, b) => a.positionOrder - b.positionOrder)

     return (
          <>
               <style jsx global>{`
                    @keyframes bgZoom {
                         0% { transform: scale(1); }
                         100% { transform: scale(1.07); }
                    }
                    @keyframes slideUp {
                         0% { opacity: 0; transform: translateY(28px); filter: blur(6px); }
                         100% { opacity: 1; transform: translateY(0); filter: blur(0); }
                    }
                    @keyframes fadeInOverlay {
                         0% { opacity: 0; }
                         100% { opacity: 1; }
                    }
                    @keyframes progressBar {
                         0% { width: 0%; }
                         100% { width: 100%; }
                    }
                    @keyframes pillIn {
                         0% { opacity: 0; transform: translateX(-12px); }
                         100% { opacity: 1; transform: translateX(0); }
                    }

                    .slide-bg-active {
                         animation: bgZoom 6s ease-in-out forwards;
                    }
                    .slide-overlay-active {
                         animation: fadeInOverlay 0.7s ease forwards;
                    }
                    .slide-content-1 { animation: slideUp 0.7s 0.1s ease both; }
                    .slide-content-2 { animation: slideUp 0.7s 0.25s ease both; }
                    .slide-content-3 { animation: slideUp 0.7s 0.4s ease both; }
                    .slide-content-4 { animation: slideUp 0.7s 0.55s ease both; }
                    .slide-content-5 { animation: slideUp 0.7s 0.68s ease both; }
                    .slide-pill { animation: pillIn 0.5s 0.05s ease both; }

                    .progress-bar-active {
                         animation: progressBar 4.5s linear forwards;
                    }
               `}</style>

               <div className="relative w-full overflow-hidden rounded">
                    <Carousel
                         plugins={[plugin.current]}
                         className="w-full"
                         onMouseEnter={plugin.current.stop}
                         onMouseLeave={plugin.current.reset}
                         opts={{ align: "start", loop: true }}
                         setApi={(api: any) => {
                              if (!api) return
                              api.on("select", () => {
                                   setPrevIndex(activeIndex)
                                   setActiveIndex(api.selectedScrollSnap())
                              })
                         }}
                    >
                         <CarouselContent className="h-[480px] sm:h-[540px] md:h-[580px] lg:h-[680px] xl:h-[780px] m-0">
                              {mainBanners.map((banner, index) => {
                                   const isActive = index === activeIndex

                                   return (
                                        <CarouselItem key={banner.id} className="h-full p-0">
                                             <div className="relative h-full overflow-hidden">

                                                  {/* Background image */}
                                                  <div className={`absolute inset-0 ${isActive ? "slide-bg-active" : ""}`}>
                                                       <AppImage
                                                            src={banner.image}
                                                            priority
                                                            loading="eager"
                                                            className="object-cover w-full h-full"
                                                       />
                                                  </div>

                                                  {/* Multi-layer overlay */}
                                                  <div className={`absolute inset-0 ${isActive ? "slide-overlay-active" : "opacity-0"}`}>
                                                       {/* Bottom-heavy cinematic gradient */}
                                                       <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-gray-950/10" />
                                                       {/* Left vignette for text legibility */}
                                                       <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/30 to-transparent" />
                                                  </div>

                                                  {/* Content */}
                                                  {isActive && (
                                                       <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
                                                            <div className="w-full max-w-2xl px-8 md:px-14 space-y-4">

                                                                 {/* Type pill */}
                                                                 <div className="slide-pill">
                                                                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-teal-400/40 bg-teal-400/10 text-teal-400">
                                                                           <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                                                                           {banner.type} Event
                                                                      </span>
                                                                 </div>

                                                                 {/* Title */}
                                                                 <h2 className="slide-content-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                                                                      {banner.title}
                                                                 </h2>

                                                                 {/* Description */}
                                                                 <p className="slide-content-3 text-gray-300 text-sm md:text-base leading-relaxed max-w-lg line-clamp-2">
                                                                      {banner.description}
                                                                 </p>

                                                                 {/* Meta row */}
                                                                 <div className="slide-content-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                                                                      <span className="flex items-center gap-1.5">
                                                                           <CalendarDays className="w-3.5 h-3.5 text-teal-400" />
                                                                           {format(new Date(banner.dateTime), "PPP 'at' p")}
                                                                      </span>
                                                                      {banner.altText && (
                                                                           <span className="flex items-center gap-1.5">
                                                                                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                                                                                {banner.altText}
                                                                           </span>
                                                                      )}
                                                                 </div>

                                                                 {/* CTA */}
                                                                 {banner.buttonText && (
                                                                      <div className="slide-content-5 pt-1">
                                                                           <button
                                                                                onClick={() => handleViewEvent(banner.redirectUrl || "#")}
                                                                                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-gray-950 text-sm font-black rounded-xl transition-all duration-200 hover:gap-4 active:scale-95"
                                                                           >
                                                                                {banner.buttonText}
                                                                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                                                           </button>
                                                                      </div>
                                                                 )}
                                                            </div>
                                                       </div>
                                                  )}

                                                  {/* Progress bar — bottom edge */}
                                                  {isActive && (
                                                       <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                                                            <div className="h-full bg-teal-400 progress-bar-active" />
                                                       </div>
                                                  )}

                                             </div>
                                        </CarouselItem>
                                   )
                              })}
                         </CarouselContent>
                    </Carousel>

                    {/* Slide indicators */}
                    <div className="absolute bottom-5 right-8 flex items-center gap-2 z-20">
                         {mainBanners.map((_, i) => (
                              <div
                                   key={i}
                                   className={`rounded-full transition-all duration-300 ${
                                        i === activeIndex
                                             ? "w-6 h-1.5 bg-teal-400"
                                             : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                                   }`}
                              />
                         ))}
                    </div>
               </div>
          </>
     )
}
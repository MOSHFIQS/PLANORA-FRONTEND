"use client"

import * as React from "react"
import {
     Carousel,
     CarouselContent,
     CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Banner } from "@/types/banner.types"
import { Button } from "@/components/ui/button"
import { AppImage } from "@/components/appImage/AppImage"
import { format } from "date-fns"
import { useAuth } from "@/context/AuthProvider"
import { useRouter } from "next/navigation"

export default function CarouselPlugin({ banners }: { banners: Banner[] }) {
     const { user } = useAuth()
     const router = useRouter()

     const [activeIndex, setActiveIndex] = React.useState(0)

     const handleViewEvent = (url: string) => {
          if (!user) {
               router.push(`/login?redirect=${encodeURIComponent(url)}`)
          } else {
               router.push(url)
          }
     }

     const plugin = React.useRef(
          Autoplay({ delay: 3000, stopOnInteraction: true })
     )

     const mainBanners = banners
          .filter((b) => b.position === "MAIN" && b.isActive)
          .sort((a, b) => a.positionOrder - b.positionOrder)

     return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 border rounded">

               {/* Styles */}
               <style jsx>{`
                    .bg-zoom {
                         animation: bgZoom 8s ease-in-out infinite alternate;
                    }

                    .overlay {
                         animation: fadeIn 0.8s ease forwards;
                    }

                    .content {
                         opacity: 0;
                         transform: translateY(30px) scale(0.98);
                         filter: blur(10px);
                         animation: contentIn 0.9s ease forwards;
                    }

                    @keyframes bgZoom {
                         from { transform: scale(1); }
                         to { transform: scale(1.08); }
                    }

                    @keyframes fadeIn {
                         from { opacity: 0; }
                         to { opacity: 1; }
                    }

                    @keyframes contentIn {
                         0% {
                              opacity: 0;
                              transform: translateY(30px) scale(0.98);
                              filter: blur(10px);
                         }
                         100% {
                              opacity: 1;
                              transform: translateY(0) scale(1);
                              filter: blur(0);
                         }
                    }
               `}</style>

               <div className="lg:col-span-4">
                    <Carousel
                         plugins={[plugin.current]}
                         className="w-full overflow-hidden"
                         onMouseEnter={plugin.current.stop}
                         onMouseLeave={plugin.current.reset}
                         opts={{ align: "start", loop: true }}
                         setApi={(api: any) => {
                              if (!api) return
                              api.on("select", () => {
                                   setActiveIndex(api.selectedScrollSnap())
                              })
                         }}
                    >
                         <CarouselContent className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[700px] m-0 w-full">

                              {mainBanners.map((banner, index) => {
                                   const isActive = index === activeIndex

                                   return (
                                        <CarouselItem key={banner.id} className="h-full p-0">
                                             <div className="relative h-full overflow-hidden">

                                                  {/* Background */}
                                                  <div className={`absolute inset-0 ${isActive ? "bg-zoom" : ""}`}>
                                                       <AppImage
                                                            src={banner.image}
                                                            priority
                                                            loading="eager"
                                                            className="object-cover w-full h-full"
                                                       />
                                                  </div>

                                                  {/* Overlay */}
                                                  <div className={`absolute inset-0 bg-black/60 ${isActive ? "overlay" : ""}`} />

                                                  {/* Content */}
                                                  <div className="absolute inset-0 flex items-center">
                                                       <div className={`w-full ml-6 md:ml-12 p-6 text-white space-y-4 ${isActive ? "content" : ""}`}>

                                                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-400/80">
                                                                 {banner.type} EVENT
                                                            </span>

                                                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                                                 {banner.title}
                                                            </h2>

                                                            <p className="text-sm md:text-base font-medium">
                                                                 {banner.description}
                                                            </p>

                                                            <p className="text-xs text-gray-200">
                                                                 {banner.altText}
                                                            </p>

                                                            <p className="text-sm font-semibold">
                                                                 {format(new Date(banner.dateTime), "PPP 'at' p")}
                                                            </p>

                                                            {banner.buttonText && (
                                                                 <Button
                                                                      variant={"orange"}
                                                                      onClick={() => handleViewEvent(banner.redirectUrl || "#")}
                                                                      className="text-white transition-transform duration-300 hover:scale-105 active:scale-95"
                                                                 >
                                                                      {banner.buttonText}
                                                                 </Button>
                                                            )}
                                                       </div>
                                                  </div>

                                             </div>
                                        </CarouselItem>
                                   )
                              })}
                         </CarouselContent>
                    </Carousel>
               </div>
          </div>
     )
}

// "use client"

// import * as React from "react"
// import {
//      Carousel,
//      CarouselContent,
//      CarouselItem,
// } from "@/components/ui/carousel"
// import Autoplay from "embla-carousel-autoplay"
// import { Banner } from "@/types/banner.types"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { AppImage } from "@/components/appImage/AppImage"

// export default function CarouselPlugin({ banners }: { banners: Banner[] }) {

//      const plugin = React.useRef(
//           Autoplay({ delay: 2000, stopOnInteraction: true })
//      )

//      // MAIN banners
//      const mainBanners = banners
//           .filter((b) => b.position === "MAIN" && b.isActive)
//           .sort((a, b) => a.positionOrder - b.positionOrder)

//      // RIGHT banners
//      // const topBanner = banners.find(
//      //      (b) => b.position === "SECONDARY" && b.isActive
//      // )

//      // const bottomBanner = banners.find(
//      //      (b) => b.position === "THIRD" && b.isActive
//      // )

//      return (

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">

//                {/* MAIN CAROUSEL */}
//                <div className="lg:col-span-4">

//                     <Carousel
//                          plugins={[plugin.current]}
//                          className="w-full overflow-hidden"
//                          onMouseEnter={plugin.current.stop}
//                          onMouseLeave={plugin.current.reset}
//                          opts={{
//                               align: "start",
//                               loop: true
//                          }}
//                     >

//                          <CarouselContent className="h-[360px] sm:h-[450px] md:h-[520px] lg:h-[560px]">

//                               {mainBanners.map((banner) => (

//                                    <CarouselItem key={banner.id} className="relative">

//                                         {/* Image */}
//                                         <AppImage
//                                              src={banner.image}
//                                              // alt={banner.altText || banner.title}
//                                              // fill
//                                              priority
//                                              loading='eager'
//                                              className="object-cover"
//                                         />

//                                         {/* Dark overlay */}
//                                         <div className="absolute inset-0 bg-black/50" />

//                                         {/* Content container */}
//                                         <div className="absolute inset-0 flex items-center">
//                                              <div className="max-w-xl ml-8 md:ml-16  p-6 md:p-8 rounded-md text-white">

//                                                   <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
//                                                        {banner.title}
//                                                   </h2>

//                                                   <p className="text-sm md:text-base opacity-90 font-extrabold mb-1">
//                                                        {banner.description}
//                                                   </p>
//                                                   <p className="text-xs md:text-xs opacity-95 font-extrabold mb-6">
//                                                        {banner.altText}
//                                                   </p>

//                                                   {banner.buttonText && (
//                                                        <Link href={banner.redirectUrl || "#"}>
//                                                             <Button className="bg-white text-black">
//                                                                  {banner.buttonText}
//                                                             </Button>
//                                                        </Link>
//                                                   )}

//                                              </div>
//                                         </div>

//                                    </CarouselItem>


//                               ))}

//                          </CarouselContent>
//                     </Carousel>

//                </div>

//                {/* RIGHT SIDE BANNERS */}
//                {/* <div className="flex flex-col sm:flex-row md:flex-row lg:flex-col gap-2">

//                     {topBanner && (
//                          <Link
//                               href={topBanner.redirectUrl || "#"}
//                               className="relative h-[275px] rounded-md w-full"
//                          >
//                               <Image
//                                    src={topBanner.image}
//                                    alt={topBanner.altText || topBanner.title}
//                                    fill
//                                    className="object-cover rounded-md"
//                               />

//                               <div className="absolute inset-0 bg-black/40 flex items-end p-4">
//                                    <p className="text-white font-semibold text-lg">
//                                         {topBanner.title}
//                                    </p>
//                               </div>
//                          </Link>
//                     )}

//                     {bottomBanner && (
//                          <Link
//                               href={bottomBanner.redirectUrl || "#"}
//                               className="relative h-[275px] lg:h-[277px] rounded-md w-full"
//                          >
//                               <Image
//                                    src={bottomBanner.image}
//                                    alt={bottomBanner.altText || bottomBanner.title}
//                                    fill
//                                    className="object-cover rounded-md"
//                               />

//                               <div className="absolute inset-0 bg-black/40 flex items-end p-4">
//                                    <p className="text-white font-semibold text-lg">
//                                         {bottomBanner.title}
//                                    </p>
//                               </div>
//                          </Link>
//                     )}

//                </div> */}

//           </div>
//      )
// }









"use client"

import * as React from "react"
import {
     Carousel,
     CarouselContent,
     CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Banner } from "@/types/banner.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppImage } from "@/components/appImage/AppImage"

export default function CarouselPlugin({ banners }: { banners: Banner[] }) {

     const plugin = React.useRef(
          Autoplay({ delay: 2000, stopOnInteraction: true })
     )

     // MAIN banners
     const mainBanners = banners
          .filter((b) => b.position === "MAIN" && b.isActive)
          .sort((a, b) => a.positionOrder - b.positionOrder)


     return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 border p-0 xl:p-10 bg-gray-50">

               {/* MAIN CAROUSEL */}
               <div className="lg:col-span-4">

                    <Carousel
                         plugins={[plugin.current]}
                         className="w-full overflow-hidden"
                         onMouseEnter={plugin.current.stop}
                         onMouseLeave={plugin.current.reset}
                         opts={{
                              align: "start",
                              loop: true
                         }}
                         
                    >

                         <CarouselContent className="h-[360px] sm:h-[450px] md:h-[450px] lg:h-[520px] xl:h-[600px]  m-0  w-full">

                              {mainBanners.map((banner) => (
                                   <CarouselItem key={banner.id} className="h-full p-0">

                                        {/* ===== MOBILE → OLD DESIGN ===== */}
                                        <div className="relative h-full xl:hidden">

                                             <AppImage
                                                  src={banner.image}
                                                  priority
                                                  loading="eager"
                                                  className="object-cover w-full h-full "
                                             />

                                             <div className="absolute inset-0 bg-black/50 " />

                                             <div className="absolute inset-0 flex items-center">
                                                  <div className="max-w-xl ml-6 md:ml-12 p-6 text-white">

                                                       <h2 className="text-3xl md:text-5xl font-bold mb-3">
                                                            {banner.title}
                                                       </h2>

                                                       <p className="text-sm md:text-base font-semibold mb-2">
                                                            {banner.description}
                                                       </p>

                                                       <p className="text-xs mb-6">
                                                            {banner.altText}
                                                       </p>

                                                       {banner.buttonText && (
                                                            <Link href={banner.redirectUrl || "#"}>
                                                                 <Button className="bg-white text-black">
                                                                      {banner.buttonText}
                                                                 </Button>
                                                            </Link>
                                                       )}

                                                  </div>
                                             </div>
                                        </div>


                                        {/* ===== XL → NEW DESIGN ===== */}
                                        <div className="hidden xl:flex h-full w-full">

                                             {/* LEFT TEXT */}
                                             <div className="w-1/3 flex items-center bg-white px-16">
                                                  <div className="max-w-xl">

                                                       <h2 className="text-5xl font-bold mb-4">
                                                            {banner.title}
                                                       </h2>

                                                       <p className="text-base font-semibold mb-2">
                                                            {banner.description}
                                                       </p>

                                                       <p className="text-sm mb-6">
                                                            {banner.altText}
                                                       </p>

                                                       {banner.buttonText && (
                                                            <Link href={banner.redirectUrl || "#"}>
                                                                 <Button className="bg-black text-white px-8 py-2 rounded-none">
                                                                      {banner.buttonText}
                                                                 </Button>
                                                            </Link>
                                                       )}

                                                  </div>
                                             </div>

                                             {/* RIGHT IMAGE */}
                                             <div className="w-1/1 h-full">
                                                  <AppImage
                                                       src={banner.image}
                                                       priority
                                                       loading="eager"
                                                       className="object-cover w-full h-full"
                                                  />
                                             </div>

                                        </div>

                                   </CarouselItem>
                              ))}
                         </CarouselContent>
                    </Carousel>

               </div>



          </div>
     )
}


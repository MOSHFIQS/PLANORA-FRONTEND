
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
import { format } from "date-fns"

export default function CarouselPlugin({ banners }: { banners: Banner[] }) {
     console.log(banners);

     const plugin = React.useRef(
          Autoplay({ delay: 2000, stopOnInteraction: true })
     )

     // MAIN banners
     const mainBanners = banners
          .filter((b) => b.position === "MAIN" && b.isActive)
          .sort((a, b) => a.positionOrder - b.positionOrder)


     return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 border-2 rounded p-0 xl:p-10 bg-[#725CAD]">

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

                         <CarouselContent className="h-[400px] sm:h-[450px] md:h-[450px] lg:h-[500px] xl:h-[550px]  m-0  w-full ">

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
                                                  <div className="max-w-xl ml-6 md:ml-12 p-6  rounded-md text-white space-y-4">

                                                       {/* Event Type Badge */}
                                                       <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-orange-400 bg-opacity-80">
                                                            {banner.type} Event
                                                       </span>

                                                       {/* Title */}
                                                       <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                                            {banner.title}
                                                       </h2>

                                                       {/* Description */}
                                                       <p className="text-sm md:text-base font-medium">
                                                            {banner.description}
                                                       </p>

                                                       {/* Alt Text */}
                                                       <p className="text-xs text-gray-200">{banner.altText}</p>

                                                       {/* Date & Time */}
                                                       <p className="text-sm font-semibold">
                                                            {format(new Date(banner.dateTime), "PPP 'at' p")}
                                                       </p>

                                                       {/* Button */}
                                                       {banner.buttonText && (
                                                            <Button variant={"outline"} asChild className="text-black">
                                                                 <Link href={banner.redirectUrl || "#"}>
                                                                      {banner.buttonText}
                                                                 </Link>
                                                            </Button>
                                                       )}
                                                  </div>
                                             </div>
                                        </div>


                                        {/* ===== XL → NEW DESIGN ===== */}
                                        <div className="hidden xl:flex items-center justify-between h-full w-full gap-10 px-5">

                                             {/* LEFT TEXT */}
                                             <div className="flex-1  bg-white  p-10  rounded">
                                                  <div className="space-y-8">
                                                       {/* Badge */}
                                                       <div className="inline-block">
                                                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                                 {banner.type} Event
                                                            </span>
                                                       </div>

                                                       {/* Title */}
                                                       <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900">
                                                            {banner.title}
                                                       </h2>

                                                       <div className="space-y-3">
                                                            {/* Description */}
                                                       <p className="text-lg font-medium text-gray-700">
                                                            {banner.description}
                                                       </p>

                                                       {/* Alt Text */}
                                                       <p className="text-sm text-gray-500">{banner.altText}</p>

                                                       {/* Date & Time */}
                                                       <p className="text-sm text-gray-600 font-medium">
                                                            {format(new Date(banner.dateTime), "PPP 'at' p")}
                                                       </p>
                                                       </div>

                                                       {/* Button */}
                                                       {banner.buttonText && (
                                                            <Button asChild variant={"violet"} >
                                                                 <Link href={banner.redirectUrl || "#"}>
                                                                      {banner.buttonText}
                                                                 </Link>
                                                            </Button>
                                                       )}
                                                  </div>
                                             </div>

                                             {/* RIGHT IMAGE */}
                                             <div className="h-full border-2 rounded flex-4">
                                                  <AppImage
                                                       src={banner.image}
                                                       priority
                                                       loading="eager"
                                                       className="object-cover w-full h-full rounded"
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


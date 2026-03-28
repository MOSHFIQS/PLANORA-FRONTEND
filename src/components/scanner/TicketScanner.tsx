// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import { checkInTicketAction } from "@/actions/ticket.action";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ScanLine, Camera, Square } from "lucide-react";

// const BOX_SIZE = 260; // 🔥 single source of truth

// export default function TicketScanner() {
//   const scannerRef = useRef<Html5Qrcode | null>(null);
//   const [scanning, setScanning] = useState(false);
//   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

//   const startScanner = async () => {
//     const qrRegionId = "qr-reader";

//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const hasCamera = devices.some((d) => d.kind === "videoinput");

//       if (!hasCamera) {
//         toast.error("No camera found on this device");
//         return;
//       }

//       const html5QrCode = new Html5Qrcode(qrRegionId);
//       scannerRef.current = html5QrCode;

//       setScanning(true);
//       setStatus("idle");

//       await html5QrCode.start(
//         { facingMode: "environment" },
//         {
//           fps: 10,
//           qrbox: { width: BOX_SIZE, height: BOX_SIZE },
//         },
//         async (decodedText) => {
//           await html5QrCode.stop();
//           setScanning(false);

//           const res = await checkInTicketAction(decodedText);

//           if (!res.ok) {
//             setStatus("error");
//             toast.error(res.message);
//             return;
//           }

//           setStatus("success");
//           toast.success("Ticket checked in ✅");
//         },
//         () => {}
//       );
//     } catch (err: any) {
//       console.error(err);

//       if (err?.name === "NotAllowedError") {
//         toast.error("Camera permission denied");
//       } else if (err?.name === "NotFoundError") {
//         toast.error("No camera device found");
//       } else {
//         toast.error("Camera failed");
//       }

//       setScanning(false);
//     }
//   };

//   const stopScanner = async () => {
//     if (scannerRef.current && scanning) {
//       await scannerRef.current.stop();
//       setScanning(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopScanner();
//     };
//   }, []);

//   return (
//     <div className="p-6 flex justify-center">
//       <Card className="w-full max-w-xl shadow-xl border">
//         <CardHeader className="flex items-center gap-2">
//           <ScanLine className="w-5 h-5 text-primary" />
//           <CardTitle>Ticket Scanner</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {/* Scanner Box */}
//           <div className="relative w-full aspect-square rounded-xl overflow-hidden border bg-black/5">
//             <div id="qr-reader" className="w-full h-full" />

//             {/* 🔥 PERFECT OVERLAY */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="relative" style={{ width: BOX_SIZE, height: BOX_SIZE }}>
                
//                 {/* Corners */}
//                 <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-md" />
//                 <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-md" />
//                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-md" />
//                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-md" />

//                 {/* Center subtle border */}
//                 <div className="absolute inset-0 border border-primary/30 rounded-xl" />

//                 {/* 🔥 Scan Line Animation */}
//                 {scanning && (
//                   <div className="absolute left-0 w-full h-1 bg-primary animate-scan" />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Status */}
//           <div className="text-center text-sm">
//             {status === "idle" && (
//               <p className="text-muted-foreground">
//                 Align QR code inside the frame
//               </p>
//             )}
//             {status === "success" && (
//               <p className="text-green-600 font-medium">
//                 ✅ Check-in successful
//               </p>
//             )}
//             {status === "error" && (
//               <p className="text-red-500 font-medium">
//                 ❌ Invalid or already used ticket
//               </p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-center gap-3">
//             {!scanning ? (
//               <Button onClick={startScanner} className="px-6">
//                 <Camera className="w-4 h-4 mr-2" />
//                 Start Scan
//               </Button>
//             ) : (
//               <Button onClick={stopScanner} variant="destructive" className="px-6">
//                 <Square className="w-4 h-4 mr-2" />
//                 Stop
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* 🔥 Animation */}
//       <style jsx>{`
//         @keyframes scan {
//           0% {
//             top: 0%;
//           }
//           100% {
//             top: 100%;
//           }
//         }

//         .animate-scan {
//           animation: scan 2s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { checkInTicketAction } from "@/actions/ticket.action";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanLine, Camera, Square } from "lucide-react";

const BOX_SIZE = 260;

export default function TicketScanner() {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const startScanner = async () => {
    const qrRegionId = "qr-reader";

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((d) => d.kind === "videoinput");

      if (!hasCamera) {
        toast.error("No camera found on this device");
        return;
      }

      const html5QrCode = new Html5Qrcode(qrRegionId);
      scannerRef.current = html5QrCode;

      setScanning(true);
      setStatus("idle");
      setMessage("");

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: BOX_SIZE, height: BOX_SIZE },
        },
        async (decodedText) => {
          await html5QrCode.stop();
          setScanning(false);

          const res = await checkInTicketAction(decodedText);

          if (!res.ok) {
            setStatus("error");
            setMessage(res.message);
            toast.error(res.message);
            return;
          }

          setStatus("success");
          setMessage(res.message);
          toast.success(res.message);
        },
        () => {}
      );
    } catch (err: any) {
      console.error(err);

      if (err?.name === "NotAllowedError") {
        toast.error("Camera permission denied");
      } else if (err?.name === "NotFoundError") {
        toast.error("No camera device found");
      } else {
        toast.error("Camera failed");
      }

      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scanning) {
      await scannerRef.current.stop();
      setScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-xl shadow-xl border">
        <CardHeader className="flex items-center gap-2">
          <ScanLine className="w-5 h-5 text-primary" />
          <CardTitle>Ticket Scanner</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Scanner Box */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden border bg-black/5">
            <div id="qr-reader" className="w-full h-full" />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="relative"
                style={{ width: BOX_SIZE, height: BOX_SIZE }}
              >
                {/* Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-md" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-md" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-md" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-md" />

                <div className="absolute inset-0 border border-primary/30 rounded-xl" />

                {/* Scan line */}
                {scanning && (
                  <div className="absolute left-0 w-full h-1 bg-primary animate-scan" />
                )}
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center text-sm">
            {status === "idle" && (
              <p className="text-muted-foreground">
                Align QR code inside the frame
              </p>
            )}

            {status === "success" && (
              <p className="text-green-600 font-medium">
                ✅ {message}
              </p>
            )}

            {status === "error" && (
              <p className="text-red-500 font-medium">
                ❌ {message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            {!scanning ? (
              <Button onClick={startScanner} className="px-6">
                <Camera className="w-4 h-4 mr-2" />
                Start Scan
              </Button>
            ) : (
              <Button
                onClick={stopScanner}
                variant="destructive"
                className="px-6"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Animation */}
      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
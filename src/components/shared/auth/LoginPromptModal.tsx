"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Ticket, Compass, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

export default function LoginPromptModal() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || loading || user?.id) return;

        // Skip prompt on auth pages
        if (pathname.includes("/login") || pathname.includes("/register")) return;

        let timeoutId: NodeJS.Timeout;

        const checkPrompt = () => {
            const hasSeen = sessionStorage.getItem("planora_login_prompt_seen");
            
            // Show if not seen in this session
            if (!hasSeen) {
                // Short delay so page loads first but user sees it quickly
                timeoutId = setTimeout(() => {
                    setIsOpen(true);
                }, 1500);
            }
        };

        checkPrompt();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [mounted, loading, user, pathname]);

    const handleDismiss = () => {
        setIsOpen(false);
        sessionStorage.setItem("planora_login_prompt_seen", "true");
    };

    const handleAction = (url: string) => {
        handleDismiss();
        router.push(url);
    };

    if (!mounted) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleDismiss}>
            <DialogContent className="sm:max-w-2xl w-full p-0 overflow-hidden border-0 bg-transparent shadow-none gap-0">
                <DialogTitle className="sr-only">Unlock Full Access</DialogTitle>
                <div className="relative w-full rounded overflow-hidden bg-white">
                    {/* Top Decorative Graphic */}
                    <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-[#FE7743] relative flex items-center justify-center">
                        {/* Abstract Background Shapes */}
                        <div className="absolute inset-0 overflow-hidden opacity-30">
                            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white blur-2xl flex-shrink-0" />
                            <div className="absolute top-10 -right-10 w-32 h-32 rounded-full bg-yellow-300 blur-2xl flex-shrink-0" />
                        </div>
                        
                        <div className="relative z-10 w-20 h-20 rounded-2xl bg-white backdrop-blur-md shadow-xl flex items-center justify-center">
                            <img src="/logo/logo.png" alt="Planora Logo" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 pt-8 pb-6 space-y-6">
                        <div className="text-center space-y-2 text-slate-800">
                            <h2 className="text-2xl font-black tracking-tight text-slate-900">
                                Unlock Planora
                            </h2>
                            <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-[280px] mx-auto">
                                Sign in or create an account to experience our full suite of intelligent features.
                            </p>
                        </div>

                        {/* Feature Highlights Grid */}
                        <div className="grid grid-cols-2 gap-3 pb-2 pt-2">
                            <div className="flex gap-3 items-center p-3 rounded bg-slate-100 border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <Calendar size={14} className="text-[#FE7743]" />
                                </div>
                                <p className="text-xs font-semibold text-slate-700">Save & Join Events</p>
                            </div>
                            <div className="flex gap-3 items-center p-3 rounded bg-slate-100 border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <Ticket size={14} className="text-indigo-500" />
                                </div>
                                <p className="text-xs font-semibold text-slate-700">Manage Tickets</p>
                            </div>
                            <div className="flex gap-3 items-center p-3 rounded bg-slate-100 border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <Compass size={14} className="text-purple-500" />
                                </div>
                                <p className="text-xs font-semibold text-slate-700 leading-tight">AI Recommendations</p>
                            </div>
                            <div className="flex gap-3 items-center p-3 rounded bg-slate-100 border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                    <Sparkles size={14} className="text-emerald-500" />
                                </div>
                                <p className="text-xs font-semibold text-slate-700">AI Reviews Insight</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2.5 w-full">
                            <Button 
                                onClick={() => handleAction(`/login?redirect=${encodeURIComponent(pathname)}`)}
                                className="w-full text-md py-6 rounded bg-[#FE7743] hover:bg-orange-500 text-white font-bold tracking-wide group"
                            >
                                Login to Account
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            
                            <Button 
                                variant="outline"
                                onClick={() => handleAction("/register")}
                                className="w-full text-md py-6 rounded font-bold tracking-wide border-slate-200 hover:bg-slate-50 text-slate-700"
                            >
                                Create an Account
                            </Button>

                            <button 
                                onClick={handleDismiss}
                                className="mt-2 text-[13px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Continue as Guest
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

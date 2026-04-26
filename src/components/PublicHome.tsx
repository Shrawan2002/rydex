"use client";
import { useState } from "react";
import AuthModal from "./AuthModal";
import HeroSection from "./HeroSection";
import VehicleSlider from "./VehicleSlider";

export default function PublicHome() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
    return (
        <>
        <HeroSection/>
        <VehicleSlider/>
        <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    )
}
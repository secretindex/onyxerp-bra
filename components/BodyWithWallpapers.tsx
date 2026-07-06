"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const BodyWithWallpapers = ({ children }: { children: React.ReactNode }) => {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const supabase = createClient();
  const [currentWallpaper, setCurrentWallpaper] = useState("none");
  const [currentCity, setCurrentCity] = useState<string>("");

  useEffect(() => {
    if (!wallpapers || wallpapers.length === 0) return;

    const switchImage = () => {
      const randomIndex = Math.floor(Math.random() * wallpapers.length);
      const selectedWallpaper = wallpapers[randomIndex];
      setCurrentWallpaper(`url(${selectedWallpaper.image_url})`);
      setCurrentCity(`${selectedWallpaper.cidade}, ${selectedWallpaper.uf}`);
    };

    switchImage();

    const interval = setInterval(switchImage, 5000);

    return () => clearInterval(interval);
  }, [wallpapers]);

  useEffect(() => {
    const fetchWallpapers = async () => {
      const { data, error } = await supabase.from("images").select("*");
      if (error) {
        console.error("Error fetching wallpapers:", error);
      } else {
        setWallpapers(data);
      }
    };
    fetchWallpapers();
  }, [wallpapers.length]);

  return (
    <div
      style={{
        backgroundImage: currentWallpaper,
      }}
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed transition-all duration-1000 bg-[#121212cf] bg-blend-multiply text-white"
    >
      <div className="absolute right-6 bottom-6 text-muted-foreground text-sm">
        {currentCity}
      </div>
      {children}
    </div>
  );
};

export default BodyWithWallpapers;

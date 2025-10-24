"use client"

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, Sparkles, MessageCircle } from "lucide-react";
import Image from "next/image";

const CALEB_URL = "https://github.com/caleb-cactus";
const KIDUS_URL = "https://github.com/kidusabdula";
const CALEB_TG = "https://t.me/zatmelomaniac";
const KIDUS_TG = "https://t.me/kidusabdula";
const CALEB_AVATAR = "https://github.com/caleb-cactus.png?size=96";
const KIDUS_AVATAR = "https://github.com/kidusabdula.png?size=96";

export default function GithubPopup() {
  const [open, setOpen] = useState(false);

  // Open popup when a global event is dispatched
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-github-popup", handler as EventListener);
    return () => {
      window.removeEventListener("open-github-popup", handler as EventListener);
    };
  }, []);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "overflow-hidden border border-white/10 bg-background/80 backdrop-blur-xl",
          "shadow-2xl",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        )}
      >
        {/* Decorative gradient beams */}
        <div className="pointer-events-none absolute -top-32 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-500/20 to-emerald-500/20 blur-3xl" />

        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <DialogTitle className="text-xl">Tailored software, built for you</DialogTitle>
          </div>
          <DialogDescription>
            Share the solution you want — we’ll shape a modern, scalable build that fits your goals. Reach out in a quick chat on Telegram or browse our GitHub to see how we work.
          </DialogDescription>
        </DialogHeader>

        {/* Profiles */}
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileCard
            name="Caleb"
            handle="@caleb-cactus"
            githubUrl={CALEB_URL}
            telegramUrl={CALEB_TG}
            avatarUrl={CALEB_AVATAR}
            accent="from-indigo-500 to-purple-500"
          />
          <ProfileCard
            name="Kidus"
            handle="@kidusabdula"
            githubUrl={KIDUS_URL}
            telegramUrl={KIDUS_TG}
            avatarUrl={KIDUS_AVATAR}
            accent="from-emerald-500 to-teal-500"
          />
        </div>

        {/* Actions */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Not now
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href={CALEB_TG} target="_blank" rel="noopener noreferrer">
                Message Caleb <MessageCircle className="ml-1 size-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={KIDUS_TG} target="_blank" rel="noopener noreferrer">
                Message Kidus <MessageCircle className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProfileCard({
  name,
  handle,
  githubUrl,
  telegramUrl,
  avatarUrl,
  accent,
}: {
  name: string;
  handle: string;
  githubUrl: string;
  telegramUrl: string;
  avatarUrl: string;
  accent: string; // tailwind gradient classes
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-card/60 p-4 shadow-sm transition-all",
        "hover:shadow-lg hover:bg-card/80",
        "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-[1.5px]",
        "before:bg-gradient-to-r",
        accent,
        "before:opacity-60 before:blur-[0.5px]"
      )}
    >
      <div className="flex items-center gap-3">
        {imgError ? (
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-full text-white shadow-sm",
              "bg-gradient-to-r",
              accent
            )}
          >
            <Github className="size-8" />
          </div>
        ) : (
          <div className={cn("size-16 rounded-full p-[2px] bg-gradient-to-r", accent)}>
            <div className="h-full w-full overflow-hidden rounded-full bg-background">
              <Image
                src={avatarUrl}
                alt={`${name} avatar`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
                priority
              />
            </div>
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold">{name}</p>
            <span className="text-xs text-muted-foreground">{handle}</span>
          </div>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            Let’s discuss your idea and turn it into a clean, scalable product.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <Button
          asChild
          variant="outline"
          className="shadow-xs transition-transform hover:scale-[1.02]"
        >
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            View GitHub
            <ExternalLink className="ml-2 size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
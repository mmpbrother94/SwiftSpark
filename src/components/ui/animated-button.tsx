
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  glowColor?: string;
  pulseEffect?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.5)", // Default blue glow
  pulseEffect = false,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg group",
        pulseEffect && "animate-pulse",
        className
      )}
      style={{
        "--glow-color": glowColor,
      } as React.CSSProperties}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--glow-color)] to-transparent opacity-0 group-hover:opacity-50 transition-opacity blur-xl"></span>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-[var(--glow-color)] rounded-md"></span>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></span>
      <span className="absolute -top-10 right-0 w-20 h-20 bg-[var(--glow-color)] opacity-0 group-hover:opacity-30 blur-xl transform rotate-45 transition-all duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></span>
    </Button>
  );
};

export default AnimatedButton;

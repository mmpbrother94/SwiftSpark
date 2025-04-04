
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  glowColor?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.5)", // Default blue glow
  ...props
}) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg group",
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
    </Button>
  );
};

export default AnimatedButton;


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
        "relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg",
        className
      )}
      style={{
        "--glow-color": glowColor,
      } as React.CSSProperties}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--glow-color)] to-transparent opacity-0 hover:opacity-30 transition-opacity blur-xl"></span>
    </Button>
  );
};

export default AnimatedButton;

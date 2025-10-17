// src/data.ts
import { ComponentType, SVGProps } from "react";
import { Rocket, Lock, Code, Cloud, Zap } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const features: Feature[] = [
  {
    title: "Fast Deployment",
    description: "Deploy your apps with zero configuration and blazing speed.",
    Icon: Rocket,
  },
  {
    title: "Secure",
    description: "Built-in security features to keep your projects safe.",
    Icon: Lock,
  },
  {
    title: "Developer Friendly",
    description: "Tools and integrations that developers actually love.",
    Icon: Code,
  },
  {
    title: "Cloud Ready",
    description: "Seamless cloud integrations for modern web projects.",
    Icon: Cloud,
  },
  {
    title: "Blazing Performance",
    description: "Optimized for speed and efficiency out of the box.",
    Icon: Zap,
  },
];

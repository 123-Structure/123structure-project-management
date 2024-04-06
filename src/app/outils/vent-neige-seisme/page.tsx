"use client";
import { Button } from "@/components/ui/button";
import tools from "@/lib/constants/tools";

export default function Tools() {
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex gap-2">
        {tools.map((tool, index) => (
          <Button key={index}>{tool.title}</Button>
        ))}
      </div>
      <p>Vent / Neige / Séisme</p>
    </div>
  );
}

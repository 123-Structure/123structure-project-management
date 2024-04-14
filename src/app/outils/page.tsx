import ToolsCard from "@/components/pages/tools/ToolsCard";

export default function Tools() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        <ToolsCard />
      </div>
    </div>
  );
}

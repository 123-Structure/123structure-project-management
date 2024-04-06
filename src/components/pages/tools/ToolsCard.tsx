"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import tools from "@/lib/constants/tools";
import { useRouter } from "next/navigation";

const ToolsCard = () => {
  const router = useRouter();
  
  return (
    <>
      {tools.map((tool, index) => (
        <Card
          key={index}
          className="w-96 transition-all duration-200 ease-in-out hover:cursor-pointer hover:shadow-xl"
          onClick={() => router.push(tool.link)}
        >
          <CardHeader>
            <CardTitle>{tool.title}</CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      ))}
    </>
  );
};

export default ToolsCard;

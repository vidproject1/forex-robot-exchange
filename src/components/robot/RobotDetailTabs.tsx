
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RobotDetailTabsProps {
  description: string;
  longDescription?: string;
  features?: string[];
  compatibility?: string[];
}

export function RobotDetailTabs({ 
  description, 
  longDescription, 
  features = [], 
  compatibility = [] 
}: RobotDetailTabsProps) {
  return (
    <Tabs defaultValue="description">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="p-4 bg-card rounded-lg border mt-2">
        <p className="whitespace-pre-line">{longDescription || description}</p>
      </TabsContent>
      <TabsContent value="features" className="p-4 bg-card rounded-lg border mt-2">
        <ul className="list-disc pl-5 space-y-2">
          {features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="compatibility" className="p-4 bg-card rounded-lg border mt-2">
        <h3 className="font-semibold mb-3">Compatible With:</h3>
        <ul className="list-disc pl-5 space-y-2">
          {compatibility?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}

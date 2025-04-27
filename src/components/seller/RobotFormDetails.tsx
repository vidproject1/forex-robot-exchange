
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RobotFormDetailsProps {
  longDescription: string;
  features: string[];
  compatibility: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function RobotFormDetails({
  longDescription,
  features,
  compatibility,
  handleChange,
}: RobotFormDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="long_description">Detailed Description</Label>
        <Textarea
          id="long_description"
          name="long_description"
          placeholder="Provide a detailed description of your robot's functionality, strategy, and unique selling points"
          value={longDescription}
          onChange={handleChange}
          rows={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          name="features"
          placeholder="Enter features (one per line)"
          value={features.join("\n")}
          onChange={handleChange}
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="compatibility">Compatibility (one per line)</Label>
        <Textarea
          id="compatibility"
          name="compatibility"
          placeholder="Enter compatibility requirements (one per line)"
          value={compatibility.join("\n")}
          onChange={handleChange}
          rows={5}
        />
      </div>
    </div>
  );
}

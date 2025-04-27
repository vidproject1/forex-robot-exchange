
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Platform } from "@/types/robot";

interface RobotFormBasicInfoProps {
  title: string;
  description: string;
  price: number;
  platform: Platform;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePlatformChange: (value: Platform) => void;
}

export function RobotFormBasicInfo({
  title,
  description,
  price,
  platform,
  handleChange,
  handlePlatformChange,
}: RobotFormBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter robot name"
          value={title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your robot's features and benefits"
          value={description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price ($USD)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="199.00"
          value={price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select
          value={platform}
          onValueChange={handlePlatformChange}
        >
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mt4">MetaTrader 4</SelectItem>
            <SelectItem value="mt5">MetaTrader 5</SelectItem>
            <SelectItem value="ctrader">cTrader</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { RobotCard, RobotCardProps } from "@/components/RobotCard";

interface RobotsGridProps {
  robots: RobotCardProps[];
  onReset: () => void;
}

export function RobotsGrid({ robots, onReset }: RobotsGridProps) {
  if (robots.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No robots found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search term
        </p>
        <Button onClick={onReset}>Reset Filters</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {robots.map((robot) => (
        <RobotCard key={robot.id} {...robot} />
      ))}
    </div>
  );
}

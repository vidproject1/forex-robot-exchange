
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Robot {
  id: string;
  title: string;
  description: string;
  price: number;
  platform: string;
  active: boolean;
  created_at: string;
}

export default function SellerDashboard() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, accountType } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || accountType !== "seller") {
      navigate("/login");
      return;
    }
    
    const fetchRobots = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("robots")
          .select("*")
          .eq("seller_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setRobots(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching listings",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRobots();
  }, [user, accountType, navigate, toast]);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("robots")
        .update({ active: !currentStatus })
        .eq("id", id)
        .eq("seller_id", user?.id);

      if (error) throw error;

      setRobots((prev) =>
        prev.map((robot) =>
          robot.id === id ? { ...robot, active: !currentStatus } : robot
        )
      );

      toast({
        title: "Success",
        description: `Listing ${!currentStatus ? "activated" : "deactivated"} successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("robots")
        .delete()
        .eq("id", id)
        .eq("seller_id", user?.id);

      if (error) throw error;

      setRobots((prev) => prev.filter((robot) => robot.id !== id));

      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatPlatform = (platform: string) => {
    switch (platform) {
      case "mt4":
        return "MetaTrader 4";
      case "mt5":
        return "MetaTrader 5";
      case "ctrader":
        return "cTrader";
      case "ninjatrader":
        return "NinjaTrader";
      default:
        return "Other";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your forex robot listings
            </p>
          </div>

          <Button className="mt-4 md:mt-0" asChild>
            <Link to="/seller-dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Add New Listing
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>
              View and manage all your forex robot listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <span className="loading loading-spinner loading-lg">
                  Loading...
                </span>
              </div>
            ) : robots.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No listings yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first robot listing to start selling
                </p>
                <Button asChild>
                  <Link to="/seller-dashboard/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Listing
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableCaption>A list of your robot listings.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Platform</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {robots.map((robot) => (
                    <TableRow key={robot.id}>
                      <TableCell className="font-medium">{robot.title}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatPlatform(robot.platform)}
                      </TableCell>
                      <TableCell>${robot.price.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={robot.active ? "default" : "outline"}
                          className="capitalize"
                        >
                          {robot.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleToggleActive(robot.id, robot.active)
                          }
                        >
                          {robot.active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link to={`/robot/${robot.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link to={`/seller-dashboard/edit/${robot.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Listing
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this listing? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(robot.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

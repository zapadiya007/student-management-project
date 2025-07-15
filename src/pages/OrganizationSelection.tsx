import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Plus, Users, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock data - will be replaced with real data from Supabase
const mockOrganizations = [
  {
    id: "1",
    name: "ABC School",
    description: "Primary and Secondary Education",
    studentCount: 450,
    userCount: 25,
  },
  {
    id: "2",
    name: "XYZ University",
    description: "Higher Education Institution",
    studentCount: 2500,
    userCount: 150,
  },
  {
    id: "3",
    name: "DEF Academy",
    description: "Vocational Training Center",
    studentCount: 180,
    userCount: 12,
  },
];

const OrganizationSelection = () => {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newOrgData, setNewOrgData] = useState({
    name: "",
    description: "",
  });

  const handleJoinOrganization = () => {
    if (!selectedOrg) return;
    // TODO: Implement organization joining with Supabase
    console.log("Joining organization:", selectedOrg);
    // Redirect to dashboard or complete signup
  };

  const handleCreateOrganization = () => {
    // TODO: Implement organization creation with Supabase
    console.log("Creating organization:", newOrgData);
    setShowCreateDialog(false);
    setNewOrgData({ name: "", description: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 village-gradient">
      <div className="w-full max-w-4xl">
        <Card className="glass-effect border-0 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              <Building2 className="h-8 w-8" />
              Select Organization
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose an organization to join or create a new one
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Existing Organizations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Organizations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockOrganizations.map((org) => (
                  <Card
                    key={org.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedOrg === org.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedOrg(org.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {org.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {org.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {org.studentCount} students
                        </div>
                        <div className="flex items-center gap-1">
                          <Crown className="h-4 w-4" />
                          {org.userCount} users
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Create New Organization */}
            <div className="border-t pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">
                  Don't see your organization?
                </h3>
                <Dialog
                  open={showCreateDialog}
                  onOpenChange={setShowCreateDialog}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create New Organization
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Organization</DialogTitle>
                      <DialogDescription>
                        Set up a new organization to manage your students and
                        team.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="orgName">Organization Name</Label>
                        <Input
                          id="orgName"
                          value={newOrgData.name}
                          onChange={(e) =>
                            setNewOrgData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter organization name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="orgDescription">Description</Label>
                        <Input
                          id="orgDescription"
                          value={newOrgData.description}
                          onChange={(e) =>
                            setNewOrgData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Brief description of your organization"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowCreateDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreateOrganization}
                          disabled={!newOrgData.name.trim()}
                        >
                          Create Organization
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Link to="/signin">
                <Button variant="outline">Back to Sign In</Button>
              </Link>
              <Button
                onClick={handleJoinOrganization}
                disabled={!selectedOrg}
                className="min-w-32"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationSelection;

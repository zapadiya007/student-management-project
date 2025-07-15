import { useState } from "react";
import {
  Building2,
  Settings,
  Users,
  UserPlus,
  Shield,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - will be replaced with real data from Supabase
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@abc.edu",
    role: "org_user",
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@abc.edu",
    role: "end_user",
    status: "active",
    joinedAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@abc.edu",
    role: "org_user",
    status: "pending",
    joinedAt: "2024-01-25",
  },
];

const mockOrgDetails = {
  id: "1",
  name: "ABC School",
  description: "Primary and Secondary Education",
  studentCount: 450,
  userCount: 25,
  createdAt: "2023-12-01",
};

const OrganizationManagement = () => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "end_user",
  });

  const handleInviteUser = () => {
    // TODO: Implement user invitation with Supabase
    console.log("Inviting user:", inviteData);
    setShowInviteDialog(false);
    setInviteData({ email: "", role: "end_user" });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    // TODO: Implement role change with Supabase
    console.log("Changing role for user:", userId, "to:", newRole);
  };

  const handleRemoveUser = (userId: string) => {
    // TODO: Implement user removal with Supabase
    console.log("Removing user:", userId);
  };

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      super_admin: "bg-red-100 text-red-800",
      org_user: "bg-blue-100 text-blue-800",
      end_user: "bg-green-100 text-green-800",
    };

    return (
      <Badge className={roleStyles[role as keyof typeof roleStyles]}>
        {role.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "secondary"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Organization Management
          </h1>
          <p className="text-muted-foreground">
            Manage your organization settings and users
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Organization Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockOrgDetails.studentCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockOrgDetails.userCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Since
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Date(mockOrgDetails.createdAt).getFullYear()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Organization Details */}
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Organization Name</Label>
                <p className="text-sm text-muted-foreground">
                  {mockOrgDetails.name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground">
                  {mockOrgDetails.description}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(mockOrgDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* Users Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users & Roles</CardTitle>
                  <CardDescription>
                    Manage user access and permissions
                  </CardDescription>
                </div>
                <Dialog
                  open={showInviteDialog}
                  onOpenChange={setShowInviteDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Invite User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite New User</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your organization
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={inviteData.email}
                          onChange={(e) =>
                            setInviteData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="user@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={inviteData.role}
                          onValueChange={(value) =>
                            setInviteData((prev) => ({ ...prev, role: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="end_user">End User</SelectItem>
                            <SelectItem value="org_user">
                              Organization User
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowInviteDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleInviteUser}
                          disabled={!inviteData.email}
                        >
                          Send Invitation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        {new Date(user.joinedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            value={user.role}
                            onValueChange={(value) =>
                              handleRoleChange(user.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="end_user">End User</SelectItem>
                              <SelectItem value="org_user">Org User</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Organization Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Configure your organization preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue={mockOrgDetails.name} />
              </div>
              <div>
                <Label htmlFor="orgDescription">Description</Label>
                <Input
                  id="orgDescription"
                  defaultValue={mockOrgDetails.description}
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationManagement;

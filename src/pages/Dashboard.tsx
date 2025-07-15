
import { BarChart3, Users, GraduationCap, MapPin, TrendingUp, Calendar, School, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { MapMyIndia } from "@/components/MapMyIndia";
import { Link } from "react-router-dom";

// Mock data for charts and statistics
const mockStats = {
  totalStudents: 245,
  primaryStudents: 120,
  secondaryStudents: 85,
  higherEducationStudents: 40,
  recentAdditions: 12,
  schools: 8
};

const mockRecentActivities = [
  { id: 1, action: "New student added", student: "Ravi Kumar", time: "2 hours ago", type: "add" },
  { id: 2, action: "Profile updated", student: "Priya Sharma", time: "4 hours ago", type: "update" },
  { id: 3, action: "Student graduated", student: "Amit Patel", time: "1 day ago", type: "graduate" },
  { id: 4, action: "New enrollment", student: "Kavya Reddy", time: "2 days ago", type: "add" },
];

// Mock student locations for map
const studentLocations = [
  { lat: 28.6139, lng: 77.2090, title: "Ravi Kumar", description: "10th Standard - Village High School" },
  { lat: 28.6200, lng: 77.2150, title: "Priya Sharma", description: "8th Standard - Primary School" },
  { lat: 28.6100, lng: 77.2050, title: "Amit Patel", description: "12th Standard - Senior Secondary" },
  { lat: 28.6180, lng: 77.2120, title: "Kavya Reddy", description: "B.Tech - Engineering College" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="village-gradient border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Village Education Dashboard</h1>
              <p className="text-muted-foreground">Overview of student records and educational statistics</p>
            </div>
            <Link to="/add-student">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Student
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={mockStats.totalStudents}
            icon={Users}
            trend={{ value: 5.2, isPositive: true }}
            className="stat-total"
          />
          <StatsCard
            title="Primary Level"
            value={mockStats.primaryStudents}
            icon={GraduationCap}
            trend={{ value: 3.1, isPositive: true }}
            className="stat-primary"
          />
          <StatsCard
            title="Secondary Level"
            value={mockStats.secondaryStudents}
            icon={School}
            trend={{ value: 2.5, isPositive: true }}
            className="stat-secondary"
          />
          <StatsCard
            title="Higher Education"
            value={mockStats.higherEducationStudents}
            icon={TrendingUp}
            trend={{ value: 8.3, isPositive: true }}
            className="stat-higher"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Location Map */}
          <div>
            <Card className="hover-lift glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Student Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapMyIndia
                  className="w-full h-80"
                  center={{ lat: 28.6139, lng: 77.2090 }}
                  zoom={12}
                  markers={studentLocations}
                />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Interactive map showing student locations across the village</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card className="hover-lift glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'add' ? 'bg-emerald-500' :
                          activity.type === 'update' ? 'bg-blue-500' :
                          activity.type === 'graduate' ? 'bg-purple-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.student}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover-lift glass-effect mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/students" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Students
                  </Button>
                </Link>
                <Link to="/add-student" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Student
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Full Map
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Education Distribution */}
        <div className="mt-6">
          <Card className="hover-lift glass-effect">
            <CardHeader>
              <CardTitle>Education Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Primary Education</span>
                    <span className="font-medium">{Math.round((mockStats.primaryStudents / mockStats.totalStudents) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(mockStats.primaryStudents / mockStats.totalStudents) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{mockStats.primaryStudents} students</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Secondary Education</span>
                    <span className="font-medium">{Math.round((mockStats.secondaryStudents / mockStats.totalStudents) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(mockStats.secondaryStudents / mockStats.totalStudents) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{mockStats.secondaryStudents} students</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Higher Education</span>
                    <span className="font-medium">{Math.round((mockStats.higherEducationStudents / mockStats.totalStudents) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(mockStats.higherEducationStudents / mockStats.totalStudents) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{mockStats.higherEducationStudents} students</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Phone,
  User,
  GraduationCap,
  School,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapMyIndia } from "@/components/MapMyIndia";

const StudentProfile = () => {
  const { id } = useParams();

  // Mock student data
  const student = {
    id: parseInt(id || "1"),
    name: "Aarav Sharma",
    educationLevel: "10th Standard",
    school: "Village High School",
    address: "Main Road, Village Center, Village Name - 123456",
    parentName: "Rajesh Sharma",
    parentContact: "+91 98765 43210",
    parentOccupation: "Farmer",
    dateOfBirth: "May 15, 2008",
    gender: "Male",
    category: "secondary",
    enrollmentDate: "June 2023",
    studentId: "VHS2023001",
    location: { lat: 28.6139, lng: 77.209 },
  };

  const getEducationBadge = (level: string, category: string) => {
    const categoryClasses = {
      primary: "bg-green-100 text-green-800",
      secondary: "bg-blue-100 text-blue-800",
      higher: "bg-purple-100 text-purple-800",
    };

    return (
      categoryClasses[category as keyof typeof categoryClasses] ||
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="rural-gradient border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Student Profile
              </h1>
              <p className="text-muted-foreground">
                View detailed student information
              </p>
            </div>
            <div className="flex gap-2">
              <Link to={`/edit-student/${student.id}`}>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Student Header Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">
                        {student.name}
                      </h2>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          className={`${getEducationBadge(
                            student.educationLevel,
                            student.category
                          )} text-sm px-3 py-1`}
                        >
                          {student.educationLevel}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          ID: {student.studentId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <School className="h-4 w-4" />
                        <span>{student.school}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="text-sm font-medium">{student.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Gender
                    </p>
                    <p className="text-sm font-medium">{student.gender}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Current Address
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{student.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Level
                  </p>
                  <p className="text-sm font-medium">
                    {student.educationLevel}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    School/Institution
                  </p>
                  <p className="text-sm font-medium">{student.school}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Enrollment Date
                  </p>
                  <p className="text-sm font-medium">
                    {student.enrollmentDate}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Parent/Guardian Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Parent/Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-sm font-medium">{student.parentName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Contact Number
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {student.parentContact}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Occupation
                  </p>
                  <p className="text-sm font-medium">
                    {student.parentOccupation}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Student Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapMyIndia
                  className="w-full h-64"
                  center={student.location}
                  zoom={15}
                  markers={[
                    {
                      lat: student.location.lat,
                      lng: student.location.lng,
                      title: student.name,
                      description: `${student.educationLevel} - ${student.school}`,
                    },
                  ]}
                />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {student.address}
                  </p>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

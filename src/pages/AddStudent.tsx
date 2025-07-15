import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Calendar,
  MapPin,
  Upload,
  User,
  GraduationCap,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const AddStudent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    educationLevel: "",
    schoolName: "",
    address: "",
    parentName: "",
    parentContact: "",
    parentOccupation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullName ||
      !formData.educationLevel ||
      !formData.schoolName
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate saving
    toast({
      title: "Success!",
      description: "Student record has been added successfully.",
    });

    navigate("/students");
  };

  const educationLevels = [
    "1st Standard",
    "2nd Standard",
    "3rd Standard",
    "4th Standard",
    "5th Standard",
    "6th Standard",
    "7th Standard",
    "8th Standard",
    "9th Standard",
    "10th Standard",
    "11th Standard",
    "12th Standard",
    "Diploma",
    "B.A",
    "B.Sc",
    "B.Com",
    "B.Tech",
    "B.E",
    "M.A",
    "M.Sc",
    "M.Com",
    "M.Tech",
    "M.E",
    "MBA",
    "Ph.D",
    "Post Doctorate",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-10 border-b border-border/40 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Add New Student
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Create a comprehensive student profile with all necessary
                details
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Personal Information Card */}
            <Card className="hover-lift glass-effect border-primary/10 lg:col-span-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter student's complete name"
                    className="h-11 transition-all focus:scale-[1.02]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal transition-all hover:scale-[1.02]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date of birth"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                    className="flex flex-wrap gap-4 sm:gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-sm">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-sm">
                        Female
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="text-sm">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Education Information Card */}
            <Card className="hover-lift glass-effect border-secondary/20 lg:col-span-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-secondary-foreground">
                  <GraduationCap className="h-5 w-5" />
                  Education Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="educationLevel"
                    className="text-sm font-medium"
                  >
                    Education Level <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.educationLevel}
                    onValueChange={(value) =>
                      setFormData({ ...formData, educationLevel: value })
                    }
                  >
                    <SelectTrigger className="h-11 transition-all focus:scale-[1.02]">
                      <SelectValue placeholder="Choose education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="text-sm font-medium">
                    Institution Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) =>
                      setFormData({ ...formData, schoolName: e.target.value })
                    }
                    placeholder="School/College/University name"
                    className="h-11 transition-all focus:scale-[1.02]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Current Address
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Complete residential address"
                    rows={3}
                    className="resize-none transition-all focus:scale-[1.02]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Location Mapping
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 transition-all hover:scale-[1.02]"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Pin Location on Map
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Mark precise location for better tracking
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Parent/Guardian Information Card */}
            <Card className="hover-lift glass-effect border-accent/20 lg:col-span-2 xl:col-span-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-accent-foreground">
                  <Phone className="h-5 w-5" />
                  Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="parentName" className="text-sm font-medium">
                    Guardian Name
                  </Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentName: e.target.value })
                    }
                    placeholder="Parent or guardian's name"
                    className="h-11 transition-all focus:scale-[1.02]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="parentContact"
                    className="text-sm font-medium"
                  >
                    Contact Number
                  </Label>
                  <Input
                    id="parentContact"
                    value={formData.parentContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parentContact: e.target.value,
                      })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="h-11 transition-all focus:scale-[1.02]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="parentOccupation"
                    className="text-sm font-medium"
                  >
                    Occupation
                  </Label>
                  <Input
                    id="parentOccupation"
                    value={formData.parentOccupation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parentOccupation: e.target.value,
                      })
                    }
                    placeholder="Guardian's profession"
                    className="h-11 transition-all focus:scale-[1.02]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Documents Upload Card */}
            <Card className="hover-lift glass-effect border-muted/40 lg:col-span-2 xl:col-span-3">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Upload (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhar Card</Label>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex-col gap-2 transition-all hover:scale-[1.02] hover:bg-primary/5"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-xs">Upload Aadhar</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">School ID</Label>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex-col gap-2 transition-all hover:scale-[1.02] hover:bg-primary/5"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-xs">Upload ID</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Certificate</Label>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex-col gap-2 transition-all hover:scale-[1.02] hover:bg-primary/5"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-xs">Upload Cert</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Photo</Label>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex-col gap-2 transition-all hover:scale-[1.02] hover:bg-primary/5"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-xs">Upload Photo</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-end sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/40">
            <Link to="/students" className="w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto h-11"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="w-full sm:w-auto h-11 bg-primary hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Student Record
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

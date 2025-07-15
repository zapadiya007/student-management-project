import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MapPin, Edit, Eye, Filter, Users, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";
import { StatsCard } from "@/components/StatsCard";
import { BulkActions } from "@/components/BulkActions";
import { AdvancedFilters } from "@/components/AdvancedFilters";

// Mock data for demonstration
const mockStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    educationLevel: "10th Standard",
    school: "Village High School",
    address: "Main Road, Village Center",
    parentName: "Rajesh Sharma",
    parentContact: "+91 98765 43210",
    category: "secondary",
    age: 15,
    gender: "male"
  },
  {
    id: 2,
    name: "Priya Patel",
    educationLevel: "B.Sc Computer Science",
    school: "District College",
    address: "Near Temple, East Village",
    parentName: "Mukesh Patel",
    parentContact: "+91 98765 43211",
    category: "higher",
    age: 20,
    gender: "female"
  },
  {
    id: 3,
    name: "Rohan Kumar",
    educationLevel: "5th Standard",
    school: "Primary School",
    address: "School Lane, North Village",
    parentName: "Suresh Kumar",
    parentContact: "+91 98765 43212",
    category: "primary",
    age: 10,
    gender: "male"
  },
  {
    id: 4,
    name: "Anitha Reddy",
    educationLevel: "M.A English",
    school: "University College",
    address: "College Road, South Village",
    parentName: "Venkat Reddy",
    parentContact: "+91 98765 43213",
    category: "higher",
    age: 22,
    gender: "female"
  },
  {
    id: 5,
    name: "Vikram Singh",
    educationLevel: "12th Standard",
    school: "Village Higher Secondary School",
    address: "Near Post Office, Central Village",
    parentName: "Rajinder Singh",
    parentContact: "+91 98765 43214",
    category: "secondary",
    age: 17,
    gender: "male"
  },
  {
    id: 6,
    name: "Deepika Menon",
    educationLevel: "B.A History",
    school: "Arts and Science College",
    address: "Museum Road, Cultural Village",
    parentName: "Krishna Menon",
    parentContact: "+91 98765 43215",
    category: "higher",
    age: 21,
    gender: "female"
  },
  {
    id: 7,
    name: "Arjun Iyer",
    educationLevel: "7th Standard",
    school: "Middle School",
    address: "Library Street, Knowledge Village",
    parentName: "Lakshmi Iyer",
    parentContact: "+91 98765 43216",
    category: "secondary",
    age: 12,
    gender: "male"
  },
  {
    id: 8,
    name: "Sneha Desai",
    educationLevel: "Ph.D. Environmental Science",
    school: "National Research Institute",
    address: "Research Campus, Eco Village",
    parentName: "Amit Desai",
    parentContact: "+91 98765 43217",
    category: "higher",
    age: 28,
    gender: "female"
  },
  {
    id: 9,
    name: "Manish Gupta",
    educationLevel: "3rd Standard",
    school: "Elementary School",
    address: "Park Avenue, Green Village",
    parentName: "Pooja Gupta",
    parentContact: "+91 98765 43218",
    category: "primary",
    age: 8,
    gender: "male"
  },
  {
    id: 10,
    name: "Aishwarya Krishnan",
    educationLevel: "11th Standard",
    school: "Senior Secondary School",
    address: "Hill View, Scenic Village",
    parentName: "Ramesh Krishnan",
    parentContact: "+91 98765 43219",
    category: "secondary",
    age: 16,
    gender: "female"
  }
];

const getEducationBadge = (level: string, category: string) => {
  const baseClasses = "education-badge";
  const categoryClasses = {
    primary: "education-primary",
    secondary: "education-secondary",
    higher: "education-higher"
  };
  
  return `${baseClasses} ${categoryClasses[category as keyof typeof categoryClasses]}`;
};

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [filters, setFilters] = useState({
    educationLevel: "all",
    ageRange: "all",
    location: "all",
    school: "all",
    gender: "all"
  });
  
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === "all" || student.category === filterLevel;
    const matchesAdvancedFilters = 
      (filters.educationLevel === "all" || student.category === filters.educationLevel) &&
      (filters.gender === "all" || student.gender === filters.gender) &&
      (filters.location === "all" || student.address.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.school === "all" || student.school.toLowerCase().includes(filters.school.toLowerCase()));
    
    return matchesSearch && matchesFilter && matchesAdvancedFilters;
  });

  const activeFiltersCount = Object.values(filters).filter(value => value !== "all").length;

  const stats = {
    total: mockStudents.length,
    primary: mockStudents.filter(s => s.category === 'primary').length,
    secondary: mockStudents.filter(s => s.category === 'secondary').length,
    higher: mockStudents.filter(s => s.category === 'higher').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="village-gradient border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Village Student Directory</h1>
              <p className="text-muted-foreground">Manage student records from 1st standard to postgraduate level</p>
            </div>
            <Link to="/add-student">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add New Student
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Total" value={stats.total} icon={Users} className="stat-total" />
          <StatsCard title="Primary" value={stats.primary} icon={Users} className="stat-primary" />
          <StatsCard title="Secondary" value={stats.secondary} icon={Users} className="stat-secondary" />
          <StatsCard title="Higher Ed" value={stats.higher} icon={Users} className="stat-higher" />
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-6 glass-effect">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or school..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="primary">Primary (1st-5th)</SelectItem>
                    <SelectItem value="secondary">Secondary (6th-12th)</SelectItem>
                    <SelectItem value="higher">Higher Education</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
                  className="w-full sm:w-auto"
                >
                  {viewMode === "grid" ? "Table View" : "Grid View"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        <div className="mb-6">
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={() => setFilters({
              educationLevel: "all",
              ageRange: "all", 
              location: "all",
              school: "all",
              gender: "all"
            })}
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover-lift glass-effect">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg truncate">{student.name}</CardTitle>
                      <Badge className={getEducationBadge(student.educationLevel, student.category)}>
                        {student.educationLevel}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">School/College</p>
                    <p className="text-sm truncate">{student.school}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-sm truncate">{student.address}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Parent/Guardian</p>
                    <p className="text-sm truncate">{student.parentName}</p>
                    <p className="text-xs text-muted-foreground">{student.parentContact}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Link to={`/student/${student.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/edit-student/${student.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card className="text-center py-12 glass-effect">
            <CardContent>
              <div className="text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No students found</p>
                <p>Try adjusting your search terms or filters</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentList;

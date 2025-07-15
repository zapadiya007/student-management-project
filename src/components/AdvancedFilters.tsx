
import { useState } from "react";
import { Filter, X, Calendar, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterState {
  educationLevel: string;
  ageRange: string;
  location: string;
  school: string;
  gender: string;
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function AdvancedFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  activeFiltersCount 
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof FilterState) => {
    onFiltersChange({ ...filters, [key]: "all" });
  };

  return (
    <Card className="glass-effect">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto font-medium text-left">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </CollapsibleTrigger>
            
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
          
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(filters).map(([key, value]) => 
                value !== "all" && (
                  <Badge 
                    key={key} 
                    variant="outline" 
                    className="bg-primary/5 border-primary/20"
                  >
                    {key}: {value}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                      onClick={() => removeFilter(key as keyof FilterState)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              )}
            </div>
          )}
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Education Level
                </label>
                <Select value={filters.educationLevel} onValueChange={(value) => updateFilter('educationLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="primary">Primary (1st-5th)</SelectItem>
                    <SelectItem value="secondary">Secondary (6th-12th)</SelectItem>
                    <SelectItem value="higher">Higher Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Age Range
                </label>
                <Select value={filters.ageRange} onValueChange={(value) => updateFilter('ageRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All ages" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="16-20">16-20 years</SelectItem>
                    <SelectItem value="21+">21+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <Select value={filters.gender} onValueChange={(value) => updateFilter('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All genders" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location
                </label>
                <Input
                  placeholder="Enter location..."
                  value={filters.location === "all" ? "" : filters.location}
                  onChange={(e) => updateFilter('location', e.target.value || "all")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">School/College</label>
                <Input
                  placeholder="Enter school name..."
                  value={filters.school === "all" ? "" : filters.school}
                  onChange={(e) => updateFilter('school', e.target.value || "all")}
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

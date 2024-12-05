'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dispatch, SetStateAction } from "react";

interface SkillFiltersProps {
  filters: {
    type: string;
    level: string[];
    categories: string[];
  };
  onFiltersChange: Dispatch<SetStateAction<{
    type: string;
    level: string[];
    categories: string[];
  }>>;
}

export function SkillFilters({ filters, onFiltersChange }: SkillFiltersProps) {
  const handleLevelChange = (level: string, checked: boolean) => {
    onFiltersChange((prev) => ({
      ...prev,
      level: checked
        ? [...prev.level, level]
        : prev.level.filter((l) => l !== level),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Type</h3>
          <RadioGroup
            value={filters.type}
            onValueChange={(value) =>
              onFiltersChange((prev) => ({ ...prev, type: value }))
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Skills</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offered" id="offered" />
              <Label htmlFor="offered">Offered</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="requested" id="requested" />
              <Label htmlFor="requested">Requested</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Level</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="beginner"
                checked={filters.level.includes("Beginner")}
                onCheckedChange={(checked) =>
                  handleLevelChange("Beginner", checked as boolean)
                }
              />
              <Label htmlFor="beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intermediate"
                checked={filters.level.includes("Intermediate")}
                onCheckedChange={(checked) =>
                  handleLevelChange("Intermediate", checked as boolean)
                }
              />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expert"
                checked={filters.level.includes("Expert")}
                onCheckedChange={(checked) =>
                  handleLevelChange("Expert", checked as boolean)
                }
              />
              <Label htmlFor="expert">Expert</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Popular Categories</h3>
          <div className="space-y-2">
            {["Music", "Languages", "Programming", "Art", "Sports"].map(
              (category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.toLowerCase()}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      onFiltersChange((prev) => ({
                        ...prev,
                        categories: checked
                          ? [...prev.categories, category]
                          : prev.categories.filter((c) => c !== category),
                      }))
                    }
                  />
                  <Label htmlFor={category.toLowerCase()}>{category}</Label>
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
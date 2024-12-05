'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function SkillFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Type</h3>
          <RadioGroup defaultValue="all">
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
              <Checkbox id="beginner" />
              <Label htmlFor="beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="expert" />
              <Label htmlFor="expert">Expert</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
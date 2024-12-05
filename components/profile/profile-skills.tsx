'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function ProfileSkills() {
  // Mock data - replace with real data fetching
  const skills = {
    offered: [
      { id: 1, title: 'Guitar Lessons', category: 'Music', level: 'Intermediate' },
      // Add more offered skills
    ],
    requested: [
      { id: 2, title: 'Spanish Language', category: 'Languages', level: 'Beginner' },
      // Add more requested skills
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Skills Offered</h3>
          <Button variant="outline" asChild>
            <Link href="/skills/add">Add Skill</Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {skills.offered.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge>{skill.category}</Badge>
                  <Badge variant="outline">{skill.level}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Skills Requested</h3>
          <Button variant="outline" asChild>
            <Link href="/skills/add">Request Skill</Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {skills.requested.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge>{skill.category}</Badge>
                  <Badge variant="outline">{skill.level}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
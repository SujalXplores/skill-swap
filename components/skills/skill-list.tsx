"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";

interface Skill {
  _id: string;
  title: string;
  category: string;
  level: string;
  type: string;
  userId: {
    name: string;
    image: string;
  };
}

interface SkillListProps {
  searchQuery: string;
  filters: {
    type: string;
    level: string[];
    categories: string[];
  };
}

export function SkillList({ searchQuery, filters }: SkillListProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Construct query parameters
        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);
        if (filters.type !== "all") params.set("type", filters.type);
        if (filters.level.length > 0)
          params.set("level", filters.level.join(","));
        if (filters.categories.length > 0)
          params.set("category", filters.categories.join(","));

        const response = await fetch(`/api/skills?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch skills");

        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load skills");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, [searchQuery, filters]);

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No skills found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {skills.map((skill) => (
        <Link href={`/skills/${skill._id}`} key={skill._id}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={skill.userId.image} alt={skill.userId.name} />
                <AvatarFallback>{skill.userId.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {skill.userId.name}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge>{skill.category}</Badge>
                  <Badge variant="outline">{skill.level}</Badge>
                  <Badge variant="secondary" className="capitalize">
                    {skill.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

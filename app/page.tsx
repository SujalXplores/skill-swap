import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Users, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Share Skills, Build Community
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect with people in your community to exchange skills and knowledge. Learn something new while teaching others what you know.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/skills">
              Browse Skills
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6">
          <Users className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Connect Locally</h3>
          <p className="text-muted-foreground">
            Find skilled people in your community and build meaningful connections through skill sharing.
          </p>
        </Card>
        <Card className="p-6">
          <BookOpen className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Learn & Teach</h3>
          <p className="text-muted-foreground">
            Share your expertise and learn new skills from others in a collaborative environment.
          </p>
        </Card>
        <Card className="p-6">
          <Calendar className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
          <p className="text-muted-foreground">
            Arrange skill swaps at times that work for you with our easy scheduling system.
          </p>
        </Card>
      </section>
    </div>
  );
}
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, ChevronRight, BookOpen } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export const revalidate = 30; // Revalidate every 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className=" min-h-screen">
      {/* Blog Landing Page */}
      <main className="container max-w-[1400px] mx-auto px-4 py-4">
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text bg-gradient-to-r from-primary to-teal-600">
          Biblical Insights and Perspectives
        </h2>
        <p className="text-center text-muted-foreground mb-8">Explore our collection of articles and blog posts.</p>
        <div className="flex justify-center items-center mb-12">
          <BookOpen className="w-12 h-12 text-gray-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.map((post, index) => (
            <Link href={`/article/${post.currentSlug}`} key={index}>
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full max-h-[450px]">
                <CardHeader className="p-0 relative overflow-hidden h-[200px]">
                  <Image 
                  src={post.titleImage ? urlFor(post.titleImage).url() : '/fallback.jpg'}
                  alt={post.title} 
                    width={600} 
                    height={400} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read More <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex flex-col flex-grow">
                  {index === 0 && (
                    <Badge className="mb-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white">LATEST</Badge>
                  )}
                  <CardTitle className="text-xl mb-2 group-hover:text-teal-600 transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {post.smallDescription}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Blog Landing Page */}
      <main className="container max-w-[1400px] mx-auto px-4 py-8">
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text bg-gradient-to-r from-primary to-teal-600 flex justify-center items-center">
          <BookOpen className="w-12 h-12 text-gray-500" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.map((post, index) => (
            <Link href={`/article/${post.currentSlug}`} key={index}>
              <Card className={`${index === 0 ? 'md:col-span-2' : ''} group hover:shadow-lg transition-all duration-300 overflow-hidden`}>
                <CardHeader className="p-0 relative overflow-hidden">
                  <Image 
                    src={urlFor(post.titleImage).url()} 
                    alt={post.title} 
                    width={600} 
                    height={400} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read More <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {index === 0 && (
                    <Badge className="mb-2 bg-gradient-to-r from-gray-300 to-teal-600 text-white">LATEST</Badge>
                  )}
                  <CardTitle className="text-xl mb-2 group-hover:text-teal-600 transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.smallDescription}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    {/* <span>Published on {post.date || 'Unknown date'} • 5 min read</span> */}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

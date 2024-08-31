import { fullArticle } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { Suspense } from "react";
import SkeletonArticle from "@/components/SkeletonArticle";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ShareButtons from "@/components/ShareButton";
import ReadingTime from "@/components/ReadingTime";
import { BookOpen } from "lucide-react";

const components: PortableTextComponents = {
    block: {
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700">
                {children}
            </blockquote>
        ),
    },
};

export const revalidate = 30;

async function getData(slug: string) {
    const query = `
    *[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
        title,
        content,
        titleImage,
        "tableOfContents": content[]{
            _key,
            children[0]->{
                _type == "span" => {
                    text
                }
            }
        }
    }[0]`;

    try {
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
    const data: fullArticle | null = await getData(params.slug);

    if (!data) {
        return <p>Failed to load article. Please try again later.</p>;
    }

    // Log the data to inspect the content and tableOfContents structure
    console.log('Fetched Data:', data);

    return (
        <Suspense fallback={<SkeletonArticle />}>
            <div className="min-h-screen">
                <ScrollProgress />
                <div className="mt-7 max-w-6xl mx-auto px-4 py-8 bg-white transition-colors duration-300 relative">
                    <h1 className="text-center">
                        <BookOpen className="w-12 h-12 text-gray-500 mx-auto" />
                        <span className="mt-2 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
                            {data.title}
                        </span>
                    </h1>
                    <Image
                        src={urlFor(data.titleImage).url()}
                        width={300}
                        height={200}
                        alt="titleImage"
                        className="rounded-lg mt-8 mx-auto"
                    />
                    <div className="flex items-center space-x-4 mb-4">
                        <ReadingTime content={data.content} />
                        <ShareButtons title={data.title}/>
                    </div>
                    <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                        <PortableText value={data.content} components={components} />
                    </div>
                </div>
                <ScrollToTopButton />
            </div>
        </Suspense>
    );
}

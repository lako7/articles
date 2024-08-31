import { PortableTextBlock } from '@portabletext/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
    

export interface simpleBlogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: SanityImageSource; // More specific type
}

export interface Child {
    _type: string;
    text: string;
}

export interface Block {
    _type: string;
    style?: string;
    children?: Child[];
}

export interface Section {
    id: string;
    title: string;
}

export interface fullArticle {
    currentSlug: string;
    title: string;
    content: PortableTextBlock[]; // Use a specific type like PortableTextBlock[]
    titleImage: SanityImageSource;
    tableOfContents?: Section[]; 
}

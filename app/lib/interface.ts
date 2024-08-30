export interface simpleBlogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: any; // If possible, replace 'any' with a more specific type like 'SanityImageSource'
}

export interface Section {
    id: string; // This should correspond to the `_key` or any unique identifier used in PortableText blocks
    title: string; // The title extracted from the first child (usually text)
}

export interface fullArticle {
    currentSlug: string;
    title: string;
    content: any[]; // Assuming 'content' is an array of PortableText blocks, you could use a type like PortableTextBlock[]
    titleImage: any; // Similar to titleImage above, if you know the structure, replace 'any'
    tableOfContents?: Section[]; // This is fine as is, it represents the TOC structure
}

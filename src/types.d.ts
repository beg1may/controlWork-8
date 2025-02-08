export interface Quote {
    id: string;
    author: string;
    category: string;
    text: string;
}

export interface ApiQuote {
    author: string;
    category: string;
    text: string;
}

export interface ApiQuotes {
    [id: string] : ApiQuote;
}
export interface Message {
    id: string;
    author: string;
    message: string;
    date: string;
}

export interface MessageShort {
    author: string;
    message: string;
}
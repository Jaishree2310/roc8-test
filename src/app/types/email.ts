export interface EmailSender {
    email: string;
    name: string;
}

export interface EmailResponse {
    id: string;
    from: EmailSender;
    date: number;
    subject: string;
    short_description: string;
}

export interface EmailListResponse {
    list: EmailResponse[];
    total: number;
}

export interface Email extends EmailResponse {
    isRead: boolean;
    isFavorite: boolean;
    body?: string;
}

export type FilterType = 'all' | 'unread' | 'read' | 'favorites';

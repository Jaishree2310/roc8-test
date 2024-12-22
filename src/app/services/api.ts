import { EmailListResponse } from "../types/email";

const BASE_URL = 'https://flipkart-email-mock.now.sh';

export const emailsApi = {
  getEmails: async (page: number): Promise<EmailListResponse> => {
    const response = await fetch(`${BASE_URL}/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch emails');
    }
    return response.json();
  },

  getEmailBody: async (id: string): Promise<string> => {
    const response = await fetch(`${BASE_URL}/?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch email body');
    }
    const data = await response.json();
    return data.body;
  },
};
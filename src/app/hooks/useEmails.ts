import { useState, useEffect } from 'react';
import { Email, EmailResponse } from '../types/email';
import { emailsApi } from '../services/api';

const FAVORITES_KEY = 'email_favorites';

export const useEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  // Load favorites from localStorage
  const getFavorites = (): string[] => {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  };

  // Save favorites to localStorage
  const saveFavorites = (favoriteIds: string[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  };

  const transformEmailResponse = (email: EmailResponse): Email => ({
    ...email,
    isRead: false,
    isFavorite: getFavorites().includes(email.id),
  });

  const fetchEmails = async (page: number) => {
    try {
      setLoading(true);
      const response = await emailsApi.getEmails(page);
      const transformedEmails = response.list.map(transformEmailResponse);
      
      setEmails(prev => {
        const newEmails = page === 1 ? transformedEmails : [...prev, ...transformedEmails];
        // Ensure favorite state is preserved when loading more emails
        const favorites = getFavorites();
        return newEmails.map(email => ({
          ...email,
          isFavorite: favorites.includes(email.id)
        }));
      });
      setTotal(response.total);
      setHasMore(emails.length < response.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (emailId: string) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  const toggleFavorite = (emailId: string) => {
    setEmails(prevEmails => {
      const updatedEmails = prevEmails.map(email =>
        email.id === emailId ? { ...email, isFavorite: !email.isFavorite } : email
      );
      
      // Update localStorage
      const newFavorites = updatedEmails
        .filter(email => email.isFavorite)
        .map(email => email.id);
      saveFavorites(newFavorites);
      
      return updatedEmails;
    });
  };

  useEffect(() => {
    fetchEmails(1);
  }, []);

  return {
    emails,
    loading,
    currentPage,
    hasMore,
    total,
    fetchNextPage: () => fetchEmails(currentPage + 1),
    markAsRead,
    toggleFavorite,
  };
};
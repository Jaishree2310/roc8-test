"use client";

import React, { useState } from 'react';
import { FilterButton } from '@/components/q1/FilterButton';
import { useEmails } from '../hooks/useEmails';
import { Email, FilterType } from '../types/email';
import { EmailItem } from '@/components/q1/EmailItem';
import { EmailBody } from '@/components/q1/EmailBody';

export default function EmailApp() {
  const { 
    emails, 
    loading, 
    hasMore, 
    fetchNextPage, 
    markAsRead, 
    toggleFavorite 
  } = useEmails();
  
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      markAsRead(email.id);
    }
  };

  const filteredEmails = React.useMemo(() => {
    return emails.filter(email => {
      switch (filterType) {
        case 'unread':
          return !email.isRead;
        case 'read':
          return email.isRead;
        case 'favorites':
          return email.isFavorite;
        default:
          return true;
      }
    });
  }, [emails, filterType]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="p-8">
        <div className="flex gap-2 items-center">
          <div className="text-text text-center">Filter By:</div>
          <FilterButton
            label="Unread"
            filterType="unread"
            currentFilter={filterType}
            onClick={setFilterType}
          />
          <FilterButton
            label="Read"
            filterType="read"
            currentFilter={filterType}
            onClick={setFilterType}
          />
          <FilterButton
            label="Favorites"
            filterType="favorites"
            currentFilter={filterType}
            onClick={setFilterType}
          />
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-y-auto px-4">
          {loading && <div className="text-text">Loading...</div>}
          {filteredEmails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              isSelected={selectedEmail?.id === email.id}
              onClick={handleEmailClick}
            />
          ))}
          {hasMore && (
            <button
              onClick={fetchNextPage}
              className="w-full py-2 text-center text-accent hover:text-accent/80 transition-colors"
            >
              Load More
            </button>
          )}
        </div>
        <div className="w-1/2 h-full pb-6">
          {selectedEmail ? (
            <EmailBody
              email={selectedEmail}
              onFavoriteToggle={toggleFavorite}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-text">
              Select an email to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
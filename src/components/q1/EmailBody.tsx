import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { emailsApi } from '@/app/services/api';
import { Email } from '@/app/types/email';

interface EmailBodyProps {
  email: Email;
  onFavoriteToggle: (emailId: string) => void;
}

export const EmailBody: React.FC<EmailBodyProps> = ({ email, onFavoriteToggle }) => {
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBody = async () => {
        try {
          setLoading(true);
          const bodyContent = await emailsApi.getEmailBody(email.id);
          setBody(bodyContent);
        } catch (error) {
          console.error('Error fetching email body:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBody();
    }, [email.id]);
  
    if (loading) {
      return (
        <div className="h-full flex items-center justify-center text-text">
          Loading...
        </div>
      );
    }
  
    return (
      <div className="h-full p-6 rounded-xl border border-border bg-white flex flex-row">
        <div className="pr-4">
          <div className="w-14 h-14 text-xl rounded-full bg-accent flex items-center justify-center text-white">
            {email.from.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl text-text">{email.subject}</h1>
            <button
              onClick={() => onFavoriteToggle(email.id)}
              className="px-4 py-2 bg-accent hover:bg-accent/90 text-sm text-white rounded-full flex items-center gap-2 transition-colors"
            >
              Mark as {email.isFavorite ? 'unfavorite' : 'favorite'}
            </button>
          </div>
          <div className="text-sm text-text mb-4">
            {format(email.date, 'dd/MM/yyyy hh:mm a')}
          </div>
          <div className="text-text mb-4 flex-1 overflow-y-auto" 
            dangerouslySetInnerHTML={{ __html: body }} 
          />
        </div>
      </div>
    );
  };
  

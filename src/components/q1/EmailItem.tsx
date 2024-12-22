import React from 'react';
import { format } from 'date-fns';
import { Email } from '@/app/types/email';

interface EmailItemProps {
  email: Email;
  isSelected: boolean;
  onClick: (email: Email) => void;
}

export const EmailItem: React.FC<EmailItemProps> = ({ email, isSelected, onClick }) => (
    <div
      onClick={() => onClick(email)}
      className={`
        p-4 cursor-pointer rounded-xl border border-border mb-2
        hover:border-accent transition-colors
        ${isSelected ? 'bg-read' : 'bg-white'}
        ${!email.isRead ? 'font-semibold' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white shrink-0">
          {email.from.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-text font-medium">
            From: {email.from.name} ({email.from.email})
          </div>
          <div className="text-text">{email.subject}</div>
          <div className="text-sm text-text line-clamp-1">
            {email.short_description}
          </div>
          <div className="flex flex-row justify-between mt-2">
            <div className="text-text">
              {format(email.date, 'dd/MM/yyyy hh:mm a')}
            </div>
            {email.isFavorite && (
              <div className="text-accent">
                Favorite
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
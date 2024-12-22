# Roc8 Take Home Assignment

This repository contains two React applications built as part of the Roc8 take-home assignment.

🚀 **[Live Demo](https://roc8-test-kappa.vercel.app/)**

## Applications

### 1. Email Client (/q1)
A responsive email client application built with React, featuring master-detail view, real-time filtering, and email management.

![image](https://github.com/user-attachments/assets/bc525eab-d96b-472b-9645-908b699aba9c)


**Key Features:**
- Split-screen master-detail view
- Real-time filtering (unread/read/favorites)
- Lazy loading of email content
- Pagination support
- Responsive design


### 2. Data Visualization Dashboard (/q2)
An interactive dashboard with multiple chart visualizations and filtering capabilities.

![image](https://github.com/user-attachments/assets/066ff77b-686d-44f0-bb50-9fbbc2906c4e)


**Key Features:**
- Interactive bar and line charts
- Age and gender filtering
- Date range selection
- Real-time chart updates

## Tech Stack
- React
- TypeScript
- Next.js 13
- Tailwind CSS
- Recharts

## Local Development

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```
## Project Structure
```shell
.
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   ├── next.svg
│   └── vercel.svg
├── README.md
├── src
│   ├── app
│   │   ├── api
│   │   │   └── data
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── hooks
│   │   │   └── useEmails.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── q1
│   │   │   └── page.tsx
│   │   ├── q2
│   │   │   └── page.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   └── types
│   │       ├── chart.ts
│   │       └── email.ts
│   ├── components
│   │   ├── q1
│   │   │   ├── EmailBody.tsx
│   │   │   ├── EmailItem.tsx
│   │   │   └── FilterButton.tsx
│   │   └── q2
│   │       ├── BarChartComponent.tsx
│   │       ├── Filters.tsx
│   │       └── LineChartComponent.tsx
│   └── public
│       └── data.csv
├── tailwind.config.ts
└── tsconfig.json
```

## Performance Considerations

1. Lazy loading of email content
2. Client-side filtering
3. Optimized chart re-renders
4. Responsive design for all screen sizes

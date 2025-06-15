# Frontend Contribution Guide

## Structure Overview
```
app/               # Next.js App Router
├── analyze/       # User analysis pages
├── results/       # Compatibility results UI
├── contribute/    # Contribution pages
├── layout.tsx     # Root layout & metadata
├── page.tsx       # Homepage
└── globals.css    # Global styles

components/        # Reusable UI components
├── ui/            # Shadcn/ui components
├── home/          # Homepage components
├── analyze/       # Analysis form components
├── results/       # Results display components
├── Navbar.tsx     # Navigation component
└── Footer.tsx     # Footer component

lib/components/    # Component utilities
└── ...            # Helper functions for components

public/            # Static assets
├── favicon.ico    # App icon
└── ...           # Images, logos, etc.
```

## Key Functionality

### Analysis Flow
- **Input**: GitHub username collection
- **Processing**: Real-time analysis progress
- **Results**: Compatibility scores & insights
- **Visualization**: Charts & metrics display

### UI Components
- **Form Handling**: User input validation
- **Data Visualization**: Recharts integration
- **Responsive Design**: Mobile-first approach
- **Loading States**: Framer Motion animations

### Styling System
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Pre-built component library
- **CSS Variables**: Theme customization
- **Dark Mode**: System preference support

## Contributing

1. **New Pages**: Add routes in `app/` directory
2. **Components**: Create reusable components in `components/`
3. **Styling**: Use Tailwind utilities & CSS variables
4. **Icons**: Use Lucide React icon library
5. **Animations**: Implement with Framer Motion

## Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Component Guidelines
- Use TypeScript for all components
- Follow Shadcn/ui patterns for consistency
- Implement proper loading & error states
- Ensure accessibility (ARIA labels, keyboard navigation) 
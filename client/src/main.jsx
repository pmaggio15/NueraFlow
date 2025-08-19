import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const clerkAppearance = {
  elements: {
    // Sign-in/Sign-up forms
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '40px',
    },
    headerTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px',
    },
    headerSubtitle: {
      fontSize: '16px',
      color: '#6b7280',
      marginBottom: '32px',
    },
    // Social buttons (Google, GitHub)
    socialButtonsBlockButton: {
      background: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '16px',
      padding: '16px 24px',
      fontSize: '15px',
      fontWeight: '600',
      color: '#374151',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: '#3b82f6',
        background: '#f8fafc',
        transform: 'translateY(-1px)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
    socialButtonsBlockButtonIcon: {
      width: '20px',
      height: '20px',
    },
    dividerLine: {
      background: '#e5e7eb',
      height: '1px',
      margin: '24px 0',
    },
    dividerText: {
      color: '#9ca3af',
      fontSize: '14px',
      fontWeight: '500',
    },
    // Form inputs
    formFieldInput: {
      background: 'rgba(249, 250, 251, 0.8)',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      '&:focus': {
        borderColor: '#3b82f6',
        background: 'white',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      }
    },
    formFieldLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
    },
    // Primary button (Continue/Sign in)
    formButtonPrimary: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
        transform: 'translateY(-1px)',
        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
      }
    },
    // Footer links
    footerActionLink: {
      color: '#3b82f6',
      fontWeight: '600',
      textDecoration: 'none',
      '&:hover': {
        color: '#1d4ed8',
        textDecoration: 'underline',
      }
    },
    // Hide Clerk branding
    footer: {
      display: 'none',
    },
    footerPages: {
      display: 'none',
    },
    formFooter: {
      display: 'none',
    },
    // User button dropdown
    userButtonPopoverCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    userButtonPopoverActionButton: {
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#f3f4f6',
        transform: 'translateY(-1px)',
      }
    },
    userButtonPopoverActionButtonIcon: {
      width: '18px',
      height: '18px',
    },
    userButtonPopoverFooter: {
      display: 'none',
    }
  },
  variables: {
    colorPrimary: '#3b82f6',
    colorText: '#1f2937',
    colorTextSecondary: '#6b7280',
    borderRadius: '12px',
    fontFamily: '"Inter", system-ui, sans-serif',
    spacingUnit: '1rem',
  },
  layout: {
    logoImageUrl: '',
    showOptionalFields: true,
    privacyPageUrl: undefined,
    termsPageUrl: undefined,
  }
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl={'/'}
    appearance={clerkAppearance}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
)
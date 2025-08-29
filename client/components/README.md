# Components Directory Structure

This directory contains all React components organized by functionality and purpose.

## 📁 Folder Organization

### 🏗️ **Layout Components** (`/layout`)
Core layout and structural components used across the application.
- `Navigation.tsx` - Main navigation bar
- `Footer.tsx` - Application footer
- `SEO.tsx` - SEO optimization component
- `ErrorBoundary.tsx` - Error boundary wrapper
- `AppProviders.tsx` - Context providers wrapper
- `DashboardRouter.tsx` - Dashboard routing logic

### 👤 **Profile Components** (`/profile`)
User profile management and editing components.
- `BasicInformationSection.tsx` - Basic user info form
- `ContactInformationSection.tsx` - Contact details form
- `PrivacySettings.tsx` - Privacy preferences
- `DangerZone.tsx` - Account deletion section
- `PasswordChangeForm.tsx` - Password change form
- `PhotoUpload.tsx` - Profile photo upload
- `EditProfileModal.tsx` - Profile editing modal

### 📝 **Form Components** (`/forms`)
Reusable form elements and input components.
- `FormField.tsx` - Generic form field wrapper
- `Button.tsx` - Button component
- `Card.tsx` - Card container component
- `StandardTagInput.tsx` - Tag input component
- `SkillsTagInput.tsx` - Skills-specific tag input
- `LanguageAutocomplete.tsx` - Language selection
- `SkillsAutocomplete.tsx` - Skills selection
- `CategorySelector.tsx` - Category selection

### 🪟 **Modal Components** (`/modals`)
Modal dialogs and overlay components.
- `Modal.tsx` - Base modal component
- `DeleteAccountModal.tsx` - Account deletion modal
- `DeleteConfirmationModal.tsx` - Delete confirmation
- `ConfirmationModal.tsx` - Generic confirmation
- `GateModal.tsx` - Subscription gate modal
- `PlaceholderPage.tsx` - Placeholder content

### 🔧 **Service Components** (`/services`)
Service and consultation management components.
- `ServiceConsultationCard.tsx` - Service/consultation display
- `ServiceEditModal.tsx` - Service editing modal
- `ConsultationEditModal.tsx` - Consultation editing
- `BookSessionModal.tsx` - Session booking modal
- `CancelBookingModal.tsx` - Booking cancellation
- `RescheduleModal.tsx` - Appointment rescheduling

### 🔐 **Authentication Components** (`/authentication`)
User authentication and authorization components.
- `AuthWidget.tsx` - Authentication widget
- `GoogleSingIn.tsx` - Google sign-in button
- `GoogleRoleSelectionModal.tsx` - Role selection after Google auth
- `EmailVerificationAlert.tsx` - Email verification alert
- `EmailVerificationBanner.tsx` - Email verification banner

### 📊 **Dashboard Components** (`/dashboard`)
Dashboard-specific components and widgets.
- `RoleToggle.tsx` - Role switching toggle
- `RoleSwitchModal.tsx` - Role switching modal
- `SimpleAvailabilityToggle.tsx` - Availability toggle
- `StatusBadge.tsx` - Status indicator badges
- `NotificationBell.tsx` - Notification bell

### 🌐 **Common Components** (`/common`)
Shared utility components used throughout the app.
- `LanguageText.tsx` - Language-aware text
- `LanguageSelector.tsx` - Language selection
- `GuardedAction.tsx` - Protected action wrapper
- `GatedPage.tsx` - Subscription-gated page
- `ChatWidget.tsx` - Chat functionality

### 🎨 **Portfolio Components** (`/portfolio`)
Portfolio and project display components.
- `PortfolioCard.tsx` - Portfolio item card
- `ProposalModal.tsx` - Proposal submission modal

### 💳 **Subscription Components** (`/subscription`)
Subscription and payment-related components.
- `SubscriptionModal.tsx` - Subscription management
- `SubscriptionModalWrapper.tsx` - Subscription modal wrapper
- `SubscriptionGate.tsx` - Subscription access control

### 🎨 **UI Components** (`/ui`)
Shadcn/ui components and design system.
- All shadcn/ui components (button, input, etc.)

## 📖 **Usage Examples**

### Importing from specific folders:
```tsx
import { Navigation, Footer, SEO } from '../components/layout';
import { BasicInformationSection, PasswordChangeForm } from '../components/profile';
import { Card, Button, FormField } from '../components/forms';
```

### Importing from main index:
```tsx
import { 
  Navigation, 
  BasicInformationSection, 
  Card 
} from '../components';
```

## 🚀 **Benefits of This Structure**

1. **Clear Organization** - Easy to find components by functionality
2. **Better Maintainability** - Related components are grouped together
3. **Improved Developer Experience** - Faster navigation and understanding
4. **Scalability** - Easy to add new components to appropriate folders
5. **Import Clarity** - Clear import paths indicate component purpose
6. **Team Collaboration** - Multiple developers can work on different areas

## 🔄 **Migration Notes**

- All existing imports have been updated to use the new folder structure
- Index files provide backward compatibility
- Components maintain their original functionality
- No breaking changes to component APIs

## 📝 **Adding New Components**

When adding new components:
1. **Identify the category** - Which folder does it belong to?
2. **Create the component** - In the appropriate folder
3. **Update the index** - Add export to the folder's index.ts
4. **Update imports** - Use the new folder structure in consuming files

## 🎯 **Best Practices**

- Keep components focused on a single responsibility
- Use descriptive names that indicate purpose
- Group related functionality together
- Maintain consistent import patterns
- Update documentation when adding new components

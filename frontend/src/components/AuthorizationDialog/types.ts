import { UserSession } from '../../api';

/**
 * AuthorizationDialog component prop types
 */
export interface AuthorizationDialogProps {
  // Current User session
  user: UserSession;

  // Open/closed status
  open: boolean;

  // Open/close toggler inherited from grandparent component
  toggleGrandparentOpen: VoidFunction | null;

  // Open/close toggler inherited from parent component
  toggleParentOpen: VoidFunction;
}

/**
 * Email state type
 */
export interface EmailState {
  // Email address
  address: string;

  // Invalid email true/false
  error: boolean;
}

/**
 * Username state type
 */
export interface UsernameState {
  // Username
  name: string;

  // Invalid username true/false
  error: boolean;
}

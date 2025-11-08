import React from 'react';
import { Layout, AppActionConfig } from './';

/**
 * @deprecated Use Layout with formMode={true} instead
 *
 * Legacy wrapper around Layout component for form pages.
 * This component is maintained for backward compatibility but new code should use:
 * `<Layout formMode={true} formTitle="..." />` directly.
 *
 * @example Migration
 * ```tsx
 * // Old way (still works)
 * <FormLayout formTitle="New Transaction" progress={60} />
 *
 * // New way (preferred)
 * <Layout formMode={true} formTitle="New Transaction" progress={60} />
 * ```
 */
export interface FormLayoutProps {
  children: React.ReactNode;
  formTitle?: string;
  entryType?: string;
  statusText?: string;
  statusVariant?: 'warning' | 'success' | 'error' | 'info' | 'inactive';
  showStatus?: boolean;
  progress?: number; // 0-100
  onBackClick?: () => void;
  onNavigate?: (itemId: string, subitemId?: string) => void;
  onInboxClick?: () => void;
  maxWidth?: string;
  className?: string;
  selectedSidebarItem?: string;
  selectedSidebarSubitem?: string;
  tabs?: React.ReactNode; // Optional tabs component to render between FormTopNav and content
  appAction?: AppActionConfig; // Optional context-aware app action button
}

// FormLayout is now just a wrapper around Layout with formMode=true
export const FormLayout: React.FC<FormLayoutProps> = (props) => {
  return (
    <Layout
      {...props}
      formMode={true}
      formTitle={props.formTitle}
      entryType={props.entryType}
      statusText={props.statusText}
      statusVariant={props.statusVariant}
      showStatus={props.showStatus}
      progress={props.progress}
      onBackClick={props.onBackClick}
      appAction={props.appAction}
      isSubPage={true}
    />
  );
};

export default FormLayout;
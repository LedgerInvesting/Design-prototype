import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { FormTabs, FormTab, Input, Dropdown, DatePicker, Button } from '@design-library/components';
import { colors, typography, spacing, borderRadius } from '@design-library/tokens';

const formTabs: FormTab[] = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'policy-groups', label: 'Policy Groups' },
  { id: 'structure-terms', label: 'Structure and Key Terms' },
  { id: 'reporting-config', label: 'Reporting Parameters & Configuration' },
];

export const NewTransactionForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('basic-info');
  const [formData, setFormData] = useState({
    transactionName: '',
    reinsurerName: '',
    cedingReinsurer: '',
    subjectBusiness: '',
    riskPeriodStart: '',
    riskPeriodEnd: '',
    rampUpPeriodEnd: '',
  });

  const breadcrumbs = [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'My Transactions', href: '/marketplace/transactions' },
    { label: 'New Transaction', href: '/marketplace/transactions/new' },
    { label: 'Enter Terms Manually', href: '' }, // Current page
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderBasicInfoForm = () => {
    const formContainerStyles: React.CSSProperties = {
      backgroundColor: colors.reports.dynamic.blue200,
      borderRadius: borderRadius[8],
      padding: '32px',
      marginTop: '24px',
    };

    const formGridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px',
    };

    const fullWidthRowStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '24px',
      marginBottom: '32px',
    };


    return (
      <div style={formContainerStyles}>
        {/* First Row: Transaction Name & Reinsurer Name */}
        <div style={formGridStyles}>
          <Input
            label="Transaction Name"
            placeholder="e.g., Q1 2024 Commercial Property Treaty"
            value={formData.transactionName}
            onChange={(e) => handleInputChange('transactionName', e.target.value)}
          />
          <Dropdown
            label="Reinsurer Name"
            placeholder="e.g., Q1 2024 Commercial Property Treaty"
            value={formData.reinsurerName}
            options={[
              { value: 'reinsurer1', label: 'Q1 2024 Commercial Property Treaty' },
              { value: 'reinsurer2', label: 'Global Re LLC' },
              { value: 'reinsurer3', label: 'Eagle Re LLC' },
            ]}
            onChange={(value) => handleInputChange('reinsurerName', value)}
          />
        </div>

        {/* Second Row: Ceding (Re) Insurer & Subject Business */}
        <div style={formGridStyles}>
          <Dropdown
            label="Ceding (Re) Insurer"
            placeholder="Select ceding re insurer"
            value={formData.cedingReinsurer}
            options={[
              { value: 'ceding1', label: 'Select ceding re insurer' },
              { value: 'ceding2', label: 'Lime Insurers LLC' },
              { value: 'ceding3', label: 'Pear Insurers LLC' },
            ]}
            onChange={(value) => handleInputChange('cedingReinsurer', value)}
          />
          <Input
            label="Subject Business"
            placeholder="e.g., Q1 2024 Commercial Property Treaty"
            value={formData.subjectBusiness}
            onChange={(e) => handleInputChange('subjectBusiness', e.target.value)}
          />
        </div>

        {/* Third Row: Date Fields */}
        <div style={fullWidthRowStyles}>
          <DatePicker
            label="Risk Period Date"
            placeholder="Select Date"
            value={formData.riskPeriodStart}
            onChange={(value) => handleInputChange('riskPeriodStart', value)}
          />
          <DatePicker
            label="Risk Period End"
            placeholder="Select Date"
            value={formData.riskPeriodEnd}
            onChange={(value) => handleInputChange('riskPeriodEnd', value)}
          />
          <DatePicker
            label="Ramp Up Period End Date"
            placeholder="Select Date"
            value={formData.rampUpPeriodEnd}
            onChange={(value) => handleInputChange('rampUpPeriodEnd', value)}
          />
        </div>

      </div>
    );
  };

  const renderContinueButton = () => {
    const buttonContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '24px',
    };

    return (
      <div style={buttonContainerStyles}>
        <Button
          variant="primary"
          color="black"
          onClick={() => {
            console.log('Continue clicked', formData);
            // Move to next tab
            setActiveTab('policy-groups');
          }}
          showIcon={false}
        >
          Continue
        </Button>
      </div>
    );
  };

  const renderTabContent = () => {
    const titleStyles: React.CSSProperties = {
      ...typography.styles.headlineH2,
      color: colors.blackAndWhite.black900,
      marginTop: '32px',
      marginBottom: '0',
    };

    switch (activeTab) {
      case 'basic-info':
        return (
          <div>
            <h2 style={titleStyles}>Basic Information</h2>
            {renderBasicInfoForm()}
            {renderContinueButton()}
          </div>
        );
      
      case 'policy-groups':
        return (
          <div>
            <h2 style={titleStyles}>Policy Groups</h2>
            <div style={{ 
              backgroundColor: colors.reports.dynamic.blue200,
              borderRadius: borderRadius[8],
              padding: '32px',
              marginTop: '24px',
              textAlign: 'center',
              color: colors.blackAndWhite.black500
            }}>
              Policy Groups form will be implemented here...
            </div>
          </div>
        );
      
      case 'structure-terms':
        return (
          <div>
            <h2 style={titleStyles}>Structure and Key Terms</h2>
            <div style={{ 
              backgroundColor: colors.reports.dynamic.blue200,
              borderRadius: borderRadius[8],
              padding: '32px',
              marginTop: '24px',
              textAlign: 'center',
              color: colors.blackAndWhite.black500
            }}>
              Structure and Key Terms form will be implemented here...
            </div>
          </div>
        );
      
      case 'reporting-config':
        return (
          <div>
            <h2 style={titleStyles}>Reporting Parameters & Configuration</h2>
            <div style={{ 
              backgroundColor: colors.reports.dynamic.blue200,
              borderRadius: borderRadius[8],
              padding: '32px',
              marginTop: '24px',
              textAlign: 'center',
              color: colors.blackAndWhite.black500
            }}>
              Reporting Parameters & Configuration form will be implemented here...
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      selectedSidebarItem="marketplace"
      selectedSidebarSubitem="my-transactions"
      onNavigate={(itemId, subitemId) => {
        console.log('Navigate to:', itemId, subitemId);
      }}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
      onShareClick={() => {
        console.log('Share clicked');
      }}
      onUserMenuClick={() => {
        console.log('User menu clicked');
      }}
      tabs={
        <FormTabs
          tabs={formTabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      }
    >
      {renderTabContent()}
    </Layout>
  );
};

export default NewTransactionForm;
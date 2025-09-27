import React, { useState, useEffect } from 'react';
import { FormLayout } from '@design-library/pages';
import { FormTabs, FormTab, Input, Dropdown, DatePicker, Button, ButtonSelector, Selector } from '@design-library/components';
import { typography, spacing, borderRadius, useSemanticColors } from '@design-library/tokens';
import { PlusExtraSmall, icons } from '@design-library/icons';
import { ConnectBankAPIModal } from './ConnectBankAPIModal';
import { createPageNavigationHandler } from '@design-library/utils/navigation';

const formTabs: FormTab[] = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'policy-groups', label: 'Policy Groups' },
  { id: 'structure-terms', label: 'Structure and Key Terms' },
  { id: 'reporting-config', label: 'Reporting Parameters & Configuration' },
];

type PageType = 'cash-settlement' | 'report-navigation' | 'transaction-management' | 'new-transaction-form' | 'analytics-valuation' | 'contracts-explorer';

export interface NewTransactionFormProps {
  onNavigateToPage?: (page: string, data?: any) => void;
  renewalData?: any;
}

export const ReportsNewTransactionForm: React.FC<NewTransactionFormProps> = ({
  onNavigateToPage,
  renewalData
}) => {
  const colors = useSemanticColors();
  const [activeTab, setActiveTab] = useState<string>('basic-info');
  const [formData, setFormData] = useState({
    transactionName: renewalData?.transactionName || '',
    reinsurerName: renewalData?.reinsurerName || '',
    cedingReinsurer: renewalData?.cedingReinsurer || '',
    subjectBusiness: renewalData?.subjectBusiness || '',
    riskPeriodStart: renewalData?.riskPeriodStart || '',
    riskPeriodEnd: renewalData?.riskPeriodEnd || '',
    rampUpPeriodEnd: renewalData?.rampUpPeriodEnd || '',
  });

  const [requirements, setRequirements] = useState([{ id: 1 }]);
  const [frequencyValue, setFrequencyValue] = useState<string>('');
  const [additionalFieldSets, setAdditionalFieldSets] = useState<Array<{ id: number }>>([]);
  const [profitCommissionTiers, setProfitCommissionTiers] = useState<Array<{ id: number }>>([]);
  const [policyLimitsTerms, setPolicyLimitsTerms] = useState<Array<{ id: number }>>([]);
  const [brokerInfo, setBrokerInfo] = useState<Array<{ id: number }>>([]);

  // Bank API Modal state
  const [isBankAPIModalOpen, setIsBankAPIModalOpen] = useState(false);
  const [isBankAPIConnected, setIsBankAPIConnected] = useState(false);

  // Accordion state for Structure & Key Terms sections
  const [sectionExpanded, setSectionExpanded] = useState({
    reinsuranceStructure: true,
    premiumCommission: true,
    policyLimitsClaims: true,
    operationalBrokerage: true,
    trustAccount: true,
  });

  const toggleSection = (sectionKey: keyof typeof sectionExpanded) => {
    setSectionExpanded(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const addRequirement = () => {
    const newId = requirements.length + 1;
    setRequirements([...requirements, { id: newId }]);
  };

  const addAdditionalFieldSet = () => {
    const newId = additionalFieldSets.length + 1;
    setAdditionalFieldSets([...additionalFieldSets, { id: newId }]);
  };

  const removeAdditionalFieldSet = (id: number) => {
    setAdditionalFieldSets(additionalFieldSets.filter(fieldSet => fieldSet.id !== id));
  };

  const addProfitCommissionTier = () => {
    const newId = profitCommissionTiers.length + 1;
    setProfitCommissionTiers([...profitCommissionTiers, { id: newId }]);
  };

  const addPolicyLimitsTerm = () => {
    const newId = policyLimitsTerms.length + 1;
    setPolicyLimitsTerms([...policyLimitsTerms, { id: newId }]);
  };


  const addBrokerInfo = () => {
    const newId = brokerInfo.length + 1;
    setBrokerInfo([...brokerInfo, { id: newId }]);
  };


  // Add CSS for full-width ButtonSelector
  useEffect(() => {
    const styleId = 'full-width-button-selector-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .full-width-button-selector {
          flex: 1 !important;
          width: 100% !important;
        }
        .small-radio-button div {
          width: 12px !important;
          height: 12px !important;
        }
        .small-radio-button label div div {
          width: 12px !important;
          height: 12px !important;
        }
        .frequency-radio-container {
          width: 100% !important;
          justify-content: space-between !important;
          gap: 4px !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Calculate progress based on active tab
  const getProgress = () => {
    const tabIndex = formTabs.findIndex(tab => tab.id === activeTab);
    return tabIndex >= 0 ? Math.round((tabIndex / (formTabs.length - 1)) * 100) : 0;
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderBasicInfoForm = () => {
    const formContainerStyles: React.CSSProperties = {
      backgroundColor: colors.theme.primary200,
      borderRadius: borderRadius[8],
      padding: '32px',
      marginTop: '10px',
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


    const textareaStyles: React.CSSProperties = {
      gridColumn: '1 / -1',
      marginBottom: '0',
    };

    return (
      <div style={formContainerStyles}>
        {/* First Row: Transaction Name & Policy Group ID */}
        <div style={formGridStyles}>
          <Input
            label="Transaction Name"
            placeholder="Enter transaction name"
            value={formData.transactionName}
            onChange={(e) => handleInputChange('transactionName', e.target.value)}
          />
          <Input
            label="Policy Group ID"
            placeholder="Enter policy group ID"
            value={formData.reinsurerName}
            onChange={(e) => handleInputChange('reinsurerName', e.target.value)}
          />
        </div>

        {/* Second Row: Ceding (Re) Insurer & Reinsurer */}
        <div style={formGridStyles}>
          <Dropdown
            label="Ceding (Re) Insurer"
            placeholder="Select ceding (re) insurer"
            value={formData.cedingReinsurer}
            options={[
              { value: 'lloyds', label: "Lloyd's of London" },
              { value: 'swiss-re', label: 'Swiss Re' },
              { value: 'munich-re', label: 'Munich Re' },
              { value: 'hannover-re', label: 'Hannover Re' },
              { value: 'scor-se', label: 'Scor SE' },
              { value: 'berkshire-hathaway', label: 'Berkshire Hathaway Re' },
              { value: 'renaissance-re', label: 'RenaissanceRe' },
              { value: 'partner-re', label: 'PartnerRe' },
              { value: 'everest-re', label: 'Everest Re' },
              { value: 'trans-re', label: 'TransRe' },
              { value: 'arch-capital', label: 'Arch Capital' },
              { value: 'argo-group', label: 'Argo Group' },
              { value: 'aspen-re', label: 'Aspen Re' },
              { value: 'axis-capital', label: 'Axis Capital' },
              { value: 'beazley', label: 'Beazley' },
              { value: 'canopius', label: 'Canopius' },
              { value: 'catlin', label: 'Catlin' },
              { value: 'cna-hardy', label: 'CNA Hardy' },
              { value: 'endurance', label: 'Endurance Specialty' },
              { value: 'hiscox', label: 'Hiscox' },
              { value: 'lancashire', label: 'Lancashire' },
              { value: 'markel', label: 'Markel' },
              { value: 'validus-re', label: 'Validus Re' },
              { value: 'xl-catlin', label: 'XL Catlin' },
              { value: 'zurich-re', label: 'Zurich Re' },
              { value: 'abc-insurance', label: 'ABC Insurance Company' },
              { value: 'xyz-insurance', label: 'XYZ Insurance Corp' },
              { value: 'def-mutual', label: 'DEF Mutual Insurance' },
              { value: 'ghi-insurance', label: 'GHI Insurance Ltd' },
              { value: 'jkl-insurance', label: 'JKL Insurance Group' },
              { value: 'mno-reinsurance', label: 'MNO Reinsurance' },
              { value: 'pqr-global', label: 'PQR Global Re' },
              { value: 'stu-capital', label: 'STU Capital Re' },
            ]}
            onChange={(value) => handleInputChange('cedingReinsurer', value)}
          />
          <Dropdown
            label="Reinsurer"
            placeholder="Select reinsurer"
            value={formData.subjectBusiness}
            options={[
              { value: 'lloyds', label: "Lloyd's of London" },
              { value: 'swiss-re', label: 'Swiss Re' },
              { value: 'munich-re', label: 'Munich Re' },
              { value: 'hannover-re', label: 'Hannover Re' },
              { value: 'scor-se', label: 'Scor SE' },
              { value: 'berkshire-hathaway', label: 'Berkshire Hathaway Re' },
              { value: 'renaissance-re', label: 'RenaissanceRe' },
              { value: 'partner-re', label: 'PartnerRe' },
              { value: 'everest-re', label: 'Everest Re' },
              { value: 'trans-re', label: 'TransRe' },
              { value: 'arch-capital', label: 'Arch Capital' },
              { value: 'argo-group', label: 'Argo Group' },
              { value: 'aspen-re', label: 'Aspen Re' },
              { value: 'axis-capital', label: 'Axis Capital' },
              { value: 'beazley', label: 'Beazley' },
              { value: 'canopius', label: 'Canopius' },
              { value: 'catlin', label: 'Catlin' },
              { value: 'cna-hardy', label: 'CNA Hardy' },
              { value: 'endurance', label: 'Endurance Specialty' },
              { value: 'hiscox', label: 'Hiscox' },
              { value: 'lancashire', label: 'Lancashire' },
              { value: 'markel', label: 'Markel' },
              { value: 'validus-re', label: 'Validus Re' },
              { value: 'xl-catlin', label: 'XL Catlin' },
              { value: 'zurich-re', label: 'Zurich Re' },
              { value: 'abc-insurance', label: 'ABC Insurance Company' },
              { value: 'xyz-insurance', label: 'XYZ Insurance Corp' },
              { value: 'def-mutual', label: 'DEF Mutual Insurance' },
              { value: 'ghi-insurance', label: 'GHI Insurance Ltd' },
              { value: 'jkl-insurance', label: 'JKL Insurance Group' },
              { value: 'mno-reinsurance', label: 'MNO Reinsurance' },
              { value: 'pqr-global', label: 'PQR Global Re' },
              { value: 'stu-capital', label: 'STU Capital Re' },
            ]}
            onChange={(value) => handleInputChange('subjectBusiness', value)}
          />
        </div>

        {/* Subject Business (full width textarea) */}
        <div style={textareaStyles}>
          <label style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            display: 'block',
            marginBottom: spacing[1],
          }}>
            Subject Business
          </label>
          <textarea
            placeholder="Describe the subject business"
            value=""
            onChange={(e) => console.log('Subject Business:', e.target.value)}
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px 16px',
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[4],
              fontFamily: typography.styles.bodyM.fontFamily.join(', '),
              fontSize: typography.styles.bodyM.fontSize,
              fontWeight: typography.styles.bodyM.fontWeight,
              lineHeight: typography.styles.bodyM.lineHeight,
              color: colors.blackAndWhite.black900,
              backgroundColor: colors.blackAndWhite.white,
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }}
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

  // Policy Groups form renderer
  const renderPolicyGroupsForm = () => {
    const titleStyles: React.CSSProperties = {
      ...typography.styles.headlineH2,
      color: colors.blackAndWhite.black900,
      marginTop: '32px',
      marginBottom: '0',
    };

    const formContainerStyles: React.CSSProperties = {
      backgroundColor: colors.theme.primary200,
      borderRadius: borderRadius[8],
      padding: '32px',
      marginTop: '10px',
    };

    const titleContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    };

    const policyGroupHeaderStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
    };

    const policyGroupLeftSection: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    };

    const policyGroupIconStyles: React.CSSProperties = {
      width: '24px',
      height: '24px',
      backgroundColor: colors.theme.primary700,
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const policyGroupTitleStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black900,
      margin: 0,
    };

    const formGridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px',
    };

    const frequencyContainerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    };

    const frequencySliderStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    };

    const sliderTrackStyles: React.CSSProperties = {
      flex: 1,
      height: '4px',
      backgroundColor: colors.success.fill,
      borderRadius: borderRadius.absolute,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8px',
    };

    const sliderDotStyles: React.CSSProperties = {
      width: '12px',
      height: '12px',
      backgroundColor: colors.success.textAndStrokes,
      borderRadius: borderRadius.absolute,
      border: `2px solid ${colors.blackAndWhite.white}`,
    };

    const geographyRowStyles: React.CSSProperties = {
      gridColumn: '1 / -1',
    };

    return (
      <div style={formContainerStyles}>
        {/* Policy Group Header */}
        <div style={policyGroupHeaderStyles}>
          <div style={policyGroupLeftSection}>
            <div style={policyGroupIconStyles}>
              <span style={{ color: colors.blackAndWhite.white, fontSize: '14px', fontWeight: 'bold' }}>P</span>
            </div>
            <span style={policyGroupTitleStyles}>Policy Group — 178623902183</span>
          </div>
          <Button
            variant="small"
            color="white"
            onClick={() => {
              console.log('Add Sub-Policy Groups clicked');
            }}
            showIcon={true}
            iconPosition="left"
            icon={<PlusExtraSmall />}
          >
            Add Sub-Policy Groups
          </Button>
        </div>

        {/* First Row: Policy Group Name & Description */}
        <div style={formGridStyles}>
          <Input
            label="Policy Group Name"
            placeholder="Enter policy group name"
            value=""
            onChange={(e) => console.log('Policy Group Name:', e.target.value)}
          />
          <Input
            label="Description"
            placeholder="Enter policy group description"
            value=""
            onChange={(e) => console.log('Description:', e.target.value)}
          />
        </div>

        {/* Second Row: Originator Name & Statutory Product Lines */}
        <div style={formGridStyles}>
          <Input
            label="Originator Name"
            placeholder="Enter Originator Name"
            value=""
            onChange={(e) => console.log('Originator Name:', e.target.value)}
          />
          <Dropdown
            label="Statutory Product Lines"
            placeholder="Select statutory product lines"
            value=""
            options={[
              { value: 'aviation', label: 'Aviation' },
              { value: 'commercial-auto', label: 'Commercial Auto' },
              { value: 'workers-compensation', label: 'Workers Compensation' },
              { value: 'general-liability', label: 'General Liability' },
              { value: 'commercial-property', label: 'Commercial Property' },
              { value: 'professional-liability', label: 'Professional Liability' },
              { value: 'directors-officers', label: 'Directors & Officers' },
              { value: 'cyber-liability', label: 'Cyber Liability' },
              { value: 'marine', label: 'Marine' },
              { value: 'energy', label: 'Energy' },
              { value: 'environmental', label: 'Environmental' },
              { value: 'product-liability', label: 'Product Liability' },
              { value: 'employment-practices', label: 'Employment Practices' },
              { value: 'crime-fidelity', label: 'Crime & Fidelity' },
              { value: 'surety', label: 'Surety' },
              { value: 'health-medical', label: 'Health & Medical' },
              { value: 'life-annuities', label: 'Life & Annuities' },
              { value: 'casualty', label: 'Casualty' },
              { value: 'specialty-lines', label: 'Specialty Lines' },
              { value: 'other', label: 'Other' },
            ]}
            onChange={(value) => console.log('Statutory Product Lines:', value)}
          />
        </div>

        {/* Third Row: Frequency & Admitted Status */}
        <div style={formGridStyles}>
          <div style={frequencyContainerStyles}>
            <label style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              marginBottom: '4px',
              display: 'block',
            }}>
              Frequency
            </label>
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[4],
              padding: '12px 16px',
              minHeight: '46px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
              }}>
                <span style={{
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black500,
                  flexShrink: 0,
                }}>
                  Frequency
                </span>
                <div 
                  className="frequency-radio-container"
                  style={{
                    backgroundColor: colors.success.fill,
                    borderRadius: borderRadius.absolute,
                    padding: '4px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <Selector
                    variant="radio"
                    name="frequency-selector"
                    value="1"
                    checked={frequencyValue === '1'}
                    className="small-radio-button"
                    onChange={(checked) => {
                      if (checked) {
                        setFrequencyValue('1');
                        console.log('Frequency selected: 1');
                      }
                    }}
                  />
                  <Selector
                    variant="radio"
                    name="frequency-selector"
                    value="2"
                    checked={frequencyValue === '2'}
                    className="small-radio-button"
                    onChange={(checked) => {
                      if (checked) {
                        setFrequencyValue('2');
                        console.log('Frequency selected: 2');
                      }
                    }}
                  />
                  <Selector
                    variant="radio"
                    name="frequency-selector"
                    value="3"
                    checked={frequencyValue === '3'}
                    className="small-radio-button"
                    onChange={(checked) => {
                      if (checked) {
                        setFrequencyValue('3');
                        console.log('Frequency selected: 3');
                      }
                    }}
                  />
                  <Selector
                    variant="radio"
                    name="frequency-selector"
                    value="4"
                    checked={frequencyValue === '4'}
                    className="small-radio-button"
                    onChange={(checked) => {
                      if (checked) {
                        setFrequencyValue('4');
                        console.log('Frequency selected: 4');
                      }
                    }}
                  />
                  <Selector
                    variant="radio"
                    name="frequency-selector"
                    value="5"
                    checked={frequencyValue === '5'}
                    className="small-radio-button"
                    onChange={(checked) => {
                      if (checked) {
                        setFrequencyValue('5');
                        console.log('Frequency selected: 5');
                      }
                    }}
                  />
                </div>
                <span style={{
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black500,
                  flexShrink: 0,
                }}>
                  Severity
                </span>
              </div>
            </div>
          </div>
          <Dropdown
            label="Admitted Status"
            placeholder="Select admitted status"
            value=""
            options={[
              { value: 'admitted', label: 'Admitted' },
              { value: 'non-admitted', label: 'Non-Admitted' },
            ]}
            onChange={(value) => console.log('Admitted Status:', value)}
          />
        </div>

        {/* Geography Row */}
        <div style={geographyRowStyles}>
          <Dropdown
            label="Geography"
            placeholder="Select Geography"
            value=""
            options={[
              { value: 'us', label: 'United States' },
              { value: 'europe', label: 'Europe' },
              { value: 'global', label: 'Global' },
            ]}
            onChange={(value) => console.log('Geography:', value)}
          />
        </div>
      </div>
    );
  };

  // Policy Groups buttons renderer
  const renderPolicyGroupsButtons = () => {
    const buttonsContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '24px',
    };

    return (
      <div style={buttonsContainerStyles}>
        <Button
          variant="primary"
          color="black"
          onClick={() => {
            console.log('Continue clicked');
            // Move to next tab
            setActiveTab('structure-terms');
          }}
          showIcon={false}
        >
          Continue
        </Button>
      </div>
    );
  };

  // Reporting Parameters form renderer
  const renderReportingParametersForm = () => {
    const formContainerStyles: React.CSSProperties = {
      backgroundColor: colors.theme.primary200,
      borderRadius: borderRadius[8],
      padding: '32px',
      marginTop: '10px',
    };

    const sectionTitleStyles: React.CSSProperties = {
      ...typography.styles.subheadingM,
      color: colors.blackAndWhite.black900,
      marginBottom: '24px',
      marginTop: '0',
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
    };

    const formGridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px',
    };

    const requirementHeaderStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black900,
      marginBottom: '24px',
      marginTop: '32px',
    };

    const checkboxGroupStyles: React.CSSProperties = {
      marginBottom: '24px',
    };

    const checkboxContainerStyles: React.CSSProperties = {
      display: 'flex',
      gap: '12px',
      marginTop: '12px',
    };

    const addButtonContainerStyles: React.CSSProperties = {
      gridColumn: '1 / -1',
      display: 'flex',
      justifyContent: 'flex-start',
    };

    return (
      <div style={formContainerStyles}>
        {/* Reporting Configuration Section */}
        <h3 style={sectionTitleStyles}>Reporting Configuration</h3>
        
        {/* First Row: Reporting Frequency & Business Scope */}
        <div style={formGridStyles}>
          <Dropdown
            label="Reporting Frequency"
            placeholder="Select frequency"
            value=""
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'quarterly', label: 'Quarterly' },
            ]}
            onChange={(value) => console.log('Reporting Frequency:', value)}
          />
          <Dropdown
            label="Business Scope"
            placeholder="Select scope"
            value=""
            options={[
              { value: 'entire-subject-business', label: 'Entire subject business' },
              { value: 'by-policy-groups', label: 'By policy groups (market segments)' },
            ]}
            onChange={(value) => console.log('Business Scope:', value)}
          />
        </div>

        {/* Second Row: Data Format & Data Level */}
        <div style={formGridStyles}>
          <Dropdown
            label="Data Format"
            placeholder="Select format"
            value=""
            options={[
              { value: 'incremental', label: 'Incremental' },
              { value: 'cumulative', label: 'Cumulative' },
              { value: 'transactional', label: 'Transactional' },
            ]}
            onChange={(value) => console.log('Data Format:', value)}
          />
          <Dropdown
            label="Data Level"
            placeholder="Select level"
            value=""
            options={[
              { value: 'aggregated-level', label: 'Aggregated level' },
              { value: 'detailed-level-policies', label: 'Detailed level (by policies)' },
              { value: 'detailed-level-claims', label: 'Detailed level (by claims)' },
            ]}
            onChange={(value) => console.log('Data Level:', value)}
          />
        </div>

        {/* Division Line */}
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: colors.theme.primary400,
          margin: '32px 0',
        }}></div>

        {/* Requirements Section */}
        <h3 style={requirementHeaderStyles}>Requirements</h3>
        
        {/* Dynamic Requirements Boxes */}
        {requirements.map((requirement) => (
          <div key={requirement.id} style={{
            backgroundColor: colors.blackAndWhite.white,
            border: `1px solid ${colors.theme.primary400}`,
            borderRadius: borderRadius[8],
            padding: '24px',
            marginBottom: '24px',
          }}>
            <h4 style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              marginBottom: '24px',
              marginTop: '0',
            }}>Requirement #{requirement.id}</h4>

            {/* Requirement Name & Expected Files Per Period */}
            <div style={formGridStyles}>
              <Input
                label="Requirement Name"
                placeholder="Type your name"
                value=""
                onChange={(e) => console.log(`Requirement ${requirement.id} Name:`, e.target.value)}
              />
              <Dropdown
                label="Expected Files Per Period"
                placeholder="Select Form"
                value=""
                options={[
                  { value: '1', label: '1 File' },
                  { value: '2-5', label: '2-5 Files' },
                  { value: '5+', label: '5+ Files' },
                ]}
                onChange={(value) => console.log(`Requirement ${requirement.id} Expected Files:`, value)}
              />
            </div>

            {/* Content Types Expected */}
            <div style={{
              marginBottom: '24px',
            }}>
              <label style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black900,
                display: 'block',
                marginBottom: '12px',
              }}>
                Content Types Expected
              </label>
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '12px',
                width: '100%',
              }}>
                <ButtonSelector
                  selectorType="checkbox"
                  label="Premium"
                  onChange={(checked) => console.log(`Requirement ${requirement.id} Premium:`, checked)}
                  className="full-width-button-selector"
                />
                <ButtonSelector
                  selectorType="checkbox"
                  label="Claims"
                  onChange={(checked) => console.log(`Requirement ${requirement.id} Claims:`, checked)}
                  className="full-width-button-selector"
                />
                <ButtonSelector
                  selectorType="checkbox"
                  label="Exposure"
                  onChange={(checked) => console.log(`Requirement ${requirement.id} Exposure:`, checked)}
                  className="full-width-button-selector"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Requirement Button */}
        <div style={addButtonContainerStyles}>
          <Button
            variant="small"
            color="main"
            onClick={addRequirement}
            showIcon={true}
            iconPosition="left"
            icon={<PlusExtraSmall />}
          >
            Add Requirement
          </Button>
        </div>
      </div>
    );
  };

  // Reporting Parameters buttons renderer
  const renderReportingParametersButtons = () => {
    const buttonsContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '24px',
    };

    return (
      <div style={buttonsContainerStyles}>
        <Button
          variant="primary"
          color="black"
          onClick={() => {
            console.log('Create Transaction clicked');
            // Navigate back to transaction management page after creation
            onNavigateToPage?.('reports-transaction-management');
          }}
          showIcon={false}
        >
          Create Transaction
        </Button>
      </div>
    );
  };

  // Structure and Key Terms form renderer
  const renderStructureAndKeyTermsForm = () => {
    const formContainerStyles: React.CSSProperties = {
      backgroundColor: colors.theme.primary200,
      borderRadius: borderRadius[8],
      padding: '32px',
      marginTop: '10px',
    };

    const sectionTitleStyles: React.CSSProperties = {
      ...typography.styles.subheadingM,
      color: colors.blackAndWhite.black900,
      marginBottom: '24px',
      marginTop: '0',
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
    };

    const formGridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px',
    };

    const coverageLayerGridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '24px',
      marginBottom: '0',
    };

    const coverageLayerContainerStyles: React.CSSProperties = {
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[8],
      padding: '20px',
      marginBottom: '24px',
      position: 'relative',
    };

    const coverageLayerTitleStyles: React.CSSProperties = {
      ...typography.styles.bodyM,
      color: colors.blackAndWhite.black900,
      marginBottom: '24px',
      marginTop: '0',
    };

    const closeButtonStyles: React.CSSProperties = {
      position: 'absolute',
      top: '10px',
      right: '10px',
    };

    const addButtonStyles: React.CSSProperties = {
      width: '100%',
      marginTop: '16px',
    };

    return (
      <>
        {/* Reinsurance Structure Section */}
        <div style={formContainerStyles}>
          <h3
            style={{
              ...sectionTitleStyles,
              marginBottom: sectionExpanded.reinsuranceStructure ? '24px' : '0',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => toggleSection('reinsuranceStructure')}
          >
            Reinsurance Structure
            <div style={{
              transform: sectionExpanded.reinsuranceStructure ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}>
              <icons.small.chevronBottom color={colors.blackAndWhite.black900} />
            </div>
          </h3>
          {sectionExpanded.reinsuranceStructure && (
            <>
              <div style={formGridStyles}>
                <Dropdown
                  label="Reinsurance Type"
                  placeholder="Select reinsurance type"
                  value=""
                  options={[
                    { value: 'quota-share', label: 'Quota Share' },
                    { value: 'surplus-share', label: 'Surplus Share' },
                    { value: 'excess-of-loss', label: 'Excess of Loss' },
                    { value: 'stop-loss', label: 'Stop Loss' },
                  ]}
                  onChange={(value) => console.log('Reinsurance Type:', value)}
                />
                <Dropdown
                  label="Reinsurance Form"
                  placeholder="Select reinsurance form"
                  value=""
                  options={[
                    { value: 'proportional', label: 'Proportional' },
                    { value: 'non-proportional', label: 'Non-Proportional' },
                    { value: 'hybrid', label: 'Hybrid' },
                  ]}
                  onChange={(value) => console.log('Reinsurance Form:', value)}
                />
                <Dropdown
                  label="Policy Coverage Type"
                  placeholder="Select coverage type"
                  value=""
                  options={[
                    { value: 'occurrence', label: 'Occurrence' },
                    { value: 'claims-made', label: 'Claims Made' },
                    { value: 'aggregate', label: 'Aggregate' },
                  ]}
                  onChange={(value) => console.log('Policy Coverage Type:', value)}
                />
                <Dropdown
                  label="Coverage Layer Basis"
                  placeholder="Select layer basis"
                  value=""
                  options={[
                    { value: 'ground-up', label: 'Ground Up' },
                    { value: 'working', label: 'Working Layer' },
                    { value: 'excess', label: 'Excess Layer' },
                    { value: 'clash', label: 'Clash Cover' },
                  ]}
                  onChange={(value) => console.log('Coverage Layer Basis:', value)}
                />
              </div>

              {/* Separator */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: colors.theme.primary400,
                margin: '32px 0',
              }} />

              {/* Coverage Layers Section Title */}
              <h3 style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.black900,
                marginBottom: spacing[4],
                marginTop: '0',
              }}>Coverage Layers</h3>

              {/* Coverage Layer 1 Title */}
              <h4 style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black900,
                marginBottom: spacing[1],
                marginTop: '0',
              }}>Coverage Layer 1</h4>

              {/* First Coverage Layer */}
              <div style={coverageLayerContainerStyles}>
                <div style={coverageLayerGridStyles}>
                  <Input
                    label="Attachment Point"
                    placeholder="Enter attachment point"
                    value=""
                    onChange={(e) => console.log('Attachment Point 1:', e.target.value)}
                  />
                  <Input
                    label="Exhaustion Point"
                    placeholder="Enter exhaustion point"
                    value=""
                    onChange={(e) => console.log('Exhaustion Point 1:', e.target.value)}
                  />
                  <Input
                    label="Placement %"
                    placeholder="Enter placement percentage"
                    value=""
                    onChange={(e) => console.log('Placement % 1:', e.target.value)}
                  />
                </div>
              </div>

              {/* Additional Coverage Layers */}
              {additionalFieldSets.map((fieldSet) => (
                <div key={fieldSet.id}>
                  <h4 style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    marginBottom: spacing[1],
                    marginTop: '0',
                  }}>Coverage Layer {fieldSet.id + 1}</h4>
                  <div style={coverageLayerContainerStyles}>
                    <Button
                      variant="icon"
                      color="white"
                      shape="square"
                      style={closeButtonStyles}
                      onClick={() => removeAdditionalFieldSet(fieldSet.id)}
                      icon={<icons.small.close color={colors.theme.primary700} />}
                    />
                    <div style={coverageLayerGridStyles}>
                      <Input
                        label="Attachment Point"
                        placeholder="Enter attachment point"
                        value=""
                        onChange={(e) => console.log(`Attachment Point ${fieldSet.id + 1}:`, e.target.value)}
                      />
                      <Input
                        label="Exhaustion Point"
                        placeholder="Enter exhaustion point"
                        value=""
                        onChange={(e) => console.log(`Exhaustion Point ${fieldSet.id + 1}:`, e.target.value)}
                      />
                      <Input
                        label="Placement %"
                        placeholder="Enter placement percentage"
                        value=""
                        onChange={(e) => console.log(`Placement % ${fieldSet.id + 1}:`, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Coverage Layer Button */}
              <Button
                variant="tertiary"
                style={addButtonStyles}
                onClick={addAdditionalFieldSet}
              >
                Add Coverage Layer
              </Button>
            </>
          )}
        </div>

        {/* Premium & Commission Terms Section */}
        <div style={formContainerStyles}>
          <h3
            style={{
              ...sectionTitleStyles,
              marginBottom: sectionExpanded.premiumCommission ? '24px' : '0',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => toggleSection('premiumCommission')}
          >
            Premium & Commission Terms
            <div style={{
              transform: sectionExpanded.premiumCommission ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}>
              <icons.small.chevronBottom color={colors.blackAndWhite.black900} />
            </div>
          </h3>
          {sectionExpanded.premiumCommission && (
            <>
              <div style={formGridStyles}>
                <Dropdown
                  label="Reinsurance Premium Basis"
                  placeholder="Select Basis"
                  value=""
                  options={[
                    { value: 'written-premium', label: 'Written Premium' },
                    { value: 'earned-premium', label: 'Earned Premium' },
                    { value: 'net-premium', label: 'Net Premium' },
                    { value: 'gross-premium', label: 'Gross Premium' },
                  ]}
                  onChange={(value) => console.log('Reinsurance Premium Basis:', value)}
                />
                <Input
                  label="Reinsurance Premium"
                  placeholder="e.g., $1,00,000"
                  value=""
                  onChange={(e) => console.log('Reinsurance Premium:', e.target.value)}
                />
                <Input
                  label="Expected Premium"
                  placeholder="Enter expected premium"
                  value=""
                  onChange={(e) => console.log('Expected Premium:', e.target.value)}
                />
                <Input
                  label="Maximum Premium"
                  placeholder="Enter maximum premium"
                  value=""
                  onChange={(e) => console.log('Maximum Premium:', e.target.value)}
                />
                <Dropdown
                  label="Premium Commission Basis"
                  placeholder="Select Basis"
                  value=""
                  options={[
                    { value: 'percentage', label: 'Percentage' },
                    { value: 'fixed-amount', label: 'Fixed Amount' },
                    { value: 'sliding-scale', label: 'Sliding Scale' },
                  ]}
                  onChange={(value) => console.log('Premium Commission Basis:', value)}
                />
                <Dropdown
                  label="FET Rate"
                  placeholder="Enter FET rate"
                  value=""
                  options={[
                    { value: '0.25', label: '0.25%' },
                    { value: '0.5', label: '0.5%' },
                    { value: '0.75', label: '0.75%' },
                    { value: '1.0', label: '1.0%' },
                  ]}
                  onChange={(value) => console.log('FET Rate:', value)}
                />
                <Dropdown
                  label="Ceding Commission Basis"
                  placeholder="Select Basis"
                  value=""
                  options={[
                    { value: 'percentage', label: 'Percentage' },
                    { value: 'fixed-amount', label: 'Fixed Amount' },
                    { value: 'performance-based', label: 'Performance Based' },
                  ]}
                  onChange={(value) => console.log('Ceding Commission Basis:', value)}
                />
                <Input
                  label="Minimum Ceding Commission"
                  placeholder="Enter minimum commission"
                  value=""
                  onChange={(e) => console.log('Minimum Ceding Commission:', e.target.value)}
                />
                <Dropdown
                  label="Profit Commission Basis"
                  placeholder="Select Basis"
                  value=""
                  options={[
                    { value: 'loss-ratio', label: 'Loss Ratio Based' },
                    { value: 'profit-margin', label: 'Profit Margin Based' },
                    { value: 'combined-ratio', label: 'Combined Ratio Based' },
                  ]}
                  onChange={(value) => console.log('Profit Commission Basis:', value)}
                />
                <Input
                  label="Provisional Profit Commission"
                  placeholder="Enter provisional Commission"
                  value=""
                  onChange={(e) => console.log('Provisional Profit Commission:', e.target.value)}
                />
              </div>

              {/* Division/Separator */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: colors.theme.primary400,
                margin: '32px 0',
              }} />

              {/* Profit Commission Tiers Section Title */}
              <h3 style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.black900,
                marginBottom: spacing[4],
                marginTop: '0',
              }}>Profit Commission Tiers</h3>

              {/* Profit Commission Tier 1 Title */}
              <h4 style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black900,
                marginBottom: spacing[1],
                marginTop: '0',
              }}>Profit Commission Tier 1</h4>

              {/* First Profit Commission Tier */}
              <div style={coverageLayerContainerStyles}>
                <div style={coverageLayerGridStyles}>
                  <Input
                    label="Attachment"
                    placeholder="Enter attachment"
                    value=""
                    onChange={(e) => console.log('Attachment 1:', e.target.value)}
                  />
                  <Input
                    label="Exhaustion"
                    placeholder="Enter exhaustion"
                    value=""
                    onChange={(e) => console.log('Exhaustion 1:', e.target.value)}
                  />
                  <Input
                    label="Profit %"
                    placeholder="Enter profit %"
                    value=""
                    onChange={(e) => console.log('Profit % 1:', e.target.value)}
                  />
                </div>
              </div>

              {/* Additional Profit Commission Tiers */}
              {additionalFieldSets.map((fieldSet) => (
                <div key={fieldSet.id}>
                  <h4 style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    marginBottom: spacing[1],
                    marginTop: '0',
                  }}>Profit Commission Tier {fieldSet.id + 1}</h4>
                  <div style={coverageLayerContainerStyles}>
                    <Button
                      variant="icon"
                      color="white"
                      shape="square"
                      style={closeButtonStyles}
                      onClick={() => removeAdditionalFieldSet(fieldSet.id)}
                      icon={<icons.small.close color={colors.theme.primary700} />}
                    />
                    <div style={coverageLayerGridStyles}>
                      <Input
                        label="Attachment"
                        placeholder="Enter attachment"
                        value=""
                        onChange={(e) => console.log(`Attachment ${fieldSet.id + 1}:`, e.target.value)}
                      />
                      <Input
                        label="Exhaustion"
                        placeholder="Enter exhaustion"
                        value=""
                        onChange={(e) => console.log(`Exhaustion ${fieldSet.id + 1}:`, e.target.value)}
                      />
                      <Input
                        label="Profit %"
                        placeholder="Enter profit %"
                        value=""
                        onChange={(e) => console.log(`Profit % ${fieldSet.id + 1}:`, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Profit Commission Tier Button */}
              <Button
                variant="tertiary"
                style={addButtonStyles}
                onClick={addAdditionalFieldSet}
              >
                Add Profit Commission Tier
              </Button>
            </>
          )}
        </div>


        {/* Policy Limits & Claims Fund Terms Section */}
        <div style={formContainerStyles}>
          <h3
            style={{
              ...sectionTitleStyles,
              marginBottom: sectionExpanded.policyLimitsClaims ? '24px' : '0',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => toggleSection('policyLimitsClaims')}
          >
            Policy Limits & Claims Fund Terms
            <div style={{
              transform: sectionExpanded.policyLimitsClaims ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}>
              <icons.small.chevronBottom color={colors.blackAndWhite.black900} />
            </div>
          </h3>
          {sectionExpanded.policyLimitsClaims && (
            <>
            <div style={formGridStyles}>
            <Dropdown
              label="Aggregate Limit Basis"
              placeholder="Select Basis"
              value=""
              options={[
                { value: 'per-policy', label: 'Per Policy' },
                { value: 'per-location', label: 'Per Location' },
                { value: 'per-occurrence', label: 'Per Occurrence' },
                { value: 'annual', label: 'Annual' },
              ]}
              onChange={(value) => console.log('Aggregate Limit Basis:', value)}
            />
            <Input
              label="Aggregate Limit"
              placeholder="Enter aggregate limit"
              value=""
              onChange={(e) => console.log('Aggregate Limit:', e.target.value)}
            />
            <Dropdown
              label="Occurrence Limit Basis"
              placeholder="Select Basis"
              value=""
              options={[
                { value: 'per-occurrence', label: 'Per Occurrence' },
                { value: 'per-claim', label: 'Per Claim' },
                { value: 'per-event', label: 'Per Event' },
                { value: 'combined', label: 'Combined' },
              ]}
              onChange={(value) => console.log('Occurrence Limit Basis:', value)}
            />
            <Input
              label="Occurrence Limit"
              placeholder="Enter occurrence limit"
              value=""
              onChange={(e) => console.log('Occurrence Limit:', e.target.value)}
            />
          </div>

          {/* Separator */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.theme.primary400,
            margin: '32px 0',
          }} />

          {/* Policy Limits Section Title */}
          <h3 style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            marginBottom: spacing[4],
            marginTop: '0',
          }}>Policy Limits</h3>

          {/* Policy Limit 1 Title */}
          <h4 style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            marginBottom: spacing[1],
            marginTop: '0',
          }}>Policy Limit 1</h4>

          {/* First Policy Limit */}
          <div style={coverageLayerContainerStyles}>
            <div style={formGridStyles}>
              <Dropdown
                label="Type"
                placeholder="Select type"
                value=""
                options={[
                  { value: 'aggregate', label: 'Aggregate Limit' },
                  { value: 'occurrence', label: 'Occurrence Limit' },
                  { value: 'per-claim', label: 'Per Claim Limit' },
                  { value: 'annual', label: 'Annual Limit' },
                ]}
                onChange={(value) => console.log('Type 1:', value)}
              />
              <Input
                label="Amount"
                placeholder="Enter amount"
                value=""
                onChange={(e) => console.log('Amount 1:', e.target.value)}
              />
            </div>
          </div>

          {/* Additional Policy Limits */}
          {additionalFieldSets.map((fieldSet) => (
            <div key={fieldSet.id}>
              <h4 style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black900,
                marginBottom: spacing[1],
                marginTop: '0',
              }}>Policy Limit {fieldSet.id + 1}</h4>
              <div style={coverageLayerContainerStyles}>
                <Button
                  variant="icon"
                  color="white"
                  shape="square"
                  style={closeButtonStyles}
                  onClick={() => removeAdditionalFieldSet(fieldSet.id)}
                  icon={<icons.small.close color={colors.theme.primary700} />}
                />
                <div style={formGridStyles}>
                  <Dropdown
                    label="Type"
                    placeholder="Select type"
                    value=""
                    options={[
                      { value: 'aggregate', label: 'Aggregate Limit' },
                      { value: 'occurrence', label: 'Occurrence Limit' },
                      { value: 'per-claim', label: 'Per Claim Limit' },
                      { value: 'annual', label: 'Annual Limit' },
                    ]}
                    onChange={(value) => console.log(`Type ${fieldSet.id + 1}:`, value)}
                  />
                  <Input
                    label="Amount"
                    placeholder="Enter amount"
                    value=""
                    onChange={(e) => console.log(`Amount ${fieldSet.id + 1}:`, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Policy Limit Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addAdditionalFieldSet}
          >
            Add Policy Limit
          </Button>

          {/* Separator */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.theme.primary400,
            margin: '32px 0',
          }} />

          {/* Claims Fund Section Title */}
          <h3 style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            marginBottom: spacing[4],
            marginTop: '0',
          }}>Claims Fund</h3>

          {/* Claims Fund Title */}
          <h4 style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            marginBottom: spacing[1],
            marginTop: '0',
          }}>Claims Fund</h4>

          {/* Claims Fund */}
          <div style={coverageLayerContainerStyles}>
            <div style={coverageLayerGridStyles}>
              <Input
                label="Initial Claims Fund"
                placeholder="Enter initial claims fund"
                value=""
                onChange={(e) => console.log('Initial Claims Fund:', e.target.value)}
              />
              <Input
                label="Minimum Claims Fund"
                placeholder="Enter minimum claims fund"
                value=""
                onChange={(e) => console.log('Minimum Claims Fund:', e.target.value)}
              />
              <Input
                label="Maximum Claims Fund"
                placeholder="Enter maximum claims fund"
                value=""
                onChange={(e) => console.log('Maximum Claims Fund:', e.target.value)}
              />
            </div>
          </div>
            </>
          )}
        </div>

        {/* Operational & Brokerage Terms Section */}
        <div style={formContainerStyles}>
          <h3
            style={{
              ...sectionTitleStyles,
              marginBottom: sectionExpanded.operationalBrokerage ? '24px' : '0',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => toggleSection('operationalBrokerage')}
          >
            Operational & Brokerage Terms
            <div style={{
              transform: sectionExpanded.operationalBrokerage ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}>
              <icons.small.chevronBottom color={colors.blackAndWhite.black900} />
            </div>
          </h3>
          {sectionExpanded.operationalBrokerage && (
            <>
            <div style={formGridStyles}>
            <Dropdown
              label="Currency"
              placeholder="USD - US Dollar"
              value=""
              options={[
                { value: 'usd', label: 'USD - US Dollar' },
                { value: 'eur', label: 'EUR - Euro' },
                { value: 'gbp', label: 'GBP - British Pound' },
                { value: 'cad', label: 'CAD - Canadian Dollar' },
              ]}
              onChange={(value) => console.log('Currency:', value)}
            />
            <DatePicker
              label="BDX Reporting Period"
              placeholder="Select Period"
              value=""
              onChange={(e) => console.log('BDX Reporting Period:', e.target.value)}
            />
            <Dropdown
              label="Borderaux Reporting Lag (days)"
              placeholder="Enter lag in days"
              value=""
              options={[
                { value: '30', label: '30 days' },
                { value: '45', label: '45 days' },
                { value: '60', label: '60 days' },
                { value: '90', label: '90 days' },
              ]}
              onChange={(value) => console.log('Borderaux Reporting Lag:', value)}
            />
            <Input
              label="Remittance Lag (Days)"
              placeholder="Enter lag in days"
              value=""
              onChange={(e) => console.log('Remittance Lag:', e.target.value)}
            />
            <DatePicker
              label="Collateral Reporting Period"
              placeholder="Select Period"
              value=""
              onChange={(e) => console.log('Collateral Reporting Period:', e.target.value)}
            />
            <Input
              label="Collateral Reporting Lag (Days)"
              placeholder="Enter lag in days"
              value=""
              onChange={(e) => console.log('Collateral Reporting Lag:', e.target.value)}
            />
            <Dropdown
              label="Collateral Deposit Lag (Days)"
              placeholder="Enter lag in days"
              value=""
              options={[
                { value: '15', label: '15 days' },
                { value: '30', label: '30 days' },
                { value: '45', label: '45 days' },
                { value: '60', label: '60 days' },
              ]}
              onChange={(value) => console.log('Collateral Deposit Lag:', value)}
            />
            <Input
              label="Exchange Rates"
              placeholder="Enter exchange rate terms"
              value=""
              onChange={(e) => console.log('Exchange Rates:', e.target.value)}
            />
            <DatePicker
              label="Communication Date"
              placeholder="Select Date"
              value=""
              onChange={(e) => console.log('Communication Date:', e.target.value)}
            />
          </div>

          {/* Separator */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.theme.primary400,
            margin: '32px 0',
          }} />

          {/* Broker Information Section Title */}
          <h3 style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            marginBottom: spacing[4],
            marginTop: '0',
          }}>Broker Information</h3>

          <div style={formGridStyles}>
            <Input
              label="Broker Name"
              placeholder="Enter broker name"
              value=""
              onChange={(e) => console.log('Broker Name:', e.target.value)}
            />
            <Input
              label="Brokerage Fee"
              placeholder="Enter brokerage fee"
              value=""
              onChange={(e) => console.log('Brokerage Fee:', e.target.value)}
            />
            <Dropdown
              label="Brokerage Fee Basis"
              placeholder="Select basis"
              value=""
              options={[
                { value: 'percentage', label: 'Percentage' },
                { value: 'fixed-amount', label: 'Fixed Amount' },
                { value: 'sliding-scale', label: 'Sliding Scale' },
              ]}
              onChange={(value) => console.log('Brokerage Fee Basis:', value)}
            />
            <Input
              label="% Brokerage Fee Paid at Closing"
              placeholder="Enter percentage"
              value=""
              onChange={(e) => console.log('% Brokerage Fee Paid at Closing:', e.target.value)}
            />
            <Dropdown
              label="Brokerage Payment Timing Scheme"
              placeholder="Select timing scheme"
              value=""
              options={[
                { value: 'upfront', label: 'Upfront Payment' },
                { value: 'installments', label: 'Installment Payments' },
                { value: 'annual', label: 'Annual Payment' },
                { value: 'quarterly', label: 'Quarterly Payment' },
              ]}
              onChange={(value) => console.log('Brokerage Payment Timing Scheme:', value)}
            />
          </div>
            </>
          )}
        </div>

        {/* Trust Account Terms Section */}
        <div style={formContainerStyles}>
          <h3
            style={{
              ...sectionTitleStyles,
              marginBottom: sectionExpanded.trustAccount ? '24px' : '0',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => toggleSection('trustAccount')}
          >
            Trust Account Terms
            <div style={{
              transform: sectionExpanded.trustAccount ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}>
              <icons.small.chevronBottom color={colors.blackAndWhite.black900} />
            </div>
          </h3>

          {sectionExpanded.trustAccount && (
            <>
            {/* Bank API Integration Content */}
          <div style={{
            ...coverageLayerContainerStyles,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}>
            {/* Left side - Title, description, and chips */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flex: '1',
            }}>
              {/* Title */}
              <h4 style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.black800,
                margin: '0',
                lineHeight: '1.3',
              }}>
                Bank API Integration
              </h4>

              {/* Description */}
              <p style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black500,
                margin: '0',
                lineHeight: '1.3',
              }}>
                Connect your bank's API for automated Trust Account information processing and real-time reporting.
              </p>

              {/* Chips */}
              <div style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
              }}>
                {/* Secure Connection Chip */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 8px',
                  backgroundColor: colors.reports.primary200,
                  borderRadius: '40px',
                }}>
                  <icons.small.check color={colors.blackAndWhite.black900} />
                  <span style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                  }}>
                    Secure Connection
                  </span>
                </div>

                {/* Real-time Sync Chip */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 8px',
                  backgroundColor: colors.reports.primary200,
                  borderRadius: '40px',
                }}>
                  <icons.small.check color={colors.blackAndWhite.black900} />
                  <span style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                  }}>
                    Real-time Sync
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Button or Connected State */}
            {isBankAPIConnected ? (
              <div style={{
                backgroundColor: '#E5F8EC',
                border: `1px solid ${colors.success.textAndStrokes}`,
                borderRadius: borderRadius[8],
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '240px',
                justifyContent: 'center',
              }}>
                <icons.small.check color={colors.success.textAndStrokes} />
                <span style={{
                  ...typography.styles.bodyL,
                  color: colors.success.textAndStrokes,
                  fontWeight: 500,
                }}>
                  API Connected
                </span>
              </div>
            ) : (
              <Button
                variant="primary"
                color="white"
                showIcon={false}
                onClick={() => setIsBankAPIModalOpen(true)}
              >
                Connect Bank API
              </Button>
            )}
          </div>

          {/* Additional Trust Account Fields */}
          <div style={{ marginTop: '24px' }}>
            {/* Trust Account Provider */}
            <div style={{ marginBottom: '20px' }}>
              <Dropdown
                label="Trust Account Provider"
                placeholder="Select provider"
                value=""
                options={[
                  { value: 'bank-of-america', label: 'Bank of America' },
                  { value: 'jp-morgan-chase', label: 'JPMorgan Chase' },
                  { value: 'wells-fargo', label: 'Wells Fargo' },
                  { value: 'citibank', label: 'Citibank' },
                  { value: 'us-bank', label: 'U.S. Bank' },
                  { value: 'pnc-bank', label: 'PNC Bank' },
                  { value: 'truist-bank', label: 'Truist Bank' },
                  { value: 'goldman-sachs', label: 'Goldman Sachs Bank' },
                  { value: 'other', label: 'Other' },
                ]}
                onChange={(value) => console.log('Trust Account Provider:', value)}
              />
            </div>

            {/* Trust/Principal Account Number */}
            <div style={{
              marginBottom: '20px',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '5px',
              alignItems: 'end'
            }}>
              <Input
                label="Trust/Principal Account Number"
                placeholder="Enter main trust account number"
                value=""
                onChange={(e) => console.log('Trust/Principal Account Number:', e.target.value)}
              />
              <Dropdown
                label="Currency"
                placeholder="USD"
                value=""
                options={[
                  { value: 'usd', label: 'USD' },
                  { value: 'eur', label: 'EUR' },
                  { value: 'gbp', label: 'GBP' },
                  { value: 'cad', label: 'CAD' },
                  { value: 'aud', label: 'AUD' },
                  { value: 'jpy', label: 'JPY' },
                ]}
                onChange={(value) => console.log('Trust/Principal Account Currency:', value)}
              />
            </div>

            {/* Reserve and Capital Accounts Section */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black900,
                marginBottom: spacing[1],
                marginTop: '0',
              }}>Associated Accounts</h4>
              <div style={coverageLayerContainerStyles}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>
                  {/* Reserve Account Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '5px',
                    alignItems: 'end'
                  }}>
                    <Input
                      label="Reserve Account"
                      placeholder="Enter reserve account number"
                      value=""
                      onChange={(e) => console.log('Reserve Account:', e.target.value)}
                    />
                    <Dropdown
                      label="Currency"
                      placeholder="USD"
                      value=""
                      options={[
                        { value: 'usd', label: 'USD' },
                        { value: 'eur', label: 'EUR' },
                        { value: 'gbp', label: 'GBP' },
                        { value: 'cad', label: 'CAD' },
                        { value: 'aud', label: 'AUD' },
                        { value: 'jpy', label: 'JPY' },
                      ]}
                      onChange={(value) => console.log('Reserve Account Currency:', value)}
                    />
                  </div>
                  {/* Capital Account Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '5px',
                    alignItems: 'end'
                  }}>
                    <Input
                      label="Capital Account"
                      placeholder="Enter capital account number"
                      value=""
                      onChange={(e) => console.log('Capital Account:', e.target.value)}
                    />
                    <Dropdown
                      label="Currency"
                      placeholder="USD"
                      value=""
                      options={[
                        { value: 'usd', label: 'USD' },
                        { value: 'eur', label: 'EUR' },
                        { value: 'gbp', label: 'GBP' },
                        { value: 'cad', label: 'CAD' },
                        { value: 'aud', label: 'AUD' },
                        { value: 'jpy', label: 'JPY' },
                      ]}
                      onChange={(value) => console.log('Capital Account Currency:', value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Income Account */}
            <div style={{
              marginBottom: '20px',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '5px',
              alignItems: 'end'
            }}>
              <Input
                label="Income Account"
                placeholder="Enter income account number"
                value=""
                onChange={(e) => console.log('Income Account:', e.target.value)}
              />
              <Dropdown
                label="Currency"
                placeholder="USD"
                value=""
                options={[
                  { value: 'usd', label: 'USD' },
                  { value: 'eur', label: 'EUR' },
                  { value: 'gbp', label: 'GBP' },
                  { value: 'cad', label: 'CAD' },
                  { value: 'aud', label: 'AUD' },
                  { value: 'jpy', label: 'JPY' },
                ]}
                onChange={(value) => console.log('Income Account Currency:', value)}
              />
            </div>
          </div>
          </>
          )}

        </div>
      </>
    );
  };

  // Structure and Key Terms buttons renderer
  const renderStructureTermsButtons = () => {
    const buttonsContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '24px',
    };

    return (
      <div style={buttonsContainerStyles}>
        <Button
          variant="primary"
          color="black"
          onClick={() => {
            console.log('Continue clicked');
            // Move to next tab
            setActiveTab('reporting-config');
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
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline', // Use baseline instead of center for better text alignment
              marginTop: '32px',
              marginBottom: '0',
            }}>
              <h2 style={{
                ...titleStyles,
                margin: 0, // Remove any default margin to ensure consistent positioning
              }}>Policy Groups</h2>
              <Button
                variant="small"
                color="white"
                onClick={() => {
                  console.log('Add Policy Groups clicked');
                }}
                showIcon={true}
                iconPosition="left"
                icon={<PlusExtraSmall />}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'flex-start' // Align button to the start of the flex container
                }}
              >
                Add Policy Groups
              </Button>
            </div>
            {renderPolicyGroupsForm()}
            {renderPolicyGroupsButtons()}
          </div>
        );
      
      case 'structure-terms':
        return (
          <div>
            <h2 style={titleStyles}>Structure and Key Terms</h2>
            {renderStructureAndKeyTermsForm()}
            {renderStructureTermsButtons()}
          </div>
        );
      
      case 'reporting-config':
        return (
          <div>
            <div style={{
              marginTop: '32px',
              marginBottom: '0',
            }}>
              <h2 style={{
                ...titleStyles,
                margin: 0, // Remove any default margin to ensure consistent positioning
              }}>Reporting Parameters & Configuration</h2>
            </div>
            {renderReportingParametersForm()}
            {renderReportingParametersButtons()}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <FormLayout
      formTitle={renewalData ? "RENEWAL TRANSACTION WORKFLOW" : "NEW TRANSACTION WORKFLOW"}
      entryType={renewalData ? "Renewal Transaction" : "Manual Entry"}
      statusText="draft"
      statusVariant="warning"
      progress={getProgress()}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="transactions"
      onBackClick={() => {
        console.log('Back to Dashboard clicked');
        onNavigateToPage?.('reports-transaction-management');
      }}
      onNavigate={createPageNavigationHandler(onNavigateToPage!, 'new-transaction-form')}
      onInboxClick={() => {
        console.log('Inbox clicked');
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

      {/* Connect Bank API Modal */}
      <ConnectBankAPIModal
        isOpen={isBankAPIModalOpen}
        onClose={() => setIsBankAPIModalOpen(false)}
        onConnect={() => setIsBankAPIConnected(true)}
      />
    </FormLayout>
  );
};

export default ReportsNewTransactionForm;
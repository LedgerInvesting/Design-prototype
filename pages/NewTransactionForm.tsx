import React, { useState, useEffect } from 'react';
import { FormLayout } from '@design-library/pages';
import { FormTabs, FormTab, Input, Dropdown, DatePicker, Button, ButtonSelector, Selector } from '@design-library/components';
import { typography, spacing, borderRadius, useSemanticColors } from '@design-library/tokens';
import { PlusExtraSmall, icons } from '@design-library/icons';

const formTabs: FormTab[] = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'policy-groups', label: 'Policy Groups' },
  { id: 'structure-terms', label: 'Structure and Key Terms' },
  { id: 'reporting-config', label: 'Reporting Parameters & Configuration' },
];

type PageType = 'cash-settlement' | 'report-navigation' | 'transaction-management' | 'new-transaction-form' | 'analytics-valuation' | 'contracts-explorer';

export interface NewTransactionFormProps {
  onNavigateToPage?: (page: PageType) => void;
}

export const NewTransactionForm: React.FC<NewTransactionFormProps> = ({
  onNavigateToPage
}) => {
  const colors = useSemanticColors();
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

  const [requirements, setRequirements] = useState([{ id: 1 }]);
  const [frequencyValue, setFrequencyValue] = useState<string>('');
  const [additionalFieldSets, setAdditionalFieldSets] = useState<Array<{ id: number }>>([]);
  const [profitCommissionTiers, setProfitCommissionTiers] = useState<Array<{ id: number }>>([]);
  const [policyLimitsTerms, setPolicyLimitsTerms] = useState<Array<{ id: number }>>([]);
  const [pricingLimits, setPricingLimits] = useState<Array<{ id: number }>>([]);
  const [claimsFunds, setClaimsFunds] = useState<Array<{ id: number }>>([]);
  const [brokerInfo, setBrokerInfo] = useState<Array<{ id: number }>>([]);
  const [trustAccountTerms, setTrustAccountTerms] = useState<Array<{ id: number }>>([]);

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

  const addPricingLimit = () => {
    const newId = pricingLimits.length + 1;
    setPricingLimits([...pricingLimits, { id: newId }]);
  };

  const addClaimsFund = () => {
    const newId = claimsFunds.length + 1;
    setClaimsFunds([...claimsFunds, { id: newId }]);
  };

  const addBrokerInfo = () => {
    const newId = brokerInfo.length + 1;
    setBrokerInfo([...brokerInfo, { id: newId }]);
  };

  const addTrustAccountTerm = () => {
    const newId = trustAccountTerms.length + 1;
    setTrustAccountTerms([...trustAccountTerms, { id: newId }]);
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
      marginTop: '24px',
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
      marginTop: '24px',
    };

    const sectionTitleStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black900,
      marginBottom: '24px',
      marginTop: '0',
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
            onNavigateToPage?.('transaction-management');
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
      marginTop: '24px',
    };

    const sectionTitleStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black900,
      marginBottom: '24px',
      marginTop: '0',
    };

    const formGridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px',
    };

    const coverageLayerContainerStyles: React.CSSProperties = {
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[8],
      padding: '24px',
      marginBottom: '16px',
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
          <h3 style={sectionTitleStyles}>Reinsurance Structure</h3>
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

          {/* Coverage Layers Label */}
          <label style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            display: 'block',
            marginBottom: spacing[1],
          }}>
            Coverage Layers
          </label>

          {/* First Coverage Layer */}
          <div style={coverageLayerContainerStyles}>
            <h4 style={coverageLayerTitleStyles}>Coverage Layers 1</h4>
            <div style={formGridStyles}>
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
            <div key={fieldSet.id} style={coverageLayerContainerStyles}>
              <Button
                variant="icon"
                color="white"
                shape="square"
                style={closeButtonStyles}
                onClick={() => removeAdditionalFieldSet(fieldSet.id)}
                icon={<icons.small.close color={colors.theme.primary700} />}
              />
              <h4 style={coverageLayerTitleStyles}>Coverage Layers {fieldSet.id + 1}</h4>
              <div style={formGridStyles}>
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
          ))}

          {/* Add Coverage Layer Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addAdditionalFieldSet}
          >
            Add Coverage Layer
          </Button>
        </div>

        {/* Premium & Commission Terms Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Premium & Commission Terms</h3>
          <div style={formGridStyles}>
            <Input
              label="Ceding Commission"
              placeholder="Enter ceding commission"
              value=""
              onChange={(e) => console.log('Ceding Commission:', e.target.value)}
            />
            <Input
              label="Profit Commission"
              placeholder="Enter profit commission"
              value=""
              onChange={(e) => console.log('Profit Commission:', e.target.value)}
            />
            <Input
              label="Brokerage"
              placeholder="Enter brokerage"
              value=""
              onChange={(e) => console.log('Brokerage:', e.target.value)}
            />
            <Input
              label="Override Commission"
              placeholder="Enter override commission"
              value=""
              onChange={(e) => console.log('Override Commission:', e.target.value)}
            />
          </div>
        </div>

        {/* Profit Commission Tiers Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Profit Commission Tiers</h3>

          {/* First Tier */}
          <div style={coverageLayerContainerStyles}>
            <h4 style={coverageLayerTitleStyles}>Profit Commission Tiers 1</h4>
            <div style={formGridStyles}>
              <Input
                label="Loss Ratio Threshold"
                placeholder="Enter loss ratio threshold"
                value=""
                onChange={(e) => console.log('Loss Ratio Threshold 1:', e.target.value)}
              />
              <Input
                label="Commission Rate"
                placeholder="Enter commission rate"
                value=""
                onChange={(e) => console.log('Commission Rate 1:', e.target.value)}
              />
            </div>
          </div>

          {/* Additional Profit Commission Tiers */}
          {profitCommissionTiers.map((tier) => (
            <div key={tier.id} style={coverageLayerContainerStyles}>
              <Button
                variant="icon"
                color="white"
                shape="square"
                style={closeButtonStyles}
                onClick={() => setProfitCommissionTiers(profitCommissionTiers.filter(t => t.id !== tier.id))}
                icon={<icons.small.close color={colors.theme.primary700} />}
              />
              <h4 style={coverageLayerTitleStyles}>Profit Commission Tiers {tier.id + 1}</h4>
              <div style={formGridStyles}>
                <Input
                  label="Loss Ratio Threshold"
                  placeholder="Enter loss ratio threshold"
                  value=""
                  onChange={(e) => console.log(`Loss Ratio Threshold ${tier.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Commission Rate"
                  placeholder="Enter commission rate"
                  value=""
                  onChange={(e) => console.log(`Commission Rate ${tier.id + 1}:`, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Add Profit Commission Tier Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addProfitCommissionTier}
          >
            Add Profit Commission Tier
          </Button>
        </div>

        {/* Policy Limits & Claims Fund Terms Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Policy Limits & Claims Fund Terms</h3>

          {/* First Policy Limits Term */}
          <div style={coverageLayerContainerStyles}>
            <h4 style={coverageLayerTitleStyles}>Policy Limits & Claims Fund Terms 1</h4>
            <div style={formGridStyles}>
              <Input
                label="Policy Limit"
                placeholder="Enter policy limit"
                value=""
                onChange={(e) => console.log('Policy Limit 1:', e.target.value)}
              />
              <Input
                label="Per Occurrence Limit"
                placeholder="Enter per occurrence limit"
                value=""
                onChange={(e) => console.log('Per Occurrence Limit 1:', e.target.value)}
              />
              <Input
                label="Aggregate Limit"
                placeholder="Enter aggregate limit"
                value=""
                onChange={(e) => console.log('Aggregate Limit 1:', e.target.value)}
              />
            </div>
          </div>

          {/* Additional Policy Limits Terms */}
          {policyLimitsTerms.map((term) => (
            <div key={term.id} style={coverageLayerContainerStyles}>
              <Button
                variant="icon"
                color="white"
                shape="square"
                style={closeButtonStyles}
                onClick={() => setPolicyLimitsTerms(policyLimitsTerms.filter(t => t.id !== term.id))}
                icon={<icons.small.close color={colors.theme.primary700} />}
              />
              <h4 style={coverageLayerTitleStyles}>Policy Limits & Claims Fund Terms {term.id + 1}</h4>
              <div style={formGridStyles}>
                <Input
                  label="Policy Limit"
                  placeholder="Enter policy limit"
                  value=""
                  onChange={(e) => console.log(`Policy Limit ${term.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Per Occurrence Limit"
                  placeholder="Enter per occurrence limit"
                  value=""
                  onChange={(e) => console.log(`Per Occurrence Limit ${term.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Aggregate Limit"
                  placeholder="Enter aggregate limit"
                  value=""
                  onChange={(e) => console.log(`Aggregate Limit ${term.id + 1}:`, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Add Policy Limits Term Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addPolicyLimitsTerm}
          >
            Add Policy Limits & Claims Fund Terms
          </Button>
        </div>

        {/* Pricing Limits Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Pricing Limits</h3>

          {/* First Pricing Limit */}
          <div style={coverageLayerContainerStyles}>
            <h4 style={coverageLayerTitleStyles}>Pricing Limits 1</h4>
            <div style={formGridStyles}>
              <Input
                label="Minimum Rate"
                placeholder="Enter minimum rate"
                value=""
                onChange={(e) => console.log('Minimum Rate 1:', e.target.value)}
              />
              <Input
                label="Maximum Rate"
                placeholder="Enter maximum rate"
                value=""
                onChange={(e) => console.log('Maximum Rate 1:', e.target.value)}
              />
              <Input
                label="Rate Adjustment Factor"
                placeholder="Enter rate adjustment factor"
                value=""
                onChange={(e) => console.log('Rate Adjustment Factor 1:', e.target.value)}
              />
            </div>
          </div>

          {/* Additional Pricing Limits */}
          {pricingLimits.map((limit) => (
            <div key={limit.id} style={coverageLayerContainerStyles}>
              <Button
                variant="icon"
                color="white"
                shape="square"
                style={closeButtonStyles}
                onClick={() => setPricingLimits(pricingLimits.filter(l => l.id !== limit.id))}
                icon={<icons.small.close color={colors.theme.primary700} />}
              />
              <h4 style={coverageLayerTitleStyles}>Pricing Limits {limit.id + 1}</h4>
              <div style={formGridStyles}>
                <Input
                  label="Minimum Rate"
                  placeholder="Enter minimum rate"
                  value=""
                  onChange={(e) => console.log(`Minimum Rate ${limit.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Maximum Rate"
                  placeholder="Enter maximum rate"
                  value=""
                  onChange={(e) => console.log(`Maximum Rate ${limit.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Rate Adjustment Factor"
                  placeholder="Enter rate adjustment factor"
                  value=""
                  onChange={(e) => console.log(`Rate Adjustment Factor ${limit.id + 1}:`, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Add Pricing Limit Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addPricingLimit}
          >
            Add Pricing Limits
          </Button>
        </div>

        {/* Claims Fund Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Claims Fund</h3>

          {/* First Claims Fund */}
          <div style={coverageLayerContainerStyles}>
            <h4 style={coverageLayerTitleStyles}>Claims Fund 1</h4>
            <div style={formGridStyles}>
              <Input
                label="Initial Fund Amount"
                placeholder="Enter initial fund amount"
                value=""
                onChange={(e) => console.log('Initial Fund Amount 1:', e.target.value)}
              />
              <Input
                label="Fund Replenishment Trigger"
                placeholder="Enter fund replenishment trigger"
                value=""
                onChange={(e) => console.log('Fund Replenishment Trigger 1:', e.target.value)}
              />
              <Input
                label="Maximum Fund Liability"
                placeholder="Enter maximum fund liability"
                value=""
                onChange={(e) => console.log('Maximum Fund Liability 1:', e.target.value)}
              />
            </div>
          </div>

          {/* Additional Claims Funds */}
          {claimsFunds.map((fund) => (
            <div key={fund.id} style={coverageLayerContainerStyles}>
              <Button
                variant="icon"
                color="white"
                shape="square"
                style={closeButtonStyles}
                onClick={() => setClaimsFunds(claimsFunds.filter(f => f.id !== fund.id))}
                icon={<icons.small.close color={colors.theme.primary700} />}
              />
              <h4 style={coverageLayerTitleStyles}>Claims Fund {fund.id + 1}</h4>
              <div style={formGridStyles}>
                <Input
                  label="Initial Fund Amount"
                  placeholder="Enter initial fund amount"
                  value=""
                  onChange={(e) => console.log(`Initial Fund Amount ${fund.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Fund Replenishment Trigger"
                  placeholder="Enter fund replenishment trigger"
                  value=""
                  onChange={(e) => console.log(`Fund Replenishment Trigger ${fund.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Maximum Fund Liability"
                  placeholder="Enter maximum fund liability"
                  value=""
                  onChange={(e) => console.log(`Maximum Fund Liability ${fund.id + 1}:`, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Add Claims Fund Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addClaimsFund}
          >
            Add Claims Fund
          </Button>
        </div>

        {/* Operational & Brokerage Terms Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Operational & Brokerage Terms</h3>
          <div style={formGridStyles}>
            <DatePicker
              label="Contract Effective Date"
              placeholder="Select effective date"
              value=""
              onChange={(e) => console.log('Contract Effective Date:', e.target.value)}
            />
            <DatePicker
              label="Contract Expiration Date"
              placeholder="Select expiration date"
              value=""
              onChange={(e) => console.log('Contract Expiration Date:', e.target.value)}
            />
            <Input
              label="Payment Terms"
              placeholder="Enter payment terms"
              value=""
              onChange={(e) => console.log('Payment Terms:', e.target.value)}
            />
            <Input
              label="Reporting Frequency"
              placeholder="Enter reporting frequency"
              value=""
              onChange={(e) => console.log('Reporting Frequency:', e.target.value)}
            />
          </div>
        </div>

        {/* Broker Information Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Broker Information</h3>

          {/* First Broker Info */}
          <div style={coverageLayerContainerStyles}>
            <h4 style={coverageLayerTitleStyles}>Broker Information 1</h4>
            <div style={formGridStyles}>
              <Input
                label="Broker Name"
                placeholder="Enter broker name"
                value=""
                onChange={(e) => console.log('Broker Name 1:', e.target.value)}
              />
              <Input
                label="Broker Contact"
                placeholder="Enter broker contact"
                value=""
                onChange={(e) => console.log('Broker Contact 1:', e.target.value)}
              />
              <Input
                label="Commission Rate"
                placeholder="Enter commission rate"
                value=""
                onChange={(e) => console.log('Commission Rate 1:', e.target.value)}
              />
            </div>
          </div>

          {/* Additional Broker Information */}
          {brokerInfo.map((info) => (
            <div key={info.id} style={coverageLayerContainerStyles}>
              <Button
                variant="icon"
                color="white"
                shape="square"
                style={closeButtonStyles}
                onClick={() => setBrokerInfo(brokerInfo.filter(b => b.id !== info.id))}
                icon={<icons.small.close color={colors.theme.primary700} />}
              />
              <h4 style={coverageLayerTitleStyles}>Broker Information {info.id + 1}</h4>
              <div style={formGridStyles}>
                <Input
                  label="Broker Name"
                  placeholder="Enter broker name"
                  value=""
                  onChange={(e) => console.log(`Broker Name ${info.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Broker Contact"
                  placeholder="Enter broker contact"
                  value=""
                  onChange={(e) => console.log(`Broker Contact ${info.id + 1}:`, e.target.value)}
                />
                <Input
                  label="Commission Rate"
                  placeholder="Enter commission rate"
                  value=""
                  onChange={(e) => console.log(`Commission Rate ${info.id + 1}:`, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Add Broker Information Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addBrokerInfo}
          >
            Add Broker Information
          </Button>
        </div>

        {/* Trust Account Terms Section */}
        <div style={formContainerStyles}>
          <h3 style={sectionTitleStyles}>Trust Account Terms</h3>

          {/* First Trust Account Term */}
          <div style={coverageLayerContainerStyles}>
            <h4 style={coverageLayerTitleStyles}>Trust Account Terms 1</h4>
            <div style={formGridStyles}>
              <Dropdown
                label="Type"
                placeholder="Select type"
                value=""
                options={[
                  { value: 'rate', label: 'Rate' },
                  { value: 'amount', label: 'Amount' },
                  { value: 'percentage', label: 'Percentage' },
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

          {/* Additional Trust Account Terms */}
          {trustAccountTerms.map((term) => (
            <div key={term.id} style={coverageLayerContainerStyles}>
              <Button
                variant="icon"
                color="white"
                shape="square"
                style={closeButtonStyles}
                onClick={() => setTrustAccountTerms(trustAccountTerms.filter(t => t.id !== term.id))}
                icon={<icons.small.close color={colors.theme.primary700} />}
              />
              <h4 style={coverageLayerTitleStyles}>Trust Account Terms {term.id + 1}</h4>
              <div style={formGridStyles}>
                <Dropdown
                  label="Type"
                  placeholder="Select type"
                  value=""
                  options={[
                    { value: 'rate', label: 'Rate' },
                    { value: 'amount', label: 'Amount' },
                    { value: 'percentage', label: 'Percentage' },
                  ]}
                  onChange={(value) => console.log(`Type ${term.id + 1}:`, value)}
                />
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  value=""
                  onChange={(e) => console.log(`Amount ${term.id + 1}:`, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Add Trust Account Term Button */}
          <Button
            variant="tertiary"
            style={addButtonStyles}
            onClick={addTrustAccountTerm}
          >
            Add Trust Account Terms
          </Button>
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
      formTitle="NEW TRANSACTION WORKFLOW"
      statusText="draft"
      statusVariant="warning"
      progress={getProgress()}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="transactions"
      onBackClick={() => {
        console.log('Back to Dashboard clicked');
        onNavigateToPage?.('transaction-management');
      }}
      onNavigate={(itemId, subitemId) => {
        console.log('Navigate to:', itemId, subitemId);
        
        // Handle Reports navigation
        if (itemId === 'reports') {
          if (subitemId === 'insights-explorer') {
            onNavigateToPage?.('report-navigation');
          } else if (subitemId === 'transactions') {
            onNavigateToPage?.('transaction-management');
          }
        }
        // Handle Analytics navigation
        else if (itemId === 'analytics') {
          if (subitemId === 'valuation') {
            onNavigateToPage?.('analytics-valuation');
          }
        }
        // Handle Contracts navigation
        else if (itemId === 'contracts') {
          onNavigateToPage?.('contracts-explorer');
        }
        // Handle other navigation (legacy marketplace)
        else if (itemId === 'marketplace' && subitemId === 'settlement') {
          onNavigateToPage?.('cash-settlement');
        }
      }}
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
    </FormLayout>
  );
};

export default NewTransactionForm;
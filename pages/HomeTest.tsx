import React from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { colors, typography, spacing, borderRadius, useSemanticColors } from '@design-library/tokens';
import {
  AddMedium,
  DocumentMedium,
  GraphMedium,
  FolderMedium,
  S1ArrowRightMedium,
  PlaySmall,
  S1ArrowUpMedium,
  UploadMedium
} from '@design-library/icons';
import { createNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';

interface HomeTestProps {
  onNavigateToPage?: NavigationHandler;
}

export const HomeTest: React.FC<HomeTestProps> = ({ onNavigateToPage }) => {
  // State for animated text rotation
  const [currentPromptIndex, setCurrentPromptIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const prompts = [
    "How is my investment portfolio performing?",
    "Extract the key terms from this insurance contract.",
    "Display the earned premium triangle for this dataset"
  ];

  // Rotate prompts every 3 seconds (only when not focused)
  React.useEffect(() => {
    if (isFocused) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFocused]);

  // Add CSS for hover effects and animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      [class*="video-thumbnail-"]:hover .dark-overlay {
        opacity: 0 !important;
      }
      [class*="video-thumbnail-"] img {
        transition: transform 0.6s ease;
      }
      [class*="video-thumbnail-"]:hover img {
        transform: scale(1.10);
      }

      /* Arrow button background hover scale - triggered by card hover */
      .arrow-button-background {
        transition: transform 0.4s ease;
      }
      .quick-action-card:hover .arrow-button-background {
        transform: scale(1.3);
      }

      /* Transaction preview cards hover scale */
      .transaction-preview-card {
        transition: transform 0.4s ease;
      }
      .transaction-preview-card:hover {
        transform: scale(1.025);
      }

      /* Document preview hover scale */
      .document-preview {
        transition: transform 0.4s ease;
      }
      .document-preview:hover {
        transform: scale(1.025);
      }
      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOutToRight {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(20px);
        }
      }
      .prompt-text-enter {
        animation: slideInFromLeft 0.4s ease forwards;
      }
      .prompt-text-exit {
        animation: slideOutToRight 0.4s ease forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'WELCOME', isActive: true }
  ];

  // Create navigation handler
  const navigationHandler = onNavigateToPage ? createNavigationHandler(onNavigateToPage) : undefined;

  // Action buttons data
  const actionButtons = [
    {
      icon: AddMedium,
      iconColor: colors.reports.blue900,
      backgroundColor: colors.reports.blue700,
      label: 'Create transaction',
      onClick: () => onNavigateToPage?.('reports-new-transaction-form')
    },
    {
      icon: DocumentMedium,
      iconColor: '#C5950B', // Yellow 900
      backgroundColor: '#FBDB6B', // Yellow from design
      label: 'Extract Key Terms',
      onClick: () => onNavigateToPage?.('contracts-ai-extraction')
    },
    {
      icon: GraphMedium,
      iconColor: colors.analytics.green900,
      backgroundColor: colors.analytics.green700,
      label: 'See Portfolio Performances',
      onClick: () => onNavigateToPage?.('analytics-valuation-dashboard')
    },
    {
      icon: FolderMedium,
      iconColor: '#BC6833',
      backgroundColor: '#F59E77', // Orange from design
      label: 'Set up Bordereau',
      onClick: () => console.log('Set up Bordereau clicked')
    }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      selectedSidebarItem="home"
      onNavigate={navigationHandler}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
    >
      {/* Welcome Title */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontFamily: 'Bradford LL',
          fontSize: '42px',
          fontWeight: 500,
          lineHeight: 1.2,
          letterSpacing: '-1.5px',
          color: colors.blackAndWhite.black900,
          margin: 0
        }}>
          Welcome back, <span style={{ color: colors.blackAndWhite.black500 }}>Sebastian</span>
        </h1>
      </div>

      {/* Main Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '60px'
      }}>
        {actionButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            style={{
              height: '72px',
              border: `1px solid ${colors.blackAndWhite.black100}`,
              borderRadius: borderRadius[16],
              backgroundColor: colors.blackAndWhite.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '13px',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.contracts.dynamic.yellow200;
              e.currentTarget.style.borderColor = colors.blackAndWhite.black300;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.blackAndWhite.white;
              e.currentTarget.style.borderColor = colors.blackAndWhite.black100;
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: button.backgroundColor,
              borderRadius: borderRadius[4],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                left: index === 0 ? '1px' : index === 1 ? '1px' : index === 3 ? '1px' : '0', // Blue 1px right, Yellow 1px right, Last 1px right
                top: index === 2 ? '1px' : '0' // Green 1px down
              }}>
                <button.icon color={button.iconColor} />
              </div>
            </div>
            <span style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              {button.label}
            </span>
          </button>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div style={{ marginBottom: spacing[48] }}>
        {/* Section Label */}
        <p style={{
          fontFamily: 'Bradford LL',
          fontSize: '12px',
          fontWeight: 700,
          fontStyle: 'italic',
          lineHeight: 1.3,
          letterSpacing: '-0.24px',
          color: '#838985',
          marginBottom: '16px'
        }}>
          Quick Actions
        </p>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px'
        }}>
          {/* Transactions Card */}
          <div
            className="quick-action-card"
            style={{
              position: 'relative',
              boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.06)',
              height: '390px',
              borderRadius: borderRadius[16]
            }}
          >
            {/* Background Layer */}
            <div
              className="card-background-layer"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: colors.reports.blue700,
                borderRadius: borderRadius[16],
                zIndex: 0
              }}
            />

            {/* Content Layer */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              padding: '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Card Header */}
              <div style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h3 style={{
                    fontFamily: 'Bradford LL',
                    fontSize: '33px',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: '-1px',
                    color: colors.blackAndWhite.black900,
                    margin: 0
                  }}>
                    Transactions
                  </h3>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    opacity: 0.5,
                    margin: '3px 0 0 0'
                  }}>
                    You have 2 transaction peding
                  </p>
                </div>
                <div
                  onClick={() => onNavigateToPage?.('reports-transaction-management')}
                  style={{
                    width: '40px',
                    height: '40px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {/* Background circle that scales */}
                  <div
                    className="arrow-button-background"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: colors.blackAndWhite.white,
                      zIndex: 0
                    }}
                  />
                  {/* Icon that stays the same size */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <S1ArrowRightMedium color={colors.blackAndWhite.black900} />
                  </div>
                </div>
              </div>

              {/* Transaction Preview Cards */}
              <div style={{
                display: 'flex',
                gap: '6px',
                height: '230px'
              }}>
              {/* Card 1 */}
              <div
                className="transaction-preview-card"
                style={{
                  flex: 1,
                  backgroundColor: colors.blackAndWhite.white,
                  borderRadius: '10px',
                  padding: '20px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                <div
                  onClick={() => onNavigateToPage?.('reports-new-transaction-form')}
                  style={{
                    position: 'absolute',
                    top: '17px',
                    right: '20px',
                    border: `1px solid ${colors.blackAndWhite.black100}`,
                    borderRadius: '400px',
                    padding: '6px 15px',
                    fontSize: '10px',
                    fontFamily: 'Söhne Mono',
                    fontWeight: 600,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: colors.blackAndWhite.black900,
                    cursor: 'pointer'
                  }}>
                  VIEW
                </div>
                <div style={{
                  fontSize: '22px',
                  fontFamily: 'Söhne',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  marginTop: '0px'
                }}>
                  15%
                </div>
                <div>
                  <div style={{
                    ...typography.styles.bodyL,
                    color: colors.blackAndWhite.black900,
                    marginBottom: '4px'
                  }}>
                    Blue Commercial Auto 2020
                  </div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    opacity: 0.5
                  }}>
                    Premium: $1,245,000
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="transaction-preview-card"
                style={{
                  flex: 1,
                  backgroundColor: colors.blackAndWhite.white,
                  borderRadius: '10px',
                  padding: '20px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                <div
                  onClick={() => onNavigateToPage?.('reports-new-transaction-form')}
                  style={{
                    position: 'absolute',
                    top: '17px',
                    right: '20px',
                    border: `1px solid ${colors.blackAndWhite.black100}`,
                    borderRadius: '400px',
                    padding: '6px 15px',
                    fontSize: '10px',
                    fontFamily: 'Söhne Mono',
                    fontWeight: 600,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: colors.blackAndWhite.black900,
                    cursor: 'pointer'
                  }}>
                  VIEW
                </div>
                <div style={{
                  fontSize: '22px',
                  fontFamily: 'Söhne',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  marginTop: '0px'
                }}>
                  28%
                </div>
                <div>
                  <div style={{
                    ...typography.styles.bodyL,
                    color: colors.blackAndWhite.black900,
                    marginBottom: '4px'
                  }}>
                    Green General Liability 2022
                  </div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    opacity: 0.5
                  }}>
                    Premium: $890,500
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Terms Extracted Card */}
          <div
            className="quick-action-card"
            style={{
              position: 'relative',
              boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.06)',
              height: '390px',
              borderRadius: borderRadius[16]
            }}
          >
            {/* Background Layer */}
            <div
              className="card-background-layer"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#FBDB6B',
                borderRadius: borderRadius[16],
                zIndex: 0
              }}
            />

            {/* Content Layer */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              padding: '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Card Header */}
              <div style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h3 style={{
                    fontFamily: 'Bradford LL',
                    fontSize: '33px',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: '-1px',
                    color: colors.blackAndWhite.black900,
                    margin: 0
                  }}>
                    Terms Extracted
                  </h3>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    opacity: 0.5,
                    margin: '3px 0 0 0'
                  }}>
                    You have 2 transaction peding
                  </p>
                </div>
                <div
                  onClick={() => onNavigateToPage?.('contracts-ai-extraction')}
                  style={{
                    width: '40px',
                    height: '40px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {/* Background circle that scales */}
                  <div
                    className="arrow-button-background"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: colors.blackAndWhite.white,
                      zIndex: 0
                    }}
                  />
                  {/* Icon that stays the same size */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <S1ArrowRightMedium color={colors.blackAndWhite.black900} />
                  </div>
                </div>
              </div>

              {/* Terms Preview */}
              <div
                className="document-preview"
                style={{
                  backgroundColor: colors.blackAndWhite.white,
                  borderRadius: '10px',
                  height: '230px',
                  padding: '8px',
                  display: 'flex',
                  gap: '6px'
                }}
              >
              {/* Document Preview */}
              <div
                style={{
                  flex: '0 0 194px',
                  backgroundColor: colors.contracts.dynamic.yellow200,
                  borderRadius: '6px',
                  padding: '17px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                {/* Document Icon */}
                <img
                  src="/document.png"
                  alt="Document"
                  style={{
                    width: '130px',
                    height: '132px'
                  }}
                />
              </div>

              {/* Extracted Terms */}
              <div style={{
                flex: 1,
                backgroundColor: colors.contracts.dynamic.yellow200,
                borderRadius: '6px',
                padding: '17px',
                fontSize: '10px',
                fontFamily: 'Söhne',
                lineHeight: 1.3,
                color: colors.blackAndWhite.black900
              }}>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>Ceding Insurer</span>
                  <span style={{ textAlign: 'right' }}>Lofty nation Car</span>
                </div>
                <div style={{ borderTop: `1px solid ${colors.contracts.dynamic.yellow400}`, marginBottom: '10px' }} />
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>Product Line</span>
                  <span style={{ textAlign: 'right' }}>Private Passenger Auto</span>
                </div>
                <div style={{ borderTop: `1px solid ${colors.contracts.dynamic.yellow400}`, marginBottom: '10px' }} />
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>Reinsurance Type</span>
                  <span>Treaty</span>
                </div>
                <div style={{ borderTop: `1px solid ${colors.contracts.dynamic.yellow400}`, marginBottom: '10px' }} />
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>Quota Share Percent</span>
                  <span>100%</span>
                </div>
                <div style={{ borderTop: `1px solid ${colors.contracts.dynamic.yellow400}`, marginBottom: '10px' }} />
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>Subject Business</div>
                  <div style={{ opacity: 0.7 }}>
                    This Agreement is to indemnify the Company in respect of the liability that may accrue to the Company as a result...
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watch Product Demos Section */}
      <div style={{ marginBottom: spacing[48], marginTop: '60px' }}>
        {/* Section Label */}
        <p style={{
          fontFamily: 'Bradford LL',
          fontSize: '12px',
          fontWeight: 700,
          fontStyle: 'italic',
          lineHeight: 1.3,
          letterSpacing: '-0.24px',
          color: '#838985',
          marginBottom: '16px'
        }}>
          Watch Product Demos
        </p>

        {/* Video Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}>
          {[
            { image: 'Contracts.png', label: 'Contracts', color: '#FBDB6B', iconColor: '#C5950B' },
            { image: 'Marketplace.png', label: 'Marketplace', color: colors.marketplace.violet800, iconColor: colors.marketplace.violet800 },
            { image: 'Reports.png', label: 'Reports', color: colors.reports.blue800, iconColor: colors.reports.blue800 },
            { image: 'analytics.png', label: 'Analytics', color: colors.analytics.green800, iconColor: colors.analytics.green800 }
          ].map((video, index) => (
            <div key={index}>
              {/* Video Thumbnail */}
              <div
                className={`video-thumbnail-${index}`}
                style={{
                  position: 'relative',
                  height: '144px',
                  borderRadius: borderRadius[8],
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: video.color
                }}
              >
                {/* Background Image */}
                <img
                  src={`/${video.image}`}
                  alt={video.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Dark Overlay */}
                <div
                  className="dark-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(23, 33, 27, 0.2)',
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                />

                {/* Play Button Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '44px',
                  height: '29px',
                  backgroundColor: colors.blackAndWhite.white,
                  borderRadius: borderRadius[8],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  zIndex: 1
                }}>
                  <PlaySmall color={video.iconColor} />
                </div>
              </div>

              {/* Label and Duration */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px'
              }}>
                <span style={{
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black900
                }}>
                  {video.label}
                </span>
                <span style={{
                  ...typography.styles.bodyM,
                  color: '#838985',
                  textAlign: 'right'
                }}>
                  2:30
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ask Korra AI Section */}
      <div style={{ marginTop: '60px' }}>
        {/* Section Label */}
        <p style={{
          fontFamily: 'Bradford LL',
          fontSize: '12px',
          fontWeight: 700,
          fontStyle: 'italic',
          lineHeight: 1.3,
          letterSpacing: '-0.24px',
          color: '#838985',
          marginBottom: '16px'
        }}>
          Ask Korra AI
        </p>

        {/* Chat Section */}
        <div style={{
          backgroundColor: colors.contracts.dynamic.yellow200,
          height: '142px',
          width: '100%',
          borderRadius: borderRadius[16],
          padding: '20px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
        {/* Input or Animated Prompt Text */}
        {isFocused ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
              if (!inputValue) setIsFocused(false);
            }}
            autoFocus
            style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              padding: 0,
              margin: 0,
              width: '100%'
            }}
            placeholder={prompts[0]}
          />
        ) : (
          <div
            onClick={() => setIsFocused(true)}
            style={{
              position: 'relative',
              height: '18px',
              overflow: 'hidden',
              cursor: 'text'
            }}
          >
            <p
              className={isAnimating ? 'prompt-text-exit' : 'prompt-text-enter'}
              style={{
                ...typography.styles.bodyM,
                color: '#838985',
                margin: 0
              }}
            >
              {prompts[currentPromptIndex]}
            </p>
          </div>
        )}

        {/* Bottom Row: Upload Button and Send Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Upload Button */}
          <button style={{
            backgroundColor: colors.contracts.dynamic.yellow300,
            border: 'none',
            borderRadius: '300px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}>
            <span style={{
              ...typography.styles.bodyM,
              color: '#838985'
            }}>
              Upload
            </span>
          </button>

          {/* Send Button */}
          <button style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            backgroundColor: colors.blackAndWhite.black900,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <S1ArrowRightMedium color={colors.blackAndWhite.white} />
          </button>
        </div>
        </div>
      </div>
    </Layout>
  );
};

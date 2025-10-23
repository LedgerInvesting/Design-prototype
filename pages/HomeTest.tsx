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

      /* Watch Videos button hover scale */
      .explore-products-card:hover .button-background {
        transform: scale(1.1);
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
      backgroundColor: colors.reports.blue500,
      label: 'Source a new deal',
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
    },
    {
      icon: AddMedium,
      iconColor: colors.reports.blue900,
      backgroundColor: colors.reports.blue500,
      label: 'Source a new deal',
      onClick: () => onNavigateToPage?.('reports-new-transaction-form')
    },
    {
      icon: DocumentMedium,
      iconColor: '#C5950B', // Yellow 900
      backgroundColor: '#FBDB6B', // Yellow from design
      label: 'Extract Key Terms',
      onClick: () => onNavigateToPage?.('contracts-ai-extraction')
    }
  ];

  return (
    <Layout
      pageType="home"
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

      {/* Quick Actions Section */}
      <div style={{ marginBottom: '60px' }}>
        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60% 40%',
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
                    ...typography.styles.subheadingM,
                    color: colors.blackAndWhite.black900,
                    margin: 0
                  }}>
                    Next Steps
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
                  {/* Steps Complete Indicator */}
                  <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                    {/* White Background Circle - 10px bigger */}
                    <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', top: 0, left: 0 }}>
                      <circle
                        cx="25"
                        cy="25"
                        r="25"
                        fill={colors.blackAndWhite.white}
                      />
                    </svg>
                    {/* Background Circle */}
                    <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', top: 0, left: 0 }}>
                      <circle
                        cx="25"
                        cy="25"
                        r="18"
                        fill="none"
                        stroke="#F4EFE6"
                        strokeWidth="3"
                      />
                    </svg>
                    {/* Progress Arc (1/6 = 16.67% = 60 degrees) */}
                    <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="25"
                        cy="25"
                        r="18"
                        fill="none"
                        stroke="#15BF53"
                        strokeWidth="3"
                        strokeDasharray="113.1" /* 2 * PI * 18 = 113.1 */
                        strokeDashoffset="94.25" /* 113.1 - (113.1 * 0.167) = 94.25 */
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Center Text */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1px'
                    }}>
                      <span style={{
                        ...typography.styles.dataXS,
                        fontWeight: 600,
                        color: colors.blackAndWhite.black900
                      }}>1</span>
                      <span style={{
                        ...typography.styles.dataXS,
                        color: colors.blackAndWhite.black300
                      }}>/6</span>
                    </div>
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
                {/* Text - Top Left */}
                <div>
                  <div style={{
                    ...typography.styles.bodyL,
                    color: colors.blackAndWhite.black900,
                    marginBottom: '4px'
                  }}>
                    Create a Transaction Manually
                  </div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    opacity: 0.5
                  }}>
                    Create a Transaction Manually
                  </div>
                </div>
                {/* Bottom Row: Document Preview Box + Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px' }}>
                  {/* Document Preview Box */}
                  <div style={{
                    backgroundColor: colors.contracts.dynamic.yellow200,
                    borderRadius: '6px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '130px',
                    height: '130px',
                    flexShrink: 0
                  }}>
                    {/* Document Image */}
                    <img
                      src="/document.png"
                      alt="Document"
                      style={{
                        height: '100%',
                        width: 'auto'
                      }}
                    />
                  </div>
                  {/* Button - Bottom Right */}
                  <div
                    onClick={() => onNavigateToPage?.('reports-new-transaction-form')}
                    style={{
                      backgroundColor: colors.blackAndWhite.black900,
                      border: 'none',
                      borderRadius: '400px',
                      padding: '6px 15px',
                      fontSize: '10px',
                      fontFamily: 'Söhne Mono',
                      fontWeight: 600,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      color: colors.blackAndWhite.white,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}>
                    START
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
                {/* Text - Top Left */}
                <div>
                  <div style={{
                    ...typography.styles.bodyL,
                    color: colors.blackAndWhite.black900,
                    marginBottom: '4px'
                  }}>
                    Extract Key Terms
                  </div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    opacity: 0.5
                  }}>
                    Extract Key Terms
                  </div>
                </div>
                {/* Bottom Row: Document Preview Box + Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px' }}>
                  {/* Document Preview Box */}
                  <div style={{
                    backgroundColor: colors.contracts.dynamic.yellow200,
                    borderRadius: '6px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '130px',
                    height: '130px',
                    flexShrink: 0
                  }}>
                    {/* Document Image */}
                    <img
                      src="/document.png"
                      alt="Document"
                      style={{
                        height: '100%',
                        width: 'auto'
                      }}
                    />
                  </div>
                  {/* Button - Bottom Right */}
                  <div
                    onClick={() => onNavigateToPage?.('reports-new-transaction-form')}
                    style={{
                      backgroundColor: colors.blackAndWhite.black900,
                      border: 'none',
                      borderRadius: '400px',
                      padding: '6px 15px',
                      fontSize: '10px',
                      fontFamily: 'Söhne Mono',
                      fontWeight: 600,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      color: colors.blackAndWhite.white,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}>
                    START
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Explore Products Card - NEW */}
          <div
            className="quick-action-card explore-products-card"
            style={{
              position: 'relative',
              boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.06)',
              height: '390px',
              borderRadius: borderRadius[16],
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            >
              <source src="https://korra-ldgr.vercel.app/contact/contact-video.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay - Black 900 starting from 50% height */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to bottom, rgba(23, 33, 27, 0) 0%, rgba(23, 33, 27, 0) 50%, ${colors.blackAndWhite.black900} 100%)`,
                zIndex: 1
              }}
            />

            {/* Content Layer */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              padding: '30px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              {/* Centered Watch Videos Button */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <button
                  className="watch-videos-button"
                  style={{
                    position: 'relative',
                    border: 'none',
                    borderRadius: '300px',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent'
                  }}>
                  {/* Background that scales */}
                  <div
                    className="button-background"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: colors.blackAndWhite.white,
                      borderRadius: '300px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      transition: 'transform 0.3s ease',
                      zIndex: 0
                    }}
                  />
                  {/* Content that stays same size */}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <PlaySmall color={colors.marketplace.violet700} />
                    <span style={{
                      ...typography.styles.navS,
                      color: colors.blackAndWhite.black900
                    }}>
                      WATCH VIDEOS
                    </span>
                  </div>
                </button>
              </div>

              {/* Bottom Text - Left Aligned */}
              <div style={{ textAlign: 'left', width: '100%' }}>
                <h3 style={{
                  ...typography.styles.subheadingM,
                  color: colors.blackAndWhite.white,
                  margin: '0 0 8px 0'
                }}>
                  Explore Products
                </h3>
                <p style={{
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.white,
                  opacity: 0.8,
                  margin: 0
                }}>
                  Learn more about each apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
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

      {/* Ask Korra AI Section */}
      <div style={{ marginTop: '60px' }}>
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
            backgroundColor: colors.blackAndWhite.white,
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
              color: colors.blackAndWhite.black900
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

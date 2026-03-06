import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { colors, typography, spacing, borderRadius, ThemeProvider } from '@design-library/tokens';
import {
  S2ArrowRightSmall,
  S1ArrowRightSmall,
  GraphSmall,
  KeyTermsSmall,
  ValuationsSmall,
  BordereauSmall,
  TrianglesSmall,
  PlaySmall
} from '@design-library/icons';
import { createNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';

interface HomeTestProps {
  onNavigateToPage?: NavigationHandler;
}

export const TransactionHome: React.FC<HomeTestProps> = ({ onNavigateToPage }) => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(null);
  const [isStartButtonHovered, setIsStartButtonHovered] = useState(false);
  const [hoveredVideoIndex, setHoveredVideoIndex] = useState<number | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'WELCOME', isActive: true }
  ];

  // Create navigation handler
  const navigationHandler = onNavigateToPage ? createNavigationHandler(onNavigateToPage) : undefined;

  // Carousel items for "How to get started?" card
  const carouselItems = [
    {
      badge: 'AI POWERED',
      title: 'Create your first transaction',
      description: 'To see the full potential of Korra and its features you need to create a transaction. Upload your key terms, policy, claims, premiums, losses...',
      buttonText: 'START',
      onClick: () => onNavigateToPage?.('reports-new-transaction-form')
    }
  ];

  // Action buttons data with hover states
  const actionButtons = [
    {
      icon: GraphSmall,
      iconBgColor: colors.reports.blue700,
      iconColor: colors.reports.blue900,
      hoverBgColor: colors.contracts.dynamic.yellow200,
      label: 'View Portfolio Performances',
      onClick: () => onNavigateToPage?.('analytics-valuation-dashboard')
    },
    {
      icon: KeyTermsSmall,
      iconBgColor: '#FBDB6B', // Contracts theme main color from Figma
      iconColor: colors.contracts.yellow900,
      hoverBgColor: colors.contracts.dynamic.yellow200,
      label: 'Extract Key Terms',
      onClick: () => onNavigateToPage?.('contracts-ai-extraction')
    },
    {
      icon: ValuationsSmall,
      iconBgColor: colors.analytics.green700,
      iconColor: colors.analytics.green900,
      hoverBgColor: colors.contracts.dynamic.yellow200,
      label: 'See Valuations',
      onClick: () => onNavigateToPage?.('analytics-valuation-dashboard')
    },
    {
      icon: BordereauSmall,
      iconBgColor: colors.reports.blue700,
      iconColor: colors.reports.blue900,
      hoverBgColor: colors.contracts.dynamic.yellow200,
      label: 'Set up and Upload Bordereau',
      onClick: () => onNavigateToPage?.('reports-bdx-upload')
    },
    {
      icon: TrianglesSmall,
      iconBgColor: colors.analytics.green700,
      iconColor: colors.analytics.green900,
      hoverBgColor: colors.contracts.dynamic.yellow200,
      label: 'View Triangles',
      onClick: () => onNavigateToPage?.('analytics-valuation-status')
    }
  ];

  // Video demos data
  const videoDemos = [
    {
      title: 'Reports',
      description: 'Automate and streamline bordereaux management',
      duration: '2:30',
      thumbnail: '/Reports.png',
      bgColor: colors.reports.blue800
    },
    {
      title: 'Analytics',
      description: 'Assess and boost portfolio profitability',
      duration: '2:30',
      thumbnail: '/analytics.png',
      bgColor: colors.analytics.green800
    },
    {
      title: 'Contracts',
      description: 'Convert agreements into actionable data',
      duration: '2:30',
      thumbnail: '/Contracts.png',
      bgColor: '#FBDB6B'
    }
  ];

  return (
    <ThemeProvider initialTheme="reports">
      <Layout
        pageType="home"
        pageTitle="Home"
        onNavigate={navigationHandler}
        onInboxClick={() => {
          console.log('Inbox clicked');
        }}
        onAskQuillClick={() => {
          console.log('Ask Quill clicked');
        }}
      >
        {/* Welcome Title */}
        <div style={{ marginBottom: '70px' }}>
          <h1 style={{
            fontFamily: 'Bradford LL',
            fontSize: '42px',
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-1.4px',
            color: colors.blackAndWhite.black900,
            margin: 0
          }}>
            Welcome to Korra, <span style={{ color: colors.blackAndWhite.black900 }}>Sebastian.</span><br />
            <span style={{ color: colors.blackAndWhite.black500 }}>Here's few actions you can take to get started.</span>
          </h1>
        </div>

        {/* Main Content - Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          gap: '20px',
          marginBottom: '70px'
        }}>
          {/* Left Card - How to get started? */}
          <div style={{
            backgroundColor: colors.reports.blue700,
            borderRadius: borderRadius[16],
            padding: '10px',
            boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.06)',
            height: '390px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Card Header */}
            <div style={{
              padding: '10px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '56px'
            }}>
              <h3 style={{
                fontFamily: 'Söhne',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.2,
                color: colors.blackAndWhite.black900,
                margin: 0
              }}>
                How to get started?
              </h3>

              {/* Navigation Arrows */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentCarouselIndex(Math.max(0, currentCarouselIndex - 1))}
                  disabled={currentCarouselIndex === 0}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#83C9ED',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: currentCarouselIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentCarouselIndex === 0 ? 0.5 : 1
                  }}
                >
                  <div style={{ transform: 'rotate(180deg)' }}>
                    <S2ArrowRightSmall color={colors.blackAndWhite.black900} />
                  </div>
                </button>
                <button
                  onClick={() => setCurrentCarouselIndex(Math.min(carouselItems.length - 1, currentCarouselIndex + 1))}
                  disabled={currentCarouselIndex === carouselItems.length - 1}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#83C9ED',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: currentCarouselIndex === carouselItems.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentCarouselIndex === carouselItems.length - 1 ? 0.5 : 1
                  }}
                >
                  <S2ArrowRightSmall color={colors.blackAndWhite.black900} />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              borderRadius: borderRadius[8],
              height: '300px',
              padding: '21px 23px 20px 23px',
              position: 'relative'
            }}>
              {/* Content wrapper with natural flow */}
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* AI Powered Badge */}
                <div style={{
                  backgroundColor: '#F9F6F0',
                  borderRadius: borderRadius[24],
                  padding: '6px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  marginBottom: '10px'
                }}>
                  <span style={{
                    fontFamily: 'Söhne Mono',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: colors.blackAndWhite.black900,
                    lineHeight: 1.2
                  }}>
                    {carouselItems[currentCarouselIndex].badge}
                  </span>
                </div>

                {/* Title */}
                <h4 style={{
                  fontFamily: 'Söhne',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  margin: '0 0 10px 0'
                }}>
                  {carouselItems[currentCarouselIndex].title}
                </h4>

                {/* Description - aligned with image box start (11px from right) */}
                <p style={{
                  fontFamily: 'Söhne',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black500,
                  margin: 0,
                  paddingRight: '205px'
                }}>
                  {carouselItems[currentCarouselIndex].description}
                </p>
              </div>

              {/* Transaction Form Preview Image */}
              <div style={{
                position: 'absolute',
                right: '11px',
                top: '76px',
                width: '194px',
                height: '214px',
                backgroundColor: '#F9F6F0',
                borderRadius: borderRadius[4],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src="/carousel-image.svg"
                  alt="Transaction form preview"
                  style={{
                    width: '85%',
                    height: '85%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* START Button */}
              <button
                onClick={carouselItems[currentCarouselIndex].onClick}
                onMouseEnter={() => setIsStartButtonHovered(true)}
                onMouseLeave={() => setIsStartButtonHovered(false)}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{
                  fontFamily: 'Söhne Mono',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: colors.blackAndWhite.black900,
                  textDecoration: isStartButtonHovered ? 'underline' : 'none',
                  transition: 'text-decoration 0.2s ease'
                }}>
                  start
                </span>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: borderRadius[8],
                  backgroundColor: colors.reports.blue700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isStartButtonHovered ? 'translateX(5px)' : 'translateX(0)',
                  transition: 'transform 0.2s ease'
                }}>
                  <S1ArrowRightSmall color={colors.blackAndWhite.black900} />
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {actionButtons.map((button, index) => {
              const isHovered = hoveredButtonIndex === index;
              return (
                <button
                  key={index}
                  onClick={button.onClick}
                  onMouseEnter={() => setHoveredButtonIndex(index)}
                  onMouseLeave={() => setHoveredButtonIndex(null)}
                  style={{
                    height: '70px',
                    backgroundColor: isHovered ? button.hoverBgColor : colors.blackAndWhite.white,
                    border: `1px solid ${colors.blackAndWhite.black100}`,
                    borderRadius: borderRadius[16],
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: button.iconBgColor,
                      borderRadius: borderRadius[4],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <button.icon color={button.iconColor} />
                    </div>
                    <span style={{
                      fontFamily: 'Söhne',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: isHovered ? colors.blackAndWhite.black900 : colors.blackAndWhite.black800,
                      transition: 'color 0.2s ease'
                    }}>
                      {button.label}
                    </span>
                  </div>

                  {/* Arrow - circular black button when hovered */}
                  {isHovered ? (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: colors.blackAndWhite.black900,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <S1ArrowRightSmall color={colors.blackAndWhite.white} />
                    </div>
                  ) : (
                    <S1ArrowRightSmall color={colors.blackAndWhite.black900} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Demos Section */}
        <div>
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
            Or Watch Product Demos
          </p>

          {/* Video Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {videoDemos.map((video, index) => {
              const isHovered = hoveredVideoIndex === index;
              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Video Thumbnail */}
                  <div
                    onMouseEnter={() => setHoveredVideoIndex(index)}
                    onMouseLeave={() => setHoveredVideoIndex(null)}
                    style={{
                      position: 'relative',
                      height: '170px',
                      borderRadius: borderRadius[16],
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: '#F9F6F0'
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease'
                      }}
                    />

                    {/* Black Overlay - fades out on hover */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      opacity: isHovered ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none'
                    }} />

                    {/* Play Button Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '44px',
                      height: '29px',
                      backgroundColor: colors.blackAndWhite.white,
                      borderRadius: borderRadius[24],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      zIndex: 1
                    }}>
                      <PlaySmall color={video.bgColor} />
                    </div>
                  </div>

                  {/* Video Info */}
                  <div style={{
                    padding: '0 10px'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{
                        fontFamily: 'Söhne',
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color: colors.blackAndWhite.black900
                      }}>
                        {video.title}
                      </span>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}>
                        <p style={{
                          fontFamily: 'Söhne',
                          fontSize: '12px',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          color: colors.blackAndWhite.black500,
                          margin: 0,
                          flex: 1
                        }}>
                          {video.description}
                        </p>
                        <span style={{
                          fontFamily: 'Söhne',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          color: colors.blackAndWhite.black500,
                          whiteSpace: 'nowrap'
                        }}>
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

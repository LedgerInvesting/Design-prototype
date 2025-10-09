import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { colors, typography, spacing, borderRadius, useSemanticColors, ThemeProvider } from '@design-library/tokens';
import { S1ArrowRightMedium } from '@design-library/icons';
import { createNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface HomeTestProps {
  onNavigateToPage?: NavigationHandler;
}

export const HomeTest: React.FC<HomeTestProps> = ({ onNavigateToPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDealSlide, setCurrentDealSlide] = useState(0);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'HOME', isActive: true }
  ];

  // Create navigation handler that properly maps sidebar navigation to pages
  const navigationHandler = onNavigateToPage ? createNavigationHandler(onNavigateToPage) : undefined;

  // Chart data for Popular Deals - initialized once with useState to prevent regeneration on re-renders
  const [chartData1] = useState(() => [
    { month: 'Jan', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Feb', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Mar', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Apr', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'May', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Jun', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Jul', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Aug', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Sep', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Oct', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Nov', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Dec', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
  ]);

  const [chartData2] = useState(() => [
    { month: 'Jan', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Feb', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Mar', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Apr', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'May', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Jun', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Jul', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Aug', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Sep', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Oct', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Nov', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Dec', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
  ]);

  const [chartData3] = useState(() => [
    { month: 'Jan', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Feb', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Mar', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Apr', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'May', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Jun', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Jul', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Aug', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Sep', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Oct', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Nov', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
    { month: 'Dec', value1: 10 + Math.random() * 80, value2: 10 + Math.random() * 80 },
  ]);

  // Popular deals data
  const popularDeals = [
    {
      title: 'AmWINS GL 2022 RLP',
      subtitle: 'US Casualty',
      chartData: chartData1
    },
    {
      title: 'Commercial Auto FL 2024',
      subtitle: 'US Casualty',
      chartData: chartData2
    },
    {
      title: 'Coastal Property CA 2025',
      subtitle: 'US Property',
      chartData: chartData3
    }
  ];

  // Catch up cards data
  const catchUpCards = [
    {
      category: 'Analytics',
      color: colors.analytics.green700,
      title: 'You have 1 new messages',
      content: (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: '140px',
            height: '180px',
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      ),
      timestamp: 'Today'
    },
    {
      category: 'Reports',
      color: colors.reports.blue700,
      title: '3 Changes have been done',
      content: (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: '140px',
            height: '180px',
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      ),
      timestamp: 'Today'
    },
    {
      category: 'Contract',
      color: colors.analytics.green700,
      title: '3 Changes have been done',
      content: (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: '140px',
            height: '180px',
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      ),
      timestamp: 'Today'
    },
    {
      category: 'Contract',
      color: colors.warning.fill,
      title: '3 Changes have been done',
      content: (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: '140px',
            height: '180px',
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      ),
      timestamp: 'Today'
    },
    {
      category: 'Marketplace',
      color: colors.marketplace.violet700,
      title: 'New offering available',
      content: (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: '140px',
            height: '180px',
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      ),
      timestamp: 'Yesterday'
    },
    {
      category: 'Analytics',
      color: colors.analytics.green700,
      title: '2 Reports ready for review',
      content: (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: '140px',
            height: '180px',
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      ),
      timestamp: 'Yesterday'
    },
    {
      category: 'Reports',
      color: colors.reports.blue700,
      title: 'Quarterly summary completed',
      content: (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: '140px',
            height: '180px',
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      ),
      timestamp: '2 days ago'
    }
  ];

  const totalSlides = Math.ceil(catchUpCards.length / 3); // Show 3 cards at a time

  return (
    <ThemeProvider initialTheme="reports">
      <Layout
      breadcrumbs={breadcrumbs}
      maxWidth="1400px"
      selectedSidebarItem="home"
      onNavigate={navigationHandler}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
    >
      {/* Welcome Section */}
      <div style={{ marginBottom: '60px' }}>
          <h1 style={{
            ...typography.styles.headlineH1,
            color: colors.blackAndWhite.black900,
            marginBottom: '8px'
          }}>
            Welcome Sarah, Start your day<br />
            <span style={{ color: colors.blackAndWhite.black500 }}>with the 7 Catch up cards.</span>
          </h1>
        </div>

        {/* Catch up Section */}
        <div style={{ marginBottom: '20px' }}>
          {/* Container Card with Carousel */}
          <div style={{
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[16],
            padding: '30px',
            border: `1px solid ${colors.blackAndWhite.black100}`,
            overflow: 'hidden'
          }}>
            <h3 style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black900,
              marginBottom: '24px'
            }}>
              Catch up
            </h3>
            {/* Cards Carousel */}
            <div style={{
              display: 'flex',
              gap: '30px',
              transition: 'transform 0.3s ease',
              transform: `translateX(-${currentSlide * 330}px)` // 300px width + 30px gap
            }}>
              {catchUpCards.map((card, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '300px',
                    width: '300px',
                    backgroundColor: card.color,
                    borderRadius: borderRadius[16],
                    padding: '24px',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                      <div style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        backgroundColor: colors.blackAndWhite.white,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}>
                        <S1ArrowRightMedium color={colors.blackAndWhite.black900} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                      <span style={{
                        ...typography.styles.captionS,
                        color: colors.blackAndWhite.black900
                      }}>
                        {card.category}
                      </span>
                    </div>
                    <h4 style={{
                      ...typography.styles.subheadingM,
                      color: colors.blackAndWhite.black900,
                      marginBottom: '30px'
                    }}>
                      {card.title}
                    </h4>
                    {card.content}
                  </div>
                  <div style={{
                    ...typography.styles.bodyS,
                    color: colors.blackAndWhite.black700,
                    marginTop: '12px'
                  }}>
                    {card.timestamp}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '30px'
            }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: currentSlide === index ? '25px' : '6px',
                    height: '6px',
                    borderRadius: borderRadius.absolute,
                    backgroundColor: currentSlide === index ? colors.blackAndWhite.black900 : colors.blackAndWhite.black300,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Popular Deals & Activity Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Popular Deals Card */}
          <div style={{
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[16],
            padding: '30px',
            border: `1px solid ${colors.blackAndWhite.black100}`
          }}>
            <h3 style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black900,
              marginBottom: '24px'
            }}>
              Popular Deals
            </h3>
            <div style={{
              backgroundColor: colors.marketplace.violet700,
              borderRadius: borderRadius[16],
              padding: '24px',
              aspectRatio: '4/2',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                <div style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: colors.blackAndWhite.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const nextSlide = (currentDealSlide + 1) % popularDeals.length;
                  setCurrentDealSlide(nextSlide);
                }}
                >
                  <S1ArrowRightMedium color={colors.blackAndWhite.black900} />
                </div>
              </div>
              <div>
                <div>
                  <h4 style={{
                    ...typography.styles.subheadingM,
                    color: colors.blackAndWhite.black900,
                    marginBottom: '4px'
                  }}>
                    {popularDeals[currentDealSlide].title}
                  </h4>
                  <p style={{
                    ...typography.styles.captionS,
                    color: colors.blackAndWhite.black700,
                    margin: 0
                  }}>
                    {popularDeals[currentDealSlide].subtitle}
                  </p>
                </div>
              </div>
              {/* Bar chart */}
              <div style={{ width: '100%', height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={popularDeals[currentDealSlide].chartData} barGap={10} barCategoryGap={10}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: colors.blackAndWhite.black900, fontSize: 10, fontFamily: 'Söhne' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: colors.blackAndWhite.white,
                        border: `1px solid ${colors.blackAndWhite.black100}`,
                        borderRadius: borderRadius[8],
                        padding: '8px 12px'
                      }}
                      labelStyle={{
                        ...typography.styles.bodyM,
                        color: colors.blackAndWhite.black900,
                        marginBottom: '4px'
                      }}
                      itemStyle={{
                        ...typography.styles.bodyS,
                        color: colors.blackAndWhite.black700
                      }}
                      formatter={(value: number) => `${Math.round(value)}%`}
                      cursor={{ fill: 'rgba(100, 62, 216, 0.15)' }}
                    />
                    <Bar dataKey="value1" fill="rgba(107, 70, 193, 0.6)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="value2" fill="rgba(107, 70, 193, 0.4)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Navigation Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '16px'
            }}>
              {popularDeals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDealSlide(index)}
                  style={{
                    width: currentDealSlide === index ? '25px' : '6px',
                    height: '6px',
                    borderRadius: currentDealSlide === index ? '4px' : '50%',
                    backgroundColor: currentDealSlide === index ? colors.blackAndWhite.black900 : colors.blackAndWhite.black300,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Activity Card */}
          <div style={{
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[16],
            padding: '30px',
            border: `1px solid ${colors.blackAndWhite.black100}`
          }}>
            <h3 style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black900,
              marginBottom: '24px'
            }}>
              Activity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {[
                { text: 'New deal available:', bold: 'Property Catastrophe Bond', link: 'View Document' },
                { text: 'Webinar Coming:', bold: 'What is ILS?', link: 'View Document' },
                { text: 'Scor US... offering premium is', bold: 'up', link: 'View Offer' },
                { text: 'Michael Chen added a new', bold: 'document', link: 'View Document' },
                { text: 'Market update:', bold: 'Q4 Reinsurance Trends', link: 'Read More' },
                { text: 'New message from', bold: 'Sarah Williams', link: 'View Message' },
                { text: 'Contract renewal due:', bold: 'Commercial Auto FL', link: 'View Contract' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      minWidth: '30px',
                      minHeight: '30px',
                      backgroundColor: colors.reports.dynamic.blue300,
                      borderRadius: borderRadius[4],
                      flexShrink: 0
                    }} />
                    <div style={{
                      ...typography.styles.bodyL,
                      color: colors.blackAndWhite.black700
                    }}>
                      {item.text} <span style={{ fontWeight: 600, color: colors.blackAndWhite.black900 }}>{item.bold}</span>
                    </div>
                  </div>
                  <a href="#" style={{
                    ...typography.styles.bodyS,
                    color: colors.blackAndWhite.black500,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    marginLeft: '12px'
                  }}>
                    {item.link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
};


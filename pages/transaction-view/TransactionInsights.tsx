import React from 'react'
import { Card, MenuDropdown } from '@design-library/components'
import { colors, typography, borderRadius, shadows } from '@design-library/tokens'
import { ExpandMedium } from '@design-library/icons'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  ScatterChart,
  Scatter,
  Cell,
  ZAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts'

interface TransactionInsightsProps {
  transactionName?: string
}

const chartData = [
  { year: 2021, premium: 0 },
  { year: 2021.25, premium: 5 },
  { year: 2021.5, premium: 12 },
  { year: 2021.75, premium: 18 },
  { year: 2022, premium: 20 },
  { year: 2022.25, premium: 19 },
  { year: 2023, premium: 21 },
  { year: 2023.25, premium: 21.5 },
  { year: 2023.75, premium: 21.3 },
  { year: 2024, premium: 20.8 },
]

const premiumCap = 25

const largeLossData = [
  { time: 5.8, loss: 120 },
  { time: 6.5, loss: 1100 },
]

const timeLabels = ['0D', '1WK', '1MO', '3MOS', '6MOS', '1YR', '2YRS', '3YRS']
const timeValues = [0, 1, 2, 3, 4, 5, 6, 7]

const claimSeverityData = [
  { loss: 100, claims: 8 },
  { loss: 500, claims: 14 },
  { loss: 1000, claims: 16 },
  { loss: 2000, claims: 20 },
  { loss: 5000, claims: 28 },
  { loss: 10000, claims: 36 },
  { loss: 15000, claims: 32 },
  { loss: 20000, claims: 22 },
  { loss: 30000, claims: 33 },
  { loss: 40000, claims: 38 },
  { loss: 50000, claims: 43 },
  { loss: 60000, claims: 53 },
  { loss: 70000, claims: 68 },
  { loss: 80000, claims: 75 },
  { loss: 90000, claims: 58 },
  { loss: 100000, claims: 20 },
  { loss: 200000, claims: 14 },
  { loss: 500000, claims: 5 },
  { loss: 750000, claims: 3 },
  { loss: 1000000, claims: 2 },
]

const lossRatiosData = [
  { year: 0, earnedPremium: 0, incurredLoss: 0 },
  { year: 0.2, earnedPremium: 1, incurredLoss: 0.5 },
  { year: 0.4, earnedPremium: 2.5, incurredLoss: 1.2 },
  { year: 0.6, earnedPremium: 4, incurredLoss: 2 },
  { year: 0.8, earnedPremium: 5.5, incurredLoss: 3 },
  { year: 1, earnedPremium: 7, incurredLoss: 3.5 },
  { year: 1.2, earnedPremium: 8, incurredLoss: 4 },
  { year: 1.4, earnedPremium: 9, incurredLoss: 4.5 },
  { year: 1.6, earnedPremium: 10, incurredLoss: 5.5 },
  { year: 1.8, earnedPremium: 10.5, incurredLoss: 6 },
  { year: 2, earnedPremium: 11, incurredLoss: 6.5 },
  { year: 2.2, earnedPremium: 11.5, incurredLoss: 7 },
  { year: 2.4, earnedPremium: 11.8, incurredLoss: 8 },
  { year: 2.6, earnedPremium: 12, incurredLoss: 9 },
  { year: 2.8, earnedPremium: 12, incurredLoss: 9.5 },
  { year: 3, earnedPremium: 11.8, incurredLoss: 10 },
]

const lossDevelopmentData = [
  { date: 'Jan 2022', value: 100 },
  { date: 'Apr 2022', value: 40 },
  { date: 'Jul 2022', value: 120 },
  { date: 'Oct 2022', value: 60 },
  { date: 'Jan 2023', value: 70 },
  { date: 'Apr 2023', value: 65 },
  { date: 'Jul 2023', value: 30 },
  { date: 'Oct 2023', value: 65 },
  { date: 'Jan 2024', value: 45 },
  { date: 'Apr 2024', value: 25 },
]

export const TransactionInsights: React.FC<TransactionInsightsProps> = ({
  transactionName = 'Transaction'
}) => {
  const [selectedYear, setSelectedYear] = React.useState('2022')

  const yearOptions = [
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '50px',
      paddingBottom: '40px',
      width: '100%'
    }}>
      {/* Content Layout - Text Info + Card (Section 1) */}
      <div style={{
        display: 'flex',
        gap: '100px',
        alignItems: 'flex-start'
      }}>
        {/* Left Side - Text Information */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: '0 0 30%',
          paddingTop: '35px'
        }}>
          <div style={{
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900
          }}>
            Policy BDX Data
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400
          }} />

          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500
          }}>
            Track the premium volume written by the policy group over time and assess the probability that the total premium volume will be materially different from expectations.
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              CURRENT WRITTEN PREMIUM
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              $45.9M
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              PROJECTED WRITTEN PREMIUM
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              $59.3M
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              PROBABILITY OF EXCEEDING PREMIUM CAP
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              32.2%
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />
        </div>

        {/* Right Side - Card */}
        <Card
          style={{
            flex: 1,
            padding: 0
          }}
        >
          {/* Year Dropdown Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <div style={{ flex: 1 }} />
            <MenuDropdown
              selectedPrefix="Year"
              value={selectedYear}
              options={yearOptions}
              onChange={setSelectedYear}
              showBorder={false}
            />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {}} // TODO: Implement expand functionality
                style={{
                  backgroundColor: colors.reports.dynamic.blue200,
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px'
                }}
              >
                <ExpandMedium color={colors.blackAndWhite.black900} />
              </button>
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400,
            marginBottom: '20px'
          }} />

          <div style={{ position: 'relative', width: '100%', height: '320px' }}>
            <div style={{
              position: 'absolute',
              left: '-10px',
              top: '50%',
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center',
              ...typography.styles.dataXS,
              color: colors.blackAndWhite.black500,
              whiteSpace: 'nowrap'
            }}>
              Written Premium
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 40, left: 10, bottom: 25 }}>
                <defs>
                  <pattern
                    id="redStripePattern"
                    patternUnits="userSpaceOnUse"
                    width="4"
                    height="4"
                    patternTransform="rotate(45)"
                  >
                    <rect width="4" height="4" fill="transparent" />
                    <line x1="0" y1="0" x2="0" y2="4" stroke="#F07275" strokeWidth="1" />
                  </pattern>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke={colors.reports.dynamic.blue400}
                />

                <XAxis
                  dataKey="year"
                  type="number"
                  domain={[2021, 2024]}
                  ticks={[2021, 2022, 2023, 2024]}
                  axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  label={{ value: 'Evaluation Date', position: 'bottom', offset: 0, style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 } }}
                />

                <YAxis
                  domain={[0, 30]}
                  ticks={[0, 10, 15, 20, 25, 30]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  tickFormatter={(value) => `$${value}M`}
                />

                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const value = payload[0].value;
                      return (
                        <div style={{
                          backgroundColor: colors.blackAndWhite.white,
                          padding: '10px',
                          borderRadius: borderRadius[8],
                          boxShadow: shadows.small,
                          ...typography.styles.bodyS,
                          color: colors.blackAndWhite.black500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: colors.reports.blue700,
                            borderRadius: '2px'
                          }} />
                          <p style={{ margin: 0 }}>{`$${value}M written premium`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <ReferenceLine x={2021.5} stroke={colors.reports.dynamic.blue400} strokeDasharray="3 3" />
                <ReferenceLine x={2022.5} stroke={colors.reports.dynamic.blue400} strokeDasharray="3 3" />
                <ReferenceLine x={2023.5} stroke={colors.reports.dynamic.blue400} strokeDasharray="3 3" />

                <ReferenceArea
                  x1={2021}
                  x2={2022}
                  fill={colors.reports.blue700}
                  fillOpacity={0.15}
                />

                <ReferenceArea
                  y1={25}
                  y2={30}
                  fill="url(#redStripePattern)"
                  fillOpacity={0.4}
                />

                <ReferenceLine
                  y={premiumCap}
                  stroke="#F07275"
                  strokeWidth={2}
                />

                <Area
                  type="monotone"
                  dataKey="premium"
                  stroke={colors.reports.blue700}
                  fill={colors.reports.blue700}
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Content Layout - Text Info + Card (Section 2 - Large Losses) */}
      <div style={{
        display: 'flex',
        gap: '100px',
        alignItems: 'flex-start'
      }}>
        {/* Left Side - Text Information */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: '0 0 30%',
          paddingTop: '35px'
        }}>
          <div style={{
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900
          }}>
            Large Losses
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400
          }} />

          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500
          }}>
            Large losses are claims that cost an appreciable fraction of policy limits to settle. Track the behavior of large losses over time for this policy group.
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              IRR
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              18.7%
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              MOIC
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              1.42
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              WAL
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              2.5 YRS
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />
        </div>

        {/* Right Side - Card */}
        <Card
          style={{
            flex: 1,
            padding: 0
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <button
              onClick={() => {}} // TODO: Implement expand functionality
              style={{
                backgroundColor: colors.reports.dynamic.blue200,
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '4px'
              }}
            >
              <ExpandMedium color={colors.blackAndWhite.black900} />
            </button>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400,
            marginBottom: '20px'
          }} />

          <div style={{ position: 'relative', width: '100%', height: '320px', paddingLeft: '0px', paddingRight: '20px' }}>
            <div style={{
              position: 'absolute',
              left: '-15px',
              top: '50%',
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center',
              ...typography.styles.dataXS,
              color: colors.blackAndWhite.black500,
              whiteSpace: 'nowrap'
            }}>
              Reported Loss + DCC
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, left: 30, bottom: 25 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke={colors.reports.dynamic.blue400}
                />

                <XAxis
                  type="number"
                  dataKey="time"
                  domain={[-0.5, 7.5]}
                  ticks={timeValues}
                  tickFormatter={(value) => {
                    const index = timeValues.indexOf(value);
                    return index >= 0 ? timeLabels[index] : '';
                  }}
                  axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  label={{ value: 'Time Since Loss Occurence', position: 'bottom', offset: 0, style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 } }}
                  allowDataOverflow={true}
                />

                <YAxis
                  type="number"
                  dataKey="loss"
                  domain={[0, 1200]}
                  ticks={[0, 10, 100, 1000]}
                  axisLine={false}
                  tickLine={false}
                  allowDataOverflow={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  tickFormatter={(value) => {
                    if (value === 0) return '$0K';
                    if (value === 10) return '$10K';
                    if (value === 100) return '$100K';
                    if (value === 1000) return '$1M';
                    return `$${value}`;
                  }}
                />

                <ZAxis range={[64, 64]} />

                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const loss = payload[0].payload.loss;
                      const color = loss === 120 ? '#10B981' : '#F59E0B';
                      return (
                        <div style={{
                          backgroundColor: colors.blackAndWhite.white,
                          padding: '10px',
                          borderRadius: borderRadius[8],
                          boxShadow: shadows.small,
                          ...typography.styles.bodyS,
                          color: colors.blackAndWhite.black500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: color,
                            borderRadius: '2px'
                          }} />
                          <p style={{ margin: 0 }}>{`$${loss}K reported loss`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <ReferenceLine
                  y={500}
                  stroke={colors.reports.blue700}
                  strokeWidth={2}
                />

                <Scatter name="Large Losses" data={largeLossData}>
                  {largeLossData.map((entry, index) => {
                    const color = entry.loss === 120 ? '#10B981' : '#F59E0B';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Content Layout - Text Info + Card (Section 3 - Claim Severity) */}
      <div style={{
        display: 'flex',
        gap: '100px',
        alignItems: 'flex-start'
      }}>
        {/* Left Side - Text Information */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: '0 0 30%',
          paddingTop: '35px'
        }}>
          <div style={{
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900
          }}>
            Claim Severity
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400
          }} />

          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500
          }}>
            Better understand the distribution of claim severity within a policy group. How much of loss costs are being driven by the few largest claims? Is it typical for that line of business?
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              AVERAGE LOSS
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              $0
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              MEDIAN LOSS
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              $0
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              PERCENTILE LOSS
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              $0
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />
        </div>

        {/* Right Side - Card */}
        <Card
          style={{
            flex: 1,
            padding: 0
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <button
              onClick={() => {}} // TODO: Implement expand functionality
              style={{
                backgroundColor: colors.reports.dynamic.blue200,
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '4px'
              }}
            >
              <ExpandMedium color={colors.blackAndWhite.black900} />
            </button>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400,
            marginBottom: '20px'
          }} />

          <div style={{ position: 'relative', width: '100%', height: '320px' }}>
            <div style={{
              position: 'absolute',
              left: '-10px',
              top: '50%',
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center',
              ...typography.styles.dataXS,
              color: colors.blackAndWhite.black500,
              whiteSpace: 'nowrap'
            }}>
              Number of Claims
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={claimSeverityData} margin={{ top: 20, right: 40, left: 10, bottom: 25 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke={colors.reports.dynamic.blue400}
                />

                <XAxis
                  xAxisId="top"
                  dataKey="loss"
                  type="number"
                  scale="log"
                  domain={[100, 1000000]}
                  ticks={[100, 1000, 10000, 100000, 1000000]}
                  orientation="top"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  tickFormatter={(value) => {
                    if (value === 100) return '$100';
                    if (value === 1000) return '$1K';
                    if (value === 10000) return '$10K';
                    if (value === 100000) return '$100K';
                    if (value === 1000000) return '$1M';
                    return '';
                  }}
                />

                <YAxis
                  domain={[0, 80]}
                  ticks={[0, 20, 40, 60, 80]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                />

                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const claims = payload[0].value;
                      const loss = payload[0].payload.loss;
                      let lossLabel = '';
                      if (loss < 1000) lossLabel = `$${loss}`;
                      else if (loss < 1000000) lossLabel = `$${loss / 1000}K`;
                      else lossLabel = `$${loss / 1000000}M`;

                      return (
                        <div style={{
                          backgroundColor: colors.blackAndWhite.white,
                          padding: '10px',
                          borderRadius: borderRadius[8],
                          boxShadow: shadows.small,
                          ...typography.styles.bodyS,
                          color: colors.blackAndWhite.black500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: colors.reports.blue700,
                            borderRadius: '2px'
                          }} />
                          <p style={{ margin: 0 }}>{`${claims} claims at ${lossLabel}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Bar dataKey="claims" fill={colors.reports.blue700} radius={[4, 4, 0, 0]} />

                <XAxis
                  xAxisId="bottom"
                  dataKey="loss"
                  type="number"
                  scale="log"
                  domain={[100, 1000000]}
                  axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                  tickLine={false}
                  tick={false}
                  label={{ value: 'Reported Loss Amount', position: 'bottom', offset: 0, style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 } }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Content Layout - Text Info + Card (Section 4 - Loss Ratios) */}
      <div style={{
        display: 'flex',
        gap: '100px',
        alignItems: 'flex-start'
      }}>
        {/* Left Side - Text Information */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: '0 0 30%',
          paddingTop: '35px'
        }}>
          <div style={{
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900
          }}>
            Loss Ratios
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400
          }} />

          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500
          }}>
            Loss ratios are a crucial tool for understanding underwriting performance. See how different definitions of loss ratios evolve over time in response to new information.
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              TY22 PAID LOSS RATIO
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              18.7%
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              TY22 REPORTED LOSS RATIO
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              1.42
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              TY22 INCURRED LOSS RATIO
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              2.5 Y
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />
        </div>

        {/* Right Side - Card */}
        <Card
          style={{
            flex: 1,
            padding: 0
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <button
              onClick={() => {}} // TODO: Implement expand functionality
              style={{
                backgroundColor: colors.reports.dynamic.blue200,
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '4px'
              }}
            >
              <ExpandMedium color={colors.blackAndWhite.black900} />
            </button>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400,
            marginBottom: '20px'
          }} />

          <div style={{ position: 'relative', width: '100%', height: '320px' }}>
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center',
              ...typography.styles.dataXS,
              color: colors.blackAndWhite.black500,
              whiteSpace: 'nowrap'
            }}>
              Amount
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lossRatiosData} margin={{ top: 20, right: 40, left: 10, bottom: 25 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke={colors.reports.dynamic.blue400}
                />

                <XAxis
                  dataKey="year"
                  type="number"
                  domain={[0, 3]}
                  ticks={[1, 2, 3]}
                  axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  label={{ value: 'Year Since Treaty Start', position: 'bottom', offset: 0, style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 } }}
                />

                <YAxis
                  domain={[0, 12]}
                  ticks={[0, 2, 5, 8, 10, 12]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  tickFormatter={(value) => `${value}M`}
                />

                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div style={{
                          backgroundColor: colors.blackAndWhite.white,
                          padding: '10px',
                          borderRadius: borderRadius[8],
                          boxShadow: shadows.small,
                          ...typography.styles.bodyS,
                          color: colors.blackAndWhite.black500
                        }}>
                          {payload.map((entry, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: index < payload.length - 1 ? '4px' : '0' }}>
                              <div style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: entry.color,
                                borderRadius: '2px'
                              }} />
                              <p style={{ margin: 0 }}>{`${entry.name}: $${entry.value}M`}</p>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="earnedPremium"
                  stroke={colors.reports.blue700}
                  strokeWidth={2}
                  dot={false}
                  name="Earned Premium"
                />

                <Line
                  type="monotone"
                  dataKey="incurredLoss"
                  stroke="#F07275"
                  strokeWidth={2}
                  dot={false}
                  name="Incurred Loss"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Content Layout - Text Info + Card (Section 5 - Loss Development) */}
      <div style={{
        display: 'flex',
        gap: '100px',
        alignItems: 'flex-start'
      }}>
        {/* Left Side - Text Information */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: '0 0 30%',
          paddingTop: '35px'
        }}>
          <div style={{
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900
          }}>
            Loss Development
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400
          }} />

          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500
          }}>
            Loss development is the study of how loss ratios change over time as claims are reported, investigated, paid, and closed. Gain greater insight into the claim lifecycle for this policy group.
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              0-12 MONTH PAID ATA
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              2
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              0-12 MONTH REPORTED ATA
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              4
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              ...typography.styles.navS,
              color: colors.blackAndWhite.black500
            }}>
              12-24 MONTH PAID ATA
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900
            }}>
              6
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            borderTop: `1px dotted ${colors.reports.dynamic.blue400}`
          }} />
        </div>

        {/* Right Side - Card */}
        <Card
          style={{
            flex: 1,
            padding: 0
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <button
              onClick={() => {}} // TODO: Implement expand functionality
              style={{
                backgroundColor: colors.reports.dynamic.blue200,
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '4px'
              }}
            >
              <ExpandMedium color={colors.blackAndWhite.black900} />
            </button>
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: colors.reports.dynamic.blue400,
            marginBottom: '20px'
          }} />

          <div style={{ position: 'relative', width: '100%', height: '320px' }}>
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center',
              ...typography.styles.dataXS,
              color: colors.blackAndWhite.black500,
              whiteSpace: 'nowrap'
            }}>
              Percentage
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lossDevelopmentData} margin={{ top: 20, right: 40, left: 10, bottom: 25 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke={colors.reports.dynamic.blue400}
                />

                <XAxis
                  dataKey="date"
                  axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  label={{ value: 'Year Since Treaty Start', position: 'bottom', offset: 0, style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 } }}
                />

                <YAxis
                  domain={[0, 125]}
                  ticks={[0, 25, 50, 75, 100, 125]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const value = payload[0].value;
                      return (
                        <div style={{
                          backgroundColor: colors.blackAndWhite.white,
                          padding: '10px',
                          borderRadius: borderRadius[8],
                          boxShadow: shadows.small,
                          ...typography.styles.bodyS,
                          color: colors.blackAndWhite.black500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: colors.reports.blue700,
                            borderRadius: '2px'
                          }} />
                          <p style={{ margin: 0 }}>{`${value}%`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.reports.blue700}
                  strokeWidth={2}
                  dot={false}
                  name="Loss Development"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default TransactionInsights

'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import styles from './leads.module.scss';

interface Lead {
  id: string;
  company_name: string;
  website: string | null;
  email: string | null;
  source: string;
  lead_score: number;
  status: string;
  notes: string | null;
  followup_stage: number;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pitchingId, setPitchingId] = useState<string | null>(null);
  
  // NEW: State for Back to Top Button
  const [showTopBtn, setShowTopBtn] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads/');
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
      toast.error('Failed to load database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // NEW: Scroll Listener for the Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NEW: Scroll Action
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePitch = async (lead: Lead) => {
    setPitchingId(lead.id);
    const toastId = toast.loading(`Drafting & sending pitch to ${lead.company_name}...`);
    
    try {
      const res = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          companyName: lead.company_name,
          email: lead.email,
          notes: lead.notes,
        }),
      });

      if (res.ok) {
        toast.success(`Pitch successfully sent to ${lead.company_name}!`, { id: toastId });
        fetchLeads();
      } else {
        const errorData = await res.json();
        toast.error(`Pitch failed: ${errorData.error}`, { id: toastId });
      }
    } catch (err) {
      console.error('Pitch error:', err);
      toast.error('A critical error occurred while sending the pitch.', { id: toastId });
    } finally {
      setPitchingId(null);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Analytics Calculations
  const totalLeads = leads.length;
  const totalAudited = leads.filter((l) => l.status !== 'new').length;
  const totalPitched = leads.filter((l) => l.status !== 'new' && l.status !== 'audited').length;
  const totalFollowUps = leads.filter((l) => l.followup_stage > 0).length;
  const totalEngaged = leads.filter((l) => ['opened', 'clicked', 'replied'].includes(l.status)).length;

  const pitchRate = totalAudited > 0 ? Math.round((totalPitched / totalAudited) * 100) : 0;
  const engagementRate = totalPitched > 0 ? Math.round((totalEngaged / totalPitched) * 100) : 0;

  // Recharts Pipeline Data
  const pipelineData = [
    { name: 'Audited', count: totalAudited, fill: '#34d399' },
    { name: 'Pitched', count: totalPitched, fill: '#818cf8' },
    { name: 'Follow-ups', count: totalFollowUps, fill: '#22d3ee' },
    { name: 'Engaged', count: totalEngaged, fill: '#c084fc' },
  ];

  return (
    <div className={styles.dashboard}>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#161b22',
            color: '#fff',
            border: '1px solid #21262d',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#34d399', secondary: '#161b22' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#161b22' } },
        }} 
      />
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.lottieIcon}>
              <iframe 
                src="https://lottie.host/embed/eff89e5a-22dc-4b2e-98e5-afee165a30ee/Rmd1E60hr6.lottie" 
                style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', background: 'transparent' }}
                title="Coderon Animation"
              ></iframe>
            </div>
            <div>
              <div className={styles.typewriterWrapper}>
                <h1 className={styles.typewriterTitle}>CODERON</h1>
              </div>
              <p className={styles.subtitle}>Welcome back, Ron. Let's hunt.</p>
            </div>
          </div>

          <div className={styles.controls}>
            <input
              type="text"
              placeholder="Search leads or emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={fetchLeads} className={styles.syncBtn}>
              {loading ? 'Syncing...' : 'Sync Database'}
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className={styles.metrics}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Leads</span>
            <div className={styles.cardValue}>{totalLeads}</div>
            <div className={styles.statSubtext}>Raw database volume</div>
          </div>
          
          <div className={styles.card}>
            <span className={styles.cardLabel}>Audited & Ready</span>
            <div className={`${styles.cardValue} ${styles.valGreen}`}>{totalAudited}</div>
            <div className={styles.statSubtext}>Scraper completed</div>
          </div>
          
          <div className={styles.card}>
            <span className={styles.cardLabel}>Pitched</span>
            <div className={`${styles.cardValue} ${styles.valIndigo}`}>{totalPitched}</div>
            <div className={styles.statSubtext}>
              {pitchRate > 0 ? `${pitchRate}% of audited` : 'Outbound volume'}
            </div>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Follow-ups Sent</span>
            <div className={`${styles.cardValue} ${styles.valCyan}`}>{totalFollowUps}</div>
            <div className={styles.statSubtext}>Automated bumps</div>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Opened / Engaged</span>
            <div className={`${styles.cardValue} ${styles.valPurple}`}>{totalEngaged}</div>
            <div className={styles.statSubtextHighlight}>
              {engagementRate > 0 ? `${engagementRate}% conversion rate` : 'Awaiting data'}
            </div>
          </div>
        </div>

        {/* PIPELINE CHART */}
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Pipeline Conversion</h2>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={pipelineData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262d" horizontal={false} />
                <XAxis type="number" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#c9d1d9" fontSize={13} width={100} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1c2128' }}
                  contentStyle={{ backgroundColor: '#161b22', border: '1px solid #21262d', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company / URL</th>
                <th>Direct Email</th>
                <th>Source</th>
                <th>Score</th>
                <th>Status</th>
                <th>Audit Findings</th>
                <th className={styles.actionCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className={styles.companyName}>{lead.company_name}</div>
                    {lead.website ? (
                      <a href={lead.website} target="_blank" rel="noreferrer" className={styles.link}>
                        {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    ) : (
                      <span className={styles.na}>No Website</span>
                    )}
                  </td>
                  <td>
                    {lead.email ? (
                      <span className={styles.emailBadge}>{lead.email}</span>
                    ) : (
                      <span className={styles.na}>N/A</span>
                    )}
                  </td>
                  <td className={styles.sourceText}>{lead.source}</td>
                  <td>
                    <span className={lead.lead_score >= 90 ? styles.scoreGreen : styles.scoreAmber}>
                      {lead.lead_score}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        ['opened', 'clicked'].includes(lead.status)
                          ? styles.statusOpened
                          : lead.status === 'replied'
                          ? styles.statusReplied
                          : lead.status === 'pitched'
                          ? styles.statusPitched
                          : lead.status === 'audited'
                          ? styles.statusAudited
                          : styles.statusNew
                      }
                    >
                      {lead.status.toUpperCase()}
                      {lead.followup_stage > 0 && (
                        <span className={styles.followUpBadge}> +{lead.followup_stage}</span>
                      )}
                    </span>
                  </td>
                  <td className={styles.notes}>
                    {lead.notes && lead.notes.includes('⚠️') ? (
                      <span className={styles.warning}>{lead.notes}</span>
                    ) : (
                      lead.notes || 'Pending Audit'
                    )}
                  </td>
                  <td className={styles.actionCell}>
                    {lead.status === 'audited' && lead.email ? (
                      <button
                        className={styles.pitchBtn}
                        onClick={() => handlePitch(lead)}
                        disabled={pitchingId === lead.id}
                      >
                        {pitchingId === lead.id ? 'Sending...' : 'Send Pitch'}
                      </button>
                    ) : (
                      <span className={styles.na}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NEW: Back to Top Button */}
        {showTopBtn && (
          <button 
            className={styles.scrollTopBtn} 
            onClick={scrollToTop} 
            aria-label="Back to top"
          >
            ↑
          </button>
        )}

      </div>
    </div>
  );
}
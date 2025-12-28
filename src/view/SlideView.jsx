// src/views/SlideView.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useInView } from 'framer-motion';

// --- HELPER: COUNTING NUMBER COMPONENT ---
const Counter = ({ from, to, duration = 2 }) => {
    const nodeRef = useRef();
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const node = nodeRef.current;
        const controls = animate(from, to, {
            duration: duration,
            ease: "easeOut",
            onUpdate: (value) => {
                if(node) node.textContent = Math.round(value);
            }
        });
        return () => controls.stop();
    }, [from, to, duration, isInView]);

    return <span ref={nodeRef}>0</span>;
};

// --- MAIN VIEW COMPONENT ---
const SlideView = ({ data }) => {
  // State for Slide 8 (Interactive Challenges)
  const [revealedChallenges, setRevealedChallenges] = useState({});
  // State for Slide 17 (Finale Trigger)
  const [showFinale, setShowFinale] = useState(false);

  // Reset states when slide changes
  useEffect(() => {
    setRevealedChallenges({});
    setShowFinale(false); 
  }, [data]);

  const toggleChallenge = (index) => {
      setRevealedChallenges(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (!data) return null;

  // --- VARIANTS ---
  const textUp = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1.0, ease: "circOut" } } };
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } }, exit: { opacity: 0 } };
  
  // Specific Variants used in previous slides
  const heroText = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } } };
  const pathVariants = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } } };
  const coreCardVariant = { hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", duration: 1.5 } } };
  const lineDrawVariant = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { delay: 0.5, duration: 1 } } };
  const subCardVariant = { hidden: { y: 50, opacity: 0, rotateX: 90 }, visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring" } } };
  const statCardVariant = { hidden: { scale: 0.9, opacity: 0, y: 20 }, visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } };

  // Data Prep
  const mainCard = (data.type === 'grid' && data.cards) ? data.cards[0] : null;
  const subCards = (data.type === 'grid' && data.cards) ? data.cards.slice(1) : [];

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={data.id}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="slide-content"
        style={{ width: '100%', height: '100%' }}
      >
        
        {/* LAYOUT 1: TITLE */}
        {data.type === 'title' && (
            <div className="title-layout-cinematic">
                <motion.p variants={textUp} className="top-tagline">PROJECT CASE STUDY</motion.p>
                <motion.h1 variants={textUp} className="main-heading">{data.title}</motion.h1>
                <div className="ecg-container"><svg width="800" height="100" viewBox="0 0 800 100" fill="none"><motion.path d="M0 50 L300 50 L320 20 L340 80 L360 50 L800 50" stroke="#4facfe" strokeWidth="3" fill="none" variants={pathVariants} /></svg></div>
                <motion.div variants={heroText} className="hero-text-container"><h2 className="hero-text shimmer">{data.highlight}</h2></motion.div>
                <motion.p variants={textUp} className="cinematic-subtitle">{data.subtitle}</motion.p>
            </div>
        )}

        {/* LAYOUT 2: HUD */}
        {data.type === 'grid' && mainCard && (
            <div className="hud-layout">
                <motion.h1 variants={textUp} className="hud-title">{data.title}</motion.h1>
                <div className="hud-structure">
                    <motion.div variants={coreCardVariant} className="core-card-container"><div className="hud-card core-card glowing-border"><div className="card-header"><span className="icon-box">{mainCard.icon}</span><h3>{mainCard.label}</h3></div><p>{mainCard.text}</p></div></motion.div>
                    <svg className="hud-connectors" width="100%" height="100" viewBox="0 0 800 100" preserveAspectRatio="none"><motion.path d="M400 0 L400 20 L130 20 L130 100" stroke="#4facfe" strokeWidth="2" fill="none" variants={lineDrawVariant} /><motion.path d="M400 0 L400 100" stroke="#4facfe" strokeWidth="2" fill="none" variants={lineDrawVariant} /><motion.path d="M400 0 L400 20 L670 20 L670 100" stroke="#4facfe" strokeWidth="2" fill="none" variants={lineDrawVariant} /></svg>
                    <div className="sub-cards-row">{subCards.map((card, index) => (<motion.div key={index} variants={subCardVariant} className="hud-card sub-card" whileHover={{ scale: 1.05, borderColor: "#4facfe" }}><div className="card-icon-lg">{card.icon}</div><h4>{card.label}</h4>{card.text && <p>{card.text}</p>}{card.list && <ul>{card.list.map((l,i)=><li key={i}>{l}</li>)}</ul>}</motion.div>))}</div>
                </div>
            </div>
        )}

        {/* LAYOUT 3: STATS */}
        {data.type === 'stats' && (
            <div className="stats-layout">
                <div className="stats-header"><motion.h1 variants={textUp} className="slide-heading">{data.title}</motion.h1><motion.p variants={textUp} className="stats-subtitle">{data.subtitle}</motion.p></div>
                <div className="stats-content-wrapper">
                    <motion.div variants={statCardVariant} className="dual-role-card"><div className="role-icon">⚕️</div><h3>{data.dualRole.title}</h3><p>{data.dualRole.desc}</p><div className="role-badge">ACADEMIC + CLINICAL</div></motion.div>
                    <div className="stats-grid">{data.stats.map((stat, index) => (<motion.div key={index} variants={statCardVariant} className="stat-box" whileHover={{ y: -5, background: "rgba(255,255,255,0.1)" }}><div className="stat-icon">{stat.icon}</div><div className="stat-number"><Counter from={0} to={stat.value} /><span className="stat-suffix">{stat.suffix}</span></div><div className="stat-label">{stat.label}</div></motion.div>))}</div>
                </div>
            </div>
        )}

        {/* LAYOUT 4: CONVERGENCE */}
        {data.type === 'convergence' && (
            <div className="convergence-layout">
                <motion.div variants={textUp} className="convergence-header"><h4 className="top-label">{data.title}</h4><h1 className="slide-heading">{data.heading}</h1></motion.div>
                <div className="pillars-container">{data.domains.map((domain, index) => (<motion.div key={index} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.2, type: "spring" }} className="glass-pillar" style={{ '--accent-color': domain.accent }} whileHover={{ flexGrow: 2, backgroundColor: "rgba(255,255,255,0.08)" }}><div className="pillar-icon" style={{ textShadow: `0 0 20px ${domain.accent}` }}>{domain.icon}</div><h3 style={{ color: domain.accent }}>{domain.title}</h3><p>{domain.text}</p><div className="pillar-bar" style={{ background: domain.accent }}></div></motion.div>))}</div>
                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="takeaway-box"><div className="takeaway-icon">💡</div><p>{data.takeaway}</p></motion.div>
            </div>
        )}

        {/* LAYOUT 5: DICHOTOMY */}
        {data.type === 'dichotomy' && (
            <div className="dichotomy-layout">
                <motion.h1 variants={textUp} className="slide-heading">{data.title}</motion.h1>
                <div className="split-container">
                    <div className="pane left-pane chaotic-pane"><motion.div initial={{ opacity:0, x: -50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.8 }} className="pane-header" style={{ color: data.leftSide.accent }}><span className="pane-icon">{data.leftSide.icon}</span><h2>{data.leftSide.heading}</h2></motion.div><div className="pane-items">{data.leftSide.items.map((item, index) => (<motion.div key={index} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (index * 0.2), type: "spring" }} className={`data-block problem-block ${item.highlight ? 'highlight-red' : ''}`}><div className="block-icon">{item.icon}</div><p>{item.text}</p></motion.div>))}</div></div>
                    <motion.div initial={{ height: 0 }} animate={{ height: "80%" }} transition={{ duration: 1.5 }} className="central-divider"></motion.div>
                    <div className="pane right-pane ordered-pane"><motion.div initial={{ opacity:0, x: 50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="pane-header" style={{ color: data.rightSide.accent }}><span className="pane-icon">{data.rightSide.icon}</span><h2>{data.rightSide.heading}</h2></motion.div><div className="pane-items">{data.rightSide.items.map((item, index) => (<motion.div key={index} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + (index * 0.2), duration: 0.8 }} className="data-block solution-block"><div className="block-icon">{item.icon}</div><p>{item.text}</p></motion.div>))}</div></div>
                </div>
            </div>
        )}

        {/* LAYOUT 6: SELECTION */}
        {data.type === 'selection' && (
            <div className="selection-layout">
                <motion.div variants={textUp} className="selection-header"><h1 className="slide-heading">{data.heading}</h1></motion.div>
                <div className="selection-content">
                    <div className="process-column">{data.steps.map((step, index) => (<motion.div key={index} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.4, type: "spring" }} className="process-card"><div className="step-number">{step.id}</div><div className="step-text"><h3>{step.title}</h3><p>{step.desc}</p></div></motion.div>))}</div>
                    <div className="chart-column"><h3 className="chart-title">{data.scoring.title}</h3><div className="chart-wrapper"><svg width="300" height="300" viewBox="0 0 100 100" className="donut-chart">{data.scoring.data.map((segment, index) => { const totalPrev = data.scoring.data.slice(0, index).reduce((acc, curr) => acc + curr.value, 0); const rotationAngle = (totalPrev / 100) * 360; return (<motion.circle key={index} cx="50" cy="50" r="40" fill="transparent" stroke={segment.color} strokeWidth="8" pathLength="100" initial={{ strokeDasharray: "0 100" }} animate={{ strokeDasharray: `${segment.value} 100` }} transition={{ delay: 1 + (index * 0.3), duration: 1, ease: "easeOut" }} style={{ transformOrigin: "50px 50px", transform: `rotate(${rotationAngle - 90}deg)` }} whileHover={{ strokeWidth: 12, opacity: 0.8 }} />); })}<text x="50" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">100%</text></svg><div className="chart-legend">{data.scoring.data.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 + (i * 0.2) }} className="legend-item"><span className="dot" style={{ background: item.color }}></span><span className="label">{item.label}</span><span className="value" style={{ color: item.color }}>{item.value}%</span></motion.div>))}</div></div></div>
                </div>
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.5 }} className="committee-bar"><div className="committee-icon">👥</div><p>{data.committee}</p></motion.div>
            </div>
        )}

        {/* LAYOUT 7: ROADMAP */}
        {data.type === 'roadmap' && (
            <div className="roadmap-layout">
                <motion.div variants={textUp} className="roadmap-header"><h1 className="slide-heading">{data.heading}</h1><div className="strategy-alert"><span className="alert-icon">🛡️</span>{data.strategy}</div></motion.div>
                <div className="timeline-wrapper">
                    <div className="timeline-line-container"><svg width="100%" height="10" className="timeline-svg"><line x1="10%" y1="5" x2="90%" y2="5" stroke="rgba(255,255,255,0.1)" strokeWidth="4" /><motion.line x1="10%" y1="5" x2="90%" y2="5" stroke="#4facfe" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut" }} /></svg></div>
                    <div className="phases-container">{data.phases.map((phase, index) => (<div key={index} className="phase-wrapper"><motion.div initial={{ scale: 0, boxShadow: "0 0 0px rgba(0,0,0,0)" }} animate={{ scale: 1, boxShadow: `0 0 20px ${phase.color}` }} transition={{ delay: 0.5 + (index * 0.6), type: "spring", stiffness: 200 }} className="phase-dot" style={{ borderColor: phase.color, color: phase.color }}>{phase.icon}</motion.div><motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 40, opacity: 1 }} transition={{ delay: 0.7 + (index * 0.6), duration: 0.3 }} className="phase-connector" style={{ background: phase.color }}></motion.div><motion.div initial={{ y: 30, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.8 + (index * 0.6), type: "spring", bounce: 0.5 }} className="phase-card glass-card" style={{ borderTop: `4px solid ${phase.color}`, background: `linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 100%)` }} whileHover={{ y: -10, boxShadow: `0 10px 30px -10px ${phase.color}` }}><h2 className="phase-step" style={{ color: phase.color }}>{phase.step}</h2><h3 style={{ color: "#fff" }}>{phase.title}</h3><p>{phase.text}</p></motion.div></div>))}</div>
                </div>
            </div>
        )}

        {/* LAYOUT 8: INTERACTIVE CHALLENGES */}
        {data.type === 'challenges' && (
            <div className="challenges-layout">
                <motion.div variants={textUp} className="challenges-header"><h1 className="slide-heading" style={{ color: "#ff6b6b" }}>{data.heading}</h1><h4 className="top-label">{data.title}</h4></motion.div>
                <div className="pairs-container">{data.pairs.map((pair, index) => { const isOpen = revealedChallenges[index]; return (<div key={index} className="pair-row-wrapper" onClick={() => toggleChallenge(index)} style={{ cursor: 'pointer' }}><motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.2, duration: 0.5 }} className="pair-row"><motion.div className="challenge-block" animate={{ flex: isOpen ? 0.4 : 1 }} transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}><div className="block-content"><span className="block-icon shake-constant">{pair.challenge.icon}</span><h3>{pair.challenge.title}</h3></div>{!isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tap-hint">Tap to Reveal 👆</motion.div>)}</motion.div><motion.div className="solution-block" initial={{ flex: 0, opacity: 0 }} animate={{ flex: isOpen ? 0.6 : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}>{isOpen && (<div className="solution-content"><div className="solution-header"><span className="block-icon">{pair.solution.icon}</span><h4>SOLUTION APPLIED</h4></div><p>{pair.solution.text}</p></div>)}<div className="breakthrough-seam"></div></motion.div></motion.div></div>); })}</div>
            </div>
        )}

        {/* LAYOUT 9: TRAINING DASHBOARD */}
        {data.type === 'training' && (
            <div className="training-layout">
                <motion.div variants={textUp} className="training-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label">{data.title}</h4></motion.div>
                <div className="roles-container">{data.roles.map((role, index) => (<motion.div key={index} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + (index * 0.2), type: "spring" }} className="role-badge"><span className="role-icon">{role.icon}</span><span className="role-name">{role.title}</span></motion.div>))}</div>
                <div className="training-core"><motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8, type: "spring" }} className="method-card" style={{ borderLeft: `4px solid ${data.methods[0].accent}` }}><div className="method-icon" style={{color: data.methods[0].accent}}>{data.methods[0].icon}</div><h3>{data.methods[0].title}</h3><p>{data.methods[0].text}</p></motion.div><div className="volume-gauge-container"><svg width="250" height="250" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" /><motion.circle cx="100" cy="100" r="90" fill="none" stroke="#f1c40f" strokeWidth="10" strokeLinecap="round" pathLength="100" initial={{ strokeDasharray: "0 100" }} animate={{ strokeDasharray: "75 100" }} transition={{ delay: 1, duration: 2, ease: "easeOut" }} transform="rotate(-90 100 100)" /></svg><div className="gauge-text"><motion.h2 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }}>{data.volume}</motion.h2><span>HOURS</span></div></div><motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0, type: "spring" }} className="method-card" style={{ borderRight: `4px solid ${data.methods[1].accent}` }}><div className="method-icon" style={{color: data.methods[1].accent}}>{data.methods[1].icon}</div><h3>{data.methods[1].title}</h3><p>{data.methods[1].text}</p></motion.div></div>
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }} className="support-banner"><div className="support-icon">🛠️</div><div className="support-text"><strong>SUPPORT:</strong> {data.support}</div></motion.div>
            </div>
        )}

        {/* LAYOUT 10: USER ACCEPTANCE */}
        {data.type === 'acceptance' && (
            <div className="acceptance-layout">
                <motion.div variants={textUp} className="acceptance-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label" style={{color: '#a8ffc3'}}>{data.title}</h4></motion.div>
                <div className="acceptance-grid">
                    <div className="metrics-col"><h3>Input Metrics</h3>{data.metrics.map((metric, index) => (<motion.div key={index} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.3, type: 'spring' }} className="metric-block"><span className="metric-icon">{metric.icon}</span><span>{metric.title}</span></motion.div>))}<div className="connector-line-right"></div></div>
                    <div className="graph-col"><h3>{data.trends.heading}</h3><p>{data.trends.text}</p><div className="graph-container"><svg viewBox="0 0 500 250" className="success-graph"><line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.1)" /><line x1="0" y1="125" x2="500" y2="125" stroke="rgba(255,255,255,0.1)" /><line x1="0" y1="200" x2="500" y2="200" stroke="rgba(255,255,255,0.1)" /><motion.path d="M0 200 C 150 200, 250 50, 500 20" fill="none" stroke="#38ef7d" strokeWidth="5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }} /><motion.path d="M0 200 C 150 200, 250 50, 500 20 L 500 250 L 0 250 Z" fill="url(#greenGradient)" initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2.5, delay: 0.5 }} /><motion.path d="M0 50 C 150 50, 350 180, 500 220" fill="none" stroke="#ff9f43" strokeWidth="4" strokeDasharray="10 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }} /><defs><linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#38ef7d" stopOpacity="1" /><stop offset="100%" stopColor="#38ef7d" stopOpacity="0" /></linearGradient></defs></svg><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3.0, type: "spring" }} className="success-marker" style={{top: '10px', right: '10px'}}>⭐</motion.div></div></div>
                </div>
                <div className="bottom-section"><div className="drivers-container"><h4 className="section-label">Drivers of Acceptance</h4><div className="pillars-row">{data.drivers.map((driver, index) => (<motion.div key={index} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 + (index * 0.3), type: 'spring' }} className="driver-pillar"><span className="driver-icon">{driver.icon}</span><span>{driver.title}</span></motion.div>))}</div></div><motion.div initial={{ y: 50, opacity: 0, scaleX: 0.8 }} animate={{ y: 0, opacity: 1, scaleX: 1 }} transition={{ delay: 3.2, type: "spring" }} className="outcome-banner"><div className="outcome-label">KEY OUTCOME</div><h3>{data.outcome}</h3></motion.div></div>
            </div>
        )}

        {/* LAYOUT 11: SYSTEM USAGE (HUB) */}
        {data.type === 'usage' && (
            <div className="usage-layout">
                <motion.div variants={textUp} className="usage-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label">{data.title}</h4></motion.div>
                <div className="usage-container">
                    <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0, type: "spring" }} className="satellite-card left"><div className="sat-icon">{data.benefits[0].icon}</div><h3>{data.benefits[0].title}</h3><p>{data.benefits[0].text}</p><div className="beam-connector right-point"></div></motion.div>
                    <div className="hub-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="orbit-ring-outer"></motion.div><motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="orbit-ring-inner"></motion.div><div className="core-node"><span>JSS</span></div>{data.modules.map((mod, i) => { const angle = (i * 72) * (Math.PI / 180); const radius = 140; const x = Math.cos(angle - Math.PI / 2) * radius; const y = Math.sin(angle - Math.PI / 2) * radius; return (<motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, x: x, y: y }} transition={{ delay: 0.2 + (i * 0.1), type: "spring" }} className="module-node"><span className="mod-icon">{mod.icon}</span><span className="mod-name">{mod.name}</span></motion.div>); })}</div>
                    <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2, type: "spring" }} className="satellite-card right"><div className="sat-icon">{data.benefits[1].icon}</div><h3>{data.benefits[1].title}</h3><p>{data.benefits[1].text}</p><div className="beam-connector left-point"></div></motion.div>
                </div>
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, type: "spring" }} className="efficiency-bar"><div className="eff-label"><span className="eff-icon">⚡</span><h3>{data.efficiency.title}</h3></div><div className="eff-value-container"><span className="eff-value">{data.efficiency.value}</span><span className="eff-suffix">{data.efficiency.suffix}</span></div><p className="eff-desc">{data.efficiency.text}</p></motion.div>
            </div>
        )}

        {/* LAYOUT 12: REPORTING */}
        {data.type === 'reporting' && (
            <div className="reporting-layout">
                <motion.div variants={textUp} className="reporting-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label">{data.title}</h4></motion.div>
                <div className="reports-container">
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="report-card" style={{ borderTop: `4px solid ${data.operational.color}` }}><div className="card-header"><span className="card-icon" style={{background: data.operational.color}}>{data.operational.icon}</span><h3>{data.operational.title}</h3></div><p>{data.operational.desc}</p><div className="mini-chart-container"><motion.div className="bar" animate={{ height: "60%" }} transition={{ duration: 1, delay: 0.5 }} style={{background: data.operational.color}}></motion.div><motion.div className="bar" animate={{ height: "80%" }} transition={{ duration: 1, delay: 0.7 }} style={{background: data.operational.color}}></motion.div><motion.div className="bar" animate={{ height: "40%" }} transition={{ duration: 1, delay: 0.9 }} style={{background: data.operational.color}}></motion.div><motion.div className="bar" animate={{ height: "90%" }} transition={{ duration: 1, delay: 1.1 }} style={{background: data.operational.color}}></motion.div></div><div className="scan-line"></div></motion.div>
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="report-card" style={{ borderTop: `4px solid ${data.financial.color}` }}><div className="card-header"><span className="card-icon" style={{background: data.financial.color}}>{data.financial.icon}</span><h3>{data.financial.title}</h3></div><p>{data.financial.desc}</p><div className="mini-chart-container trend-container"><svg width="100%" height="100%"><motion.polyline points="0,80 50,60 100,70 150,30 200,40 250,10" fill="none" stroke={data.financial.color} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }} /></svg></div><div className="scan-line" style={{ animationDelay: '1s' }}></div></motion.div>
                </div>
                <motion.div initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 2.0, type: "spring" }} className="strategy-display"><div className="strategy-title"><span className="strat-icon">💎</span>{data.strategy.title}</div><div className="strategy-list">{data.strategy.items.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.3 + (i * 0.3) }} className="strategy-item"><span className="check-icon">✓</span>{item}</motion.div>))}</div></motion.div>
            </div>
        )}

        {/* LAYOUT 13: DATABASE */}
        {data.type === 'database' && (
            <div className="database-layout">
                <motion.div variants={textUp} className="database-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label" style={{color: '#64ffda'}}>{data.title}</h4></motion.div>
                <div className="db-content-grid">
                    <div className="challenge-col"><h3 className="section-title-sm">The Challenge</h3><div className="growth-gauge-container"><div className="gauge-track"><motion.div className="gauge-fill" initial={{ height: "10%" }} animate={{ height: "85%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}><span className="gauge-val">{data.challenge.value}</span></motion.div><div className="limit-line"></div></div><p className="gauge-desc">{data.challenge.label}</p></div></div>
                    <div className="server-col"><div className="server-rack">{[1, 2, 3, 4].map((item, index) => (<motion.div key={index} initial={{ opacity: 0, scaleX: 0.8, y: 50 }} animate={{ opacity: 1, scaleX: 1, y: 0 }} transition={{ delay: 1.0 + (index * 0.2), type: "spring" }} className="server-unit"><div className="server-lights"><span className="light blink-1"></span><span className="light blink-2"></span><span className="light blink-3"></span></div><div className="server-grill"></div></motion.div>))}<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="server-glow"></motion.div></div><div className="strategy-text"><h4>{data.strategy.title}</h4><p>{data.strategy.text}</p></div></div>
                    <div className="integrity-col"><h3 className="section-title-sm">Integrity Measures</h3><div className="shields-container">{data.integrity.map((item, index) => (<motion.div key={index} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 2.2 + (index * 0.3), type: "spring" }} className="integrity-card"><div className="shield-icon">{item.icon}</div><span>{item.title}</span></motion.div>))}</div></div>
                </div>
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "90%", opacity: 1 }} transition={{ delay: 3.0, duration: 1 }} className="workflow-container"><div className="workflow-line"></div><div className="workflow-text">OBJECTIVE: {data.objective}</div></motion.div>
            </div>
        )}

        {/* LAYOUT 14: SECURITY (FIXED) */}
        {data.type === 'security' && (
            <div className="security-layout">
                <motion.div variants={textUp} className="security-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label" style={{color: '#00ff87'}}>{data.title}</h4></motion.div>
                <div className="security-grid-fixed">
                    <div className="sec-col left-col"><motion.div className="sec-card" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ borderLeft: `4px solid ${data.measures[0].color}` }}><div className="sec-icon">{data.measures[0].icon}</div><div className="sec-text"><h3 style={{color: data.measures[0].color}}>{data.measures[0].title}</h3><p>{data.measures[0].text}</p></div><div className="connector-line-right"></div></motion.div><motion.div className="sec-card" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ borderLeft: `4px solid ${data.measures[1].color}` }}><div className="sec-icon">{data.measures[1].icon}</div><div className="sec-text"><h3 style={{color: data.measures[1].color}}>{data.measures[1].title}</h3><p>{data.measures[1].text}</p></div><div className="connector-line-right"></div></motion.div></div>
                    <motion.div className="sec-col center-col" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring' }}><div className="vault-core-fixed"><div className="core-ring-fixed ring-1-fixed"></div><div className="core-ring-fixed ring-2-fixed"></div><div className="lock-icon-fixed">{data.coreIcon}</div><div className="core-glow"></div></div></motion.div>
                    <div className="sec-col right-col"><motion.div className="sec-card" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} style={{ borderRight: `4px solid ${data.measures[2].color}`, textAlign: 'right', flexDirection: 'row-reverse' }}><div className="sec-icon">{data.measures[2].icon}</div><div className="sec-text"><h3 style={{color: data.measures[2].color}}>{data.measures[2].title}</h3><p>{data.measures[2].text}</p></div><div className="connector-line-left"></div></motion.div><motion.div className="sec-card" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} style={{ borderRight: `4px solid ${data.measures[3].color}`, textAlign: 'right', flexDirection: 'row-reverse' }}><div className="sec-icon">{data.measures[3].icon}</div><div className="sec-text"><h3 style={{color: data.measures[3].color}}>{data.measures[3].title}</h3><p>{data.measures[3].text}</p></div><div className="connector-line-left"></div></motion.div></div>
                </div>
            </div>
        )}

        {/* LAYOUT 15: INSIGHTS 1 */}
        {data.type === 'insights' && (
            <div className="insights-layout">
                <motion.div variants={textUp} className="insights-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label" style={{color: '#a8ffc3'}}>{data.title}</h4></motion.div>
                <div className="monolith-container">{data.points.map((point, index) => (<motion.div key={index} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + (index * 0.2), type: "spring", stiffness: 100 }} className="monolith-card" style={{ borderTop: `4px solid ${point.color}` }} whileHover={{ y: -20, boxShadow: `0 20px 40px -10px ${point.color}` }}><div className="bg-number" style={{color: point.color}}>{point.id}</div><div className="monolith-content"><div className="icon-circle" style={{background: point.color, boxShadow: `0 0 20px ${point.color}`}}>{point.icon}</div><h3 style={{color: point.color}}>{point.title}</h3><p>{point.text}</p></div><div className="shine-line"></div></motion.div>))}</div>
            </div>
        )}

        {/* LAYOUT 16: INSIGHTS 2 (Reactor) */}
        {data.type === 'insights-nexus' && (
            <div className="nexus-layout">
                <motion.div variants={textUp} className="nexus-header"><h1 className="slide-heading">{data.heading}</h1><h4 className="top-label" style={{color: '#00f2fe'}}>{data.title}</h4></motion.div>
                <div className="reactor-container">
                    <div className="radar-sweep"></div><div className="radar-grid"></div>
                    <svg className="reactor-lines" width="100%" height="100%"><motion.line x1="50%" y1="50%" x2="20%" y2="25%" stroke={data.points[0].color} strokeWidth="2" strokeDasharray="5 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} /><motion.line x1="50%" y1="50%" x2="80%" y2="25%" stroke={data.points[1].color} strokeWidth="2" strokeDasharray="5 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }} /><motion.line x1="50%" y1="50%" x2="50%" y2="80%" stroke={data.points[2].color} strokeWidth="2" strokeDasharray="5 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.1 }} /></svg>
                    <motion.div className="reactor-core" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}><div className="core-outer-ring"></div><div className="core-inner-ring"></div><div className="core-center-light"><span className="core-emoji">🧠</span></div><div className="core-label">HUB</div></motion.div>
                    <motion.div className="reactor-node position-top-left" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} style={{ borderTop: `4px solid ${data.points[0].color}` }}><div className="node-glow" style={{background: data.points[0].color}}></div><div className="node-icon">{data.points[0].icon}</div><h3>{data.points[0].title}</h3><p>{data.points[0].text}</p></motion.div>
                    <motion.div className="reactor-node position-top-right" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1 }} style={{ borderTop: `4px solid ${data.points[1].color}` }}><div className="node-glow" style={{background: data.points[1].color}}></div><div className="node-icon">{data.points[1].icon}</div><h3>{data.points[1].title}</h3><p>{data.points[1].text}</p></motion.div>
                    <motion.div className="reactor-node position-bottom" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.4 }} style={{ borderTop: `4px solid ${data.points[2].color}` }}><div className="node-glow" style={{background: data.points[2].color}}></div><div className="node-icon">{data.points[2].icon}</div><h3>{data.points[2].title}</h3><p>{data.points[2].text}</p></motion.div>
                </div>
            </div>
        )}

        {/* ==========================
            LAYOUT 17: CONCLUSION (Interactive Monolith)
           ========================== */}
        {data.type === 'conclusion-monolith' && (
            <div 
                className="monolith-layout" 
                onClick={() => setShowFinale(true)} /* CLICK TRIGGER */
            >
                {/* Background Particles */}
                <div className="stars"></div>
                
                {/* Header */}
                <motion.div variants={textUp} className="monolith-header">
                    <h4 className="top-label">{data.title}</h4>
                    <h1 className="slide-heading">{data.heading}</h1>
                    <p className="monolith-summary">{data.summary}</p>
                </motion.div>

                <div className="monolith-grid">
                    
                    {/* LEFT COLUMN */}
                    <div className="side-col left-col">
                        {data.leftModules.map((mod, i) => (
                            <motion.div 
                                key={i}
                                className="data-module module-left"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.0 + (i * 0.3), type: "spring" }}
                                style={{ borderLeft: `4px solid ${mod.color}` }}
                            >
                                <div className="mod-content">
                                    <span className="mod-icon">{mod.icon}</span>
                                    <span className="mod-label" style={{color: mod.color}}>{mod.label}</span>
                                </div>
                                <div className="connector-arm-right"></div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CENTER COLUMN: THE MONOLITH */}
                    <div className="center-col-monolith">
                        <motion.div 
                            className="the-monolith"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "100%", opacity: 1 }}
                            transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
                        >
                            <div className="monolith-core">
                                <div className="core-light"></div>
                            </div>
                            <div className="monolith-base"></div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="side-col right-col">
                        {data.rightModules.map((mod, i) => (
                            <motion.div 
                                key={i}
                                className="data-module module-right"
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.2 + (i * 0.3), type: "spring" }}
                                style={{ borderRight: `4px solid ${mod.color}` }}
                            >
                                <div className="connector-arm-left"></div>
                                <div className="mod-content">
                                    <span className="mod-icon">{mod.icon}</span>
                                    <span className="mod-label" style={{color: mod.color}}>{mod.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* BOTTOM: CTA (Rises up) */}
                <motion.div 
                    className="monolith-cta"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.5 }}
                >
                    <div className="cta-box">
                        <h3>{data.cta.heading}</h3>
                        <p>{data.cta.text}</p>
                    </div>
                </motion.div>

                {/* FINAL OVERLAY: THANK YOU (Controlled by State) */}
                <motion.div 
                    className="final-curtain"
                    initial={{ opacity: 0, backdropFilter: "blur(0px)", pointerEvents: "none" }}
                    animate={{ 
                        opacity: showFinale ? 1 : 0, 
                        backdropFilter: showFinale ? "blur(10px)" : "blur(0px)",
                        pointerEvents: showFinale ? "auto" : "none" 
                    }}
                    transition={{ duration: 1.5 }}
                >
                    <h1 className="thank-you-text">{data.finalMessage}</h1>
                </motion.div>

            </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
};

export default SlideView;
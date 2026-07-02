import React from 'react';

const PROCESS_STEPS = [
  {
    title: 'Readiness',
    role: 'You + AI',
    icon: 'ic-activity',
    front: 'Upload your numbers. You get a deal-readiness score and a first valuation range — in minutes.',
    machineLead: '50+ datapoints, instantly',
    machine:
      'Models ingest your financials and benchmark them against thousands of comparable transactions to score readiness and value.',
  },
  {
    title: 'Mandate',
    role: 'Banker-led',
    icon: 'ic-pen',
    front: 'Meet your Deal Maker. You agree the story, the range, and the buyer shortlist worth your time.',
    machineLead: 'A data-backed shortlist',
    machine:
      'The buyer-fit engine pre-ranks all 10,427 buyers, so your banker walks in with a shortlist built on signal, not memory.',
  },
  {
    title: 'Materials',
    role: 'Banker-led',
    icon: 'ic-file',
    front: 'Your banker sharpens every line of the IM, teaser and data room before anyone sees it.',
    machineLead: 'First draft in hours',
    machine:
      'AI drafts the IM, teaser and data-room structure from your data — so the banker edits, rather than starts from a blank page.',
  },
  {
    title: 'Outreach',
    role: 'You + AI',
    icon: 'ic-send',
    front: 'Stealth profiles go to ranked buyers. You approve every introduction before your name is revealed.',
    machineLead: 'Engagement, scored live',
    machine:
      'Profiles are matched to ranked buyers and every open, view and reply is tracked — so the warmest names surface first.',
  },
  {
    title: 'Negotiation',
    role: 'Banker-led',
    icon: 'ic-scale',
    front: 'Your banker runs the process, plays offers against each other, and protects your downside.',
    machineLead: 'Leverage, in real time',
    machine: 'Live comps and offer modeling surface where the value is — so every counter is backed by the numbers.',
  },
  {
    title: 'Close',
    role: 'Banker-led',
    icon: 'ic-flag',
    front: 'Diligence, definitive docs, signing. We sit beside you to the wire transfer.',
    machineLead: 'Nothing slips',
    machine: 'The diligence checklist and document tracking run automatically, flagging gaps before they become delays.',
  },
];

function Icon({ id, className = 'ic' }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <use href={`#${id}`} />
    </svg>
  );
}

function stepNumber(index) {
  return String(index + 1).padStart(2, '0');
}

function delayStyle(value) {
  return { '--d': value };
}

function Flow({ from, to, delay, tx, fx, startClass = '', endClass = '' }) {
  return (
    <svg
      className="pv-flow rise"
      style={delayStyle(delay)}
      data-from={from}
      data-to={to}
      data-tx={tx}
      data-fx={fx}
      aria-hidden="true"
    >
      <path fill="none" d="M0 0" />
      <circle className={`st${startClass ? ` ${startClass}` : ''}`} r="3.5" />
      <circle className={`en${endClass ? ` ${endClass}` : ''}`} r="3.5" />
    </svg>
  );
}

function Float({ className, style }) {
  return <span className={`pv-float ${className}`} style={style} />;
}

function VStep({ step, index }) {
  const number = stepNumber(index);

  return (
    <div className="vstep" data-i={index} tabIndex={0} role="button" aria-label={`Step ${index + 1}: ${step.title}`}>
      <div className="vs-head">
        <span className="vs-n">{number}</span>
        <span className="vs-role">{step.role}</span>
        <h4>{step.title}</h4>
        <span className="vs-ico">
          <Icon id={step.icon} />
        </span>
      </div>
      <div className="vs-detail">
        <div className="vs-detail-inner">
          <div className="vs-face vs-front">
            <p>{step.front}</p>
            <span className="hint">
              <Icon id="ic-cpu" />
              Hover for the machine
            </span>
          </div>
          <div className="vs-face vs-machine">
            <span className="vs-mtag">
              <Icon id="ic-spark" />
              The machine
            </span>
            <div className="vs-mlead">{step.machineLead}</div>
            <p>{step.machine}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageBackground() {
  return (
    <div className="p3bg" aria-hidden="true">
      <svg viewBox="0 0 472 446" preserveAspectRatio="xMidYMid slice">
        <circle className="dash" cx="236" cy="223" r="168" style={{ opacity: 0 }} />
        <g className="sp">
          <rect x="120" y="107" width="232" height="232" rx="30" />
        </g>
        <path className="dash d2" d="M-20 396 L 500 250" />
        <path className="dash d3" d="M-20 150 L 500 36" />
      </svg>
    </div>
  );
}

function ReadinessScene() {
  return (
    <div className="p3scene on" data-s="0">
      <div className="pv-card h pv-s1a rise" style={delayStyle('0s')}>
        <span className="pv-tag h">You</span>
        <div className="pv-row">
          <span className="pv-gly h">
            <Icon id="ic-file" />
          </span>
          <div className="pv-2l">
            <b>Your numbers</b>
            <span>Uploaded · 3 min</span>
          </div>
        </div>
      </div>
      <Flow from=".pv-s1a" to=".pv-s1b" tx="0.34" delay=".12s" />
      <Float className="dot" style={{ right: '11%', top: '10%', '--ft': '5.4s', '--fy': '-11px' }} />
      <Float className="ring h" style={{ left: '7%', bottom: '15%', '--ft': '6.8s', '--fy': '-14px', '--fx': '5px' }} />
      <Float className="sq" style={{ right: '34%', top: '26%', '--ft': '7.6s', '--fy': '-9px', '--fx': '-6px' }} />
      <div className="pv-card m pv-s1b rise" style={delayStyle('.22s')}>
        <span className="pv-tag m">The machine</span>
        <div className="pv-row">
          <svg className="pv-ring" viewBox="0 0 64 64">
            <circle className="tr" cx="32" cy="32" r="26" />
            <circle className="fg" cx="32" cy="32" r="26" />
            <text x="32" y="37">
              82
            </text>
          </svg>
          <div className="pv-2l">
            <b>Deal-ready</b>
            <span>Score · out of 100</span>
          </div>
        </div>
        <div className="pv-range">
          <span className="pv-microlbl">First valuation range</span>
          <div className="pv-rangebar">
            <i />
          </div>
          <div className="pv-rangelbl">
            <span>₹48 Cr</span>
            <span>₹64 Cr</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MandateScene() {
  return (
    <div className="p3scene" data-s="1">
      <div className="pv-card h pv-s2a rise" style={delayStyle('0s')}>
        <span className="pv-tag h">Your Deal Maker</span>
        <div className="pv-row">
          <span className="pv-ava">DM</span>
          <div className="pv-2l">
            <b>Senior banker</b>
            <span>Story · range · terms</span>
          </div>
        </div>
      </div>
      <Flow from=".pv-s2a" to=".pv-s2b" tx="0.34" delay=".1s" />
      <Float className="ring" style={{ right: '9%', top: '12%', '--ft': '6.2s', '--fy': '-12px' }} />
      <Float className="dot h" style={{ left: '9%', bottom: '18%', '--ft': '5.6s', '--fy': '-13px', '--fx': '6px' }} />
      <Float className="sq h" style={{ right: '30%', top: '30%', '--ft': '7.2s', '--fy': '-8px', '--fx': '-5px' }} />
      <div className="pv-card m pv-s2b rise" style={delayStyle('.2s')}>
        <span className="pv-tag m">Buyer-fit engine</span>
        {[
          ['Strategic A', '92%', '98'],
          ['PE fund B', '82%', '94'],
          ['Strategic C', '72%', '91'],
        ].map(([name, width, score]) => (
          <div className="pv-fit" key={name}>
            <span>{name}</span>
            <div className="fb">
              <i style={{ width }} />
            </div>
            <b>{score}</b>
          </div>
        ))}
        <span className="pv-foot">10,427 buyers ranked</span>
      </div>
    </div>
  );
}

function MaterialsScene() {
  return (
    <div className="p3scene" data-s="2">
      <div className="pv-card m pv-s3doc rise" style={delayStyle('0s')}>
        <div className="pv-dochead">
          <Icon id="ic-file" />
          <b>Information memorandum</b>
        </div>
        <div className="pv-line" style={{ width: '88%' }} />
        <div className="pv-line" style={{ width: '70%' }} />
        <div className="pv-edit">
          <span className="strike" />
          <svg className="squig" viewBox="0 0 96 12" aria-hidden="true">
            <path d="M2 8 q 8 -9 16 0 t 16 0 t 16 0 t 16 0 t 16 0" fill="none" />
          </svg>
        </div>
        <div className="pv-line" style={{ width: '80%' }} />
        <div className="pv-line" style={{ width: '54%' }} />
      </div>
      <div className="pv-chip m pv-s3a rise" style={delayStyle('.14s')}>
        <Icon id="ic-cpu" />
        First draft · in hours
      </div>
      <Flow from=".pv-s3a" to=".pv-s3doc" tx="0.25" startClass="m" delay=".2s" />
      <Flow from=".pv-s3doc" to=".pv-s3b" fx="0.7" startClass="m" endClass="h" delay=".32s" />
      <div className="pv-chip h pv-s3b rise" style={delayStyle('.26s')}>
        <Icon id="ic-pen" />
        Banker sharpens every line
      </div>
      <Float className="dot" style={{ right: '8%', top: '14%', '--ft': '5.8s', '--fy': '-12px' }} />
      <Float className="ring h" style={{ left: '8%', bottom: '12%', '--ft': '6.6s', '--fy': '-14px', '--fx': '6px' }} />
      <Float className="sq" style={{ left: '12%', top: '34%', '--ft': '7.4s', '--fy': '-9px', '--fx': '-5px' }} />
    </div>
  );
}

function OutreachScene() {
  return (
    <div className="p3scene" data-s="3">
      <svg className="pv-net rise" style={delayStyle('0s')} viewBox="0 0 320 240" aria-hidden="true">
        <path className="ln" d="M160 120 L 52 38" />
        <path className="ln" d="M160 120 L 272 46" />
        <path className="ln" d="M160 120 L 48 196" />
        <path className="ln" d="M160 120 L 276 190" />
        <circle className="nd" cx="52" cy="38" r="7" />
        <circle className="nd big" cx="272" cy="46" r="9" />
        <circle className="nd" cx="48" cy="196" r="7" />
        <circle className="nd" cx="276" cy="190" r="7" />
      </svg>
      <div className="pv-card h pv-s4c rise" style={delayStyle('.1s')}>
        <div className="pv-row">
          <span className="pv-gly h">
            <Icon id="ic-lock" />
          </span>
          <div className="pv-2l">
            <b>Stealth profile</b>
            <span>Your name stays hidden</span>
          </div>
        </div>
      </div>
      <div className="pv-chip m pv-s4r rise" style={delayStyle('.24s')}>
        Replied · 2h
      </div>
      <Flow from=".pv-s4r" to=".pv-s4c" tx="0.72" startClass="m" endClass="h" delay=".3s" />
      <Flow from=".pv-s4c" to=".pv-approve" endClass="h" delay=".4s" />
      <div className="pv-approve rise" style={delayStyle('.34s')}>
        <span className="sw">
          <i />
        </span>
        You approve every intro
      </div>
      <Float className="dot" style={{ left: '11%', top: '9%', '--ft': '5.2s', '--fy': '-11px' }} />
      <Float className="ring h" style={{ right: '7%', bottom: '26%', '--ft': '6.4s', '--fy': '-13px', '--fx': '-6px' }} />
      <Float className="sq" style={{ left: '6%', bottom: '34%', '--ft': '7.8s', '--fy': '-8px', '--fx': '5px' }} />
    </div>
  );
}

function NegotiationScene() {
  return (
    <div className="p3scene" data-s="4">
      <div className="pv-card m pv-s5 rise" style={delayStyle('0s')}>
        <span className="pv-tag m">Live offers</span>
        <div className="pv-offer">
          <span>Buyer A</span>
          <div className="ob">
            <i style={{ width: '58%' }} />
          </div>
          <b>₹52 Cr</b>
        </div>
        <div className="pv-offer">
          <span>Buyer B</span>
          <div className="ob">
            <i style={{ width: '70%' }} />
            <em style={{ left: '70%', width: '13%' }} />
          </div>
          <b className="up">₹58 Cr</b>
        </div>
        <span className="pv-foot">Backed by live comps</span>
      </div>
      <div className="pv-chip h pv-s5c rise" style={delayStyle('.2s')}>
        <Icon id="ic-scale" />
        Banker countered · +₹6 Cr
      </div>
      <Flow from=".pv-s5" to=".pv-s5c" startClass="m" endClass="h" delay=".28s" />
      <Float className="dot" style={{ left: '13%', top: '7%', '--ft': '5.6s', '--fy': '-12px' }} />
      <Float className="ring h" style={{ right: '11%', top: '11%', '--ft': '6.9s', '--fy': '-14px', '--fx': '6px' }} />
      <Float className="sq h" style={{ left: '9%', bottom: '16%', '--ft': '7.3s', '--fy': '-9px', '--fx': '-5px' }} />
    </div>
  );
}

function CloseScene() {
  return (
    <div className="p3scene" data-s="5">
      <div className="pv-card m pv-s6 rise" style={delayStyle('0s')}>
        <span className="pv-tag m">Tracked automatically</span>
        {['Due diligence', 'Definitive docs', 'Escrow & wire'].map((label) => (
          <div className="pv-check" key={label}>
            <i className="ck" />
            <span>{label}</span>
            <b>Done</b>
          </div>
        ))}
        <div className="pv-sign">
          <svg className="squig" viewBox="0 0 120 26" aria-hidden="true">
            <path d="M4 18 C 18 2, 26 24, 38 12 S 60 4, 70 16 S 100 22, 116 8" fill="none" />
          </svg>
          <span className="pv-tag h">Signed by you</span>
        </div>
      </div>
      <div className="pv-chip h pv-s6c pv-done rise" style={delayStyle('.22s')}>
        <Icon id="ic-flag" />
        Done deal
      </div>
      <Flow from=".pv-s6" to=".pv-s6c" startClass="m" endClass="h" delay=".32s" />
      <Float className="dot" style={{ left: '9%', top: '12%', '--ft': '5.5s', '--fy': '-11px' }} />
      <Float className="ring h" style={{ right: '7%', top: '35%', '--ft': '6.7s', '--fy': '-13px', '--fx': '-6px' }} />
      <Float className="sq" style={{ right: '13%', bottom: '13%', '--ft': '7.1s', '--fy': '-9px', '--fx': '5px' }} />
    </div>
  );
}

function ProcessStage() {
  return (
    <div className="proc3-vis" aria-hidden="true">
      <div className="proc3-sticky">
        <div className="proc3-num" id="proc3-num">
          01
        </div>
        <div className="p3v" id="proc3-stage" style={{ opacity: 0.8}}>
          <div className="p3legend">
            <span className="lg m">
              <i />
              The machine
            </span>
            <span className="lg h">
              <i />
              The human
            </span>
          </div>
          <StageBackground />
          <ReadinessScene />
          <MandateScene />
          <MaterialsScene />
          <OutreachScene />
          <NegotiationScene />
          <CloseScene />
        </div>
        <div className="proc3-cap">
          <span id="proc3-cap-n">01</span>
          <span className="ln" />
          <span id="proc3-cap-t">Readiness</span>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section className="section-pad proc3 framed" id="process" data-screen-label="Process">
      <div className="amb">
        <div className="halfcircle warm drift" data-speed="0.18" style={{ width: 320, height: 320, left: -130, top: '16%' }} />
        <div className="bigicon drift" data-speed="0.06" style={{ width: 460, height: 460, right: -110, top: 40 }}>
          <svg viewBox="0 0 24 24">
            <use href="#ic-send" />
          </svg>
        </div>
        <div className="halfcircle drift" data-speed="0.26" style={{ width: 200, height: 200, right: '8%', bottom: '5%' }} />
      </div>

      <div className="wrap">
        <div className="eyebrow-row reveal">
          <span className="num">01</span>
          <span className="kicker">How we work</span>
          <span className="ln" />
        </div>

        <h2 className="h-sec reveal">
          Six steps from mandate to <span className="accent-copper">close.</span>
        </h2>

        <p className="sec-lede reveal" style={{ marginTop: 18 }}>
          Every step has two sides — the human running it, and the AI underneath.
          <span className="p3-hoverhint">
            {' '}
            <span style={{ color: 'var(--purple-deep)' }}>Hover a card</span> to see the machine.
          </span>
        </p>

        <div className="proc3-pin" id="proc3-pin">
          <div className="proc3-stage-wrap">
            <div className="proc3-grid">
              <div className="proc3-cards" id="proc3-cards">
                {PROCESS_STEPS.map((step, index) => (
                  <VStep step={step} index={index} key={step.title} />
                ))}
              </div>
              <ProcessStage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

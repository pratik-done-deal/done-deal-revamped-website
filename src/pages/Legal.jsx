import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import '../styles/legal.css';
import Seo from '../components/Seo';
import { ROUTE_META } from '../seo/meta';

export default function Legal() {
  useReveal();
  useParallax();
  useLightwell();

  const VALID_TABS = ['investor', 'company', 'privacy'];
  const tabFromHash = () => {
    if (typeof window === 'undefined') return 'investor';
    const hash = window.location.hash.replace('#', '');
    return VALID_TABS.includes(hash) ? hash : 'investor';
  };

  const [tab, setTab] = useState(tabFromHash);

  useEffect(() => {
    const onHashChange = () => setTab(tabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectTab = (next) => {
    setTab(next);
    window.history.replaceState(null, '', `#${next}`);
  };

  return (
    <>
      <Seo {...ROUTE_META['/legal']} path="/legal" />
      <Nav />
      <main id="top">
        {/* ── Hero ─────────────────────────────────────────────────── */}
<section className="legal-hero">
  <div className="kicker">Legal</div>
  <h1>The <span className="accent-i">fine print,</span> made readable.</h1>
  <p className="lede">The terms and policies that govern your use of Done Deal — for investors, for companies, and the data we hold on your behalf.</p>
</section>

{/* ── Tabs ─────────────────────────────────────────────────── */}
<div className="legal-tabbar">
  <div className="legal-tabs" role="tablist">
    <button role="tab" onClick={() => selectTab('investor')} className={tab === 'investor' ? 'on' : ''}>Investor Terms</button>
    <button className={tab === 'company' ? 'on' : ''} role="tab" onClick={() => selectTab('company')}>Company Terms</button>
    <button className={tab === 'privacy' ? 'on' : ''} role="tab" onClick={() => selectTab('privacy')}>Privacy Policy</button>
  </div>
</div>

<div className="legal-stage">

{/* ════════════ INVESTOR TERMS ════════════ */}
<article id="tab-investor" className="legal-doc" style={{display: tab === 'investor' ? '' : 'none'}}>
  <div className="doc-meta"><span className="tag">For Investors &amp; Buyers</span><span className="upd">Last updated 2024</span></div>
  <h2 className="doc-title">Investor Terms</h2>
  <div className="intro">
    <p>These terms and conditions (available at &lt;<a className="inline" href="https://www.done.deals/buyer-t-c">https://www.done.deals/buyer-t-c</a>&gt;) (“<strong>Terms</strong>”) govern the access to, or use of the services made available through &lt;<a className="inline" href="https://www.done.deals">https://www.done.deals</a>&gt; (the “<strong>Platform</strong>” and together with services made available on or through the Platform, the “<strong>Services</strong>”).</p>
    <p>These Terms may be updated by us and the Terms, as amended from time to time, will apply to you. These Terms expressly supersede any prior written agreement with you. You can always review the most current version of these Terms on the Platform here.</p>
    <p>These Terms constitute a binding and enforceable legal contract between Acqui DoneDeal Private Limited, a company incorporated under the Companies Act, 2013, with its registered address at C 2704, Runwal Elegante, Old Kamat Club, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra, India – 400053, and its affiliates, successors, and assigns (“<strong>Done Deal</strong>”, “<strong>we</strong>”, or “<strong>us</strong>”) and any end-user of the Services (“<strong>you</strong>”). You represent and warrant that you: (i) have full legal capacity and authority to agree and bind yourself to these Terms; and (ii) are 18 (eighteen) years of age or older. If you represent an entity, organisation, or any other legal person, you confirm and represent that you have the necessary power and authority to bind such entity, organisation, or legal person to these Terms. By using the Services, you agree that you have read, understood, and are bound by these Terms, and that you will comply with the requirements listed herein. If you do not agree to all of these Terms or comply with the requirements herein, please do not access the Platform or use the Services.</p>
    <p>These Terms also include terms, policies, and disclaimers issued by us from time to time (“<strong>Additional Terms</strong>”). In the event of a conflict between these Terms and the Additional Terms, the Additional Terms will prevail.</p>
  </div>

  <section>
    <h3 className="clause"><span className="n">1</span> Services</h3>
    <ul>
      <li>The Services include the provision of the Platform that facilitates an online marketplace connecting businesses within the legal jurisdiction of India (hereafter, collectively referred to as the “<strong>Companies</strong>” or the “<strong>Sellers</strong>”) to potential investors in and / or buyers of such businesses (hereafter, collectively referred to as the “<strong>Investors</strong>” or the “<strong>Buyers</strong>”). The Services stipulated for the Investors broadly include showcasing potential deals, the valuation and authentication of the businesses listed for investment / acquisition, Company information and facilitating the exchange of information and commercial terms pertaining to such businesses and interactions between potential Investors and Companies through the Platform.</li>
      <li>Done Deal will provide you with certain preliminary information about potential deals and Companies based on the information provided by you. Upon an initial expression of interest by you, additional information relating to a Company’s business will be shared with you, including the financials, organisation structure, and valuation of the business for investment / acquisition on the Platform (such information is referred to as “<strong>Business Information</strong>”). Business Information may be exchanged between Companies and Investors through telephonic calls, text message, WhatsApp, email, or other electronic mediums that would depend on the contact details of Companies and Investors provided on the Platform. Disclosure of Business Information on the Platform will be controlled by the Company.</li>
      <li>If you, as the Investor, decide to invest into / buy a Company’s business in furtherance of the provision of the Services hereunder, you will be required to enter into an agreement with, inter alia the Company/ies and such other persons as may be required in the context of the transaction.</li>
    </ul>
  </section>

  <section>
    <h3 className="clause"><span className="n">2</span> Profile creation</h3>
    <ol>
      <li>To avail the Services, you will be required to create a profile on the Platform as an Investor (a profile created by an Investor shall be referred to as an “<strong>Investor Profile</strong>”).</li>
      <li>To create an Investor Profile, you will be required to furnish certain details, including but not limited to phone numbers of your points of contact, details of and information about your businesses, and email addresses using your organisations’ identifiers. You warrant that all information furnished in connection with your Investor Profile is and shall remain accurate and true in all respects and agree that you shall promptly update your details on the Platform in the event of any change or modification.</li>
      <li>You are solely responsible for maintaining the security and confidentiality of your username and password and agree to immediately notify Done Deal of any disclosure or unauthorised use of your Investor Profile or any other breach of security with respect to your Investor Profile.</li>
      <li>You expressly agree to be liable and accountable for all activities that take place through your Investor Profile. Done Deal shall in no manner be held liable for any unauthorised access to or use of an Investor Profile.</li>
      <li>You agree to receive email communications from Done Deal regarding: (i) information relating to transactions recorded on the Platform; (ii) information about Done Deal and the Services; (iii) promotional offers and services from Done Deal and its third-party partners; and (iv) any other matter in relation to the Services.</li>
      <li>Done Deal may be required to undertake certain “know your customer” processes in relation to the Investors who intend to avail certain features of the Services to verify their identities. In this regard, Done Deal may, from time to time, require you to upload information and documents that may be necessary to verify information that you have provided on the Platform (“<strong>KYC Documents</strong>”).</li>
      <li>You agree and warrant to provide true, complete, and up to date KYC Documents upon request. You further acknowledge that: (i) any false or misleading information provided in this regard shall constitute a material breach of these Terms; and (ii) your access to certain features of the Services may be limited or denied if you fail to share KYC Documents.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">3</span> Investor’s confidentiality obligations</h3>
    <ol>
      <li>You understand and acknowledge that you shall be exposed to information pertaining to the Companies onboarded on Done Deal’s Platform, including Business Information, via your Investor Profile. Done Deal shall additionally share materials and information including but not limited to business plans, commercial data, strategies, user lists, etc. as a part of its Services to you. You acknowledge that all such information shared by Done Deal shall be confidential in nature (“<strong>Confidential Information</strong>”).</li>
      <li>You shall not disclose the Confidential Information to any third party other than your representatives, on a need to know basis, provided that such representatives shall be bound by similar confidentiality obligations.</li>
      <li>You shall use the Confidential Information only for the purpose of your engagement with Done Deal, to explore the viability of and to consummate any transaction with respect to the Company or for any other purpose ancillary to any transaction with respect to any Company.</li>
      <li>You also agree that such Confidential Information may consist of Personal Data of Done Deal’s users which shall only be utilized by you in furtherance of the purpose identified between you and Done Deal. You agree to hold such Personal Data in confidence, comply with the applicable law and the principles set out therein in relation to storing and processing of Personal Data in such a manner that Done Deal is not in actual or potential breach of its obligations under the applicable law. “<strong>Personal Data</strong>” is defined as any information that relates to a natural person, which, either directly or indirectly, in combination with other information available or likely to be available with a person, is capable of identifying such person.</li>
      <li>Nothing contained herein or in any other document executed between Done Deal and you (if any) shall be construed as granting or implying any transfer of rights or licenses in the Confidential Information, or any copy, derivative, modification or enhancement thereof, of Done Deal or the respective owners to you.</li>
      <li>You agree that the confidentiality obligation stated herein shall survive the termination or expiration of these Terms.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">4</span> Done Deal’s confidentiality obligations</h3>
    <p>Done Deal hereby agrees to maintain confidentiality of any non-public confidential information you may share with Done Deal in furtherance to the provision of Services hereunder. Please refer to our privacy policy available at &lt;<a className="inline" href="DoneDeal-Legal.html#privacy">https://www.done.deals/privacy-policy</a>&gt; (“<strong>Privacy Policy</strong>”) to learn more about our privacy practices and how we collect and use your non-public confidential information.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">5</span> Third party services</h3>
    <ol>
      <li>The Services may include services, content, documents, and information owned by, licensed to, or otherwise made available by a third party (“<strong>Third Party Services</strong>”) or contain links to Third Party Services. You understand that Third Party Services are the responsibility of the third party that created or provided it and acknowledge that use of such Third Party Services is solely at your own risk.</li>
      <li>Done Deal makes no representations and excludes all warranties and liabilities arising out of or pertaining to such Third Party Services, including their accuracy or completeness. Further, all intellectual property rights in and to Third Party Services are the property of the respective third parties.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">6</span> Investor’s responsibilities</h3>
    <ol>
      <li>You represent and warrant that all information that is provided by you through or in relation to the Services is complete, true, and correct on the date of agreeing to these Terms and shall continue to be complete, true, and correct while you avail the Services or until these Terms are terminated, whichever is later. Should any information that you provide change during the existence of these Terms, you undertake to immediately bring such change to Done Deal’s notice. Done Deal does not accept any responsibility or liability for any loss or damage that you may suffer or incur if any information, documentation, material, or data provided to avail the Services is incorrect, incomplete, inaccurate, or misleading, or if you fail to disclose any material fact.</li>
      <li>You shall be solely responsible for ensuring compliance with applicable laws and solely liable for any liability that may arise due to a breach of your obligations in this regard.</li>
      <li>You hereby irrevocably agree and warrant for yourself, your officers, directors, employees, agents, representatives, associates, affiliates and any Related Parties (as applicable) (“<strong>Your Representatives</strong>”), that they shall not, circumvent, avoid, bypass, or obviate, directly or indirectly, the intent of these Terms and the provision of Services by Done Deal, through any transaction or otherwise in any manner whatsoever. You agree that neither you nor Your Representatives will attempt, directly or indirectly, to contact, negotiate, deal with or enter into any agreement, transaction or arrangement with respect to any Company, except through Done Deal or with the expressed written consent of Done Deal as to each such Company. “<strong>Related Party</strong>” shall have the meaning ascribed to it in the Companies Act, 2013 and “<strong>Related Parties</strong>” shall be construed accordingly.</li>
      <li>You shall extend all cooperation to Done Deal in its defence of any proceedings that may be initiated against it due to a breach of your obligations or covenants under these Terms.</li>
      <li>You shall not use the Services in any manner except as expressly permitted in these Terms. Without limiting the generality of the preceding sentence, you may not:
        <ul>
          <li>infringe any proprietary rights, including but not limited to copyrights, patents, trademarks, or trade secrets, of any party;</li>
          <li>except as may be provided hereunder, copy, display, distribute, modify, publish, reproduce, store, transmit, post, translate, create any derivative works from, or license the Services;</li>
          <li>use the Services to transmit any data or send or upload any material that contains viruses, Trojan horses, worms, timebombs, keystroke loggers, spyware, adware, or any other harmful programmes or similar computer code designed to adversely affect the operation of any computer software or hardware;</li>
          <li>try to gain unauthorized access or exceed the scope of authorized access to the Platform or to profiles, or other areas of the Platform or solicit passwords or personally identifying information for commercial or unlawful purposes from other users of the Platform;</li>
          <li>use any robot, spider, other automated device, or manual process to monitor or copy the Services or any portion thereof;</li>
          <li>engage in the systematic retrieval of content from the Services to create or compile, directly or indirectly, a collection, compilation, database or directory;</li>
          <li>interfere with another person’s use of the Platform;</li>
          <li>use the Services in: (A) any unlawful manner, (B) for fraudulent or malicious activities, or (C) in any manner inconsistent with these Terms;</li>
          <li>violate applicable laws in any manner; or</li>
          <li>host, display, upload, modify, publish, transmit, store, update or share any information that is unlawful, infringing, harmful to children, defamatory, obscene, invasive of another’s privacy, impersonates another person, threatens the unity or integrity of India, contains software viruses, is patently false or misleading, or otherwise violates the letter or spirit of these Terms.</li>
        </ul>
      </li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">7</span> Payments</h3>
    <p>Done Deal reserves the right to charge for facilitating any transaction with respect to a Company. The payment terms for the same shall be indicated by Done Deal in a form and manner deemed fit by it.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">8</span> Intellectual property</h3>
    <ol>
      <li>All rights, title, and interest in and to the Services, including all intellectual property rights arising out of the Services, are owned by or otherwise licensed to Done Deal. Subject to compliance with these Terms, Done Deal grants you a non-exclusive, non-transferable, non-sub licensable, revocable, and limited licence to use the Services in accordance with these Terms and its written instructions issued from time to time.</li>
      <li>Investors are solely responsible for the contents and accuracy of: (i) all materials submitted to Done Deal for inclusion in a business listing or Investor Profile description or for use in connection with the Services, including business listings, business details, videos, information, URLs, contact information, and photos, whether or not created originally by the Investors (“<strong>Investor Information</strong>”); (ii) all documents and files shared with the Platform and other users in pursuance of executing any transaction or agreement; and (iii) all websites and content linked, or otherwise referenced, in the Investor Information.</li>
      <li>You understand that when you express an interest in a Company, your name and relevant parts of your Investor Information shall be shared with such Company in furtherance of performance of the Services.</li>
      <li>You agree that: (a) Done Deal may publicly share the Investor’s name and logo for the purpose of establishing that the Investor has / had a working relationship with Done Deal and promoting the service offerings of Done Deal, only with the Investor’s prior consent; and (b) Done Deal may publicly share the Investor’s name and logo, together with details of transactions consummated by the Investor pursuant to the provision of the Services hereunder, only (i) with the Investor’s prior consent; or (ii) when such information has already been made public.</li>
      <li>Done Deal hereby warrants and represents that it does not and shall not use Investor Information for any purpose other than the purposes set out herein and under the Privacy Policy, and shall procure requisite consents in accordance with applicable laws for use of any of the Investor’s Personal Data. Done Deal makes no claim to any ownership interest in the Investor Information obtained from an Investor under these Terms.</li>
      <li>Done Deal may request you to, or you may submit suggestions, testimonials, and other feedback, including bug reports, relating to the Services from time to time (“<strong>Feedback</strong>”). Done Deal may freely use, copy, disclose, publish, display, distribute, and exploit the Feedback without any payment of royalty, acknowledgement, prior consent, or any other form of restriction arising out of your intellectual property rights.</li>
      <li>Except as expressly stated in these Terms, nothing in these Terms should be construed as conferring any right in or licence to Done Deal’s or any third party’s (including, the Investor’s) intellectual rights.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">9</span> Term and termination</h3>
    <ol>
      <li>These Terms shall remain in effect unless terminated in accordance with the terms hereunder.</li>
      <li>Either Done Deal or you may terminate these Terms for convenience by providing 30 (thirty) days’ prior written notice to the other party.</li>
      <li>Either Done Deal or you may terminate these Terms, immediately and at any point, in Done Deal’s / your sole discretion, as the case may be, if the other party violates or breaches any of its obligations, responsibilities, or covenants under these Terms.</li>
      <li>Upon termination under Clause 9(2) or Clause 9(3): the Services will “time-out”; you shall not be eligible to avail any of the Services; and these Terms shall terminate, except for those provisions that are expressly stated to or are intended to survive termination.</li>
      <li>Notwithstanding anything to the contrary contained in the Terms, upon termination of your access to or use of the Services, all amounts, or outstanding monies payable by you in relation to the use of or access to the Services shall become immediately payable.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">10</span> Disclaimers and warranties</h3>
    <ol>
      <li>The use of the Services is at your sole risk.</li>
      <li>Done Deal does not represent you or the Company in any fiduciary, agent, attorney-client, or any other capacity whatsoever and the use of the Services does not create, by implication or otherwise, any fiduciary duty, attorney-client relationship, representation, or any other sort of professional relationship. The Services do not constitute legal advice.</li>
      <li>Done Deal is not a regulated entity. Done Deal is merely a technology platform service provider and: is not registered under the Securities and Exchange Board of India (Investor Advisers) Regulations, 2013; is not an investment adviser as defined thereunder; and does not hold any license or engage in any activities relating to investment advisory services.</li>
      <li>To the extent permitted by applicable law, the Services are provided on an “as is” and “as available” basis. Done Deal does not warrant that the operation of the Services will be uninterrupted or error free. We may suspend or withdraw any or all parts of the Services at any time without notice to you.</li>
      <li>To the fullest extent permissible under applicable law, Done Deal expressly disclaims all warranties of any kind, express or implied, arising out of the Services, including warranties of merchantability, fitness for a particular purpose, satisfactory quality, accuracy, title and non-infringement.</li>
      <li>Notwithstanding anything to the contrary, the maximum aggregate monetary liability of Done Deal and any of its related parties arising out of or related to these Terms shall not exceed INR 10,000 (Rupees Ten Thousand).</li>
      <li>While Done Deal strives to connect Investors and Companies and facilitate successful transactions, Done Deal performs no technical, legal, financial, or any other type of due diligence on either Investors or Companies and makes no representations or warranties in this regard. The Investor is solely and exclusively responsible for all or any due diligence on Companies on the Platform.</li>
      <li>Any valuations, authentications, or opinions of value or authenticity are solely for information purposes. Any material or information provided through the Services is for informational purposes only — you must obtain professional or specialist advice before taking or refraining from taking any action on its basis.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">11</span> Indemnity</h3>
    <p>You shall indemnify, defend at Done Deal’s option, and hold Done Deal, its parent companies, subsidiaries, affiliates, and their officers, associates, successors, assigns, licensors, employees, directors, agents, and representatives, harmless from and against any claim, demand, lawsuits, judicial proceeding, losses, liabilities, damages and costs (including, without limitation, all damages, liabilities, settlements, costs and attorneys’ fees) due to or arising out of fraud, gross negligence, willful misconduct, and violation of these Terms.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">12</span> Consent to use data</h3>
    <ol>
      <li>You agree that Done Deal collects and uses your information and technical data and related information solely for the provision of the Services hereunder and in accordance with the terms contained herein, read with the Privacy Policy.</li>
      <li>Done Deal may use information and data pertaining to your use of the Services for its internal use, such as analytics, trends’ identification, and purposes of statistics to further enhance the effectiveness and efficiency of the Services.</li>
      <li>Subject to applicable laws, Done Deal may be directed by law enforcement agencies or the government to disclose data in relation to users in connection with criminal proceedings, and shall have the right to share such data with relevant agencies or bodies.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">13</span> Modification</h3>
    <p>Done Deal reserves the right at any time to add, modify, or discontinue, temporarily or permanently, the Services (or any part thereof) with or without cause. Done Deal shall not be liable for any such addition, modification, suspension, or discontinuation of the Services.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">14</span> Governing law, jurisdiction, and dispute resolution</h3>
    <ol>
      <li>These Terms shall be governed by and construed and enforced in accordance with the laws of India. Subject to other provisions in this Clause, courts in Mumbai shall have exclusive jurisdiction over all issues arising out of these Terms or the use of the Services.</li>
      <li>Any controversies, conflicts, disputes, or differences arising out of these Terms shall be resolved by arbitration in Mumbai in accordance with the Arbitration and Conciliation Act, 1996. The tribunal shall consist of 1 (one) arbitrator mutually appointed by the disputing parties. The language of the arbitration shall be English.</li>
      <li>The parties to the arbitration shall keep the arbitration confidential. The decision of the arbitrator shall be final and binding on all the parties.</li>
      <li>Each party to the arbitration shall bear its own costs with respect to any dispute.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">15</span> Miscellaneous provisions</h3>
    <ol>
      <li><strong>Modification of Terms:</strong> Done Deal reserves the right to modify these Terms at any time and to add new or additional terms or conditions on the access to or use of the Services. Such modifications will be communicated to you. In the event you refuse to accept such changes, these Terms will terminate.</li>
      <li><strong>Severability:</strong> If any provision of these Terms is determined to be unlawful or unenforceable, the other provisions will continue in effect.</li>
      <li><strong>Assignment:</strong> You shall not license, sell, transfer, or assign your rights, obligations, or covenants under these Terms without Done Deal’s prior written consent. Done Deal may assign its rights to any of its affiliates, subsidiaries, or parent companies, or to any successor in interest.</li>
      <li><strong>Notices:</strong> All notices, requests, demands, and determinations for Done Deal under these Terms (other than routine operational communications) shall be sent to <a className="inline" href="mailto:hello@done.deals">hello@done.deals</a>.</li>
      <li><strong>Third Party Rights:</strong> No third party shall have any rights to enforce any terms contained herein.</li>
      <li><strong>Waiver:</strong> Any delay in the exercise of rights and remedies available under the Terms does not constitute a waiver of that or any other right or remedy.</li>
      <li><strong>Force Majeure:</strong> Done Deal will have no liability to you if we are prevented or delayed from performing our obligations by acts, events, or omissions beyond our reasonable control.</li>
    </ol>
    <div className="contact-card">
      <div className="lab">Grievance Redressal</div>
      <p>Rohit RK <span>· Grievance Officer</span></p>
      <p><span>Email:</span> <a className="inline" href="mailto:rohit@done.deals">rohit@done.deals</a></p>
    </div>
  </section>
</article>

{/* ════════════ COMPANY TERMS ════════════ */}
<article id="tab-company" className="legal-doc" hidden="" style={{display: tab === 'company' ? '' : 'none'}}>
  <div className="doc-meta"><span className="tag">For Founders &amp; Companies</span><span className="upd">Last updated 2025</span></div>
  <h2 className="doc-title">Company Terms</h2>
  <div className="intro">
    <p>These terms and conditions (available at &lt;<a className="inline" href="https://www.done.deals/t-c">https://www.done.deals/t-c</a>&gt;) (“<strong>Terms</strong>”) govern the access to, or use of the services made available through &lt;<a className="inline" href="https://www.done.deals">https://www.done.deals</a>&gt; (the “<strong>Platform</strong>” and together with services made available on or through the Platform, the “<strong>Services</strong>”).</p>
    <p>These Terms may be updated by us and the Terms, as amended from time to time, will apply to you. These Terms expressly supersede any prior written agreement with you. You can always review the most current version of these Terms on the Platform here.</p>
    <p>These Terms constitute a binding and enforceable legal contract between Acqui DoneDeal Private Limited, a company incorporated under the Companies Act, 2013, with its registered address at C 2704, Runwal Elegante, Old Kamat Club, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra, India – 400053, and its affiliates, successors, and assigns (“<strong>Done Deal</strong>”, “<strong>we</strong>”, or “<strong>us</strong>”) and any end-user of the Services (“<strong>you</strong>”). You represent and warrant that you (i) have full legal capacity and authority to agree and bind yourself to these Terms, (ii) are 18 (eighteen) years of age or older, and (iii) are an Indian resident. If you represent an entity, organisation, or any other legal person, you confirm that you have the necessary power and authority to bind such entity to these Terms.</p>
    <p>By using the Services, you agree that you have read, understood, and are bound by these Terms. If you do not agree to all of these Terms or comply with the requirements herein, please do not access the Platform or use the Services. These Terms also include terms, policies, and disclaimers issued by us from time to time (“<strong>Additional Terms</strong>”). In the event of a conflict, the Additional Terms will prevail.</p>
  </div>

  <section>
    <h3 className="clause"><span className="n">1</span> Services</h3>
    <p>The Services include the provision of the Platform that facilitates an online marketplace connecting businesses (hereafter, collectively referred to as the “<strong>Companies</strong>” or the “<strong>Sellers</strong>”) to potential investors in and / or buyers of such businesses (hereafter, collectively referred to as the “<strong>Investors</strong>” or the “<strong>Buyers</strong>”). The Services stipulated for the Company broadly include showcasing potential deals, Investor information and the exchange of information and commercial terms pertaining to such businesses and interactions between potential Investors and Companies through the Platform.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">2</span> Profile creation</h3>
    <ol>
      <li>To avail the Services, you will be required to create a profile on the Platform as a Company (a profile created by a Company shall be referred to as a “<strong>Company Profile</strong>”).</li>
      <li>To create a Company Profile, you will be required to furnish certain details, including but not limited to phone numbers of your points of contact, details of and information about your businesses, and email addresses using your organisations’ identifiers. You warrant that all information furnished is and shall remain accurate and true in all respects and agree that you shall promptly update your details in the event of any change.</li>
      <li>You are solely responsible for maintaining the security and confidentiality of your username and password and agree to immediately notify Done Deal of any unauthorised use of your Company Profile or any other breach of security.</li>
      <li>You expressly agree to be liable and accountable for all activities that take place through your Company Profile. Done Deal shall in no manner be held liable for any unauthorised access to or use of a Company Profile.</li>
      <li>You agree to receive email communications from Done Deal regarding: (i) information relating to transactions recorded on the Platform; (ii) information about Done Deal and the Services; (iii) promotional offers and services from Done Deal and its third-party partners; and (iv) any other matter in relation to the Services.</li>
      <li>Please note that the Services are intended only for use by Companies within the legal jurisdiction of India. Done Deal does not provide the Services to any Company based outside of India.</li>
      <li>Done Deal may be required to undertake certain “know your customer” processes to verify identities. Done Deal may, from time to time, require you to upload information and documents necessary to verify information you have provided (“<strong>KYC Documents</strong>”).</li>
      <li>You agree and warrant to provide true, complete, and up to date KYC Documents upon request. Any false or misleading information shall constitute a material breach, and your access to certain features may be limited or denied if you fail to share true, complete, and up to date KYC Documents.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">3</span> Business information</h3>
    <ol>
      <li>Upon an initial expression of interest by a potential Investor, additional information relating to a Company’s business will be shared with such Investor, including the financials, organisation structure, and valuation of the business for acquisition on the Platform (“<strong>Business Information</strong>”). Business Information may be exchanged through telephonic calls, text messages, WhatsApp, email, or other electronic mediums.</li>
      <li>Business Information will only be shared with the Investor after the creation of the Investor’s profile and the placement of a request for further information relating to the Company. Disclosure of Business Information on the Platform will be controlled by the Company.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">4</span> Third party services</h3>
    <ol>
      <li>The Services may include services, content, documents, and information owned by, licensed to, or otherwise made available by a third party (“<strong>Third Party Services</strong>”) or contain links to Third Party Services. Use of such Third Party Services is solely at your own risk.</li>
      <li>Done Deal makes no representations and excludes all warranties and liabilities arising out of or pertaining to such Third Party Services, including their accuracy or completeness. All intellectual property rights in and to Third Party Services are the property of the respective third parties.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">5</span> Company responsibilities</h3>
    <ol>
      <li>You represent and warrant that all information provided by you is complete, true, and correct on the date of agreeing to these Terms and shall continue to be so while you avail the Services. Should any information change, you undertake to immediately bring such change to Done Deal’s notice. Done Deal does not accept responsibility for any loss if any information provided is incorrect, incomplete, inaccurate, or misleading.</li>
      <li>You shall be solely responsible for ensuring compliance with applicable laws and solely liable for any liability arising due to a breach of your obligations.</li>
      <li>You hereby irrevocably agree and warrant for yourself and Your Representatives that they shall not circumvent, avoid, bypass, or obviate the intent of these Terms, and shall not contact, negotiate, or enter into any arrangement with any of the Investors except through Done Deal or with its expressed written consent. “<strong>Related Party</strong>” shall have the meaning ascribed to it in the Companies Act, 2013.</li>
      <li>You shall extend all cooperation to Done Deal in its defence of any proceedings initiated against it due to a breach of your obligations.</li>
      <li>You shall not use the Services in any manner except as expressly permitted. Without limiting the foregoing, you may not infringe proprietary rights; copy or distribute the Services; transmit harmful code or viruses; gain unauthorized access; use automated retrieval; interfere with another person’s use; use the Services unlawfully or fraudulently; or host or share unlawful, infringing, defamatory, obscene, or misleading content.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">6</span> Payments</h3>
    <p>Done Deal does not presently charge you any fees to use the Platform. However, Done Deal reserves the right to charge you upon introduction of a prospective Investor(s) with you. The payment terms shall be indicated by Done Deal in a form and manner agreed between you and Done Deal, and Done Deal may require you to execute further documentation to record the same.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">7</span> Intellectual property</h3>
    <ol>
      <li>All rights, title, and interest in and to the Services are owned by or otherwise licensed to Done Deal. Subject to compliance with these Terms, Done Deal grants you a non-exclusive, non-transferable, non-sub licensable, revocable, and limited licence to use the Services.</li>
      <li>Companies are solely responsible for: (i) all materials submitted for inclusion in a business listing or profile description (“<strong>Company Information</strong>”); (ii) all documents and files shared with the Platform; and (iii) all websites and content linked, or otherwise referenced, in the Company Information.</li>
      <li>The Company hereby grants to Done Deal a royalty-free, perpetual, irrevocable, non-exclusive, fully sublicensable right and licence to copy, modify, display, distribute, perform, create derivative works from, store and otherwise use all Company Information, in connection with: (a) providing the Services to the Company; and (b) making available Company Information on or in connection with properties owned or operated by Done Deal including the Platform. Done Deal makes no claim to any ownership interest in the Company Information.</li>
      <li>Done Deal may request, or you may submit, suggestions, testimonials, and feedback (“<strong>Feedback</strong>”). Done Deal may freely use, copy, disclose, publish, display, distribute, and exploit the Feedback without any payment of royalty, acknowledgement, or prior consent.</li>
      <li>Except as expressly stated, nothing in these Terms confers any right in or licence to Done Deal’s or any third party’s intellectual rights.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">8</span> Term and termination</h3>
    <ol>
      <li>These Terms shall remain in effect unless terminated in accordance with the terms hereunder.</li>
      <li>Done Deal may terminate your access to or use of the Services, or any portion thereof, immediately and at any point, at its sole discretion if you violate or breach any of your obligations under these Terms.</li>
      <li>Upon termination: the Services will “time-out”; you shall not be eligible to avail any of the Services; these Terms shall terminate except for clauses intended to survive; and all outstanding monies payable by you shall become immediately payable.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">9</span> Disclaimers and warranties</h3>
    <ol>
      <li>The use of the Services is at your sole risk.</li>
      <li>Done Deal does not represent you or the Investor in any fiduciary, agent, or attorney-client capacity. The Services do not constitute legal advice.</li>
      <li>Done Deal shall have no obligation to verify any information provided by you and displayed on the Platform. You warrant the veracity and accuracy of all information shared, and that all projections have been prepared in good faith on reasonable assumptions.</li>
      <li>You understand that Done Deal may share the information provided by you with prospective Investors, as detailed in the Privacy Policy.</li>
      <li>Done Deal does not take responsibility for checking the authenticity of any communication you may receive from Investors or third-parties, and urges you to practice adequate caution.</li>
      <li>Done Deal offers no guarantee of a satisfactory response, or any response at all, from the Investors upon registering on the Platform.</li>
      <li>Done Deal is not a regulated entity; it is merely a technology platform service provider and is not registered under, nor an investment adviser as defined under, the SEBI (Investor Advisers) Regulations, 2013.</li>
      <li>To the extent permitted by law, the Services are provided on an “as is” and “as available” basis. Done Deal disclaims all warranties of any kind, express or implied.</li>
      <li>Notwithstanding anything to the contrary, the maximum aggregate monetary liability of Done Deal and any of its related parties arising out of or related to these Terms shall not exceed INR 10,000.</li>
      <li>Done Deal performs no technical, legal, or financial due diligence on either Investors or Companies. Any valuations or authentications are solely for information purposes, and all material is for informational purposes only — obtain professional advice before acting on it.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">10</span> Indemnity</h3>
    <p>You shall indemnify, defend at Done Deal’s option, and hold Done Deal, its parent companies, subsidiaries, affiliates, and their officers, associates, successors, assigns, licensors, employees, directors, agents, and representatives, harmless from and against any claim, demand, lawsuits, judicial proceeding, losses, liabilities, damages and costs (including all attorneys’ fees) due to or arising out of your access to or use of the Services, violation of these Terms, or any infringement by any third party who may use your account.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">11</span> Consent to use data</h3>
    <ol>
      <li>You agree that Done Deal may collect and use your information and technical data and related information.</li>
      <li>Done Deal may use information pertaining to your use of the Services for analytics, trends’ identification, and statistics to enhance the effectiveness and efficiency of the Services.</li>
      <li>Subject to applicable laws, Done Deal may be directed by law enforcement agencies or the government to disclose data in relation to its users in connection with criminal proceedings, and shall have the right to share such data with relevant agencies or bodies.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">12</span> Modification</h3>
    <p>Done Deal reserves the right at any time to add, modify, or discontinue, temporarily or permanently, the Services (or any part thereof) with or without cause. Done Deal shall not be liable for any such addition, modification, suspension, or discontinuation of the Services.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">13</span> Governing law, jurisdiction, and dispute resolution</h3>
    <ol>
      <li>These Terms shall be governed by the laws of India. Subject to other provisions in this Clause, courts in Mumbai shall have exclusive jurisdiction over all issues arising out of these Terms or the use of the Services.</li>
      <li>Any disputes shall be resolved by arbitration in Mumbai in accordance with the Arbitration and Conciliation Act, 1996. The tribunal shall consist of 1 (one) arbitrator mutually appointed by the disputing parties. The language of the arbitration shall be English.</li>
      <li>The parties shall keep the arbitration confidential. The decision of the arbitrator shall be final and binding on all the parties.</li>
      <li>Each party to the arbitration shall bear its own costs with respect to any dispute.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">14</span> Miscellaneous provisions</h3>
    <ol>
      <li><strong>Modification of Terms:</strong> Done Deal reserves the right at any time to modify these Terms and to add new or additional terms or conditions. Such modifications will be communicated to you. In the event you refuse to accept such changes, these Terms will terminate.</li>
      <li><strong>Severability:</strong> If any provision is determined to be unlawful or unenforceable, the other provisions will continue in effect.</li>
      <li><strong>Assignment:</strong> You shall not license, sell, transfer, or assign your rights or obligations without Done Deal’s prior written consent. Done Deal may assign its rights to any affiliate, subsidiary, parent company, or successor in interest.</li>
      <li><strong>Notices:</strong> All notices for Done Deal (other than routine operational communications) shall be sent to <a className="inline" href="mailto:hello@done.deals">hello@done.deals</a>.</li>
      <li><strong>Third Party Rights:</strong> No third party shall have any rights to enforce any terms contained herein.</li>
      <li><strong>Waiver:</strong> Any delay in the exercise of rights does not constitute a waiver of that or any other right or remedy.</li>
      <li><strong>Force Majeure:</strong> Done Deal will have no liability if we are prevented or delayed from performing our obligations by acts, events, or omissions beyond our reasonable control.</li>
    </ol>
    <div className="contact-card">
      <div className="lab">Grievance Redressal</div>
      <p>Rohit RK <span>· Grievance Officer</span></p>
      <p><span>Email:</span> <a className="inline" href="mailto:legal@done.deals">legal@done.deals</a></p>
    </div>
  </section>
</article>

{/* ════════════ PRIVACY POLICY ════════════ */}
<article id="tab-privacy" className="legal-doc" hidden="" style={{display: tab === 'privacy' ? '' : 'none'}}>
  <div className="doc-meta"><span className="tag">Privacy</span><span className="upd">Last updated 2025</span></div>
  <h2 className="doc-title">Privacy Policy</h2>
  <div className="intro">
    <p>Welcome to Acqui DoneDeal Private Limited’s privacy policy (“<strong>Policy</strong>”).</p>
    <p><strong>Acqui DoneDeal Private Limited</strong>, a company incorporated under the Companies Act, 2013 (bearing company identification number U74999MH2022PTC385962), having its registered office at C 2704, Runwal Elegante, Old Kamat Club, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra – 400053 (“<strong>Done Deal</strong>”, “<strong>we</strong>” or “<strong>us</strong>”), is engaged in the business of providing an online marketplace to facilitate connections between organisations interested in listing their businesses for investment and / or acquisition and potential investors / and or buyers of such businesses.</p>
    <p>This Policy outlines our practices in relation to the collection, storage, usage, processing, and disclosure of personal information that you have consented to share with us when you access, use, or otherwise interact with our website available at &lt;<a className="inline" href="https://www.done.deals">https://www.done.deals/</a>&gt; (“<strong>Platform</strong>”) or avail products or services that Done Deal offers you on or through the Platform (collectively, the “<strong>Services</strong>”).</p>
    <p>At Done Deal, we are committed to protecting your personal information and respecting your privacy. By accepting this Policy, you understand and agree to the collection, use, sharing and processing of personal information as described herein. This Policy applies to all current and former visitors, users and others who access this Platform.</p>
  </div>

  <section>
    <h3 className="clause"><span className="n">1</span> Background and key information</h3>
    <h4 className="sub">How this Policy applies</h4>
    <p>This Policy applies to individuals who access or use the Services, such as points of contact of Companies and Investors, promoters or founders of listed businesses, and end-users of the Platform (“<strong>you</strong>”). In case you wish to avail any Services, Done Deal shall provide a username and password (“<strong>Login Credentials</strong>”) as set out in the Terms. Please read the terms of this Policy carefully before accessing or using the Platform. By accessing or using the Platform, you consent to the collection, storage, usage, and disclosure of your personal information as described in this Policy.</p>
    <h4 className="sub">Review and updates</h4>
    <p>We regularly review and update this Policy, and we request you to regularly review it. Done Deal will notify you at least once a year, or whenever there is a change, by email or by posting a conspicuous notice on the Platform. Your continued use of the Platform thereafter will imply your unconditional acceptance of such updates.</p>
    <h4 className="sub">Third party services</h4>
    <p>Done Deal may engage third party vendors and / or contractors to deliver the Services and perform support services. The Platform may include links to third party websites, plug-ins, services, and applications (“<strong>Third Party Services</strong>”). We neither control nor endorse these Third Party Services and are not responsible for their privacy statements. When you leave the Platform or access third party links, we encourage you to read the privacy policy of such third party service providers.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">2</span> Personal information that we collect</h3>
    <p>We collect different types of personal information about you. This includes, but is not limited to:</p>
    <ul>
      <li><strong>Contact Data</strong>, such as your mailing address, location, email addresses, and mobile numbers.</li>
      <li><strong>Identity and Profile Data</strong>, such as your name, username, or similar identifiers.</li>
      <li><strong>Marketing and Communications Data</strong>, such as your email address, information posted in service requests, feedback, responses to surveys and polls, and your communication preferences.</li>
      <li><strong>Technical Data</strong>, which includes your IP address, browser type, internet service provider, operating system, access time, page views, device ID, device type, location data, and other technology on the devices you use to access the Platform.</li>
      <li><strong>Usage Data</strong>, which includes information about how you use the Services, your activity on the Platform, user taps and clicks, interests, time spent, and page views.</li>
    </ul>
    <p>We also collect, use, and share aggregated data such as statistical or demographic data for any purpose. Where we need to collect personal information by law or under a contract and you fail to provide it, we may not be able to perform the contract and may have to cancel or limit your access to the Services.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">3</span> How do we collect personal information?</h3>
    <ol>
      <li><strong>Direct interactions.</strong> You provide us your personal information when you create an account or Profile, update your details, use our Services, enter a promotion or survey, request marketing communications, report a problem or give feedback, or carry out transactions on the Platform.</li>
      <li><strong>Automated technologies or interactions.</strong> Each time you visit the Platform, we automatically collect Technical Data about your equipment, browsing actions, and patterns using cookies, web beacons, pixel tags, server logs, and other similar technologies.</li>
      <li><strong>Billing information.</strong> You are required to provide your billing address as well as credit / debit card details, which may be aligned with third party payment wallets. Done Deal or an authorised payment gateway saves the billing information for your convenience.</li>
      <li><strong>Third parties or publicly available sources.</strong> We will receive Technical Data from analytics providers, Identity, Profile and Contact Data from publicly available sources, and personal information from our affiliate entities or business aggregators.</li>
    </ol>
    <p>You may use the Platform without providing any information about yourself; however, you may not be able to access certain services if you choose to do so.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">4</span> How do we use your personal information?</h3>
    <p>We will only use your personal information when the law allows us to — most commonly to provide you with the Services or to comply with a legal obligation. We use your personal information to: verify your identity and create user accounts; provide the Services; monitor trends and personalise your experience; improve functionality and customer service; send periodic notifications and company updates; market and advertise the Services; comply with legal obligations; administer and protect our business; perform our obligations; communicate for business purposes; enforce our Terms; and respond to court orders or defend ourselves against legal claims.</p>
    <p>By using our Services and creating an account, you authorise us and our affiliates to contact you via email, phone, or otherwise. We may share information with social media companies, third-party service providers, storage providers, data analytics providers, consultants, lawyers, and auditors, and with other entities in the Done Deal group, for the purposes set out herein. We may share information without your consent when required by law or by any court or government agency.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">5</span> Cookies</h3>
    <ol>
      <li>Cookies are small files that a site transfers to your device’s hard drive through your web browser that enable the site’s systems to recognise your browser and remember certain information.</li>
      <li>We use cookies to distinguish you from other users, save your preferences, keep track of advertisements, and compile aggregate data about site traffic and interaction so we can offer a seamless experience.</li>
      <li>You may encounter cookies placed by third parties on certain pages. We do not control the use of cookies by third parties.</li>
      <li>If your browser permits, you may decline cookies; however, you may be unable to use certain features and may be required to re-enter your password frequently.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">6</span> Disclosures of your personal information</h3>
    <p>Done Deal maintains your personal information in electronic form, accessible to employees, agents, or partners and third parties only on a need-to-know basis.</p>
    <ol>
      <li>Done Deal does not rent, sell, or share information with other people or non-affiliated entities, except with your consent. To provide Services you have requested, Done Deal may share your information with internal third parties (other companies within the Done Deal group) and external third parties such as other users (in connection with the Services), trusted service providers, analytic service providers and advertising networks, other registered users upon your request, and regulators as required by law.</li>
      <li>Done Deal may rent, sell, or share non-personal or personal information in an aggregate, de-identified form with any third party.</li>
      <li>We require all third parties to respect the security of your personal information and to treat it in accordance with the law, and only permit them to process it for specified purposes and in accordance with our instructions.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">7</span> Your rights in relation to your personal information</h3>
    <ol>
      <li><strong>Access and updating your personal information:</strong> You have the right to withdraw your consent at any point, provided such withdrawal is intimated to Done Deal in writing at <a className="inline" href="mailto:legal@done.deals">legal@done.deals</a>. We make best efforts to provide you with the ability to access and correct inaccurate or deficient data, subject to legal requirements.</li>
      <li>Done Deal reserves the right to verify and authenticate your identity and information in order to ensure accurate delivery of Services. Access, correction, or deletion may be denied or limited if it would violate another person’s rights or is not permitted by applicable law.</li>
      <li>If you need to update or correct your personal information, you may send updates to <a className="inline" href="mailto:legal@done.deals">legal@done.deals</a>, citing the reason for the rectification.</li>
      <li><strong>Opting-out of marketing communications:</strong> We make best efforts to provide you with the ability to opt-out using the instructions provided in our emails. It may take us up to 30 (Thirty) business days to give effect to your opt-out request. We may still send you emails about your account or any Services you have requested.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">8</span> Transfer of your personal information</h3>
    <ol>
      <li>We comply with applicable laws in respect of storage and transfers of personal information. The personal information you provide may be transferred to and stored in countries other than the country you are based in, if our servers or service providers are located there.</li>
      <li>By submitting your information to us, you agree to the transfer, storage, and processing of such personal information in the manner described above.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">9</span> Data security</h3>
    <ol>
      <li>We implement certain security measures and privacy-protective features on our Platform to protect your personal information from unauthorised access and disclosure, and follow standards prescribed by applicable law.</li>
      <li>Where you have chosen a password, you are responsible for keeping it secret and confidential. We will not be responsible for any unauthorised use of your information or any lost, stolen, or compromised passwords. If your password has been compromised, you should promptly notify us.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">10</span> Data retention</h3>
    <ol>
      <li>Your personal information will continue to be stored and retained by us for as long as necessary to fulfil our stated purpose(s) and for a reasonable period after the termination of your account or access to the Services, to comply with our legal rights and obligations.</li>
      <li>In some circumstances we may aggregate your personal information (so it can no longer be associated with you) for research or statistical purposes, in which case we may use this information indefinitely without further notice.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">11</span> Business transitions</h3>
    <p>You are aware that in the event we go through a business transition, such as a merger, acquisition by another organisation, or sale of all or a portion of our assets, your personal information might be among the assets transferred.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">12</span> User generated information</h3>
    <ol>
      <li>We invite users to make available information related to their business on the Platform. Such content may be available to visitors to our Platform.</li>
      <li>If a user decides to share business information with another user, such information will only be shared to the user’s profile. Done Deal makes no undertaking, representation, or warranty in this regard.</li>
      <li>We cannot prevent user generated information from being used in a manner contrary to this Policy, applicable laws, or your personal privacy, and we disclaim all liability in this regard. You will be solely responsible for any information published by you on our Platform that violates applicable laws.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">13</span> Minor and usage on behalf of another person</h3>
    <p>Done Deal does not intend to attract anyone under the relevant age of consent to enter into binding legal contracts, and does not intentionally collect personal information from anyone under that age. We encourage parents and guardians to be involved in the online activities of minors. If you are using the Platform on behalf of someone else, you represent and warrant that you are authorised by such person to accept this Policy on their behalf.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">14</span> Limitation of liability</h3>
    <ol>
      <li>Done Deal shall not be liable to you for any loss of profit, production, anticipated savings, goodwill or business opportunities or any direct or indirect, incidental, economic, compensatory, punitive, exemplary, or consequential losses arising out of performance or non-performance of its obligations under this Policy.</li>
      <li>Done Deal is not responsible for any actions or inactions of any third parties that receive your information.</li>
      <li>Done Deal shall not be held responsible for any loss, damage, or misuse of your information attributable to a Force Majeure Event — any event beyond the reasonable control of Done Deal, including sabotage, fire, flood, acts of God, civil commotion, war, computer hacking, unauthorised access, breach of security, pandemic or lockdown.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">15</span> Updates to this Policy</h3>
    <ol>
      <li>We may occasionally update this Policy. If we make changes, we will upload the revised policy on the Platform or share it with you through other means, such as email. By using our Platform after such notice, you consent to the updates.</li>
      <li>We encourage you to periodically review this Policy for the latest information on our privacy practices.</li>
    </ol>
  </section>

  <section>
    <h3 className="clause"><span className="n">16</span> Governing law</h3>
    <p>This Policy shall be governed by, interpreted and construed in accordance with the laws of India and, subject to the following, the courts of Mumbai shall have exclusive jurisdiction. In the event of any dispute, the same shall be settled by binding arbitration conducted by a sole arbitrator, appointed jointly by both parties, and governed by the Arbitration and Conciliation Act, 1996. The venue and seat of arbitration shall be Mumbai, India.</p>
  </section>

  <section>
    <h3 className="clause"><span className="n">17</span> Grievance officer</h3>
    <p>If you have any questions about this Policy, how we process or handle your personal information, or otherwise, you may reach out to us with your queries, grievances, feedback, and comments at <a className="inline" href="mailto:legal@done.deals">legal@done.deals</a> or contact our grievance officer whose contact details are provided below. The Grievance Officer shall redress the complaint in accordance with the provisions of the Information Technology Act, 2000 and rules made thereunder.</p>
    <div className="contact-card">
      <div className="lab">Grievance Officer</div>
      <p>Rohit RK <span>· Grievance Officer</span></p>
      <p><span>Email:</span> <a className="inline" href="mailto:legal@done.deals">legal@done.deals</a></p>
    </div>
  </section>
</article>

</div>
      </main>
      <Footer />
    </>
  );
}

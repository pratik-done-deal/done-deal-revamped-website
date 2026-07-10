/**
 * About.jsx — Done Deal "About" page.
 *
 * Plain React + Tailwind CSS (arbitrary values for brand colors). No runtime deps.
 * All scroll / count-up / marquee / pin behavior is driven by custom hooks +
 * IntersectionObserver.
 *
 * Setup in your app:
 *   1. Tailwind must be configured (arbitrary values like `text-[#5C6FFF]` are used).
 *   2. Load the fonts once (index.html <head> or a global CSS import):
 *      <link rel="preconnect" href="https://fonts.googleapis.com">
 *      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 *      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
 *      (This file also appends the link automatically if it isn't present.)
 *
 * Usage:  import About from "./About";  … <About />
 */
import React, { useState, useEffect, useRef } from "react";
import photoParas from "../assets/paras.svg";
import photoPratik from "../assets/pratik.svg";
import photoAnand from "../assets/anand.svg";
import photoChandan from "../assets/chadan.svg";
import photoNavneet from "../assets/navneet.svg";
import photoAnubhav from "../assets/anubhav.svg";
import photoAshutosh from "../assets/ashutosh.svg";
import photoAbhijeet from "../assets/abhijeet.svg";
import photoGaurav from "../assets/bankers/gaurav.svg";
import photoVinit from "../assets/bankers/vinit.svg";
import photoDeepty from "../assets/bankers/deepty.svg";
import photoDhrish from "../assets/bankers/dhirish.svg";
import photoSagar from "../assets/bankers/sagar_parekh.svg";
import photoRohit from "../assets/founders/rohit.svg";
import photoAneesh from "../assets/founders/annesh.svg";
import photoAnkur from "../assets/founders/ankur.svg";
import photoFoundersGroup from "../assets/founders/founders.png";
import logoGruhas from "../assets/investors/gruhas.svg";
import logoWfc from "../assets/investors/wfc.svg";
import logoBarbershop from "../assets/investors/barbershop.svg";
import logoDezerv from "../assets/investors/dezerv.svg";
import logoCapitalA from "../assets/investors/capitalA.svg";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const DEALS = "https://www.done.deals";
const GET_STARTED_HREF = "https://www.done.deals/get-started";

// prefix + counted number + copper suffix (suffix rendered in champagne <em>)
const STATS = [
  { target: 35, caption: "Closed transactions — track record, not talk" },
  { target: 400, prefix: "₹", suffix: " Cr+", caption: "In enterprise value transacted" },
  { target: 1100, suffix: "+", caption: "Verified, structured buyers — not a Rolodex" },
  { target: 90, prefix: "45–", caption: "Days to close, where banks take 6–9 months" },
];

const FOUNDER_PARAS = [
  "The model that exists today was built for a world of large deals, long relationships and slow processes. Legacy bankers take 3% and disappear after the engagement letter. They send cold, templated buyer lists. They only call when the deal is big enough to justify their time. A 55-year-old MD earning a $2M bonus isn't the enemy — the system that made that the only model is.",
  { pre: "Done Deal was built to fix that. We bring institutional-grade M&A and fundraising to companies between ₹10 Cr and ₹200 Cr in enterprise value — a segment traditional banks have ignored for decades. ", em: "AI runs the analysis. We run the deal." },
  "AI handles roughly 80% of the analytical work — buyer discovery, document generation, outreach tracking, pattern analysis. That leverage frees our bankers to do what only humans can: the relationship, the judgment, the negotiation. Every mandate gets the rigour that used to be reserved for ₹500 Cr deals.",
  "We are founders, building for founders. We only win when you win. No retainers. No disappearing acts. Skin in the game.",
];

const FOUNDERS_SIGN = [
  { name: "Rohit Raj", role: "Co-Founder" },
  { name: "Aneesh Sivakumar", role: "Co-Founder" },
  { name: "Ankur Jain", role: "Co-Founder" },
];

const VALUES = [
  { n: "01", title: "Founder First, Always", body: "Every decision, process and message is optimised for the founder's outcome — not the fee, not the timeline that suits us. That's the lens for everything." },
  { n: "02", title: "Honest by Design", body: "We tell founders what they need to hear, not what they want to. Wrong timing, off valuation — we say so. The moment we mislead to win, we become the thing we replaced." },
  { n: "03", title: "Speed as a Discipline", body: "Fast isn't an attitude, it's a design choice. AI automates the work that took weeks so our team can focus on relationship, judgment and negotiation." },
  { n: "04", title: "Skin in the Game", body: "No retainers, no disappearing. We structure our success around yours. When incentives are fully aligned, we make better decisions for you — every time." },
  { n: "05", title: "Compound Everything", body: "Every deal makes the next one better. Every data point sharpens buyer matching; every relationship deepens the network. We're building a system, not a series of transactions." },
];

const INVESTOR_LOGOS = [
  { src: logoGruhas, alt: "Gruhas" },
  { src: logoBarbershop, alt: "The Barbershop" },
  { src: logoCapitalA, alt: "Capital A" },
  { src: logoWfc, alt: "We Founder Circle" },
  { src: logoDezerv, alt: "Dezerv Innovation Fund" },
];

const TEAM_GROUPS = [
  {
    label: "Core Team",
    members: [
      { initials: "RR", name: "Rohit Raj", role: "Co-Founder", photo: photoRohit, linkedin_url: "https://www.linkedin.com/in/rohitrajkaral/"},
      { initials: "AS", name: "Aneesh Sivakumar", role: "Co-Founder", photo: photoAneesh, linkedin_url: "https://www.linkedin.com/in/aneesh-sivakumar/" },
      { initials: "AJ", name: "Ankur Jain", role: "Co-Founder", photo: photoAnkur, linkedin_url: "https://www.linkedin.com/in/kurannija/" },
    ],
  },
  {
    label: "Bankers",
    members: [
      { initials: "GJ", name: "Gaurav Jha", role: "Founder's Office", photo: photoGaurav, linkedin_url: "https://www.linkedin.com/in/gaurav-jha1910" },
      { initials: "VJ", name: "Vinit Jain", role: "Associate", photo: photoVinit, linkedin_url: "https://www.linkedin.com/in/win-it-jain" },
      { initials: "DC", name: "Deepty Chopra", role: "Associate", photo: photoDeepty, linkedin_url: "https://www.linkedin.com/in/deepty-chopra/" },
      { initials: "DS", name: "Dhrish Saggi", role: "Category Lead", photo: photoDhrish, linkedin_url: "https://www.linkedin.com/in/dhrishsaggi/" },
      { initials: "SP", name: "Sagar Parekh", role: "Category Lead", photo: photoSagar, linkedin_url: "https://www.linkedin.com/in/parekh-sagar/" },
    ]
  },
  {
    label: "Engineers",
    members: [
      { initials: "PS", name: "Pratik Singh", role: "Software Engineer", photo: photoPratik, linkedin_url: "https://www.linkedin.com/in/pratik-singh-7316591ab/" },
      { initials: "AG", name: "Abhijeet Gautam", role: "Software Engineer", photo: photoAbhijeet, linkedin_url: "https://www.linkedin.com/in/abhijeet-gautam/" },
      { initials: "NS", name: "Navneet Singh", role: "Software Engineer", photo: photoNavneet, linkedin_url: "https://www.linkedin.com/in/navneet-singh-0b849820b/" },
      { initials: "AA", name: "Anubhav Aaryan", role: "Software Engineer", photo: photoAnubhav, linkedin_url: "https://www.linkedin.com/in/anubhav-aaryan-099987201/" },
      { initials: "AP", name: "Anand Prakash", role: "Software Tester", photo: photoAnand, linkedin_url: "https://www.linkedin.com/in/anand-prakash-a201b7192/" },
      { initials: "CK", name: "Chandan Kumar", role: "Software Tester", photo: photoChandan, linkedin_url: "https://www.linkedin.com/in/chandan-kumar-29a624205" },
      { initials: "AC", name: "Ashutosh Chandra", role: "Product Manager", photo: photoAshutosh, linkedin_url: "https://www.linkedin.com/in/ashuc98/" },
      { initials: "PT", name: "Paras Thappa", role: "Product Designer", photo: photoParas, linkedin_url: "https://www.linkedin.com/in/paras-thappa-49a505201/" },
      // { initials: "KR", name: "Karunanidhi Rajpoot", role: "Product Analyst" },
    ],
  },
];

const FOOTER_COLS = [
  { heading: "Done Deal", links: [{ label: "Contact us", href: DEALS }, { label: "About", href: "#" }] },
  { heading: "Product", links: [{ label: "For investors", href: DEALS }, { label: "Mandates", href: DEALS }] },
  { heading: "Resources", links: [{ label: "Blog", href: DEALS }, { label: "FAQ", href: DEALS }] },
  { heading: "Legal", links: [{ label: "Investor Terms", href: DEALS }, { label: "Company Terms", href: DEALS }, { label: "Privacy Policy", href: DEALS }] },
];

const GET_STARTED_CARDS = [
  {
    kind: "founders",
    tag: "For founders",
    title: "Raise capital or get acquired",
    body: "Get a free valuation, set your terms, and let vetted buyers and investors come to you.",
    cta: "I'm a founder",
    href: "#",
  },
  {
    kind: "investors",
    tag: "For investors",
    title: "Find deals that actually fit",
    body: "Join the buyer network and get thesis-matched, diligence-ready opportunities the moment they go live.",
    cta: "I'm an investor",
    href: "#",
  },
];

// Full done.deals wordmark (spliced in from the source page).
const LOGO = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzA3IiBoZWlnaHQ9IjU4IiB2aWV3Qm94PSIwIDAgMzA3IDU4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNjguODg0OCAxNS4yOTQ3QzY4Ljg4NDggMTEuOTUzNiA3MC42MjA5IDEwLjI5OTEgNzQuMDc2OSAxMC4yOTkxSDgzLjI1NTdDOTQuNzgxMyAxMC4yOTkxIDEwMC44NzQgMTcuMTA5OCAxMDAuODc0IDMwLjAwODVDMTAwLjg3NCA0Mi45MDcyIDk0Ljc4MTMgNDkuNjg1OCA4My4yNTU3IDQ5LjY4NThINzQuMDc2OUM3MC42MDQ4IDQ5LjY4NTggNjguODg0OCA0OC4wNDc0IDY4Ljg4NDggNDQuNjkwMlYxNS4yOTQ3Wk04Mi4yNzUxIDQzLjMwODhDODkuNTI0OSA0My4zMDg4IDkyLjkwMDYgMzkuMDM2IDkyLjkwMDYgMzAuMDA4NUM5Mi45MDA2IDIwLjk4MSA4OS40OTI3IDE2LjY0NCA4Mi4yNzUxIDE2LjY0NEg3Ni42ODExVjQzLjMwODhIODIuMjc1MVoiIGZpbGw9IndoaXRlIj48L3BhdGg+CjxwYXRoIGQ9Ik0xMzIuMDggMzIuNDkzMVYzNi4xMDczQzEzMi4wOCA0NS4xOTkgMTI2LjMwOSA1MC4zNTUzIDExNy45NjYgNTAuMzU1M0MxMDkuNjIzIDUwLjM1NTMgMTAzLjgyIDQ1LjE5OSAxMDMuODIgMzYuMTM5NFYzMi41NDEzQzEwMy44MiAyMy43MDY2IDEwOS41OTEgMTguNDM3OSAxMTcuOTY2IDE4LjQzNzlDMTI2LjM0MSAxOC40Mzc5IDEzMi4wOCAyMy43MjI2IDEzMi4wOCAzMi41MDkyVjMyLjQ5MzFaTTExMS42NDkgMzIuNjY5OFYzNi4wNzUyQzExMS42NDkgNDEuMjk1NyAxMTQuMDc2IDQ0LjQ0NCAxMTcuOTY2IDQ0LjQ0NEMxMjEuODU2IDQ0LjQ0NCAxMjQuMjY4IDQxLjI5NTcgMTI0LjI2OCAzNi4wNzUyVjMyLjY2OThDMTI0LjI2OCAyNy41MTM1IDEyMS45MzcgMjQuMzMzIDExNy45NjYgMjQuMzMzQzExMy45OTYgMjQuMzMzIDExMS42NDkgMjcuNTEzNSAxMTEuNjQ5IDMyLjY2OThaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8cGF0aCBkPSJNMTU5LjU1NCA0OS45Njc5QzE1Ny4wOTUgNDkuOTY3OSAxNTUuNzQ1IDQ4LjQ3NCAxNTUuNzQ1IDQ1Ljc5MTVWMzEuMjU0NEMxNTUuNzQ1IDI3LjIzODYgMTUzLjc1MSAyNC45ODk3IDE1MC4yMzEgMjQuOTg5N0MxNDYuMjc3IDI0Ljk4OTcgMTQzLjgwMSAyNy44OTcyIDE0My44MDEgMzIuNjY3OVY0NS43OTE1QzE0My44MDEgNDguNDc0IDE0Mi40MTkgNDkuOTY3OSAxMzkuOTkxIDQ5Ljk2NzlDMTM3LjU2NCA0OS45Njc5IDEzNi4xODIgNDguNDc0IDEzNi4xODIgNDUuNzkxNVYyMi44NTMzQzEzNi4xODIgMjAuMzQ3NSAxMzcuNjI4IDE4Ljc4OTQgMTM5LjkyNyAxOC43ODk0QzE0Mi4yMjYgMTguNzg5NCAxNDMuNTQ0IDIwLjEzODcgMTQzLjYyNCAyMi41OTYzVjI0LjQ3NTdIMTQzLjk5NEMxNDUuMTg0IDIwLjg0NTUgMTQ4LjYwNyAxOC41OTY2IDE1My4xMjUgMTguNTk2NkMxNTkuNjUxIDE4LjU5NjYgMTYzLjM0OCAyMi40Njc4IDE2My4zNDggMjkuMTgyMlY0NS44MjM2QzE2My4zNDggNDguNTA2MSAxNjEuOTk4IDQ5Ljk4MzkgMTU5LjU3MSA0OS45ODM5TDE1OS41NTQgNDkuOTY3OVoiIGZpbGw9IndoaXRlIj48L3BhdGg+CjxwYXRoIGQ9Ik0xNjcuMjczIDMyLjQzNDVDMTY3LjI3MyAyNC4wNjU3IDE3Mi44MTkgMTguNDExNCAxODEuMDUgMTguNDExNEMxODguODQ2IDE4LjQxMTQgMTk0LjM2IDIzLjk1MzIgMTk0LjM2IDMxLjUwMjlDMTk0LjM2IDM0Ljk0MDQgMTkzLjM3OSAzNi4wNjQ4IDE5MC41MTggMzYuMDY0OEgxNzUuMDIyVjM3LjM5OEMxNzUuMDU0IDQxLjY3MDggMTc3Ljc3IDQ0LjQwMTYgMTgyLjMwMyA0NC40MDE2QzE4NC42NjYgNDQuNDAxNiAxODYuMzM4IDQzLjgyMzMgMTg3LjcwNSA0Mi42OTg5QzE4OS4xODMgNDEuNTc0NSAxODkuNjk4IDQxLjE0MDcgMTkwLjg4NyA0MS4xNDA3QzE5Mi40NzkgNDEuMTQwNyAxOTMuNTcyIDQyLjIzMyAxOTMuNTcyIDQzLjkwMzZDMTkzLjU3MiA0NS4yNTI5IDE5Mi43MzYgNDYuNTU0IDE5MS4yODkgNDcuNTk4MUMxODkuMjY0IDQ5LjMwMDggMTg1Ljc3NiA1MC4zNDQ5IDE4MS44MjEgNTAuMzQ0OUMxNzIuODM1IDUwLjM0NDkgMTY3LjMwNiA0NS4wNjAxIDE2Ny4zMDYgMzYuMzg2MVYzMi40MzQ1SDE2Ny4yNzNaTTE4Ny4wNzggMzEuMjQ1OVYzMS4xODE2QzE4Ny4wNzggMjcuMDA1MiAxODQuNzYzIDI0LjI5MDUgMTgxLjE2MiAyNC4yOTA1QzE3Ny41NjEgMjQuMjkwNSAxNzUuMDA1IDI3LjA1MzQgMTc1LjAwNSAzMS4xODE2VjMxLjI0NTlIMTg3LjA3OFoiIGZpbGw9IndoaXRlIj48L3BhdGg+CjxwYXRoIGQ9Ik0yMDMuNzc5IDE1LjI5NDdDMjAzLjc3OSAxMS45NTM2IDIwNS41MTUgMTAuMjk5MSAyMDguOTcxIDEwLjI5OTFIMjE4LjE1QzIyOS42NzYgMTAuMjk5MSAyMzUuNzY4IDE3LjEwOTggMjM1Ljc2OCAzMC4wMDg1QzIzNS43NjggNDIuOTA3MiAyMjkuNjc2IDQ5LjY4NTggMjE4LjE1IDQ5LjY4NThIMjA4Ljk3MUMyMDUuNDk5IDQ5LjY4NTggMjAzLjc3OSA0OC4wNDc0IDIwMy43NzkgNDQuNjkwMlYxNS4yOTQ3Wk0yMTcuMTcgNDMuMzA4OEMyMjQuNDE5IDQzLjMwODggMjI3Ljc5NSAzOS4wMzYgMjI3Ljc5NSAzMC4wMDg1QzIyNy43OTUgMjAuOTgxIDIyNC4zODcgMTYuNjQ0IDIxNy4xNyAxNi42NDRIMjExLjU3NlY0My4zMDg4SDIxNy4xN1oiIGZpbGw9IndoaXRlIj48L3BhdGg+CjxwYXRoIGQ9Ik0yMzguODAzIDMyLjQzNDVDMjM4LjgwMyAyNC4wNjU3IDI0NC4zNDkgMTguNDExNCAyNTIuNTc5IDE4LjQxMTRDMjYwLjM3NSAxOC40MTE0IDI2NS44ODkgMjMuOTUzMiAyNjUuODg5IDMxLjUwMjlDMjY1Ljg4OSAzNC45NDA0IDI2NC45MDggMzYuMDY0OCAyNjIuMDQ3IDM2LjA2NDhIMjQ2LjU1MVYzNy4zOThDMjQ2LjU4MyA0MS42NzA4IDI0OS4zIDQ0LjQwMTYgMjUzLjgzMyA0NC40MDE2QzI1Ni4xOTYgNDQuNDAxNiAyNTcuODY3IDQzLjgyMzMgMjU5LjIzNCA0Mi42OTg5QzI2MC43MTMgNDEuNTc0NSAyNjEuMjI3IDQxLjE0MDcgMjYyLjQxNyA0MS4xNDA3QzI2NC4wMDggNDEuMTQwNyAyNjUuMTAxIDQyLjIzMyAyNjUuMTAxIDQzLjkwMzZDMjY1LjEwMSA0NS4yNTI5IDI2NC4yNjUgNDYuNTU0IDI2Mi44MTkgNDcuNTk4MUMyNjAuNzkzIDQ5LjMwMDggMjU3LjMwNSA1MC4zNDQ5IDI1My4zNSA1MC4zNDQ5QzI0NC4zNjUgNTAuMzQ0OSAyMzguODM1IDQ1LjA2MDEgMjM4LjgzNSAzNi4zODYxVjMyLjQzNDVIMjM4LjgwM1pNMjU4LjYwNyAzMS4yNDU5VjMxLjE4MTZDMjU4LjYwNyAyNy4wMDUyIDI1Ni4yOTIgMjQuMjkwNSAyNTIuNjkxIDI0LjI5MDVDMjQ5LjA5MSAyNC4yOTA1IDI0Ni41MzUgMjcuMDUzNCAyNDYuNTM1IDMxLjE4MTZWMzEuMjQ1OUgyNTguNjA3VjMxLjI0NTlaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8cGF0aCBkPSJNMjc4LjIzMyA1MC4wODc1QzI3Mi4yNTQgNTAuMDg3NSAyNjguMjE5IDQ2LjM0NDggMjY4LjIxOSA0MC43NzA5QzI2OC4yMTkgMzUuMTk3IDI3Mi4zOTggMzEuNjMxIDI3OS4zNTkgMzEuNjMxSDI4Ni42NDFWMjkuMTI1MkMyODYuNjQxIDI2LjA0MTEgMjg0LjcxMiAyNC40MTg3IDI4MS4yMDcgMjQuNDE4N0MyNzguODkyIDI0LjQxODcgMjc3LjI1MyAyNS4yODYxIDI3NS41NDkgMjYuODEyMUMyNzQuNjgxIDI3LjUwMjggMjczLjg3NyAyNy44MjQxIDI3Mi42MzkgMjcuODI0MUMyNzAuOTY4IDI3LjgyNDEgMjY5LjkyMyAyNi42OTk2IDI2OS45MjMgMjUuMTQxNUMyNjkuOTIzIDIzLjM1ODUgMjcxLjE2IDIxLjUyNzMgMjczLjg0NSAyMC4xNzhDMjc1Ljc3NCAxOS4xNjYgMjc4LjM0NiAxOC41ODc4IDI4MS42ODkgMTguNTg3OEMyODkuNzExIDE4LjU4NzggMjk0LjIxMiAyMi4zOTQ3IDI5NC4yMTIgMjkuMTczNFY0NS45MTExQzI5NC4yMTIgNDguNTEzNCAyOTIuODc4IDQ5Ljk3NTEgMjkwLjUxNSA0OS45NzUxQzI4OC40ODkgNDkuOTc1MSAyODcuMTcxIDQ4Ljg1MDcgMjg2LjkzIDQ2Ljg1ODlWNDUuNzgyNkgyODYuNTZDMjg1LjAwMSA0OC41Mjk0IDI4MS45NjMgNTAuMDg3NSAyNzguMjE3IDUwLjA4NzVIMjc4LjIzM1pNMjgwLjc3MyA0NC42MUMyODQuMDY5IDQ0LjYxIDI4Ni42NDEgNDIuMzYxMiAyODYuNjQxIDM5LjQ2OThWMzYuMjg5M0gyODAuNzU3QzI3Ny42MzkgMzYuMjg5MyAyNzUuNzkgMzcuNzgzMiAyNzUuNzkgNDAuMzA1MUMyNzUuNzkgNDIuODI3IDI3Ny44MTUgNDQuNjEgMjgwLjc4OSA0NC42MUgyODAuNzczWiIgZmlsbD0id2hpdGUiPjwvcGF0aD4KPHBhdGggZD0iTTI5OS4zODEgNDUuNzk0MVYxMi4yMDYyQzI5OS4zODEgOS40NDMzIDMwMC44MjggNy45OTc2MiAzMDMuMTkxIDcuOTk3NjJDMzA1LjU1NCA3Ljk5NzYyIDMwNyA5LjQ0MzMgMzA3IDEyLjIwNjJWNDUuNzk0MUMzMDcgNDguNTU3IDMwNS41MjEgNDkuOTcwNSAzMDMuMTkxIDQ5Ljk3MDVDMzAwLjg2IDQ5Ljk3MDUgMjk5LjM4MSA0OC41NTcgMjk5LjM4MSA0NS43OTQxWiIgZmlsbD0id2hpdGUiPjwvcGF0aD4KPHBhdGggZD0iTTM5LjQzMTYgMEgxOC4xMTYzQzguMTE3NzkgMCAwIDguMTExODcgMCAxOC4xMDMxVjM5LjQxODlDMCA0OS4zOTQxIDguMTE3NzkgNTcuNTIyIDE4LjExNjMgNTcuNTIySDM5LjQ0NzZDNDkuNDMwMSA1Ny41MjIgNTcuNTY0IDQ5LjQxMDEgNTcuNTY0IDM5LjQxODlWMTguMTAzMUM1Ny41NjQgOC4xMjc5NCA0OS40NDYyIDAgMzkuNDQ3NiAwSDM5LjQzMTZaTTUuMDQ3NSA0MS43NjQxQzQuOTAyODMgNDAuOTkzMSA0LjgyMjQ1IDQwLjIwNiA0LjgyMjQ1IDM5LjQwMjhWMTguMTAzMUM0LjgyMjQ1IDEwLjc3ODQgMTAuNzg2MiA0LjgxODkzIDE4LjExNjMgNC44MTg5M0gzOS40NDc2QzQzLjE5MzEgNC44MTg5MyA0Ni41ODQ5IDYuMzc3MDYgNDguOTk2MSA4Ljg4MjlMNDEuODc0OSAxNi4wMTQ5QzM3Ljg0MDIgMTMuNjY5NyAzMi42MzE5IDE0LjI0OCAyOS4xOTE5IDE3LjY4NTVMNS4wNDc1IDQxLjc2NDFaTTUyLjcyNTUgMzkuNDAyOEM1Mi43MjU1IDQ2LjcyNzYgNDYuNzYxNyA1Mi42ODcgMzkuNDMxNiA1Mi42ODdIMTguMTE2M0MxNC4zNzA5IDUyLjY4NyAxMC45NzkxIDUxLjExMjggOC41NTE4MSA0OC42MDdMMTUuNjU2OSA0MS41MDcxQzE5LjcyMzggNDMuODUyMyAyNC45NDgxIDQzLjI1OCAyOC40MDQyIDM5LjgyMDVMNTIuNTAwNCAxNS43MDk3QzUyLjY0NTEgMTYuNDgwOCA1Mi43MjU1IDE3LjI4MzkgNTIuNzI1NSAxOC4xMDMxVjM5LjQxODlWMzkuNDAyOFoiIGZpbGw9IndoaXRlIj48L3BhdGg+Cjwvc3ZnPg==";

const HATCH = "repeating-linear-gradient(135deg,transparent 0,transparent 13px,rgba(236,233,226,0.035) 13px,rgba(236,233,226,0.035) 14px)";
const EASE_OUT = "cubic-bezier(.22,1,.36,1)";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const LINKEDIN_D =
  "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v13H.2V8zm7.2 0h4.4v1.78h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 7v6.6h-4.6v-5.85c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21H7.4V8z";

function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={LINKEDIN_D} />
    </svg>
  );
}

function XIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.5h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.8-7.6-6.7 7.6H.4l8.6-9.8L0 1.5h7.6l5.2 6.9 6.1-6.9zm-1.3 19.5h2L6.5 3.4H4.4l13.2 17.6z" />
    </svg>
  );
}

function ArrowRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

function CloseIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function FoundersIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function InvestorsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Keyframes + font injection                                         */
/* ------------------------------------------------------------------ */

const KEYFRAMES = `
@keyframes dd-ambFloat { 0% { translate: -13px 10px; } 100% { translate: 16px -22px; } }
@keyframes dd-ambFloat2 { 0% { translate: 15px 14px; } 100% { translate: -18px -14px; } }
@keyframes dd-livePulse { 0% { box-shadow: 0 0 0 0 rgba(50,213,131,0.5); } 70% { box-shadow: 0 0 0 7px rgba(50,213,131,0); } 100% { box-shadow: 0 0 0 0 rgba(50,213,131,0); } }
@keyframes dd-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.dd-marquee:hover .dd-marquee-track { animation-play-state: paused; }
@media (prefers-reduced-motion: no-preference) {
  .dd-amb > * { animation: dd-ambFloat 9s ease-in-out infinite alternate; }
  .dd-amb > :nth-child(2n) { animation-duration: 12s; animation-delay: -5s; }
  .dd-amb > :nth-child(3n) { animation-duration: 15s; animation-delay: -8s; animation-name: dd-ambFloat2; }
}
@media (prefers-reduced-motion: reduce) { .dd-marquee-track { animation: none !important; } }
`;

function useBrandChrome() {
  useEffect(() => {
    const FONT_ID = "dd-instrument-fonts";
    if (!document.getElementById(FONT_ID)) {
      const link = document.createElement("link");
      link.id = FONT_ID;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400&family=Instrument+Serif:ital@0;1&display=swap";
      document.head.appendChild(link);
    }
    const STYLE_ID = "dd-about-keyframes";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = KEYFRAMES;
      document.head.appendChild(style);
    }
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

function useInView({ threshold = 0.12, rootMargin = "0px 0px -8% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(el);

    // Fallback: reveal anything already within the viewport on mount, in case
    // the observer is slow/throttled (mirrors the source page's on-load sweep).
    const sweep = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (el.getBoundingClientRect().top < vh * 0.92) {
        setInView(true);
        if (once) io.unobserve(el);
      }
    };
    const raf = requestAnimationFrame(sweep);
    const t = setTimeout(sweep, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      io.disconnect();
    };
  }, [threshold, rootMargin, once]);
  return [ref, inView];
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let lastY = window.scrollY || 0;
    let acc = 0;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 24);
      const dy = y - lastY;
      lastY = y;
      if (y < 140) {
        setHidden(false);
        acc = 0;
      } else {
        acc = dy > 0 === acc > 0 ? acc + dy : dy;
        if (acc > 26) setHidden(true);
        else if (acc < -26) setHidden(false);
      }
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { scrolled, hidden, progress };
}

// Pins the values section and drives horizontal scroll via vertical scroll.
// Falls back to a native horizontal-snap scroller on small screens / reduced motion.
function useHorizontalPin() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [noPin, setNoPin] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    const small = window.matchMedia("(max-width: 900px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let maxX = 0;
    let queued = false;

    const tick = () => {
      if (small.matches || reduce.matches) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      track.style.transform = `translate3d(${(-progress * maxX).toFixed(1)}px,0,0)`;
    };

    const measure = () => {
      const isSmall = small.matches || reduce.matches;
      setNoPin(isSmall);
      if (isSmall) {
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = window.innerHeight + maxX + "px";
      tick();
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          tick();
          queued = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);
  return { sectionRef, viewportRef, trackRef, noPin };
}

// Lock page scroll while a modal / mobile menu is open.
function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [locked]);
}

/* ------------------------------------------------------------------ */
/*  Presentational primitives                                          */
/* ------------------------------------------------------------------ */

function Reveal({ as: Tag = "div", className = "", style, children, ...rest }) {
  const [ref, inView] = useInView();
  const reduce = usePrefersReducedMotion();
  const shown = inView || reduce;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(18px)",
        transition: `opacity .8s ${EASE_OUT}, transform .8s ${EASE_OUT}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function AccentI({ children }) {
  return (
    <span className="font-['Instrument_Serif',Georgia,serif] italic font-normal text-[1.08em] tracking-normal text-[#A6AEFF]">
      {children}
    </span>
  );
}

function AccentCopper({ children }) {
  return (
    <span className="font-['Instrument_Serif',Georgia,serif] italic font-normal text-[1.08em] tracking-normal text-[#F4CD66]">
      {children}
    </span>
  );
}

function Kicker({ children, center = false, className = "" }) {
  return (
    <div
      className={`inline-flex items-center font-semibold text-[12px] tracking-[0.2em] uppercase text-[rgba(236,233,226,0.62)] ${
        center ? "justify-center" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionNum({ children }) {
  return <span className="font-semibold tracking-[0.1em] text-[#A6AEFF] mr-[10px]">{children}</span>;
}

function LiveDot() {
  return (
    <span
      className="w-[7px] h-[7px] rounded-full bg-[#32d583] mr-[10px] shrink-0"
      style={{ animation: `dd-livePulse 2.4s ${EASE_OUT} infinite` }}
    />
  );
}

function Btn({ variant = "primary", href, children, className = "", ...rest }) {
  const base =
    "inline-flex items-center gap-[10px] font-semibold text-[15px] tracking-[-0.01em] px-[26px] py-[14px] rounded-[13px] no-underline whitespace-nowrap cursor-pointer transition duration-300 active:scale-[0.98]";
  const variants = {
    primary:
      "text-white bg-[radial-gradient(120%_160%_at_50%_-40%,rgba(166,174,255,0.5),transparent_60%),linear-gradient(#6577ff_0%,#4b5ce8_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.22),0_8px_28px_rgba(92,111,255,0.38)] hover:brightness-110",
    ghost:
      "text-[#ECE9E2] bg-transparent border border-[rgba(236,233,226,0.22)] hover:border-[#ECE9E2] hover:bg-[rgba(236,233,226,0.04)]",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

function Orb({ variant, className = "", style }) {
  const grads = {
    blue: "radial-gradient(circle,rgba(92,111,255,0.55),transparent 68%)",
    "blue-soft": "radial-gradient(circle,rgba(124,138,255,0.34),transparent 70%)",
    gold: "radial-gradient(circle,rgba(232,194,90,0.34),transparent 70%)",
    copper: "radial-gradient(circle,rgba(208,155,108,0.3),transparent 70%)",
  };
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full blur-[72px] pointer-events-none ${className}`}
      style={{ backgroundImage: grads[variant], ...style }}
    />
  );
}

// A placeholder media box with diagonal hatch fill.
function MediaPlaceholder({ label, className = "" }) {
  return (
    <div
      className={`relative w-full flex items-center justify-center border border-[rgba(236,233,226,0.12)] rounded-[24px] overflow-hidden bg-[#121019] ${className}`}
      style={{ backgroundImage: HATCH }}
    >
      <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[rgba(236,233,226,0.40)]">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Composite components                                               */
/* ------------------------------------------------------------------ */

function AnimatedStat({ stat }) {
  const [ref, inView] = useInView({ threshold: 0.25, rootMargin: "0px", once: true });
  const reduce = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(stat.target);
      return;
    }
    if (!inView) return;
    let raf;
    let start = null;
    const dur = 1600;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      setValue(stat.target * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, stat.target]);

  const num = Math.round(value).toString();

  return (
    <div ref={ref} className="border-t-2 border-[rgba(236,233,226,0.22)] pt-[22px]">
      <div className="font-semibold leading-none tracking-[-0.035em] text-[#ECE9E2] whitespace-nowrap text-[clamp(34px,4vw,52px)]">
        <span>
          {stat.prefix || ""}
          {num}
        </span>
        {stat.suffix && <em className="not-italic text-[#ECCBA8]">{stat.suffix}</em>}
      </div>
      <div className="mt-[14px] mx-auto max-w-[230px] text-[14px] leading-[1.5] text-[rgba(236,233,226,0.62)]">{stat.caption}</div>
    </div>
  );
}

function TopNav({ onGetStarted, onOpenMobile }) {
  const { scrolled, hidden, progress } = useNavScroll();
  return (
    <>
      {/* scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-[rgba(236,233,226,0.06)]" aria-hidden="true">
        <div
          className="h-full bg-[linear-gradient(90deg,#D09B6C,#A6AEFF_55%,#5C6FFF)] shadow-[0_0_12px_rgba(92,111,255,0.45)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[clamp(24px,6.5vw,120px)] py-[18px] border-b transition-[background,backdrop-filter,border-color,transform] duration-[450ms] ${
          scrolled ? "bg-[rgba(10,10,13,0.72)] backdrop-blur-[18px] border-[rgba(236,233,226,0.12)]" : "border-transparent"
        } ${hidden ? "-translate-y-[110%]" : "translate-y-0"}`}
        style={{ transitionTimingFunction: EASE_OUT }}
      >
        <a className="flex items-center gap-[11px] no-underline" href={DEALS}>
          <img className="h-[26px] w-auto block" src={LOGO} alt="done.deals" />
        </a>

        <nav className="hidden md:flex gap-[34px]">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-[14.5px] tracking-[-0.01em] whitespace-nowrap no-underline transition-colors duration-200 hover:text-[#ECE9E2] ${
                l.active ? "text-[#ECE9E2]" : "text-[rgba(236,233,226,0.62)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onGetStarted}
          className="hidden md:inline-flex text-[14.5px] font-semibold text-white whitespace-nowrap px-[20px] py-[11px] rounded-[11px] cursor-pointer bg-[radial-gradient(120%_160%_at_50%_-40%,rgba(166,174,255,0.5),transparent_60%),linear-gradient(#6577ff_0%,#4b5ce8_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.22),0_8px_28px_rgba(92,111,255,0.38)] transition duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          Get started
        </button>

        {/* burger */}
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="md:hidden flex flex-col justify-center gap-[5px] w-[44px] h-[44px] px-[9px] bg-transparent border-0 cursor-pointer"
        >
          <span className="block h-[2px] w-[24px] rounded-[2px] bg-[#ECE9E2]" />
          <span className="block h-[2px] w-[24px] rounded-[2px] bg-[#ECE9E2]" />
          <span className="block h-[2px] w-[24px] rounded-[2px] bg-[#ECE9E2]" />
        </button>
      </header>
    </>
  );
}

function MobileNav({ open, onClose, onGetStarted }) {
  useScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <nav
      aria-label="Mobile navigation"
      aria-hidden={!open}
      className="md:hidden fixed inset-0 z-[9998] flex flex-col px-[28px] pt-[104px] pb-[40px] bg-[rgba(8,8,12,0.97)] backdrop-blur-[22px] transition-[opacity,transform,visibility] duration-[320ms]"
      style={{
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transform: open ? "none" : "translateY(-8px)",
        transitionTimingFunction: EASE_OUT,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[72px] flex items-center justify-between px-[20px]">
        <button className="inline-flex items-center bg-transparent border-0 p-0 cursor-pointer" onClick={onClose} aria-label="Home">
          <img className="h-[26px] w-auto block" src={LOGO} alt="done.deals" />
        </button>
        <button className="inline-flex items-center justify-center w-[44px] h-[44px] -mr-[9px] bg-transparent border-0 text-[#ECE9E2] cursor-pointer" onClick={onClose} aria-label="Close menu">
          <CloseIcon size={26} />
        </button>
      </div>

      {NAV_LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          onClick={onClose}
          className="text-[#ECE9E2] no-underline text-[30px] font-medium tracking-[-0.02em] py-[18px] border-b border-[rgba(255,255,255,0.09)] active:text-[#A6AEFF]"
        >
          {l.label}
        </a>
      ))}

      <button
        type="button"
        onClick={() => {
          onClose();
          onGetStarted();
        }}
        className="mt-auto inline-flex items-center justify-center text-white text-[17px] font-semibold px-[24px] py-[17px] rounded-[14px] bg-[#5C6FFF] shadow-[0_8px_28px_rgba(92,111,255,0.38)] cursor-pointer border-0"
      >
        Get started
      </button>
    </nav>
  );
}

function GetStartedModal({ open, onClose }) {
  useScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get started with Done Deal"
      className="fixed inset-0 z-[200] flex items-center justify-center p-[24px]"
      style={{ visibility: open ? "visible" : "hidden" }}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(7,7,11,0.62)] backdrop-blur-[14px] transition-opacity duration-[320ms]"
        style={{ opacity: open ? 1 : 0, transitionTimingFunction: EASE_OUT }}
      />
      <div
        className="relative w-full max-w-[860px] px-[46px] pt-[46px] pb-[44px] rounded-[26px] overflow-hidden border border-[rgba(236,233,226,0.22)] bg-[linear-gradient(180deg,#141220_0%,#100E1A_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(124,138,255,0.08)] transition-[opacity,transform] duration-[340ms] max-[680px]:px-[20px] max-[680px]:pt-[38px] max-[680px]:pb-[28px] max-[680px]:rounded-[22px]"
        style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(14px) scale(0.99)", transitionTimingFunction: EASE_OUT }}
      >
        <div className="absolute w-[520px] h-[360px] left-1/2 -translate-x-1/2 top-[-40%] pointer-events-none bg-[radial-gradient(closest-side,rgba(92,111,255,0.20),transparent_70%)]" />
        <div className="absolute w-[320px] h-[280px] right-[-12%] bottom-[-30%] pointer-events-none bg-[radial-gradient(closest-side,rgba(208,155,108,0.14),transparent_70%)]" />

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-[18px] right-[18px] z-[3] w-[38px] h-[38px] flex items-center justify-center rounded-full border border-[rgba(236,233,226,0.12)] bg-[rgba(236,233,226,0.04)] text-[rgba(236,233,226,0.62)] cursor-pointer transition hover:text-[#ECE9E2] hover:bg-[rgba(236,233,226,0.10)] active:scale-[0.94]"
        >
          <CloseIcon size={17} />
        </button>

        <div className="relative text-center mb-[30px]">
          <div className="inline-flex items-center gap-[10px] text-[12px] font-semibold tracking-[0.2em] uppercase text-[#A6AEFF] mb-[14px]">Get started</div>
          <h2 className="font-medium leading-[1.04] tracking-[-0.03em] text-[#ECE9E2] text-[clamp(26px,3.6vw,38px)]">
            Which side of the <AccentI>deal</AccentI> are you on?
          </h2>
          <p className="text-[15.5px] text-[rgba(236,233,226,0.62)] mt-[12px]">Pick your path — we'll take it from here.</p>
        </div>

        <div className="relative grid grid-cols-2 gap-[18px] max-[680px]:grid-cols-1">
          {GET_STARTED_CARDS.map((c) => {
            const inv = c.kind === "investors";
            return (
              <a
                key={c.kind}
                href={c.href}
                className={`group relative flex flex-col no-underline rounded-[18px] border border-[rgba(236,233,226,0.12)] bg-[rgba(236,233,226,0.025)] px-[24px] pt-[26px] pb-[24px] overflow-hidden transition duration-200 hover:-translate-y-[3px] ${
                  inv
                    ? "hover:border-[rgba(208,155,108,0.5)] hover:bg-[rgba(208,155,108,0.06)]"
                    : "hover:border-[rgba(124,138,255,0.5)] hover:bg-[rgba(124,138,255,0.06)]"
                }`}
                style={{ transitionTimingFunction: EASE_OUT }}
              >
                <div
                  className={`w-[48px] h-[48px] rounded-[13px] flex items-center justify-center mb-[18px] border ${
                    inv
                      ? "text-[#E8C25A] bg-[rgba(208,155,108,0.12)] border-[rgba(208,155,108,0.24)]"
                      : "text-[#7C8AFF] bg-[rgba(92,111,255,0.12)] border-[rgba(92,111,255,0.22)]"
                  }`}
                >
                  {inv ? <InvestorsIcon /> : <FoundersIcon />}
                </div>
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[rgba(236,233,226,0.40)] mb-[8px]">{c.tag}</div>
                <div className="text-[21px] font-semibold tracking-[-0.01em] text-[#ECE9E2] mb-[9px]">{c.title}</div>
                <p className="text-[14.5px] leading-[1.6] text-[rgba(236,233,226,0.62)] mb-[22px] flex-1">{c.body}</p>
                <span className="inline-flex items-center gap-[9px] text-[14.5px] font-semibold text-[#ECE9E2]">
                  {c.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-[4px]" style={{ transitionTimingFunction: EASE_OUT }}>
                    <ArrowRight />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function About() {
  useBrandChrome();
  const { sectionRef, viewportRef, trackRef, noPin } = useHorizontalPin();

  return (
    <div className="relative z-[1] font-['Instrument_Sans',system-ui,-apple-system,sans-serif] text-[#ECE9E2] text-[17px] leading-[1.6] tracking-[-0.005em] antialiased [overflow-x:clip]">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative text-center py-[clamp(76px,9vh,132px)] pt-[clamp(96px,12vh,132px)] pb-[clamp(40px,6vh,68px)]" data-screen-label="About hero">
          <div className="dd-amb absolute inset-0 overflow-hidden pointer-events-none z-0 max-md:hidden">
            <Orb variant="gold" style={{ width: 520, height: 440, left: "50%", top: "-14%", transform: "translateX(-50%)", opacity: 0.32 }} />
            <Orb variant="blue" style={{ width: 360, height: 320, left: "4%", top: "22%", opacity: 0.3 }} />
            <div className="absolute rounded-full border border-[rgba(236,233,226,0.12)]" style={{ width: 300, height: 300, right: "5%", top: "14%" }} />
          </div>
          <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] relative z-[1]">
            <Reveal className="max-w-[900px] mx-auto">
              <Kicker center className="mb-[22px]">
                <LiveDot />
                About Done Deal
              </Kicker>
              <h1 className="font-semibold leading-none tracking-[-0.033em] text-[#ECE9E2] [text-wrap:balance] mx-auto max-w-[26ch] text-[clamp(38px,4.5vw,60px)]">
                M&A and fundraising, <AccentCopper>rebuilt for ambitious founders.</AccentCopper>
              </h1>
              <p className="text-[rgba(236,233,226,0.62)] leading-[1.6] tracking-[-0.006em] max-w-[740px] mx-auto mt-[26px] text-[clamp(16px,1.6vw,19px)]">
                Done Deal is India's AI-native investment bank for the ambitious mid-market — institutional-grade M&A capability with the speed and intelligence of a technology company. Built for the founders legacy banks were never designed to serve.
              </p>
              {/* <div className="flex gap-[14px] justify-center flex-wrap mt-[40px] max-md:flex-col max-md:items-stretch">
                <Btn variant="primary" href={DEALS} className="max-md:w-full max-md:justify-center">
                  Talk to us <span aria-hidden="true">→</span>
                </Btn>
                <Btn variant="ghost" href={GET_STARTED_HREF} className="max-md:w-full max-md:justify-center">
                  Join the team
                </Btn>
              </div> */}
            </Reveal>
          </div>
        </section>

        {/* ── HERO MEDIA ───────────────────────────────────── */}
        {/* <section className="pt-[clamp(24px,3vh,40px)] pb-[clamp(64px,9vh,120px)]" data-screen-label="About image">
          <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] relative z-[1]">
            <Reveal>
              <MediaPlaceholder label="Team / office photo — full-bleed hero" className="h-[clamp(320px,40vw,480px)]" />
            </Reveal>
          </div>
        </section> */}

        {/* ── STATS ────────────────────────────────────────── */}
        <section className="pb-[clamp(76px,9vh,132px)]" data-screen-label="Track record">
          <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] relative z-[1]">
            <Reveal className="grid grid-cols-4 gap-[28px] max-w-[1080px] mx-auto text-center max-[820px]:grid-cols-2 max-[820px]:gap-y-[40px] max-[820px]:gap-x-[24px]">
              {STATS.map((s, i) => (
                <AnimatedStat key={i} stat={s} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── FOUNDER NOTE ─────────────────────────────────── */}
        <section className="relative py-[clamp(76px,9vh,132px)]" data-screen-label="Founder note">
          <div className="dd-amb absolute inset-0 overflow-hidden pointer-events-none z-0 max-md:hidden">
            <Orb variant="blue" style={{ width: 420, height: 360, right: "-6%", top: "6%", opacity: 0.26 }} />
          </div>
          <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] relative z-[1]">
            <div className="grid grid-cols-[0.82fr_1fr] gap-[clamp(36px,4.5vw,76px)] items-start max-w-[1180px] mx-auto max-[900px]:grid-cols-1 max-[900px]:gap-[36px]">
              <Reveal className="sticky top-[96px] max-[900px]:static">
                <img
                  src={photoFoundersGroup}
                  alt="The founding team"
                  className="w-full h-[clamp(240px,25.6vw,344px)] object-cover rounded-[24px] border border-[rgba(236,233,226,0.12)]"
                />
              </Reveal>

              <div>
                <Reveal className="mb-[28px]">
                  <Kicker className="mb-[20px]">
                    <SectionNum>01</SectionNum>A note from the founders
                  </Kicker>
                  <h2 className="font-semibold leading-[1.02] tracking-[-0.033em] text-[#ECE9E2] [text-wrap:balance] text-[clamp(34px,4.4vw,60px)]">
                    We built the bank we <AccentI>wished we'd had.</AccentI>
                  </h2>
                </Reveal>
                <Reveal>
                  <p className="font-medium leading-[1.4] tracking-[-0.02em] text-[#ECE9E2] mb-[34px] text-[clamp(20px,2.2vw,27px)]">
                    We've built companies, scaled them, and sat on both sides of the table. So we know exactly how the old advisory model treats a founder: like an afterthought in a process that's supposed to be about them.
                  </p>
                  {FOUNDER_PARAS.map((p, i) => (
                    <p key={i} className="text-[rgba(236,233,226,0.62)] leading-[1.75] mb-[20px] text-[clamp(15.5px,1.35vw,17.5px)]">
                      {typeof p === "string" ? (
                        p
                      ) : (
                        <>
                          {p.pre}
                          <em className="font-['Instrument_Serif',Georgia,serif] not-italic italic text-[#A6AEFF] text-[1.06em]">{p.em}</em>
                        </>
                      )}
                    </p>
                  ))}
                  <div className="mt-[44px] flex items-center gap-[34px] flex-wrap">
                    {FOUNDERS_SIGN.map((s) => (
                      <div key={s.name} className="text-center">
                        <div className="font-['Instrument_Serif',Georgia,serif] italic text-[22px] text-[#ECE9E2] leading-none">{s.name}</div>
                        <div className="mt-[8px] text-[11px] tracking-[0.18em] uppercase text-[rgba(236,233,226,0.40)]">{s.role}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES (pinned horizontal scroll) ────────────── */}
        <section ref={sectionRef} className="relative" data-screen-label="Values">
          <div className={`flex flex-col ${noPin ? "" : "sticky top-0 h-screen overflow-hidden"}`}>
            <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] w-full text-left pt-[clamp(74px,11vh,120px)] pb-[clamp(18px,2.6vh,34px)]">
              <Reveal>
                <Kicker className="mb-[18px]">
                  <SectionNum>02</SectionNum>What we stand for
                </Kicker>
                <h2 className="font-semibold leading-[1.02] tracking-[-0.033em] text-[#ECE9E2] [text-wrap:balance] max-w-[22ch] text-[clamp(34px,4.4vw,60px)]">
                  Five values. <AccentI>Operational, not aspirational.</AccentI>
                </h2>
                <p className="text-[rgba(236,233,226,0.62)] leading-[1.6] mt-[18px] max-w-[560px]">They're not on a poster. They show up in how we work, how we communicate, and how we decide.</p>
              </Reveal>
            </div>

            <div
              ref={viewportRef}
              className={`flex items-center ${noPin ? "overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch] py-[6px] [scroll-padding-left:clamp(24px,6.5vw,120px)]" : "flex-1 overflow-hidden"}`}
            >
              <div ref={trackRef} className="flex gap-[26px] px-[clamp(24px,6.5vw,120px)] will-change-transform">
                {VALUES.map((v) => (
                  <article
                    key={v.n}
                    className={`flex flex-col text-left p-[clamp(28px,2.6vw,40px)] rounded-[24px] border border-[rgba(236,233,226,0.12)] bg-[linear-gradient(158deg,rgba(92,111,255,0.07),rgba(20,18,28,0.35)_62%)] ${
                      noPin ? "snap-start basis-[82vw] shrink-0 max-md:basis-[80vw] max-md:p-[clamp(22px,5.5vw,30px)]" : "basis-[clamp(300px,36vw,520px)] shrink-0"
                    }`}
                  >
                    <div className="font-['Instrument_Serif',Georgia,serif] italic leading-none text-[#F4CD66] mb-[22px] text-[clamp(38px,4vw,54px)]">{v.n}</div>
                    <h3 className="font-semibold tracking-[-0.02em] text-[#ECE9E2] mb-[14px] text-[clamp(22px,2.2vw,28px)]">{v.title}</h3>
                    <p className="text-[rgba(236,233,226,0.62)] leading-[1.66] text-[clamp(15px,1.3vw,17px)]">{v.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INVESTORS (marquee) ──────────────────────────── */}
        <section className="py-[clamp(76px,9vh,132px)]" data-screen-label="Investors">
          <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] relative z-[1]">
            <Reveal className="text-center max-w-[760px] mx-auto mb-[34px]">
              <Kicker center>
                <SectionNum>03</SectionNum>Backed by the best
              </Kicker>
            </Reveal>
          </div>
          <Reveal
            className="dd-marquee relative overflow-hidden flex items-center"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)",
            }}
          >
            <div className="dd-marquee-track flex items-center whitespace-nowrap will-change-transform" style={{ animation: "dd-marquee 34s linear infinite" }}>
              {[...INVESTOR_LOGOS, ...INVESTOR_LOGOS].map((logo, i) => (
                <img
                  key={`${logo.src}-${i}`}
                  src={logo.src}
                  alt={i >= INVESTOR_LOGOS.length ? "" : logo.alt}
                  aria-hidden={i >= INVESTOR_LOGOS.length ? "true" : undefined}
                  draggable="false"
                  className="h-[30px] w-auto shrink-0 opacity-[0.55] select-none transition-opacity duration-300 hover:opacity-[0.92]"
                  style={{ marginRight: "clamp(56px, 7vw, 110px)", filter: "brightness(0) invert(1)" }}
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── TEAM ─────────────────────────────────────────── */}
        <section className="relative py-[clamp(76px,9vh,132px)]" data-screen-label="Team">
          <div className="dd-amb absolute inset-0 overflow-hidden pointer-events-none z-0 max-md:hidden">
            <Orb variant="copper" style={{ width: 380, height: 340, left: "-6%", top: "10%", opacity: 0.28 }} />
            <Orb variant="blue" style={{ width: 340, height: 300, right: "-6%", bottom: "8%", opacity: 0.26 }} />
          </div>
          <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] relative z-[1]">
            <Reveal className="text-center max-w-[760px] mx-auto mb-[54px]">
              <Kicker center className="mb-[20px]">
                <SectionNum>04</SectionNum>Meet the team
              </Kicker>
              <h2 className="font-semibold leading-[1.02] tracking-[-0.033em] text-[#ECE9E2] [text-wrap:balance] text-[clamp(34px,4.4vw,60px)]">
                Operators who've been on <AccentI>your side of the table.</AccentI>
              </h2>
              <p className="text-[rgba(236,233,226,0.62)] leading-[1.6] mt-[20px] max-w-[600px] mx-auto">A small, senior team pairing M&A judgment with the engineers building the AI that powers every mandate.</p>
            </Reveal>

            {TEAM_GROUPS.map((group, gi) => (
              <Reveal key={group.label} className={gi === 0 ? "" : "mt-[56px]"}>
                <div className="text-center mb-[34px]">
                  <Kicker center>{group.label}</Kicker>
                </div>
                <div className="flex flex-wrap justify-center gap-[28px] max-[900px]:gap-y-[32px] max-[900px]:gap-x-[22px]">
                  {group.members.map((m, mi) => (
                    <div key={`${m.name}-${mi}`} className={`text-center ${group.label === "Bankers" ? "w-[calc(33.333%-19px)]" : "w-[calc(25%-21px)]"} max-[900px]:w-[calc(50%-11px)]`}>
                      <div className="relative w-[128px] h-[128px] rounded-full mx-auto mb-[18px] grid place-items-center overflow-hidden font-['Instrument_Serif',Georgia,serif] italic text-[42px] text-[#ECE9E2] border border-[rgba(236,233,226,0.22)] bg-[radial-gradient(120%_120%_at_30%_20%,rgba(124,138,255,0.30),rgba(92,111,255,0.08)_60%,rgba(236,233,226,0.03))] shadow-[0_8px_30px_rgba(92,111,255,0.18)]">
                        {m.photo ? (
                          <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                        ) : (
                          m.initials
                        )}
                      </div>
                      <div className="inline-flex items-center gap-[8px] font-semibold text-[17px] tracking-[-0.01em] text-[#ECE9E2]">
                        {m.name}
                        {m.linkedin_url && (
                          <a
                            href={m.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${m.name} on LinkedIn`}
                            className="inline-flex text-[rgba(236,233,226,0.40)] transition-colors duration-200 hover:text-[#A6AEFF]"
                          >
                            <LinkedInIcon />
                          </a>
                        )}
                      </div>
                      <div className="mt-[6px] text-[13.5px] text-[rgba(236,233,226,0.62)]">{m.role}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────── */}
        <section className="py-[clamp(76px,9vh,132px)]" data-screen-label="Careers CTA">
          <div className="max-w-[1320px] mx-auto px-[clamp(24px,6.5vw,120px)] relative z-[1]">
            <Reveal className="relative overflow-hidden isolate flex flex-col items-center text-center max-w-[860px] mx-auto rounded-[24px] p-[clamp(32px,4vw,46px)] border border-[rgba(92,111,255,0.28)] bg-[linear-gradient(160deg,rgba(92,111,255,0.16),#0E0C16_62%)]">
              <div className="dd-amb absolute inset-0 overflow-hidden pointer-events-none z-0">
                <Orb variant="blue" style={{ width: 380, height: 320, left: "50%", top: "-30%", transform: "translateX(-50%)", opacity: 0.4 }} />
              </div>
              <div className="relative z-[1] text-[12px] font-semibold tracking-[0.2em] uppercase text-[#A6AEFF] mb-[18px]">Careers</div>
              <h3 className="relative z-[1] font-semibold leading-[1.02] tracking-[-0.033em] text-[#ECE9E2] [text-wrap:balance] max-w-[24ch] mx-auto mb-[14px] text-[clamp(28px,3.4vw,42px)]">
                Want to help rebuild M&A for India's founders?
              </h3>
              <p className="relative z-[1] text-[rgba(236,233,226,0.62)] leading-[1.55] max-w-[560px] mx-auto mb-[30px] text-[16.5px]">
                We're a small, senior team hiring bankers, engineers and designers who'd rather build the system than work inside the old one.
              </p>
              <div className="relative z-[1] flex gap-[14px] justify-center flex-wrap max-md:flex-col max-md:items-stretch max-md:w-full">
                <Btn
                  variant="primary"
                  href="https://www.linkedin.com/company/donedeals/jobs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-md:w-full max-md:justify-center"
                >
                  See open roles <span aria-hidden="true">→</span>
                </Btn>
                <Btn variant="ghost" href="/contact" className="max-md:w-full max-md:justify-center">
                  Talk to us about a deal
                </Btn>
              </div>
            </Reveal>
          </div>
        </section>
    </div>
  );
}

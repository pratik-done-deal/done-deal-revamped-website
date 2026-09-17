// PostHog event names, grouped by the page/section that fires them.
// Each key is the event's own name in caps. Some event names repeat across
// (and within) categories — e.g. website_get_started_clicked fires from the
// header, hero, comparison, and footer CTAs — those are told apart by a
// `page_section` property passed to trackEvent() at the call site, not by
// the constant itself.
export const POSTHOG_EVENTS = {
  HOMEPAGE: {
    WEBSITE_USER_LANDED_HOMEPAGE: 'website_user_landed_homepage',
    WEBSITE_GET_STARTED_CLICKED: 'website_get_started_clicked', // page_section: 'lp_hero' | 'lp_comparision' | 'lp_footer'
    WEBSITE_LP_VIEW_DEALS_CLICKED_HERO: 'website_lp_view_deals_clicked_hero',
    WEBSITE_LP_READ_STORY_CLICKED: 'website_lp_read_story_clicked',
  },

  HEADER: {
    WEBSITE_HEADER_FOR_INVESTORS_CLICKED: 'website_header_for_investors_clicked',
    WEBSITE_HEADER_MANDATES_CLICKED: 'website_header_mandates_clicked',
    WEBSITE_HEADER_FAQ_CLICKED: 'website_header_faq_clicked',
    WEBSITE_HEADER_BLOG_CLICKED: 'website_header_blog_clicked',
    WEBSITE_HEADER_ABOUT_US_CLICKED: 'website_header_about_us_clicked',
    WEBSITE_GET_STARTED_CLICKED: 'website_get_started_clicked', // page_section: 'header'
  },

  GET_STARTED_MODAL: {
    WEBSITE_GET_STARTED_MODAL_OPEN: 'website_get_started_modal_open',
    WEBSITE_SELLER_SIGNUP_CLICKED: 'website_seller_signup_clicked',
    WEBSITE_BUYER_SIGNUP_CLICKED: 'website_buyer_signup_clicked',
  },

  BUYER_LANDING_PAGE: {
    WEBSITE_USER_LANDED_BUYER_LANDING_PAGE: 'website_user_landed_buyer_landing_page',
    WEBSITE_BUYER_SIGNUP_CLICKED: 'website_buyer_signup_clicked', // page_section: 'buyer_lp_hero' | 'buyer_lp_buyer_type' | 'buyer_lp_footer'
    WEBSITE_BUYER_LP_HOW_MATCHING_WORK_CLICKS: 'website_buyer_lp_how_matching_work_clicks',
    WEBSITE_SELLER_SIGNIN_CLICKED: 'website_seller_signin_clicked', // page_section: 'buyer_lp_footer'
  },

  MANDATE_LANDING_PAGE: {
    WEBSITE_USER_LANDED_MANDATE_PAGE: 'website_user_landed_mandate_page',
    WEBSITE_SELLER_SIGNUP_CLICKED: 'website_seller_signup_clicked', // page_section: 'mandate_lp_hero' | 'mandate_lp_listing' | 'mandate_lp_footer', mandate_id
    WEBSITE_MANDATE_LP_CATEGORIES_CLICKED: 'website_mandate_lp_categories_clicked', // categories: name
    WEBSITE_MANDATE_LP_GET_VALUATION_CLICKED_FOOTER: 'website_mandate_lp_get_valuation_clicked_footer',
    WEBSITE_BUYER_SIGNUP_CLICKED: 'website_buyer_signup_clicked', // page_section: 'mandate_lp_footer' (list mandate)
  },

  FAQ_PAGE: {
    WEBSITE_USER_LANDED_FAQ_PAGE: 'website_user_landed_faq_page',
  },

  BLOG: {
    WEBSITE_USER_LANDED_BLOGS_PAGE: 'website_user_landed_blogs_page',
    WEBSITE_BLOG_CLICKED: 'website_blog_clicked', // blog: id
    WEBSITE_USER_LANDED_BLOG_PAGE: 'website_user_landed_blog_page', // blog: id
  },

  ABOUT_US: {
    WEBSITE_USER_LANDED_ABOUT_US: 'website_user_landed_about_us',
  },

  CONTACT_US: {
    WEBSITE_USER_LANDED_CONTACT_US: 'website_user_landed_contact_us',
  },

  SCROLL_TRACKING: {
    WEBSITE_SCROLL_COMPLETED: 'website_scroll_completed', // page — fires once when the user reaches 100% scroll depth
    WEBSITE_PAGE_SCROLL_DEPTH: 'website_page_scroll_depth', // page, maxScrollPercent — fires on page exit / route change with the deepest scroll reached
  },
};

(() => {
  "use strict";

  const RESOURCE_KEY = "elginResourceMap.resources.v1";
  const SETTINGS_KEY = "elginResourceMap.settings.v1";
  const CUSTOM_DEFAULTS_KEY = "elginResourceMap.customDefaults.v1";
  const ADMIN_HASH_KEY = "elginResourceMap.adminHash.v1";
  const ADMIN_SESSION_KEY = "elginResourceMap.adminSession.v1";

  const fontFamilies = {
    Inter: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    Montserrat: 'Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    ProximaNova: '"Proxima Nova", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    Helvetica: '"Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const FONT_SLOT_CONFIG = [
    { key: "global", cssVar: "--font-global", label: "Site-wide font", required: true },
    { key: "headings", cssVar: "--font-headings", label: "Headings" },
    { key: "body", cssVar: "--font-body", label: "Body" },
    { key: "detailPane", cssVar: "--font-detail-pane", label: "Detail pane" },
    { key: "listCards", cssVar: "--font-list-cards", label: "List cards" },
    { key: "stats", cssVar: "--font-stats", label: "Stats" },
  ];

  const DEFAULT_FONTS = {
    global: "Inter",
    headings: "",
    body: "",
    detailPane: "",
    listCards: "",
    stats: "",
  };

  const DEFAULT_DESIGN = {
    appPadding: 24,
    headerPaddingY: 24,
    headerPaddingX: 32,
    headerGap: 24,
    headerRadius: 20,
    brandGap: 16,
    brandMarkSize: 64,
    brandIconSize: 48,
    brandIconStroke: 2.7,
    sidebarPadding: 16,
    cardPadding: 16,
    detailPadding: 24,
    mapToolbarPaddingY: 16,
    mapToolbarPaddingX: 24,
    inputHeight: 48,
    chipHeight: 44,
    controlRadius: 12,
    cardRadius: 16,
    paneRadius: 20,
    buttonRadius: 12,
    titleSize: 40,
    sectionSize: 20,
    bodySize: 16,
    metaSize: 14,
    microSize: 12,
    displayWeight: 800,
    headingWeight: 600,
    bodyWeight: 400,
    metaWeight: 500,
    microTracking: 0.06,
    borderOpacity: 8,
    shadowBlur: 22,
    shadowOpacity: 5,
  };

  const DEFAULT_LAYOUT_ORDER = {
    header: ["brand", "actions"],
    topActions: ["location", "edit", "admin"],
    sidebar: ["search", "stats", "categories", "resources"],
    dashboard: ["sidebar", "map", "detail"],
  };

  const ORDER_LABELS = {
    header: { brand: "Title block", actions: "Header actions" },
    topActions: { location: "Use my location", edit: "Edit page", admin: "Admin" },
    sidebar: { search: "Search and filters", stats: "Stats", categories: "Category chips", resources: "Resource list" },
    dashboard: { sidebar: "Left resource panel", map: "Map", detail: "Detail pane" },
  };

  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const CATEGORIES = {
    Shelter: { color: "#76509a", icon: "S" },
    Meals: { color: "#b85c34", icon: "M" },
    Groceries: { color: "#487f52", icon: "G" },
    Medical: { color: "#287783", icon: "H" },
    "Mental Health": { color: "#675998", icon: "B" },
    Recovery: { color: "#89579a", icon: "R" },
    Crisis: { color: "#a95134", icon: "C" },
    Benefits: { color: "#376b9b", icon: "B" },
    Legal: { color: "#6c5e9c", icon: "L" },
    Immigration: { color: "#2d735f", icon: "I" },
    Transportation: { color: "#5f625e", icon: "T" },
    Community: { color: "#6f873e", icon: "C" },
    Seniors: { color: "#31866c", icon: "S" },
  };

  const DEFAULT_SETTINGS = {
    title: "Elgin Homeless Resource Map",
    subtitle:
      "Meals, shelter, health care, benefits, transportation, and crisis resources in Elgin, Illinois.",
    mapLabel: "Elgin resource map",
    accent: "#155f5b",
    background: "#f8f9fb",
    surface: "#ffffff",
    text: "#15181d",
    pinSize: 36,
    brandMarkStyle: "house-pin",
    fonts: DEFAULT_FONTS,
    design: DEFAULT_DESIGN,
    layoutOrder: DEFAULT_LAYOUT_ORDER,
  };

  const DEFAULT_LAYOUT = {
    sidebarWidth: 348,
    detailWidth: 372,
    panelGap: 24,
    panelMinHeight: 0,
    mapMinHeight: 520,
    resourceListHeight: 430,
  };

  const DEFAULT_FEATURES = {
    showSearchPanel: true,
    showStatsPanel: true,
    showCategoryChips: true,
    showResourceList: true,
    showMapToolbar: true,
    showDetailPanel: true,
  };

  const BROCHURE_SOURCE = {
    label: "Homeless Services Brochure PDF",
    note: "Local PDF provided by user",
  };

  const DEFAULT_RESOURCES = [
    {
      id: "pads-elgin",
      name: "PADS of Elgin",
      category: "Shelter",
      categories: ["Shelter", "Meals"],
      subcategory: "Emergency shelter and outreach",
      address: "1730 Berkley Street, Elgin, IL 60123",
      lat: 42.0339,
      lng: -88.3182,
      approximate: true,
      directionQuery: "PADS of Elgin, 1730 Berkley Street, Elgin, IL 60123",
      phone: "847-608-9744",
      email: "info@padsofelgin.org",
      website: "https://padsofelgin.org/",
      hoursText:
        "Shelter open 24 hours/7 days. Office hours Monday-Friday 9:00 AM-5:00 PM. Initial screening line listed as Monday-Friday 8:30 AM-5:00 PM and Saturday-Sunday 7:30 AM-3:30 PM.",
      alwaysOpen: true,
      emergency: true,
      description:
        "Emergency homeless shelter, case management, outreach meals, hygiene items, clothing, and coordinated referrals.",
      services: ["Shelter", "Case management", "Outreach meals", "Hygiene items", "Clothing"],
      requirements:
        "Call before visiting for screening. PADS lists service area connection requirements for Elgin, Dundee, Hanover, or Rutland Township.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "PADS contact page", url: "https://padsofelgin.org/contact/" },
        { label: "PADS services page", url: "https://padsofelgin.org/pads-of-elgin-services/" },
      ],
    },
    {
      id: "first-umc",
      name: "First United Methodist Church",
      category: "Meals",
      subcategory: "Soup kettle and winter shelter",
      address: "216 East Highland Avenue, Elgin, IL 60120",
      lat: 42.03830114606988,
      lng: -88.28154341826513,
      phone: "847-741-0038",
      website: "https://fumcelgin.org/",
      hoursText:
        "Dinner Monday 5:30 PM-6:30 PM. Winter shelter listed in the brochure for December 15-March 15, 8:00 PM-7:00 AM for Elgin residents.",
      schedule: [{ days: [1], start: "17:30", end: "18:30" }],
      description: "Monday evening soup kettle meal and seasonal winter shelter location.",
      services: ["Hot dinner", "Winter shelter location"],
      requirements: "Meal listed as open to anyone by 211; winter shelter may be limited to Elgin residents.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Cooperative Ministry soup kettle schedule", url: "https://www.elgincoopministry.com/soup-kettles" },
        { label: "211 soup kettle listing", url: "https://search.ne211.org/search/5437269f-28ec-5a4e-93e7-e06d8c7f9ccc" },
      ],
    },
    {
      id: "vineyard-church",
      name: "Vineyard Church",
      category: "Meals",
      subcategory: "Breakfast",
      address: "220 Division Street, Elgin, IL 60120",
      lat: 42.038869179153785,
      lng: -88.281339763693,
      phone: "847-697-8001",
      website: "https://www.elginvineyard.com/",
      hoursText: "Breakfast Monday-Saturday 6:45 AM-8:00 AM.",
      schedule: [{ days: [1, 2, 3, 4, 5, 6], start: "06:45", end: "08:00" }],
      description: "Downtown breakfast soup kettle site.",
      services: ["Breakfast"],
      requirements: "No documents listed in the brochure.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Cooperative Ministry soup kettle schedule", url: "https://www.elgincoopministry.com/soup-kettles" },
      ],
    },
    {
      id: "bethesda-church",
      name: "Bethesda Church of God in Christ",
      category: "Meals",
      subcategory: "Breakfast and groceries",
      address: "454 Hickory Place, Elgin, IL 60120",
      lat: 42.044496015850385,
      lng: -88.27289214706661,
      phone: "847-888-2209",
      website: "https://www.bethesdacogic.com/",
      hoursText: "Breakfast Sunday 10:00 AM-11:00 AM. Care Center groceries Sunday 1:00 PM-2:00 PM.",
      schedule: [
        { days: [0], start: "10:00", end: "11:00" },
        { days: [0], start: "13:00", end: "14:00" },
      ],
      description: "Sunday breakfast and Care Center grocery distribution.",
      services: ["Breakfast", "Groceries"],
      requirements: "Photo ID listed for Care Center groceries.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Cooperative Ministry soup kettle schedule", url: "https://www.elgincoopministry.com/soup-kettles" },
      ],
    },
    {
      id: "holy-trinity-lutheran",
      name: "Holy Trinity Lutheran Church",
      category: "Meals",
      subcategory: "Breakfast and dinner",
      address: "357 Division Street, Elgin, IL 60120",
      lat: 42.03856308946921,
      lng: -88.27769124342211,
      phone: "847-742-2025",
      website: "https://www.holytrinityelgin.com/",
      hoursText:
        "Breakfast 1st and 3rd Sundays 8:00 AM-9:00 AM. Dinner Thursday and Friday 5:30 PM-6:30 PM; Sunday 4:30 PM-5:30 PM.",
      schedule: [
        { days: [0], start: "08:00", end: "09:00", weeks: [1, 3] },
        { days: [4, 5], start: "17:30", end: "18:30" },
        { days: [0], start: "16:30", end: "17:30" },
      ],
      description: "Multiple weekly meal services in downtown Elgin.",
      services: ["Breakfast", "Dinner"],
      requirements: "No documents listed in the brochure.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Cooperative Ministry soup kettle schedule", url: "https://www.elgincoopministry.com/soup-kettles" },
      ],
    },
    {
      id: "zion-lutheran",
      name: "Zion Lutheran Church",
      category: "Meals",
      subcategory: "Dinner",
      address: "330 Griswold Street, Elgin, IL 60123",
      lat: 42.0279857291616,
      lng: -88.28443595097895,
      phone: "847-888-2882",
      website: "https://www.zionelginil.org/",
      hoursText: "Dinner Tuesday 5:30 PM-6:30 PM.",
      schedule: [{ days: [2], start: "17:30", end: "18:30" }],
      description: "Tuesday evening soup kettle dinner.",
      services: ["Hot dinner"],
      requirements: "No documents listed in the brochure.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Cooperative Ministry soup kettle schedule", url: "https://www.elgincoopministry.com/soup-kettles" },
      ],
    },
    {
      id: "first-congregational",
      name: "First Congregational Church",
      category: "Meals",
      subcategory: "Dinner and pantry",
      address: "256 East Chicago Street, Elgin, IL 60120",
      lat: 42.03752109470206,
      lng: -88.28051813950933,
      phone: "847-741-4045",
      website: "https://fcc-elgin.org/",
      hoursText:
        "Dinner Wednesday 5:30 PM-6:30 PM. All Peoples Interfaith Food Pantry listed Monday, Tuesday, Thursday, Friday 9:30 AM-11:30 AM.",
      schedule: [
        { days: [3], start: "17:30", end: "18:30" },
        { days: [1, 2, 4, 5], start: "09:30", end: "11:30" },
      ],
      description: "Wednesday soup kettle dinner and All Peoples Interfaith Food Pantry site.",
      services: ["Hot dinner", "Groceries"],
      requirements: "Call to confirm pantry requirements.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Cooperative Ministry soup kettle schedule", url: "https://www.elgincoopministry.com/soup-kettles" },
      ],
    },
    {
      id: "church-brethren",
      name: "Highland Avenue Church of the Brethren",
      category: "Meals",
      subcategory: "Dinner",
      address: "783 West Highland Avenue, Elgin, IL 60123",
      lat: 42.037294184030955,
      lng: -88.2977313830772,
      phone: "847-741-5124",
      website: "https://www.hacob.org/",
      hoursText: "Dinner Saturday 5:30 PM-6:30 PM.",
      schedule: [{ days: [6], start: "17:30", end: "18:30" }],
      description: "Saturday evening soup kettle dinner.",
      services: ["Hot dinner"],
      requirements: "No documents listed in the brochure.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Cooperative Ministry soup kettle schedule", url: "https://www.elgincoopministry.com/soup-kettles" },
      ],
    },
    {
      id: "community-crisis-center",
      name: "Community Crisis Center",
      category: "Crisis",
      subcategory: "Crisis hotline, shelter, pantry",
      address: "37 South Geneva Street, Elgin, IL 60120",
      lat: 42.036709433189095,
      lng: -88.27921387191029,
      phone: "847-742-4088",
      website: "https://www.crisiscenter.org/",
      hoursText:
        "24/7 crisis intervention, resources, and shelter. Brochure lists emergency pantry Sunday-Saturday 9:00 AM-8:00 PM after conversation with a case manager.",
      alwaysOpen: true,
      emergency: true,
      description:
        "Crisis support, temporary shelter, domestic and sexual abuse services, counseling, advocacy, and emergency pantry access.",
      services: ["24-hour crisis hotline", "Temporary shelter", "Emergency pantry", "Counseling", "Advocacy"],
      requirements: "Emergency pantry requires a conversation with a case manager.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Community Crisis Center", url: "https://www.crisiscenter.org/" },
        { label: "Elgin Township listing", url: "https://elgintownship.com/local-service/community-crisis-center/" },
      ],
    },
    {
      id: "food-for-greater-elgin",
      name: "Food for Greater Elgin",
      category: "Groceries",
      subcategory: "Food pantry",
      address: "1553 Commerce Drive, Elgin, IL 60123",
      lat: 42.07244622846343,
      lng: -88.29478821588698,
      phone: "847-931-9330",
      email: "info@ffge.org",
      website: "https://foodforgreaterelgin.org/",
      hoursText:
        "Office Monday-Friday 9:00 AM-4:00 PM. Food distribution Monday 5:30 PM-8:00 PM, Tuesday 9:00 AM-11:00 AM, Wednesday 11:00 AM-1:00 PM, Thursday 5:30 PM-8:00 PM, Friday 11:00 AM-12:30 PM.",
      schedule: [
        { days: [1], start: "17:30", end: "20:00" },
        { days: [2], start: "09:00", end: "11:00" },
        { days: [3], start: "11:00", end: "13:00" },
        { days: [4], start: "17:30", end: "20:00" },
        { days: [5], start: "11:00", end: "12:30" },
      ],
      description: "Client-choice food pantry for greater Elgin households.",
      services: ["Groceries", "Food distribution"],
      requirements: "Brochure lists photo ID and proof of address. Call to confirm current eligibility.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Food for Greater Elgin contact page", url: "https://foodforgreaterelgin.org/contact-us" },
      ],
    },
    {
      id: "salvation-army",
      name: "The Salvation Army Elgin Corps Community Center",
      category: "Groceries",
      subcategory: "Food pantry and support",
      address: "316 Douglas Avenue, Elgin, IL 60120",
      lat: 42.04353357413984,
      lng: -88.28418535644519,
      phone: "847-741-2304",
      website: "https://www.salvationarmyusa.org/il/elgin/douglas-avenue-corps/",
      hoursText:
        "Food pantry listed by Elgin Township as Monday-Thursday 9:00 AM-4:00 PM. Office/building hours may vary; call to confirm before visiting.",
      schedule: [{ days: [1, 2, 3, 4], start: "09:00", end: "16:00" }],
      description: "Food pantry and community support services.",
      services: ["Food pantry", "Community assistance", "Worship"],
      requirements:
        "Registration is listed as necessary, with proof of income, proof of address, ID, and SNAP verification letter if applicable.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Township Salvation Army listing", url: "https://elgintownship.com/local-service/the-salvation-army-elgin-corps-community-center/" },
      ],
    },
    {
      id: "centro-de-informacion",
      name: "Centro de Informacion",
      category: "Immigration",
      subcategory: "Immigration, community services, appointments",
      address: "1885 Lin Lor Lane, Elgin, IL 60123",
      lat: 42.03696916943879,
      lng: -88.32369284650048,
      phone: "847-695-9050",
      website: "https://centrodeinformacion.org/",
      hoursText: "Monday-Friday 9:00 AM-12:00 PM and 1:00 PM-5:00 PM by appointment only.",
      schedule: [
        { days: [1, 2, 3, 4, 5], start: "09:00", end: "12:00" },
        { days: [1, 2, 3, 4, 5], start: "13:00", end: "17:00" },
      ],
      description: "Bilingual information, immigration help, food appointments, and community navigation.",
      services: ["Immigration services", "Community navigation", "Food appointments"],
      requirements: "By appointment only. Brochure lists photo ID and proof of address for food appointments.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Centro contact page", url: "https://centrodeinformacion.org/contact" },
      ],
    },
    {
      id: "advocate-sherman",
      name: "Advocate Sherman Hospital",
      category: "Medical",
      subcategory: "Hospital and emergency care",
      address: "1425 North Randall Road, Elgin, IL 60123",
      lat: 42.070036328498595,
      lng: -88.33090589632172,
      phone: "847-742-9800",
      website: "https://www.advocatehealth.com/sherman",
      hoursText: "Hospital emergency services are open 24 hours a day.",
      alwaysOpen: true,
      emergency: true,
      description: "Hospital, emergency department, Level II trauma center, and specialty medical services.",
      services: ["Emergency care", "Hospital care", "Trauma care", "Specialty medical services"],
      requirements: "For emergencies call 911.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Advocate Sherman contact page", url: "https://www.advocatehealth.com/sherman/patients-visitors/contact-us" },
        { label: "Advocate Sherman hospital information", url: "https://www.advocatehealth.com/sherman/patients-visitors/hospital-information" },
      ],
    },
    {
      id: "ascension-st-joseph",
      name: "Ascension Saint Joseph Hospital",
      category: "Medical",
      subcategory: "Hospital and emergency care",
      address: "77 North Airlite Street, Elgin, IL 60123",
      lat: 42.035749780049095,
      lng: -88.32593001950383,
      phone: "847-695-3200",
      website: "https://saintjosephelgin.com/",
      hoursText: "Hospital emergency services are open 24 hours a day.",
      alwaysOpen: true,
      emergency: true,
      description: "Hospital, emergency department, trauma care, and specialty medical services.",
      services: ["Emergency care", "Hospital care", "Trauma care", "Behavioral health services"],
      requirements: "For emergencies call 911.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Chamber hospital profile", url: "https://business.elginchamber.com/list/Details/ascension-saint-joseph-elgin-2694394" },
      ],
    },
    {
      id: "greater-family-summit",
      name: "Greater Family Health - Summit Street",
      category: "Medical",
      subcategory: "Primary care clinic",
      address: "373 Summit Street, Elgin, IL 60120",
      lat: 42.046060938527816,
      lng: -88.27764569195855,
      phone: "844-599-3700",
      website: "https://greaterfamilyhealth.org/clinics/greater-family-health-elgin-373-summit-st/",
      hoursText:
        "Monday 6:00 AM-7:30 PM; Tuesday-Thursday 8:00 AM-7:30 PM; Friday-Saturday 8:00 AM-5:00 PM; Sunday closed.",
      schedule: [
        { days: [1], start: "06:00", end: "19:30" },
        { days: [2, 3, 4], start: "08:00", end: "19:30" },
        { days: [5, 6], start: "08:00", end: "17:00" },
      ],
      description: "Primary care clinic with family practice, internal medicine, and behavioral health services listed.",
      services: ["Primary care", "Family practice", "Internal medicine", "Behavioral health"],
      requirements: "Call for appointment and insurance/sliding-fee information.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Greater Family Health Summit clinic", url: "https://greaterfamilyhealth.org/clinics/greater-family-health-elgin-373-summit-st/" },
      ],
    },
    {
      id: "greater-family-dundee",
      name: "Greater Family Health - Dundee Avenue",
      category: "Medical",
      subcategory: "Primary care clinic",
      address: "450 Dundee Avenue, Elgin, IL 60120",
      lat: 42.04533139647107,
      lng: -88.27806405232513,
      phone: "844-599-3700",
      website: "https://greaterfamilyhealth.org/",
      hoursText: "Monday-Thursday 8:00 AM-7:30 PM; Friday-Saturday 8:00 AM-5:00 PM; Sunday closed.",
      schedule: [
        { days: [1, 2, 3, 4], start: "08:00", end: "19:30" },
        { days: [5, 6], start: "08:00", end: "17:00" },
      ],
      description: "Primary care clinic serving families and individuals.",
      services: ["Primary care", "Family health", "Behavioral health"],
      requirements: "Call for appointment and insurance/sliding-fee information.",
      lastVerified: "April 29, 2026",
      sources: [BROCHURE_SOURCE, { label: "Greater Family Health", url: "https://greaterfamilyhealth.org/" }],
    },
    {
      id: "open-door-clinic",
      name: "Open Door Health Center of Illinois",
      category: "Medical",
      subcategory: "HIV/STI and LGBTQ health care",
      address: "1665 Larkin Avenue, Elgin, IL 60123",
      lat: 42.033535951433684,
      lng: -88.31901291526968,
      phone: "847-695-1093",
      website: "https://odhcil.org/",
      hoursText:
        "Brochure lists Monday 8:30 AM-4:30 PM; Tuesday-Friday 8:00 AM-4:30 PM; Saturday-Sunday closed. Call to confirm.",
      schedule: [
        { days: [1], start: "08:30", end: "16:30" },
        { days: [2, 3, 4, 5], start: "08:00", end: "16:30" },
      ],
      description: "Regional health center for HIV/STI testing, prevention, treatment, and LGBTQ community health.",
      services: ["HIV services", "STI testing", "Prevention", "Medical case management"],
      requirements: "Call for appointments, eligibility, and available services.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Township Open Door listing", url: "https://elgintownship.com/local-service/open-door-health-center-of-illinois/" },
      ],
    },
    {
      id: "vna-villa",
      name: "VNA Health Center - Villa Street",
      category: "Medical",
      subcategory: "Primary care clinic",
      address: "801 Villa Street, Elgin, IL 60120",
      lat: 42.02709887051958,
      lng: -88.25957757717084,
      phone: "630-892-4355",
      website: "https://vnahealth.com/location/vna-health-center-elgin-villa-st/",
      hoursText:
        "Family Practice: Monday-Tuesday 8:00 AM-8:00 PM, Wednesday 8:00 AM-4:00 PM, Thursday 8:00 AM-8:00 PM, Friday 8:00 AM-4:00 PM, Saturday 8:00 AM-noon. Specialty hours vary.",
      schedule: [
        { days: [1, 2, 4], start: "08:00", end: "20:00" },
        { days: [3, 5], start: "08:00", end: "16:00" },
        { days: [6], start: "08:00", end: "12:00" },
      ],
      description: "Primary care, pediatrics, women's health, behavioral health, pharmacy, and related services.",
      services: ["Primary care", "Pediatrics", "Women's health", "Behavioral health", "Pharmacy"],
      requirements: "Accepts many insurance plans and has sliding scale options for uninsured patients.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "VNA Villa Street location", url: "https://vnahealth.com/location/vna-health-center-elgin-villa-st/" },
      ],
    },
    {
      id: "vna-wing",
      name: "VNA Health Center - Wing Street",
      category: "Medical",
      subcategory: "Primary care, pediatrics, behavioral health",
      address: "620 Wing Street, Elgin, IL 60123",
      lat: 42.04579073351568,
      lng: -88.29457111536375,
      phone: "630-892-4355",
      website: "https://vnahealth.com/location/vna-health-center-elgin-wing-st/",
      hoursText:
        "Behavioral Health Monday 8:00 AM-4:00 PM. Family Practice Tuesday 8:00 AM-4:00 PM. Pediatrics Wednesday and Friday 8:00 AM-4:00 PM, Thursday 8:00 AM-8:00 PM, and one Saturday per month 8:00 AM-4:00 PM.",
      schedule: [
        { days: [1, 2, 3, 5], start: "08:00", end: "16:00" },
        { days: [4], start: "08:00", end: "20:00" },
      ],
      description: "Affordable primary care, pediatric care, and mental health services at Wing Street.",
      services: ["Primary care", "Pediatrics", "Behavioral health"],
      requirements: "Accepts many insurance plans and has sliding scale options for uninsured patients.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "VNA Wing Street location", url: "https://vnahealth.com/location/vna-health-center-elgin-wing-st/" },
      ],
    },
    {
      id: "well-child-center",
      name: "Well Child Center",
      category: "Medical",
      subcategory: "WIC, dental, family support",
      address: "620 Wing Street, Suite 2, Elgin, IL 60123",
      lat: 42.04568129315442,
      lng: -88.29440517932986,
      phone: "847-741-7370",
      email: "info@wellchildcenter.org",
      website: "https://www.wellchildcenter.org/",
      hoursText:
        "Brochure lists Monday 8:00 AM-7:00 PM, Tuesday 11:00 AM-7:00 PM, Wednesday-Friday 8:00 AM-4:00 PM, Saturday-Sunday closed. Food For Families pantry: Tuesday 3:00 PM-6:30 PM, Wednesday 2:00 PM-5:00 PM, Thursday-Friday 11:00 AM-1:00 PM.",
      schedule: [
        { days: [1], start: "08:00", end: "19:00" },
        { days: [2], start: "11:00", end: "19:00" },
        { days: [3, 4, 5], start: "08:00", end: "16:00" },
      ],
      description: "Child and family health services, WIC, pediatric dental clinic, and family food pantry.",
      services: ["WIC", "Pediatric dental", "Food For Families pantry", "Family support"],
      requirements: "Registration is listed for the pantry. WIC and clinic eligibility may vary.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Well Child contact page", url: "https://www.wellchildcenter.org/contact/" },
        { label: "Well Child Food For Families", url: "https://www.wellchildcenter.org/food-for-families/" },
      ],
    },
    {
      id: "oak-street-health",
      name: "Oak Street Health",
      category: "Medical",
      subcategory: "Primary care clinic",
      address: "822 Summit Street, Suite 84, Elgin, IL 60120",
      lat: 42.04727365803407,
      lng: -88.26023047164313,
      phone: "847-350-1861",
      website: "https://www.oakstreethealth.com/locations/illinois/elgin/elgin-health-clinic",
      hoursText: "Brochure lists Monday-Friday 8:00 AM-5:00 PM; Saturday-Sunday closed.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "08:00", end: "17:00" }],
      description: "Primary care doctor office focused on adults and Medicare patients.",
      services: ["Primary care", "Medicare-focused care"],
      requirements: "Call to confirm appointment availability and insurance.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Oak Street Elgin clinic", url: "https://www.oakstreethealth.com/locations/illinois/elgin/elgin-health-clinic" },
      ],
    },
    {
      id: "ecker-center",
      name: "Ecker Center for Behavioral Health",
      category: "Mental Health",
      subcategory: "Behavioral health and 24/7 crisis support",
      address: "1845 Grandstand Place, Elgin, IL 60123",
      lat: 42.03362665618962,
      lng: -88.32277279372528,
      phone: "847-695-0484",
      website: "https://www.eckercenter.org/",
      hoursText:
        "Regular business hours Monday-Friday 9:00 AM-5:30 PM. Walk-in intake Monday-Thursday noon-4:00 PM. 24/7 crisis line: 888-325-3750.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "09:00", end: "17:30" }],
      emergency: true,
      description:
        "Mental health, substance use, outpatient services, intake, and 24/7 crisis support through ECKER-50.",
      services: ["Mental health", "Substance use services", "Walk-in intake", "24/7 crisis support"],
      requirements: "For intake bring photo ID, insurance card if applicable, proof of income if applicable, and relevant medical records.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Ecker contact page", url: "https://www.eckercenter.org/contact-us" },
        { label: "Ecker intake page", url: "https://www.eckercenter.org/intake-assessments" },
      ],
    },
    {
      id: "aid",
      name: "Association for Individual Development (AID)",
      category: "Mental Health",
      subcategory: "Behavioral health, disability, outreach",
      address: "1135 Bowes Road, Elgin, IL 60123",
      lat: 42.007793805685324,
      lng: -88.304832964219,
      phone: "847-931-6200",
      website: "https://www.aidcares.org/",
      hoursText: "Monday-Friday 8:30 AM-4:30 PM; Saturday-Sunday closed.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "08:30", end: "16:30" }],
      description:
        "Services for developmental disabilities, behavioral health, victim outreach, employment, and community supports.",
      services: ["Behavioral health", "Disability services", "Victim outreach", "Employment support"],
      requirements: "Call to confirm program eligibility.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Township AID listing", url: "https://elgintownship.com/local-service/association-for-individual-development/" },
      ],
    },
    {
      id: "family-service-association",
      name: "Family Service Association of Greater Elgin",
      category: "Mental Health",
      subcategory: "Outpatient mental health",
      address: "1752 Capital Street, Suite 100, Elgin, IL 60124",
      lat: 42.079177308299826,
      lng: -88.33851240970829,
      phone: "847-695-3680",
      website: "https://www.fsaelgin.org/",
      hoursText: "Monday-Thursday 9:00 AM-8:00 PM; Friday 9:00 AM-4:00 PM; Saturday 9:00 AM-4:00 PM; Sunday closed.",
      schedule: [
        { days: [1, 2, 3, 4], start: "09:00", end: "20:00" },
        { days: [5, 6], start: "09:00", end: "16:00" },
      ],
      description: "Outpatient mental health services for children, adolescents, adults, and families.",
      services: ["Counseling", "Family support", "Youth mental health", "Outpatient services"],
      requirements: "Call or visit website for intake and eligibility details.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Family Service Association", url: "https://www.fsaelgin.org/" },
        { label: "211 Family Support listing", url: "https://search.ne211.org/search/bfa6513d-8f60-5232-86d0-57ecaec169cb" },
      ],
    },
    {
      id: "elgin-alano",
      name: "Elgin Alano Club",
      category: "Recovery",
      subcategory: "AA, NA, Al-Anon meetings",
      address: "73 South Riverside Drive, Elgin, IL 60120",
      lat: 42.035329004087636,
      lng: -88.28350804749405,
      website: "https://elginalanoclub.com/",
      hoursText:
        "Meeting times vary by day. Current schedule includes weekday 1:30 PM meetings, evening AA/NA meetings, Saturday meetings, and Sunday evening meetings.",
      schedule: [
        { days: [1, 2, 3, 4, 5], start: "13:30", end: "14:30" },
        { days: [1], start: "19:30", end: "20:30" },
        { days: [2], start: "19:00", end: "20:00" },
        { days: [3, 5], start: "18:30", end: "19:30" },
        { days: [4], start: "19:30", end: "20:30" },
        { days: [6], start: "09:30", end: "10:30" },
        { days: [6], start: "12:00", end: "13:00" },
        { days: [6], start: "21:30", end: "22:30" },
        { days: [0], start: "18:30", end: "19:30" },
        { days: [0], start: "20:30", end: "21:30" },
      ],
      description: "Meeting space for recovery support groups in downtown Elgin.",
      services: ["AA meetings", "NA meetings", "Al-Anon meetings", "Recovery community"],
      requirements: "Some meetings are closed to members or those seeking help. Check schedule before attending.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Alano Club meeting schedule", url: "https://elginalanoclub.com/meetings/" },
        { label: "AA District 22 Elgin Alano listing", url: "https://dist22.aa-nia.org/locations/elgin-alano-club/" },
      ],
    },
    {
      id: "dhs-elgin",
      name: "Illinois Department of Human Services - Kane/Elgin FCRC",
      category: "Benefits",
      subcategory: "SNAP, TANF, WIC, medical benefits",
      address: "700 South State Street, Elgin, IL 60123",
      lat: 42.015784957312256,
      lng: -88.29138139988856,
      phone: "847-931-2700",
      website: "https://www.dhs.state.il.us/",
      hoursText: "Monday-Friday 8:30 AM-5:00 PM; Saturday-Sunday closed.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "08:30", end: "17:00" }],
      description: "Family Community Resource Center for state benefits and public assistance programs.",
      services: ["SNAP", "TANF", "WIC", "Illinois Link Card", "Medical programs"],
      requirements: "Bring documents related to identity, household, income, and current benefits when applying.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Chamber DHS listing", url: "https://www.chamberofcommerce.com/business-directory/illinois/elgin/government-office/29924523-dhs-family-community-resource-center-in-cook-county-kane-elgin" },
      ],
    },
    {
      id: "elgin-township",
      name: "Elgin Township",
      category: "Benefits",
      subcategory: "General assistance and emergency assistance",
      address: "729 South McLean Boulevard, Suite 200, Elgin, IL 60123",
      lat: 42.014943126906005,
      lng: -88.31381980757827,
      phone: "847-741-2045",
      website: "https://elgintownship.com/",
      hoursText: "Monday-Friday 8:00 AM-4:00 PM; Saturday-Sunday closed.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "08:00", end: "16:00" }],
      description: "Township office for general assistance, emergency assistance, and local service referrals.",
      services: ["General assistance", "Emergency assistance", "Local resource referrals"],
      requirements: "Must meet program eligibility. Call before applying.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Township general assistance", url: "https://elgintownship.com/general-assistance/" },
        { label: "Elgin Township emergency assistance", url: "https://elgintownship.com/emergency-assistance/" },
      ],
    },
    {
      id: "social-security",
      name: "U.S. Social Security Administration",
      category: "Benefits",
      subcategory: "Federal benefits",
      address: "790 Fletcher Drive, Suite 100, Elgin, IL 60123",
      lat: 42.053871924925325,
      lng: -88.33548816865003,
      phone: "877-405-0435",
      website: "https://www.ssa.gov/",
      hoursText: "Monday-Friday 9:00 AM-4:00 PM; Saturday-Sunday closed.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "09:00", end: "16:00" }],
      description: "Local Social Security office for applications, appointments, and benefit support.",
      services: ["Social Security benefits", "Appointments", "Federal benefit support"],
      requirements: "Call or use SSA.gov to confirm appointment needs and documents.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Elgin Township SSA listing", url: "https://elgintownship.com/local-service/us-social-security-administration/" },
      ],
    },
    {
      id: "senior-services",
      name: "Senior Services Associates",
      category: "Seniors",
      subcategory: "Senior, disability, veteran support",
      address: "101 South Grove Avenue, Elgin, IL 60120",
      lat: 42.03527397223459,
      lng: -88.28226276495508,
      phone: "847-741-0404",
      website: "https://seniorservicesassoc.org/",
      hoursText: "Monday-Friday 8:00 AM-4:00 PM; Saturday-Sunday closed.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "08:00", end: "16:00" }],
      description: "Services for seniors, adults with disabilities, veterans, caregivers, and vulnerable adults.",
      services: ["Case management", "Information and assistance", "Adult Protective Services", "Veteran support"],
      requirements: "Call to confirm program eligibility.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Senior Services locations", url: "https://seniorservicesassoc.org/locations-overview/" },
      ],
    },
    {
      id: "ccsu",
      name: "Collaborative Crisis Services Unit (CCSU / Elgin Police)",
      category: "Crisis",
      subcategory: "Mental health crisis response",
      address: "151 Douglas Avenue, Elgin, IL 60120",
      lat: 42.04001247907395,
      lng: -88.283625664286,
      phone: "847-289-2514",
      website: "https://elginil.gov/2364/Collaborative-Crisis-Services-Unit",
      hoursText: "Hours not listed. For emergencies call 911. Police non-emergency line: 847-289-2700.",
      emergency: true,
      description: "Elgin Police Department unit connecting mental health professionals and officers for crisis response and follow-up.",
      services: ["Mental health crisis response", "Follow-up check-ins", "Police social services coordination"],
      requirements: "Call 911 for emergencies; call the main line for non-emergency CCSU contact.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "City of Elgin CCSU page", url: "https://elginil.gov/2364/Collaborative-Crisis-Services-Unit" },
        { label: "City of Elgin CCSU directory", url: "https://elginil.gov/Directory.aspx?did=194" },
      ],
    },
    {
      id: "ywca-elgin",
      name: "YWCA Elgin",
      category: "Immigration",
      subcategory: "Immigration, citizenship, ESL, family programs",
      address: "220 East Chicago Street, Elgin, IL 60120",
      lat: 42.03734326125743,
      lng: -88.28128367193136,
      phone: "847-742-7930",
      website: "https://www.ywcaelgin.org/",
      hoursText: "Monday-Friday 8:30 AM-5:30 PM; Saturday-Sunday closed. Some seasonal evening programming may vary.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "08:30", end: "17:30" }],
      description: "Citizenship and immigration services, ESL, family literacy, advocacy, and community programs.",
      services: ["Citizenship services", "Immigration assistance", "ESL classes", "Family literacy"],
      requirements: "Call or text program staff for workshop dates, registration, and eligibility.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "YWCA citizenship page", url: "https://www.ywcaelgin.org/citizenship" },
        { label: "211 YWCA citizenship listing", url: "https://search.211illinois.org/search/ba827853-aff9-513e-8f28-0f4770fe32c1" },
      ],
    },
    {
      id: "gail-borden-library",
      name: "Gail Borden Public Library - Main Library",
      category: "Community",
      subcategory: "Library, computer access, classes",
      address: "270 North Grove Avenue, Elgin, IL 60120",
      lat: 42.04271088493108,
      lng: -88.28782354650863,
      phone: "847-742-2411",
      website: "https://www.gailborden.info/",
      hoursText: "Monday-Thursday 9:00 AM-9:00 PM; Friday 9:00 AM-6:00 PM; Saturday 9:00 AM-5:00 PM; Sunday noon-5:00 PM.",
      schedule: [
        { days: [1, 2, 3, 4], start: "09:00", end: "21:00" },
        { days: [5], start: "09:00", end: "18:00" },
        { days: [6], start: "09:00", end: "17:00" },
        { days: [0], start: "12:00", end: "17:00" },
      ],
      description: "Library services, internet/computer access, classes, English learning resources, and public space.",
      services: ["Library", "Computer access", "English classes", "Community programs"],
      requirements: "Some services may require registration or a library card.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Gail Borden hours", url: "https://www.gailborden.info/hours" },
        { label: "Gail Borden main library", url: "https://www.gailborden.info/about-the-library/main-library" },
      ],
    },
    {
      id: "administer-justice",
      name: "Administer Justice",
      category: "Legal",
      subcategory: "Legal aid ministry",
      address: "1750 Grandstand Place, Suite 15, Elgin, IL 60123",
      lat: 42.0346393657745,
      lng: -88.32106951274676,
      phone: "855-818-4554",
      website: "https://www.administerjustice.org/",
      hoursText: "Monday-Friday 9:00 AM-5:00 PM; Saturday-Sunday closed.",
      schedule: [{ days: [1, 2, 3, 4, 5], start: "09:00", end: "17:00" }],
      description: "Legal aid ministry providing help to people who cannot afford an attorney.",
      services: ["Legal aid", "Counseling referrals", "Justice navigation"],
      requirements: "Call or use the website contact form to request help.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Administer Justice contact page", url: "https://www.administerjustice.org/contact/" },
      ],
    },
    {
      id: "elgin-transportation-center",
      name: "Elgin Transportation Center (Pace Bus)",
      category: "Transportation",
      subcategory: "Pace bus hub",
      address: "100 West Chicago Street, Elgin, IL 60123",
      lat: 42.037105911069766,
      lng: -88.28651649762485,
      phone: "847-364-7223",
      website: "https://www.pacebus.com/facility/elgin-transportation-center",
      hoursText: "Transit schedules vary by route. Pace lists the center at Chicago Street/State Street, NE corner.",
      description: "Downtown Pace bus hub with connections to Metra and local Pace routes.",
      services: ["Pace bus connections", "Ventra vending machine", "Bus tracker signage", "Metra connection"],
      requirements: "Check current Pace routes and schedules before traveling.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Pace Elgin Transportation Center", url: "https://www.pacebus.com/facility/elgin-transportation-center" },
        { label: "City of Elgin transportation page", url: "https://elginil.gov/index.aspx?NID=726" },
      ],
    },
    {
      id: "elgin-metra",
      name: "Elgin Metra Station",
      category: "Transportation",
      subcategory: "Metra MD-W station",
      address: "109 West Chicago Street, Elgin, IL 60123",
      lat: 42.0362208984971,
      lng: -88.28616378966582,
      website: "https://metra.com/train-lines/stations/elgin",
      hoursText: "Metra lists waiting room hours 4:00 AM-7:00 PM. Train schedules vary.",
      schedule: [{ days: [0, 1, 2, 3, 4, 5, 6], start: "04:00", end: "19:00" }],
      description: "Milwaukee District West Metra station with Pace bus connections.",
      services: ["Metra trains", "Pace bus connections", "Waiting room", "Accessible station"],
      requirements: "Check current Metra schedules and service alerts before traveling.",
      lastVerified: "April 29, 2026",
      sources: [
        BROCHURE_SOURCE,
        { label: "Metra Elgin station", url: "https://metra.com/train-lines/stations/elgin" },
      ],
    },
  ];

  const state = {
    resources: loadResources(),
    settings: loadSettings(),
    query: "",
    category: "All",
    openOnly: false,
    resourceSort: "name-asc",
    adminSort: "name-asc",
    selectedId: null,
    userLocation: null,
    adminTab: "content",
    activeAdminId: null,
    activeCategory: null,
    adminDrag: null,
    adminDraftSchedule: [],
    adminDirty: { content: false, categories: false, import: false },
    editMode: false,
    editDraft: null,
    editOriginal: null,
    editPanel: "typography",
    editDirty: false,
    inlineDrag: null,
    inlineResize: null,
    map: null,
    markerLayer: null,
    markers: new Map(),
    mapReady: false,
    customDefaults: loadCustomDefaults(),
  };

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  // Section: App bootstrap and event wiring
  function init() {
    cacheElements();
    state.selectedId = state.resources.find((resource) => resource.visible !== false)?.id || state.resources[0]?.id || null;
    state.activeAdminId = state.selectedId;
    state.activeCategory = getAllCategories()[0] || "Community";
    bindEvents();
    applySettings();
    initializeMap();
    renderCategoryControls();
    render({ fitMap: true });
    syncControlLabels(document);
  }

  function cacheElements() {
    els.siteTitle = $("#siteTitle");
    els.siteSubtitle = $("#siteSubtitle");
    els.brandLockup = $(".brand-lockup");
    els.topActions = $(".top-actions");
    els.dashboard = $(".dashboard");
    els.sidebar = $(".sidebar");
    els.searchPanel = $(".search-panel");
    els.quickStats = $(".quick-stats");
    els.resourceListSection = $(".resource-list");
    els.mapToolbar = $(".map-toolbar");
    els.mapArea = $(".map-area");
    els.mapWrap = $(".map-wrap");
    els.searchInput = $("#searchInput");
    els.categoryFilter = $("#categoryFilter");
    els.sortFilter = $("#sortFilter");
    els.openNowFilter = $("#openNowFilter");
    els.categoryStrip = $("#categoryStrip");
    els.resourceList = $("#resourceList");
    els.totalCount = $("#totalCount");
    els.openCount = $("#openCount");
    els.mapLabel = $("#mapLabel");
    els.mapStatus = $("#mapStatus");
    els.map = $("#map");
    els.detailPanel = $("#detailPanel");
    els.adminDialog = $("#adminDialog");
    els.adminBody = $("#adminBody");
    els.adminOpenBtn = $("#adminOpenBtn");
    els.adminCloseBtn = $("#adminCloseBtn");
    els.editPageBtn = $("#editPageBtn");
    els.inlineEditor = $("#inlineEditor");
    els.resetViewBtn = $("#resetViewBtn");
    els.useLocationBtn = $("#useLocationBtn");
  }

  function bindEvents() {
    els.searchInput.addEventListener("input", () => {
      state.query = els.searchInput.value.trim();
      render({ fitMap: true });
    });

    els.categoryFilter.addEventListener("change", () => {
      state.category = els.categoryFilter.value;
      renderCategoryControls();
      render({ fitMap: true });
    });

    els.sortFilter.addEventListener("change", () => {
      state.resourceSort = els.sortFilter.value;
      render({ fitMap: false });
    });

    els.openNowFilter.addEventListener("change", () => {
      state.openOnly = els.openNowFilter.checked;
      render({ fitMap: true });
    });

    els.categoryStrip.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category;
      els.categoryFilter.value = state.category;
      renderCategoryControls();
      render({ fitMap: true });
    });

    els.resourceList.addEventListener("click", (event) => {
      const card = event.target.closest("[data-id]");
      if (!card) return;
      selectResource(card.dataset.id);
    });

    els.resetViewBtn.addEventListener("click", () => {
      state.query = "";
      state.category = "All";
      state.openOnly = false;
      els.searchInput.value = "";
      els.categoryFilter.value = "All";
      els.sortFilter.value = "name-asc";
      els.openNowFilter.checked = false;
      state.resourceSort = "name-asc";
      state.selectedId = state.resources.find((resource) => resource.visible !== false)?.id || null;
      renderCategoryControls();
      render({ fitMap: true });
    });

    els.useLocationBtn.addEventListener("click", useCurrentLocation);

    els.adminOpenBtn.addEventListener("click", () => {
      applySettings();
      renderAdmin();
      els.adminDialog.showModal();
    });

    els.adminCloseBtn.addEventListener("click", () => {
      closeAdminDialog();
    });

    els.adminDialog.addEventListener("cancel", (event) => {
      if (!resolveAllAdminUnsaved()) event.preventDefault();
    });

    els.editPageBtn?.addEventListener("click", enterInlineEditMode);

    els.adminBody.addEventListener("click", handleAdminClick);
    els.adminBody.addEventListener("submit", handleAdminSubmit);
    els.adminBody.addEventListener("input", handleAdminInput);
    els.adminBody.addEventListener("change", handleAdminChange);
    els.adminBody.addEventListener("dragstart", handleAdminDragStart);
    els.adminBody.addEventListener("dragover", handleAdminDragOver);
    els.adminBody.addEventListener("drop", handleAdminDrop);
    els.adminBody.addEventListener("dragend", handleAdminDragEnd);
    els.inlineEditor?.addEventListener("click", handleInlineEditorClick);
    els.inlineEditor?.addEventListener("input", handleInlineEditorInput);
    els.inlineEditor?.addEventListener("change", handleInlineEditorChange);
    document.addEventListener("click", handleInlineDocumentClick);
    document.addEventListener("input", handleInlineDocumentInput);
    document.addEventListener("keydown", handleInlineKeydown);
    document.addEventListener("mousedown", handleInlineResizeStart);
    document.addEventListener("mousemove", handleInlineResizeMove);
    document.addEventListener("mouseup", handleInlineResizeEnd);
    document.addEventListener("dragstart", handleInlineDragStart);
    document.addEventListener("dragover", handleInlineDragOver);
    document.addEventListener("drop", handleInlineDrop);
    document.addEventListener("dragend", handleInlineDragEnd);
    window.addEventListener("beforeunload", handleBeforeUnload);
    els.resourceList.addEventListener("scroll", updateResourceScrollCue);
    window.addEventListener("resize", () => {
      updateMatchedPanelHeight();
      updateResourceScrollCue();
    });
  }

  function render(options = {}) {
    applySettings();
    const filtered = getFilteredResources();
    if (!filtered.some((resource) => resource.id === state.selectedId)) {
      state.selectedId = filtered[0]?.id || state.resources.find((resource) => resource.visible !== false)?.id || null;
    }
    renderList(filtered);
    renderMapMarkers(filtered, options);
    renderDetails();
    renderStats(filtered);
    updateMatchedPanelHeight();
  }

  // Section: Design token application
  function applySettings() {
    const settings = state.settings;
    document.title = settings.title || DEFAULT_SETTINGS.title;
    els.siteTitle.textContent = settings.title || DEFAULT_SETTINGS.title;
    els.siteSubtitle.textContent = settings.subtitle || DEFAULT_SETTINGS.subtitle;
    els.mapLabel.textContent = settings.mapLabel || DEFAULT_SETTINGS.mapLabel;
    const accent = settings.accent || DEFAULT_SETTINGS.accent;
    const accentDark = shadeColor(accent, -22);
    const background = settings.background || DEFAULT_SETTINGS.background;
    const surface = settings.surface || DEFAULT_SETTINGS.surface;
    const text = settings.text || DEFAULT_SETTINGS.text;
    const fonts = normalizeFonts(settings.fonts);
    const design = normalizeDesign(settings.design);
    const layoutOrder = normalizeLayoutOrder(settings.layoutOrder);
    setEditPageAvailability();
    els.brandLockup?.querySelector(".brand-mark")?.setAttribute("data-mark-style", normalizeBrandMarkStyle(settings.brandMarkStyle));
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--accent-dark", accentDark);
    document.documentElement.style.setProperty("--bg", background);
    document.documentElement.style.setProperty("--surface", surface);
    document.documentElement.style.setProperty("--text", text);
    document.documentElement.style.setProperty("--color-primary", accent);
    document.documentElement.style.setProperty("--color-primary-hover", accentDark);
    document.documentElement.style.setProperty("--color-link", accent);
    document.documentElement.style.setProperty("--color-link-hover", accentDark);
    document.documentElement.style.setProperty("--color-primary-ring", `color-mix(in srgb, ${accent} 28%, transparent)`);
    document.documentElement.style.setProperty("--color-bg", background);
    document.documentElement.style.setProperty("--color-surface", surface);
    document.documentElement.style.setProperty("--color-surface-search", surface);
    document.documentElement.style.setProperty("--color-surface-map", surface);
    document.documentElement.style.setProperty("--color-surface-detail", surface);
    document.documentElement.style.setProperty("--color-text", text);
    document.documentElement.style.setProperty("--pin-size", `${Number(settings.pinSize) || DEFAULT_SETTINGS.pinSize}px`);
    FONT_SLOT_CONFIG.forEach((slot) => {
      const selected = fonts[slot.key];
      document.documentElement.style.setProperty(slot.cssVar, slot.required ? fontFamilies[selected] || fontFamilies.Inter : selected ? fontFamilies[selected] : "var(--font-global)");
    });
    applyDesignTokens(design);
    applyLayoutOrder(layoutOrder);
    const layout = normalizeLayout(settings.layout);
    const features = normalizeFeatures(settings.features);
    document.documentElement.style.setProperty("--sidebar-width", `${layout.sidebarWidth}px`);
    document.documentElement.style.setProperty("--detail-width", `${layout.detailWidth}px`);
    document.documentElement.style.setProperty("--panel-gap", `${layout.panelGap}px`);
    document.documentElement.style.setProperty(
      "--panel-min-height",
      layout.panelMinHeight > 0 ? `${layout.panelMinHeight}px` : "calc(100vh - 142px)",
    );
    document.documentElement.style.setProperty("--map-min-height", `${layout.mapMinHeight}px`);
    document.documentElement.style.setProperty(
      "--resource-list-height",
      layout.resourceListHeight > 0 ? `${layout.resourceListHeight}px` : "calc(100vh - 370px)",
    );
    setFeatureVisibility(els.searchPanel, !features.showSearchPanel);
    setFeatureVisibility(els.quickStats, !features.showStatsPanel);
    setFeatureVisibility(els.categoryStrip, !features.showCategoryChips);
    setFeatureVisibility(els.resourceListSection, !features.showResourceList);
    setFeatureVisibility(els.mapToolbar, !features.showMapToolbar);
    setFeatureVisibility(els.detailPanel, !features.showDetailPanel);
    const sidebarHidden = !features.showSearchPanel && !features.showStatsPanel && !features.showCategoryChips && !features.showResourceList;
    setFeatureVisibility(els.sidebar, sidebarHidden);
    els.dashboard?.classList.toggle("detail-hidden", !features.showDetailPanel && !state.editMode);
    els.dashboard?.classList.toggle("sidebar-hidden", sidebarHidden && !state.editMode);
    if (state.mapReady) {
      setTimeout(() => state.map.invalidateSize(), 0);
    }
    updateMatchedPanelHeight();
  }

  function applyDesignTokens(design) {
    const root = document.documentElement;
    const pxVars = {
      "--app-padding": design.appPadding,
      "--header-padding-y": design.headerPaddingY,
      "--header-padding-x": design.headerPaddingX,
      "--header-gap": design.headerGap,
      "--header-radius": design.headerRadius,
      "--brand-gap": design.brandGap,
      "--brand-mark-size": design.brandMarkSize,
      "--brand-icon-size": design.brandIconSize,
      "--brand-icon-stroke": design.brandIconStroke,
      "--sidebar-padding": design.sidebarPadding,
      "--card-padding": design.cardPadding,
      "--detail-padding": design.detailPadding,
      "--map-toolbar-padding-y": design.mapToolbarPaddingY,
      "--map-toolbar-padding-x": design.mapToolbarPaddingX,
      "--input-height": design.inputHeight,
      "--chip-height": design.chipHeight,
      "--radius-control": design.controlRadius,
      "--radius-card": design.cardRadius,
      "--radius-pane": design.paneRadius,
      "--button-radius": design.buttonRadius,
      "--type-title": design.titleSize,
      "--type-section": design.sectionSize,
      "--type-body": design.bodySize,
      "--type-meta": design.metaSize,
      "--type-micro": design.microSize,
    };
    Object.entries(pxVars).forEach(([name, value]) => root.style.setProperty(name, `${value}px`));
    root.style.setProperty("--weight-regular", String(design.bodyWeight));
    root.style.setProperty("--weight-medium", String(design.metaWeight));
    root.style.setProperty("--weight-semibold", String(design.headingWeight));
    root.style.setProperty("--weight-bold", String(design.displayWeight));
    root.style.setProperty("--tracking-micro", `${design.microTracking}em`);
    root.style.setProperty("--border-soft", `color-mix(in srgb, #263246 ${design.borderOpacity}%, transparent)`);

    const cardOpacity = design.shadowOpacity / 100;
    const hoverOpacity = Math.min(0.12, cardOpacity + 0.02);
    const paneOpacity = Math.min(0.12, cardOpacity + 0.01);
    const popoverOpacity = Math.min(0.14, cardOpacity + 0.03);
    root.style.setProperty("--shadow-card", `0 8px ${design.shadowBlur}px rgba(21, 29, 40, ${cardOpacity})`);
    root.style.setProperty("--shadow-card-hover", `0 12px ${design.shadowBlur + 6}px rgba(21, 29, 40, ${hoverOpacity})`);
    root.style.setProperty("--shadow-pane", `0 14px ${design.shadowBlur + 14}px rgba(21, 29, 40, ${paneOpacity})`);
    root.style.setProperty("--shadow-popover", `0 18px ${design.shadowBlur + 18}px rgba(21, 29, 40, ${popoverOpacity})`);
    root.style.setProperty("--shadow-soft", `0 14px ${design.shadowBlur + 12}px rgba(21, 29, 40, ${paneOpacity})`);
  }

  function setFeatureVisibility(element, hidden) {
    if (!element) return;
    element.classList.toggle("hidden", hidden && !state.editMode);
    element.classList.toggle("edit-hidden-block", hidden && state.editMode);
  }

  function setEditPageAvailability() {
    if (!els.editPageBtn) return;
    const authed = isAdminAuthed();
    els.editPageBtn.classList.toggle("hidden", !authed);
    els.editPageBtn.disabled = !authed;
    els.editPageBtn.setAttribute("aria-hidden", authed ? "false" : "true");
    if (authed) {
      els.editPageBtn.removeAttribute("tabindex");
    } else {
      els.editPageBtn.setAttribute("tabindex", "-1");
    }
  }

  function applyLayoutOrder(order) {
    setOrder(els.brandLockup, order.header, "brand");
    setOrder(els.topActions, order.header, "actions");
    setOrder(els.useLocationBtn, order.topActions, "location");
    setOrder(els.editPageBtn, order.topActions, "edit");
    setOrder(els.adminOpenBtn, order.topActions, "admin");
    setOrder(els.searchPanel, order.sidebar, "search");
    setOrder(els.quickStats, order.sidebar, "stats");
    setOrder(els.categoryStrip, order.sidebar, "categories");
    setOrder(els.resourceListSection, order.sidebar, "resources");
    setOrder(els.sidebar, order.dashboard, "sidebar");
    setOrder(els.mapArea, order.dashboard, "map");
    setOrder(els.detailPanel, order.dashboard, "detail");
  }

  function setOrder(element, order, key) {
    if (!element) return;
    const index = order.indexOf(key);
    element.style.order = String(index >= 0 ? index + 1 : 999);
  }

  function updateMatchedPanelHeight() {
    const syncHeight = () => {
      if (!els.mapArea) return;
      const mapHeight = Math.round(els.mapArea.getBoundingClientRect().height);
      if (mapHeight > 0) {
        document.documentElement.style.setProperty("--matched-panel-height", `${mapHeight}px`);
      }
      if (state.mapReady) {
        state.map.invalidateSize();
      }
    };
    syncHeight();
    setTimeout(syncHeight, 0);
  }

  // Section: Public category, stats, and resource-list renderers
  function renderCategoryControls() {
    const categories = getCategoriesInUse();
    const visibleResources = state.resources.filter((resource) => resource.visible !== false);
    const counts = countCategories(visibleResources);
    els.categoryFilter.innerHTML = `<option value="All">All categories</option>${categories
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
      .join("")}`;
    els.categoryFilter.value = categories.includes(state.category) ? state.category : "All";
    state.category = els.categoryFilter.value;
    els.categoryStrip.innerHTML = [
      categoryChip("All", "All", state.category === "All", visibleResources.length),
      ...categories.map((category) => categoryChip(category, category, state.category === category, counts.get(category) || 0)),
    ].join("");
  }

  function categoryChip(label, category, active, count) {
    const color = category === "All" ? "var(--accent)" : getCategoryMeta(category).color;
    return `<button class="chip ${active ? "active" : ""}" type="button" data-category="${escapeHtml(category)}" style="--chip-color:${escapeAttr(color)}">
      <span class="chip-dot" aria-hidden="true"></span>
      <span class="chip-label">${escapeHtml(label)}</span>
      <span class="chip-count">${Number(count) || 0}</span>
    </button>`;
  }

  function renderStats(filtered) {
    els.totalCount.textContent = filtered.length;
    els.openCount.textContent = filtered.filter((resource) => getOpenState(resource).state === "open").length;
  }

  function renderList(resources) {
    if (!resources.length) {
      els.resourceList.innerHTML = $("#emptyStateTemplate").innerHTML;
      updateResourceScrollCue();
      return;
    }

    els.resourceList.innerHTML = resources.map(renderResourceCard).join("");
    updateResourceScrollCue();
  }

  // Component: Resource list card
  function renderResourceCard(resource) {
    const meta = getCategoryMeta(resource.category);
    const status = getOpenState(resource);
    const preview = resource.services?.length ? resource.services.slice(0, 3) : [resource.subcategory].filter(Boolean);
    return `<button class="resource-card ${resource.id === state.selectedId ? "active" : ""}" type="button" data-id="${escapeHtml(resource.id)}" style="--category-color:${escapeAttr(meta.color)}">
      <span class="card-top">
        <span>
          <span class="card-title-row">
            <span class="card-dot" aria-hidden="true"></span>
            <span class="card-title">${escapeHtml(resource.name)}</span>
          </span>
          <span class="card-meta">${escapeHtml(formatCategorySummary(resource))}${resource.subcategory ? ` - ${escapeHtml(resource.subcategory)}` : ""}</span>
        </span>
        <span class="status-pill ${status.state}">${escapeHtml(status.label)}</span>
      </span>
      <span class="service-tags">${renderServiceTags(preview)}</span>
    </button>`;
  }

  // Component: Compact service/category tag
  function renderServiceTags(services) {
    return services.map((service) => `<span class="service-tag"><span class="tag-dot" aria-hidden="true"></span>${escapeHtml(service)}</span>`).join("");
  }

  function updateResourceScrollCue() {
    const syncCue = () => {
      const el = els.resourceList;
      const shell = els.resourceListSection;
      if (!el || !shell) return;
      const canScroll = el.scrollHeight > el.clientHeight + 4;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 6;
      const showCue = canScroll && !atBottom;
      const trackHeight = Math.max(shell.clientHeight - 52, 44);
      const maxScroll = Math.max(el.scrollHeight - el.clientHeight, 1);
      const thumbSize = canScroll ? Math.max(44, Math.min(trackHeight, (el.clientHeight / el.scrollHeight) * trackHeight)) : trackHeight;
      const thumbTop = canScroll ? Math.min(trackHeight - thumbSize, (el.scrollTop / maxScroll) * (trackHeight - thumbSize)) : 0;
      shell.style.setProperty("--scroll-thumb-size", `${Math.round(thumbSize)}px`);
      shell.style.setProperty("--scroll-thumb-top", `${Math.round(thumbTop)}px`);
      shell.querySelector(".resource-list-fade")?.style.setProperty("display", showCue ? "block" : "none");
      shell.querySelector(".scroll-more-cue")?.style.setProperty("display", showCue ? "inline-flex" : "none");
      shell.classList.toggle("can-scroll", canScroll);
      shell.classList.toggle("at-bottom", canScroll && atBottom);
      shell.classList.toggle("at-top", !canScroll || el.scrollTop <= 4);
    };
    syncCue();
    requestAnimationFrame(syncCue);
  }

  // Section: Map renderer and Leaflet integration
  function initializeMap() {
    if (!window.L || !els.map) {
      if (els.map) {
        els.map.innerHTML = `<div class="map-unavailable"><strong>Map could not load</strong><span>The resource list and Google Maps direction links still work.</span></div>`;
      }
      return;
    }

    state.map = L.map(els.map, {
      center: [42.038, -88.286],
      zoom: 13,
      minZoom: 10,
      maxZoom: 19,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(state.map);

    state.markerLayer = L.layerGroup().addTo(state.map);
    state.mapReady = true;
    setTimeout(() => state.map.invalidateSize(), 0);
  }

  function renderMapMarkers(resources, options = {}) {
    if (!state.mapReady || !state.markerLayer) return;

    state.markerLayer.clearLayers();
    state.markers.clear();

    const located = resources.filter((resource) => isFinite(resource.lat) && isFinite(resource.lng));
    located.forEach((resource, index) => {
      const meta = getResourcePinMeta(resource);
      const offset = getCoordinateOffset(resource, index, located);
      const pinSize = meta.size;
      const marker = L.marker([Number(resource.lat) + offset.lat, Number(resource.lng) + offset.lng], {
        title: resource.name,
        keyboard: true,
        icon: L.divIcon({
          className: "resource-marker-shell",
          html: `<div class="resource-marker ${resource.id === state.selectedId ? "active" : ""}" style="--pin-color:${meta.color}"><span aria-hidden="true">${escapeHtml(meta.icon)}</span><span class="sr-only">${escapeHtml(resource.name)} ${escapeHtml(resource.category)}</span></div>`,
          iconSize: [pinSize, pinSize],
          iconAnchor: [pinSize / 2, pinSize],
          popupAnchor: [0, -pinSize + 2],
        }),
      });
      marker.bindPopup(renderMarkerPopup(resource));
      marker.on("click", () => selectResource(resource.id, { fromMap: true }));
      marker.addTo(state.markerLayer);
      state.markers.set(resource.id, marker);
    });

    if (options.fitMap) {
      fitMapToResources(located);
    }

    const selectedMarker = state.markers.get(state.selectedId);
    if (selectedMarker) {
      selectedMarker.setZIndexOffset(1000);
      selectedMarker.openPopup();
    }
  }

  function renderMarkerPopup(resource) {
    const services = resource.services?.slice(0, 3).join(", ") || resource.subcategory || resource.category;
    return `<div class="marker-popup">
      <strong>${escapeHtml(resource.name)}</strong>
      <span>${escapeHtml(services)}</span>
      <a href="${escapeAttr(directionsUrl(resource))}" target="_blank" rel="noopener">Directions in Google Maps</a>
    </div>`;
  }

  function fitMapToResources(resources) {
    if (!state.mapReady) return;
    if (!resources.length) {
      state.map.setView([42.038, -88.286], 13);
      return;
    }
    const bounds = L.latLngBounds(resources.map((resource) => [Number(resource.lat), Number(resource.lng)]));
    state.map.fitBounds(bounds.pad(0.12), {
      maxZoom: resources.length === 1 ? 16 : 14,
      padding: [36, 36],
      animate: false,
    });
  }

  function getCoordinateOffset(resource, index, resources) {
    const sameSpot = resources.filter(
      (other) => Math.abs(Number(other.lat) - Number(resource.lat)) < 0.00008 && Math.abs(Number(other.lng) - Number(resource.lng)) < 0.00008,
    );
    if (sameSpot.length <= 1) return { lat: 0, lng: 0 };
    const position = sameSpot.findIndex((other) => other.id === resource.id);
    const angle = (Math.PI * 2 * position) / sameSpot.length;
    const radius = 0.00009 + sameSpot.length * 0.000012;
    return {
      lat: Math.sin(angle) * radius,
      lng: Math.cos(angle) * radius,
    };
  }

  // Section: Right detail panel renderer
  function renderDetails() {
    const resource = getSelectedResource();
    if (!resource) {
      els.mapStatus.textContent = "No resource selected.";
      els.detailPanel.innerHTML = `<div class="detail-empty"><strong>Select a resource</strong><span>Click any pin or card to view details and directions.</span></div>`;
      return;
    }

    const meta = getCategoryMeta(resource.category);
    const status = getOpenState(resource);
    els.mapStatus.textContent = `${resource.name} selected.`;
    const services = resource.services?.length ? resource.services : [resource.subcategory].filter(Boolean);

    els.detailPanel.innerHTML = `
      <div class="detail-heading">
        <div>
          <span class="detail-category" style="--category-color:${meta.color}"><span class="detail-dot" aria-hidden="true"></span>${escapeHtml(resource.category)}</span>
          <h2>${escapeHtml(resource.name)}</h2>
          <p class="muted">${escapeHtml(resource.subcategory || "")}</p>
          <div class="tag-row">${renderDetailCategoryTags(resource)}</div>
        </div>
        <span class="status-pill ${status.state}">${escapeHtml(status.label)}</span>
      </div>

      ${renderDetailSection("", `<p>${escapeHtml(resource.description || "No description entered yet.")}</p>`)}
      ${renderDetailSection("Services", `<ul>${services.map((service) => `<li>${escapeHtml(service)}</li>`).join("")}</ul>`)}
      ${renderDetailSection("Hours", `<p>${escapeHtml(resource.hoursText || "Call to confirm hours.")}</p>`)}
      ${renderDetailSection(
        "Address",
        `<p>${escapeHtml(resource.address || "No address entered.")}${resource.approximate ? " <span class=\"muted\">Approximate pin. Directions use the address.</span>" : ""}</p>`,
      )}
      ${renderContactLinks(resource)}
      ${renderDetailSection("Requirements", `<p>${escapeHtml(resource.requirements || "Call to confirm requirements.")}</p>`)}
      ${renderDetailSection(
        "Source",
        `<p class="muted">Last checked: ${escapeHtml(resource.lastVerified || "Not listed")}</p><p>${renderSourceLinks(resource) || "No source listed."}</p>`,
      )}
    `;
  }

  // Component: Detail pane category tags
  function renderDetailCategoryTags(resource) {
    return getResourceCategories(resource)
      .map((category) => {
        const categoryMeta = getCategoryMeta(category);
        return `<span class="category-tag ${category === resource.category ? "primary" : ""}" style="--category-color:${escapeAttr(categoryMeta.color)}"><span class="tag-dot" aria-hidden="true"></span>${escapeHtml(category)}</span>`;
      })
      .join("");
  }

  // Component: Detail pane section
  function renderDetailSection(title, bodyMarkup) {
    return `<div class="detail-section">${title ? `<h3>${escapeHtml(title)}</h3>` : ""}${bodyMarkup}</div>`;
  }

  // Component: Detail pane contact actions
  function renderContactLinks(resource) {
    return `<div class="detail-section contact-grid">
      <h3>Contact and Directions</h3>
      ${resource.phone ? `<a class="contact-link" href="tel:${escapeAttr(phoneHref(resource.phone))}">Call ${escapeHtml(resource.phone)}</a>` : ""}
      ${resource.email ? `<a class="contact-link" href="mailto:${escapeAttr(resource.email)}">Email ${escapeHtml(resource.email)}</a>` : ""}
      ${resource.website ? `<a class="contact-link" href="${escapeAttr(resource.website)}" target="_blank" rel="noopener">Open website</a>` : ""}
      <a class="contact-link" id="directionsLink" href="${escapeAttr(directionsUrl(resource))}" target="_blank" rel="noopener">Open Google Maps directions</a>
      <a class="contact-link" href="${escapeAttr(searchMapUrl(resource))}" target="_blank" rel="noopener">View place in Google Maps</a>
    </div>`;
  }

  // Component: Detail pane source list
  function renderSourceLinks(resource) {
    return (resource.sources || [])
      .map((source) => {
        if (source.url) {
          return `<a class="source-link" href="${escapeAttr(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.label || source.url)}</a>`;
        }
        return `<span>${escapeHtml(source.label || source.note || "Source")}</span>`;
      })
      .join("<br />");
  }

  function selectResource(id, options = {}) {
    state.selectedId = id;
    render();
    const selectedCard = els.resourceList.querySelector(`[data-id="${cssEscape(id)}"]`);
    selectedCard?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    const marker = state.markers.get(id);
    if (marker && state.mapReady) {
      if (!options.fromMap) {
        state.map.panTo(marker.getLatLng(), { animate: true, duration: 0.35 });
      }
      marker.openPopup();
    }
  }

  function getFilteredResources() {
    const query = state.query.toLowerCase();
    const filtered = state.resources
      .filter((resource) => resource.visible !== false)
      .filter((resource) => state.category === "All" || getResourceCategories(resource).includes(state.category))
      .filter((resource) => {
        if (!query) return true;
        const haystack = [
          resource.name,
          ...getResourceCategories(resource),
          resource.subcategory,
          resource.address,
          resource.description,
          resource.hoursText,
          resource.phone,
          ...(resource.services || []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
      .filter((resource) => !state.openOnly || getOpenState(resource).state === "open");
    return sortResources(filtered, state.resourceSort);
  }

  function getSelectedResource() {
    return state.resources.find((resource) => resource.id === state.selectedId) || null;
  }

  function sortResources(resources, sortMode = "name-asc") {
    const sorted = [...resources];
    const direction = sortMode.endsWith("desc") ? -1 : 1;
    const key = sortMode.startsWith("category") ? "category" : "name";
    sorted.sort((a, b) => {
      const aValue = key === "category" ? formatCategorySummary(a) : a.name;
      const bValue = key === "category" ? formatCategorySummary(b) : b.name;
      const primary = String(aValue || "").localeCompare(String(bValue || ""), undefined, { sensitivity: "base" }) * direction;
      if (primary !== 0) return primary;
      return String(a.name || "").localeCompare(String(b.name || ""), undefined, { sensitivity: "base" });
    });
    return sorted;
  }

  function getCategoriesInUse() {
    const found = new Set(state.resources.filter((resource) => resource.visible !== false).flatMap(getResourceCategories));
    return getAllCategories()
      .filter((category) => found.has(category))
      .concat([...found].filter((category) => !getAllCategories().includes(category)).sort());
  }

  function countCategories(resources) {
    const counts = new Map();
    resources.forEach((resource) => {
      getResourceCategories(resource).forEach((category) => {
        counts.set(category, (counts.get(category) || 0) + 1);
      });
    });
    return counts;
  }

  function getCategoryMeta(category) {
    const catalog = state.settings.categories || CATEGORIES;
    return catalog[category] || { color: "#70685f", icon: (category || "?").slice(0, 1).toUpperCase() };
  }

  function getAllCategories() {
    const catalog = state.settings?.categories || CATEGORIES;
    const resourceCategories = state.resources?.flatMap(getResourceCategories) || [];
    return [...new Set([...Object.keys(catalog), ...resourceCategories])].sort((a, b) => a.localeCompare(b));
  }

  function getResourceCategories(resource) {
    const primary = resource?.category || "Community";
    const categories = Array.isArray(resource?.categories) ? resource.categories : [];
    return [...new Set([primary, ...categories].map((category) => String(category || "").trim()).filter(Boolean))];
  }

  function formatCategorySummary(resource) {
    const categories = getResourceCategories(resource);
    if (categories.length <= 1) return resource.category || "Community";
    return `${resource.category || categories[0]} + ${categories.filter((category) => category !== resource.category).join(", ")}`;
  }

  function getResourcePinMeta(resource) {
    const category = getCategoryMeta(resource.category);
    return {
      color: resource.pinColor || category.color,
      icon: resource.pinIcon || category.icon || (resource.category || "?").slice(0, 1).toUpperCase(),
      size: clamp(Number(resource.pinSize) || Number(state.settings.pinSize) || DEFAULT_SETTINGS.pinSize, 22, 64),
    };
  }

  function getOpenState(resource, date = new Date()) {
    if (resource.alwaysOpen) return { state: "open", label: "Open now" };
    if (!Array.isArray(resource.schedule) || resource.schedule.length === 0) {
      return { state: "unknown", label: "Call" };
    }

    const day = date.getDay();
    const minutes = date.getHours() * 60 + date.getMinutes();
    const week = Math.ceil(date.getDate() / 7);
    const isOpen = resource.schedule.some((slot) => {
      if (!slot.days?.includes(day)) return false;
      if (Array.isArray(slot.weeks) && !slot.weeks.includes(week)) return false;
      const start = minutesFromTime(slot.start);
      const end = minutesFromTime(slot.end);
      if (start == null || end == null) return false;
      if (end < start) return minutes >= start || minutes <= end;
      return minutes >= start && minutes <= end;
    });
    return isOpen ? { state: "open", label: "Open now" } : { state: "closed", label: "Closed" };
  }

  function minutesFromTime(time) {
    if (!time || !time.includes(":")) return null;
    const [hours, minutes] = time.split(":").map(Number);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
    return hours * 60 + minutes;
  }

  function directionsUrl(resource) {
    const destination = resource.directionQuery || resource.address || `${resource.lat},${resource.lng}`;
    const params = new URLSearchParams({
      api: "1",
      destination,
      travelmode: "walking",
    });
    if (state.userLocation) {
      params.set("origin", `${state.userLocation.lat},${state.userLocation.lng}`);
    }
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function searchMapUrl(resource) {
    const query = resource.directionQuery || resource.address || `${resource.lat},${resource.lng}`;
    const params = new URLSearchParams({ api: "1", query });
    return `https://www.google.com/maps/search/?${params.toString()}`;
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      els.mapStatus.textContent = "Location is not available in this browser.";
      return;
    }
    els.useLocationBtn.disabled = true;
    els.useLocationBtn.textContent = "Locating...";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.userLocation = {
          lat: Number(position.coords.latitude.toFixed(6)),
          lng: Number(position.coords.longitude.toFixed(6)),
        };
        els.useLocationBtn.textContent = "Location ready";
        els.useLocationBtn.disabled = false;
        renderDetails();
      },
      () => {
        els.mapStatus.textContent = "Location permission was not granted. Directions still open with the destination filled in.";
        els.useLocationBtn.textContent = "Use my location";
        els.useLocationBtn.disabled = false;
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    );
  }

  // Section: Admin modal actions and persistence
  async function handleAdminSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.id === "setupForm") {
      const password = form.elements.password.value.trim();
      if (password.length < 8) {
        showAdminMessage("Use at least 8 characters for the admin password.");
        return;
      }
      localStorage.setItem(ADMIN_HASH_KEY, await hashPassword(password));
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      renderAdmin();
      applySettings();
      return;
    }

    if (form.id === "loginForm") {
      const password = form.elements.password.value;
      const stored = localStorage.getItem(ADMIN_HASH_KEY);
      if ((await hashPassword(password)) === stored) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
        renderAdmin();
        applySettings();
      } else {
        showAdminMessage("That password did not match.");
      }
      return;
    }

    if (form.id === "resourceForm") {
      saveCurrentResourceForm(true);
      state.adminDirty.content = false;
      saveAll();
      render();
      renderAdmin();
      return;
    }

    if (form.id === "designForm") {
      saveDesignFormToState(form);
      saveAll();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (form.id === "panelForm") {
      savePanelFormToState(form);
      saveAll();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (form.id === "categoryForm") {
      const result = saveCategoryFormToState(form);
      if (!result.ok) {
        showAdminMessage(result.message);
        return;
      }
      state.adminDirty.categories = false;
      saveAll();
      renderCategoryControls();
      render({ fitMap: false });
      renderAdmin();
      return;
    }
  }

  function handleAdminClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const action = actionTarget.dataset.action;

    if (action === "tab") {
      const nextTab = normalizeAdminTab(actionTarget.dataset.tab);
      if (nextTab === state.adminTab) return;
      if (!resolveUnsavedTab(state.adminTab)) return;
      state.adminTab = nextTab;
      renderAdmin();
      return;
    }

    if (action === "logout") {
      if (!resolveAllAdminUnsaved()) return;
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      exitInlineEditMode(false);
      renderAdmin();
      applySettings();
      return;
    }

    if (action === "select-resource") {
      if (!resolveUnsavedTab("content")) return;
      state.activeAdminId = actionTarget.dataset.id;
      const current = getAdminResource();
      state.adminDraftSchedule = structuredCloneSafe(current?.schedule || []);
      renderAdmin();
      return;
    }

    if (action === "select-category") {
      if (!resolveUnsavedTab("categories")) return;
      state.activeCategory = actionTarget.dataset.category;
      renderAdmin();
      return;
    }

    if (action === "discard-tab") {
      discardAdminTab(state.adminTab);
      renderAdmin();
      return;
    }

    if (action === "open-resource-from-category") {
      if (!resolveUnsavedTab("categories")) return;
      state.activeAdminId = actionTarget.dataset.id;
      const current = getAdminResource();
      state.adminDraftSchedule = structuredCloneSafe(current?.schedule || []);
      state.adminTab = "content";
      renderAdmin();
      return;
    }

    if (action === "new-category") {
      if (!resolveUnsavedTab("categories")) return;
      const name = uniqueCategoryName("New Category");
      state.settings = normalizeSettings({
        ...state.settings,
        categories: {
          ...state.settings.categories,
          [name]: { color: "#70685f", icon: "N" },
        },
      });
      state.activeCategory = name;
      saveAll();
      renderCategoryControls();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "delete-category") {
      const name = state.activeCategory;
      if (!name || !state.settings.categories[name]) return;
      const inUse = state.resources.some((resource) => getResourceCategories(resource).includes(name));
      const message = inUse
        ? `Delete ${name}? Resources in this category will move to Community.`
        : `Delete ${name}?`;
      if (!confirm(message)) return;
      const categories = { ...state.settings.categories };
      delete categories[name];
      if (!categories.Community) categories.Community = { color: "#6f873e", icon: "C" };
      state.resources.forEach((resource) => {
        const categoriesForResource = getResourceCategories(resource).filter((category) => category !== name);
        if (resource.category === name) resource.category = categoriesForResource[0] || "Community";
        resource.categories = [...new Set([resource.category, ...categoriesForResource])];
      });
      if (state.category === name) state.category = "All";
      state.activeCategory = getAllCategories().find((category) => category !== name) || "Community";
      state.settings = normalizeSettings({ ...state.settings, categories });
      saveAll();
      renderCategoryControls();
      render({ fitMap: true });
      renderAdmin();
      return;
    }

    if (action === "new-resource") {
      if (!resolveUnsavedTab("content")) return;
      const id = uniqueId("new-resource");
      const resource = normalizeResource({
        id,
        name: "New Resource",
        category: "Community",
        subcategory: "New service",
        address: "Elgin, IL",
        lat: 42.038,
        lng: -88.286,
        visible: true,
        hoursText: "Call to confirm hours.",
        schedule: [],
        services: ["New service"],
        sources: [],
        lastVerified: formatDate(new Date()),
      });
      state.resources.push(resource);
      state.activeAdminId = id;
      state.adminDraftSchedule = [];
      saveAll();
      render();
      renderAdmin();
      return;
    }

    if (action === "duplicate-resource") {
      if (!resolveUnsavedTab("content")) return;
      const current = getAdminResource();
      if (!current) return;
      const clone = normalizeResource({
        ...structuredCloneSafe(current),
        id: uniqueId(current.id),
        name: `${current.name} Copy`,
      });
      state.resources.push(clone);
      state.activeAdminId = clone.id;
      state.adminDraftSchedule = structuredCloneSafe(clone.schedule || []);
      saveAll();
      render();
      renderAdmin();
      return;
    }

    if (action === "delete-resource") {
      const current = getAdminResource();
      if (!current) return;
      if (!confirm(`Delete ${current.name}?`)) return;
      state.resources = state.resources.filter((resource) => resource.id !== current.id);
      state.activeAdminId = state.resources[0]?.id || null;
      state.selectedId = state.resources[0]?.id || null;
      saveAll();
      renderCategoryControls();
      render();
      renderAdmin();
      return;
    }

    if (action === "reset-resource") {
      const current = getAdminResource();
      if (!current) return;
      const defaults = getDefaultResource(current.id);
      if (!defaults) {
        alert("No default has been saved for this resource yet.");
        return;
      }
      const index = state.resources.findIndex((resource) => resource.id === current.id);
      state.resources[index] = normalizeResource({ ...structuredCloneSafe(defaults), id: current.id });
      state.activeAdminId = current.id;
      state.selectedId = current.id;
      state.adminDraftSchedule = structuredCloneSafe(state.resources[index].schedule || []);
      state.adminDirty.content = false;
      saveAll();
      renderCategoryControls();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "reset-resource-field") {
      const form = $("#resourceForm", els.adminBody);
      if (!form) return;
      const field = actionTarget.dataset.field;
      if (field === "pinColor" && form.elements.pinColor) form.elements.pinColor.value = "";
      if (field === "pinSize" && form.elements.pinSize) form.elements.pinSize.value = "";
      const pairedColor = field === "pinColor" ? form.querySelector("[data-color-picker='pinColor']") : null;
      if (pairedColor) pairedColor.value = getCategoryMeta(form.elements.category?.value || "Community").color;
      const pairedRange = field === "pinSize" ? form.querySelector("[data-range-control='pinSize']") : null;
      if (pairedRange) pairedRange.value = state.settings.pinSize || DEFAULT_SETTINGS.pinSize;
      updatePinPreview();
      markAdminDirty("content");
      return;
    }

    if (action === "save-resource-default") {
      const current = getAdminResource();
      if (!current) return;
      saveCurrentResourceForm(false);
      state.customDefaults.resources[current.id] = structuredCloneSafe(current);
      state.adminDirty.content = false;
      saveAll();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "reset-category") {
      const name = state.activeCategory;
      const defaults = getDefaultCategory(name);
      if (!name || !defaults) {
        alert("No default has been saved for this category yet.");
        return;
      }
      state.settings = normalizeSettings({
        ...state.settings,
        categories: {
          ...state.settings.categories,
          [name]: defaults,
        },
      });
      state.adminDirty.categories = false;
      saveAll();
      renderCategoryControls();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "reset-category-field") {
      const form = $("#categoryForm", els.adminBody);
      if (!form) return;
      const name = form.elements.originalName?.value || state.activeCategory;
      const defaults = getDefaultCategory(name) || CATEGORIES[name] || { color: "#70685f", icon: name?.slice(0, 1).toUpperCase() || "?" };
      const field = actionTarget.dataset.field;
      if (field === "color" && form.elements.color) {
        form.elements.color.value = sanitizeHexColor(defaults.color) || "#70685f";
        const picker = form.querySelector("[data-color-picker='color']");
        if (picker) picker.value = form.elements.color.value;
      }
      if (field === "icon" && form.elements.icon) form.elements.icon.value = defaults.icon || "";
      markAdminDirty("categories");
      return;
    }

    if (action === "save-category-default") {
      const result = saveCategoryFormToState();
      if (!result.ok) {
        showAdminMessage(result.message);
        return;
      }
      const name = result.name;
      state.customDefaults.categories[name] = structuredCloneSafe(getCategoryMeta(name));
      state.adminDirty.categories = false;
      saveAll();
      renderCategoryControls();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "reset-setting") {
      const key = actionTarget.dataset.key;
      state.settings = normalizeSettings({
        ...state.settings,
        [key]: getDefaultSettingValue(key),
      });
      saveAll();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "save-setting-default") {
      const key = actionTarget.dataset.key;
      saveDesignFormToState();
      state.customDefaults.settings[key] = structuredCloneSafe(state.settings[key]);
      saveAll();
      renderAdmin();
      return;
    }

    if (action === "move-order") {
      const group = actionTarget.dataset.group;
      const key = actionTarget.dataset.key;
      const direction = Number(actionTarget.dataset.direction);
      updateLayoutOrder(group, key, direction);
      saveAll();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "reset-order") {
      state.settings = normalizeSettings({
        ...state.settings,
        layoutOrder: structuredCloneSafe(DEFAULT_LAYOUT_ORDER),
      });
      saveAll();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "reset-panel-option") {
      const section = actionTarget.dataset.section;
      const key = actionTarget.dataset.key;
      const value = section === "features" ? getDefaultFeatureValue(key) : getDefaultLayoutValue(key);
      state.settings = normalizeSettings({
        ...state.settings,
        [section]: {
          ...state.settings[section],
          [key]: value,
        },
      });
      saveAll();
      render({ fitMap: false });
      renderAdmin();
      return;
    }

    if (action === "save-panel-default") {
      const section = actionTarget.dataset.section;
      const key = actionTarget.dataset.key;
      savePanelFormToState();
      state.customDefaults[section][key] = structuredCloneSafe(state.settings[section][key]);
      saveAll();
      renderAdmin();
      return;
    }

    if (action === "add-schedule") {
      const form = $("#resourceForm", els.adminBody);
      const checkedDays = $$("[name='scheduleDay']:checked", form).map((input) => Number(input.value));
      const start = form.elements.scheduleStart.value;
      const end = form.elements.scheduleEnd.value;
      if (!checkedDays.length || !start || !end) {
        showAdminMessage("Choose at least one day plus a start and end time.");
        return;
      }
      state.adminDraftSchedule.push({ days: checkedDays, start, end });
      saveCurrentResourceForm(false);
      markAdminDirty("content");
      renderAdmin();
      return;
    }

    if (action === "remove-schedule") {
      const index = Number(actionTarget.dataset.index);
      state.adminDraftSchedule.splice(index, 1);
      saveCurrentResourceForm(false);
      markAdminDirty("content");
      renderAdmin();
      return;
    }

    if (action === "export-json") {
      const box = $("#importExportText", els.adminBody);
      box.value = JSON.stringify({ settings: state.settings, resources: state.resources, customDefaults: state.customDefaults }, null, 2);
      box.focus();
      return;
    }

    if (action === "import-json") {
      const box = $("#importExportText", els.adminBody);
      try {
        const payload = JSON.parse(box.value);
        const resources = Array.isArray(payload) ? payload : payload.resources;
        if (!Array.isArray(resources)) throw new Error("Missing resources array.");
        state.resources = resources.map(normalizeResource);
        if (payload.settings) state.settings = normalizeSettings(payload.settings);
        if (payload.customDefaults) state.customDefaults = normalizeCustomDefaults(payload.customDefaults);
        state.selectedId = state.resources[0]?.id || null;
        state.activeAdminId = state.selectedId;
        state.activeCategory = getAllCategories()[0] || "Community";
        state.adminDirty.import = false;
        saveAll();
        renderCategoryControls();
        render();
        renderAdmin();
      } catch (error) {
        showAdminMessage(`Import failed: ${error.message}`);
      }
      return;
    }

    if (action === "reset-defaults") {
      if (!confirm("Reset all resources and design settings to the prototype defaults?")) return;
      state.resources = structuredCloneSafe(DEFAULT_RESOURCES).map(normalizeResource);
      state.settings = normalizeSettings();
      state.selectedId = state.resources[0]?.id || null;
      state.activeAdminId = state.selectedId;
      state.activeCategory = getAllCategories()[0] || "Community";
      state.adminDirty = { content: false, categories: false, import: false };
      saveAll();
      renderCategoryControls();
      render();
      renderAdmin();
    }
  }

  function handleAdminDragStart(event) {
    const item = event.target.closest("[data-order-item]");
    if (!item) return;
    state.adminDrag = { group: item.dataset.group, key: item.dataset.key };
    item.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `${item.dataset.group}:${item.dataset.key}`);
  }

  function handleAdminDragOver(event) {
    if (!event.target.closest("[data-order-group]")) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleAdminDrop(event) {
    const groupEl = event.target.closest("[data-order-group]");
    if (!groupEl || !state.adminDrag) return;
    event.preventDefault();
    const targetItem = event.target.closest("[data-order-item]");
    moveLayoutOrderItem(state.adminDrag.group, state.adminDrag.key, groupEl.dataset.orderGroup, targetItem?.dataset.key || null);
    state.adminDrag = null;
    saveAll();
    render({ fitMap: false });
    renderAdmin();
  }

  function handleAdminDragEnd() {
    state.adminDrag = null;
    $$(".order-item.dragging", els.adminBody).forEach((item) => item.classList.remove("dragging"));
  }

  function handleAdminInput(event) {
    const target = event.target;
    if (target.matches("[data-range-control]")) {
      const paired = els.adminBody.querySelector(`[data-number-control="${cssEscape(target.dataset.rangeControl)}"]`);
      if (paired) paired.value = target.value;
      updatePinPreview();
      markAdminDirty();
      return;
    }
    if (target.matches("[data-number-control]")) {
      const paired = els.adminBody.querySelector(`[data-range-control="${cssEscape(target.dataset.numberControl)}"]`);
      if (paired && target.value !== "") paired.value = target.value;
      updatePinPreview();
      markAdminDirty();
      return;
    }
    if (target.matches("[data-color-picker]")) {
      const paired = els.adminBody.querySelector(`[data-color-text="${cssEscape(target.dataset.colorPicker)}"]`);
      if (paired) paired.value = target.value;
      updatePinPreview();
      markAdminDirty();
      return;
    }
    if (target.matches("[data-color-text]")) {
      const color = sanitizeHexColor(target.value);
      const paired = els.adminBody.querySelector(`[data-color-picker="${cssEscape(target.dataset.colorText)}"]`);
      if (paired && color) paired.value = color;
      updatePinPreview();
      markAdminDirty();
      return;
    }
    if (target.closest("#resourceForm, #categoryForm, .import-box")) {
      updatePinPreview();
      markAdminDirty();
    }
  }

  function handleAdminChange(event) {
    const target = event.target;
    if (target.matches("[data-action='admin-sort']")) {
      if (!resolveUnsavedTab("content")) {
        target.value = state.adminSort;
        return;
      }
      state.adminSort = target.value;
      renderAdmin();
      return;
    }
    if (target.closest("#resourceForm, #categoryForm, .import-box")) {
      markAdminDirty();
    }
  }

  function closeAdminDialog() {
    if (!resolveAllAdminUnsaved()) return;
    els.adminDialog.close();
  }

  function normalizeAdminTab(tab) {
    return ["content", "categories", "import"].includes(tab) ? tab : "content";
  }

  function tabLabel(tab) {
    return {
      content: "Resources",
      categories: "Categories",
      import: "Import/Export",
    }[tab] || tab;
  }

  function markAdminDirty(tab = state.adminTab) {
    const normalized = normalizeAdminTab(tab);
    state.adminDirty[normalized] = true;
    const button = els.adminBody?.querySelector(`[data-action="tab"][data-tab="${cssEscape(normalized)}"]`);
    button?.classList.add("dirty");
  }

  function resolveUnsavedTab(tab) {
    const normalized = normalizeAdminTab(tab);
    if (!state.adminDirty[normalized]) return true;
    const shouldSave = confirm(`You have unsaved changes on ${tabLabel(normalized)}. Save or discard?\n\nOK saves. Cancel discards.`);
    if (shouldSave) {
      return saveAdminTab(normalized);
    }
    discardAdminTab(normalized);
    return true;
  }

  function resolveAllAdminUnsaved() {
    return ["content", "categories", "import"].every((tab) => resolveUnsavedTab(tab));
  }

  function saveAdminTab(tab) {
    if (tab === "content") {
      saveCurrentResourceForm(true);
      state.adminDirty.content = false;
      saveAll();
      render();
      return true;
    }
    if (tab === "categories") {
      const result = saveCategoryFormToState();
      if (!result.ok) {
        showAdminMessage(result.message);
        return false;
      }
      state.adminDirty.categories = false;
      saveAll();
      renderCategoryControls();
      render({ fitMap: false });
      return true;
    }
    state.adminDirty.import = false;
    return true;
  }

  function discardAdminTab(tab) {
    const normalized = normalizeAdminTab(tab);
    if (normalized === "content") {
      state.resources = loadResources();
      if (!state.resources.some((resource) => resource.id === state.activeAdminId)) {
        state.activeAdminId = state.resources[0]?.id || null;
      }
      const current = getAdminResource();
      state.adminDraftSchedule = structuredCloneSafe(current?.schedule || []);
    }
    if (normalized === "categories") {
      state.settings = normalizeSettings(loadJson(SETTINGS_KEY) || {});
      renderCategoryControls();
      render({ fitMap: false });
    }
    state.adminDirty[normalized] = false;
  }

  function readDesignForm(data, currentDesign = {}) {
    const current = normalizeDesign(currentDesign);
    const read = (field, name) => (data.has(name) ? Number(data.get(name)) : current[field]);
    return normalizeDesign({
      appPadding: read("appPadding", "designAppPadding"),
      headerPaddingY: read("headerPaddingY", "designHeaderPaddingY"),
      headerPaddingX: read("headerPaddingX", "designHeaderPaddingX"),
      headerGap: read("headerGap", "designHeaderGap"),
      headerRadius: read("headerRadius", "designHeaderRadius"),
      brandGap: read("brandGap", "designBrandGap"),
      brandMarkSize: read("brandMarkSize", "designBrandMarkSize"),
      brandIconSize: read("brandIconSize", "designBrandIconSize"),
      brandIconStroke: read("brandIconStroke", "designBrandIconStroke"),
      sidebarPadding: read("sidebarPadding", "designSidebarPadding"),
      cardPadding: read("cardPadding", "designCardPadding"),
      detailPadding: read("detailPadding", "designDetailPadding"),
      mapToolbarPaddingY: read("mapToolbarPaddingY", "designMapToolbarPaddingY"),
      mapToolbarPaddingX: read("mapToolbarPaddingX", "designMapToolbarPaddingX"),
      inputHeight: read("inputHeight", "designInputHeight"),
      chipHeight: read("chipHeight", "designChipHeight"),
      controlRadius: read("controlRadius", "designControlRadius"),
      cardRadius: read("cardRadius", "designCardRadius"),
      paneRadius: read("paneRadius", "designPaneRadius"),
      buttonRadius: read("buttonRadius", "designButtonRadius"),
      titleSize: read("titleSize", "designTitleSize"),
      sectionSize: read("sectionSize", "designSectionSize"),
      bodySize: read("bodySize", "designBodySize"),
      metaSize: read("metaSize", "designMetaSize"),
      microSize: read("microSize", "designMicroSize"),
      displayWeight: read("displayWeight", "designDisplayWeight"),
      headingWeight: read("headingWeight", "designHeadingWeight"),
      bodyWeight: read("bodyWeight", "designBodyWeight"),
      metaWeight: read("metaWeight", "designMetaWeight"),
      microTracking: read("microTracking", "designMicroTracking"),
      borderOpacity: read("borderOpacity", "designBorderOpacity"),
      shadowBlur: read("shadowBlur", "designShadowBlur"),
      shadowOpacity: read("shadowOpacity", "designShadowOpacity"),
    });
  }

  function saveDesignFormToState(form = $("#designForm", els.adminBody)) {
    if (!form) return;
    const data = new FormData(form);
    state.settings = normalizeSettings({
      ...state.settings,
      title: data.get("title").trim() || DEFAULT_SETTINGS.title,
      subtitle: data.get("subtitle").trim() || DEFAULT_SETTINGS.subtitle,
      mapLabel: data.get("mapLabel").trim() || DEFAULT_SETTINGS.mapLabel,
      accent: data.get("accent") || DEFAULT_SETTINGS.accent,
      background: data.get("background") || DEFAULT_SETTINGS.background,
      surface: data.get("surface") || DEFAULT_SETTINGS.surface,
      text: data.get("text") || DEFAULT_SETTINGS.text,
      pinSize: clamp(Number(data.get("pinSize")) || DEFAULT_SETTINGS.pinSize, 22, 64),
      brandMarkStyle: normalizeBrandMarkStyle(data.get("brandMarkStyle") || state.editDraft?.brandMarkStyle),
      fonts: {
        global: data.get("fontGlobal") || DEFAULT_FONTS.global,
        headings: data.get("fontHeadings") || "",
        body: data.get("fontBody") || "",
        detailPane: data.get("fontDetailPane") || "",
        listCards: data.get("fontListCards") || "",
        stats: data.get("fontStats") || "",
      },
      design: readDesignForm(data, state.settings.design),
    });
  }

  function savePanelFormToState(form = $("#panelForm", els.adminBody)) {
    if (!form) return;
    const data = new FormData(form);
    state.settings = normalizeSettings({
      ...state.settings,
      layout: {
        sidebarWidth: Number(data.get("sidebarWidth")),
        detailWidth: Number(data.get("detailWidth")),
        panelGap: Number(data.get("panelGap")),
        panelMinHeight: Number(data.get("panelMinHeight")),
        mapMinHeight: Number(data.get("mapMinHeight")),
        resourceListHeight: Number(data.get("resourceListHeight")),
      },
      features: {
        showSearchPanel: data.has("showSearchPanel"),
        showStatsPanel: data.has("showStatsPanel"),
        showCategoryChips: data.has("showCategoryChips"),
        showResourceList: data.has("showResourceList"),
        showMapToolbar: data.has("showMapToolbar"),
        showDetailPanel: data.has("showDetailPanel"),
      },
    });
  }

  function saveCategoryFormToState(form = $("#categoryForm", els.adminBody)) {
    if (!form) return { ok: false, message: "Open a category before saving." };
    const oldName = form.elements.originalName.value;
    const newName = form.elements.name.value.trim();
    if (!newName) return { ok: false, message: "Category name cannot be blank." };

    const categories = { ...state.settings.categories };
    if (oldName !== newName && categories[newName]) {
      return { ok: false, message: "A category with that name already exists." };
    }

    delete categories[oldName];
    categories[newName] = {
      icon: form.elements.icon.value.trim() || newName.slice(0, 1).toUpperCase(),
      color: sanitizeHexColor(form.elements.color.value) || "#70685f",
    };

    if (oldName !== newName) {
      state.resources.forEach((resource) => {
        if (resource.category === oldName) resource.category = newName;
        resource.categories = getResourceCategories(resource).map((category) => (category === oldName ? newName : category));
      });
      if (state.category === oldName) state.category = newName;
      state.activeCategory = newName;
    }

    state.settings = normalizeSettings({ ...state.settings, categories });
    return { ok: true, name: newName };
  }

  // Section: Admin modal renderers
  function renderAdmin() {
    if (!isAdminAuthed()) {
      renderAdminLock();
      return;
    }

    state.adminTab = normalizeAdminTab(state.adminTab);
    const tabButtons = [
      ["content", "Resources"],
      ["categories", "Categories"],
      ["import", "Import/Export"],
    ]
      .map(
        ([tab, label]) =>
          `<button class="tab-btn ${tab === "import" ? "utility" : ""} ${state.adminTab === tab ? "active" : ""} ${state.adminDirty[tab] ? "dirty" : ""}" type="button" data-action="tab" data-tab="${tab}">${label}</button>`,
      )
      .join("");

    const panel =
      state.adminTab === "categories"
        ? renderCategoriesTab()
        : state.adminTab === "import"
          ? renderImportTab()
          : renderContentTab();

    els.adminBody.innerHTML = `
      <div class="admin-tabs">
        ${tabButtons}
        <button class="tab-btn utility" type="button" data-action="logout">Lock panel</button>
      </div>
      ${panel}
    `;
    syncControlLabels(els.adminBody);
    updatePinPreview();
  }

  function renderAdminLock() {
    const hasPassword = Boolean(localStorage.getItem(ADMIN_HASH_KEY));
    els.adminBody.innerHTML = `
      <div class="admin-lock">
        <div class="notice">
          This prototype stores the admin password only in this browser. For a public launch, use a real server login so edits cannot be made from the public website code.
        </div>
        <form id="${hasPassword ? "loginForm" : "setupForm"}" class="admin-form">
          <div>
            <label for="adminPassword">${hasPassword ? "Admin password" : "Create admin password"}</label>
            <input id="adminPassword" name="password" type="password" autocomplete="current-password" placeholder="At least 8 characters" required />
          </div>
          <button class="primary-btn" type="submit">${hasPassword ? "Unlock admin panel" : "Save private password"}</button>
        </form>
        <p id="adminMessage" class="muted" aria-live="polite"></p>
      </div>
    `;
    syncControlLabels(els.adminBody);
  }

  function renderContentTab() {
    const current = getAdminResource() || state.resources[0] || null;
    if (current && state.adminDraftSchedule.length === 0 && Array.isArray(current.schedule) && !$("#resourceForm", els.adminBody)) {
      state.adminDraftSchedule = structuredCloneSafe(current.schedule);
    }

    const list = sortResources(state.resources, state.adminSort).map((resource) => renderAdminResourceCard(resource, current)).join("");

    if (!current) {
      return `<div class="admin-actions"><button class="primary-btn" type="button" data-action="new-resource">Create first resource</button></div>`;
    }

    const categoryOptions = getAdminCategoryOptions(current.category);
    const scheduleItems = (state.adminDraftSchedule || [])
      .map(
        (slot, index) =>
          `<div class="schedule-item">
            <span>${escapeHtml(formatSlot(slot))}</span>
            <button class="small-btn" type="button" data-action="remove-schedule" data-index="${index}">Remove</button>
          </div>`,
      )
      .join("");

    return `
      <div class="admin-grid">
        <div>
          <div class="admin-actions admin-action-row">
            <button class="primary-btn" type="button" data-action="new-resource">New</button>
            <button class="ghost-btn" type="button" data-action="duplicate-resource">Duplicate</button>
          </div>
          <div class="admin-sort-row">
            <label for="adminResourceSort">Sort resources</label>
            <select id="adminResourceSort" data-action="admin-sort">
              ${sortOptions(state.adminSort)}
            </select>
          </div>
          <div class="admin-list">${list}</div>
        </div>
        <form id="resourceForm" class="admin-form">
          <div class="form-grid">
            <div>
              <label>Name</label>
              <input name="name" value="${escapeAttr(current.name)}" required />
            </div>
            <div>
              <label>Main category</label>
              <select name="category">${categoryOptions}</select>
            </div>
            <div class="full-span">
              <label>Category tags</label>
              <div class="category-check-grid">
                ${renderResourceCategoryTags(current)}
              </div>
            </div>
            <div>
              <label>Subcategory</label>
              <input name="subcategory" value="${escapeAttr(current.subcategory || "")}" />
            </div>
            <div>
              <label>Phone</label>
              <input name="phone" value="${escapeAttr(current.phone || "")}" />
            </div>
            <div class="full-span">
              <label>Address</label>
              <input name="address" value="${escapeAttr(current.address || "")}" />
            </div>
            <div>
              <label>Latitude</label>
              <input name="lat" type="number" step="any" value="${escapeAttr(current.lat)}" required />
            </div>
            <div>
              <label>Longitude</label>
              <input name="lng" type="number" step="any" value="${escapeAttr(current.lng)}" required />
            </div>
            <div>
              <label>Website</label>
              <input name="website" type="url" value="${escapeAttr(current.website || "")}" />
            </div>
            <div>
              <label>Email</label>
              <input name="email" type="email" value="${escapeAttr(current.email || "")}" />
            </div>
            <div class="full-span">
              <label>Description</label>
              <textarea name="description">${escapeHtml(current.description || "")}</textarea>
            </div>
            <div class="full-span">
              <label>Services, one per line</label>
              <textarea name="services">${escapeHtml((current.services || []).join("\n"))}</textarea>
            </div>
            <div class="full-span">
              <label>Hours shown to visitors</label>
              <textarea name="hoursText">${escapeHtml(current.hoursText || "")}</textarea>
            </div>
            <div class="full-span">
              <label>Requirements</label>
              <textarea name="requirements">${escapeHtml(current.requirements || "")}</textarea>
            </div>
            <div>
              <label>Last checked</label>
              <input name="lastVerified" value="${escapeAttr(current.lastVerified || "")}" />
            </div>
            <div>
              <label>Directions query override</label>
              <input name="directionQuery" value="${escapeAttr(current.directionQuery || "")}" />
            </div>
            <div>
              <label>Pin icon or emoji override</label>
              <input name="pinIcon" value="${escapeAttr(current.pinIcon || "")}" placeholder="Blank uses category icon" />
            </div>
            ${colorControl("pinColor", "Pin color override", current.pinColor || "", {
              fallback: getCategoryMeta(current.category).color,
              allowBlank: true,
              help: "Blank uses the main category color.",
              actions: `<button class="small-btn tertiary-btn" type="button" data-action="reset-resource-field" data-field="pinColor">Reset</button>`,
            })}
            ${pinSizeControl(current)}
            <div class="full-span">
              <label>Source links, one per line as Label | URL</label>
              <textarea name="sources">${escapeHtml(formatSourcesForForm(current.sources))}</textarea>
            </div>
            <div class="check-row">
              <input id="visibleCheck" name="visible" type="checkbox" ${current.visible !== false ? "checked" : ""} />
              <label for="visibleCheck">Show this resource publicly</label>
            </div>
            <div class="check-row">
              <input id="urgentCheck" name="emergency" type="checkbox" ${current.emergency ? "checked" : ""} />
              <label for="urgentCheck">Mark as crisis resource</label>
            </div>
            <div class="check-row">
              <input id="alwaysOpenCheck" name="alwaysOpen" type="checkbox" ${current.alwaysOpen ? "checked" : ""} />
              <label for="alwaysOpenCheck">Show as always open</label>
            </div>
            <div class="check-row">
              <input id="approxCheck" name="approximate" type="checkbox" ${current.approximate ? "checked" : ""} />
              <label for="approxCheck">Pin is approximate</label>
            </div>
          </div>

          <div class="schedule-builder">
            <strong>Open-now schedule windows</strong>
            <span class="muted">These drive the public "Open now" filter. The visitor-facing hours text above is still the main explanation.</span>
            <div class="day-grid">
              ${DAY_SHORT.map((day, index) => `<label><input type="checkbox" name="scheduleDay" value="${index}" />${day}</label>`).join("")}
            </div>
            <div class="form-row">
              <div>
                <label>Start</label>
                <input name="scheduleStart" type="time" />
              </div>
              <div>
                <label>End</label>
                <input name="scheduleEnd" type="time" />
              </div>
              <button class="ghost-btn" type="button" data-action="add-schedule">Add window</button>
            </div>
            <div class="schedule-list">${scheduleItems || `<span class="muted">No schedule windows yet.</span>`}</div>
          </div>

          <div class="form-actions">
            <button class="primary-btn" type="submit">Save resource</button>
            <button class="ghost-btn" type="button" data-action="discard-tab">Discard changes</button>
            <button class="ghost-btn" type="button" data-action="save-resource-default">Save as resource default</button>
            <button class="ghost-btn" type="button" data-action="reset-resource">Reset resource</button>
            <button class="danger-btn" type="button" data-action="delete-resource">Delete resource</button>
          </div>
        </form>
      </div>
    `;
  }

  // Component: Admin resource card
  function renderAdminResourceCard(resource, current) {
    const meta = getResourcePinMeta(resource);
    const status = resource.visible === false ? "Hidden" : resource.approximate ? "Approximate pin" : "Published";
    const lastEdited = resource.lastVerified ? `Last checked ${resource.lastVerified}` : "Last checked not set";
    return `<button type="button" class="admin-resource-item ${resource.id === current?.id ? "active" : ""}" data-action="select-resource" data-id="${escapeHtml(resource.id)}" style="--category-color:${escapeAttr(meta.color)}">
      <span class="admin-card-title"><span class="admin-card-dot" aria-hidden="true"></span><span>${escapeHtml(resource.name)}</span></span>
      <span class="admin-card-meta">${escapeHtml(formatCategorySummary(resource))}</span>
      <span class="admin-card-foot"><span>${escapeHtml(lastEdited)}</span><span>${escapeHtml(status)}</span></span>
    </button>`;
  }

  function renderCategoriesTab() {
    const categories = getAllCategories();
    if (!state.activeCategory || !categories.includes(state.activeCategory)) {
      state.activeCategory = categories[0] || "Community";
    }
    const currentName = state.activeCategory;
    const current = getCategoryMeta(currentName);
    const list = categories.map((category) => renderAdminCategoryCard(category, currentName)).join("");
    const assigned = state.resources.filter((resource) => getResourceCategories(resource).includes(currentName));
    const assignedMarkup = assigned.length
      ? assigned.map(renderRelatedResourceChip).join("")
      : `<span class="muted">No resources are assigned to this category yet.</span>`;

    return `
      <div class="admin-grid">
        <div>
          <div class="admin-actions admin-action-row">
            <button class="primary-btn" type="button" data-action="new-category">New category</button>
          </div>
          <div class="admin-list">${list}</div>
        </div>
        <form id="categoryForm" class="admin-form">
          <input type="hidden" name="originalName" value="${escapeAttr(currentName)}" />
          <div class="category-helper">
            Category icons can be letters or emojis. Existing resources move automatically if you rename a category.
          </div>
          <div class="form-grid">
            <div>
              <label>Category name</label>
              <input name="name" value="${escapeAttr(currentName)}" required />
            </div>
            <div>
              <label>Pin icon or emoji</label>
              <input name="icon" value="${escapeAttr(current.icon)}" maxlength="4" />
            </div>
            ${colorControl("color", "Category and pin color", current.color, {
              actions: `<button class="small-btn tertiary-btn" type="button" data-action="reset-category-field" data-field="color">Reset</button>`,
            })}
          </div>
          <section class="related-resources">
            <h3>Resources in this category</h3>
            <div class="related-resource-list">${assignedMarkup}</div>
          </section>
          <div class="form-actions">
            <button class="primary-btn" type="submit">Save category</button>
            <button class="ghost-btn" type="button" data-action="discard-tab">Discard changes</button>
            <button class="ghost-btn" type="button" data-action="save-category-default">Save as category default</button>
            <button class="ghost-btn" type="button" data-action="reset-category">Reset category</button>
            <button class="danger-btn" type="button" data-action="delete-category">Delete category</button>
          </div>
        </form>
      </div>
    `;
  }

  // Component: Admin category card
  function renderAdminCategoryCard(category, currentName) {
    const meta = getCategoryMeta(category);
    const count = state.resources.filter((resource) => getResourceCategories(resource).includes(category)).length;
    return `<button type="button" class="admin-category-item ${category === currentName ? "active" : ""}" data-action="select-category" data-category="${escapeAttr(category)}" style="--category-color:${escapeAttr(meta.color)}">
      <span class="admin-card-title"><span class="admin-card-dot" aria-hidden="true"></span><span>${escapeHtml(category)}</span></span>
      <span class="admin-card-meta">${count} resources</span>
      <span class="admin-card-foot"><span>Pin label ${escapeHtml(meta.icon)}</span></span>
    </button>`;
  }

  // Component: Category-to-resource relation chip
  function renderRelatedResourceChip(resource) {
    const meta = getResourcePinMeta(resource);
    return `<button class="related-resource-chip" type="button" data-action="open-resource-from-category" data-id="${escapeAttr(resource.id)}" style="--category-color:${escapeAttr(meta.color)}"><span class="tag-dot" aria-hidden="true"></span>${escapeHtml(resource.name)}</button>`;
  }

  function renderImportTab() {
    return `
      <div class="import-box">
        <div class="notice">
          Export creates a complete backup of the resources and design. Import replaces the current dashboard with the JSON pasted here.
        </div>
        <textarea id="importExportText" spellcheck="false" aria-label="Import or export JSON"></textarea>
        <div class="form-actions">
          <button class="primary-btn" type="button" data-action="export-json">Export JSON</button>
          <button class="ghost-btn" type="button" data-action="import-json">Import JSON</button>
          <button class="ghost-btn" type="button" data-action="discard-tab">Discard changes</button>
          <button class="danger-btn" type="button" data-action="reset-defaults">Reset defaults</button>
        </div>
      </div>
    `;
  }

  // Section: Inline page editor renderers and interactions
  function enterInlineEditMode() {
    if (!isAdminAuthed()) {
      setEditPageAvailability();
      return;
    }
    // Logic concern: this static prototype only has browser-side admin auth. A deployed version must validate inline-edit saves on the server before persisting settings.
    state.editMode = true;
    state.editOriginal = structuredCloneSafe(state.settings);
    state.editDraft = structuredCloneSafe(state.settings);
    state.editPanel = "typography";
    state.editDirty = false;
    document.body.classList.add("inline-edit-mode");
    els.inlineEditor?.classList.remove("hidden");
    renderInlineEditor();
    applyInlineEditableBlocks();
  }

  function exitInlineEditMode(saveChanges) {
    if (!state.editMode) return;
    if (saveChanges && !isAdminAuthed()) {
      alert("Your admin session has expired. Please unlock the admin panel before saving page edits.");
      return;
    }
    state.settings = normalizeSettings(saveChanges ? state.editDraft : state.editOriginal);
    state.editMode = false;
    state.editDraft = null;
    state.editOriginal = null;
    state.inlineDrag = null;
    state.inlineResize = null;
    state.editDirty = false;
    document.body.classList.remove("inline-edit-mode");
    els.inlineEditor?.classList.add("hidden");
    clearInlineEditableBlocks();
    if (saveChanges) saveAll();
    render({ fitMap: false });
  }

  function renderInlineEditor() {
    if (!state.editMode || !els.inlineEditor) return;
    const settings = normalizeSettings(state.editDraft || state.settings);
    const design = normalizeDesign(settings.design);
    const layout = normalizeLayout(settings.layout);
    const features = normalizeFeatures(settings.features);
    const fonts = normalizeFonts(settings.fonts);
    const order = normalizeLayoutOrder(settings.layoutOrder);
    const panel = state.editPanel || "typography";
    els.inlineEditor.dataset.activePanel = panel;
    els.inlineEditor.innerHTML = `
      <div class="inline-editor-header">
        <div>
          <p class="eyebrow">Editing site design</p>
          <h2>Edit page</h2>
          <span class="inline-unsaved ${state.editDirty ? "dirty" : ""}" aria-live="polite">${state.editDirty ? "Unsaved changes" : "No changes yet"}</span>
        </div>
        <div class="inline-toolbar-actions">
          <button class="primary-btn" type="button" data-inline-action="save">Save changes</button>
          <button class="ghost-btn" type="button" data-inline-action="discard">Discard changes</button>
          <button class="tertiary-btn" type="button" data-inline-action="exit">Exit edit mode</button>
        </div>
        <div class="inline-toolbar-tabs" role="tablist" aria-label="Design controls">
          ${inlinePanelButton("typography", "Typography", panel)}
          ${inlinePanelButton("colors", "Colors", panel)}
          ${inlinePanelButton("spacing", "Spacing", panel)}
        </div>
      </div>

      <section class="inline-editor-section inline-section-typography">
        <h3>Text</h3>
        ${inlineTextControl("title", "Title", settings.title)}
        ${inlineTextControl("subtitle", "Subtitle", settings.subtitle, true)}
        ${inlineTextControl("mapLabel", "Map label", settings.mapLabel)}
      </section>

      <section class="inline-editor-section inline-section-colors">
        <h3>Colors</h3>
        ${colorControl("accent", "Accent color", settings.accent, { actions: inlineResetButton("setting", "accent") })}
        ${colorControl("background", "Background color", settings.background, { actions: inlineResetButton("setting", "background") })}
        ${colorControl("surface", "Panel color", settings.surface, { actions: inlineResetButton("setting", "surface") })}
        ${colorControl("text", "Text color", settings.text, { actions: inlineResetButton("setting", "text") })}
      </section>

      <section class="inline-editor-section inline-section-typography">
        <h3>Fonts</h3>
        ${inlineFontControl("fontGlobal", "Site-wide font", fonts.global, "global", true)}
        ${inlineFontControl("fontHeadings", "Headings", fonts.headings, "headings")}
        ${inlineFontControl("fontBody", "Body", fonts.body, "body")}
        ${inlineFontControl("fontDetailPane", "Detail pane", fonts.detailPane, "detailPane")}
        ${inlineFontControl("fontListCards", "List cards", fonts.listCards, "listCards")}
        ${inlineFontControl("fontStats", "Stats", fonts.stats, "stats")}
      </section>

      <section class="inline-editor-section inline-section-spacing">
        <h3>Header</h3>
        ${rangeNumberControl("designHeaderPaddingY", "Header vertical padding", design.headerPaddingY, 8, 64, 1, { actions: inlineResetButton("design", "headerPaddingY") })}
        ${rangeNumberControl("designHeaderPaddingX", "Header horizontal padding", design.headerPaddingX, 8, 80, 1, { actions: inlineResetButton("design", "headerPaddingX") })}
        ${rangeNumberControl("designHeaderGap", "Header gap", design.headerGap, 0, 64, 1, { actions: inlineResetButton("design", "headerGap") })}
        ${rangeNumberControl("designHeaderRadius", "Header radius", design.headerRadius, 0, 48, 1, { actions: inlineResetButton("design", "headerRadius") })}
        ${rangeNumberControl("designBrandGap", "Title mark gap", design.brandGap, 0, 48, 1, { actions: inlineResetButton("design", "brandGap") })}
        ${rangeNumberControl("designBrandMarkSize", "Title mark container size", design.brandMarkSize, 32, 112, 1, { actions: inlineResetButton("design", "brandMarkSize") })}
        ${rangeNumberControl("designBrandIconSize", "Title mark icon size", design.brandIconSize, 20, 96, 1, { actions: inlineResetButton("design", "brandIconSize") })}
        ${rangeNumberControl("designBrandIconStroke", "Title mark stroke", design.brandIconStroke, 1.5, 4.5, 0.1, { actions: inlineResetButton("design", "brandIconStroke") })}
      </section>

      <section class="inline-editor-section inline-section-typography">
        <h3>Typography</h3>
        ${rangeNumberControl("designTitleSize", "Page title size", design.titleSize, 28, 64, 1, { actions: inlineResetButton("design", "titleSize") })}
        ${rangeNumberControl("designSectionSize", "Section heading size", design.sectionSize, 16, 32, 1, { actions: inlineResetButton("design", "sectionSize") })}
        ${rangeNumberControl("designBodySize", "Body text size", design.bodySize, 14, 22, 1, { actions: inlineResetButton("design", "bodySize") })}
        ${rangeNumberControl("designMetaSize", "Metadata size", design.metaSize, 11, 18, 1, { actions: inlineResetButton("design", "metaSize") })}
        ${rangeNumberControl("designMicroSize", "Micro-label size", design.microSize, 10, 16, 1, { actions: inlineResetButton("design", "microSize") })}
        ${rangeNumberControl("designDisplayWeight", "Display weight", design.displayWeight, 300, 900, 100, { actions: inlineResetButton("design", "displayWeight") })}
        ${rangeNumberControl("designHeadingWeight", "Heading weight", design.headingWeight, 300, 900, 100, { actions: inlineResetButton("design", "headingWeight") })}
        ${rangeNumberControl("designBodyWeight", "Body weight", design.bodyWeight, 300, 900, 100, { actions: inlineResetButton("design", "bodyWeight") })}
        ${rangeNumberControl("designMetaWeight", "Metadata weight", design.metaWeight, 300, 900, 100, { actions: inlineResetButton("design", "metaWeight") })}
        ${rangeNumberControl("designMicroTracking", "Micro-label tracking", design.microTracking, 0, 0.16, 0.01, { actions: inlineResetButton("design", "microTracking") })}
      </section>

      <section class="inline-editor-section inline-section-spacing">
        <h3>Spacing and shapes</h3>
        ${rangeNumberControl("designAppPadding", "Page padding", design.appPadding, 0, 64, 1, { actions: inlineResetButton("design", "appPadding") })}
        ${rangeNumberControl("designSidebarPadding", "Left panel padding", design.sidebarPadding, 0, 48, 1, { actions: inlineResetButton("design", "sidebarPadding") })}
        ${rangeNumberControl("designCardPadding", "Card padding", design.cardPadding, 8, 40, 1, { actions: inlineResetButton("design", "cardPadding") })}
        ${rangeNumberControl("designDetailPadding", "Detail pane padding", design.detailPadding, 8, 56, 1, { actions: inlineResetButton("design", "detailPadding") })}
        ${rangeNumberControl("designMapToolbarPaddingY", "Map toolbar vertical padding", design.mapToolbarPaddingY, 4, 40, 1, { actions: inlineResetButton("design", "mapToolbarPaddingY") })}
        ${rangeNumberControl("designMapToolbarPaddingX", "Map toolbar horizontal padding", design.mapToolbarPaddingX, 4, 56, 1, { actions: inlineResetButton("design", "mapToolbarPaddingX") })}
        ${rangeNumberControl("designInputHeight", "Input height", design.inputHeight, 44, 72, 1, { actions: inlineResetButton("design", "inputHeight") })}
        ${rangeNumberControl("designChipHeight", "Chip height", design.chipHeight, 32, 64, 1, { actions: inlineResetButton("design", "chipHeight") })}
        ${rangeNumberControl("designControlRadius", "Input radius", design.controlRadius, 0, 32, 1, { actions: inlineResetButton("design", "controlRadius") })}
        ${rangeNumberControl("designCardRadius", "Card radius", design.cardRadius, 0, 40, 1, { actions: inlineResetButton("design", "cardRadius") })}
        ${rangeNumberControl("designPaneRadius", "Panel radius", design.paneRadius, 0, 48, 1, { actions: inlineResetButton("design", "paneRadius") })}
        ${rangeNumberControl("designButtonRadius", "Button radius", design.buttonRadius, 0, 40, 1, { actions: inlineResetButton("design", "buttonRadius") })}
        ${rangeNumberControl("designBorderOpacity", "Border opacity", design.borderOpacity, 0, 24, 1, { actions: inlineResetButton("design", "borderOpacity") })}
        ${rangeNumberControl("designShadowBlur", "Shadow blur", design.shadowBlur, 0, 60, 1, { actions: inlineResetButton("design", "shadowBlur") })}
        ${rangeNumberControl("designShadowOpacity", "Shadow opacity", design.shadowOpacity, 0, 16, 1, { actions: inlineResetButton("design", "shadowOpacity") })}
        <div class="inline-pin-size">
          ${rangeNumberControl("pinSize", "Default pin size", settings.pinSize, 22, 64, 1, { actions: inlineResetButton("setting", "pinSize") })}
          <span class="pin-preview" aria-label="Default pin size preview" style="--preview-pin-size:${escapeAttr(settings.pinSize)}px">
            <span class="pin-preview-marker" aria-hidden="true"><span>P</span></span>
          </span>
        </div>
      </section>

      <section class="inline-editor-section inline-section-spacing">
        <h3>Panels</h3>
        ${rangeNumberControl("sidebarWidth", "Resource panel width", layout.sidebarWidth, 240, 520, 10, { actions: inlineResetButton("layout", "sidebarWidth") })}
        ${rangeNumberControl("detailWidth", "Details panel width", layout.detailWidth, 260, 560, 10, { actions: inlineResetButton("layout", "detailWidth") })}
        ${rangeNumberControl("panelGap", "Panel gap", layout.panelGap, 0, 36, 2, { actions: inlineResetButton("layout", "panelGap") })}
        ${rangeNumberControl("panelMinHeight", "Panel min height", layout.panelMinHeight, 0, 1100, 20, { help: "Use 0 for automatic full-screen height.", actions: inlineResetButton("layout", "panelMinHeight") })}
        ${rangeNumberControl("mapMinHeight", "Map min height", layout.mapMinHeight, 320, 1000, 20, { actions: inlineResetButton("layout", "mapMinHeight") })}
        ${rangeNumberControl("resourceListHeight", "Resource list height", layout.resourceListHeight, 0, 900, 10, { help: "Use 0 for automatic height.", actions: inlineResetButton("layout", "resourceListHeight") })}
      </section>

      <section class="inline-editor-section inline-section-spacing">
        <h3>Visibility</h3>
        ${inlineFeatureToggle("showSearchPanel", "Show search panel", features.showSearchPanel)}
        ${inlineFeatureToggle("showStatsPanel", "Show stats panel", features.showStatsPanel)}
        ${inlineFeatureToggle("showCategoryChips", "Show category chips", features.showCategoryChips)}
        ${inlineFeatureToggle("showResourceList", "Show resource list", features.showResourceList)}
        ${inlineFeatureToggle("showMapToolbar", "Show map toolbar", features.showMapToolbar)}
        ${inlineFeatureToggle("showDetailPanel", "Show details panel", features.showDetailPanel)}
      </section>

      <section class="inline-editor-section inline-section-spacing">
        <h3>Arrange</h3>
        <p class="muted">Drag outlined page blocks directly on the live page. These lists mirror the current order for keyboard review.</p>
        ${renderInlineOrderSummary("header", "Header", order.header)}
        ${renderInlineOrderSummary("topActions", "Header actions", order.topActions)}
        ${renderInlineOrderSummary("sidebar", "Left panel", order.sidebar)}
        ${renderInlineOrderSummary("dashboard", "Main columns", order.dashboard)}
        <button class="ghost-btn" type="button" data-inline-action="reset-order">Reset arrangement</button>
      </section>

      <section class="inline-editor-section inline-section-mark">
        <h3>Title mark</h3>
        <div class="inline-control">
          <label>Icon style</label>
          <div class="inline-row">
            <select name="brandMarkStyle">
              <option value="house-pin" ${settings.brandMarkStyle === "house-pin" ? "selected" : ""}>House with pin</option>
              <option value="house" ${settings.brandMarkStyle === "house" ? "selected" : ""}>House only</option>
              <option value="pin" ${settings.brandMarkStyle === "pin" ? "selected" : ""}>Pin only</option>
            </select>
            ${inlineResetButton("setting", "brandMarkStyle")}
          </div>
        </div>
        ${rangeNumberControl("designBrandMarkSize", "Mark container size", design.brandMarkSize, 32, 112, 1, { actions: inlineResetButton("design", "brandMarkSize") })}
        ${rangeNumberControl("designBrandIconSize", "Icon size", design.brandIconSize, 20, 96, 1, { actions: inlineResetButton("design", "brandIconSize") })}
        ${rangeNumberControl("designBrandIconStroke", "Icon stroke", design.brandIconStroke, 1.5, 4.5, 0.1, { actions: inlineResetButton("design", "brandIconStroke") })}
      </section>

      <div class="form-actions inline-editor-actions">
        <button class="primary-btn" type="button" data-inline-action="save">Save page</button>
        <button class="ghost-btn" type="button" data-inline-action="discard">Discard changes</button>
      </div>
    `;
    syncControlLabels(els.inlineEditor);
  }

  function inlinePanelButton(panel, label, activePanel) {
    return `<button class="ghost-btn ${panel === activePanel ? "active" : ""}" type="button" role="tab" aria-selected="${panel === activePanel ? "true" : "false"}" data-inline-action="open-panel" data-panel="${escapeAttr(panel)}">${escapeHtml(label)}</button>`;
  }

  function inlineTextControl(name, label, value, multiline = false) {
    const field = multiline
      ? `<textarea name="${escapeAttr(name)}" data-inline-text-field="${escapeAttr(name)}">${escapeHtml(value || "")}</textarea>`
      : `<input name="${escapeAttr(name)}" data-inline-text-field="${escapeAttr(name)}" value="${escapeAttr(value || "")}" />`;
    return `<div class="inline-control">
      <label>${escapeHtml(label)}</label>
      <div class="inline-row">
        ${field}
        ${inlineResetButton("setting", name)}
      </div>
    </div>`;
  }

  function inlineFontControl(name, label, value, field, required = false) {
    return `<div class="inline-control">
      ${fontSelect(name, label, value, { required })}
      ${inlineResetButton("font", field)}
    </div>`;
  }

  function inlineFeatureToggle(name, label, checked) {
    return `<div class="inline-row">
      ${featureToggle(name, label, checked)}
      ${inlineResetButton("features", name)}
    </div>`;
  }

  function inlineResetButton(scope, field) {
    return `<button class="small-btn tertiary-btn" type="button" data-inline-action="reset-control" data-scope="${escapeAttr(scope)}" data-field="${escapeAttr(field)}">Reset</button>`;
  }

  function renderInlineOrderSummary(group, title, order) {
    const labels = ORDER_LABELS[group] || {};
    return `<div class="inline-order-summary">
      <strong>${escapeHtml(title)}</strong>
      <span>${order.map((key) => escapeHtml(labels[key] || key)).join(" / ")}</span>
    </div>`;
  }

  function handleInlineEditorClick(event) {
    const actionTarget = event.target.closest("[data-inline-action]");
    if (!actionTarget) return;
    const action = actionTarget.dataset.inlineAction;
    if (action === "save") {
      readInlineEditorToDraft();
      exitInlineEditMode(true);
      return;
    }
    if (action === "discard") {
      exitInlineEditMode(false);
      return;
    }
    if (action === "exit") {
      if (!state.editDirty || confirm("Discard unsaved changes and exit edit mode?")) {
        exitInlineEditMode(false);
      }
      return;
    }
    if (action === "open-panel") {
      state.editPanel = actionTarget.dataset.panel || "typography";
      renderInlineEditor();
      return;
    }
    if (action === "reset-order") {
      state.editDraft = normalizeSettings({ ...state.editDraft, layoutOrder: structuredCloneSafe(DEFAULT_LAYOUT_ORDER) });
      markInlineDirty();
      previewInlineDraft(true);
      return;
    }
    if (action === "reset-control") {
      resetInlineControl(actionTarget.dataset.scope, actionTarget.dataset.field);
    }
  }

  function handleInlineDocumentClick(event) {
    if (!state.editMode) return;
    const actionTarget = event.target.closest("[data-inline-action]");
    if (actionTarget && !actionTarget.closest("#inlineEditor")) {
      const action = actionTarget.dataset.inlineAction;
      if (action === "toggle-block") {
        event.preventDefault();
        toggleInlineFeature(actionTarget.dataset.feature);
      }
      return;
    }
    if (event.target.closest(".brand-mark")) {
      state.editPanel = "mark";
      renderInlineEditor();
      return;
    }
    if (event.target.closest(".sidebar, .map-area, #detailPanel")) {
      state.editPanel = "spacing";
      renderInlineEditor();
    }
  }

  function handleInlineEditorInput(event) {
    const target = event.target;
    if (target.matches("[data-range-control]")) {
      const paired = els.inlineEditor.querySelector(`[data-number-control="${cssEscape(target.dataset.rangeControl)}"]`);
      if (paired) paired.value = target.value;
      readInlineEditorToDraft();
      previewInlineDraft();
      return;
    }
    if (target.matches("[data-number-control]")) {
      const paired = els.inlineEditor.querySelector(`[data-range-control="${cssEscape(target.dataset.numberControl)}"]`);
      if (paired && target.value !== "") paired.value = target.value;
      readInlineEditorToDraft();
      previewInlineDraft();
      return;
    }
    if (target.matches("[data-color-picker]")) {
      const paired = els.inlineEditor.querySelector(`[data-color-text="${cssEscape(target.dataset.colorPicker)}"]`);
      if (paired) paired.value = target.value;
      readInlineEditorToDraft();
      previewInlineDraft();
      return;
    }
    if (target.matches("[data-color-text]")) {
      const color = sanitizeHexColor(target.value);
      const paired = els.inlineEditor.querySelector(`[data-color-picker="${cssEscape(target.dataset.colorText)}"]`);
      if (paired && color) paired.value = color;
      readInlineEditorToDraft();
      previewInlineDraft();
      return;
    }
    if (target.matches("[data-inline-text-field]")) {
      readInlineEditorToDraft();
      previewInlineDraft();
    }
  }

  function handleInlineEditorChange(event) {
    if (!state.editMode || !event.target.closest("#inlineEditor")) return;
    readInlineEditorToDraft();
    previewInlineDraft();
  }

  function handleInlineDocumentInput(event) {
    if (!state.editMode) return;
    const target = event.target.closest("[data-inline-document-field]");
    if (!target) return;
    const field = target.dataset.inlineDocumentField;
    state.editDraft = normalizeSettings({ ...state.editDraft, [field]: target.textContent.trim() || DEFAULT_SETTINGS[field] || "" });
    const paired = els.inlineEditor?.querySelector(`[data-inline-text-field="${cssEscape(field)}"]`);
    if (paired) paired.value = state.editDraft[field] || "";
    previewInlineDraft();
  }

  function handleInlineKeydown(event) {
    if (!state.editMode) return;
    if (event.key === "Escape") {
      if (document.activeElement?.matches?.("[contenteditable='true']")) {
        document.activeElement.blur();
        return;
      }
      if (!state.editDirty || confirm("Discard unsaved changes and exit edit mode?")) {
        exitInlineEditMode(false);
      }
      return;
    }
    if (event.key === "Enter") {
      const block = event.target.closest?.(".editable-block");
      if (!block) return;
      const editable = block.querySelector("[contenteditable='true']");
      if (editable) {
        event.preventDefault();
        editable.focus();
      }
    }
  }

  function handleInlineResizeStart(event) {
    if (!state.editMode) return;
    const handle = event.target.closest("[data-inline-resize]");
    if (!handle) return;
    event.preventDefault();
    const layout = normalizeLayout(state.editDraft?.layout || state.settings.layout);
    const key = handle.dataset.inlineResize;
    const element = handle.closest(".editable-block");
    state.inlineResize = {
      key,
      element,
      startX: event.clientX,
      startY: event.clientY,
      startValue: layout[key],
    };
    showResizeBubble(event.clientX, event.clientY, `${layout[key]}px`);
    document.body.classList.add("inline-resizing");
  }

  function handleInlineResizeMove(event) {
    if (!state.editMode || !state.inlineResize) return;
    event.preventDefault();
    const { key, startX, startY, startValue } = state.inlineResize;
    const delta = key === "mapMinHeight" ? event.clientY - startY : event.clientX - startX;
    const direction = key === "detailWidth" ? -1 : 1;
    const constraints = {
      sidebarWidth: [240, 520],
      detailWidth: [260, 560],
      mapMinHeight: [320, 1000],
    }[key] || [0, 1100];
    const nextValue = Math.round(clamp(startValue + delta * direction, constraints[0], constraints[1]));
    state.editDraft = normalizeSettings({
      ...state.editDraft,
      layout: {
        ...normalizeLayout(state.editDraft?.layout || state.settings.layout),
        [key]: nextValue,
      },
    });
    previewInlineDraft();
    showResizeBubble(event.clientX, event.clientY, `${nextValue}px`);
  }

  function handleInlineResizeEnd() {
    if (!state.inlineResize) return;
    state.inlineResize = null;
    document.body.classList.remove("inline-resizing");
    $(".inline-resize-bubble")?.remove();
    renderInlineEditor();
  }

  function showResizeBubble(x, y, textValue) {
    let bubble = $(".inline-resize-bubble");
    if (!bubble) {
      bubble = document.createElement("div");
      bubble.className = "inline-resize-bubble";
      document.body.appendChild(bubble);
    }
    bubble.textContent = textValue;
    bubble.style.left = `${x + 14}px`;
    bubble.style.top = `${y + 14}px`;
  }

  function handleBeforeUnload(event) {
    if (!state.editMode || !state.editDirty) return;
    event.preventDefault();
    event.returnValue = "";
  }

  function readInlineEditorToDraft() {
    if (!state.editMode || !els.inlineEditor) return;
    const formControls = $$("input[name], select[name], textarea[name]", els.inlineEditor).filter((control) => {
      const section = control.closest(".inline-editor-section");
      return !section || getComputedStyle(section).display !== "none";
    });
    const data = new FormData();
    formControls.forEach((control) => {
      if (control.type === "checkbox") {
        if (control.checked) data.append(control.name, "on");
        return;
      }
      data.set(control.name, control.value);
    });
    const current = normalizeSettings(state.editDraft || state.settings);
    const value = (name, fallback) => (data.has(name) ? data.get(name) : fallback);
    const numberValue = (name, fallback) => (data.has(name) ? Number(data.get(name)) : fallback);
    const checkboxValue = (name, fallback) => (formControls.some((control) => control.name === name) ? data.has(name) : fallback);
    state.editDraft = normalizeSettings({
      ...state.editDraft,
      title: String(value("title", current.title)).trim() || DEFAULT_SETTINGS.title,
      subtitle: String(value("subtitle", current.subtitle)).trim() || DEFAULT_SETTINGS.subtitle,
      mapLabel: String(value("mapLabel", current.mapLabel)).trim() || DEFAULT_SETTINGS.mapLabel,
      accent: value("accent", current.accent) || DEFAULT_SETTINGS.accent,
      background: value("background", current.background) || DEFAULT_SETTINGS.background,
      surface: value("surface", current.surface) || DEFAULT_SETTINGS.surface,
      text: value("text", current.text) || DEFAULT_SETTINGS.text,
      pinSize: clamp(numberValue("pinSize", current.pinSize) || DEFAULT_SETTINGS.pinSize, 22, 64),
      brandMarkStyle: normalizeBrandMarkStyle(value("brandMarkStyle", current.brandMarkStyle)),
      fonts: {
        global: value("fontGlobal", current.fonts.global) || DEFAULT_FONTS.global,
        headings: value("fontHeadings", current.fonts.headings) || "",
        body: value("fontBody", current.fonts.body) || "",
        detailPane: value("fontDetailPane", current.fonts.detailPane) || "",
        listCards: value("fontListCards", current.fonts.listCards) || "",
        stats: value("fontStats", current.fonts.stats) || "",
      },
      design: readDesignForm(data, state.editDraft?.design),
      layout: {
        sidebarWidth: numberValue("sidebarWidth", current.layout.sidebarWidth),
        detailWidth: numberValue("detailWidth", current.layout.detailWidth),
        panelGap: numberValue("panelGap", current.layout.panelGap),
        panelMinHeight: numberValue("panelMinHeight", current.layout.panelMinHeight),
        mapMinHeight: numberValue("mapMinHeight", current.layout.mapMinHeight),
        resourceListHeight: numberValue("resourceListHeight", current.layout.resourceListHeight),
      },
      features: {
        showSearchPanel: checkboxValue("showSearchPanel", current.features.showSearchPanel),
        showStatsPanel: checkboxValue("showStatsPanel", current.features.showStatsPanel),
        showCategoryChips: checkboxValue("showCategoryChips", current.features.showCategoryChips),
        showResourceList: checkboxValue("showResourceList", current.features.showResourceList),
        showMapToolbar: checkboxValue("showMapToolbar", current.features.showMapToolbar),
        showDetailPanel: checkboxValue("showDetailPanel", current.features.showDetailPanel),
      },
    });
  }

  function previewInlineDraft(shouldRenderEditor = false) {
    if (!state.editMode) return;
    markInlineDirty();
    state.settings = normalizeSettings(state.editDraft);
    applySettings();
    applyInlineEditableBlocks();
    updateMatchedPanelHeight();
    updateResourceScrollCue();
    renderMapMarkers(getFilteredResources(), { fitMap: false });
    updateInlinePinPreview();
    if (shouldRenderEditor) renderInlineEditor();
  }

  function updateInlinePinPreview() {
    const preview = els.inlineEditor?.querySelector(".inline-pin-size .pin-preview");
    if (!preview) return;
    const size = Number(state.editDraft?.pinSize || state.settings.pinSize || DEFAULT_SETTINGS.pinSize);
    preview.style.setProperty("--preview-pin-size", `${clamp(size, 22, 64)}px`);
  }

  function markInlineDirty() {
    if (!state.editMode) return;
    state.editDirty = true;
    const indicator = els.inlineEditor?.querySelector(".inline-unsaved");
    if (indicator) {
      indicator.classList.add("dirty");
      indicator.textContent = "Unsaved changes";
    }
  }

  function resetInlineControl(scope, field) {
    if (!state.editMode) return;
    const draft = structuredCloneSafe(state.editDraft || state.settings);
    if (scope === "setting") draft[field] = getDefaultSettingValue(field);
    if (scope === "font") draft.fonts = { ...normalizeFonts(draft.fonts), [field]: DEFAULT_FONTS[field] ?? "" };
    if (scope === "design") draft.design = { ...normalizeDesign(draft.design), [field]: DEFAULT_DESIGN[field] };
    if (scope === "layout") draft.layout = { ...normalizeLayout(draft.layout), [field]: getDefaultLayoutValue(field) };
    if (scope === "features") draft.features = { ...normalizeFeatures(draft.features), [field]: getDefaultFeatureValue(field) };
    state.editDraft = normalizeSettings(draft);
    previewInlineDraft(true);
  }

  function toggleInlineFeature(feature) {
    if (!feature) return;
    const features = normalizeFeatures(state.editDraft?.features || state.settings.features);
    state.editDraft = normalizeSettings({
      ...state.editDraft,
      features: {
        ...features,
        [feature]: !features[feature],
      },
    });
    previewInlineDraft(true);
  }

  function getInlineBlocks() {
    return [
      { group: "header", key: "brand", element: els.brandLockup, label: "Edit text" },
      { group: "header", key: "actions", element: els.topActions, label: "Reorder actions" },
      { group: "topActions", key: "location", element: els.useLocationBtn, label: "Reorder" },
      { group: "topActions", key: "edit", element: els.editPageBtn, label: "Reorder" },
      { group: "topActions", key: "admin", element: els.adminOpenBtn, label: "Reorder" },
      { group: "sidebar", key: "search", element: els.searchPanel, feature: "showSearchPanel", label: "Hide/show" },
      { group: "sidebar", key: "stats", element: els.quickStats, feature: "showStatsPanel", label: "Hide/show" },
      { group: "sidebar", key: "categories", element: els.categoryStrip, feature: "showCategoryChips", label: "Hide/show" },
      { group: "sidebar", key: "resources", element: els.resourceListSection, feature: "showResourceList", label: "Hide/show" },
      { group: "mapChrome", key: "toolbar", element: els.mapToolbar, feature: "showMapToolbar", label: "Hide/show" },
      { group: "dashboard", key: "sidebar", element: els.sidebar, resize: "sidebarWidth", label: "Resize" },
      { group: "dashboard", key: "map", element: els.mapArea, resize: "mapMinHeight", label: "Resize" },
      { group: "dashboard", key: "detail", element: els.detailPanel, feature: "showDetailPanel", resize: "detailWidth", label: "Resize" },
    ].filter((item) => item.element);
  }

  function applyInlineEditableBlocks() {
    if (!state.editMode) return;
    const features = normalizeFeatures(state.editDraft?.features || state.settings.features);
    getInlineBlocks().forEach(({ group, key, element, feature, resize, label }) => {
      element.classList.add("editable-block");
      element.draggable = true;
      element.dataset.inlineGroup = group;
      element.dataset.inlineKey = key;
      element.dataset.editLabel = label || "Edit";
      element.tabIndex = element.tabIndex >= 0 ? element.tabIndex : 0;
      element.querySelectorAll(":scope > .inline-block-tool, :scope > .inline-resize-handle, :scope > .inline-drag-handle").forEach((tool) => tool.remove());
      element.insertAdjacentHTML("beforeend", `<span class="inline-drag-handle" aria-hidden="true">Drag</span>`);
      if (feature) {
        const shown = features[feature] !== false;
        element.insertAdjacentHTML(
          "beforeend",
          `<button class="inline-block-tool inline-visibility-toggle" type="button" data-inline-action="toggle-block" data-feature="${escapeAttr(feature)}" aria-label="${shown ? "Hide" : "Show"} this block">${shown ? "Hide" : "Show"}</button>`,
        );
      }
      if (resize) {
        const edge = resize === "mapMinHeight" ? "bottom" : resize === "detailWidth" ? "left" : "right";
        element.insertAdjacentHTML(
          "beforeend",
          `<span class="inline-resize-handle ${edge}" data-inline-resize="${escapeAttr(resize)}" aria-hidden="true"></span>`,
        );
      }
    });
    const textFields = [
      [els.siteTitle, "title"],
      [els.siteSubtitle, "subtitle"],
      [els.mapLabel, "mapLabel"],
    ];
    textFields.forEach(([element, field]) => {
      if (!element) return;
      element.contentEditable = "true";
      element.dataset.inlineDocumentField = field;
      element.spellcheck = true;
      element.tabIndex = 0;
    });
  }

  function clearInlineEditableBlocks() {
    getInlineBlocks().forEach(({ element }) => {
      element.classList.remove("editable-block", "dragging", "drop-before", "drop-after", "edit-hidden-block");
      element.removeAttribute("draggable");
      element.querySelectorAll(":scope > .inline-block-tool, :scope > .inline-resize-handle, :scope > .inline-drag-handle").forEach((tool) => tool.remove());
      delete element.dataset.inlineGroup;
      delete element.dataset.inlineKey;
      delete element.dataset.editLabel;
    });
    [els.siteTitle, els.siteSubtitle, els.mapLabel].forEach((element) => {
      if (!element) return;
      element.removeAttribute("contenteditable");
      element.removeAttribute("spellcheck");
      delete element.dataset.inlineDocumentField;
    });
  }

  function handleInlineDragStart(event) {
    if (!state.editMode) return;
    const item = event.target.closest(".editable-block");
    if (!item || item.closest("#inlineEditor")) return;
    state.inlineDrag = { group: item.dataset.inlineGroup, key: item.dataset.inlineKey };
    item.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `${state.inlineDrag.group}:${state.inlineDrag.key}`);
  }

  function handleInlineDragOver(event) {
    if (!state.editMode || !state.inlineDrag) return;
    const target = event.target.closest(".editable-block");
    if (!target || target.dataset.inlineGroup !== state.inlineDrag.group) return;
    event.preventDefault();
    $$(".editable-block.drop-before, .editable-block.drop-after").forEach((item) => item.classList.remove("drop-before", "drop-after"));
    const rect = target.getBoundingClientRect();
    const vertical = state.inlineDrag.group === "sidebar";
    const before = vertical ? event.clientY < rect.top + rect.height / 2 : event.clientX < rect.left + rect.width / 2;
    target.classList.add(before ? "drop-before" : "drop-after");
    event.dataTransfer.dropEffect = "move";
  }

  function handleInlineDrop(event) {
    if (!state.editMode || !state.inlineDrag) return;
    const target = event.target.closest(".editable-block");
    if (!target || target.dataset.inlineGroup !== state.inlineDrag.group) return;
    event.preventDefault();
    const order = normalizeLayoutOrder(state.editDraft.layoutOrder);
    const group = state.inlineDrag.group;
    if (!order[group]) {
      state.inlineDrag = null;
      return;
    }
    const key = state.inlineDrag.key;
    const targetKey = target.dataset.inlineKey;
    const rect = target.getBoundingClientRect();
    const vertical = group === "sidebar";
    const insertAfter = vertical ? event.clientY >= rect.top + rect.height / 2 : event.clientX >= rect.left + rect.width / 2;
    const next = order[group].filter((item) => item !== key);
    const targetIndex = targetKey && next.includes(targetKey) ? next.indexOf(targetKey) : next.length;
    const insertAt = insertAfter ? targetIndex + 1 : targetIndex;
    next.splice(insertAt, 0, key);
    state.editDraft = normalizeSettings({ ...state.editDraft, layoutOrder: { ...order, [group]: next } });
    state.inlineDrag = null;
    $$(".editable-block.drop-before, .editable-block.drop-after").forEach((item) => item.classList.remove("drop-before", "drop-after"));
    previewInlineDraft(true);
  }

  function handleInlineDragEnd() {
    if (!state.editMode) return;
    state.inlineDrag = null;
    $$(".editable-block.dragging, .editable-block.drop-before, .editable-block.drop-after").forEach((item) =>
      item.classList.remove("dragging", "drop-before", "drop-after"),
    );
  }

  function saveCurrentResourceForm(showMessage) {
    const form = $("#resourceForm", els.adminBody);
    const current = getAdminResource();
    if (!form || !current) return;
    const data = new FormData(form);
    current.name = data.get("name").trim() || "Untitled resource";
    current.category = data.get("category") || "Community";
    current.categories = [...new Set([current.category, ...data.getAll("resourceCategory")].filter(Boolean))];
    current.subcategory = data.get("subcategory").trim();
    current.address = data.get("address").trim();
    current.lat = Number(data.get("lat"));
    current.lng = Number(data.get("lng"));
    current.phone = data.get("phone").trim();
    current.email = data.get("email").trim();
    current.website = data.get("website").trim();
    current.description = data.get("description").trim();
    current.services = lines(data.get("services"));
    current.hoursText = data.get("hoursText").trim();
    current.requirements = data.get("requirements").trim();
    current.lastVerified = data.get("lastVerified").trim();
    current.directionQuery = data.get("directionQuery").trim();
    current.pinIcon = data.get("pinIcon").trim();
    current.pinColor = sanitizeHexColor(data.get("pinColor").trim());
    current.pinSize = clampOptionalNumber(data.get("pinSize"), 0, 64);
    current.sources = parseSources(data.get("sources"));
    current.visible = data.has("visible");
    current.emergency = data.has("emergency");
    current.alwaysOpen = data.has("alwaysOpen");
    current.approximate = data.has("approximate");
    current.schedule = structuredCloneSafe(state.adminDraftSchedule || []);
    if (showMessage) {
      state.selectedId = current.id;
      state.activeAdminId = current.id;
    }
  }

  function getAdminResource() {
    return state.resources.find((resource) => resource.id === state.activeAdminId) || null;
  }

  function getAdminCategoryOptions(currentCategory) {
    const categories = getAllCategories();
    return categories
      .map((category) => `<option value="${escapeAttr(category)}" ${category === currentCategory ? "selected" : ""}>${escapeHtml(category)}</option>`)
      .join("");
  }

  function renderResourceCategoryTags(resource) {
    const selected = new Set(getResourceCategories(resource));
    return getAllCategories()
      .map((category) => {
        const meta = getCategoryMeta(category);
        const id = `resource-category-${category.replace(/[^a-z0-9]+/gi, "-")}`;
        return `<label class="category-check" style="--category-color:${escapeAttr(meta.color)}">
          <input id="${escapeAttr(id)}" type="checkbox" name="resourceCategory" value="${escapeAttr(category)}" ${selected.has(category) ? "checked" : ""} />
          <span class="category-check-bubble" aria-hidden="true">${escapeHtml(meta.icon)}</span>
          <span>${escapeHtml(category)}</span>
        </label>`;
      })
      .join("");
  }

  function pinSizeControl(resource) {
    const defaultSize = Number(state.settings.pinSize) || DEFAULT_SETTINGS.pinSize;
    const hasValue = resource.pinSize !== "" && resource.pinSize != null && Number.isFinite(Number(resource.pinSize));
    const sliderValue = hasValue ? Number(resource.pinSize) : defaultSize;
    const meta = getResourcePinMeta(resource);
    return `<div class="pin-size-control full-span">
      <label>Pin size override</label>
      <div class="pin-size-row">
        <input type="range" min="22" max="64" step="1" value="${escapeAttr(sliderValue)}" data-range-control="pinSize" />
        <input class="range-number" name="pinSize" type="number" min="0" max="64" step="1" value="${escapeAttr(hasValue ? Number(resource.pinSize) : "")}" placeholder="Default" data-number-control="pinSize" />
        <span class="pin-preview" aria-label="Pin size preview" style="--category-color:${escapeAttr(meta.color)}; --preview-pin-size:${escapeAttr(sliderValue)}px">
          <span class="pin-preview-marker" aria-hidden="true"><span>${escapeHtml(meta.icon)}</span></span>
        </span>
        <button class="small-btn tertiary-btn" type="button" data-action="reset-resource-field" data-field="pinSize">Reset</button>
      </div>
      <span class="field-help">Blank uses the default pin size of ${defaultSize}px.</span>
    </div>`;
  }

  function updatePinPreview(root = els.adminBody) {
    const preview = root?.querySelector(".pin-preview");
    if (!preview) return;
    const form = root.querySelector("#resourceForm");
    const slider = root.querySelector("[data-range-control='pinSize']");
    const number = root.querySelector("[data-number-control='pinSize']");
    const colorInput = root.querySelector("[data-color-text='pinColor']");
    const iconInput = form?.elements.pinIcon;
    const category = form?.elements.category?.value || getAdminResource()?.category || "Community";
    const categoryMeta = getCategoryMeta(category);
    const size = Number(number?.value || slider?.value || state.settings.pinSize || DEFAULT_SETTINGS.pinSize);
    const color = sanitizeHexColor(colorInput?.value) || categoryMeta.color;
    const icon = iconInput?.value?.trim() || categoryMeta.icon;
    preview.style.setProperty("--preview-pin-size", `${clamp(size, 22, 64)}px`);
    preview.style.setProperty("--category-color", color);
    const markerLabel = preview.querySelector(".pin-preview-marker span");
    if (markerLabel) markerLabel.textContent = icon;
  }

  // Component helpers: shared admin and inline-editor controls
  function colorControl(name, label, value, options = {}) {
    const fallback = sanitizeHexColor(options.fallback) || "#70685f";
    const color = sanitizeHexColor(value);
    const textValue = options.allowBlank && !color ? "" : color || fallback;
    const bubbleValue = color || fallback;
    return `<div class="color-control">
      <label>${escapeHtml(label)}</label>
      <div class="color-row">
        <input class="color-bubble" type="color" value="${escapeAttr(bubbleValue)}" data-color-picker="${escapeAttr(name)}" aria-label="${escapeAttr(label)} picker" />
        <input class="color-code" name="${escapeAttr(name)}" value="${escapeAttr(textValue)}" placeholder="${options.allowBlank ? "Default" : "#123456"}" data-color-text="${escapeAttr(name)}" pattern="^#?[0-9a-fA-F]{6}$" />
      </div>
      ${options.help ? `<span class="field-help">${escapeHtml(options.help)}</span>` : ""}
      ${options.actions || ""}
    </div>`;
  }

  function rangeNumberControl(name, label, value, min, max, step, options = {}) {
    const hasValue = value !== "" && value != null && Number.isFinite(Number(value));
    const sliderValue = hasValue ? Number(value) : Number(options.fallback ?? min);
    const numberValue = hasValue ? Number(value) : "";
    return `<div class="range-control">
      <label>${escapeHtml(label)}</label>
      <div class="range-row">
        <input type="range" min="${escapeAttr(min)}" max="${escapeAttr(max)}" step="${escapeAttr(step)}" value="${escapeAttr(sliderValue)}" data-range-control="${escapeAttr(name)}" />
        <input class="range-number" name="${escapeAttr(name)}" type="number" min="${escapeAttr(options.allowBlank ? 0 : min)}" max="${escapeAttr(max)}" step="${escapeAttr(step)}" value="${escapeAttr(numberValue)}" placeholder="${options.allowBlank ? "Default" : ""}" data-number-control="${escapeAttr(name)}" />
      </div>
      ${options.help ? `<span class="field-help">${escapeHtml(options.help)}</span>` : ""}
      ${options.actions || ""}
    </div>`;
  }

  function featureToggle(name, label, checked, options = {}) {
    const id = `feature-${name}`;
    return `<div class="check-row">
      <input id="${escapeAttr(id)}" name="${escapeAttr(name)}" type="checkbox" ${checked ? "checked" : ""} />
      <label for="${escapeAttr(id)}">${escapeHtml(label)}</label>
      ${options.actions || ""}
    </div>`;
  }

  function fontSelect(name, label, value, options = {}) {
    const selected = options.required ? value || DEFAULT_FONTS.global : value || "";
    const inheritOption = options.required ? "" : `<option value="" ${selected ? "" : "selected"}>Use site-wide font</option>`;
    const optionsMarkup = Object.entries(fontFamilies)
      .map(([key]) => `<option value="${escapeAttr(key)}" ${key === selected ? "selected" : ""}>${escapeHtml(fontLabel(key))}</option>`)
      .join("");
    return `<div>
      <label>${escapeHtml(label)}</label>
      <select name="${escapeAttr(name)}">
        ${inheritOption}
        ${optionsMarkup}
      </select>
    </div>`;
  }

  function fontLabel(key) {
    return {
      Inter: "Inter",
      Montserrat: "Montserrat",
      ProximaNova: "Proxima Nova",
      Helvetica: "Helvetica Neue / Helvetica",
    }[key] || key;
  }

  function settingDefaultButtons(key) {
    return `<span class="inline-default-actions">
      <button class="small-btn" type="button" data-action="reset-setting" data-key="${escapeAttr(key)}">Reset</button>
      <button class="small-btn" type="button" data-action="save-setting-default" data-key="${escapeAttr(key)}">Save default</button>
    </span>`;
  }

  function panelDefaultButtons(section, key) {
    return `<span class="inline-default-actions">
      <button class="small-btn" type="button" data-action="reset-panel-option" data-section="${escapeAttr(section)}" data-key="${escapeAttr(key)}">Reset</button>
      <button class="small-btn" type="button" data-action="save-panel-default" data-section="${escapeAttr(section)}" data-key="${escapeAttr(key)}">Save default</button>
    </span>`;
  }

  function sortOptions(current) {
    const options = [
      ["name-asc", "Name A-Z"],
      ["name-desc", "Name Z-A"],
      ["category-asc", "Category A-Z"],
      ["category-desc", "Category Z-A"],
    ];
    return options
      .map(([value, label]) => `<option value="${escapeAttr(value)}" ${value === current ? "selected" : ""}>${escapeHtml(label)}</option>`)
      .join("");
  }

  function formatSlot(slot) {
    const days = (slot.days || []).map((day) => DAY_SHORT[day]).join(", ");
    const weeks = slot.weeks?.length ? ` (${slot.weeks.map((week) => ordinal(week)).join(", ")} week)` : "";
    return `${days}${weeks}: ${toDisplayTime(slot.start)}-${toDisplayTime(slot.end)}`;
  }

  function formatSourcesForForm(sources = []) {
    return sources
      .map((source) => {
        if (source.url) return `${source.label || source.url} | ${source.url}`;
        return source.label || source.note || "";
      })
      .filter(Boolean)
      .join("\n");
  }

  function parseSources(value) {
    return lines(value).map((line) => {
      const [label, ...rest] = line.split("|").map((part) => part.trim());
      const url = rest.join("|").trim();
      return url ? { label, url } : { label };
    });
  }

  function lines(value) {
    return String(value || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  // Section: Data persistence and normalization
  function saveAll() {
    localStorage.setItem(RESOURCE_KEY, JSON.stringify(state.resources));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
    localStorage.setItem(CUSTOM_DEFAULTS_KEY, JSON.stringify(state.customDefaults));
  }

  function loadResources() {
    const stored = loadJson(RESOURCE_KEY);
    const data = Array.isArray(stored) ? stored : DEFAULT_RESOURCES;
    return structuredCloneSafe(data).map(normalizeResource);
  }

  function loadSettings() {
    return normalizeSettings(loadJson(SETTINGS_KEY) || {});
  }

  function loadCustomDefaults() {
    return normalizeCustomDefaults(loadJson(CUSTOM_DEFAULTS_KEY) || {});
  }

  function normalizeCustomDefaults(defaults = {}) {
    return {
      resources: defaults.resources && typeof defaults.resources === "object" ? defaults.resources : {},
      categories: defaults.categories && typeof defaults.categories === "object" ? defaults.categories : {},
      settings: defaults.settings && typeof defaults.settings === "object" ? defaults.settings : {},
      layout: defaults.layout && typeof defaults.layout === "object" ? defaults.layout : {},
      features: defaults.features && typeof defaults.features === "object" ? defaults.features : {},
      design: defaults.design && typeof defaults.design === "object" ? defaults.design : {},
    };
  }

  function normalizeSettings(settings = {}) {
    // Legacy warm defaults are migration sentinels only; they are never applied as rendered surface colors.
    const normalized = {
      ...DEFAULT_SETTINGS,
      ...settings,
      accent: sanitizeHexColor(settings.accent) || DEFAULT_SETTINGS.accent,
      background: normalizeDefaultColor(settings.background, ["#faf8f5", "#f7f3ec"], DEFAULT_SETTINGS.background),
      surface: normalizeDefaultColor(settings.surface, ["#fff8ed", "#fffdf8"], DEFAULT_SETTINGS.surface),
      text: normalizeDefaultColor(settings.text, ["#1a1814", "#201c17"], DEFAULT_SETTINGS.text),
      pinSize: clamp(Number(settings.pinSize) || DEFAULT_SETTINGS.pinSize, 22, 64),
      brandMarkStyle: normalizeBrandMarkStyle(settings.brandMarkStyle),
      fonts: normalizeFonts(settings.fonts),
      design: normalizeDesign(settings.design),
      layoutOrder: normalizeLayoutOrder(settings.layoutOrder),
      categories: normalizeCategories(settings.categories),
      layout: normalizeLayout(settings.layout),
      features: normalizeFeatures(settings.features),
    };
    return normalized;
  }

  function normalizeFonts(fonts = {}) {
    const source = fonts && typeof fonts === "object" ? fonts : {};
    const isValid = (value) => Object.prototype.hasOwnProperty.call(fontFamilies, value);
    return {
      global: isValid(source.global) ? source.global : DEFAULT_FONTS.global,
      headings: isValid(source.headings) ? source.headings : "",
      body: isValid(source.body) ? source.body : "",
      detailPane: isValid(source.detailPane) ? source.detailPane : "",
      listCards: isValid(source.listCards) ? source.listCards : "",
      stats: isValid(source.stats) ? source.stats : "",
    };
  }

  function normalizeBrandMarkStyle(style) {
    return ["house-pin", "house", "pin"].includes(style) ? style : DEFAULT_SETTINGS.brandMarkStyle;
  }

  function normalizeDesign(design = {}) {
    design = design || {};
    const numeric = (value, fallback) => {
      const number = Number(value);
      return Number.isFinite(number) ? number : fallback;
    };
    return {
      appPadding: clamp(numeric(design.appPadding, DEFAULT_DESIGN.appPadding), 0, 64),
      headerPaddingY: clamp(numeric(design.headerPaddingY, DEFAULT_DESIGN.headerPaddingY), 8, 64),
      headerPaddingX: clamp(numeric(design.headerPaddingX, DEFAULT_DESIGN.headerPaddingX), 8, 80),
      headerGap: clamp(numeric(design.headerGap, DEFAULT_DESIGN.headerGap), 0, 64),
      headerRadius: clamp(numeric(design.headerRadius, DEFAULT_DESIGN.headerRadius), 0, 48),
      brandGap: clamp(numeric(design.brandGap, DEFAULT_DESIGN.brandGap), 0, 48),
      brandMarkSize: clamp(numeric(design.brandMarkSize, DEFAULT_DESIGN.brandMarkSize), 32, 112),
      brandIconSize: clamp(numeric(design.brandIconSize, DEFAULT_DESIGN.brandIconSize), 20, 96),
      brandIconStroke: clamp(numeric(design.brandIconStroke, DEFAULT_DESIGN.brandIconStroke), 1.5, 4.5),
      sidebarPadding: clamp(numeric(design.sidebarPadding, DEFAULT_DESIGN.sidebarPadding), 0, 48),
      cardPadding: clamp(numeric(design.cardPadding, DEFAULT_DESIGN.cardPadding), 8, 40),
      detailPadding: clamp(numeric(design.detailPadding, DEFAULT_DESIGN.detailPadding), 8, 56),
      mapToolbarPaddingY: clamp(numeric(design.mapToolbarPaddingY, DEFAULT_DESIGN.mapToolbarPaddingY), 4, 40),
      mapToolbarPaddingX: clamp(numeric(design.mapToolbarPaddingX, DEFAULT_DESIGN.mapToolbarPaddingX), 4, 56),
      inputHeight: clamp(numeric(design.inputHeight, DEFAULT_DESIGN.inputHeight), 44, 72),
      chipHeight: clamp(numeric(design.chipHeight, DEFAULT_DESIGN.chipHeight), 32, 64),
      controlRadius: clamp(numeric(design.controlRadius, DEFAULT_DESIGN.controlRadius), 0, 32),
      cardRadius: clamp(numeric(design.cardRadius, DEFAULT_DESIGN.cardRadius), 0, 40),
      paneRadius: clamp(numeric(design.paneRadius, DEFAULT_DESIGN.paneRadius), 0, 48),
      buttonRadius: clamp(numeric(design.buttonRadius, DEFAULT_DESIGN.buttonRadius), 0, 40),
      titleSize: clamp(numeric(design.titleSize, DEFAULT_DESIGN.titleSize), 28, 64),
      sectionSize: clamp(numeric(design.sectionSize, DEFAULT_DESIGN.sectionSize), 16, 32),
      bodySize: clamp(numeric(design.bodySize, DEFAULT_DESIGN.bodySize), 14, 22),
      metaSize: clamp(numeric(design.metaSize, DEFAULT_DESIGN.metaSize), 11, 18),
      microSize: clamp(numeric(design.microSize, DEFAULT_DESIGN.microSize), 10, 16),
      displayWeight: clamp(numeric(design.displayWeight, DEFAULT_DESIGN.displayWeight), 300, 900),
      headingWeight: clamp(numeric(design.headingWeight, DEFAULT_DESIGN.headingWeight), 300, 900),
      bodyWeight: clamp(numeric(design.bodyWeight, DEFAULT_DESIGN.bodyWeight), 300, 900),
      metaWeight: clamp(numeric(design.metaWeight, DEFAULT_DESIGN.metaWeight), 300, 900),
      microTracking: clamp(numeric(design.microTracking, DEFAULT_DESIGN.microTracking), 0, 0.16),
      borderOpacity: clamp(numeric(design.borderOpacity, DEFAULT_DESIGN.borderOpacity), 0, 24),
      shadowBlur: clamp(numeric(design.shadowBlur, DEFAULT_DESIGN.shadowBlur), 0, 60),
      shadowOpacity: clamp(numeric(design.shadowOpacity, DEFAULT_DESIGN.shadowOpacity), 0, 16),
    };
  }

  function normalizeLayoutOrder(layoutOrder = {}) {
    return Object.fromEntries(
      Object.entries(DEFAULT_LAYOUT_ORDER).map(([group, defaults]) => {
        const source = Array.isArray(layoutOrder?.[group]) ? layoutOrder[group] : [];
        const unique = source.filter((key, index) => defaults.includes(key) && source.indexOf(key) === index);
        return [group, [...unique, ...defaults.filter((key) => !unique.includes(key))]];
      }),
    );
  }

  function updateLayoutOrder(group, key, direction) {
    const order = normalizeLayoutOrder(state.settings.layoutOrder);
    if (!order[group]) return;
    const index = order[group].indexOf(key);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= order[group].length) return;
    const next = [...order[group]];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    state.settings = normalizeSettings({ ...state.settings, layoutOrder: { ...order, [group]: next } });
  }

  function moveLayoutOrderItem(fromGroup, key, toGroup, beforeKey) {
    const order = normalizeLayoutOrder(state.settings.layoutOrder);
    if (!order[fromGroup] || !order[toGroup] || fromGroup !== toGroup || !order[fromGroup].includes(key)) return;
    const next = order[fromGroup].filter((item) => item !== key);
    const insertAt = beforeKey && next.includes(beforeKey) ? next.indexOf(beforeKey) : next.length;
    next.splice(insertAt, 0, key);
    state.settings = normalizeSettings({ ...state.settings, layoutOrder: { ...order, [fromGroup]: next } });
  }

  function normalizeDefaultColor(value, oldDefaults, fallback) {
    const color = sanitizeHexColor(value);
    if (!color || oldDefaults.includes(color.toLowerCase())) return fallback;
    return color;
  }

  function normalizeCategories(categories = {}) {
    const source = categories && Object.keys(categories).length ? categories : CATEGORIES;
    return Object.fromEntries(
      Object.entries(source)
        .filter(([name]) => String(name || "").trim())
        .map(([name, meta]) => [
          String(name).trim(),
          {
            color: sanitizeHexColor(meta?.color) || "#70685f",
            icon: String(meta?.icon || String(name).trim().slice(0, 1).toUpperCase() || "?").trim(),
          },
        ]),
    );
  }

  function normalizeLayout(layout = {}) {
    layout = layout || {};
    return {
      sidebarWidth: clamp(Number(layout.sidebarWidth) || DEFAULT_LAYOUT.sidebarWidth, 240, 520),
      detailWidth: clamp(Number(layout.detailWidth) || DEFAULT_LAYOUT.detailWidth, 260, 560),
      panelGap: clamp(Number(layout.panelGap) || DEFAULT_LAYOUT.panelGap, 0, 36),
      panelMinHeight: clamp(Number(layout.panelMinHeight) || DEFAULT_LAYOUT.panelMinHeight, 0, 1100),
      mapMinHeight: clamp(Number(layout.mapMinHeight) || DEFAULT_LAYOUT.mapMinHeight, 320, 1000),
      resourceListHeight: clamp(Number(layout.resourceListHeight) || DEFAULT_LAYOUT.resourceListHeight, 0, 900),
    };
  }

  function normalizeFeatures(features = {}) {
    features = features || {};
    return {
      ...DEFAULT_FEATURES,
      ...(features || {}),
    };
  }

  function getDefaultResource(id) {
    if (state.customDefaults.resources[id]) return structuredCloneSafe(state.customDefaults.resources[id]);
    const original = DEFAULT_RESOURCES.find((resource) => resource.id === id);
    return original ? structuredCloneSafe(original) : null;
  }

  function getDefaultCategory(name) {
    if (state.customDefaults.categories[name]) return structuredCloneSafe(state.customDefaults.categories[name]);
    return CATEGORIES[name] ? structuredCloneSafe(CATEGORIES[name]) : null;
  }

  function getDefaultSettingValue(key) {
    if (Object.prototype.hasOwnProperty.call(state.customDefaults.settings, key)) return structuredCloneSafe(state.customDefaults.settings[key]);
    return structuredCloneSafe(DEFAULT_SETTINGS[key]);
  }

  function getDefaultLayoutValue(key) {
    if (Object.prototype.hasOwnProperty.call(state.customDefaults.layout, key)) return structuredCloneSafe(state.customDefaults.layout[key]);
    return structuredCloneSafe(DEFAULT_LAYOUT[key]);
  }

  function getDefaultFeatureValue(key) {
    if (Object.prototype.hasOwnProperty.call(state.customDefaults.features, key)) return structuredCloneSafe(state.customDefaults.features[key]);
    return structuredCloneSafe(DEFAULT_FEATURES[key]);
  }

  function loadJson(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  function normalizeResource(resource) {
    const primaryCategory = resource.category || "Community";
    const migratedCategories = Array.isArray(resource.categories) ? resource.categories : [];
    if (!Array.isArray(resource.categories) && resource.id === "pads-elgin") {
      migratedCategories.push("Meals");
    }
    return {
      id: resource.id || uniqueId("resource"),
      name: resource.name || "Untitled resource",
      category: primaryCategory,
      categories: [...new Set([primaryCategory, ...migratedCategories].filter(Boolean))],
      subcategory: resource.subcategory || "",
      address: resource.address || "",
      lat: Number(resource.lat),
      lng: Number(resource.lng),
      phone: resource.phone || "",
      email: resource.email || "",
      website: resource.website || "",
      hoursText: resource.hoursText || "",
      schedule: Array.isArray(resource.schedule) ? resource.schedule : [],
      alwaysOpen: Boolean(resource.alwaysOpen),
      emergency: Boolean(resource.emergency),
      approximate: Boolean(resource.approximate),
      directionQuery: resource.directionQuery || "",
      pinIcon: resource.pinIcon || "",
      pinColor: sanitizeHexColor(resource.pinColor || ""),
      pinSize: clampOptionalNumber(resource.pinSize, 0, 64),
      description: resource.description || "",
      services: Array.isArray(resource.services) ? resource.services : [],
      requirements: resource.requirements || "",
      visible: resource.visible !== false,
      lastVerified: resource.lastVerified || "",
      sources: Array.isArray(resource.sources) ? resource.sources : [],
    };
  }

  function isAdminAuthed() {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  }

  async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function showAdminMessage(message) {
    const messageEl = $("#adminMessage", els.adminBody);
    if (messageEl) messageEl.textContent = message;
  }

  function uniqueId(base) {
    const slug = String(base || "resource")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40);
    let id = slug || "resource";
    let index = 2;
    const taken = new Set(state?.resources?.map((resource) => resource.id) || DEFAULT_RESOURCES.map((resource) => resource.id));
    while (taken.has(id)) {
      id = `${slug}-${index}`;
      index += 1;
    }
    return id;
  }

  function uniqueCategoryName(base) {
    const categories = new Set(getAllCategories());
    let name = base;
    let index = 2;
    while (categories.has(name)) {
      name = `${base} ${index}`;
      index += 1;
    }
    return name;
  }

  function toDisplayTime(time) {
    const minutes = minutesFromTime(time);
    if (minutes == null) return time || "";
    const hours24 = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const suffix = hours24 >= 12 ? "PM" : "AM";
    const hours = hours24 % 12 || 12;
    return `${hours}:${String(mins).padStart(2, "0")} ${suffix}`;
  }

  function phoneHref(phone) {
    return String(phone).replace(/[^0-9+]/g, "");
  }

  function ordinal(value) {
    return value === 1 ? "1st" : value === 2 ? "2nd" : value === 3 ? "3rd" : `${value}th`;
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function clampOptionalNumber(value, min, max) {
    if (value === "" || value == null) return "";
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) return "";
    return clamp(number, min, max);
  }

  function sanitizeHexColor(value) {
    const color = String(value || "").trim();
    if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
    if (/^[0-9a-fA-F]{6}$/.test(color)) return `#${color}`;
    return "";
  }

  function shadeColor(color, amount) {
    const hex = color.replace("#", "");
    if (hex.length !== 6) return color;
    const number = parseInt(hex, 16);
    const r = clamp((number >> 16) + amount, 0, 255);
    const g = clamp(((number >> 8) & 0xff) + amount, 0, 255);
    const b = clamp((number & 0xff) + amount, 0, 255);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function cssEscape(value) {
    if (window.CSS?.escape) return CSS.escape(value);
    return String(value).replace(/"/g, '\\"');
  }

  function structuredCloneSafe(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function syncControlLabels(root = document) {
    $$("label", root).forEach((label) => {
      if (label.htmlFor || label.querySelector("input, select, textarea")) return;
      const labelText = label.textContent.trim();
      const sibling = label.nextElementSibling;
      if (!sibling) return;
      const controls = sibling.matches?.("input, select, textarea") ? [sibling] : $$("input, select, textarea", sibling);
      controls.forEach((control, index) => {
        if (!control.id) control.id = uniqueElementId(control.name || control.type || control.tagName.toLowerCase());
        if (index === 0) label.htmlFor = control.id;
        if (index > 0 && labelText && !control.getAttribute("aria-label")) {
          control.setAttribute("aria-label", `${labelText} ${control.type || control.tagName.toLowerCase()}`);
        }
      });
    });
  }

  function uniqueElementId(base) {
    const slug = String(base || "control")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40);
    let id = `field-${slug || "control"}`;
    let index = 2;
    while (document.getElementById(id)) {
      id = `field-${slug || "control"}-${index}`;
      index += 1;
    }
    return id;
  }

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $$(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }
})();

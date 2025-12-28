export const slidesData = [
    // --- SLIDE 1: Title ---
    {
      id: 1,
      type: "title", 
      title: "Analysis of Information System Implementation",
      highlight: "at JSS Hospital, Mysuru", 
      subtitle: "A Strategic Study on Digital Transformation in Tertiary Care",
      theme: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" 
    },

    // --- SLIDE 2: Objectives (HUD) ---
    {
        id: 2,
        type: "grid", 
        title: "Objective of the Study",
        theme: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        cards: [
            // Card 0 is the CORE GOAL (Top)
            { 
                label: "Core Goal", 
                text: "Analyze the lifecycle of IS implementation at JSS Hospital, from need identification to financial implications.",
                icon: "🎯"
            },
            // Cards 1, 2, 3 are the SUB GOALS (Bottom)
            { 
                label: "Focus Areas", 
                list: ["Clinical Operations", "Decision Making"],
                icon: "⚡" 
            },
            { 
                label: "Importance", 
                text: "IS is a core infrastructure, not just a support tool.",
                icon: "🏥" 
            },
            { 
                label: "Outcome", 
                text: "Improved patient safety, efficiency, and accuracy.",
                icon: "📈" 
            }
        ]
    },

    // --- SLIDE 3: Stats (Dashboard) ---
    {
        id: 3,
        type: "stats", 
        title: "Introduction to JSS Hospital",
        subtitle: "Tertiary-care teaching hospital within India’s US$ 372 billion market.",
        theme: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        
        dualRole: {
            title: "The Dual Role",
            desc: "Combines high-volume patient care with academic responsibilities (JSS Medical College)."
        },

        stats: [
            { label: "Total Capacity", value: 1800, suffix: " Beds", icon: "🏥" },
            { label: "Critical Care", value: 260, suffix: " Beds", icon: "🚑" },
            { label: "Departments", value: 30, suffix: "+", icon: "🩺" },
            { label: "Market Size", value: 372, suffix: " Bn ($)", icon: "🌏" }
        ]
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 4: Key Business Activities (Convergence) ---
    {
        id: 4,
        type: "convergence",
        title: "Key Business Activities",
        heading: "Core Business Domains",
        theme: "linear-gradient(135deg, #16222a 0%, #3a6073 100%)", // Cool Deep Teal
        
        domains: [
            { 
                title: "Patient Care", 
                text: "Comprehensive services (Medicine, Surgery, Cardiology, Oncology) generating continuous clinical data.",
                icon: "🩺",
                color: "from-blue-400 to-blue-600", // CSS Class helper (we'll use raw hex in CSS)
                accent: "#4facfe"
            },
            { 
                title: "Medical Education", 
                text: "Management of academic schedules, case logs, and resident training for medical students.",
                icon: "🎓",
                color: "from-purple-400 to-purple-600",
                accent: "#c471ed"
            },
            { 
                title: "Clinical Research", 
                text: "Data-intensive activities requiring ethical approvals, longitudinal tracking, and structured reporting.",
                icon: "🔬",
                color: "from-green-400 to-green-600",
                accent: "#43e97b"
            }
        ],
        takeaway: "The convergence of these three domains creates a highly complex, information-intensive environment."
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 5: The Need (Dichotomy) ---
    {
        id: 5,
        type: "dichotomy", // New layout type for contrast
        title: "Why Digitalization was Essential",
        theme: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", // Deep dark blue base

        // LEFT SIDE: Manual Chaos (Red Accent)
        leftSide: {
            heading: "Challenges of Manual Systems",
            accent: "#e74c3c", // Red
            icon: "⚠️",
            items: [
                { text: "Fragmented information and duplicate patient files.", icon: "📂" },
                { text: "High risk of medication errors (account for ~1/3rd of hospital adverse events).", icon: "💊", highlight: true },
                { text: "Inefficiency: Manual retrieval adds 15–30 mins per patient.", icon: "⏳", highlight: true }
            ]
        },

        // RIGHT SIDE: Digital Drivers (Blue Accent)
        rightSide: {
            heading: "Operational Drivers",
            accent: "#4facfe", // Cyan/Blue
            icon: "🚀",
            items: [
                { text: "Need for multi-department coordination.", icon: "🔄" },
                { text: "Requirement for real-time data on bed occupancy and revenue.", icon: "📊" },
                { text: "Mandatory regulatory and accreditation reporting.", icon: "📜" }
            ]
        }
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 6: System Selection (Chart & Process) ---
    {
        id: 6,
        type: "selection",
        title: "System Selection Process",
        heading: "Vendor Selection & Evaluation",
        theme: "linear-gradient(135deg, #240b36 0%, #c31432 100%)", // Deep Maroon/Purple

        // Left Side: The Process Steps
        steps: [
            { 
                id: "01", 
                title: "Requirement Identification", 
                desc: "Defined needs across Clinical, Administrative, and Academic areas." 
            },
            { 
                id: "02", 
                title: "Modular Architecture", 
                desc: "Preferred for phased implementation and scalability." 
            }
        ],

        // Right Side: The Scoring Data
        scoring: {
            title: "Step 3: Weighted Scoring Model",
            data: [
                { label: "Usability", value: 30, color: "#f72585" }, // Pink
                { label: "Clinical Coverage", value: 25, color: "#7209b7" }, // Purple
                { label: "Cost", value: 20, color: "#3a0ca3" }, // Deep Blue
                { label: "Support & Security", value: 25, color: "#4cc9f0" } // Cyan
            ]
        },

        // Footer
        committee: "Decision Makers: Cross-functional committee (Admins, Clinicians, IT, Finance)"
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 7: Implementation Strategy (Roadmap) ---
    {
        id: 7,
        type: "roadmap",
        title: "Implementation Strategy",
        heading: "Phased Implementation Approach",
        strategy: "Strategy: Avoided 'Big Bang' deployment to ensure patient safety.",
        theme: "linear-gradient(135deg, #000000 0%, #434343 100%)", // Pure Corporate Dark

        phases: [
            { 
                step: "01", 
                title: "Planning", 
                text: "Defined scope, timelines, and budget to prevent scope creep.",
                icon: "📝",
                color: "#ff9f43" // Orange
            },
            { 
                step: "02", 
                title: "Customization", 
                text: "Adapted modules to specific teaching-hospital workflows.",
                icon: "⚙️",
                color: "#54a0ff" // Blue
            },
            { 
                step: "03", 
                title: "Pilot Testing", 
                text: "Deployed in select departments first to identify functional gaps.",
                icon: "🧪",
                color: "#5f27cd" // Purple
            },
            { 
                step: "04", 
                title: "Go-Live", 
                text: "Supported by parallel running of legacy systems for continuity.",
                icon: "🚀",
                color: "#10ac84" // Green
            }
        ]
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 8: Challenges & Solutions (Breakthrough) ---
    {
        id: 8,
        type: "challenges",
        title: "Challenges & Risk Management",
        heading: "Overcoming Implementation Hurdles",
        // Theme: A dark, intense gradient suggesting overcoming difficulty
        theme: "linear-gradient(135deg, #1a0f0f 0%, #2c1515 100%)", 

        pairs: [
            {
                id: 1,
                challenge: { title: "User Resistance", icon: "😤" },
                solution: { text: "Involved senior clinicians in discussions to drive peer acceptance.", icon: "🤝" }
            },
            {
                id: 2,
                challenge: { title: "Data Migration", icon: "💾" },
                solution: { text: "Phased transfer with validation checks to reduce errors.", icon: "✅" }
            },
            {
                id: 3,
                challenge: { title: "System Downtime", icon: "🚫" },
                solution: { text: "Maintained paper backups and parallel systems during rollout.", icon: "📝" }
            },
            {
                id: 4,
                challenge: { title: "Training Gaps", icon: "🎓" },
                solution: { text: "Provided 2-4 weeks of on-site vendor support post-deployment.", icon: "👨‍🏫" }
            }
        ]
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 9: Training & Support (Dashboard) ---
    {
        id: 9,
        type: "training",
        title: "Training & Support",
        heading: "Empowering the Workforce",
        theme: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", // Professional Tech

        roles: [
            { title: "Doctors", icon: "👨‍⚕️" },
            { title: "Nurses", icon: "👩‍⚕️" },
            { title: "Admin", icon: "🖥️" }
        ],

        methods: [
            { 
                title: "Classroom", 
                text: "Concept familiarization & theory.", 
                icon: "📖",
                accent: "#f1c40f" // Gold
            },
            { 
                title: "Hands-on", 
                text: "Practice on real-time tasks (Ordering, Billing).", 
                icon: "⌨️", 
                accent: "#e67e22" // Orange
            }
        ],

        volume: "15-20", // The big number
        volumeLabel: "Hours of Training Per User",
        
        support: "Continuous on-the-job assistance to resolve immediate operational issues."
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 10: User Acceptance (Growth Graph) ---
    {
        id: 10,
        type: "acceptance",
        title: "User Acceptance",
        heading: "Gauging System Adoption",
        theme: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", // Success Green/Teal

        metrics: [
            { title: "Usage Logs", icon: "📈" },
            { title: "Error Rates", icon: "📉" },
            { title: "Helpdesk Tickets", icon: "🎫" }
        ],

        trends: {
            heading: "Positive Trends",
            text: "High usage and declining error rates signaled acceptance."
        },

        drivers: [
            { title: "Less Paperwork", icon: "📄" },
            { title: "Faster Access", icon: "⚡" },
            { title: "Better Coordination", icon: "🤝" }
        ],

        outcome: "Perceived efficiency gains were the primary driver for long-term adoption."
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 11: System Usage (Central Hub) ---
    {
        id: 11,
        type: "usage",
        title: "System Usage",
        heading: "Core System Functions",
        theme: "linear-gradient(135deg, #000428 0%, #004e92 100%)", // Deep Royal Blue

        // The 5 Core Modules (Center)
        modules: [
            { name: "Registration", icon: "📝" },
            { name: "EMR", icon: "💻" },
            { name: "Lab (LIS)", icon: "🔬" },
            { name: "Pharmacy", icon: "💊" },
            { name: "Billing", icon: "💳" }
        ],

        // The Benefits (Satellites)
        benefits: [
            {
                title: "Integration",
                text: "Seamless flow of patient data across departments, reducing manual entry.",
                icon: "🔗",
                position: "left"
            },
            {
                title: "Clinical Impact",
                text: "Real-time access to test results and treatment plans improves decision-making.",
                icon: "🧠",
                position: "right"
            }
        ],

        // The Big Stat
        efficiency: {
            title: "Efficiency Gain",
            value: "20-30",
            suffix: "%",
            text: "Reduction in documentation time."
        }
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 12: Report Generation (Analytics) ---
    {
        id: 12,
        type: "reporting",
        title: "Report Generation",
        heading: "Data-Driven Reporting",
        theme: "linear-gradient(135deg, #141E30 0%, #243B55 100%)", // Deep Midnight Blue

        operational: {
            title: "Operational Reports",
            icon: "🏥",
            desc: "Daily patient census (Admissions/Discharges) and Bed Occupancy rates.",
            color: "#00b09b" // Teal
        },

        financial: {
            title: "Financial Reports",
            icon: "💰",
            desc: "Department-wise revenue tracking to identify high-performance areas.",
            color: "#FDC830" // Gold
        },

        strategy: {
            title: "Strategic Value",
            items: [
                "Monitors capacity utilization.",
                "Enhances financial transparency.",
                "Supports evidence-based resource allocation."
            ]
        }
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 13: Database Management (Server Core) ---
    {
        id: 13,
        type: "database",
        title: "Database Management",
        heading: "Managing High-Volume Data",
        theme: "linear-gradient(135deg, #0b0f19 0%, #1c2541 100%)", // Deep Server Room Blue

        challenge: {
            value: "30-40%",
            label: "Annual Data Growth",
            text: "Volume grows exponentially in healthcare."
        },

        strategy: {
            title: "Centralized Strategy",
            text: "Unified databases ensure consistency & reduce duplication."
        },

        integrity: [
            { title: "Scheduled Backups", icon: "💾" },
            { title: "Disaster Recovery", icon: "🛡️" }
        ],

        objective: "Ensure uninterrupted clinical and administrative workflows."
    },

    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 14: Data Security (Cyber Vault) ---
    {
        id: 14,
        type: "security",
        title: "Data Security",
        heading: "Securing Patient Information",
        theme: "linear-gradient(135deg, #000000 0%, #0f2027 100%)", // Matrix Black

        coreIcon: "🔒",

        measures: [
            {
                title: "Access Control",
                text: "Role-based access ensures users see only relevant data.",
                icon: "🆔",
                color: "#00d2ff" // Cyan
            },
            {
                title: "Accountability",
                text: "Audit trails record all user activities (viewing & modifying).",
                icon: "👁️",
                color: "#F9D423" // Yellow/Amber for alerts
            },
            {
                title: "Protection",
                text: "Encrypted backups and password authentication.",
                icon: "🛡️",
                color: "#ff0099" // Magenta for strength
            },
            {
                title: "Compliance",
                text: "Aligned with IT Act (2000) & MeitY guidelines.",
                icon: "⚖️",
                color: "#00ff87" // Matrix Green
            }
        ]
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 15: Managerial Insights Part 1 (The Prisms) ---
    {
        id: 15,
        type: "insights",
        title: "Managerial Insights (Part 1)",
        heading: "Strategic Learnings",
        theme: "linear-gradient(135deg, #141E30 0%, #243B55 100%)", // Deep Executive Blue/Black

        points: [
            { 
                id: "01", 
                title: "IS is a Strategic Asset", 
                text: "It directly impacts clinical quality and safety, not just back-office support.", 
                icon: "♟️", 
                color: "#f1c40f" // Strategic Gold
            },
            { 
                id: "02", 
                title: "Process Alignment", 
                text: "Tech must align with workflows; excessive customization raises costs, while too little reduces usability.", 
                icon: "⚖️", 
                color: "#00d2ff" // Balanced Blue
            },
            { 
                id: "03", 
                title: "Change Management", 
                text: "Success depends on managing human factors—early user involvement is critical to overcome resistance.", 
                icon: "🔄", 
                color: "#ff9f43" // Active Orange
            },
            
        ]
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 16: Managerial Insights Part 2 (Operational Nexus) ---
    {
        id: 16,
        type: "insights-nexus", // New layout type
        title: "Managerial Insights (Part 2)",
        heading: "Operational & Financial Learnings",
        // Theme: Deep space/cybernetic background
        theme: "radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 100%)", 

        coreText: "EXECUTION HUB",

        points: [
            { 
                id: "04", 
                title: "Proactive Management", 
                // Refined text for impact
                text: "Shift from reactive to evidence-based. Real-time dashboards drive instant decisions.", 
                icon: "📡", 
                color: "#00f2fe", // Cyan (Speed/Data)
                position: "top-left"
            },
            { 
                id: "05", 
                title: "Financial Discipline", 
                // Refined text for impact
                text: "Plug revenue leakages. Automated accuracy justifies ROI and ensures healthy cash flow.", 
                icon: "💹", 
                color: "#ffd700", // Gold (Finance)
                position: "top-right"
            },
            { 
                id: "06", 
                title: "Governance as Duty", 
                // Refined text for impact
                text: "Security is a leadership responsibility, not just an IT ticket. Compliance is ongoing.", 
                icon: "🏛️", 
                color: "#ff0055", // Magenta/Red (Alert/Important)
                position: "bottom"
            }
        ]
    },
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 17: Conclusion (The Crystal Finale) ---
    // src/models/slides.js

// ... previous slides ...

    // --- SLIDE 17: Conclusion (The Monolith) ---
    {
        id: 17,
        type: "conclusion-monolith", // New Layout Type
        title: "Final Thoughts",
        heading: "The Strategic Imperative",
        theme: "linear-gradient(to bottom, #000000, #434343)", // Cinematic Dark

        summary: "Information Systems are the central nervous system of modern healthcare.",

        // Left Side Modules
        leftModules: [
            { label: "Integration", icon: "🔗", color: "#00c6ff" },
            { label: "Efficiency", icon: "⚡", color: "#0072ff" }
        ],

        // Right Side Modules
        rightModules: [
            { label: "Accountability", icon: "👁️", color: "#f09819" },
            { label: "Growth", icon: "🚀", color: "#ff512f" }
        ],

        cta: {
            heading: "Managerial Call to Action",
            text: "Managers must take ownership of IS initiatives. Align technology with organizational goals to ensure long-term sustainability."
        },

        finalMessage: "THANK YOU"
    }






];
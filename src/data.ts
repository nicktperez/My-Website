export const portfolioData = {
    name: "Nicholas Perez",
    title: "IT Systems Engineer",
    email: "nicktperez@gmail.com",
    location: "Sacramento, CA",
    github: "https://github.com/nicktperez",
    summary: "IT systems professional with 10+ years of experience supporting people, endpoints, identity, workplace technology, automation, and security operations.",
    skills: [
        { name: "macOS & Windows Admin", icon: "Monitor" },
        { name: "Jamf & Intune (MDM)", icon: "Shield" },
        { name: "Azure AD / Okta (SSO)", icon: "Key" },
        { name: "Elastic Stack (SIEM)", icon: "Lock" },
        { name: "Threat Hunting (Sysmon)", icon: "Eye" },
        { name: "Bash & PowerShell", icon: "Terminal" },
        { name: "Network Security", icon: "Network" },
        { name: "Incident Response", icon: "Activity" },
    ],
    featuredProject: {
        title: "MacTrace",
        category: "Endpoint security · macOS · Python",
        status: "Open source",
        github: "https://github.com/nicktperez/MacTrace",
        image: "/mactrace-dashboard.png",
        imageAlt: "MacTrace endpoint security dashboard showing synthetic risk, detections, event volume, and severity",
        description: "MacTrace collects security-relevant macOS metadata locally, correlates process, file, network, signing, and quarantine activity, and records why an event was flagged.",
        highlights: [
            "Correlates related endpoint activity across eight explainable detection rules.",
            "Streams live events through FastAPI and WebSockets into a responsive investigation dashboard.",
            "Protects privacy with local-only storage, secret redaction, bounded retention, and sanitized exports.",
            "Ships with deterministic demo data, automated tests, CI, and an optional native menu-bar controller."
        ],
        stack: ["Python", "FastAPI", "WebSockets", "SQLite", "macOS"]
    },
    projects: [
        {
            title: "SIEM Home Lab",
            category: "Detection engineering",
            github: "https://github.com/nicktperez/siem-home-lab",
            image: "/siem-kibana-dashboard.png",
            imageAlt: "Kibana visualization showing counts of simulated failed SSH authentication events",
            description: "I built an Elastic Stack lab that carries synthetic security events from collection and parsing through detection, triage, and documented investigation.",
            outcome: "The lab covers event collection, parsing, detection, triage, and a documented investigation.",
            stack: ["Elastic Stack", "Filebeat", "Logstash", "Docker", "Python"]
        },
        {
            title: "OrbitLab",
            category: "Systems engineering",
            github: "https://github.com/nicktperez/OrbitLab",
            image: "/orbitlab-screenshot.png",
            imageAlt: "OrbitLab desktop application simulating a three-dimensional orbital system",
            description: "I built a C++20 desktop simulator for creating and studying N-body systems with multiple physics solvers, performance tools, and numerical tests.",
            outcome: "The project includes multiple solvers, performance measurements, numerical tests, and reproducible benchmarks.",
            stack: ["C++20", "SDL 3", "Dear ImGui", "CMake", "Catch2"]
        }
    ],
    moreProjects: [
        {
            title: "AI Resume Tailor",
            description: "AI-assisted resume tailoring with authentication, Stripe, history, and security controls.",
            stack: "Next.js · OpenAI · Prisma",
            github: "https://github.com/nicktperez/AI-Resume-Builder"
        },
        {
            title: "ListGenie",
            description: "An AI-powered real-estate listing assistant with authentication, persistence, and subscription billing.",
            stack: "Next.js · Supabase · Stripe",
            github: "https://github.com/nicktperez/listgenie-app"
        },
        {
            title: "QuestBond",
            description: "A native SwiftUI matching experience for connecting tabletop players and groups.",
            stack: "SwiftUI · MapKit · Supabase",
            github: "https://github.com/nicktperez/RollTogether"
        }
    ],
    experience: [
    {
        "company": "County of El Dorado - Behavioral Health",
        "role": "IT Department Specialist",
        "period": "Sept 2022 – Present",
        "highlights": [
            "Administer departmental systems and applications supporting approximately 180 employees and contracted providers, resolving day-to-day technical issues and supporting ongoing operations.",
            "Manage HR-initiated account provisioning, access changes, and deactivation across department applications throughout the employee lifecycle.",
            "Configure Netsmart Avatar interfaces, backend forms, and workflows for departmental operations and government reporting requirements.",
            "Coordinate state- and vendor-driven application projects across internal teams, other counties, and partner agencies.",
            "Analyze recurring support issues and develop technical documentation, new-user training, and twice-monthly office hours.",
            "Partner with leadership to prioritize technical work and project timelines; provide backup support and quality checks for Crystal Reports changes."
        ]
    },
    {
        "company": "Plug and Play Tech Center",
        "role": "IT Specialist",
        "period": "Apr 2022 – Sept 2022",
        "highlights": [
            "Delivered Tier 1 and executive IT support and served as the primary MSP-style resource for 13 startup companies, triaging requests through Slack, email, and Autotask/Datto.",
            "Built Bash automation in Jamf for macOS provisioning and compliance, reducing repetitive IT workload by more than 40%.",
            "Administered Google Workspace, Slack, Atlassian, SaaS licensing, and onboarding and offboarding across organizations.",
            "Troubleshot Jamf enrollment, profiles, policies, and endpoint issues while maintaining access controls and security baselines.",
            "Supported SSO, MFA, user provisioning, and permissions across SaaS platforms.",
            "Coordinated hardware procurement, licensing, vendor escalations, Zoom Phone, and AV migrations for distributed and global teams."
        ]
    },
    {
        "company": "County of El Dorado",
        "role": "IT Customer Support Specialist II",
        "period": "Sept 2020 – Apr 2022",
        "highlights": [
            "Resolved more than 3,000 Tier 1 and executive support requests during the first year across ticketing, email, phone, and onsite channels.",
            "Helped lead the countywide Google Workspace to Microsoft 365 migration, coordinating vendors and stakeholders as the Jamf MDM subject matter expert.",
            "Supported the Jamf to Intune endpoint migration and administered Google Workspace, Microsoft 365, Jamf, Intune, Cisco tools, and business-critical applications.",
            "Supported more than 1,000 employees during the transition to remote work across Windows, macOS, iOS, and Android, including deployment troubleshooting for all 300 county-issued iPhones.",
            "Served as the primary IT contact for elected officials and executive leadership, with AV and network support for weekly hybrid public meetings.",
            "Provided emergency IT support day in and day out during wildfire response, working in wildfire smoke to keep systems accessible for firefighters, support personnel, and displaced residents; supported county staff printing EBT cards and clinicians accessing prescribing systems."
        ]
    },
    {
        "company": "SBM Management Services",
        "role": "Help Desk Technician II",
        "period": "Nov 2018 – Sept 2020",
        "highlights": [
            "Led disk encryption and VPN deployments across domain-joined computers, enforcing endpoint controls across desktop, mobile, and cloud environments.",
            "Resolved support requests across Windows, macOS, Linux, Active Directory, Exchange, MDM, printers, mobile devices, and workplace technology.",
            "Managed onboarding and offboarding and created technical documentation and solution guides for technical and non-technical employees.",
            "Supported office moves, workstation deployments, Windows imaging, and server installation in a colocation data center; administered VMware virtual machines and Cisco tools.",
            "Provided after-hours support for business-critical issues, Cisco VoIP and VPN clients, and conference room technology."
        ]
    },
    {
        "company": "Geek Squad",
        "role": "Supervisor",
        "period": "June 2017 – Nov 2018",
        "highlights": [
            "Led 10 technicians, overseeing daily repair operations, service KPIs, work prioritization, and escalated customer and technical issues.",
            "Reduced repair cycle times through process coaching, technical training, and consistent performance feedback."
        ]
    },
    {
        "company": "Geek Squad",
        "role": "Advanced Repair Agent",
        "period": "June 2015 – June 2017",
        "highlights": [
            "Served as the precinct’s ChromeOS subject matter expert, diagnosing and repairing complex Windows, macOS, and ChromeOS hardware and software issues.",
            "Managed concurrent repairs and service documentation within turnaround expectations; partnered with customer-facing agents to explain findings, recommend solutions, and resolve escalations."
        ]
    }
],
    education: [
        {
            school: "Cosumnes River College",
            degree: "Associate of Science in Computer Science",
            extras: "Certificates in Web Publishing & Web Programming"
        },
        {
            school: "CompTIA",
            degree: "Security+ Certification",
            status: "In progress"
        }
    ]
};

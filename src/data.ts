export const portfolioData = {
    name: "Nicholas Perez",
    title: "IT Systems & Security Engineer",
    email: "nicktperez@gmail.com",
    location: "Sacramento, CA",
    github: "https://github.com/nicktperez",
    summary: "IT systems professional with 10+ years of experience supporting people, endpoints, identity, and workplace technology. Combines high-trust support with automation and practical security operations.",
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
        description: "A local-first macOS endpoint activity monitor that turns process, network, and persistence metadata into explainable investigation priorities.",
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
            description: "A reproducible Elastic Stack lab for log collection, threshold detections, dashboard-driven triage, and documented incident investigation.",
            outcome: "Built the full path from synthetic telemetry to analyst-ready evidence.",
            stack: ["Elastic Stack", "Filebeat", "Logstash", "Docker", "Python"]
        },
        {
            title: "OrbitLab",
            category: "Systems engineering",
            github: "https://github.com/nicktperez/OrbitLab",
            image: "/orbitlab-screenshot.png",
            imageAlt: "OrbitLab desktop application simulating a three-dimensional orbital system",
            description: "A portable C++20 N-body workbench with multiple integrators and gravity solvers, collision models, diagnostics, persistence, and a native SDL 3 interface.",
            outcome: "Designed as an engineering sample with deterministic tests, profiling, concurrency, and reproducible numerical validation.",
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
            company: "County of El Dorado - Behavioral Health",
            role: "IT Department Specialist",
            period: "Sept 2022 – Present",
            highlights: [
                "Provide frontline IT support for 180+ staff and contractors resolving hardware, software, and network issues.",
                "Led onboarding trainings and built documentation that reduced repeat tickets by 30%.",
                "Supported Netsmart Avatar workflows and Crystal Reports output.",
                "Partnered with cross-functional stakeholders to streamline processes and prioritize IT projects."
            ]
        },
        {
            company: "Plug and Play Tech Center",
            role: "IT Specialist",
            period: "Apr 2022 – Sept 2022",
            highlights: [
                "Delivered Tier 1-3/Executive support in a fast-paced accelerator; sole MSP-style support for 10+ startups.",
                "Created Jamf automation scripts (bash), reducing IT workload by over 40%.",
                "Managed Slack, Google Workspace, and Atlassian; oversaw onboarding/offboarding.",
                "Enforced access controls and endpoint security baselines across Jamf-managed macOS devices."
            ]
        },
        {
            company: "County of El Dorado",
            role: "IT Customer Support Specialist II",
            period: "Sept 2020 – Apr 2022",
            highlights: [
                "Resolved 3,000+ tickets annually while providing executive and frontline support.",
                "Administered Azure AD, Intune, and M365 across multi-agency environments.",
                "Migrated 1,000+ devices to Intune; supported major Microsoft 365 transition.",
                "Supported hybrid town halls with AV and network troubleshooting."
            ]
        },
        {
            company: "SBM Management Services",
            role: "Help Desk Technician II",
            period: "Nov 2018 – Sept 2020",
            highlights: [
                "Led security team efforts on disk encryption and VPN rollout.",
                "Managed endpoints and mobile devices; resolved escalated technical issues.",
                "Created documentation and supported complex onboarding/offboarding workflows."
            ]
        },
        {
            company: "Geek Squad",
            role: "Supervisor",
            period: "June 2017 – Nov 2018",
            highlights: [
                "Oversaw repair operations; led a team of 10 technicians to meet KPIs.",
                "Reduced repair cycle times through process coaching and data-driven training."
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
            status: "Pursuing (Expected 2026)"
        }
    ]
};

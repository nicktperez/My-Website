export const portfolioData = {
    name: "Nicholas Perez",
    title: "IT Systems & Security Engineer",
    email: "nicktperez@gmail.com",
    phone: "916-307-9709",
    location: "Sacramento, CA",
    hybridStatus: "Open to hybrid work in SF / Bay Area",
    summary: "Internal IT Support Engineer with 10+ years of experience delivering onsite hardware, software, and network troubleshooting. Specializing in macOS/Windows administration, MDM automation, and Cybersecurity Operations. Currently building advanced SIEM monitoring pipelines and pursuing CompTIA Security+.",
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
    securityProject: {
        title: "SIEM Home Lab",
        status: "In Progress",
        github: "https://github.com/nicktperez/siem-home-lab",
        description: "Built a security monitoring lab leveraging Elastic Stack (Elasticsearch, Logstash, Kibana) to monitor enterprise-grade endpoints.",
        highlights: [
            "Configured Winlogbeat, Sysmon, and Windows Event Forwarding for deep telemetry.",
            "Developed Kibana dashboards for brute force, privilege escalation, and persistence detection.",
            "Simulated adversary behavior to validate detection rules and SOC workflows.",
            "Documented full lab setup and ingestion pipelines on GitHub."
        ]
    },
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

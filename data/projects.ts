export const projectsData = [
  {
    id: 1,
    title: "Network Infrastructure Planning",
    description: "Designed a comprehensive network infrastructure plan for 3 school buildings, covering topology design, IP addressing, VLAN segmentation, and device placement.",
    tech: ["Cisco Packet Tracer", "VLANs", "Subnetting", "Network Design", "IP Addressing"],
    images: [
      "/images/projects/project-101.jpg",
      "/images/projects/project-102.jpg",
      "/images/projects/project-103.jpg",
      "/images/projects/project-104.jpg",
      "/images/projects/project-105.jpg",
      "/images/projects/project-106.jpg",
    ],
    status: "completed",
    category: "Networking",
    featured: true,
  },
  {
    id: 2,
    title: "Multi-Subnet Static Routing Network",
    description: "Designed and configured a multi-subnet network using static routing in Cisco Packet Tracer. The topology consists of 2 core routers interconnected across 6 color-coded network segments, each with its own subnet, switch, and end devices. Static routes were manually configured on each router using the ip route command to enable full connectivity across all subnets.",
    tech: ["Cisco Packet Tracer", "Static Routing", "Subnetting", "IP Addressing", "Cisco IOS"],
    images: [
      "/images/projects/static-routing-1.png",
    ],
    status: "completed",
    category: "Networking",
    featured: false,
  },
  {
    id: 3,
    title: "Directly Connected Network with Standard ACL",
    description: "Configured a multi-subnet network with 4 directly connected subnets (192.168.0.0–3.0/24) and applied Standard Access Control Lists to restrict traffic. ACL rules were used to deny specific hosts and networks from accessing web servers including SYSTEM, Google, Facebook, and YouTube — simulating real-world network security policies.",
    tech: ["Cisco Packet Tracer", "Standard ACL", "Subnetting", "Cisco IOS", "Network Security"],
    images: [
      "/images/projects/project-301.png",
      "/images/projects/project-302.jfif",
    ],
    status: "completed",
    category: "Cybersecurity",
    featured: false,
  },

  {
    id: 4,
    title: "RIP Dynamic Routing with DHCP",
    description: "Configured a multi-subnet network using RIP (Routing Information Protocol) for dynamic routing between 2 core routers across 6 color-coded subnets. DHCP was set up on the routers to automatically assign IP addresses to end devices, eliminating manual IP configuration. RIP allowed routers to dynamically discover and share routing tables across all connected networks.",
    tech: ["Cisco Packet Tracer", "RIP", "DHCP", "Dynamic Routing", "Cisco IOS", "Subnetting"],
    images: [
      "/images/projects/project-401.png",
      "/images/projects/project-402.png",
    ],
    status: "completed",
    category: "Networking",
    featured: false,
  },

  {
    id: 5,
    title: "Static Routing with Standard ACL Security",
    description: "Configured a multi-router network with static routing across 6 subnets, enabling end devices including computers and laptops to access web servers such as Facebook and YouTube. Applied Standard ACL rules to enforce network security policies — denying specific hosts and entire subnets from accessing restricted network segments, simulating real-world traffic filtering and access control.",
    tech: ["Cisco Packet Tracer", "Static Routing", "Standard ACL", "Subnetting", "Cisco IOS", "Network Security"],
    images: [
      "/images/projects/project-501.png",
      "/images/projects/project-502.png",
    ],
    status: "completed",
    category: "Cybersecurity",
    featured: false,
  },

  {
    id: 6,
    title: "Wireless Router and Client Configuration",
    description: "Configured a home wireless network across 3 rooms — bedroom, living room, and office — connecting devices to a wireless router linked to a cable TV internet connection. Set up the wireless router including SSID and security settings, configured DHCP for automatic IP address assignment, and established a wireless LAN for seamless connectivity. Verified full connectivity across all wireless clients.",
    tech: ["Cisco Packet Tracer", "Wireless LAN", "DHCP", "Wireless Router", "IP Addressing", "Cisco IOS"],
    images: [
      "/images/projects/project-601.png",
      "/images/projects/project-602.png",
    ],
    status: "completed",
    category: "Networking",
    featured: false,
  },
];
import { useState, useEffect } from "react";

const Nav = ({ approachItems = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [massageSections, setMassageSections] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  // Add body scroll control
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Add fetch for massage sections
  useEffect(() => {
    const fetchMassageSections = async () => {
      try {
        const response = await fetch(
          `https://complete.testingweblink.com/api/pages?populate[message][populate]=*`,
          {
            headers: {
              Authorization: `Bearer 9156fdbf34c5c72ea74911b6a1c01136fe2f094ce2a73a05e400899f4790a3b6978c044daa4e8e947cadebfd529dc3a2cfa728fde817cae66ab7083b32961d299beb61a6df6efbd5bae9a8355d0afaa21dd05d34a256e8e6fd5e1007a2a585c7026bed8d68ae377e6fa17e3ea76078f422f3e8af79b27a0a1b39674431d24c40`,
            },
          }
        );
        const { data } = await response.json();
        const message = data[0].message.find(
          (component) => component.__component === "message-page.message-page"
        );

        // Extract nav sections from Components
        const sections = message.Components.map((comp) => {
          const jsonData = comp.Json.data || comp.Json;
          return {
            navId: (jsonData.NavTitle || jsonData.Navtitle || "")
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-"),
            navTitle: jsonData.NavTitle || jsonData.Navtitle || "",
          };
        }).filter((section) => section.navId && section.navTitle); // Filter out any empty entries

        setMassageSections(sections);
      } catch (error) {
        console.error("Error fetching massage sections:", error);
      }
    };

    fetchMassageSections();
  }, []);

  // Add fetch for team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          `https://complete.testingweblink.com/api/pages?populate[team][populate]=*`,
          {
            headers: {
              Authorization: `Bearer 9156fdbf34c5c72ea74911b6a1c01136fe2f094ce2a73a05e400899f4790a3b6978c044daa4e8e947cadebfd529dc3a2cfa728fde817cae66ab7083b32961d299beb61a6df6efbd5bae9a8355d0afaa21dd05d34a256e8e6fd5e1007a2a585c7026bed8d68ae377e6fa17e3ea76078f422f3e8af79b27a0a1b39674431d24c40`,
            },
          }
        );
        const { data } = await response.json();
        const teamData = data[0].team[0];

        const members = [
          {
            slug: teamData.member1Title
              .toLowerCase()
              .replace(/^dr\s+/i, "")
              .replace(/\s+/g, "-"),
            name: teamData.member1Title,
          },
          {
            slug: teamData.member2Title
              .toLowerCase()
              .replace(/^dr\s+/i, "")
              .replace(/\s+/g, "-"),
            name: teamData.member2Title,
          },
          {
            slug: teamData.member3Title
              .toLowerCase()
              .replace(/^dr\s+/i, "")
              .replace(/\s+/g, "-"),
            name: teamData.member3Title,
          },
        ];

        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  // Replace the massage menu items with dynamic sections
  const renderMassageMenuItems = () =>
    massageSections.map((section) => (
      <a
        key={section.navId}
        href={`/massage#${section.navId}`}
        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 border-b border-gray-100"
      >
        {section.navTitle}
      </a>
    ));

  // Add booking handler function
  const handleBooking = () => {
    window.open(
      "https://clinic27intake.bookings.pracsuite.com/guest?l=1949&_gl=1*16y1as*_ga*MTUzNzgzNjczOS4xNzM0Njk4NTMw*_ga_J0YJHQLKE6*MTczNzQ2MTExNy4xOC4wLjE3Mzc0NjEyMTcuNjAuMC4w",
      "_blank"
    );
  };

  return (
    <nav className="bg-white relative">
      {/* Top bar - Hide on mobile */}
      <div className="hidden lg:block px-5 rounded-b-lg w-full">
        <div className="bg-[#F7F7F7] text-[#434343] py-2 max-xl:py-1 rounded-b-2xl flex w-full justify-between">
          <a
            href="tel:0299720040"
            className="text-nowrap flex justify-center items-center pl-4"
          >
            <img
              src="/primaryphone.svg"
              alt="Logo"
              className="h-7 mt-1 mr-3 w-auto"
            />
            Call us at Dee Why: (02) 9972 0040
          </a>
          <a
            href="https://www.google.com/maps/place/Complete+Chiropractic+Dee+Why/@-33.752425,151.284896,15z/data=!4m6!3m5!1s0x6b12aa88efcbbf11:0x57dfecc11b276051!8m2!3d-33.752425!4d151.284896!16s%2Fg%2F1thsg1zl?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nowrap flex justify-center items-center pr-4"
          >
            <img src="/location.svg" alt="Logo" className="h-6.5 mr-3 w-auto" />
            Find us at Dee Why
          </a>
        </div>
      </div>

      <div className="max-w-[1860px] mx-auto px-4 xl:px-8">
        <div className="flex justify-between items-center h-32 max-xl:h-20 max-lg:h-32 ">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <a href="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="xl:h-20 lg:h-12 h-20 w-auto  "
              />
            </a>
          </div>

          {/* Desktop Menu */}
          {/* <div className="hidden lg:flex items-center flex-wrap justify-center lg:w-[800px]  xl:w-auto gap-y-2 gap-x-1 xl:space-x-1"> */}
          <div className="hidden lg:flex items-center text-nowrap justify-center  max-xl:gap-6   xl:w-auto xl:space-x-3 max-xl:px-4">
            {/* About Us */}
            <div className="relative group">
              <a
                href="/about-us"
                className="flex items-center gap-1 px-1 lg:px-0  xl:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
              >
                About Us
                <img
                  src="/Plus.svg"
                  alt="Logo"
                  loading="lazy"
                  className="h-4 lg:h-5 xl:h-6 mt-0.5 w-auto"
                />
              </a>
              <div className="absolute left-0 mt-2 w-[300px] shadow-lg opacity-0 font-medium text-[18px] invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out delay-150 group-hover:delay-[0ms] z-50 bg-white">
                <a
                  href="/difference"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                >
                  The Difference
                </a>
                <a
                  href="visible-results"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Visible Results
                </a>
              </div>
            </div>
            {/* Our Approach */}
            <div className="relative group">
              <a
                href="/our-approach"
                className="flex items-center gap-1 px-1 lg:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
              >
                Our Approach
                <img
                  src="/Plus.svg"
                  alt="Logo"
                  className="h-4 lg:h-5 xl:h-6 mt-0.5 w-auto"
                />
              </a>
              <div className="absolute left-0 mt-2 w-[400px] shadow-lg opacity-0 font-medium text-[18px] invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out delay-150 group-hover:delay-[0ms] z-50 bg-white">
                {approachItems.map((item) => (
                  <a
                    key={item.slug}
                    href={`/our-approach/${item.slug}`}
                    className="block px-4 py-3 capitalize text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            {/* Our Team - Modified to include dropdown */}
            <div className="relative group">
              <a
                href="/meet-our-team"
                className="flex items-center gap-1 px-1 lg:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
              >
                Our Team
                <img
                  src="/Plus.svg"
                  alt="Logo"
                  className="h-4 lg:h-5 xl:h-6 mt-0.5 w-auto"
                />
              </a>
              <div className="absolute left-0 mt-2 w-[300px] shadow-lg opacity-0 font-medium text-[18px] invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out delay-150 group-hover:delay-[0ms] z-50 bg-white">
                {teamMembers.map((member) => (
                  <a
                    key={member.slug}
                    href={`/meet-our-team/${member.slug}`}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                  >
                    {member.name}
                  </a>
                ))}
              </div>
            </div>
            {/* Massage */}
            <div className="relative group">
              <a
                href="/massage"
                className="flex items-center gap-1 px-1 lg:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
              >
                Massage
                <img
                  src="/Plus.svg"
                  alt="Logo"
                  className="h-4 lg:h-5 xl:h-6 mt-0.5 w-auto"
                />
              </a>
              <div className="absolute left-0 mt-2 w-[300px] shadow-lg opacity-0 font-medium text-[18px] invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out delay-150 group-hover:delay-[0ms] z-50 bg-white">
                {renderMassageMenuItems()}
              </div>
            </div>
            <a
              href="/media"
              className="px-1 lg:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
            >
              Media
            </a>
            <a
              href="/blog"
              className="px-1 lg:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
            >
              Blog
            </a>
            <a
              href="/events"
              className="px-1 lg:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
            >
              Events
            </a>
            <a
              href="/contact-us"
              className="px-1 lg:px-1.5 py-1 text-gray-700 hover:text-gray-900 text-[15px] lg:text-[15px] xl:text-[22px]"
            >
              Contact
            </a>
          </div>

          {/* Book button - Updated onClick handler */}
          <div className="hidden lg:block">
            <button
              className="bg-darkpurple text-white  text-nowrap px-3 lg:px-4 py-2 flex justify-center items-center w-[140px] lg:w-[160px] xl:w-[190px] h-[40px] lg:h-[45px] xl:h-[55px] font-bold text-xs lg:text-sm xl:text-base rounded-2xl rounded-bl-none"
              onClick={handleBooking}
            >
              <img
                src="/calendar.svg"
                alt="Logo"
                className="h-3 lg:h-3.5 xl:h-4 mt-0.5 mr-2 w-auto"
              />
              Book for dee why
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="lg:hidden flex items-center gap-4 mt-4">
            <a href="tel:0299720040">
              <img src="/primaryphone.svg" alt="Phone" className="h-9 w-auto" />
            </a>
            <a
              href="https://www.google.com/maps/place/Complete+Chiropractic+Dee+Why/@-33.752425,151.284896,15z/data=!4m6!3m5!1s0x6b12aa88efcbbf11:0x57dfecc11b276051!8m2!3d-33.752425!4d151.284896!16s%2Fg%2F1thsg1zl?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/location.svg" alt="Location" className="h-7 w-auto" />
            </a>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-darkpurple hover:text-darkpurple/80 hover:bg-gray-100"
            >
              <svg
                className="w-9 h-9"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden pointer-events-auto"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu - Updated width and styling */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button - Updated color */}
        <div className="flex justify-end p-4  sticky top-0 bg-white z-10">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-darkpurple hover:text-darkpurple/80 hover:bg-gray-100"
          >
            <svg
              className="w-9 h-9"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="flex flex-col p-4">
          {/* Home Link */}
          <a
            href="/"
            className="text-gray-900 hover:text-gray-700 text-lg py-3 border-b border-gray-200"
          >
            Home
          </a>

          {/* About Us */}
          <div className="flex justify-between items-center text-lg py-3 border-b border-gray-200">
            <a href="/about-us" className="text-gray-900 hover:text-gray-700">
              About Us
            </a>
            <button
              onClick={() => toggleSubMenu("about")}
              className="flex-shrink-0"
            >
              <svg
                className={`w-5 h-5 text-primary transform transition-transform duration-200 ${
                  openSubMenu === "about" ? "rotate-45" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>

          {/* About Us Submenu */}
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              openSubMenu === "about" ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col py-1 pl-4">
              <a
                href="/difference"
                className="text-gray-700 hover:text-primary py-2 border-b border-gray-100 text-base"
              >
                The Difference
              </a>
              <a
                href="/visible-results"
                className="text-gray-700 hover:text-primary py-2 border-b border-gray-100 text-base"
              >
                Visible Results
              </a>
            </div>
          </div>

          {/* Our Approach */}
          <div className="flex justify-between items-center text-lg py-3 border-b border-gray-200">
            <a
              href="/our-approach"
              className="text-gray-900 hover:text-gray-700"
            >
              Our Approach
            </a>
            <button
              onClick={() => toggleSubMenu("approach")}
              className="flex-shrink-0"
            >
              <svg
                className={`w-5 h-5 text-primary transform transition-transform duration-200 ${
                  openSubMenu === "approach" ? "rotate-45" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              openSubMenu === "approach" ? "max-h-[1500px]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col py-1 pl-4">
              {approachItems.map((item) => (
                <a
                  key={item.slug}
                  href={`/our-approach/${item.slug}`}
                  className="text-gray-700 hover:text-primary py-2 border-b border-gray-200 text-base"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Our Team */}
          <div className="flex justify-between items-center text-lg py-3 border-b border-gray-200">
            <a
              href="/meet-our-team"
              className="text-gray-900 hover:text-gray-700"
            >
              Our Team
            </a>
            <button
              onClick={() => toggleSubMenu("team")}
              className="flex-shrink-0"
            >
              <svg
                className={`w-5 h-5 text-primary transform transition-transform duration-200 ${
                  openSubMenu === "team" ? "rotate-45" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              openSubMenu === "team" ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col py-1 pl-4">
              {teamMembers.map((member) => (
                <a
                  key={member.slug}
                  href={`/meet-our-team/${member.slug}`}
                  className="text-gray-700 hover:text-primary py-2 border-b border-gray-100 text-base"
                >
                  {member.name}
                </a>
              ))}
            </div>
          </div>

          {/* Massage */}
          <div className="flex justify-between items-center text-lg py-3 border-b border-gray-200">
            <a href="/massage" className="text-gray-900 hover:text-gray-700">
              Massage
            </a>
            <button
              onClick={() => toggleSubMenu("massage")}
              className="flex-shrink-0"
            >
              <svg
                className={`w-5 h-5 text-primary transform transition-transform duration-200 ${
                  openSubMenu === "massage" ? "rotate-45" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              openSubMenu === "massage" ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col py-1 pl-4">
              {renderMassageMenuItems()}
            </div>
          </div>

          {/* Other menu items */}
          <a
            href="/media"
            className="text-gray-900 hover:text-gray-700 text-lg py-3 border-b border-gray-200"
          >
            Media
          </a>
          <a
            href="/blog"
            className="text-gray-900 hover:text-gray-700 text-lg py-3 border-b border-gray-200"
          >
            Blog
          </a>
          <a
            href="/events"
            className="text-gray-900 hover:text-gray-700 text-lg py-3 border-b border-gray-200"
          >
            Events
          </a>
          <a
            href="/contact-us"
            className="text-gray-900 hover:text-gray-700 text-lg py-3 border-b border-gray-200"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

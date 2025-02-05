import { useState, useEffect, useCallback } from "react";

const token = "9156fdbf34c5c72ea74911b6a1c01136fe2f094ce2a73a05e400899f4790a3b6978c044daa4e8e947cadebfd529dc3a2cfa728fde817cae66ab7083b32961d299beb61a6df6efbd5bae9a8355d0afaa21dd05d34a256e8e6fd5e1007a2a585c7026bed8d68ae377e6fa17e3ea76078f422f3e8af79b27a0a1b39674431d24c40";
const baseUrl = "https://complete.testingweblink.com";

interface Post {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Content: any[];
  createdAt: string;
  date: string;
}

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [archiveDates, setArchiveDates] = useState<
    { display: string; urlFormat: string }[]
  >([]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Move search logic to useCallback
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(
        `${baseUrl}/api/posts?filters[Title][$containsi]=${encodedQuery}&pagination[limit]=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        setSearchResults(
          data.data.map((item: any) => ({
            id: item.id,
            documentId: item.documentId,
            Title: item.Title,
            Slug: item.Slug,
            Content: item.Content,
            createdAt: item.createdAt,
            date: item.date,
          }))
        );
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching posts:", error);
      setSearchResults([]);
    }
  }, []);

  // Trigger search when debounced query changes
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  // Fetch archive dates
  useEffect(() => {
    const fetchArchiveDates = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/posts?sort=createdAt:DESC`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        const dates = data.data.map((post: Post) => {
          const date = new Date(post.createdAt);
          return {
            display: `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`,
            urlFormat: `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}`,
          };
        });

        // Get unique dates
        const uniqueDates = Array.from(new Set(dates.map(JSON.stringify))).map(
          (str) => JSON.parse(str as string)
        );
        setArchiveDates(uniqueDates);
      } catch (error) {
        console.error("Error fetching archive dates:", error);
      }
    };

    fetchArchiveDates();
  }, []);

  const handleSearch = () => {
    performSearch(searchQuery);
  };

  return (
    <div className="w-full md:w-1/4">
      <div className="flex gap-2 mb-6 md:mb-8 border-l-2 py-6 md:py-9 pl-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 p-2 text-sm md:text-base"
        />
        <button
          onClick={handleSearch}
          className="text-white bg-primary py-1 px-4 md:px-6 text-sm md:text-base whitespace-nowrap"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="mb-8 border-l-2 pl-4">
        {searchResults.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Search Results
            </h2>
            <ul className="space-y-4">
              {searchResults.slice(0, 3).map((post) => (
                <li key={post.id}>
                  <a
                    href={`/blog/${post.Slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.Title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          searchQuery && <p className="text-gray-500">No results found.</p>
        )}
      </div>

      <div className="sticky top-4 border-l-2 pl-4">
        <h2 className="text-3xl font-bold mb-4 text-primary">Archives</h2>
        <ul className="space-y-2 text-[#323232]">
          {archiveDates.map((date, index) => (
            <li key={index}>
              <a
                href={`/archive/${date.urlFormat}`}
                className="hover:text-blue-600 block"
                rel="prefetch"
              >
                {date.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

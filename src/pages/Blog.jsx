import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { commonAPI } from "../lib/api";

const CATEGORIES = ["Latest", "e-commerce", "Guides", "Tools", "Tech"];

const FALLBACK_BLOGS = [
    {
        _id: "1",
        slug: "test",
        title: "Test",
        excerpt: "test",
        thumbnail: "/images/blog-placeholder.png",
        categories: ["Latest"],
    },
    {
        _id: "2",
        slug: "market-research-for-ecommerce",
        title: "Market Research for eCommerce Business: Turn Data into Revenue",
        excerpt: "Do you know that more than 28 million people are operating an eCommerce store globally?",
        thumbnail: "/images/blog-placeholder-2.png",
        categories: ["latest", "e-commerce"],
    },
];

const BlogCard = ({ blog }) => (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col">
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
            <img
                src={blog.thumbnail || "/images/blog-placeholder.png"}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://placehold.co/400x300/f1f5f9/94a3b8?text=Blog"; }}
            />
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="flex flex-wrap gap-2">
                {blog.categories?.map((cat) => (
                    <span key={cat} className="text-xs border border-slate-200 rounded-full px-3 py-1 text-slate-600">
                        {cat}
                    </span>
                ))}
            </div>
            <h3 className="font-semibold text-slate-900 text-sm leading-snug">{blog.title}</h3>
            {blog.excerpt && (
                <p className="text-xs text-slate-500 line-clamp-2">{blog.excerpt}</p>
            )}
            <Link
                to={`/blogs/${blog.slug}`}
                className="text-blue-500 text-xs font-medium mt-auto hover:underline inline-flex items-center gap-1"
            >
                Read More →
            </Link>
        </div>
    </div>
);

const Blog = () => {
    const [blogs, setBlogs] = useState(FALLBACK_BLOGS);
    const [activeCategory, setActiveCategory] = useState("Latest");
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await commonAPI.getBlogs();
                if (res.success && res.blogs?.length) {
                    setBlogs(res.blogs);
                }
            } catch {
                // use fallback
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filtered = blogs.filter((b) => {
        const matchCategory =
            activeCategory === "Latest" ||
            b.categories?.some((c) => c.toLowerCase() === activeCategory.toLowerCase());
        const matchSearch =
            !search ||
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.excerpt?.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    const visible = filtered.slice(0, visibleCount);

    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-[url('/images/Bg2.png')] bg-no-repeat bg-cover bg-center">
                <Header />

                {/* Left decorative 3D object */}
                <img
                    src="/images/3d-knot.png"
                    alt=""
                    className="absolute left-0 bottom-10 w-36 md:w-48 select-none pointer-events-none"
                    onError={(e) => { e.target.style.display = "none"; }}
                />
                {/* Right decorative 3D object */}
                <img
                    src="/images/3d-capsule.png"
                    alt=""
                    className="absolute right-6 top-20 w-24 md:w-36 select-none pointer-events-none"
                    onError={(e) => { e.target.style.display = "none"; }}
                />

                <div className="relative z-10 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-medium text-slate-900">Blogs</h1>
                    <p className="mt-4 text-slate-500 text-sm md:text-base max-w-md">
                        From idea to launch, we design and develop tailor-made websites & apps
                        that scale with your business.
                    </p>
                </div>
            </section>

            {/* Scrolling Ticker */}
            <div className="w-full bg-slate-900 py-4 md:py-5 overflow-hidden relative z-20">
                <div className="animate-ticker flex items-center whitespace-nowrap">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            <span className="text-white text-xl md:text-2xl font-medium tracking-wider uppercase font-clash-display mx-6 md:mx-10">
                                RAPID DEVELOPMENT • CONTINUOUS SUPPORT
                            </span>
                            <span className="text-slate-500 text-xl md:text-2xl">
                                •
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Listing */}
            <section className="max-w-5xl mx-auto px-4 py-16">
                {/* Search */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-full max-w-md">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search Blog"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setVisibleCount(6); }}
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm"
                        />
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center flex-wrap gap-2 mb-10">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === cat
                                    ? "bg-black text-white"
                                    : "bg-white border border-slate-200 text-slate-700 hover:border-slate-400"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-72" />
                        ))}
                    </div>
                ) : visible.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visible.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-400 py-20">No blogs found.</p>
                )}

                {/* View All */}
                {filtered.length > visibleCount && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setVisibleCount((v) => v + 6)}
                            className="bg-black text-white px-10 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
                        >
                            View All
                        </button>
                    </div>
                )}
                {filtered.length <= visibleCount && filtered.length > 0 && visible.length >= 6 && (
                    <div className="flex justify-center mt-12">
                        <button
                            disabled
                            className="bg-black text-white px-10 py-3 rounded-full font-medium opacity-50 cursor-not-allowed"
                        >
                            View All
                        </button>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Blog;

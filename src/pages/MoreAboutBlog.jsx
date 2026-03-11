import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { commonAPI } from "../lib/api";

const FALLBACK_BLOG = {
    slug: "market-research-for-ecommerce",
    title: "Market Research for eCommerce Business: Turn Data into Revenue",
    categories: ["latest", "e-commerce"],
    thumbnail: "/images/blog-placeholder-2.png",
    content: `
<p>Do you know that more than 28 million people are operating an eCommerce store globally?</p>
<p>But are they all successful in this business?</p>
<p>90% of all eCommerce businesses fail within the first 120 days. But why?</p>
<p>The answer is – market research for eCommerce.</p>
<p>Many entrepreneurs get caught up in designing websites, sourcing products, and running ads without truly understanding who their customers are, what they want, or how the market behaves.</p>
<p>Without proper research, every decision becomes a guess, and in business, guessing can be expensive.</p>
<p>In this guide, we'll walk you through everything you need to know about market research for eCommerce, from types and methods to practical steps, tools, and real-life examples.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>Market research helps identify what customers want, how they shop, and why they buy.</li>
  <li>It gives insights into industry trends, competitors, and product demand.</li>
  <li>Both primary and secondary research data are essential.</li>
  <li>A clear process from defining your niche to applying insights ensures accurate decisions.</li>
  <li>Technology analysis helps decide whether to use ready-made solutions or build custom platforms.</li>
  <li>Avoiding common mistakes saves time, money, and effort.</li>
</ul>

<h2>What is eCommerce Market Research?</h2>
<p>eCommerce market research means collecting and studying information about your online market, customers, trends, and competitors.</p>
<p>It helps you understand what people want, how they shop online, and what affects their buying decisions. This information helps you make smart choices for your business, like what products to sell, how to price them, how to promote them, and how to improve your website.</p>
<p>For example, you want to sell eco-friendly water bottles online. Now what do you have to do?</p>
<p>you'd first check what styles, sizes, and prices people like, so you're actually giving them something they want.</p>
<p>Purpose of Online Market Research: The main goal is to identify opportunities, understand customer needs, and evaluate the competition to create a strong, successful eCommerce strategy.</p>
`,
};

const FALLBACK_PRODUCTS = [
    {
        slug: "on-demand-services",
        title: "On-Demand Services System",
        description: "App + Web + Panel\nBuild UrbanClap Like Services Platform",
        thumbnail: "/images/blog-placeholder.png",
    },
    {
        slug: "pharmacy-business",
        title: "Pharmacy Business Solution",
        description: "App + Panel + Website\nBuild Pharmeasy Like Multivendor pharmacy business with our Solution",
        thumbnail: "/images/blog-placeholder.png",
    },
];

// Parse h2/h3 headings from HTML string and inject ids
const prepareContent = (html) => {
    return html.replace(/<(h[23])>(.*?)<\/\1>/g, (_match, tag, text) => {
        const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        return `<${tag} id="${id}">${text}</${tag}>`;
    });
};

const parseHeadings = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return Array.from(div.querySelectorAll("h2, h3")).map((h) => ({
        id: h.textContent.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        text: h.textContent,
        level: parseInt(h.tagName[1]),
    }));
};

// Share icon components
const FacebookIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const EmailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const ShareButtons = ({ title, url }) => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

    return (
        <div className="flex gap-2">
            <a href={fbUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FacebookIcon />
            </a>
            <a href={liUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                <LinkedInIcon />
            </a>
            <a href={mailUrl}
                className="w-9 h-9 rounded-full bg-slate-500 text-white flex items-center justify-center hover:bg-slate-600 transition-colors">
                <EmailIcon />
            </a>
        </div>
    );
};

const MoreAboutBlog = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [blogRes, productsRes] = await Promise.allSettled([
                    commonAPI.getBlogBySlug(slug),
                    commonAPI.getProducts(),
                ]);

                if (blogRes.status === "fulfilled" && blogRes.value?.blog) {
                    setBlog(blogRes.value.blog);
                } else if (slug === FALLBACK_BLOG.slug) {
                    setBlog(FALLBACK_BLOG);
                } else {
                    setBlog(FALLBACK_BLOG);
                }

                if (productsRes.status === "fulfilled" && productsRes.value?.products?.length) {
                    setProducts(productsRes.value.products.slice(0, 2));
                } else {
                    setProducts(FALLBACK_PRODUCTS);
                }
            } catch {
                setBlog(FALLBACK_BLOG);
                setProducts(FALLBACK_PRODUCTS);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const pageUrl = typeof window !== "undefined" ? window.location.href : "";

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
                    <div className="h-6 bg-slate-100 rounded-full w-40 mb-6 animate-pulse" />
                    <div className="h-10 bg-slate-100 rounded w-3/4 mb-4 animate-pulse" />
                    <div className="h-10 bg-slate-100 rounded w-1/2 mb-10 animate-pulse" />
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-2 hidden lg:block">
                            {[1, 2, 3].map((i) => <div key={i} className="h-4 bg-slate-100 rounded mb-3 animate-pulse" />)}
                        </div>
                        <div className="col-span-12 lg:col-span-7 space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" />)}
                        </div>
                        <div className="col-span-3 hidden lg:block space-y-4">
                            <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
                            <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-2">Blog not found</h2>
                    <p className="text-slate-500 mb-6">The article you're looking for doesn't exist.</p>
                    <Link to="/blogs" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors">
                        Back to Blogs
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const preparedContent = blog?.content ? prepareContent(blog.content) : "";
    const headings = preparedContent ? parseHeadings(preparedContent) : [];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-6xl mx-auto px-4 pt-40 pb-16">
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                    {blog?.categories?.map((cat) => (
                        <span key={cat} className="text-xs font-semibold bg-blue-100 border-slate-300 rounded-full px-3 py-1 text-blue-500">
                            {cat}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <div className="flex justify-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-10 max-w-2xl">
                        {blog?.title}
                    </h1>
                </div>

                {/* 3-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left: Table of Contents */}
                    {headings.length > 0 && (
                        <aside className="hidden lg:block lg:col-span-2">
                            <div className="sticky top-28 border border-slate-200 rounded-xl p-4">
                                <h4 className="text-xs font-semibold text-slate-900 mb-3">Table of Contents</h4>
                                <ul className="space-y-2">
                                    {headings.map((h) => (
                                        <li key={h.id}>
                                            <a
                                                href={`#${h.id}`}
                                                className={`text-xs text-blue-500 hover:underline block leading-snug ${h.level === 3 ? "pl-3" : ""}`}
                                            >
                                                {h.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    )}

                    {/* Center: Blog Content */}
                    <article
                        className={`lg:col-span-7 ${headings.length === 0 ? "lg:col-start-1" : ""}`}
                    >
                        <div
                            className="prose-blog text-slate-700 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: preparedContent }}
                        />

                        {/* Bottom share */}
                        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">Share this article</p>
                            <div className="flex justify-center">
                                <ShareButtons title={blog?.title || ""} url={pageUrl} />
                            </div>
                        </div>
                    </article>

                    {/* Right: Share + Product Cards */}
                    <aside className="hidden lg:flex lg:col-span-3 flex-col gap-5">
                        <div className="sticky top-28 flex flex-col gap-5">
                            {/* Share widget */}
                            <div className="text-center">
                                <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase mb-3">Share this article</p>
                                <div className="flex justify-center">
                                    <ShareButtons title={blog?.title || ""} url={pageUrl} />
                                </div>
                            </div>

                            {/* Product cards */}
                            {products.map((product) => (
                                <div key={product.slug} className="border border-slate-200 rounded-xl overflow-hidden">
                                    {/* Card header tag */}
                                    <div className="bg-white px-3 pt-3 pb-1">
                                        <span className="text-xs font-semibold text-slate-900 border border-slate-300 rounded px-2 py-0.5">
                                            {product.category || "Solution"}
                                        </span>
                                    </div>
                                    {/* Thumbnail */}
                                    <div className="bg-slate-50 mx-3 rounded-lg overflow-hidden aspect-[4/3]">
                                        <img
                                            src={product.thumbnail || product.image || "/images/blog-placeholder.png"}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = "https://placehold.co/300x225/f1f5f9/94a3b8?text=Product"; }}
                                        />
                                    </div>
                                    {/* Card body */}
                                    <div className="px-3 py-3 text-center">
                                        <p className="text-xs font-semibold text-slate-900 mb-1">{product.title}</p>
                                        <Link
                                            to={`/products/${product.slug}`}
                                            className="mt-2 inline-block w-full text-center bg-black text-white text-xs font-medium py-2 rounded-lg hover:bg-slate-800 transition-colors"
                                        >
                                            Check Out
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MoreAboutBlog;

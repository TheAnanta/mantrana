import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AISummaryToggle from "@/components/AISummaryToggle";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/firebase-utils";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <main>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog" className="btn-pill btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Fetch all posts to find related ones
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.status === 'published')
    .filter(p => p.category === post.category || true) // Prioritize same category, but allow others
    .sort((a, b) => {
        // Boost posts in the same category
        if (a.category === post.category && b.category !== post.category) return -1;
        if (a.category !== post.category && b.category === post.category) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 2);

  // Ensure tags is always an array to avoid TypeErrors
  const tags = post.tags || [];
  
  // Handle author object/string to fit current design
  const authorData = typeof post.author === 'string' 
    ? {
        name: post.author,
        role: "Licensed Therapist & Coach",
        bio: "Mohana Rupa is a licensed therapist and certified life coach with over 8 years of experience helping individuals overcome anxiety, depression, and life challenges."
      }
    : {
        name: (post.author as any).name || 'Mohana Rupa',
        role: (post.author as any).role || "Licensed Therapist & Coach",
        bio: (post.author as any).bio || "Mohana Rupa is a licensed therapist and certified life coach..."
      };

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-emerald transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-emerald transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-charcoal truncate">{post.title}</span>
            </nav>

            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-emerald bg-emerald/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-8 leading-tight font-awesome-serif">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-emerald font-semibold">MR</span>
              </div>
              <div>
                <p className="font-medium text-charcoal">{authorData.name}</p>
                <p className="text-sm text-gray-500">{authorData.role}</p>
              </div>
            </div>

            {/* AI Summary Toggle */}
            {post.aiSummary && <AISummaryToggle aiSummary={post.aiSummary} />}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={post.image || '/images/default-blog.png'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold 
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:leading-snug
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                prose-li:text-gray-700 prose-li:leading-relaxed prose-li:mb-2
                prose-ul:my-6 prose-ul:space-y-2
                prose-strong:text-gray-900 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-emerald hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-lavender/10 rounded-2xl">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald font-semibold text-lg">MR</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    {authorData.name}
                  </h3>
                  <p className="text-emerald font-medium mb-3">
                    {authorData.role}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {authorData.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link
              href="/blog"
              className="flex items-center gap-3 text-emerald hover:text-emerald/80 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">Back to Blog</span>
            </Link>

            <div className="flex gap-4">
              <button className="p-3 bg-white rounded-full shadow-soft hover:shadow-medium transition-all">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                      <div className="bg-teal/20 h-48 relative overflow-hidden">
                        {relatedPost.image ? (
                            <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-emerald/10" />
                        )}
                        <div className="absolute bottom-4 left-4">
                          <span className="text-xs font-medium text-emerald bg-white/90 px-3 py-1 rounded-full">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-charcoal mb-3 leading-tight hover:text-emerald transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {relatedPost.readTime}
                          </span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

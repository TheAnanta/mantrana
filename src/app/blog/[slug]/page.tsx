import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AISummaryToggle from "@/components/AISummaryToggle";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
  tags: string[];
  aiSummary: string;
  image: string;
}

// Sample blog post data - in a real app this would come from a CMS or API
const getBlogPost = (slug: string): BlogPost | null => {
  const posts: Record<string, BlogPost> = {
    "understanding-anxiety-managing-daily-stress": {
      slug: "understanding-anxiety-managing-daily-stress",
      title: "Understanding Anxiety: A Guide to Managing Daily Stress",
      excerpt:
        "Learn practical techniques to manage anxiety and create a more peaceful daily routine with evidence-based strategies.",
      content: `
        <p>Anxiety affects millions of people worldwide, yet many struggle to find effective ways to manage their daily stress. In this comprehensive guide, we'll explore practical, evidence-based techniques that can help you develop a more peaceful relationship with anxiety.</p>

        <h2>What is Anxiety?</h2>
        <p>Anxiety is a natural response to stress, but when it becomes overwhelming or persistent, it can significantly impact our daily lives. Understanding the physiological and psychological aspects of anxiety is the first step toward managing it effectively.</p>

        <h2>Recognizing the Signs</h2>
        <p>Common symptoms of anxiety include:</p>
        <ul>
          <li>Racing thoughts or excessive worry</li>
          <li>Physical tension in the body</li>
          <li>Difficulty concentrating</li>
          <li>Sleep disturbances</li>
          <li>Irritability or restlessness</li>
        </ul>

        <h2>Practical Techniques for Managing Anxiety</h2>
        
        <h3>1. Breathing Exercises</h3>
        <p>Deep, controlled breathing can activate your body's relaxation response. Try the 4-7-8 technique: inhale for 4 counts, hold for 7, and exhale for 8.</p>

        <h3>2. Mindfulness and Grounding</h3>
        <p>Practice the 5-4-3-2-1 grounding technique: identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.</p>

        <h3>3. Progressive Muscle Relaxation</h3>
        <p>Systematically tense and release different muscle groups to become more aware of physical tension and learn to release it.</p>

        <h3>4. Cognitive Restructuring</h3>
        <p>Challenge anxious thoughts by asking: Is this thought realistic? What evidence supports or contradicts it? What would I tell a friend in this situation?</p>

        <h2>Creating a Daily Routine</h2>
        <p>Consistency can be incredibly helpful for managing anxiety. Consider incorporating these elements into your daily routine:</p>
        <ul>
          <li>Regular sleep schedule</li>
          <li>Physical exercise</li>
          <li>Mindfulness or meditation practice</li>
          <li>Healthy nutrition</li>
          <li>Limited caffeine and alcohol</li>
        </ul>

        <h2>When to Seek Professional Help</h2>
        <p>If anxiety is significantly impacting your daily life, relationships, or work, it may be time to seek professional support. A licensed therapist can help you develop personalized strategies and, if needed, explore additional treatment options.</p>

        <p>Remember, managing anxiety is a journey, not a destination. Be patient with yourself as you develop these new skills and habits.</p>
      `,
      category: "Mental Health",
      readTime: "5 min read",
      publishedAt: "Nov 15, 2024",
      author: {
        name: "Mohana Rupa",
        role: "Licensed Therapist & Coach",
        bio: "Mohana Rupa is a licensed therapist and certified life coach with over 8 years of experience helping individuals overcome anxiety, depression, and life challenges.",
      },
      tags: [
        "anxiety",
        "stress management",
        "mental health",
        "mindfulness",
        "coping strategies",
      ],
      aiSummary:
        "This article provides a comprehensive guide to understanding and managing anxiety through evidence-based techniques including breathing exercises, mindfulness, and cognitive restructuring. It emphasizes the importance of daily routines and professional support when needed.",
      image: "/images/anxiety-stress-management.png",
    },
  };

  return posts[slug] || null;
};

const relatedPosts = [
  {
    slug: "power-of-mindfulness-in-relationships",
    title: "The Power of Mindfulness in Relationships",
    category: "Relationships",
    readTime: "7 min read",
  },
  {
    slug: "building-resilience-tools-for-challenges",
    title: "Building Resilience: Tools for Life's Challenges",
    category: "Personal Growth",
    readTime: "6 min read",
  },
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

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

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-moss transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-moss transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>

            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-moss bg-moss/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.publishedAt}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-moss/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-moss font-semibold">MR</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.role}</p>
              </div>
            </div>

            {/* AI Summary Toggle */}
            <AISummaryToggle aiSummary={post.aiSummary} />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={post.image}
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
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-moss hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-lavender/10 rounded-2xl">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-moss font-semibold text-lg">MR</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.author.name}
                  </h3>
                  <p className="text-moss font-medium mb-3">
                    {post.author.role}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {post.author.bio}
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
              className="flex items-center gap-3 text-moss hover:text-moss/80 transition-colors"
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
                    <div className="bg-azure/30 h-48 relative">
                      <div className="absolute bottom-4 left-4">
                        <span className="text-xs font-medium text-moss bg-white/90 px-3 py-1 rounded-full">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-moss transition-colors">
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

      <Footer />
    </main>
  );
}

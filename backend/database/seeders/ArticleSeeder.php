<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Your website needs a receptionist',
                'slug' => 'your-website-needs-a-receptionist',
                'content' => '<h2>The Digital Receptionist Revolution</h2><p>In today\'s digital-first world, your website is often the first point of contact between your business and potential customers. Just like a physical office needs a receptionist to greet visitors, your website needs an AI-powered assistant to engage visitors 24/7.</p><h3>Why AI Chatbots Matter</h3><ul><li>Instant responses to customer queries</li><li>24/7 availability</li><li>Consistent customer experience</li><li>Cost-effective solution</li></ul><p>BeyondChats provides intelligent chatbot solutions that act as your virtual receptionist, ensuring no visitor leaves without getting the help they need.</p>',
                'original_content' => 'Your website needs a receptionist to greet visitors and help them find what they need. Learn how AI chatbots can transform your customer engagement.',
                'source_url' => 'https://beyondchats.com/blogs/your-website-needs-a-receptionist/',
                'is_updated' => true,
                'references' => json_encode(['https://www.nextiva.com/blog/best-virtual-receptionist-services.html']),
            ],
            [
                'title' => 'What If AI Recommends the Wrong Medicine – Who\'s Responsible?',
                'slug' => 'what-if-ai-recommends-the-wrong-medicine-whos-responsible',
                'content' => '<h2>The Ethics of AI in Healthcare</h2><p>As artificial intelligence becomes more prevalent in healthcare, questions of liability and accountability become increasingly important. When an AI system makes a recommendation that leads to harm, who bears the responsibility?</p><h3>Key Considerations</h3><ul><li>The role of healthcare providers in verifying AI recommendations</li><li>Regulatory frameworks for AI in medicine</li><li>Patient informed consent</li><li>Manufacturer liability</li></ul><p>This complex issue requires collaboration between technologists, healthcare providers, regulators, and ethicists to ensure patient safety while enabling innovation.</p>',
                'original_content' => 'Exploring the ethical and legal implications when AI systems make incorrect medical recommendations. Who is liable?',
                'source_url' => 'https://beyondchats.com/blogs/what-if-ai-recommends-the-wrong-medicine-whos-to-blame-2/',
                'is_updated' => true,
                'references' => json_encode(['https://www.healthit.gov/ai-healthcare']),
            ],
            [
                'title' => 'What If AI Recommends the Wrong Medicine – Who\'s to Blame?',
                'slug' => 'what-if-ai-recommends-the-wrong-medicine-whos-to-blame',
                'content' => '<h2>Understanding AI Liability in Healthcare</h2><p>The integration of AI in healthcare decision-making raises critical questions about accountability. This article explores the legal landscape surrounding AI-assisted medical decisions.</p><h3>Stakeholder Responsibilities</h3><ul><li>AI developers and their testing protocols</li><li>Healthcare institutions implementing AI</li><li>Individual practitioners using AI tools</li></ul><p>Clear guidelines and regulations are essential for the safe advancement of AI in medicine.</p>',
                'original_content' => 'A deep dive into liability questions when AI makes errors in medical recommendations.',
                'source_url' => 'https://beyondchats.com/blogs/what-if-ai-recommends-the-wrong-medicine-whos-to-blame/',
                'is_updated' => true,
                'references' => json_encode(['https://www.fda.gov/medical-devices/software-medical-device-samd']),
            ],
            [
                'title' => 'AI in Healthcare: Hype or Reality?',
                'slug' => 'ai-in-healthcare-hype-or-reality',
                'content' => '<h2>Separating Fact from Fiction</h2><p>AI in healthcare has been promised to revolutionize everything from diagnosis to treatment. But what\'s actually working today versus what\'s still on the horizon?</p><h3>Current AI Applications</h3><ul><li>Medical imaging analysis</li><li>Drug discovery acceleration</li><li>Patient engagement chatbots</li><li>Administrative task automation</li></ul><p>While some applications are delivering real value, others remain in development or testing phases.</p>',
                'original_content' => 'Examining the current state of AI in healthcare - what works and what is still hype.',
                'source_url' => 'https://beyondchats.com/blogs/ai-in-healthcare-hype-or-reality/',
                'is_updated' => true,
                'references' => json_encode(['https://www.mckinsey.com/healthcare-ai']),
            ],
            [
                'title' => 'Which AI Chatbot Is Right for Your Business in 2025?',
                'slug' => 'which-ai-chatbot-is-right-for-your-business-in-2025',
                'content' => '<h2>Choosing the Perfect AI Assistant</h2><p>With dozens of AI chatbot solutions available, selecting the right one for your business can be overwhelming. This guide helps you navigate the options.</p><h3>Key Selection Criteria</h3><ul><li>Integration capabilities</li><li>Customization options</li><li>Pricing and scalability</li><li>Industry-specific features</li><li>Support and training</li></ul><p>BeyondChats offers industry-leading customization and integration, making it ideal for businesses of all sizes.</p>',
                'original_content' => 'A comprehensive guide to selecting the best AI chatbot for your business needs in 2025.',
                'source_url' => 'https://beyondchats.com/blogs/which-ai-chatbot-is-right-for-your-business/',
                'is_updated' => true,
                'references' => json_encode(['https://www.gartner.com/chatbot-market-guide']),
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}

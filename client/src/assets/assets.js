import logo from "./logo.png";
import gradientBackground from "./gradientBackground.png";
import user__group from "./user__group.png";
import star__icon from "./star__icon.svg";
import stardull__icon from "./stardull__icon.svg";
import profile1 from "./profile1.png";
import arrow__icon from "./arrow__icon.svg";
import { PenTool, Lightbulb, Sparkles, Layers, Target, FileCheck } from 'lucide-react'
import ai1 from "./ai1.png";
import ai2 from "./ai2.png";
import ai3 from "./ai3.png";

// export const dummyCreationData = [
//   {
//     id: 1,
//     type: 'blog-title',
//     prompt: 'Generate a blog title for the keyword blog in the category Technology.',
//     createdAt: '2025-08-20T00:00:00.000Z'
//   },
//   {
//     id: 2,
//     type: 'blog-title', 
//     prompt: 'Generate a blog title for the keyword blog in the category General.',
//     createdAt: '2025-08-20T00:00:00.000Z'
//   },
//   {
//     id: 3,
//     type: 'article',
//     prompt: 'Write an article about AI With Coding in Short (500-800 word).',
//     createdAt: '2025-08-20T00:00:00.000Z'
//   }
// ];
export const dummyCreationData = [
  {
    id: 1,
    type: 'blog-title',
    prompt: 'Generate a blog title for the keyword blog in the category Technology.',
    content: `Here are a few blog title options for a technology blog, playing with different angles: **General & Broad:** * The Tech Blog: News, Reviews, and Insights * TechTrend Today: Your Daily Dose of Tech * The Future is Now: Exploring the World of Technology * Tech Talk: Unpacking the Latest Innovations **More Specific & Intriguing:** * Decoding Tech: Making Sense of the Digital World * Beyond the Gadgets: The`,
    createdAt: '2025-07-01T00:00:00.000Z'
  },
  {
    id: 2,
    type: 'blog-title', 
    prompt: 'Generate a blog title for the keyword blog in the category General.',
    content: `Here are some blog title options for a general category blog:

**Broad & Versatile:**
* The Daily Digest: Stories, Ideas & Inspiration
* Life & More: A Collection of Thoughts
* The Weekly Roundup: Everything You Need to Know
* Beyond the Ordinary: Exploring Life's Many Facets

**Personal & Engaging:**
* Coffee Talk: Random Thoughts & Daily Musings
* The Modern Life: Navigating Today's World`,
    createdAt: '2025-07-01T00:00:00.000Z'
  },
  {
    id: 3,
    type: 'article',
    prompt: 'Write an article about AI With Coding in Short (500-800 word).',
    content: `# AI and Coding: Revolutionizing Software Development

Artificial Intelligence (AI) has fundamentally transformed the landscape of software development, creating new paradigms that enhance productivity, accuracy, and innovation. As we advance into an increasingly digital world, the integration of AI with coding practices has become not just beneficial but essential for modern developers.

## The Rise of AI-Powered Development Tools

Modern development environments now feature AI assistants that can generate code, suggest improvements, and even debug complex problems. Tools like GitHub Copilot, ChatGPT, and various IDE extensions have democratized coding by making it more accessible to beginners while simultaneously boosting the efficiency of experienced developers.

These AI tools excel at pattern recognition, allowing them to understand coding contexts and provide relevant suggestions. They can complete functions, generate boilerplate code, and even translate natural language descriptions into working code snippets.

## Benefits of AI in Coding

**Enhanced Productivity**: AI can handle routine coding tasks, allowing developers to focus on higher-level problem-solving and creative solutions.

**Error Reduction**: AI-powered linters and debuggers can identify potential issues before they become problems, improving code quality and reducing debugging time.

**Learning Acceleration**: New programmers can learn faster by observing AI-generated code and understanding best practices through practical examples.

## The Future Outlook

As AI continues to evolve, we can expect even more sophisticated integration with development workflows, making coding more intuitive and powerful than ever before.`,
    createdAt: '2025-07-01T00:00:00.000Z'
  }
];

export const assets = {
    logo,
    gradientBackground,
    user__group,
    star__icon,
    stardull__icon,
    profile1,
    arrow__icon,
};

export const AiToolsData = [
    {
        title: 'AI Article Writer',
        description: 'Generate high-quality, engaging articles on any topic with our AI writing technology.',
        Icon: PenTool, 
        bg: { from: '#667eea', to: '#764ba2' },
        path: '/ai/write-article'
    },
    {
        title: 'Blog Title Generator',
        description: 'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
        Icon: Lightbulb, 
        bg: { from: '#f093fb', to: '#f5576c' },
        path: '/ai/blog-titles'
    },
    {
        title: 'AI Image Generation',
        description: 'Create stunning visuals with our AI image generation tool, Experience the power of AI ',
        Icon: Sparkles, 
        bg: { from: '#4facfe', to: '#00f2fe' },
        path: '/ai/generate-images'
    },
    {
        title: 'Background Removal',
        description: 'Effortlessly remove backgrounds from your images with our AI-driven tool.',
        Icon: Layers, 
        bg: { from: '#43e97b', to: '#38f9d7' },
        path: '/ai/remove-background'
    },
    {
        title: 'Object Removal',
        description: 'Remove unwanted objects from your images seamlessly with our AI object removal tool.',
        Icon: Target, 
        bg: { from: '#fa709a', to: '#fee140' },
        path: '/ai/remove-object'
    },
    {
        title: 'Resume Reviewer',
        description: 'Get your resume reviewed by AI to improve your chances of landing your dream job.',
        Icon: FileCheck, 
        bg: { from: '#a8edea', to: '#fed6e3' },
        path: '/ai/review-resume'
    }
]


// import logo from "./logo.png";
// import gradientBackground from "./gradientBackground.png";
// import user__group from "./user__group.png";
// import star__icon from "./star__icon.svg";
// import stardull__icon from "./stardull__icon.svg";
// import profile1 from "./profile1.png";
// import arrow__icon from "./arrow__icon.svg";
// import { PenTool, Lightbulb, Sparkles, Layers, Target, FileCheck } from 'lucide-react'
// import ai1 from "./ai1.png";
// import ai2 from "./ai2.png";
// import ai3 from "./ai3.png";


// export const dummyCreationData = [
//   {
//     id: 1,
//     type: 'blog-title',
//     prompt: 'Generate a blog title for the keyword blog in the category Technology.',
//     content: `Here are a few blog title options for a technology blog, playing with different angles:

// **General & Broad:**
// - The Tech Blog: News, Reviews, and Insights
// - Technology Today: Your Daily Dose of Tech
// - The Future is Now: Exploring the World of Technology
// - Tech Talk: Unpacking the Latest Innovations

// **More Specific & Intriguing:**
// - Decoding Tech: Making Sense of the Digital World
// - Beyond the Gadgets: The Human Side of Technology
// - Code & Culture: Where Technology Meets Society
// - Innovation Insider: Breaking Down Complex Tech`,
//     createdAt: '2025-07-01T00:00:00.000Z'
//   },
//   {
//     id: 2,
//     type: 'blog-title', 
//     prompt: 'Generate a blog title for the keyword blog in the category General.',
//     content: `Here are some blog title options for a general category blog:

// **Broad & Versatile:**
// - The Daily Digest: Stories, Ideas & Inspiration
// - Life & More: A Collection of Thoughts
// - The Weekly Roundup: Everything You Need to Know
// - Beyond the Ordinary: Exploring Life's Many Facets

// **Personal & Engaging:**
// - Coffee Talk: Random Thoughts & Daily Musings
// - The Modern Life: Navigating Today's World
// - Simple Stories: Finding Beauty in Everyday Moments
// - Curious Minds: Questions, Answers, and Everything Between`,
//     createdAt: '2025-07-01T00:00:00.000Z'
//   },
//   {
//     id: 3,
//     type: 'article',
//     prompt: 'Write an article about AI With Coding in Short (500-800 word).',
//     content: `Here's a comprehensive article about AI and coding in 500-800 words:

// **Introduction:**
// - Artificial Intelligence has revolutionized software development
// - Modern developers now work alongside AI tools daily
// - This transformation enhances productivity and code quality
// - AI coding assistance is becoming essential for competitive development

// **AI-Powered Development Tools:**
// - GitHub Copilot for intelligent code completion
// - ChatGPT and Claude for coding assistance and debugging
// - Tabnine for context-aware code suggestions
// - CodeT5 for code summarization and documentation
// - DeepCode for automated code review and bug detection

// **Key Benefits for Developers:**
// - Enhanced Productivity: AI handles routine coding tasks efficiently
// - Error Reduction: Advanced linting and bug detection capabilities
// - Learning Acceleration: New developers learn through AI examples
// - Code Quality: Consistent patterns and best practice enforcement
// - Time Savings: Automated documentation and testing generation`,
//     createdAt: '2025-07-01T00:00:00.000Z'
//   }
// ];

// export const assets = {
//     logo,
//     gradientBackground,
//     user__group,
//     star__icon,
//     stardull__icon,
//     profile1,
//     arrow__icon,
//     ai1,
//     ai2, 
//     ai3
// };

// export const AiToolsData = [
//     {
//         title: 'AI Article Writer',
//         description: 'Generate high-quality, engaging articles on any topic with our AI writing technology.',
//         Icon: PenTool, 
//         bg: { from: '#667eea', to: '#764ba2' },
//         path: '/ai/write-article'
//     },
//     {
//         title: 'Blog Title Generator',
//         description: 'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
//         Icon: Lightbulb, 
//         bg: { from: '#f093fb', to: '#f5576c' },
//         path: '/ai/blog-titles'
//     },
//     {
//         title: 'AI Image Generation',
//         description: 'Create stunning visuals with our AI image generation tool, Experience the power of AI ',
//         Icon: Sparkles, 
//         bg: { from: '#4facfe', to: '#00f2fe' },
//         path: '/ai/generate-images'
//     },
//     {
//         title: 'Background Removal',
//         description: 'Effortlessly remove backgrounds from your images with our AI-driven tool.',
//         Icon: Layers, 
//         bg: { from: '#43e97b', to: '#38f9d7' },
//         path: '/ai/remove-background'
//     },
//     {
//         title: 'Object Removal',
//         description: 'Remove unwanted objects from your images seamlessly with our AI object removal tool.',
//         Icon: Target, 
//         bg: { from: '#fa709a', to: '#fee140' },
//         path: '/ai/remove-object'
//     },
//     {
//         title: 'Resume Reviewer',
//         description: 'Get your resume reviewed by AI to improve your chances of landing your dream job.',
//         Icon: FileCheck, 
//         bg: { from: '#a8edea', to: '#fed6e3' },
//         path: '/ai/review-resume'
//     }
// ]



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

export const dummyCreationData = [
  {
    id: 1,
    type: 'blog-title',
    prompt: 'Generate an image of a boy this is waiting for the train in Anime Style.',
    image: ai1,
    content: `Here are a few blog title options for a technology blog, playing with different angles:

**General & Broad:**
- The Tech Blog: News, Reviews, and Insights
- Technology Today: Your Daily Dose of Tech
- The Future is Now: Exploring the World of Technology
- Tech Talk: Unpacking the Latest Innovations

**More Specific & Intriguing:**
- Decoding Tech: Making Sense of the Digital World
- Beyond the Gadgets: The Human Side of Technology
- Code & Culture: Where Technology Meets Society
- Innovation Insider: Breaking Down Complex Tech`,
    createdAt: '2025-07-01T00:00:00.000Z',
    likes: [1, 2, 3]
  },
  {
    id: 2,
    type: 'blog-title', 
    prompt: 'Generate an image of an astronaut and a pizza in the Cartoon Style.',
    image: ai2, 
    content: `Here are some blog title options for a general category blog:

**Broad & Versatile:**
- The Daily Digest: Stories, Ideas & Inspiration
- Life & More: A Collection of Thoughts
- The Weekly Roundup: Everything You Need to Know
- Beyond the Ordinary: Exploring Life's Many Facets

**Personal & Engaging:**
- Coffee Talk: Random Thoughts & Daily Musings
- The Modern Life: Navigating Today's World
- Simple Stories: Finding Beauty in Everyday Moments
- Curious Minds: Questions, Answers, and Everything Between`,
    createdAt: '2025-07-01T00:00:00.000Z',
    likes: [1, 2] 
  },
  {
    id: 3,
    type: 'article',
    prompt: 'Generate an image of a horse flying in the sky in the Realist Style.',
    image: ai3, 
    content: `Here's a comprehensive article about AI and coding in 500-800 words:

**Introduction:**
- Artificial Intelligence has revolutionized software development
- Modern developers now work alongside AI tools daily
- This transformation enhances productivity and code quality
- AI coding assistance is becoming essential for competitive development

**AI-Powered Development Tools:**
- GitHub Copilot for intelligent code completion
- ChatGPT and Claude for coding assistance and debugging
- Tabnine for context-aware code suggestions
- CodeT5 for code summarization and documentation
- DeepCode for automated code review and bug detection

**Key Benefits for Developers:**
- Enhanced Productivity: AI handles routine coding tasks efficiently
- Error Reduction: Advanced linting and bug detection capabilities
- Learning Acceleration: New developers learn through AI examples
- Code Quality: Consistent patterns and best practice enforcement
- Time Savings: Automated documentation and testing generation`,
    createdAt: '2025-07-01T00:00:00.000Z',
    likes: [1, 2, 3, 4, 5]
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
    ai1,
    ai2, 
    ai3
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
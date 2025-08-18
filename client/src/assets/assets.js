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


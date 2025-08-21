import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronRight, Calendar, Tag, Copy, ExternalLink, Sparkles } from 'lucide-react'

const CreationItem = ({item}) => {
    const [expanded, setExpanded] = useState(false)
    const [copied, setCopied] = useState(false)
    
    const formatDate = (dateValue) => {
        if (!dateValue) return 'Invalid Date';
        const date = new Date(dateValue);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTypeColor = (type) => {
        const colors = {
            'blog-title': 'bg-purple-100 text-purple-700 border-purple-200',
            'article': 'bg-blue-100 text-blue-700 border-blue-200',
            'image': 'bg-green-100 text-green-700 border-green-200',
            'resume': 'bg-orange-100 text-orange-700 border-orange-200',
            'default': 'bg-gray-100 text-gray-700 border-gray-200'
        };
        return colors[type] || colors.default;
    };

    const handleCopy = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(item.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className='group relative'>
            {/* Main Card */}
            <div 
                onClick={() => setExpanded(!expanded)} 
                className='p-6 bg-white border border-gray-200 rounded-xl cursor-pointer 
                          transition-all duration-300 hover:shadow-lg hover:border-gray-300 
                          hover:scale-[1.02] active:scale-[0.98]'
            >
                <div className='flex justify-between items-start gap-4'>
                    <div className='flex-1 min-w-0'>
                        {/* Prompt with better typography */}
                        <h3 className='text-lg font-semibold text-gray-900 leading-tight mb-3 
                                     group-hover:text-gray-700 transition-colors'>
                            {item.prompt || item.title || item.description || 'Untitled Creation'}
                        </h3>
                        
                        {/* Meta information with icons */}
                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                            <div className='flex items-center gap-1.5'>
                                <Tag className='w-4 h-4' />
                                <span className='capitalize'>{item.type}</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <Calendar className='w-4 h-4' />
                                <span>{formatDate(item.createdAt || item.date || item.created)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side controls */}
                    <div className='flex items-start gap-2 flex-shrink-0'>
                        {/* Type badge */}
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-lg border 
                                       ${getTypeColor(item.type)} transition-all duration-200`}>
                            {item.type}
                        </span>
                        
                        {/* Expand/collapse icon */}
                        <button className='p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 
                                         transition-colors duration-200 flex-shrink-0'>
                            {expanded ? 
                                <ChevronDown className='w-4 h-4 text-gray-600' /> : 
                                <ChevronRight className='w-4 h-4 text-gray-600' />
                            }
                        </button>
                    </div>
                </div>

                {/* Subtle expansion indicator */}
                {!expanded && (
                    <div className='mt-3 flex items-center text-xs text-gray-400 gap-1'>
                        <Sparkles className='w-3 h-3' />
                        <span>Click to view generated content</span>
                    </div>
                )}
            </div>

            {/* Expanded Content */}
            {expanded && (
                <div className='mt-4 bg-white border border-gray-200 rounded-lg p-4'>
                    {/* Action buttons at the top right */}
                    <div className='flex justify-end mb-3'>
                        {item.type !== 'image' && (
                            <div className='flex gap-2'>
                                <button 
                                    onClick={handleCopy}
                                    className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
                                             text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 
                                             rounded-md transition-all duration-200'
                                >
                                    <Copy className='w-3 h-3' />
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                                <button className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
                                                 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 
                                                 rounded-md transition-all duration-200'>
                                    <ExternalLink className='w-3 h-3' />
                                    Export
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    {item.type === 'image' ? (
                        <div className='flex justify-center'>
                            <img 
                                src={item.content} 
                                alt="Generated content" 
                                className='max-w-full max-h-96 rounded-lg shadow-md object-contain'
                            />
                        </div>
                    ) : (
                        <div className='text-sm text-gray-700 space-y-4'>
                            <Markdown 
                                components={{
                                    h1: ({children}) => <h1 className="text-sm font-semibold text-gray-900 mb-1">{children}</h1>,
                                    h2: ({children}) => <h2 className="text-sm font-semibold text-gray-900 mb-1">{children}</h2>,
                                    h3: ({children}) => <h3 className="text-sm font-semibold text-gray-900 mb-1">{children}</h3>,
                                    h4: ({children}) => <h4 className="text-sm font-semibold text-gray-900 mb-1">{children}</h4>,
                                    p: ({children}) => {
                                        // Check if this paragraph contains a bold title (has ** and ends with :)
                                        const isTitle = React.Children.toArray(children).some(child => 
                                            child?.props?.children && typeof child.props.children === 'string' && 
                                            child.props.children.endsWith(':')
                                        );
                                        
                                        if (isTitle) {
                                            return <p className="text-sm font-semibold text-gray-900 mb-1 mt-4 first:mt-0">{children}</p>;
                                        }
                                        return <p className="text-sm text-gray-700 leading-relaxed mb-4">{children}</p>;
                                    },
                                    ul: ({children}) => <ul className="space-y-1 mb-4 mt-0">{children}</ul>,
                                    ol: ({children}) => <ol className="space-y-1 mb-4 mt-0">{children}</ol>,
                                    li: ({children}) => (
                                        <li className="text-sm text-gray-700 flex items-start">
                                            <span className="text-gray-500 mr-2 mt-0.5">•</span>
                                            <span>{children}</span>
                                        </li>
                                    ),
                                    strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                                    em: ({children}) => <em className="italic text-gray-700">{children}</em>
                                }}
                            >
                                {item.content}
                            </Markdown>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreationItem
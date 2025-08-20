import React, { useState } from 'react'

const CreationItem = ({item}) => {

    const [expanded, setExpanded] = useState(false)
    
    const formatDate = (dateValue) => {
        if (!dateValue) return 'Invalid Date';
        const date = new Date(dateValue);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
    };

    return (
        <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
            <div className='flex justify-between items-center gap-4'>
                <div>
                    {/* Show the full prompt/description as the main heading */}
                    <h2 className='font-normal text-gray-800'>{item.prompt || item.title || item.description || 'Untitled Creation'}</h2>
                    <p className='text-gray-500 mt-1'>{item.type} - {formatDate(item.createdAt || item.date || item.created)}</p>
                </div>
                <button className='bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] px-4 py-1 rounded-full'>
                    {item.type}
                </button>
            </div>
            {expanded && (
                <div>
                    {item.type === 'image' ? (
                        <div>
                            <img src={item.content} alt="Generated content" className='mt-3 w-full max-w-md rounded-lg'/>
                        </div>
                    ) : (
                        <div className='mt-3 max-h-64 overflow-y-auto text-sm text-slate-700 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap'>
                            {item.content}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreationItem
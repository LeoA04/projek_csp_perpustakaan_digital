"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => setRating && setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`cursor-pointer ${setRating ? '' : 'cursor-default'}`}
                    type="button"
                >
                    <Star
                        size={20}
                        className={`
                            ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}
                            transition-colors
                        `}
                    />
                </button>
            ))}
        </div>
    );
};

export default StarRating;
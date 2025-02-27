import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../typings';
import Thumbnail from './Thumbnail';

interface Props {
    title: String;
    movies: Movie[];
}

function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction: String) => {
        setIsMoved(true);

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;

            const scrollTo =
                direction === 'left'
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;
            rowRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div className="space-y-1 md:space-y-2">
            <h2 className="cursor-pointer text-base font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title}
            </h2>

            <div className="group relative md:-ml-4">
                <ChevronLeftIcon
                    className={`absolute top-0 bottom-0 left-2 m-auto w-9 h-9 z-40 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
                        !isMoved && 'hidden'
                    }`}
                    onClick={() => handleClick('left')}
                />

                <div
                    ref={rowRef}
                    className="flex space-x-1 overflow-x-scroll md:space-x-3 scrollbar-hide md:p-2"
                >
                    {movies.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}
                </div>

                <ChevronRightIcon
                    className="absolute top-0 bottom-0 right-2 m-auto w-9 h-9 z-40 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    );
}

export default Row;

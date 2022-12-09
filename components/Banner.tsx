import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../constants/movie';
import { showVideoModal, setSelectedMovie } from '../features/appSlice';
import { Movie } from '../typings';

interface Props {
    netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * netflixOriginals.length);
        setMovie(netflixOriginals[randomIndex]);
    }, [netflixOriginals]);

    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:min-h-[65vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0 -z-10 h-[110vh] w-screen pt-14">
                <Image
                    className="object-cover"
                    src={`${baseUrl}${
                        movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt="Movie"
                    fill
                    sizes="large"
                />
            </div>

            <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl text-shadow-xl">
                {movie?.title || movie?.original_name}
            </h1>
            <p className="max-w-xs text-xs md:max-w-lg md:-text-lg lg:max-w-2xl lg:text-2xl">
                {movie?.overview}
            </p>

            <div className="flex space-x-3 items-center">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="w-4 h-4 text-black md:h-7 md:w-7" />
                    Play
                </button>
                <button
                    className="bannerButton bg-[gray]/70"
                    onClick={() => {
                        dispatch(showVideoModal());
                        dispatch(setSelectedMovie(movie));
                    }}
                >
                    <InformationCircleIcon className="w-5 h-5 md:h-8 md:w-8" />
                    More Info
                </button>
            </div>
        </div>
    );
}

export default Banner;

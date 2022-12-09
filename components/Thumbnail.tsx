import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setSelectedMovie, showVideoModal } from '../features/appSlice';
import { Movie } from '../typings';

interface Props {
    movie: Movie;
}

function Thumbnail({ movie }: Props) {
    const dispatch = useDispatch();
    return (
        <div
            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 last:!mr-10"
            onClick={() => {
                dispatch(showVideoModal());
                dispatch(setSelectedMovie(movie));
            }}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${
                    movie.backdrop_path || movie.poster_path
                }`}
                className="rounded-sm object-cover md:rounded"
                fill
                alt="Thumbnail"
                sizes="lg"
            />
        </div>
    );
}

export default Thumbnail;

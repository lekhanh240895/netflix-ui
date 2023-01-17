import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import {
    CheckIcon,
    HandThumbUpIcon,
    PlusIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    HandThumbUpIcon as HandThumbUpIconSolid,
    PlayIcon,
} from '@heroicons/react/24/solid';
import { Element, Genre, IUser, Movie } from '../typings';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, authSelector } from '../redux/selector';
import { hideVideoModal, setMyList } from '../features/appSlice';
import { Modal } from '@mui/material';
import useSWR, { Fetcher } from 'swr';
import axios from 'axios';

export default function VideoModal() {
    const { videoModalShow, selectedMovie, myList } = useSelector(appSelector);
    const [trailer, setTrailer] = useState<string>('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(true);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isMyList, setIsMyList] = useState<boolean>(false);

    const fetcher: Fetcher<IUser, string> = (path) =>
        fetch(path).then((res) => res.json());

    const { data: user } = useSWR<IUser, Error>('/api/users/getMe', fetcher);

    useEffect(() => {
        if (myList.some((movie) => movie.id === selectedMovie?.id)) {
            setIsMyList(true);
        } else {
            setIsMyList(false);
        }
    }, [myList, selectedMovie]);

    useEffect(() => {
        if (user?.likes.includes(selectedMovie?.id as number)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [user, selectedMovie]);

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(hideVideoModal());
    };

    useEffect(() => {
        if (!selectedMovie) return;

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    selectedMovie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${selectedMovie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`,
            ).then((response) => response.json());

            setMovie(data);

            if (data?.videos) {
                const index = data.videos.results.findIndex(
                    (element: Element) => element.type === 'Trailer',
                );
                setTrailer(data.videos?.results[index]?.key);
            }
            if (data?.genres) {
                setGenres(data.genres);
            }
        }

        fetchMovie();
    }, [selectedMovie]);

    const handleAddList = async () => {
        try {
            const { data: list } = await axios.put(`api/list/${user?._id}`, {
                selectedMovie,
            });

            dispatch(setMyList(list.movies));
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        setIsLiked(!isLiked);

        await axios.post(`/api/users/${user?._id}/like`, {
            movieId: selectedMovie?.id,
        });
    };

    return (
        <Modal
            open={videoModalShow}
            onClose={closeModal}
            className="fixed !top-7 left-0 rounded-lg w-[98%] md:max-w-5xl mx-auto overflow-hidden scrollbar-hide overflow-y-scroll z-50"
        >
            <div className="bg-gradient-to-b">
                <button
                    onClick={closeModal}
                    className="modalButton absolute right-5 top-5 !z-40 w-9 h-9 bg-[#181818] border-none hover:bg-[#181818]"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />

                    <div className="absolute bottom-12 left-0 right-0 px-12 flex items-center justify-between">
                        <div className="flex flex-row items-center space-x-2">
                            <button className="flex flex-row items-center space-x-2 bg-white py-1 px-4 md:py-2 md:px-7 rounded hover:bg-[#e6e6e6]  focus:outline-white focus:outline-none">
                                <PlayIcon
                                    className="w-4 h-4 md:w-7 md:h-7"
                                    color="black"
                                />
                                <span className="text-black text-sm md:text-lg font-medium">
                                    Play
                                </span>
                            </button>

                            <button
                                className="modalButton"
                                onClick={handleAddList}
                            >
                                {isMyList ? (
                                    <CheckIcon className="w-3 h-3 md:w-5 md:h-5" />
                                ) : (
                                    <PlusIcon className="w-3 h-3 md:w-5 md:h-5" />
                                )}
                            </button>

                            <button
                                className="modalButton"
                                onClick={handleLike}
                            >
                                {isLiked ? (
                                    <HandThumbUpIconSolid className="w-3 h-3 md:w-5 md:h-5 text-red" />
                                ) : (
                                    <HandThumbUpIcon className="w-3 h-3 md:w-5 md:h-5" />
                                )}
                            </button>
                        </div>

                        <button
                            className="modalButton opacity-60 hover:opacity-100"
                            onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                                <SpeakerXMarkIcon className="w-3 h-3 md:w-5 md:h-5" />
                            ) : (
                                <SpeakerWaveIcon className="w-3 h-3 md:w-5 md:h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="px-12 py-4 grid grid-cols-3 space-x-4 bg-[#181818]">
                    <div className="col-span-2">
                        <h1 className="text-green-400">New</h1>
                        <div className="flex items-center space-x-2 font-medium">
                            <span>{movie?.release_date?.slice(0, 4)}</span>
                            <span className="border border-white/40 px-1">
                                18+
                            </span>
                            <span>10 tập</span>
                        </div>
                        <p className="mt-6">{movie?.overview}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-col break-words md:inline-block md:space-x-1">
                            <span className="text-[gray] block md:inline-block ">
                                Actor:
                            </span>
                            <span className="font-medium">Nakao Akiyoshi,</span>
                            <span className="font-medium">Nakao Akiyoshi,</span>
                            <span className="font-medium">Nakao Akiyoshi,</span>
                            <span className="font-medium">Nakao Akiyoshi</span>
                        </div>

                        <div className="flex flex-col break-words md:inline-block md:space-x-1">
                            <span className="text-[gray] block md:inline-block">
                                Genre:
                            </span>
                            {genres.map((genre) => (
                                <span key={genre.name} className="font-medium">
                                    {genre.name},
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

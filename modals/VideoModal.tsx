import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector } from '../redux/selector';
import { hideVideoModal } from '../features/app/appSlice';
import Image from 'next/image';
import { baseUrl } from '../constants/movie';
import { Modal } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function VideoModal() {
    const { videoModalShow, selectedMovie } = useSelector(appSelector);
    const dispatch = useDispatch();

    console.log({ selectedMovie });

    const closeModal = () => {
        dispatch(hideVideoModal());
    };

    return (
        <Modal
            open={videoModalShow}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                {/* <div className="relative h-[200px] w-screen pt-14">
                    <Image
                        className="object-contain"
                        src={`${baseUrl}${
                            selectedMovie?.backdrop_path ||
                            selectedMovie?.poster_path
                        }`}
                        alt="Movie"
                        fill
                    />
                </div> */}
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none"
                    onClick={closeModal}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </>
        </Modal>
    );
}

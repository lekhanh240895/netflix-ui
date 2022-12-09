import { useState, useEffect } from 'react';
import { Movie } from '../typings';
import axios from 'axios';

function useList() {
    const [list, setList] = useState<Movie[]>([]);

    useEffect(() => {
        (async () => {
            const { data: list } = await axios.get('/api/list');

            setList(list);
        })();
    }, []);

    return list;
}

export default useList;

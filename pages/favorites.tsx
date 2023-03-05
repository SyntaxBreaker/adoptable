import { useState, useEffect } from "react";
import PetList from "../components/PetList";
import IPet from '../types/pet';
import { getItemsFromLocalStorage } from '../utils/localStorage';
import axios from "axios";

export default function Favorites() {
    const [pets, setPets] = useState<IPet[]>([]);

    useEffect(() => {
        const getFavoritePets = async () => {
            try {
                const IDs = getItemsFromLocalStorage('favorites');
                if (IDs) {
                    const res = await axios.get('/api/favoritePets', {
                        params: {
                            IDs: IDs
                        }
                    });

                    setPets(res.data);
                }
            } catch (err) { }
        }

        getFavoritePets();
    }, [])

    return (
        <PetList pets={pets} />
    )
}
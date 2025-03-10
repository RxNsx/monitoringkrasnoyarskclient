import {getProfileUserAsync} from "../../features/GetProfileUser/getProfileUser.ts";
import {useEffect, useState} from "react";
import {UserProfile} from "../../interfaces/UserProfile.ts";
import './Profile.css';

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProfileUserAsync()
            if(data === null) {
                setError("Ошибка получения профиля")
            }
            setProfile(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if(loading) {
        return <div>Загрузка профиля...</div>
    }

    if(error) {
        return <div className="errorText">Ошибка загрузки профиля {error}</div>
    }

    return ( <>
            <div>
                <h2>{profile?.loginName}</h2>
            </div>
            <div>
                <h2>{profile?.userEmail}</h2>
            </div>
        </>
    )
}
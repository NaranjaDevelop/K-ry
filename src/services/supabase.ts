import type { Group, Song, SupaUserTastes, userinterface } from "../Types/Interfaces";
import supabase from "./supaConfig";

export default supabase;

export const registerUser = async (username: string, email: string, password: string) => {

    const { data, error } = await supabase
        .from('users')
        .insert([{ username, email, password }])
        .select();

    if (error) {
        throw error;
    }

    console.log("User registered:", data);

    return data[0];
}

export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export const getAllGroups = async (username: string) => {
    
    const { data, error } = await supabase
        .from('groups')
        .select('*');

    if (error) {
        throw error;
    }

    const userGroups: Group[] = []
    const otherGroups: Group[] = []
    const joinedGroups: Group[] = []

    data.forEach((group: Group) => {
        const percentage = Math.floor(Math.random() * 100);
        const newGroup: Group = {
            ...group,
            matchPercentage: percentage
        }
        if (group.users.includes(username)) {
            joinedGroups.push(newGroup);
        } else if (group.users.length > 0) {
            otherGroups.push(newGroup);
        } else {
            userGroups.push(newGroup);
        }
    });


    return {
        userGroups,
        otherGroups,
        joinedGroups
    }
}

export const createGroup = async (name: string, description: string, photo: string, users: string[]) => {
    const { data, error } = await supabase
        .from('groups')
        .insert([{ name, description, image: photo, users: [] }])
        .select();

    if (error) {
        throw error;
    }

    console.log("Group created:", data);

    joinGroup(data[0].id, users[0]);

    return data;
}

export const joinGroup = async (groupId: number, username: string) => {
    try {
         const response = await fetch("https://k-ry.onrender.com/updateproto", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            username,
            groupId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update group");
        }

        const result = await response.json();
        return result; 

    } catch (error) {
        console.error("Error joining group:", error);
        throw error;
    }
}

export const getImageUrl = async (file: File) => {
    const cleanName = file.name.replace(/\s+/g, '_').toLowerCase();

    const { data, error } = await supabase.storage
        .from('groupsimages')
        .upload(`public/${cleanName}`, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        throw error;
    }

    const { data: urlData } = supabase.storage
        .from('groupsimages')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}

export const favoriteSong = async (song: Song, username: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('favs')
        .eq('username', username)
        .single();

    if (error) {
        throw error;
    }

    const favs: Song[] = data?.favs || [];
    const songIndex = favs.findIndex(fav => fav.track_id === song.track_id);

    if (songIndex === -1) {
        favs.push(song);
    } else {
        favs.splice(songIndex, 1);
    }

    const { error: updateError } = await supabase
        .from('users')
        .update({ favs })
        .eq('username', username);

    if (updateError) {
        throw updateError;
    }

    return { success: true, favs };
}

export const updateTastes = async (username: string, tastes: SupaUserTastes) => {
    console.log("Updating tastes for user:", username, tastes);
    const { error } = await supabase
        .from('users')
        .update({
            dance: tastes.dance,
            energy: tastes.energy,
            explicit: tastes.explicit,
            instrumental: tastes.instrumental,
            speech: tastes.speech,
            tempo: tastes.tempo,
            loudness: tastes.loudness,
            valence: tastes.valence,
            genres: tastes.genres
        })
        .eq('username', username);

    if (error) {
        throw error;
    }

    return { success: true };
}

export const compareUsers = async (user: userinterface, group: Group) => {

    //'user_danceability', 'user_energy', 'user_instrumentalness','user_speechiness', 'user_tempo', 'user_loudness', 'user_valence'

    const user_logged = {
        user_danceability: user.user_danceability || 0,
        user_energy: user.user_energy || 0,
        user_instrumentalness: user.user_instrumentalness || 0,
        user_speechiness: user.user_speechiness || 0,
        user_tempo: user.user_tempo || 0,
        user_loudness: user.user_loudness || 0,
        user_valence: user.user_valence || 0,
    }

    const user_proto = {
        user_danceability: group.danceability || 0,
        user_energy: group.energy || 0,
        user_instrumentalness: group.instrumentalness || 0,
        user_speechiness: group.speechiness || 0,
        user_tempo: group.tempo || 0,
        user_loudness: group.loudness || 0,
        user_valence:group.valence || 0,
    }

    try {
         const response = await fetch("https://k-ry.onrender.com/compare", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            user_logged, user_proto
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update group");
        }

        const result = await response.json();
        console.log(result); 

        console.log("Distance score:", result.similarity_percentage);

        return result.similarity_percentage

    } catch (error) {
        console.error("Error comparing users:", error);
        throw error;
    }

}

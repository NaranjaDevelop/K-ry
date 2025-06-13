import type { Group, Song, SupaUserTastes } from "../Types/Interfaces";
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

    return data;
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

    data.forEach(group => {
        if (group.users[0] === username) {
            userGroups.push(group);
        } else if (group.users.includes(username)) {
            joinedGroups.push(group);
        } else {
            otherGroups.push(group);
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
        return result; // { protoperson, recommended_songs, updated_group }

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

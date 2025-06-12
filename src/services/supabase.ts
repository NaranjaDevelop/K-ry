import type { tracks } from "../Types/Interfaces";
import supabase from "./supaConfig";

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

    const userGroups: unknown[] = []
    const otherGroups: unknown[] = []
    const joinedGroups: unknown[] = []

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

export const createGroup = async (name: string, description: string, photo: string) => {
    const { data, error } = await supabase
        .from('groups')
        .insert([{ name, description, photo }])
        .select();

    if (error) {
        throw error;
    }

    return data;
}

export const joinGroup = async (groupId: string, username: string) => {
    const { data, error } = await supabase
        .from('groups')
        .select('users')
        .eq('id', groupId)
        .single();

    if (error) {
        throw error;
    }

    const users = data?.users || [];
    if (!users.includes(username)) {
        users.push(username);
    }

    const { error: updateError } = await supabase
        .from('groups')
        .update({ users })
        .eq('id', groupId);

    if (updateError) {
        throw updateError;
    }

    return { success: true };
}

export const leaveGroup = async (groupId: string, username: string) => {
    const { data, error } = await supabase
        .from('groups')
        .select('users')
        .eq('id', groupId)
        .single();

    if (error) {
        throw error;
    }

    const users: string[] = data?.users || [];
    const updatedUsers = users.filter(user => user !== username);

    const { error: updateError } = await supabase
        .from('groups')
        .update({ users: updatedUsers })
        .eq('id', groupId);

    if (updateError) {
        throw updateError;
    }

    return { success: true };
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
        .from('images')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}

export const favoriteSong = async (song: tracks, username: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('favs')
        .eq('username', username)
        .single();

    if (error) {
        throw error;
    }

    const favs: tracks[] = data?.favs || [];
    const songIndex = favs.findIndex(fav => fav.id === song.id);

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

const getSongsFromApi = async (group: unknown) => {
    const response = await fetch('https://your-api-endpoint.com/update-song', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ group })
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result;
}

const createProtoPerson = async (group: unknown) => {
    try {
        const response = await fetch('https://your-api-endpoint.com/create-protoperson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ group })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating protoperson:', error);
        throw error;
    }
}

export const updateSongs = async (group: unknown) => {

    //logic to separate group protoperson from group

    try {
        const protoperson = await createProtoPerson(group);

        const updatedSongs = await getSongsFromApi(protoperson);
        console.log('Updated songs:', updatedSongs);

        const { data, error } = await supabase
            .from('groups')
            .update({ songs: updatedSongs })
            .eq('id', group.id)
            .select();
        
        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating songs:', error);
        throw error;
    }
}
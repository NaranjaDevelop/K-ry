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
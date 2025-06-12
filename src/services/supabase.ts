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

export const getAllGroups = async () => {
    const { data, error } = await supabase
        .from('groups')
        .select('*');

    if (error) {
        throw error;
    }

    const userGroups = []
    const otherGroups = []

    data.forEach(group => {
        if (group.users.includes(username)) {
            userGroups.push(group);
        } else {
            otherGroups.push(group);
        }
    });

    return {
        userGroups,
        otherGroups
    }
}
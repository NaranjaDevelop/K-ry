async function getSpotifyToken(clientId: string, clientSecret: string) {
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Spotify token request failed: ${response.status}`);
    }

    const data = await response.json();
    // data.access_token contains the token
    return data;
}

export default getSpotifyToken;

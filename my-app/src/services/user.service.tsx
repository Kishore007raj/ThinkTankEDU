// Importing Supabase client
import { supabase } from "../lib/initSupabase";

// Step 1: Get the current user session
// This function fetches the current logged-in user's session.
export const getUserSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(`Error fetching session: ${error.message}`);
    return data.session;
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
};

// Step 2: Fetch user by ID
// This function retrieves a user's profile based on their ID.
export const fetchUserById = async (userId : string) => {
  try {
    const { data, error } = await supabase
      .from('users') // Assuming 'users' is your table name
      .select('*') // Select all fields or specify fields as needed
      .eq('id', userId)
      .single(); // Fetch a single record

    if (error) throw new Error(`Error fetching user: ${error.message}`);
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
};

// Step 3: Generate a user token for video chat
// This function generates a token for video chat in a drawing room.
export const generateUserVideoToken = async (userId : string) => {
  try {
    const response = await fetch("/api/generate-user-video-instance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) throw new Error("Failed to generate video token");
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
};

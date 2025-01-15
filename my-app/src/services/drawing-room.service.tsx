//this function will be used for handling drawing room
import { supabase } from "../lib/initSupabase";

const DRAWING_ROOM_TABLE = "Virtual-Drawing-Rooms"; // supabase table name

//step-1-creating the drawing room service

export const createDrawingRoom = async (
  name: string,
  userId: string,
  isPublic: boolean //accepts name, userId and isPublic
) => {
  const { data } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .insert({
      name,
      owner: userId,
      isPublic,
      isPasswordProtected: false, // Default to not password-protected.
      password: null, //no password by default
    })
    .select();

  return data;
};

//step-2-Fetch all rooms for a user Service
//this function will return all the drawing rooms for a user

export const fetchUserDrawingRooms = async (userId: string) => {
  const { data } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .select()
    .eq("owner", userId)
    .order("created_at", { ascending: false });

  return data;
};

//step-3-Fetch Drawing Room By ID Service
//this function will return the drawing room by id

export const fetchDrawingRoomById = async (id: string) => {
  const { data } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .select()
    .eq("id", id);
  return data;
};

//step-4-Update Drawing Room Service
//this function will update the drawing room

export const updateRoomDrawing = async (roomId: string, drawing: any) => {
  await supabase
    .from(DRAWING_ROOM_TABLE)
    .update({
      drawing, //this function will update the drawing room by passing the roomId and drawing
    })
    .eq("id", roomId)
    .select();
};

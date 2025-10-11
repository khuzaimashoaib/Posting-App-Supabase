import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const supabaseUrl = "https://agdpbinmknsodzissmlj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZHBiaW5ta25zb2R6aXNzbWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTE0NjksImV4cCI6MjA3NDU2NzQ2OX0.IhRTwkpj7dpLeK8KnWoyDjMvscF-r1GsnWwaVe1Fr-Y";

export const supabaseApi = createClient(supabaseUrl, supabaseKey);

export const registerUser = async (email, password) => {
  const { data, error } = await supabaseApi.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error.message);
    return error ;
  }
  console.log(data);
  return  data 
};


export const signInUser = async (email, password) => {
  const { data, error } = await supabaseApi.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error.message);
    return error;
  }
  console.log(data);
  return  {data};
};

export const signOutUser = async () => {
  const { error } = await supabaseApi.auth.signOut();
  if (error) {
    console.error(error.message);
    return error;
  }
};

export const getUserSession = async () => {
  const { data, error } = await supabaseApi.auth.getSession();
  if (error) {
    console.error("Session error:", error.message);
    return { session: null };
  }
  console.log("Session data:", data);
  return data; 
};


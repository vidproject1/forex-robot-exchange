
-- This SQL needs to be executed separately in the Supabase SQL editor
-- Create a function to upsert ratings
CREATE OR REPLACE FUNCTION upsert_robot_rating(
  p_robot_id UUID,
  p_rating INTEGER,
  p_comment TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the current user's ID
  SELECT auth.uid() INTO v_user_id;
  
  -- Make sure we have a user ID
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Insert or update the rating
  INSERT INTO public.robot_ratings (robot_id, user_id, rating, comment)
  VALUES (p_robot_id, v_user_id, p_rating, p_comment)
  ON CONFLICT (robot_id, user_id)
  DO UPDATE SET 
    rating = p_rating,
    comment = p_comment;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

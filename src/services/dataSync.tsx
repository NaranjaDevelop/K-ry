import { useEffect } from "react";
import supabase from "./supaConfig";
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useAppDispatch } from "../store/store";
import { insertGroup, updateGroup } from "../store/slice";

const DataSync = () => {
    const dispatch = useAppDispatch();

     useEffect(() => {

    const subscriptionUser = supabase
      .channel('users')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'groups' },
        (payload) => {
          console.log('change received', payload.new);
          handleSupabaseChange(payload);
        }
      )
      .subscribe();

    return () => {
      subscriptionUser.unsubscribe();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSupabaseChange = (payload: RealtimePostgresChangesPayload<{[key: string]: any;}>) => {
    if (payload.eventType === 'INSERT') {
      dispatch(insertGroup(payload.new))
    }
    if (payload.eventType === 'UPDATE') {
      dispatch(updateGroup(payload.new))
    }
  }

  return null;
}

export default DataSync;
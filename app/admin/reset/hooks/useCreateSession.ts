'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useCreateSession() {
  const supabase = createClient();

  useEffect(() => {
    console.log("useCreateSession")

    const params = new URLSearchParams(window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (access_token && refresh_token) {
      console.log("creando session")
      supabase.auth.setSession({
        access_token,
        refresh_token
      });
    }
  }, [supabase.auth]);
}
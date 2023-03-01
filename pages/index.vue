<template>
  <div>
    <button type="button" @click="startSession">Start new session</button>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { Database } from '~/types/supabase';

const router = useRouter();
const supa = useSupabaseClient<Database>();

const startSession = async () => {
  const sessionId = uuid();
  const { data, error } = await supa.from('pokerSessions').insert({ id: sessionId }).select().single();
  if (error) {
    alert('Sorry, failed! Try again');
  } else {
    router.push({ name: 'session', params: { sessionId } });
  }
};
</script>

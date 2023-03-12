<template>
  <div>
    <form v-if="!name" method="post" @submit.prevent="setName">
      <input type="text" name="name" id="name" v-model="nameInput">
      <button type="submit">Save</button>
    </form>
    <p>
      <label>Name: <input type="text" readonly :value="name"></label>
      <label>UUID: <input type="text" readonly :value="uid"></label>
    </p>

  </div>
</template>

<script setup lang="ts">

import { v4 as uuid } from 'uuid';
import { Database } from '~/types/supabase';

definePageMeta({ name: 'session' });

const supa = useSupabaseClient<Database>();
const route = useRoute();

const sessionId = route.params.sessionId;
const userId = ref(0);
const uid = useLocalStorage<string>('uid', uuid());
const name = useLocalStorage<string>('name', '');
const nameInput = ref('');

const getUser = async () => {
  const { data, error } = await supa.from('pokerUsers').select().eq('uid', uid.value).single();
  if (error) {
    name.value = '';
  } else {
    name.value = data.name;
    userId.value = data.id;
  }
};

getUser();

const setName = async (ev: any) => {
  console.log(ev);
  const userData = {
    ...(userId.value && { id: userId.value }),
    name: name.value,
    uid: uid.value,
  };
  const { data, error } = await supa.from('pokerUsers').upsert(userData).select('name').single();
  if (error) {
    name.value = '';
    alert('Could not save name, please try again');
  } else {
    name.value = data?.name
  }
  console.log({ data, error });
}

supa.channel('table-changes').on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'pokerUsers' },
  (payload) => console.log(payload)
).subscribe();

</script>

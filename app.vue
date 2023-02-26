<template>
  <div>
    <form v-if="!name" method="post" @submit.prevent="setName">
      <input type="text" name="name" id="name" v-model="name">
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
import { Database } from './types/supabase';

const supa = useSupabaseClient<Database>();

const uid = useLocalStorage<string>('uid', uuid());
const name = useLocalStorage<string>('name', '');

const getUser = async () => {
  const { data, error } = await supa.from('pokerUsers').select().eq('uid', uid.value).single();
  if (error) {
    uid.value = null;
    name.value = '';
  } else {
    name.value = data.name;
  }
};

getUser();

const setName = async () => {
  const { data, error } = await supa.from('pokerUsers').upsert({ name: name.value, uid: uid.value }, { onConflict: '' }).select('name').single();
  if (error) {
    name.value = '';
    alert('Could not save name, please try again');
  } else {
    name.value = data?.name
  }
  console.log({ data, error });
}
</script>
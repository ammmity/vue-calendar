<script setup>
import VueCalendar from "./components/VueCalendar/VueCalendar.vue";
const events = [
  {
    id: 1,
    name: "Подвигать коней, выпить какао",
    date: new Date("2022-02-28T18:00:00"),
    type: "orange",
  },
  {
    id: 2,
    name: "Респ Баюма",
    date: new Date("2022-02-28T23:30:00"),
    type: "green",
  },
  {
    id: 3,
    name: "Подвигать коней",
    date: new Date("2022-03-23T09:00:00"),
    type: "green",
  },
  {
    id: 4,
    name: "Подвигать коней еще раз",
    date: new Date("2022-03-08T18:30:00"),
    type: "red",
  },
  {
    id: 5,
    name: "Просто оранжевый эвент",
    date: new Date("2022-03-08T19:25:00"),
    type: "orange",
  },
];
</script>

<template>
  <div class="container">
    <VueCalendar :events="events" />
  </div>
</template>
<style>
@import "./assets/base.scss";

.container {
  max-width: 1400px;
  margin: 50px auto;
}
</style>

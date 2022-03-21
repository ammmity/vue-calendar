<template>
  <div class="calendar">
    <div class="calendar__head">
      <div class="calendar__month">
        <div class="calendar__month-action" @click="setPreviousMonth">
          <ArrowIcon direction="left" />
        </div>
        <div>
          {{ this.date.format("MMMM").toUpperCase() }}
          {{ !isCurrentYear ? this.date.format("YYYY") : "" }}
        </div>
        <div class="calendar__month-action" @click="setNextMonth">
          <ArrowIcon direction="right" />
        </div>
      </div>
    </div>
    <div class="calendar__week-days">
      <div class="calendar__week-day">Понедельник</div>
      <div class="calendar__week-day">Вторник</div>
      <div class="calendar__week-day">Среда</div>
      <div class="calendar__week-day">Четверг</div>
      <div class="calendar__week-day">Пятница</div>
      <div class="calendar__week-day calendar__week-day--weekend">Суббота</div>
      <div class="calendar__week-day calendar__week-day--weekend">
        Воскресенье
      </div>
    </div>
    <div class="calendar__body">
      <div
        v-for="(day, i) in calendarDays"
        :key="i"
        class="calendar__day-wrapper"
        :class="{
          'calendar__day-wrapper--past-day': day.date.isBefore(today, 'day'),
          'calendar__day-wrapper--weekend':
            day.date.day() === 0 || day.date.day() === 6,
          'calendar__day-wrapper--today': day.date.isSame(today, 'day'),
        }"
      >
        <div class="calendar__day">
          {{ day.date.format("D") }}
        </div>
        <div class="calendar__events">
          <div
            v-for="event in day.events"
            :key="event.id"
            class="calendar__event-item"
            :class="`calendar__event-item--${event.type}`"
          >
            <div class="calendar__event-name-full">
              {{ this.$moment(event.date).format("HH:mm") }} {{ event.name }}
            </div>
            <div class="calendar__event-name-short">
              {{ this.$moment(event.date).format("HH:mm") }}
              {{ truncate(event.name, 9) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowIcon from "./components/ArrowIcon.vue";

export default {
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      today: this.$moment(),
      date: this.$moment(),
      calendarDays: null,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    isCurrentYear() {
      return this.$moment().format("YYYY") === this.date.format("YYYY");
    },
  },
  methods: {
    init() {
      this.calendarDays = [];
      const firstCalendarDay = this.$moment(this.date).startOf("month").day(1);
      const lastCalendarDay = this.$moment(this.date)
        .add(1, "months")
        .startOf("month")
        .day(7);
      const daysCount = lastCalendarDay.diff(firstCalendarDay, "days");
      for (let i = 0; i <= daysCount; i++) {
        const dayDate = this.$moment(firstCalendarDay).add(i, "days");
        const dayEvents = this.events.filter((day) =>
          this.$moment(day.date).isSame(dayDate, "day")
        );
        this.calendarDays.push({
          date: dayDate,
          events: dayEvents,
        });
      }
    },
    setPreviousMonth() {
      this.date = this.$moment(this.date)
        .subtract(1, "months")
        .startOf("month");
      this.init();
    },
    setNextMonth() {
      this.date = this.$moment(this.date).add(1, "months").startOf("month");
      this.init();
    },
    truncate(text, length) {
      return text.length > length ? `${text.substring(0, 5)}...` : text;
    },
  },
  components: { ArrowIcon },
};
</script>

<style lang="scss">
.calendar {
  width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;

  &__head {
    margin-bottom: 12px;
  }

  &__month {
    display: flex;
    align-items: center;
    grid-gap: 0 10px;

    div {
      font-size: 17px;
      font-weight: 700;
      color: #996bea;
      text-transform: uppercase;
      user-select: none;
    }
  }

  &__month-action {
    padding: 5px 10px;
    cursor: pointer;
  }

  &__week-days {
    display: flex;
    flex-wrap: nowrap;
  }

  &__week-day {
    width: calc(100% / 7);
    margin-bottom: 6px;
    text-align: right;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;

    &--weekend {
      color: var(--color-gray-darken);
    }
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
  }

  &__day-wrapper {
    display: flex;
    flex-direction: column;
    width: calc(100% / 7);
    min-height: 90px;
    padding: 4px 6px;
    border: 1px solid var(--color-gray);
    border-radius: 6px;
    transition: border-color 180ms ease;

    &:hover {
      border: 1px solid var(--color-gray-darken);
    }

    &--past-day {
      background-color: #ebe9e9;

      .calendar__day {
        color: var(--color-gray-darken);
      }
    }

    &--weekend {
      .calendar__day {
        color: #996bea;
      }
    }

    &--today {
      .calendar__day {
        color: var(--color-green);
      }
    }
  }

  &__day {
    margin-left: auto;
    font-weight: 700;
    text-align: right;
  }

  &__events {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 2px 0;
  }

  &__event-name-short {
    display: block;
  }

  &__event-name-full {
    display: none;
  }

  &__event-item {
    display: inline-flex;
    flex: 1;
    border-radius: 6px;
    padding: 1px 4px;
    white-space: nowrap;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      z-index: 2;

      .calendar__event-name-short {
        display: none;
      }

      .calendar__event-name-full {
        display: block;
      }
    }

    div {
      font-weight: 500;
    }

    &--green {
      background-color: var(--color-green-lighten);
      color: var(--color-green);
    }

    &--orange {
      background-color: var(--color-orange-lighten);
      color: var(--color-orange);
    }

    &--red {
      background-color: var(--color-red);
      color: var(--color-red-darken);
    }
  }
}
</style>

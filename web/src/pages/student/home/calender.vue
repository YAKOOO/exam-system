<template>
  <div class="mainBox">
    <Calendar
      :textTop="['S', 'M', 'T', 'W', 'T', 'F', 'S']"
      v-on:choseDay="clickDay"
      :sundayStart="true"
    >
    </Calendar>
  </div>
</template>
<script>
import Calendar from "vue-calendar-component";
export default {
  name: "calendar",
  data() {
    return {};
  },
  components: {
    Calendar,
  },
  methods: {
    clickDay(today) {
      // today格式为2020/8/7 改为 20200807
      let date = today.split("/");
      if (date[1].length < 2) {
        date[1] = "0" + date[1];
      }
      if (date[2].length < 2) {
        date[2] = "0" + date[2];
      }
      date = date.join("");
    },
  },
};
</script>
<style lang="less" scoped>
.mainBox {
  margin-top: 20px;
  margin-left: 100px;
}

/deep/ .wh_content_all {
  border-radius: 20px;
  background-color: white;
  .wh_top_changge li {
    color: #26346e;
    font-size: 20px;
    font-weight: bold;
  }

  .wh_jiantou1 {
    border-left: 2px solid #26346e;
    border-top: 2px solid #26346e;
  }

  .wh_jiantou2 {
    border-top: 2px solid #26346e;
    border-right: 2px solid #26346e;
  }

  .wh_content_item {
    .wh_item_date {
      color: #26346e;
    }

    .wh_item_date:hover {
      background: #409eff;
      color: white;
    }
    .wh_other_dayhide {
      color: #bfbfbf;
    }
    .wh_chose_day {
      background: #409eff;
      color: #0d0b0b;
    }
    .wh_isToday {
      background: #4583e3;
      color: white;
    }
  }
}
</style>
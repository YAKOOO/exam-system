<template>
  <div class="chooseItem">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="des">
      <slot name="des"></slot>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'ChooseItem'
}
</script>

<style>
  .chooseItem {
    cursor: pointer;
    float: left;
    width: 280px;
    height: 150px;
    margin-top: 30px;
    margin-right: 30px;
    border-radius: 20px;
    box-shadow: -1px -1px 8px #edeef3;
    background: white;
  }
  .icon {
    float: right;
    margin-right:30px;
    margin-top: 20px;
  }

  .title{
    margin-top: 60px;
    margin-left: 30px;
    font-size: 18px;
    font-weight: 600;
    color: #3d3d3d;
    letter-spacing: 2px;
  }
  
  .des{
    margin-left: 30px;
    color:#e8e8e8
  }
</style>
<template>
  <div class="profile-container">
    <div class="profile-box">
      <div class="card-outline">
        <div class="img-container">
          <img class="user-avatar" :src="user.avatar" alt="avatar">
        </div>
        <div class="user-info">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-identity">{{ user.identity == 'manager' ? '经理' : '职员' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
  $box-width: 300px;
  $box-height: 150px;
  $img-container-width: 100px;
  $img-container-height: 100px;
  $avatar-size: 80px;

  .profile-container {
    width: 100%;
    height: 100%;
    background: url('../assets/profile-bg.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .profile-box {
    position: absolute;
    width: $box-width;
    height: $box-height;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: linear-gradient(-45deg, #80a4cb, #cce0f3);
    border-radius: 4px;
    box-shadow: 3px 3px 3px #e8e8e8;
  }

  .card-outline {
    width: 202px;
    height: 100px;
    margin: 26px 50px;
  }

  .img-container {
    position: relative;
    float: left;
    width: $img-container-width;
    height: $img-container-height;
    border-right: 1.5px solid gray;
  }

  .user-avatar {
    position: absolute;
    width: $avatar-size;
    height: $avatar-size;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .user-info {
    float: left;
    line-height: 21px;
    width: $img-container-width;
    height: $img-container-height;
    box-sizing: border-box; 
    padding-top: 32px;
    text-align: center;
    .user-name {
      color: #cce0f3;
    }
    .user-identity {
      color: #80a4cb;
    }
  }
</style>

<template>
  <header class="headerContainer">
    <!-- logo和首页 -->
    <div class="logoContainer">
      <img src="../image/header/indexLogoSmall.svg" alt="" />
      <div class="indexContainer">
        <p>{{ functionsArr[currentIndex] }}</p>
        <div
          class="triangle"
          @click="rotateTriangle"
          :class="triangleFlag ? 'triangleRotate' : 'triangleRotateBack'"
        ></div>
      </div>
    </div>
    <!-- 首页列表 -->
    <ul class="indexList" v-show="triangleFlag">
      <li
        v-for="(item, index) in functionsArr"
        :key="index"
        @click="clickFunctions(index)"
        :class="currentIndex === index ? 'activeWorldColor' : ''"
      >
        {{ item }}
      </li>
    </ul>

    <div class="searchAndRemindContainer">
      <!-- 搜索 -->
      <div class="searchContainer">
        <el-form :model="form">
          <el-form-item>
            <el-input
              v-model="form.keyword"
              placeholder="探索稀土掘金"
              class="searchInput"
              @click="clickSearch"
              @blur="ifClickSearch = false"
            >
      
            </el-input>
          </el-form-item>
        </el-form>
        <div class="searchBtn" :class="ifClickSearch ? 'activeSearchBtn' : ''">
          <i class="icon iconfont icon-fangdajing1" v-if="!ifClickSearch"></i>
          <i class="icon iconfont icon-fangdajing" v-else></i>
        </div>
      </div>

      <!-- 提醒和头像 -->
      <div class="remindAndAvatarContainer">
        <i class="icon iconfont icon-tixing" @click="clickRemindList"></i>
        <ul class="remindList" v-if="ifClickRemindList">
          <li v-for="(item, index) in remindList" :key="index">{{ item }}</li>
        </ul>

        <el-avatar
            shape="circle"
            :size="40"
            @click="clickAvatarList"
          ></el-avatar>
        <article class="avatarContainer" v-if="ifClickAvatarList">
          <!-- 头像和用户名 -->
          <section class="topAvatarContainer">
            <el-avatar shape="circle" :size="40"></el-avatar>
            <p>Ausey</p>
          </section>

          <!-- 关注、赞过和收藏 -->
          <section class="midAvatarContainer">
            <div class="midAvatarItem">
              <p>2</p>
              <p>关注</p>
            </div>

            <div class="midAvatarItem">
              <p>3</p>
              <p>赞过</p>
            </div>

            <div class="midAvatarItem">
              <p>4</p>
              <p>收藏</p>
            </div>
          </section>

          <!-- 各项功能 -->
          <section class="bottomAvatarContainer">
            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-touxiang2"></i>
              <p>我的主页</p>
            </div>

            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-liwu"></i>
              <p>成长福利</p>
            </div>

            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-bijiben"></i>
              <p>闪念笔记</p>
            </div>

            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-xiajiantou-03"></i>
              <p>会员中心</p>
            </div>

            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-xinrenkecheng"></i>
              <p>课程中心</p>
            </div>

            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-youhuiquan"></i>
              <p>我的优惠</p>
            </div>

            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-qizhi"></i>
              <p>我的报名</p>
            </div>

            <div class="bottomAvatarItem">
              <i class="icon iconfont icon-zuji1"></i>
              <p>我的足迹</p>
            </div>
          </section>

          <!-- 我的设置和退出登录 -->
          <section class="tailAvatarContainer">
            <div>我的设置</div>
            <div>退出登录</div>
          </section>
        </article>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, Ref, watch, onMounted, onBeforeUnmount } from "vue";
import "../icon/iconfont.css";
import { Search } from "@element-plus/icons-vue";
let triangleFlag: Ref<boolean> = ref(false);

//判断是否点击了三角形
const rotateTriangle = (event: any) => {
  event.stopPropagation();
  triangleFlag.value = !triangleFlag.value;
};

let functionsArr: Ref<string[]> = ref([
  "首页",
  "BOT",
  "沸点",
  "课程",
  "直播",
  "活动",
  "AI刷题",
  "商城",
]);

// 判断点击了那个functions
let currentIndex: Ref<number> = ref(0);
const clickFunctions = (index: number) => {
  currentIndex.value = index;
};

const handleIndexList = (event: any) => {
  const indexList = document.querySelector(".indexList");
  if (indexList && !indexList.contains(event.target)) {
    triangleFlag.value = false;
  }
};

onMounted(() => {
  //监听是否点击了三角形
  watch(
    () => triangleFlag.value,
    (newVal) => {
      if (newVal && triangleFlag.value) {
        document.addEventListener("click", handleIndexList);
      } else {
        document.removeEventListener("click", handleIndexList);
      }
    }
  );

  //监听是否点击了提醒
  watch(
    () => ifClickRemindList.value,
    (newVal) => {
      if (newVal && ifClickRemindList.value) {
        document.addEventListener("click", handleRemindList);
      } else {
        document.removeEventListener("click", handleRemindList);
      }
    }
  );

  //监听是否点击了头像
  watch(
    () => ifClickAvatarList.value,
    (newVal) => {
      if (newVal && ifClickAvatarList.value) {
        document.addEventListener("click", handleAvatarList);
      } else {
        document.removeEventListener("click", handleAvatarList);
      }
    }
  );
});

let remindList: Ref<any> = ref([
  "评论",
  "赞和收藏",
  "新增粉丝",
  "私信",
  "系统通知",
]);

//判断是否点击了提醒
let ifClickRemindList: Ref<boolean> = ref(false);

const clickRemindList = (event: any) => {
  event.stopPropagation();
  ifClickRemindList.value = !ifClickRemindList.value;
};

const handleRemindList = (event: any) => {
  const remindList = document.querySelector(".remindList");
  if (remindList && !remindList.contains(event.target)) {
    ifClickRemindList.value = false;
  }
};

//判断是否点击了头像
let ifClickAvatarList: Ref<boolean> = ref(false);

const clickAvatarList = (event: any) => {
  event.stopPropagation();
  ifClickAvatarList.value = !ifClickAvatarList.value;
};

const handleAvatarList = (event: any) => {
  const avatarList = document.querySelector(".avatarContainer");
  if (avatarList && !avatarList.contains(event.target)) {
    ifClickAvatarList.value = false;
  }
};

//搜索框
const form = ref({
  keyword: "",
});

let ifClickSearch: Ref<boolean> = ref(false);
const clickSearch = (event: any) => {

  ifClickSearch.value = true;
};
</script>

<style scoped lang="scss">
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

$defaultTriangleColor: #515767;
$deepWorldColor: #1e82ff;
$activeTriangleColor: #1e80ff;
$defaultWorldColor: #5b6170;
* {
  padding: 0;
  margin: 0;
}

.headerContainer {
  background-color: yellow;
  @extend .between;
  position: relative;
  // padding: 0.75rem 0px;
  // padding-left: 0.875rem;
  padding: 0.25rem 0px;
  padding-left: 0.3rem;
  user-select: none;
  // 首页和logo图片的容器
  .logoContainer {
    @extend .start;
    // logo图片
    img {
      margin-right: 7px;
    }
    // 首页列表
    .indexContainer {
      color: $deepWorldColor;
      @extend .start;
      .triangle {
        width: 0;
        height: 0;
        cursor: pointer;
        border-left: 0.3rem solid transparent;
        border-right: 0.3rem solid transparent;
        border-top: 0.3rem solid $defaultTriangleColor;
        margin-left: 4px;
      }
    }
  }
}

.triangleRotate {
  animation: rotateTriangle 0.2s forwards !important;
  border-top: 0.3rem solid $activeTriangleColor !important;
}

.triangleRotateBack {
  animation: rotateTriangleBack 0.2s forwards !important;
  border-top: 0.3rem solid $defaultTriangleColor !important;
}

@keyframes rotateTriangle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-180deg);
  }
}

@keyframes rotateTriangleBack {
  0% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.indexList {
  position: absolute;
  background-color: #ffffff;
  top: 3.4rem;
  left: 0;
  box-shadow: 0rem 0rem 0.1rem 0rem rgba(0, 0, 0, 0.3);
  border-radius: 0.3rem;
  li {
    color: $defaultWorldColor;
    padding: 1rem;
    padding-left: 3.5rem;
    padding-right: 3.5rem;
    font-size: 0.9rem;
    cursor: pointer;
  }
}

.activeWorldColor {
  color: $activeTriangleColor !important;
}

.remindAndAvatarContainer {
  position: relative;
  cursor: pointer;

  @extend .start;
  i {
    font-size: 1.8rem;
    color: #8a919f !important;
  }

  //点击提醒出现的列表
  .remindList {
    position: absolute;
    color: #666b79;
    font-size: 0.8rem;
    background-color: #ffffff;
    box-shadow: 0rem 0rem 0.2rem 0rem rgba(0, 0, 0, 0.3);
    border-radius: 0.3rem;
    top: 3rem;
    left: -7rem;

    li {
      padding: 0.6rem 0.8rem;
      padding-right: 5rem;
      cursor: pointer;
    }
  }

  //点击头像出现的列表
  .avatarContainer {
    width: 12rem;
    position: absolute;
    background-color: #ffffff;
    top: 3rem;
    left: -8rem;
    padding-bottom: 0.2rem;
    border-radius: 0.3rem;
    box-shadow: 0rem 0rem 0.1rem 0rem rgba(0, 0, 0, 0.2);
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.8rem;
    //头像和列表
    .topAvatarContainer {
      display: flex;
      justify-content: flex-start;
      p {
        margin-left: 0.5rem;
        color: #252933;
      }
    }

    // 关注、赞过和收藏
    .midAvatarContainer {
      @extend .between;
      border-bottom: 0.1rem solid #f1f2f5;
      margin-top: 0.4rem;
      .midAvatarItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0rem 0.8rem;
        p:nth-child(2) {
          color: #8a919f;
          font-size: 0.8rem;
        }
        padding-bottom: 0.8rem;
      }
    }

    // 各项功能
    .bottomAvatarContainer {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;

      .bottomAvatarItem {
        i {
          font-size: 1rem;
          margin-right: 0.3rem;
        }
        font-size: 0.8rem;
        color: #252933;
        @extend .start;
        width: 50%; // 设置宽度为50%，实现两列布局
        padding: 0.3rem 0; // 添加上下间距
      }
      padding-bottom: 0.5rem;
      border-bottom: 0.1rem solid #f1f2f5;
    }

    // 我的设置和退出登录
    .tailAvatarContainer {
      cursor: pointer;
      @extend .between;
      margin-top: 0.7rem;
      margin-bottom: 0.7rem;
      font-size: 0.7rem;
      color: #8a919f;
    }
  }
}

.searchAndRemindContainer {
  @extend .between;
  margin-right: 0.2rem;
  background-color: blue;

  .searchContainer {
  @extend .between;
  border-radius: 0.3rem;
  background-color: green;
  display: flex; 
  align-items: stretch; 
  width: 8.5rem;
  
  :deep(.el-input__wrapper)  {
    border-radius:0;
  }

  @media screen and (max-width: 321px) {
    display: none;
  }

  //搜索按钮
  .searchBtn {
    @extend .center;
    background-color: #f2f3f5;
    cursor: pointer;
    border-radius: 0 0.3rem 0.3rem 0;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    // 关键修改：使用与 Element Plus 输入框相同的高度
    // height:2rem; // Element Plus 默认输入框高度
    
  }
}


    //被激活的搜索按钮
    .activeSearchBtn {
      background-color: #EAF2FF!important;
    }
  }

  // @media screen and (min-width: 320px) and (max-width:330px) {
  //   .icon-tixing{
  //     margin: 0 0.7rem;
  //   }
  // }

  // @media screen and (min-width: 330px) and (max-width:360px) {
  //   .icon-tixing{
  //     margin: 0 0.8rem;
  //   }
  // }

  // @media screen and (min-width: 360px) and (max-width:376px) {
  //   .icon-tixing{
  //     margin: 0 1.2rem;
  //   }


  // }

</style>


<template>
  <div class="headerContainer">
    <div class="headerContent">
      <!-- logo图片 -->
      <div class="logoContainer">
        <img
          src="../image/header/indexLogo.svg"
          alt=""
          class="hiddenLogoSmall650"
        />
        <img src="../assets/vue.svg" alt="" class="hiddenLogoBig650" />
      </div>

      <!-- 首页~插件选项 -->
      <div class="functionsContainer big1180Show">
        <div
          class="functionsContent"
          v-for="(item, index) in functionsArr"
          :key="index"
          @click="selectFunctionsArrItem(index)"
          :class="currentIndex == index ? 'active' : ''"
        >
          {{ item }}
        </div>

        <div class="appContainer">
          <div>APP</div>
          <div>插件</div>
        </div>
      </div>

      <div class="small1180Show">
        <div class="small1180ShowContent">
          <div class="wordContainer">
            {{ functionsArr[functionsListItemCurrentIndex] }}
          </div>
          <div
            class="triangle"
            @click="functionsListShow"
            :class="triangleFlag == 1 ? 'triangleChangeBlue' : ''"
          ></div>
        </div>

        <div class="functionsList" v-if="triangleFlag">
          <div
            class="functionsListItem"
            v-for="(item, index) in functionsArr"
            :key="index"
            @click="clickFunctionsListItem(index)"
            :class="functionsListItemCurrentIndex == index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <!-- 奇妙夜图片 -->
      <!-- <div class="qimiao">
        <img src=".././image/header/AI.avis" alt="" />
      </div> -->

      <!-- 搜索框~创作者中心 -->
      <div class="searchAndCenterContainer">
        <div class="searchContianer">
          <el-input
            v-model="searchInput"
            placeholder="探索稀土掘金"
            @focus="clickInput"
            @blur="blurInput"
            :class="isInputFocused ? 'focused-input' : 'focused-inputBack'"
          ></el-input>

          <el-button
            type="primary"
            icon="Search"
            color="#5E6372"
            ref="searchBtn"
            :class="isInputFocused ? 'focused-btn' : ''"
            :style="isInputFocused ? { backgroundColor: '#EAF2FF' } : {}"
          ></el-button>
        </div>

        <div
          class="centerContainer"
          :class="isInputFocused ? 'centerContainerDisapear' : ''"
        >
          <div class="centerContent">
            <el-button type="primary">创作者中心</el-button>
            <div
              class="triangleContainer"
              @mouseenter="showHoverContent"
              @mouseleave="hideHoverContent"
            >
              <div class="centerTriangle"></div>
              <div
                class="centerHoverContent"
                v-show="isHovering"
                @mouseenter="showHoverContent"
                @mouseleave="hideHoverContent"
              >
                <div class="centerHover">
                  <!-- 写文章~草稿箱 -->
                  <div class="centerHoverTop">
                    <div
                      class="topItem"
                      v-for="(item, index) in centerHoverArr"
                      :key="index"
                    >
                      <img :src="item.imgSrc" alt="" />

                      <text>{{ item.todo }}</text>
                    </div>
                  </div>

                  <div class="centerHoverBottom">
                    <div class="inspirationAndMoreContaienr">
                      <div class="inspiration">创作灵感</div>
                      <div class="more">
                        查看更多<i
                          class="icon iconfont icon-xiangyoujiantou"
                        ></i>
                      </div>
                    </div>

                    <div class="allKindInspirationContainer">
                      <div class="inspirationItem">
                        <div>
                          <el-tag type="warning">活动</el-tag>
                        </div>
                        <div class="inspirationActivity">
                          在掘金写技术好文,瓜分万元现金大奖瓜分...
                        </div>
                      </div>

                      <div class="inspirationItem">
                        <div>
                          <el-tag type="warning">活动</el-tag>
                        </div>
                        <div class="inspirationActivity">
                          技术专题27期|后端jiava技术创意冠军角逐赛
                        </div>
                      </div>

                      <div class="inspirationItem">
                        <div>
                          <el-tag type="primary">话题</el-tag>
                        </div>
                        <div class="inspirationActivity">
                          #豆包MarsCode AI练中学
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 会员~头像 -->
      <div class="memberAndAvatarContainer">
        <!-- 会员 -->
        <div class="memberContainer">
          <img src="../image/header/huiyuan.png" alt="" />
          <p>会员</p>
        </div>

        <!-- 钟 -->
        <div
          class="zhong"
          @mouseenter="mouseInZhong"
          @mouseleave="mouseLeaveZhong"
        >
          <i class="icon iconfont icon-tixing-tianchong" v-if="zhongHover"></i>
          <i class="icon iconfont icon-tixing" v-if="!zhongHover"></i>

          <div
            class="zhongListContainer"
            v-show="zhongHover"
            @mouseenter="mouseInZhong"
            @mouseleave="mouseLeaveZhong"
            @click="mouseInZhong"
          >
            <div class="zhongListContent">
              <div
                class="zhongListItem"
                v-for="(item, index) in zhongListArr"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <!--头像 -->
        <div class="avatar" @click="avatarListShow">
          <el-avatar :size="40" />
          <div
            class="avatarListContainer"
            v-if="showAvatarListContainer"
            @click.stop
          >
            <div class="avatarListContent">
              <div class="avatarListTop">
                <el-avatar :size="50" />
                <p>Ausey</p>
              </div>

              <div class="avatarListMiddle">
                <div class="avatarListMiddleItem">
                  <p>2</p>
                  <p>关注</p>
                </div>

                <div class="avatarListMiddleItem">
                  <p>125</p>
                  <p>赞过</p>
                </div>

                <div class="avatarListMiddleItem">
                  <p>111</p>
                  <p>收藏</p>
                </div>
              </div>

              <div class="avatarListBottom">
                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-touxiang2"></i>
                  <p>我的主页</p>
                </div>

                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-liwu"></i>
                  <p>成长福利</p>
                </div>

                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-bijiben"></i>
                  <p>闪念笔记</p>
                </div>

                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-xiajiantou-03"></i>
                  <p>会员中心</p>
                </div>

                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-xinrenkecheng"></i>
                  <p>课程中心</p>
                </div>

                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-youhuiquan"></i>
                  <p>我的优惠</p>
                </div>

                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-qizhi"></i>
                  <p>我的报名</p>
                </div>

                <div class="avatarListBottomItem">
                  <i class="icon iconfont icon-zuji1"></i>
                  <p>我的足迹</p>
                </div>
              </div>

              <div class="loginOutContianer">
                <p>我的设置</p>
                <p @click="toLogout">退出登录</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  Ref,
  onMounted,
  onBeforeMount,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { Search } from "@element-plus/icons-vue";
import "../icon/iconfont.css";
import type { DrawerProps } from "element-plus";

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
let currentIndex: Ref<number> = ref(0);

const selectFunctionsArrItem = (index: number) => {
  currentIndex.value = index;
};

// 处理点击三角形逻辑
let triangleFlag: Ref<number, boolean> = ref(0);

const rotateTriangle = () => {
  triangleFlag.value = !triangleFlag.value;
};

let searchInput: Ref<string> = ref("");

let isInputFocused: Ref<boolean> = ref(false);
let searchBtn: any = ref();
const clickInput = () => {
  isInputFocused.value = true;
};

const blurInput = () => {
  isInputFocused.value = false;
};

//创作者中心悬停三角形后出现的盒子
let isHovering: Ref<boolean> = ref(false);

const showHoverContent = () => {
  isHovering.value = true;
};

const hideHoverContent = () => {
  isHovering.value = false;
};

//创作者中心:写文章~草稿箱
let centerHoverArr: Ref<any> = ref([
  { todo: "写文章", imgSrc: "/src/image/header/writePaper.svg" },
  { todo: "发沸点", imgSrc: "/src/image/header/writeFeiDian.svg" },
  { todo: "写笔记", imgSrc: "/src/image/header/writeNote.svg" },
  { todo: "写代码", imgSrc: "/src/image/header/writeCode.svg" },
  { todo: "草稿箱", imgSrc: "/src/image/header/craft.svg" },
]);

//判断鼠标是否在钟上
let zhongHover: Ref<boolean> = ref(false);

// 简单的节流函数
let throttle = (func: any, delay: number) => {
  let lastCall = 0;
  return function (...args: any) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
};

// 应用节流机制到鼠标事件
const mouseInZhong = throttle(() => {
  zhongHover.value = true;
  // console.log("zhongHover.value ",zhongHover.value );
}, 200);

const mouseLeaveZhong = throttle(() => {
  zhongHover.value = false;
}, 200);

let zhongListArr: Ref<any> = ref([
  "评论",
  "赞和收藏",
  "新增粉丝",
  "私信",
  "系统通知",
]);

//头像下的列表
//控制列表是否出现
let showAvatarListContainer: Ref<boolean> = ref(false);
const avatarListShow = (event: any) => {
  showAvatarListContainer.value = !showAvatarListContainer.value;
  event.stopPropagation();
};

//点击空白处关闭avatarList
const handleAvatarList = (event: any) => {
  const avatarListElement = document.querySelector(".avatarListContainer");
  if (avatarListElement && !avatarListElement.contains(event.target)) {
    showAvatarListContainer.value = false;
    event.stopPropagation();
  }
};

//小于1180下的列表
//控制列表是否出现

const functionsListShow = (event: any) => {
  triangleFlag.value = !triangleFlag.value;
  event.stopPropagation();
};

let functionsListItemCurrentIndex: Ref<number> = ref(0);
const clickFunctionsListItem = (index: number) => {
  functionsListItemCurrentIndex.value = index;
};
//点击空白处关闭functionsList
const handleFunctionsList = (event: any) => {
  const functionsListElement = document.querySelector(".functionsList");
  if (functionsListElement && !functionsListElement.contains(event.target)) {
    triangleFlag.value = false;
    event.stopPropagation();
  }
};

onMounted(() => {
  // watch(
  //   () => showAvatarListContainer.value,
  //   async (newVal) => {
  //     if (newVal) {
  //       await nextTick();
  //       if (showAvatarListContainer.value)
  //         document.addEventListener("click", handleAvatarList);
  //     }
  //   }
  // );

  watch(
    () => triangleFlag.value,
    async (newVal) => {
      if (newVal) {
        await nextTick();
        if (triangleFlag.value) {
            document.addEventListener("click", handleFunctionsList);
        } else {
          document.removeEventListener("click", handleAvatarList);
        }
      }
    }
  );
});

//是否登出标志
let ifLogout: Ref<Boolean> = ref(false);

const toLogout = () => {
  ifLogout.value = true;
  if (ifLogout.value) {
    if (confirm("确定登出吗?每一篇贫瘠的土地都需要坚定的挖掘者")) {
      //TODO 清空pinia信息
      console.log("点击了确定按钮");
    } else {
      console.log("点击了取消按钮");
    }
  }
};
</script>
  
  <style lang="scss">
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.side {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

$functionsColor: #535968;
$functionsHovorColor: #252933;
$functionsBottomColor: #1e80ff;
$headerFontColor: #1e80ff;
$triangleColor: #515767;
$centerBtnColor: #1e80ff;
$centerBtnHoverColor: #1171ee;
.basicTriangle {
  width: 0px;
  height: 0px;
  border-right: 0.3rem solid transparent;
  border-left: 0.3rem solid transparent;
  border-top: 0.3rem solid $triangleColor;
  border-radius: 28%;
}

body {
  background-color: #f2f3f5;
}

* {
  padding: 0;
  margin: 0;
}
.headerContainer {
  background: #ffffff !important;
  // background-color: yellow !important;
  user-select: none;

  // padding:0.3rem 0rem;
  // padding-left: 5rem;
  @extend .center;
  // padding-left: -5rem;;
  //  background-color: red;
  .headerContent {
    @extend .side;
    // background-color: yellow;
  }

  .logoContainer {
    margin-right: 5px;
  }

  .functionsContainer {
    // background-color: purple;
    @extend .center;

    .functionsContent {
      // background-color: aqua;
      // width: 3rem;
      // width: 10px;
      @extend .center;
      margin-right: 2px;
      color: $functionsColor;
      font-size: 1rem;
      cursor: pointer;
      height: 100%;
      padding: 1rem 0px;
      font-size: 1rem;
      border-bottom: 0.2rem solid transparent;

      &.active {
        color: $headerFontColor;
      }
    }

    .functionsContent:hover {
      color: $functionsHovorColor;
      border-bottom: 0.2rem solid $functionsBottomColor;
    }
  }
}

.appContainer {
  //   background-color: yellow;
  @extend .center;
  div {
    margin-right: 0.5rem;
    color: $functionsColor;
    width: 2rem;
    // background-color: red;
    cursor: pointer;
  }
}

.hiddenLogoBig650 {
  display: none;
}

.big1180Show {
  display: block;
}

.small1180Show {
  display: none;
}

.active {
  color: $headerFontColor !important;
}

.small1180Show {
  position: relative;
  .small1180ShowContent {
    .wordContainer {
      @extend .center;
      width: 3.1rem;
      // background-color: red;
    }
    @extend .side;
    color: $functionsBottomColor;
  }

  .functionsList {
    position: absolute;
    width: 10rem;
    // height:5rem;
    // background-color: red;
    margin-top: 0.6rem;
    margin-left: -4rem;
    border-radius: 1rem;

    .functionsListItem {
      padding: 1rem 2rem;
      // background-color: yellow;
      @extend .center;
      background-color: white;
      font-size: 0.8rem;
      color: #515767;
    }
  }
}

.triangle {
  @extend .basicTriangle;
  margin-left: 3px;
  animation: triangleRotateBack 0.2s forwards;
}

.triangleChangeBlue {
  animation: triangleRotate 0.2s forwards;
  border-top: 0.4rem solid $functionsBottomColor;
}

.qimiao img {
  height: 10px;
  margin-right: 5px;
}

.searchAndCenterContainer {
  @extend .side;
  position: relative;
  margin-left: 2.5rem;

  .searchContianer {
    position: absolute;
    // background: aqua;
    // margin-right: 15rem;
    //  background-color: red;
    //  padding: 0rem 10rem;
    @extend .side;
    // margin-right: 10px;
    //表单样式
    .el-input__wrapper {
      // position: absolute;
      left: 0;
      border-radius: 1px;
      padding: 0;
      padding-left: 5px;
    }
    .el-input {
      font-size: 0.8rem;
      // width: 3px;
    }

    //搜索表单的长度和宽度
    .el-input__inner {
      // width: 35px;
      // height: 8px;

      width: 20rem;
      height: 2.3rem;
    }

    .el-button--primary {
      background-color: #f2f3f5;
    }

    //搜索按钮样式
    .el-button {
      // position: absolute;
      width: 3.2rem;
      height: 2.5rem;
      // width:8.5px;
      // height:8.5px;
      padding: 0.03rem;
      border-radius: 5%;
      border-color: #ffffff;

      .el-icon {
        width: 1.4rem;
        height: 1.4rem;
        // width: 5px;
        // height: 5px;
        color: #515767;
      }
    }
  }

  //创作者中心
  .centerContainerDisapear {
    display: none;
  }
  .centerContainer {
    position: absolute;

    .centerContent {
      @extend .side;
    }

    margin-left: 26.5rem;
    .el-button {
      height: 2.3rem;
      font-size: 1rem;
      border-radius: 0%;
      border-top-left-radius: 0.3rem;
      border-bottom-left-radius: 0.3rem;
      padding: 0;
      padding: 0rem 1.5rem;
      background-color: $centerBtnColor;
      &:hover {
        background-color: $centerBtnHoverColor;
      }
    }

    .triangleContainer {
      @extend .center;
      width: 1rem;
      height: 2.3rem;
      background-color: $centerBtnColor;
      border-radius: 0%;
      border-top-right-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
      cursor: pointer;
      &:hover {
        background-color: $centerBtnHoverColor;
        .centerTriangle {
          animation: triangleRotate 0.2s forwards;
        }
        // .centerHoverContent {
        //   display: block !important;
        // }
      }
      .centerTriangle {
        @extend .basicTriangle;
        border-top: 0.3rem solid white;
      }
    }

    .centerHoverContent {
      background-color: transparent;
      @extend .center;
      position: absolute;
      width: 27rem;
      // height: 27rem;
      // background-color: red;
      margin-top: 20rem;
      margin-left: -25rem;
      border-radius: 2%;
      padding-top: 2rem;
      cursor: default;
      .centerHover {
        width: 27rem;
        // height: 25rem;
        // background-color: aqua;
        background: #ffffff;
        box-shadow: 0rem 0rem 0.5rem 0rem #ccc;
        border-radius: 2%;
        cursor: pointer;
        padding-top: 1rem;
        padding-right: 2rem;
        padding-left: 2rem;
        .centerHoverTop {
          @extend .side;
          border-bottom: 1px solid #ccc;
          padding-bottom: 1rem;
          .topItem {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            // background: purple;
            text {
              margin-top: -0.2rem;
              color: #666b79;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1350px) {
  .searchContianer {
    margin-left: 5rem;
  }
  .searchContianer .el-input__inner {
    width: 10rem !important;
  }

  .centerContainer {
    margin-left: 20rem !important;
  }

  .memberAndAvatarContainer {
    transform: translateX(-5rem);
  }

  .functionsContent {
    // width: 45px;

    // background-color: yellow;
    // position: absolute;
    // font-size: 0.6rem !important;
    width: 3rem;
    // color: red !important;
  }

  .functionsContainer {
    // background-color: purple;
  }

  .headerContainer {
    width: 100vw !important;
    // background-color: yellow !important;
    padding-right: 5rem;
    padding-left: 9rem;
  }
  // .logoContainer{}
}

@media screen and (max-width: 1260px) {
  .searchContianer {
    width: 20rem !important;
    margin-left: -1rem;
  }
}

@media screen and (max-width: 1490px) {
  .headerContent {
    margin-left: -4rem;
  }
}

//点击输入表单之后，搜索按钮样式改变
.focused-btn {
  border: 0.1rem solid transparent !important; // 蓝色边框

  .el-button--primary {
    background-color: red !important;
  }
  .el-icon {
    color: #409eff !important; // 图标蓝色
  }
}

//点击输入表单之后，宽度变长
.focused-input .el-input__inner {
  animation: expandWidth 0.2s forwards; // 添加 forwards 来确保动画完成后保留最终状态
}

.focused-inputBack .el-input__inner {
  animation: expandWidthBack 0.2s forwards; // 添加 forwards 来确保动画完成后保留最终状态
}

.centerHoverBottom {
  margin-top: 1rem;
  .inspirationAndMoreContaienr {
    @extend .side;
    margin-bottom: 1rem;
    .inspiration {
      color: #4a4d55;
      font-weight: 600;
      font-size: 1.2rem;
    }
    .more {
      color: #8a919f;
    }
  }

  .allKindInspirationContainer {
    .inspirationItem {
      display: flex;
      justify-content: flex-start;
      .el-tag {
        padding: 0.1rem 0.2rem;
        height: 5px;
        font-size: 3px;
        border-radius: 8%;
        margin-right: 0.5rem;
      }

      margin-bottom: 1rem;
      color: #272b35;
    }
  }
}

.memberAndAvatarContainer {
  @extend .side;

  // background-color: purple;
  margin-left: 37rem;

  .memberContainer {
    margin-right: 0.6rem;
    img {
      margin-right: 0.1rem;
      width: 1.5rem;
      height: 1.7rem;
    }
    color: #8b929f;
    font-size: 0.9rem;
    p {
      width: 2rem;
    }

    @extend .side;
  }

  .zhong {
    margin-right: 0.8rem;
    position: relative;
    cursor: pointer;
    i {
      font-size: 2rem;
    }

    .zhongListContainer {
      position: absolute;
      width: 10rem;
      // height: 20rem;
      // margin-top: 0.1rem;
      margin-left: -8rem;
      background-color: transparent;
      display: flex;
      justify-content: center;
      .zhongListContent {
        width: 12rem;
        box-shadow: 0rem 0rem 0.5rem 0rem #ccc;
        border-radius: 0.3rem;
        margin-top: 0.5rem;
        background-color: #ffffff;
        padding: 0.6rem 0rem;
        .zhongListItem {
          width: 8rem;
          padding: 0.7rem 0.5rem;
          margin-left: 0.5rem;
          color: #515767;
          &:hover {
            background-color: #f7f8fa;
            border-radius: 0.3rem;
          }
        }
      }
    }

    .zhongListContainerDisappear {
      display: none;
    }
  }

  // 鼠标悬停到钟上
  .zhongIn {
    color: red !important;
    cursor: pointer;
  }
}

@media screen and (max-width: 1249px) {
  .memberContainer p {
    display: none;
  }
}

.avatar {
  position: relative;
  cursor: pointer;
  .avatarListContainer {
    position: absolute;
    padding: 0.8rem;

    margin-left: -15rem;
    border-radius: 2%;
    margin-top: 0.3rem;
    background-color: #ffffff;
    box-shadow: 0rem 0rem 0.1rem 0rem #ccc;
    z-index: 999;
    cursor: pointer;
    @extend .center;
    .avatarListContent {
      // background-color: green;
      // padding:0rem 0.5rem;
      // padding-right:0.8rem;
      .avatarListTop {
        @extend .start;
        .el-avatar {
          margin-right: 0.5rem;
        }
      }

      .avatarListMiddle {
        @extend .side;
        border-bottom: 0.1rem solid #f1f2f5;
        // background-color: blue;

        .avatarListMiddleItem {
          display: flex;
          // background-color: red;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 1rem;
          // margin-right: 2.5rem;
          p:nth-child(1) {
            color: #252933;
          }
          p:nth-child(2) {
            color: #8a919f;
            margin-top: 0.3rem;
            font-size: 0.8rem;
          }
        }
      }

      .avatarListBottom {
        width: 15rem;
        @extend .center;
        flex-wrap: wrap;
        margin-top: 1rem;
        border-bottom: 0.1rem solid #f1f2f5;
        // background-color: red;
        padding-left: 1.5rem;
        // background-color: red;
        .avatarListBottomItem {
          margin-bottom: 1rem;
          margin-right: 2rem;
          // background-color: blue;
          @extend .start;
          i {
            margin-right: 0.5rem;
            font-size: 1.3rem;
            // color: red !important;
          }
          p {
            color: #252933;
            font-size: 0.85rem;
            //  font-weight: 600;
          }
        }
      }
      .loginOutContianer {
        @extend .side;
        font-size: 1rem;
        color: #8a919f;
        font-size: 0.8rem;
        margin: 1rem 0rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}

@keyframes expandWidth {
  from {
  }
  to {
    width: 25rem; // 目标宽度
  }
}

@keyframes expandWidthBack {
  from {
    width: 25rem; // 初始宽度
  }
  to {
  }
}

@keyframes triangleRotate {
  0% {
  }
  100% {
    transform: rotate(-180deg);
  }
}

@keyframes triangleRotateBack {
  0% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

// 媒体查询
@media screen and (max-width: 650px) {
  .hiddenLogoBig650 {
    display: block;
  }

  .hiddenLogoSmall650 {
    display: none;
  }
}

@media screen and (max-width: 1180px) {
  .big1180Show {
    display: none !important; // 小屏幕隐藏
  }

  .small1180Show {
    display: block !important; // 小屏幕显示
  }
}

@media (max-width: 1200px) {
  /* 针对桌面大屏 */
}
@media (max-width: 992px) {
  /* 针对平板设备 */
}
@media (max-width: 768px) {
  /* 针对小屏幕 */
}
@media (max-width: 576px) {
  /* 针对手机 */
}
</style>
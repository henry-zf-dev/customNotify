<template>
  <transition name="el-notification-fade">
    <div
      v-show="visible"
      :style="{top: top, right: `${positionRight}px`}"
      :class="shakeClass"
      class="custom-notify-container"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave">
      <div v-if="type === 'alarmTrigger'">
        <div class="alarm-notify-container">
          <i class="el-icon-warning alarm-type-icon font-color-warning"></i>
          <div class="alarm-notify-content">
            <div class="alarm-notify-title">
              <span @click="clickTitle">{{ data.title }}</span>
            </div>
            <div class="alarm-notify-title">
              <span @click="clickSubtitle">{{ data.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="type === 'alarmRestore'">
        <div class="alarm-notify-container">
          <i class="el-icon-success alarm-type-icon font-color-success"></i>
          <div class="alarm-notify-content">
            <div class="alarm-notify-title">
              <span @click="clickTitle">{{ data.title }}</span>
            </div>
            <div class="alarm-notify-title">
              <span @click="clickSubtitle">{{ data.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="type === 'remoteCall'">
        <div class="remote-call-container">
          <div class="remote-call-title">{{ data.title }}</div>
          <div class="remote-call-subtitle">{{ data.subtitle }}</div>
          <div class="remote-call-opt-container">
            <div class="remote-call-opt-btn remote-call-connect-btn" @click="clickConnect">
              <i class="el-icon-phone"></i>
            </div>
            <div class="remote-call-opt-btn remote-call-hangup-btn" @click="clickHangUp">
              <i class="el-icon-phone-outline"></i>
            </div>
          </div>
          <div class="remote-call-detail-btn" @click="routerToMonitorDetail">查看监控</div>
        </div>
      </div>
      <div v-else>
        <div class="default-notify-container">
          <i :class="notifyTypeIconClass" class="notify-type-icon"></i>
          <span class="notify-message">{{ message }}</span>
        </div>
      </div>
      <i class="notify-close-icon el-icon-close" @click.stop="close"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CustomNotify',
  data () {
    return {
      visible: false,
      type: '',
      message: '',
      positionRight: -350,
      positionTop: 16,
      duration: 3500,
      shake: false,
      hover: false,
      closed: false,
      onClose: () => {},
      timer: null,
      data: {
        title: '',
        subtitle: '',
        titleCallback: null,
        subtitleCallback: null,
        extra: {}
      }
    };
  },
  computed: {
    top () {
      return `${this.positionTop}px`;
    },
    notifyTypeIconClass () {
      switch (this.type) {
        case 'success':
          return 'el-icon-success font-color-success';
        case 'info':
          return 'el-icon-info font-color-info';
        case 'warning':
          return 'el-icon-warning font-color-warning';
        case 'error':
          return 'el-icon-error font-color-danger';
        default:
          return 'el-icon-success font-color-success';
      }
    },
    shakeClass () {
      return this.shake && !this.hover ? 'animate__animated animate__headShake animate__infinite' : '';
    }
  },
  mounted () {
    setTimeout(() => {
      this.positionRight = 16;
    }, 100);
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy () {
    this.clearTimer();
    document.removeEventListener('keydown', this.keydown);
  },
  methods: {
    clearTimer () {
      clearTimeout(this.timer);
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    mouseenter () {
      this.hover = true;
      this.clearTimer();
    },
    mouseleave () {
      this.hover = false;
      this.startTimer();
    },
    close () {
      if (this.closed) return;
      this.closed = true;
      this.onClose();
      this.visible = false;
      this.$el.addEventListener('transitionend', this.destroyElement);
    },
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    keydown (e) {
      // ESC 关闭消息
      if (e.which === 27) {
        this.close();
      }
    },
    clickTitle () {
      if (typeof this.data.titleCallback === 'function') {
        this.data.titleCallback();
      }
    },
    clickSubtitle () {
      if (typeof this.data.subtitleCallback === 'function') {
        this.data.subtitleCallback();
      }
    },
    // 远程呼叫通知相关
    clickConnect () {
      this.close();
      this.$message({
        type: 'success',
        message: '远程呼叫已接通'
      });
      console.log('##### clickConnect #####');
    },
    clickHangUp () {
      this.$confirm('确定要挂断远程呼叫吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.close();
        this.$message({
          type: 'success',
          message: '远程呼叫已挂断'
        });
        console.log('##### clickHangUp #####');
      }).catch(() => {});
    },
    // 跳转到监控会议室详情
    routerToMonitorDetail () {
      this.close();
      this.$message({
        type: 'success',
        message: '跳转到监控会议室详情'
      });
      console.log('##### 跳转到监控会议室详情 #####');
    }
  }
};
</script>

<style scoped lang="less">

  .custom-notify-container {
    position: fixed;
    box-sizing: border-box;
    padding: 16px 24px;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    transition: opacity .3s, transform .3s, top .3s, right .3s;
    -webkit-transition: opacity .3s, transform .3s, top .3s, right .3s;
    -moz-transition: opacity .3s, transform .3s, top .3s, right .3s;
    -o-transition: opacity .3s, transform .3s, top .3s, right .3s;
    width: 330px;
    z-index: 9999;
  }

  .default-notify-container {
    .notify-type-icon {
      font-size: 24px;
      position: absolute;
      top: 14px;
      left: 18px;
    }
    .notify-message {
      font-size: 14px;
      color: #666666;
      margin-left: 24px;
    }
  }

  .alarm-notify-container {

    .alarm-type-icon {
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 28px;
    }

    .alarm-notify-content {
      padding: 5px 5px 0 25px;

      .alarm-notify-title {
        font-size: 14px;
        cursor: pointer;
        text-decoration: underline;
        color: #666666;
      }

      .alarm-notify-title:hover {
        color: #26BF7F;
      }
    }
  }

  .remote-call-container {
    .remote-call-title {
      font-size: 16px;
      font-weight: bold;
      color: #1A1A1A;
    }

    .remote-call-subtitle {
      font-size: 12px;
      color: #666666;
      margin-top: 5px;
    }

    .remote-call-opt-container {
      margin-top: 10px;

      .remote-call-opt-btn {
        height: 30px;
        width: 40px;
        border-radius: 50%;
        padding-top: 10px;
        background: #26BF7F;
        text-align: center;
        color: white;
        display: inline-block;
        cursor: pointer;

        i {
          font-size: 20px;
        }
      }

      .remote-call-connect-btn {
        color: white;
        margin-right: 15px;
      }

      .remote-call-connect-btn:hover {
        background: #19B373;
      }

      .remote-call-hangup-btn {
        background: #EE5443;
      }

      .remote-call-hangup-btn:hover {
        background: #E34836;
      }
    }

    .remote-call-detail-btn {
      position: absolute;
      right: 20px;
      bottom: 12px;
      border-radius: 20px;
      background: #F5F5F5;
      font-size: 14px;
      color: #666666;
      text-align: center;
      cursor: pointer;
      padding: 10px 16px;
    }

    .remote-call-detail-btn:hover {
      background: #E5E5E5;
    }

  }

  .notify-close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #B3B3B3;
    font-size: 14px;
    cursor: pointer;
  }

  .notify-close-icon:hover {
    color: #1A1A1A;
    font-size: 15px;
  }

  .font-color-success {
    color: #26BF7F !important;
  }

  .font-color-warning {
    color: #FAAD14 !important;
  }

  .font-color-danger {
    color: #EE5443 !important;
  }

  .font-color-info {
    color: #F5F5F5 !important;
  }

</style>

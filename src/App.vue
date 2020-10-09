<template>
  <div id="app">
    <div>
      <h4>常规消息通知</h4>
      <el-button type="success" @click="defaultNotify('success')">成功</el-button>
      <el-button type="warning" @click="defaultNotify('warning')">警告</el-button>
      <el-button type="info" @click="defaultNotify('info')">消息</el-button>
      <el-button type="danger" @click="defaultNotify('error')">错误</el-button>
    </div>
    <div style="margin-top: 15px">
      <h4>自定义消息通知</h4>
      <el-button @click="customNotify('alarmTrigger')">告警触发</el-button>
      <el-button @click="customNotify('alarmRestore')">告警恢复</el-button>
      <el-button @click="customNotify('remoteCall')">远程呼叫</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      notifyHdl: {}
    };
  },
  methods: {
    defaultNotify (type) {
      let msg = '';
      switch (type) {
        case 'success':
          msg = '这是一条成功的提示消息';
          break;
        case 'warning':
          msg = '这是一条警告的提示消息';
          break;
        case 'info':
          msg = '这是一条普通的提示消息';
          break;
        case 'error':
          msg = '这是一条错误的提示消息';
          break;
        default:
          break;
      }
      this.$customNotify({
        type: type,
        duration: 0,
        message: msg
      });
    },
    customNotify (type) {
      // notifyHdl 保证同一 id 的 notify 只会弹出一次：在弹出前先关闭已经弹出的 notify
      switch (type) {
        case 'alarmTrigger':
        {
          const random = Math.ceil(Math.random() * 10);
          const notifyId = `alarm-${random}`;
          const alarmNotify = this.notifyHdl[notifyId];
          alarmNotify && (alarmNotify.close());
          this.notifyHdl[notifyId] = this.$customNotify({
            type: 'alarmTrigger',
            data: {
              title: `${random} 个会议室触发了 [视频矩阵离线告警]`,
              subtitle: '最近告警会议室: 五楼会议室 5F-501',
              titleCallback: () => {
                console.log('##### alarmTrigger titleCallback #####');
              },
              subtitleCallback: () => {
                console.log('##### alarmTrigger subtitleCallback #####');
              }
            }
          });
          break;
        }
        case 'alarmRestore':
        {
          const random = Math.ceil(Math.random() * 10);
          const notifyId = `alarm-${random}`;
          const alarmNotify = this.notifyHdl[notifyId];
          alarmNotify && (alarmNotify.close());
          this.notifyHdl[notifyId] = this.$customNotify({
            type: 'alarmRestore',
            duration: 0,
            data: {
              title: `${random} 个会议室恢复了 [视频矩阵离线告警]`,
              subtitle: '最近恢复告警会议室: 五楼会议室 5F-501',
              titleCallback: () => {
                console.log('##### alarmRestore titleCallback #####');
              },
              subtitleCallback: () => {
                console.log('##### alarmRestore subtitleCallback #####');
              }
            }
          });
          break;
        }
        case 'remoteCall':
        {
          const random = Math.ceil(Math.random() * 10);
          const notifyId = `remote-call-${random}`;
          const alarmNotify = this.notifyHdl[notifyId];
          alarmNotify && (alarmNotify.close());
          this.notifyHdl[notifyId] = this.$customNotify({
            type: 'remoteCall',
            duration: 0,
            shake: true,
            data: {
              title: '五楼会议室 5F-501',
              subtitle: '中国/深圳/南山/TCL国际/E区'
            }
          });
          break;
        }
        default:
          break;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

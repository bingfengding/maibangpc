<template>
    <el-dialog :visible.sync="showCropper" title="上传裁剪" width="30%">
        <cropper id="avatarCrop" ref="cropper" @cropper-success="cropperSuccessHandle"></cropper>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCropper">取 消</el-button>
            <el-button type="primary" @click="toCropper">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import cropper from '@/components/cropper/cropper.vue'
    export default { 
        data () {
            return {
                showCropper:false
            }
        },
        methods:{
            //隐藏裁剪框
            cancelCropper(){
                this.showCropper = false
                // this.$refs.cropper.cropDone();
            },
            setshowCropper(){
                this.showCropper = true
            },
            //父组件调用子组件裁剪方法
            toCropper(){
                this.$refs.cropper.crop();
                this.showCropper = false;
            },
            //子组件裁剪方法成功执行后与父组件通信
            cropperSuccessHandle(data){
                // let imgUrl = "http://192.168.1.254:8090/"; //测试
                let imgUrl = "";
                if (process.env.ENV_CONFIG == "prod") {
                    imgUrl = "https://image.ymaibang.com/" //线上
                } else {
                    imgUrl = "http://192.168.1.254:8090/" //测试
                }
                data.data.fullpathThumImg = imgUrl + data.data.thumImg;
                data.data.fullpathOriginImg = imgUrl  + data.data.originImg;

      this.$emit("cropper-callback", data);
    }
  },
  mounted() {},
  components: { cropper }
};
</script>